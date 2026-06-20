import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req: Request): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("url");
  const secret = searchParams.get("secret");

  if (secret !== process.env.PAYLOAD_SECRET) {
    return new Response("You are not allowed to preview this page", {
      status: 401,
    });
  }

  if (!path) {
    return new Response("No path provided", { status: 404 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(path);
}
