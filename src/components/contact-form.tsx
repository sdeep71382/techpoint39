"use client";

import { FormEvent, useState } from "react";
import { Check, ChevronDown, LoaderCircle, Send, TriangleAlert } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { services } from "@/i18n/services";

type FormStatus = "idle" | "sending" | "success" | "error";

type ContactFormProps = {
  locale: Locale;
};

const MAX_MESSAGE = 1200;

/**
 * A bare asterisk is announced as "star" or skipped entirely, so the word is
 * carried for assistive technology and the glyph is kept purely visual.
 */
function RequiredMark({ label }: { label: string }) {
  return (
    <>
      <span className="text-alert" aria-hidden="true">
        *
      </span>
      <span className="sr-only">{label}</span>
    </>
  );
}

/* Server error codes mapped to the matching line in each dictionary. */
const errorKey: Record<string, keyof Dictionary["contact"]["errors"]> = {
  missing_fields: "required",
  invalid_email: "email",
  too_long: "tooLong",
  not_configured: "notConfigured",
  invalid_body: "invalid",
  send_failed: "invalid",
};

export default function ContactForm({ locale }: ContactFormProps) {
  const dict = getDictionary(locale);
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
      const result = (await response.json()) as { error?: string; code?: string };

      if (!response.ok) {
        const key = result.code ? errorKey[result.code] : undefined;
        throw new Error(key ? dict.contact.errors[key] : result.error || dict.contact.errors.invalid);
      }

      form.reset();
      setMessageLength(0);
      setStatus("success");
      setFeedback(dict.contact.success);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : dict.contact.errors.invalid,
      );
    }
  }

  const isSending = status === "sending";
  const isError = status === "error";
  const fields = dict.contact.fields;

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      className="mt-6 grid gap-4"
      aria-busy={isSending}
    >
      {/*
        Honeypot. The data-* attributes are load-bearing: browser autofill and
        password managers fill off-screen inputs that only carry
        autoComplete="off", and a filled honeypot is discarded server side as
        spam. The visitor then sees "message sent" for a message that was
        never sent, which is how genuine enquiries were going missing.
        autoComplete="new-password" is the one signal every browser and every
        major password manager actually honours.
      */}
      <div className="contact-honeypot" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="new-password"
          data-1p-ignore="true"
          data-lpignore="true"
          data-bwignore="true"
          data-form-type="other"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="field-label">
            {fields.name}{" "}
            <RequiredMark label={dict.a11y.required} />
          </span>
          <input name="name" type="text" autoComplete="name" required className="field" placeholder={fields.name} />
        </label>
        <label className="grid gap-1.5">
          <span className="field-label">
            {fields.email}{" "}
            <RequiredMark label={dict.a11y.required} />
          </span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            className="field"
            placeholder="you@example.com"
            dir="ltr"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5">
          <span className="field-label">{fields.phone}</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="field"
            placeholder={fields.phone}
            dir="ltr"
          />
        </label>
        {/*
          The service list already existed in the data, but this was a free-text
          field, so most enquiries arrived without a usable service name. The
          option text is localised; the value stays the English name so the
          inbox is readable and filterable whichever language was used.
        */}
        <label className="grid gap-1.5">
          <span className="field-label">{fields.service}</span>
          <div className="select-wrap">
            <select name="service" className="field" defaultValue="">
              <option value="">{dict.contact.notSureYet}</option>
              {services.map((service) => (
                <option key={service.id} value={service.name.en}>
                  {service.name[locale]}
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
            {fields.message}{" "}
            <RequiredMark label={dict.a11y.required} />
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
          placeholder={dict.contact.messagePlaceholder}
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
          {isSending ? dict.contact.sending : dict.contact.send}
        </button>
      </div>

      <p className="text-micro leading-relaxed text-muted">{dict.contact.privacy}</p>
    </form>
  );
}
