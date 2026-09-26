"use client";

import { FormEvent, useState } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setFeedback("");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "Could not send your message.");
      form.reset(); setStatus("success"); setFeedback("Thanks. Your message has been sent, and we will get back to you soon.");
    } catch (error) { setStatus("error"); setFeedback(error instanceof Error ? error.message : "Could not send your message. Please try again."); }
  }
  const isSending = status === "sending";
  return (<form onSubmit={handleSubmit} className="contact-form" aria-busy={isSending}>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="contact-field"><span>Name <span aria-hidden="true">*</span></span><input name="name" type="text" autoComplete="name" required placeholder="Your name" /></label>
      <label className="contact-field"><span>Email <span aria-hidden="true">*</span></span><input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
    </div>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="contact-field"><span>Phone</span><input name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" /></label>
      <label className="contact-field"><span>Service</span><input name="service" type="text" placeholder="What do you need help with?" /></label>
    </div>
    <label className="contact-field"><span>Message <span aria-hidden="true">*</span></span><textarea name="message" required rows={4} placeholder="Tell us a little about your request" /></label>
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className={`contact-feedback ${status === "error" ? "contact-feedback-error" : ""} ${status === "success" ? "contact-feedback-success" : ""}`} role="status" aria-live="polite">{status === "success" && <Check className="h-4 w-4 shrink-0" />}{feedback}</p>
      <button type="submit" className="contact-submit" disabled={isSending}>{isSending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}{isSending ? "Sending..." : "Send message"}</button>
    </div>
  </form>);
}
