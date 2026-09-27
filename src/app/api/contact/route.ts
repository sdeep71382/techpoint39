import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const defaultContactEmail = "techpointservices39@gmail.com";
const defaultFromEmail = "Tech Point Services <onboarding@resend.dev>";

/*
 * A leftover placeholder in .env.local is worse than no key at all. Resend
 * answers 401, the route reports send_failed, and the form looks like an
 * outage rather than a missing credential. Catch the obvious placeholders
 * before the request leaves the server so the response is the honest one and
 * the logs point at the actual cause.
 */
function resolveApiKey(): string | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  if (key.toLowerCase().includes("your_") || key.toLowerCase().includes("your-")) return null;
  // Resend keys are `re_` followed by a long opaque token. Anything else is a
  // copy/paste slip, and would only earn another 401.
  if (!/^re_[A-Za-z0-9_-]{16,}$/.test(key)) return null;
  return key;
}

/* Same idea for the sender: a placeholder domain fails at Resend, not here. */
function resolveFromEmail(): string | null {
  const from = process.env.FROM_EMAIL?.trim() || defaultFromEmail;
  if (/(you|your|example|changeme|domain)\s*(at|@)/i.test(from)) return null;
  if (from.toLowerCase().includes("example.com")) return null;
  return from;
}

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
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return fail("invalid_body", "Invalid request body.", 400);
  }

  /*
   * The honeypot is answered before anything else, including the config
   * check. A bot that fills it gets a reply identical to a success, so it
   * never learns whether the form is working or who the sender is.
   *
   * The warning is the part that matters to the site owner. This field has
   * been filled by browser autofill and by password managers in the wild,
   * which silently discards real enquiries behind a success message. If
   * enquiries are going missing, this line names the people affected.
   */
  if (isNonEmpty(payload.website)) {
    console.warn("Contact submission DISCARDED by honeypot", {
      email: typeof payload.email === "string" ? payload.email.slice(0, 120) : null,
      service: typeof payload.service === "string" ? payload.service.slice(0, 80) : null,
      honeypotValue: String(payload.website).slice(0, 60),
    });
    return NextResponse.json({ ok: true });
  }

  const resendKey = resolveApiKey();
  const fromEmail = resolveFromEmail();
  const toEmail = process.env.CONTACT_EMAIL?.trim() || defaultContactEmail;

  if (!resendKey) {
    console.error("Contact email disabled: RESEND_API_KEY is missing or still a placeholder.");
    return fail("not_configured", "Email service is not configured.", 503);
  }

  if (!fromEmail) {
    console.error("Contact email disabled: FROM_EMAIL is still a placeholder.");
    return fail("not_configured", "Email service is not configured.", 503);
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
  const { data, error } = await resend.emails.send({
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
    /*
     * Log enough to tell the three real failure modes apart, none of which is
     * the visitor's fault: 401 the key is wrong or revoked, 403 the sender
     * domain is unverified (or onboarding@resend.dev is sending to an address
     * other than the account owner), 422 Resend rejected the payload.
     * The client only ever sees the generic code.
     */
    console.error("Contact email failed", {
      statusCode: error.statusCode,
      name: error.name,
      message: error.message,
      from: fromEmail,
      to: toEmail,
    });
    return fail("send_failed", "Could not send your message. Please try again later.", 502);
  }

  /*
   * Accepted by Resend is not the same as seen by the owner. Gmail routinely
   * files mail from a shared domain such as onboarding@resend.dev into Spam,
   * and Resend still reports it as delivered, so the request cannot tell the
   * difference. Log the id so any enquiry that goes quiet can be traced in the
   * Resend dashboard, and keep a copy of the sender's details here.
   */
  console.log("Contact email accepted", {
    id: data?.id,
    service,
    replyTo: email,
    from: fromEmail,
    to: toEmail,
  });

  return NextResponse.json({ ok: true });
}
