"use client";

import { useCallback, useMemo, useState } from "react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact, services, type Service } from "@/i18n/services";

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

export default function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);

  const activeService: Service =
    services.find((service) => service.id === activeServiceId) ?? services[0];

  const readyPercent = Math.round(
    (checkedDocuments.length / activeService.documents[locale].length) * 100,
  );

  const whatsappText = useMemo(() => {
    const readyText = checkedDocuments.length
      ? dict.whatsapp.have(checkedDocuments.join(", "))
      : dict.whatsapp.needList;
    return dict.whatsapp.greeting(activeService.name[locale]) + " " + readyText;
  }, [activeService, checkedDocuments, dict, locale]);

  const whatsappUrl =
    "https://wa.me/91" + contact.phoneNumber + "?text=" + encodeURIComponent(whatsappText);

  const selectService = useCallback((serviceId: string, moveToBuilder = false) => {
    setActiveServiceId(serviceId);
    setCheckedDocuments([]);
    if (moveToBuilder) {
      window.setTimeout(
        () =>
          document.getElementById("request-builder")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          }),
        40,
      );
    }
  }, []);

  const toggleDocument = useCallback((document: string) => {
    setCheckedDocuments((current) =>
      current.includes(document)
        ? current.filter((item) => item !== document)
        : [...current, document],
    );
  }, []);

  return (
    <div className="page min-h-screen bg-canvas text-ink">
      <SiteHeader locale={locale} />
      <main>
        <HeroSection
          locale={locale}
          activeService={activeService}
          checkedDocuments={checkedDocuments}
          readyPercent={readyPercent}
          whatsappUrl={whatsappUrl}
          onServiceChange={selectService}
          onToggleDocument={toggleDocument}
        />
        <AssuranceStrip locale={locale} />
        <ServiceDirectory
          locale={locale}
          activeServiceId={activeServiceId}
          onSelectService={selectService}
        />
        <ProcessSection locale={locale} />
        <WhyUsSection locale={locale} />
        <FaqSection locale={locale} />
        <ContactSection locale={locale} whatsappUrl={whatsappUrl} />
      </main>
      <SiteFooter locale={locale} />
      <MobileContactBar locale={locale} whatsappUrl={whatsappUrl} />
    </div>
  );
}
