"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, BadgeCheck, Check, CheckCircle2, ChevronDown, CircleHelp,
  ClipboardCheck, Clock3, Copy, FileBadge, FileCheck2, FileText, Fingerprint,
  Headphones, IdCard, Mail, Menu, MessageCircle, Phone, Printer, Search,
  ShieldCheck, Sparkles, X, Zap,
} from "lucide-react";

const phoneNumber = "9780332509";
const email = "techpointservices39@gmail.com";

type Category = "All services" | "Identity" | "Certificates" | "Applications" | "Document work";
type Service = {
  id: string;
  title: string;
  localTitle: string;
  category: Exclude<Category, "All services">;
  description: string;
  icon: LucideIcon;
  accent: string;
  documents: string[];
};

const categories: Category[] = ["All services", "Identity", "Certificates", "Applications", "Document work"];
const services: Service[] = [
  { id: "pan-card", title: "PAN Card", localTitle: "ਨਵਾਂ ਅਤੇ ਸੁਧਾਰ / नया और सुधार", category: "Identity", description: "Support for new applications, corrections, and document preparation.", icon: IdCard, accent: "blue", documents: ["Aadhaar card", "Mobile number", "Recent photo", "Signature"] },
  { id: "driving-licence", title: "Driving Licence", localTitle: "ਨਵਾਂ ਅਤੇ ਨਵੀਨੀਕਰਨ / नया और नवीनीकरण", category: "Identity", description: "Guidance for new licence applications and renewal requests.", icon: BadgeCheck, accent: "cyan", documents: ["Identity proof", "Address proof", "Recent photo", "Old licence for renewal"] },
  { id: "passport", title: "Passport", localTitle: "ਨਵਾਂ ਅਤੇ ਨਵੀਨੀਕਰਨ / नया और नवीनीकरण", category: "Identity", description: "Application, appointment, and renewal assistance with clear next steps.", icon: FileBadge, accent: "navy", documents: ["Identity proof", "Address proof", "Date of birth proof", "Old passport for renewal"] },
  { id: "voter-id", title: "Voter ID Card", localTitle: "ਵੋਟਰ ਆਈ.ਡੀ. ਸੇਵਾ / मतदाता पहचान सेवा", category: "Identity", description: "Help with registration, corrections, and online voter services.", icon: ClipboardCheck, accent: "green", documents: ["Age proof", "Address proof", "Recent photo", "Mobile number"] },
  { id: "aadhaar", title: "Aadhaar-related Services", localTitle: "ਆਧਾਰ ਸੇਵਾਵਾਂ / आधार सेवाएं", category: "Identity", description: "Assistance for supported Aadhaar-linked online service requirements.", icon: Fingerprint, accent: "yellow", documents: ["Aadhaar number", "Linked mobile number", "Supporting proof", "Service details"] },
  { id: "birth-death", title: "Birth & Death Certificate", localTitle: "ਜਨਮ ਅਤੇ ਮੌਤ ਸਰਟੀਫਿਕੇਟ / जन्म और मृत्यु प्रमाणपत्र", category: "Certificates", description: "Application guidance for certificate and record requests.", icon: FileCheck2, accent: "violet", documents: ["Applicant identity proof", "Event details", "Supporting record", "Mobile number"] },
  { id: "income-caste-residence", title: "Income, Caste & Residence", localTitle: "ਆਮਦਨ, ਜਾਤੀ ਅਤੇ ਰਿਹਾਇਸ਼ / आय, जाति और निवास", category: "Certificates", description: "Form, upload, and tracking guidance for common certificates.", icon: FileText, accent: "orange", documents: ["Identity proof", "Residence proof", "Income details", "Category proof if applicable"] },
  { id: "government-forms", title: "Online Government Forms", localTitle: "ਆਨਲਾਈਨ ਸਰਕਾਰੀ ਫਾਰਮ / ऑनलाइन सरकारी फॉर्म", category: "Applications", description: "Assistance with online forms, uploads, and application submissions.", icon: FileText, accent: "blue", documents: ["Service or form name", "Identity proof", "Required documents", "Mobile number"] },
  { id: "print-scan", title: "Printout, Photocopy & Scanning", localTitle: "ਪ੍ਰਿੰਟ, ਫੋਟੋਕਾਪੀ ਅਤੇ ਸਕੈਨ / प्रिंट, कॉपी और स्कैन", category: "Document work", description: "Document printouts, copies, and clean digital scans.", icon: Printer, accent: "navy", documents: ["Document or file", "Page count", "Paper size", "Colour preference"] },
  { id: "other-services", title: "Other Online Services", localTitle: "ਹੋਰ ਆਨਲਾਈਨ ਸੇਵਾਵਾਂ / अन्य ऑनलाइन सेवाएं", category: "Applications", description: "Tell us what you need and we will confirm whether we can assist.", icon: Sparkles, accent: "red", documents: ["Service details", "Identity proof", "Available documents", "Mobile number"] },
];

