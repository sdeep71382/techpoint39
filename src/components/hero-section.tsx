import { Phone, Search } from "lucide-react";
import RequestBuilder from "@/components/request-builder";
import type { Service } from "@/components/site-data";

type HeroSectionProps = {
  activeService: Service;
  services: Service[];
  checkedDocuments: string[];
  readyPercent: number;
  whatsappUrl: string;
  onServiceChange: (serviceId: string) => void;
  onToggleDocument: (document: string) => void;
};

const pillars = [
  { title: "Clear", text: "Know the next step" },
  { title: "Prepared", text: "Check documents first" },
  { title: "Supported", text: "Ask before starting" },
];

export default function HeroSection({
  activeService,
  services,
  checkedDocuments,
  readyPercent,
  whatsappUrl,
  onServiceChange,
  onToggleDocument,
}: HeroSectionProps) {
  return (
    <section id="top" className="hero scroll-mt-[68px] pt-[68px]">
      <div className="shell grid items-center gap-10 py-12 sm:py-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-20">
        <div className="relative z-10">
          <p className="eyebrow">
            <span className="eyebrow-dot" />
            Tech Point Services
          </p>

          {/*
            One size rule now. Previously the H1 carried a Tailwind clamp plus two
            `!important` CSS declarations, so the largest of the three always won
            no matter what was edited.
          */}
          <h1 className="mt-6 max-w-[15ch] text-h1 font-bold text-navy">
            Government service assistance, <span className="text-royal">minus the guesswork.</span>
          </h1>

          <p className="mt-6 max-w-[46ch] text-lead text-pretty text-muted">
            Choose a service, check what to prepare, and reach a real person with a request that is
            already clear.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#services" className="btn btn-primary btn-lg">
              <Search className="h-[18px] w-[18px]" />
              Find your service
            </a>
            <a href="tel:+919780332509" className="btn btn-secondary btn-lg">
              <Phone className="h-[18px] w-[18px]" />
              Talk to support
            </a>
          </div>

          <dl className="mt-10 grid max-w-lg grid-cols-3 border-y border-line py-5">
            {pillars.map((pillar, index) => (
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
          service={activeService}
          services={services}
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
