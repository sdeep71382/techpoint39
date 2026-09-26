import { Phone, Search } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact, type Service } from "@/i18n/services";
import RequestBuilder from "@/components/request-builder";

type HeroSectionProps = {
  locale: Locale;
  activeService: Service;
  checkedDocuments: string[];
  readyPercent: number;
  whatsappUrl: string;
  onServiceChange: (serviceId: string) => void;
  onToggleDocument: (document: string) => void;
};

export default function HeroSection({
  locale,
  activeService,
  checkedDocuments,
  readyPercent,
  whatsappUrl,
  onServiceChange,
  onToggleDocument,
}: HeroSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section id="top" className="hero scroll-mt-[68px] pt-[68px]">
      <div className="shell grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-20">
        <div className="relative z-10">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            {dict.hero.eyebrow}
          </p>

          {/* One size rule. The previous build had a Tailwind clamp plus two
              `!important` declarations, so the largest always won. */}
          <h1 className="mt-6 max-w-[15ch] text-h1 font-bold text-navy">
            {dict.hero.titleLead}
            <span className="text-royal">{dict.hero.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-lead text-pretty text-muted">{dict.hero.lead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#services" className="btn btn-primary btn-lg">
              <Search className="h-[18px] w-[18px]" />
              {dict.hero.ctaFind}
            </a>
            <a href={"tel:+91" + contact.phoneNumber} className="btn btn-secondary btn-lg">
              <Phone className="h-[18px] w-[18px]" />
              {dict.hero.ctaCall}
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 border-y border-line py-5">
            {dict.hero.pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={index === 1 ? "border-x border-line px-4" : index === 2 ? "pl-4" : "pr-4"}
              >
                <dt className="text-small font-bold text-navy">{pillar.title}</dt>
                <dd className="mt-1 text-micro leading-snug text-muted">{pillar.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <RequestBuilder
          locale={locale}
          service={activeService}
          checkedDocuments={checkedDocuments}
          readyPercent={readyPercent}
          whatsappUrl={whatsappUrl}
          onServiceChange={onServiceChange}
          onToggleDocument={onToggleDocument}
        />
      </div>
    </section>
  );
}