const assurances = [
  { icon: ShieldCheck, title: "Documents handled carefully", text: "Share only what is required for the selected service." },
  { icon: CheckCircle2, title: "Requirements checked first", text: "Know what to prepare before the application begins." },
  { icon: Headphones, title: "Human support", text: "Get clear explanations through call or WhatsApp." },
];
const steps = [
  { number: "01", title: "Choose a service", text: "Search the directory or select the service that matches your need.", icon: Search },
  { number: "02", title: "Prepare documents", text: "Use the checklist to see what you already have ready.", icon: ClipboardCheck },
  { number: "03", title: "Confirm with us", text: "Send the prepared request on WhatsApp or call for guidance.", icon: MessageCircle },
  { number: "04", title: "Follow the process", text: "Receive practical support through the applicable service steps.", icon: CheckCircle2 },
];
const faqs = [
  { question: "Is Tech Point Services an official government website?", answer: "No. Tech Point Services is an independent assistance provider. Eligibility, fees, processing, and final decisions remain with the relevant department." },
  { question: "Can I confirm the documents before starting?", answer: "Yes. Select a service to view a helpful starter checklist, then contact us to confirm the exact documents for your case." },
  { question: "How do I begin a request?", answer: "Choose your service, mark the documents you already have, and use the WhatsApp button. Your message will include the selected service and your readiness details." },
  { question: "What if my service is not listed?", answer: "Choose Other Online Services and briefly describe what you need. We will confirm whether assistance is available." },
];

