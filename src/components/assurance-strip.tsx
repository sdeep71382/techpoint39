import { CheckCircle2, Headphones, ShieldCheck } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

/* Fixed in the same order as the copy so the icons never shift between languages. */
const icons = [ShieldCheck, CheckCircle2, Headphones];

export default function AssuranceStrip({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <section className="border-y border-line bg-paper">
      {/*
        These were <h2> elements, so three small labels sat in the document
        outline at the same level as the real section headings. A list is what
        this actually is.
      */}
      <ul className="shell grid gap-y-2 py-2 md:grid-cols-3 md:gap-y-0">
        {dict.assurance.map((item, index) => {
          const Icon = icons[index] ?? ShieldCheck;
          return (
            <li
              key={item.title}
              className={
                "flex gap-3 py-5 md:px-6 " +
                (index > 0 ? "md:border-l md:border-line" : "") +
                (index === 0 ? "md:pl-0" : "")
              }
            >
              <span className="icon-tile icon-tile-blue h-9 w-9 rounded-lg">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <div>
                <p className="text-small font-semibold text-navy">{item.title}</p>
                <p className="mt-1 text-small leading-relaxed text-muted">{item.text}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
