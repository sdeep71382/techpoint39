"use client";

import { useMemo, useState } from "react";
import { phoneNumber, services, type Service } from "@/components/site-data";
import SiteHeader from "@/components/site-header";
import HeroSection from "@/components/hero-section";
import AssuranceStrip from "@/components/assurance-strip";
import ServiceDirectory from "@/components/service-directory";
import ProcessSection from "@/components/process-section";
import WhyUsSection from "@/components/why-us-section";
import FaqSection from "@/components/faq-section";
import ContactSection from "@/components/contact-section";
import SiteFooter from "@/components/site-footer";
import MobileContactBar from "@/components/mobile-contact-bar";

export default function Home() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);

  const activeService: Service =
    services.find((service) => service.id === activeServiceId) ?? services[0];

  const readyPercent = Math.round(
    (checkedDocuments.length / activeService.documents.length) * 100,
  );

  const whatsappText = useMemo(() => {
    const readyText = checkedDocuments.length
      ? "I currently have: " + checkedDocuments.join(", ") + "."
      : "Please share the required document list.";
    return "Hello Tech Point Services, I need assistance with " + activeService.title + ". " + readyText;
  }, [activeService.title, checkedDocuments]);

  const whatsappUrl = "https://wa.me/91" + phoneNumber + "?text=" + encodeURIComponent(whatsappText);

  function selectService(serviceId: string, moveToBuilder = false) {
    setActiveServiceId(serviceId);
    setCheckedDocuments([]);
    if (moveToBuilder) {
      window.setTimeout(
        () => document.getElementById("request-builder")?.scrollIntoView({ behavior: "smooth", block: "center" }),
        40,
      );
    }
  }

  function toggleDocument(document: string) {
    setCheckedDocuments((current) =>
      current.includes(document) ? current.filter((item) => item !== document) : [...current, document],
    );
  }

  return (
    <div className="page min-h-screen bg-canvas text-ink">
      <SiteHeader />
      <main>
        <HeroSection
          activeService={activeService}
          services={services}
          checkedDocuments={checkedDocuments}
          readyPercent={readyPercent}
          whatsappUrl={whatsappUrl}
          onServiceChange={selectService}
          onToggleDocument={toggleDocument}
        />
        <AssuranceStrip />
        <ServiceDirectory services={services} activeServiceId={activeServiceId} onSelectService={selectService} />
        <ProcessSection />
        <WhyUsSection />
        <FaqSection />
        <ContactSection whatsappUrl={whatsappUrl} />
      </main>
      <SiteFooter />
      <MobileContactBar whatsappUrl={whatsappUrl} />
    </div>
  );
}
