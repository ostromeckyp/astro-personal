import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) {
    const first = parsed.error.issues[0]?.message ?? "Invalid request";
    return NextResponse.json({ message: first }, { status: 400 });
  }

  const { name, email, message, website } = parsed.data;
  // Honeypot: silently succeed without sending
  if (website) {
    return NextResponse.json({ message: "Your message has been sent!" }, { status: 200 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { message: "Server configuration error: missing API key" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: "delivered@ostromecki.dev",
    to: ["contact@ostromecki.dev"],
    replyTo: email,
    subject: `Contact from ${name}`,
    html: `<h2>From: ${escape(name)} &lt;${escape(email)}&gt;</h2><p>${escape(message).replace(/\n/g, "<br/>")}</p>`,
  });

  if (result.error) {
    return NextResponse.json(
      { message: result.error.message ?? "Failed to send email" },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Your message has been sent!" }, { status: 200 });
}
