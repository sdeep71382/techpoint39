"use client";

import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact } from "@/i18n/services";

export default function FaqSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [openFaqs, setOpenFaqs] = useState<number[]>([0]);
  const faqs = dict.faq.items;

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
          <p className="kicker text-royal">{dict.faq.kicker}</p>
          <h2 className="section-title mt-3">{dict.faq.title}</h2>
          <p className="section-copy mt-4 max-w-[42ch] text-pretty">{dict.faq.copy}</p>
          <a href={"tel:+91" + contact.phoneNumber} className="btn btn-secondary btn-lg mt-6">
            <Phone className="h-4 w-4" />
            {contact.phoneDisplay}
          </a>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
            <p className="text-small text-muted">{dict.faq.openCount(openFaqs.length, faqs.length)}</p>
            <button
              type="button"
              onClick={() => setOpenFaqs(allOpen ? [] : faqs.map((_, index) => index))}
              className="inline-flex min-h-[32px] items-center text-small font-semibold text-royal transition hover:text-navy"
            >
              {allOpen ? dict.faq.collapseAll : dict.faq.expandAll}
            </button>
          </div>

          {/* More than one answer can be open now; the old build allowed only one. */}
          {faqs.map((faq, index) => {
            const isOpen = openFaqs.includes(index);
            return (
              <div key={faq.q} className="border-b border-line">
                <h3>
                  <button type="button" className="faq-row" onClick={() => toggle(index)} aria-expanded={isOpen}>
                    <span>{faq.q}</span>
                    <ChevronDown className="h-5 w-5 flex-none text-royal" />
                  </button>
                </h3>
                <div className="faq-answer" data-open={isOpen}>
                  <div>
                    <p className="pb-5 pr-8 text-small leading-relaxed text-muted">{faq.a}</p>
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
