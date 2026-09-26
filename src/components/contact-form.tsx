"use client";

import { FormEvent, useState } from "react";
import { Check, ChevronDown, LoaderCircle, Send, TriangleAlert } from "lucide-react";
import { services } from "@/components/site-data";

type FormStatus = "idle" | "sending" | "success" | "error";

const MAX_MESSAGE = 1200;

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Could not send your message.");
      }

      form.reset();
      setMessageLength(0);
      setStatus("success");
      setFeedback("Thanks. Your message has been sent, and we will get back to you soon.");
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Could not send your message. Please try again.",
      );
    }
  }

  const isSending = status === "sending";
  const isError = status === "error";

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4"
      aria-busy={isSending}
      noValidate={false}
    >
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="field-label">
            Name <span className="text-alert">*</span>
          </span>
          <input name="name" type="text" autoComplete="name" required className="field" placeholder="Your name" />
        </label>
        <label className="grid gap-1.5">
          <span className="field-label">
            Email <span className="text-alert">*</span>
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
            placeholder="you@example.com"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="field-label">Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className="field" placeholder="Your phone number" />
        </label>
        {/*
          The service list already existed in site-data, but this was a free-text
          field, so most enquiries arrived without a usable service name.
        */}
        <label className="grid gap-1.5">
          <span className="field-label">Service</span>
          <div className="select-wrap">
            <select name="service" className="field" defaultValue="">
              <option value="">Not sure yet</option>
              {services.map((service) => (
                <option key={service.id} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>
        </label>
      </div>

      <label className="grid gap-1.5">
        <span className="flex items-baseline justify-between gap-3">
          <span className="field-label">
            Message <span className="text-alert">*</span>
          </span>
          <span className="text-micro tabular-nums text-muted">
            {messageLength} / {MAX_MESSAGE}
          </span>
        </span>
        <textarea
          name="message"
          required
          rows={4}
          maxLength={MAX_MESSAGE}
          className="field resize-y"
          placeholder="Tell us a little about your request"
          onChange={(event) => setMessageLength(event.target.value.length)}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={
            "flex min-h-[1.25rem] items-start gap-1.5 text-small " +
            (isError ? "text-alert" : status === "success" ? "text-royal" : "text-muted")
          }
          role="status"
          aria-live="polite"
        >
          {status === "success" && <Check className="mt-0.5 h-4 w-4 flex-none" />}
          {isError && <TriangleAlert className="mt-0.5 h-4 w-4 flex-none" />}
          {feedback}
        </p>
        <button type="submit" className="btn btn-primary btn-lg sm:w-auto" disabled={isSending}>
          {isSending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {isSending ? "Sending..." : "Send message"}
        </button>
      </div>

      <p className="text-micro leading-relaxed text-muted">
        We use these details only to reply to your enquiry.
      </p>
    </form>
  );
}
