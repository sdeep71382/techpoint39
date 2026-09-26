import { Check, ChevronDown, CircleHelp, Clock3, MessageCircle } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { services, type Service } from "@/i18n/services";
import ServiceLocalLabel from "@/components/service-local-label";

type RequestBuilderProps = {
  locale: Locale;
  service: Service;
  checkedDocuments: string[];
  readyPercent: number;
  whatsappUrl: string;
  onServiceChange: (serviceId: string) => void;
  onToggleDocument: (document: string) => void;
};

export default function RequestBuilder({
  locale,
  service,
  checkedDocuments,
  readyPercent,
  whatsappUrl,
  onServiceChange,
  onToggleDocument,
}: RequestBuilderProps) {
  const dict = getDictionary(locale);
  const Icon = service.icon;
  const documents = service.documents[locale];
  const missingCount = documents.length - checkedDocuments.length;

  return (
    <div id="request-builder" className="panel scroll-mt-24">
      <div className="panel-topbar">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-signal text-ink">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div className="leading-tight">
            <p className="text-small font-semibold text-white">{dict.builder.title}</p>
            <p className="mt-0.5 text-micro text-on-navy-muted">{dict.builder.subtitle}</p>
          </div>
        </div>
        <span className="badge badge-signal whitespace-nowrap">
          {dict.builder.percent(readyPercent)}
        </span>
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-line bg-canvas p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <label htmlFor="service-select" className="meta-label text-muted-strong">
            {dict.builder.stepService}
          </label>
          <div className="select-wrap mt-2.5">
            <select
              id="service-select"
              className="field font-semibold text-navy"
              value={service.id}
              onChange={(event) => onServiceChange(event.target.value)}
            >
              {services.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name[locale]}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>

          <div className="mt-4 rounded-card border border-line bg-paper p-4">
            <span className={"icon-tile icon-tile-" + service.accent + " h-10 w-10 rounded-[10px]"}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="meta-label mt-4 text-muted-strong">
              {dict.directory.categories[service.category]}
            </p>
            <h2 className="mt-1.5 text-h3 font-bold text-navy">{service.name[locale]}</h2>
            <ServiceLocalLabel service={service} locale={locale} className="mt-1.5 block text-royal" />
            <p className="mt-2.5 text-small leading-relaxed text-muted">{service.description[locale]}</p>
            <p className="mt-3 flex items-center gap-1.5 text-micro font-medium text-muted-strong">
              <Clock3 className="h-3.5 w-3.5 flex-none" />
              {service.turnaround[locale]}
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="meta-label text-muted-strong">{dict.builder.stepDocs}</p>
              <h3 className="mt-1.5 text-h4 font-semibold text-navy">{dict.builder.checklist}</h3>
            </div>
            <span className="badge badge-outline">
              {missingCount === 0 ? dict.builder.allReady : dict.builder.left(missingCount)}
            </span>
          </div>

          <div
            className="meter mt-3"
            role="progressbar"
            aria-label={dict.builder.meterLabel}
            aria-valuenow={readyPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="meter-fill" style={{ width: readyPercent + "%" }} />
          </div>

          <div className="mt-4 grid gap-1.5">
            {documents.map((document) => {
              const checked = checkedDocuments.includes(document);
              return (
                <button
                  key={document}
                  type="button"
                  className="doc-row"
                  onClick={() => onToggleDocument(document)}
                  aria-pressed={checked}
                >
                  <span className="doc-check">
                    <Check className="h-3.5 w-3.5" strokeWidth={3.5} />
                  </span>
                  <span>{document}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-3.5 flex items-start gap-2 text-micro leading-relaxed text-muted">
            <CircleHelp className="mt-0.5 h-3.5 w-3.5 flex-none" />
            {dict.builder.note}
          </p>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-lg mt-4 w-full"
          >
            <MessageCircle className="h-[18px] w-[18px]" />
            {dict.builder.cta}
          </a>
        </div>
      </div>

      <p className="note-strip">
        <Clock3 className="mt-0.5 h-4 w-4 flex-none" />
        {dict.builder.footnote}
      </p>
    </div>
  );
}
