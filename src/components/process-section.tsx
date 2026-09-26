import { CheckCircle2, ClipboardCheck, MessageCircle, Search } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/* The stage numbers 01-04 are the same in every language, so only icons pair up. */
const icons = [Search, ClipboardCheck, MessageCircle, CheckCircle2];
const numbers = ["01", "02", "03", "04"];

export default function ProcessSection({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section id="process" className="band-navy scroll-mt-20">
      <div className="shell section-pad">
        <div className="max-w-2xl">
          <p className="kicker">{dict.process.kicker}</p>
          <h2 className="section-title mt-3">{dict.process.title}</h2>
          <p className="section-copy mt-4 text-pretty">{dict.process.copy}</p>
        </div>

        <ol className="mt-12 grid gap-4 md:grid-cols-4 md:gap-0">
          {dict.process.steps.map((step, index) => {
            const Icon = icons[index] ?? Search;
            return (
              <li
                key={step.title}
                className={
                  "rounded-card border border-white/15 bg-white/[0.04] p-5 md:rounded-none md:border-y-0 md:border-l-0 md:bg-transparent md:p-6 md:py-8 " +
                  (index === 0 ? "md:pl-0" : "md:border-l md:border-white/15")
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-small font-bold tracking-[0.18em] text-signal">
                    {numbers[index]}
                  </span>
                  <Icon className="h-5 w-5 text-on-navy-muted" />
                </div>
                <h3 className="mt-6 text-h4 font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-small leading-relaxed text-on-navy-soft">{step.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
