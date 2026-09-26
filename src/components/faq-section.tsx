"use client";

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { faqs, phoneDisplay, phoneNumber } from "@/components/site-data";

export default function FaqSection() {
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);

  function toggle(index: number) {
    setOpenFaqs((current) =>
      current.includes(index) ? current.filter((item) => item !== index) : [...current, index],
    );
  }

  const allOpen = openFaqs.length === faqs.length;

  return (
    <section id="questions" className="scroll-mt-20 border-t border-line bg-paper">
      <div className="shell section-pad grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <p className="kicker text-royal">Before you begin</p>
          <h2 className="section-title mt-3">Common questions, plainly answered.</h2>
          <p className="section-copy mt-4 max-w-[42ch] text-pretty">
            Still unsure? Call and tell us the service name. We will help you identify the next useful
            step.
          </p>
          <a href={"tel:+91" + phoneNumber} className="btn btn-secondary btn-lg mt-6">
            <Phone className="h-4 w-4" />
            {phoneDisplay}
          </a>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
            <p className="text-small text-muted">
              <span className="font-semibold text-navy">{openFaqs.length}</span> of {faqs.length} open
            </p>
            <button
              type="button"
              onClick={() => setOpenFaqs(allOpen ? [] : faqs.map((_, index) => index))}
              className="inline-flex min-h-[32px] items-center text-small font-semibold text-royal transition hover:text-navy"
            >
              {allOpen ? "Collapse all" : "Expand all"}
            </button>
          </div>

          {/* More than one answer can be open now; the old build allowed only one. */}
          {faqs.map((faq, index) => {
            const isOpen = openFaqs.includes(index);
            return (
              <div key={faq.question} className="border-b border-line">
                <h3>
                  <button type="button" className="faq-row" onClick={() => toggle(index)} aria-expanded={isOpen}>
                    <span>{faq.question}</span>
                    <ChevronDown className="h-5 w-5 flex-none text-royal" />
                  </button>
                </h3>
                <div className="faq-answer" data-open={isOpen}>
                  <div>
                    <p className="pb-5 pr-8 text-small leading-relaxed text-muted">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