export default function Home() {
  const [activeServiceId, setActiveServiceId] = useState(services[0].id);
  const [activeCategory, setActiveCategory] = useState<Category>("All services");
  const [query, setQuery] = useState("");
  const [checkedDocuments, setCheckedDocuments] = useState<string[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const activeService = services.find((service) => service.id === activeServiceId) ?? services[0];
  const readyPercent = Math.round((checkedDocuments.length / activeService.documents.length) * 100);
  const filteredServices = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return services.filter((service) => {
      const matchesCategory = activeCategory === "All services" || service.category === activeCategory;
      const matchesSearch = !searchTerm || `${service.title} ${service.localTitle} ${service.description}`.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query]);

  const whatsappText = useMemo(() => {
    const readyText = checkedDocuments.length ? `I currently have: ${checkedDocuments.join(", ")}.` : "Please share the required document list.";
    return `Hello Tech Point Services, I need assistance with ${activeService.title}. ${readyText}`;
  }, [activeService.title, checkedDocuments]);
  const whatsappUrl = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(whatsappText)}`;

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  function selectService(serviceId: string, moveToBuilder = false) {
    setActiveServiceId(serviceId);
    setCheckedDocuments([]);
    if (moveToBuilder) {
      window.setTimeout(() => document.getElementById("request-builder")?.scrollIntoView({ behavior: "smooth", block: "center" }), 40);
    }
  }

  function toggleDocument(document: string) {
    setCheckedDocuments((current) => current.includes(document) ? current.filter((item) => item !== document) : [...current, document]);
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/[0.92] backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Tech Point Services home">
            <span className="relative h-11 w-14 overflow-hidden border border-slate-200 bg-white">
              <Image src="/techpoint-logo.jpeg" alt="" fill priority className="object-contain p-1" sizes="56px" />
            </span>
            <span>
              <span className="block text-[15px] font-black uppercase leading-none text-[#071f4f]">Tech Point</span>
              <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] text-[#0857d6]">Services</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            <a href="#services" className="nav-link">Services</a>
            <a href="#process" className="nav-link">How it works</a>
            <a href="#why-us" className="nav-link">Why us</a>
            <a href="#questions" className="nav-link">Questions</a>
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <a href={`tel:+91${phoneNumber}`} className="icon-action" aria-label={`Call ${phoneNumber}`} title="Call us"><Phone className="h-[18px] w-[18px]" /></a>
            <a href="#request-builder" className="primary-button h-11 px-5 text-sm">Start a request <ArrowRight className="h-4 w-4" /></a>
          </div>
          <button type="button" className="icon-action lg:hidden" onClick={() => setIsMenuOpen((current) => !current)} aria-label="Toggle navigation" aria-expanded={isMenuOpen}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-xl lg:hidden">
            <nav className="mx-auto grid max-w-[1320px] gap-1" aria-label="Mobile navigation">
              {[["Services", "#services"], ["How it works", "#process"], ["Why us", "#why-us"], ["Questions", "#questions"]].map(([label, href]) => (
                <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 px-2 py-4 text-base font-bold text-slate-800">{label}</a>
              ))}
              <a href="#request-builder" onClick={() => setIsMenuOpen(false)} className="primary-button mt-3 h-12 justify-center">Start a request <ArrowRight className="h-4 w-4" /></a>
            </nav>
          </div>
        )}
      </header>

      <section id="top" className="hero-surface scroll-mt-24 pt-[72px]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-4 py-14 sm:px-6 lg:min-h-[720px] lg:grid-cols-[0.88fr_1.12fr] lg:px-8 lg:py-16">
          <div className="relative z-10">
            <div className="eyebrow"><span className="h-2 w-2 bg-[#ffd21f]" /> Tech Point Services</div>
            <h1 className="mt-6 max-w-2xl text-balance text-[clamp(2.75rem,5vw,4.9rem)] font-black leading-[1.02] text-[#071f4f]">Government service assistance, <span className="text-[#0857d6]">minus the guesswork.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">Choose a service, check what to prepare, and reach a real person with a request that is already clear.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#services" className="primary-button h-[52px] justify-center px-6">Find your service <Search className="h-[18px] w-[18px]" /></a>
              <a href={`tel:+91${phoneNumber}`} className="secondary-button h-[52px] justify-center px-6"><Phone className="h-[18px] w-[18px]" /> Talk to support</a>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-slate-200 py-5">
              <div className="pr-4"><p className="text-sm font-black text-[#071f4f]">Clear</p><p className="mt-1 text-xs leading-5 text-slate-500">Know the next step</p></div>
              <div className="border-x border-slate-200 px-4"><p className="text-sm font-black text-[#071f4f]">Prepared</p><p className="mt-1 text-xs leading-5 text-slate-500">Check documents first</p></div>
              <div className="pl-4"><p className="text-sm font-black text-[#071f4f]">Supported</p><p className="mt-1 text-xs leading-5 text-slate-500">Ask before starting</p></div>
            </div>
          </div>
          <RequestBuilder service={activeService} services={services} checkedDocuments={checkedDocuments} readyPercent={readyPercent} whatsappUrl={whatsappUrl} onServiceChange={selectService} onToggleDocument={toggleDocument} />
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1320px] divide-y divide-slate-200 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">
          {assurances.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex gap-4 py-7 md:px-6 first:pl-0 last:pr-0">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#0857d6]" />
                <div><h2 className="text-sm font-black text-[#071f4f]">{item.title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="services" className="scroll-mt-20 py-20 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
            <div>
              <p className="section-kicker">Service directory</p>
              <h2 className="section-title">Find the right place to start.</h2>
              <p className="section-copy">Search by service name or narrow the list by category.</p>
            </div>
            <div className="relative lg:justify-self-end lg:w-full lg:max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search PAN, passport, certificate..."
                className="h-14 w-full border border-slate-300 bg-white pl-12 pr-4 text-base font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0857d6] focus:ring-4 focus:ring-blue-100"
                aria-label="Search services"
              />
            </div>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="Service categories">
            {categories.map((category) => (
              <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? "filter-button filter-button-active" : "filter-button"} aria-pressed={activeCategory === category}>
                {category}
              </button>
            ))}
          </div>

          <div className="mt-7 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">
            {filteredServices.map((service) => {
              const Icon = service.icon;
              const selected = service.id === activeService.id;
              return (
                <article key={service.id} className={`service-tile ${selected ? "service-tile-selected" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <span className={`service-icon service-icon-${service.accent}`}><Icon className="h-6 w-6" /></span>
                    {selected && <span className="selected-label"><Check className="h-3.5 w-3.5" /> Selected</span>}
                  </div>
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{service.category}</p>
                  <h3 className="mt-2 text-xl font-black text-[#071f4f]">{service.title}</h3>
                  <p className="mt-2 min-h-10 text-xs font-semibold leading-5 text-[#0857d6]">{service.localTitle}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
                  <button type="button" onClick={() => selectService(service.id, true)} className="service-action">
                    {selected ? "Review checklist" : "Start this service"} <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="border-x border-b border-slate-200 bg-white px-6 py-14 text-center">
              <CircleHelp className="mx-auto h-8 w-8 text-slate-300" />
              <h3 className="mt-4 text-lg font-black text-[#071f4f]">No matching service found</h3>
              <p className="mt-2 text-sm text-slate-500">Try a broader search or choose Other Online Services.</p>
              <button type="button" onClick={() => { setQuery(""); setActiveCategory("All services"); selectService("other-services", true); }} className="secondary-button mx-auto mt-5 h-11 px-5 text-sm">Ask about another service</button>
            </div>
          )}
        </div>
      </section>

      <section id="process" className="scroll-mt-20 bg-[#071f4f] py-20 text-white sm:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="section-kicker text-[#ffd21f]">How it works</p>
            <h2 className="section-title text-white">A useful path, from question to next step.</h2>
            <p className="section-copy text-blue-100">Each stage exists to remove uncertainty before your request moves forward.</p>
          </div>
          <div className="mt-12 grid border-y border-white/15 md:grid-cols-4 md:divide-x md:divide-white/15">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className="group relative py-8 md:px-6 md:py-9 first:pl-0 last:pr-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black tracking-[0.2em] text-[#ffd21f]">{step.number}</span>
                    <Icon className="h-5 w-5 text-blue-300 transition group-hover:text-white" />
                  </div>
                  <h3 className="mt-8 text-lg font-black">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-blue-100">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="why-us" className="scroll-mt-20 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8">
          <div>
            <p className="section-kicker">Why Tech Point</p>
            <h2 className="section-title">Support should feel clear, not complicated.</h2>
            <p className="section-copy">Our role is practical: help you understand the requirement, prepare the request, and move through the applicable online process with confidence.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={`tel:+91${phoneNumber}`} className="primary-button h-12 justify-center px-5"><Phone className="h-4 w-4" /> Call {phoneNumber}</a>
              <button type="button" onClick={copyEmail} className="secondary-button h-12 justify-center px-5" aria-live="polite">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Email copied" : "Copy email"}
              </button>
            </div>
          </div>
          <div className="border border-slate-200 bg-[#f7f9fc] p-3 sm:p-6">
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "Safe & secure", text: "Careful handling and only service-relevant document guidance." },
                { icon: Zap, title: "Time conscious", text: "Preparation first, so avoidable back-and-forth is reduced." },
                { icon: Headphones, title: "Professional help", text: "Clear explanations in simple language when you need them." },
                { icon: ClipboardCheck, title: "Process focused", text: "Structured support for forms, uploads, and follow-up steps." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white p-6 sm:p-7">
                    <Icon className="h-6 w-6 text-[#0857d6]" />
                    <h3 className="mt-5 text-base font-black text-[#071f4f]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="questions" className="scroll-mt-20 border-t border-slate-200 py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
          <div>
            <p className="section-kicker">Before you begin</p>
            <h2 className="section-title">Common questions, plainly answered.</h2>
            <p className="section-copy">Still unsure? Call and tell us the service name. We will help you identify the next useful step.</p>
          </div>
          <div className="border-t border-slate-300">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={faq.question} className="border-b border-slate-300">
                  <button type="button" className="flex w-full items-center justify-between gap-6 py-5 text-left" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                    <span className="text-base font-black text-[#071f4f]">{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#0857d6] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  <div className={`faq-answer ${isOpen ? "faq-answer-open" : ""}`}>
                    <p className="pb-5 pr-10 text-sm leading-7 text-slate-600">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#0857d6] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-[1320px] items-center gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#ffd21f]">Ready when you are</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-black leading-tight sm:text-4xl">Start with the service. We’ll help make the next step clear.</h2>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-blue-100">
              <a href={`tel:+91${phoneNumber}`} className="inline-flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4" /> {phoneNumber}</a>
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4" /> {email}</a>
            </div>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-14 items-center justify-center gap-2 bg-[#ffd21f] px-7 font-black text-[#07101f] transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/30">
            <MessageCircle className="h-5 w-5" /> Continue on WhatsApp
          </a>
        </div>
      </section>

      <footer className="bg-[#061630] pb-24 pt-10 text-white sm:pb-10">
        <div className="mx-auto grid max-w-[1320px] gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative h-10 w-[52px] overflow-hidden bg-white"><Image src="/techpoint-logo.jpeg" alt="" fill className="object-contain p-1" sizes="52px" /></span>
              <span className="text-sm font-black uppercase tracking-[0.12em]">Tech Point Services</span>
            </div>
            <p className="mt-5 max-w-2xl text-xs leading-6 text-slate-400">Tech Point Services is an independent assistance provider and is not an official government website. Fees, eligibility, processing, and approval are governed by the relevant department.</p>
          </div>
          <p className="text-xs text-slate-500">© 2026 Tech Point Services</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-slate-200 bg-white p-2 shadow-[0_-12px_30px_rgba(7,31,79,0.12)] sm:hidden">
        <a href={`tel:+91${phoneNumber}`} className="inline-flex h-12 items-center justify-center gap-2 font-black text-[#071f4f]"><Phone className="h-4 w-4" /> Call</a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 bg-[#0857d6] font-black text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
      </div>
    </main>
  );
}

type RequestBuilderProps = {
  service: Service;
  services: Service[];
  checkedDocuments: string[];
  readyPercent: number;
  whatsappUrl: string;
  onServiceChange: (serviceId: string) => void;
  onToggleDocument: (document: string) => void;
};

function RequestBuilder({
  service,
  services: serviceOptions,
  checkedDocuments,
  readyPercent,
  whatsappUrl,
  onServiceChange,
  onToggleDocument,
}: RequestBuilderProps) {
  const Icon = service.icon;

  return (
    <div id="request-builder" className="request-shell scroll-mt-28">
      <div className="request-topbar">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-[#ffd21f] text-[#07101f]"><Zap className="h-4 w-4" /></span>
          <div><p className="text-sm font-black text-white">Build your request</p><p className="mt-0.5 text-xs text-blue-200">A quick preparation check</p></div>
        </div>
        <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300"><span className="h-2 w-2 animate-pulse bg-emerald-400" /> Support available</span>
      </div>

      <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
        <div className="border-b border-slate-200 bg-[#f4f7fb] p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <label htmlFor="service-select" className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">1. Select service</label>
          <div className="relative mt-3">
            <select id="service-select" value={service.id} onChange={(event) => onServiceChange(event.target.value)} className="h-12 w-full appearance-none border border-slate-300 bg-white px-4 pr-10 text-sm font-black text-[#071f4f] outline-none focus:border-[#0857d6] focus:ring-4 focus:ring-blue-100">
              {serviceOptions.map((option) => <option key={option.id} value={option.id}>{option.title}</option>)}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          </div>

          <div className="mt-6 border border-slate-200 bg-white p-5">
            <span className={`service-icon service-icon-${service.accent}`}><Icon className="h-6 w-6" /></span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{service.category}</p>
            <h2 className="mt-2 text-xl font-black text-[#071f4f]">{service.title}</h2>
            <p className="mt-2 text-xs font-semibold leading-5 text-[#0857d6]">{service.localTitle}</p>
            <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-6">
          <div className="flex items-start justify-between gap-5">
            <div><p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">2. Check what you have</p><h3 className="mt-2 text-lg font-black text-[#071f4f]">Starter document list</h3></div>
            <span className="readiness" aria-live="polite">{readyPercent}% ready</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden bg-slate-100" aria-hidden="true">
            <div className="h-full bg-[#0857d6] transition-all duration-500" style={{ width: `${readyPercent}%` }} />
          </div>
          <div className="mt-5 grid gap-2">
            {service.documents.map((document) => {
              const checked = checkedDocuments.includes(document);
              return (
                <button key={document} type="button" onClick={() => onToggleDocument(document)} className={`document-check ${checked ? "document-check-active" : ""}`} aria-pressed={checked}>
                  <span className="check-box"><Check className="h-3.5 w-3.5" /></span><span>{document}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500"><CircleHelp className="mt-0.5 h-3.5 w-3.5 shrink-0" /> Exact requirements may vary. We confirm them before work begins.</p>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="primary-button mt-5 h-12 w-full justify-center"><MessageCircle className="h-[18px] w-[18px]" /> Send prepared request</a>
        </div>
      </div>
      <div className="request-footnote"><Clock3 className="h-4 w-4" /> No form submission happens on this website. Start by confirming the requirement with us.</div>
    </div>
  );
}
