"use client";

import { useState } from "react";
import { Check, ClipboardCheck, Copy, Headphones, Phone, ShieldCheck, Zap } from "lucide-react";
import { email, phoneDisplay, phoneNumber } from "@/components/site-data";

const items = [
  { icon: ShieldCheck, title: "Safe & secure", text: "Careful handling and only service-relevant document guidance." },
  { icon: Zap, title: "Time conscious", text: "Preparation first, so avoidable back-and-forth is reduced." },
  { icon: Headphones, title: "Professional help", text: "Clear explanations in simple language when you need them." },
  { icon: ClipboardCheck, title: "Process focused", text: "Structured support for forms, uploads, and follow-up steps." },
];

export default function WhyUsSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
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
          <p className="kicker text-royal">Why Tech Point</p>
          <h2 className="section-title mt-3">Support should feel clear, not complicated.</h2>
          <p className="section-copy mt-4 max-w-[48ch] text-pretty">
            Our role is practical: help you understand the requirement, prepare the request, and move
            through the applicable online process with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={"tel:+91" + phoneNumber} className="btn btn-primary btn-lg">
              <Phone className="h-4 w-4" />
              Call {phoneDisplay}
            </a>
            <button type="button" onClick={copyEmail} className="btn btn-secondary btn-lg" aria-live="polite">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Email copied" : "Copy email"}
            </button>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;
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
