"use strict";

import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};
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
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || smtpUser;
  if (
    !smtpHost ||
    !smtpUser ||
    !smtpPass ||
    !toEmail ||
    !fromEmail ||
    !Number.isFinite(smtpPort)
  )
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 },
    );
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }
  if (
    !isNonEmpty(payload.name) ||
    !isNonEmpty(payload.email) ||
    !isNonEmpty(payload.message)
  )
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email.trim()))
    return NextResponse.json(
      { error: "Please provide a valid email address." },
      { status: 400 },
    );
  const name = payload.name.trim();
  const email = payload.email.trim();
  const phone = isNonEmpty(payload.phone)
    ? payload.phone.trim()
    : "Not provided";
  const service = isNonEmpty(payload.service)
    ? payload.service.trim()
    : "Not specified";
  const message = payload.message.trim();
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });
  try {
    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: email,
      subject: `New contact request: ${service}`,
      text: [
        "New contact form submission",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Service interest: ${service}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `<h2>New contact form submission</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Service interest:</strong> ${escapeHtml(service)}</p><h3>Message</h3><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    });
  } catch (error) {
    console.error("Contact email failed", error);
    return NextResponse.json(
      { error: "Could not send your message. Please try again later." },
      { status: 500 },
    );
  }
  return NextResponse.json({ ok: true });
}
