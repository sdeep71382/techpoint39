import { Check, ChevronDown, CircleHelp, Clock3, MessageCircle } from "lucide-react";
import ServiceLocalLabel from "@/components/service-local-label";
import type { Service } from "@/components/site-data";

type RequestBuilderProps = {
  service: Service;
  services: Service[];
  checkedDocuments: string[];
  readyPercent: number;
  whatsappUrl: string;
  onServiceChange: (serviceId: string) => void;
  onToggleDocument: (document: string) => void;
};

export default function RequestBuilder({
  service,
  services: serviceOptions,
  checkedDocuments,
  readyPercent,
  whatsappUrl,
  onServiceChange,
  onToggleDocument,
}: RequestBuilderProps) {
  const Icon = service.icon;
  const missingCount = service.documents.length - checkedDocuments.length;

  return (
    <div id="request-builder" className="panel scroll-mt-24">
      <div className="panel-topbar">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-signal text-ink">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <div className="leading-tight">
            <p className="text-small font-semibold text-white">Build your request</p>
            <p className="mt-0.5 text-micro text-on-navy-muted">A quick preparation check</p>
          </div>
        </div>
        <span className="badge badge-signal whitespace-nowrap">{readyPercent}% ready</span>
      </div>

      <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
        <div className="border-b border-line bg-canvas p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <label htmlFor="service-select" className="meta-label text-muted-strong">
            1. Select service
          </label>
          <div className="select-wrap mt-3">
            <select
              id="service-select"
              className="field font-semibold text-navy"
              value={service.id}
              onChange={(event) => onServiceChange(event.target.value)}
            >
              {serviceOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.title}
                </option>
              ))}
            </select>
            <ChevronDown />
          </div>

          <div className="mt-5 rounded-card border border-line bg-paper p-5">
            <span className={"icon-tile icon-tile-" + service.accent}>
              <Icon className="h-6 w-6" />
            </span>
            <p className="meta-label mt-5 text-muted-strong">{service.category}</p>
            <h2 className="mt-2 text-h3 font-bold text-navy">{service.title}</h2>
            <ServiceLocalLabel service={service} className="mt-2 block text-royal" />
            <p className="mt-3 text-small leading-relaxed text-muted">{service.description}</p>
            <p className="mt-4 flex items-center gap-1.5 text-micro font-medium text-muted-strong">
              <Clock3 className="h-3.5 w-3.5 flex-none" />
              {service.turnaround}
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="meta-label text-muted-strong">2. Check what you have</p>
              <h3 className="mt-1.5 text-h4 font-semibold text-navy">Starter document list</h3>
            </div>
            <span className="badge badge-outline">
              {missingCount === 0 ? "All ready" : missingCount + " left"}
            </span>
          </div>

          <div
            className="meter mt-4"
            role="progressbar"
            aria-label="Document readiness"
            aria-valuenow={readyPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div className="meter-fill" style={{ width: readyPercent + "%" }} />
          </div>

          <div className="mt-5 grid gap-2">
            {service.documents.map((document) => {
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

          <p className="mt-4 flex items-start gap-2 text-micro leading-relaxed text-muted">
            <CircleHelp className="mt-0.5 h-3.5 w-3.5 flex-none" />
            Exact requirements may vary. We confirm them before work begins.
          </p>

          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg mt-5 w-full">
            <MessageCircle className="h-[18px] w-[18px]" />
            Send prepared request
          </a>
        </div>
      </div>

      <p className="note-strip">
        <Clock3 className="mt-0.5 h-4 w-4 flex-none" />
        No form submission happens on this website. Start by confirming the requirement with us.
      </p>
    </div>
  );
}
