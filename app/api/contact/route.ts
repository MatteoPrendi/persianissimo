import { NextResponse } from "next/server";
import { Resend } from "resend";

// Simple in-memory IP rate limiter: max 5 requests per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 5;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.expiresAt) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + limitWindow });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, lastName, email, message, website, _renderTime } = body;

    // 1. Anti-Spam: Honeypot check
    // If the hidden 'website' field is populated, it's a spambot.
    // Return fake success so bot does not retry.
    if (website && typeof website === "string" && website.trim().length > 0) {
      console.warn("Spam detected via honeypot field");
      return NextResponse.json({ success: true, message: "OK" });
    }

    // 2. Anti-Spam: Fast submission check
    // Real humans take at least 2 seconds to complete and submit a contact form.
    if (_renderTime && typeof _renderTime === "number") {
      const timeElapsed = Date.now() - _renderTime;
      if (timeElapsed < 2000) {
        console.warn(`Spam detected via speed check (${timeElapsed}ms elapsed)`);
        return NextResponse.json({ success: true, message: "OK" });
      }
    }

    // 3. Anti-Spam: IP Rate limiting
    const clientIp =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown-ip";

    if (clientIp !== "unknown-ip" && !checkRateLimit(clientIp)) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return NextResponse.json(
        { error: "Troppe richieste inviate. Riprova tra qualche minuto." },
        { status: 429 }
      );
    }

    // 4. Basic Validation
    if (!name || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Tutti i campi obbligatori devono essere compilati." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Inserisci un indirizzo email valido." },
        { status: 400 }
      );
    }

    // 5. Anti-Spam: Excessive links check in message
    const urlMatches = message.match(/https?:\/\//gi);
    if (urlMatches && urlMatches.length > 3) {
      console.warn("Spam detected: excessive links in message");
      return NextResponse.json({ success: true, message: "OK" });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY non è configurata nelle variabili d'ambiente.");
      return NextResponse.json(
        { error: "Configurazione del server di posta mancante (RESEND_API_KEY non trovata)." },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL || "Persianissimo <onboarding@resend.dev>";
    const toEmail = "webmaster@persianissimo.it";

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Nuovo messaggio di contatto da ${name} ${lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #1a1a1a; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; font-weight: normal;">Persianissimo - Nuovo Messaggio</h2>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <p style="font-size: 16px; margin-top: 0;">Hai ricevuto un nuovo messaggio dal modulo di contatto del sito web:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; width: 120px; color: #555;">Nome:</td>
                <td style="padding: 8px 0;">${escapeHtml(name)} ${escapeHtml(lastName)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #0066cc;">${escapeHtml(email)}</a></td>
              </tr>
            </table>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eeeeee;">
              <p style="font-weight: bold; margin-bottom: 8px; color: #555;">Messaggio:</p>
              <div style="background-color: #f9f9f9; padding: 16px; border-radius: 6px; white-space: pre-wrap; font-size: 15px;">${escapeHtml(message)}</div>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 12px; text-align: center; font-size: 12px; color: #888;">
            Questo messaggio è stato inviato dal modulo di contatto su persianissimo.it
          </div>
        </div>
      `,
      text: `Nuovo messaggio di contatto\n\nNome: ${name} ${lastName}\nEmail: ${email}\n\nMessaggio:\n${message}`,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: error.message || "Errore durante l'invio dell'email via Resend." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Unexpected error in contact API route:", err);
    return NextResponse.json(
      { error: "Si è verificato un errore imprevisto durante l'invio del messaggio." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
