import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const defaultContactEmail = "techpointservices39@gmail.com";
const defaultFromEmail = "Tech Point Services <onboarding@resend.dev>";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  website?: string;
};

/*
 * A machine-readable code travels with every error so the three language
 * versions can show a translated message. The English `error` string is kept
 * as a fallback for anything that does not have a dictionary.
 */
function fail(code: string, error: string, status: number) {
  return NextResponse.json({ code, error }, { status });
}

function isNonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ] ?? character,
  );
}

export async function POST(request: NextRequest) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL || defaultContactEmail;
  const fromEmail = process.env.FROM_EMAIL || defaultFromEmail;

  if (!resendKey) {
    return fail("not_configured", "Email service is not configured.", 503);
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return fail("invalid_body", "Invalid request body.", 400);
  }

  // Quietly discard automated submissions that fill the hidden honeypot.
  if (isNonEmpty(payload.website)) {
    return NextResponse.json({ ok: true });
  }

  if (!isNonEmpty(payload.name) || !isNonEmpty(payload.email) || !isNonEmpty(payload.message)) {
    return fail("missing_fields", "Name, email, and message are required.", 400);
  }

  const email = payload.email.trim();
  const name = payload.name.trim();
  const phone = isNonEmpty(payload.phone) ? payload.phone.trim() : "Not provided";
  const service = isNonEmpty(payload.service) ? payload.service.trim() : "Not specified";
  const message = payload.message.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return fail("invalid_email", "Please provide a valid email address.", 400);
  }

  if (name.length > 120 || email.length > 320 || phone.length > 40 || service.length > 160 || message.length > 3000) {
    return fail("too_long", "Please shorten one or more fields and try again.", 400);
  }

  const resend = new Resend(resendKey);
  const { error } = await resend.emails.send({
    from: fromEmail,
    to: toEmail,
    replyTo: email,
    subject: "New contact request: " + service,
    text: [
      "New contact form submission",
      "Name: " + name,
      "Email: " + email,
      "Phone: " + phone,
      "Service interest: " + service,
      "",
      "Message:",
      message,
    ].join("\n"),
    html: [
      "<h2>New contact form submission</h2>",
      "<p><strong>Name:</strong> " + escapeHtml(name) + "</p>",
      '<p><strong>Email:</strong> <a href="mailto:' + escapeHtml(email) + '">' + escapeHtml(email) + "</a></p>",
      "<p><strong>Phone:</strong> " + escapeHtml(phone) + "</p>",
      "<p><strong>Service interest:</strong> " + escapeHtml(service) + "</p>",
      "<h3>Message</h3>",
      "<p>" + escapeHtml(message).replace(/\n/g, "<br>") + "</p>",
    ].join(""),
  });

  if (error) {
    console.error("Contact email failed", error);
    return fail("send_failed", "Could not send your message. Please try again later.", 500);
  }

  return NextResponse.json({ ok: true });
}
