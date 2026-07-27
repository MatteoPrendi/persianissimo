"use client";

import { useState, useRef } from "react";
import type { ContactUs } from "@/payload-types";
import {
  PaperPlaneRightIcon,
  CheckCircleIcon,
  SpinnerIcon,
} from "@phosphor-icons/react";

interface FormProps {
  fields: ContactUs["fields"];
}

export default function ContactForm({ fields }: FormProps) {
  const formRenderTime = useRef<number>(Date.now());
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    message: "",
    website: "", // Honeypot field for anti-spam protection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // Client-side honeypot check (fake success if bot filled the field)
    if (formData.website) {
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _renderTime: formRenderTime.current,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Si è verificato un errore durante l'invio del messaggio."
        );
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setErrorMessage(
        err.message || "Si è verificato un errore durante l'invio del messaggio. Riprova più tardi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="border-foreground/10 bg-white rounded-3xl border p-8 text-center shadow-lg transition-all duration-300 sm:p-12">
        <div className="bg-accent/10 text-accent mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
          <CheckCircleIcon size={40} weight="fill" />
        </div>
        <h3 className="text-foreground mb-3 font-serif text-2xl font-bold sm:text-3xl">
          Messaggio inviato!
        </h3>
        <p className="text-foreground/70 mx-auto mb-8 max-w-md font-sans leading-relaxed">
          Grazie per averci contattato. Abbiamo ricevuto la tua richiesta e ti
          risponderemo il prima possibile.
        </p>
        <button
          type="button"
          onClick={() => {
            setIsSubmitted(false);
            setErrorMessage(null);
            formRenderTime.current = Date.now();
            setFormData({
              name: "",
              lastName: "",
              email: "",
              message: "",
              website: "",
            });
          }}
          className="border-foreground/20 bg-white text-foreground hover:bg-foreground/5 hover:border-foreground/40 focus:ring-accent/50 inline-flex cursor-pointer items-center justify-center rounded-xl border px-6 py-3 text-sm font-medium transition-all focus:ring-2 focus:outline-none"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-foreground/10 space-y-6 rounded-3xl border bg-white p-6 shadow-xl sm:p-10"
    >
      {/* Anti-spam Honeypot field (hidden from real users, filled by spambots) */}
      <div className="sr-only hidden absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleChange}
        />
      </div>

      {errorMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-foreground/90 block font-sans text-sm font-medium"
          >
            {fields.name.label} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder={fields.name.placeholder}
            className="border-foreground/15 bg-white text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-accent/20 w-full rounded-xl border px-4 py-3 font-sans transition-all focus:ring-2 focus:outline-none"
          />
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="text-foreground/90 block font-sans text-sm font-medium"
          >
            {fields.lastName.label} <span className="text-accent">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            placeholder={fields.lastName.placeholder}
            className="border-foreground/15 bg-white text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-accent/20 w-full rounded-xl border px-4 py-3 font-sans transition-all focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <label
          htmlFor="email"
          className="text-foreground/90 block font-sans text-sm font-medium"
        >
          {fields.email.label} <span className="text-accent">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder={fields.email.placeholder}
          className="border-foreground/15 bg-white text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-accent/20 w-full rounded-xl border px-4 py-3 font-sans transition-all focus:ring-2 focus:outline-none"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-foreground/90 block font-sans text-sm font-medium"
        >
          {fields.message.label} <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder={fields.message.placeholder}
          className="border-foreground/15 bg-white text-foreground placeholder:text-foreground/40 focus:border-accent focus:ring-accent/20 min-h-30 w-full resize-y rounded-xl border px-4 py-3 font-sans transition-all focus:ring-2 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-accent hover:bg-accent/90 focus:ring-accent/50 inline-flex w-full min-w-50 cursor-pointer items-center justify-center gap-2 rounded-xl px-8 py-3.5 text-base font-medium text-white shadow-md transition-all focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <SpinnerIcon className="animate-spin" size={20} />
              <span>In corso...</span>
            </>
          ) : (
            <>
              <span>{fields.submit}</span>
              <PaperPlaneRightIcon size={18} weight="bold" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
