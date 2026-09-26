"use client";

import { useState } from "react";
import { Check, ClipboardCheck, Copy, Headphones, Phone, ShieldCheck, Zap } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact } from "@/i18n/services";

const icons = [ShieldCheck, Zap, Headphones, ClipboardCheck];

export default function WhyUsSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id="why-us" className="scroll-mt-20 bg-canvas">
      <div className="shell section-pad grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="kicker text-royal">{dict.why.kicker}</p>
          <h2 className="section-title mt-3">{dict.why.title}</h2>
          <p className="section-copy mt-4 max-w-[48ch] text-pretty">{dict.why.copy}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={"tel:+91" + contact.phoneNumber} className="btn btn-primary btn-lg">
              <Phone className="h-4 w-4" />
              {dict.why.call} {contact.phoneDisplay}
            </a>
            <button type="button" onClick={copyEmail} className="btn btn-secondary btn-lg" aria-live="polite">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? dict.why.copied : dict.why.copyEmail}
            </button>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {dict.why.items.map((item, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <li key={item.title} className="rounded-card border border-line bg-paper p-5 shadow-card sm:p-6">
                <span className="icon-tile icon-tile-blue h-10 w-10 rounded-lg">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-h4 font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-muted">{item.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
