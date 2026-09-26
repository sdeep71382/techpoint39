"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, CircleHelp, Search } from "lucide-react";
import { categories, type Category, type Service } from "@/components/site-data";

type ServiceDirectoryProps = { services: Service[]; activeServiceId: string; onSelectService: (serviceId: string, moveToBuilder?: boolean) => void; };

export default function ServiceDirectory({ services, activeServiceId, onSelectService }: ServiceDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All services");
  const [query, setQuery] = useState("");
  const filteredServices = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return services.filter((service) => {
      const matchesCategory = activeCategory === "All services" || service.category === activeCategory;
      const matchesSearch = !searchTerm || (service.title + " " + service.localTitle + " " + service.description).toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, query, services]);

  return <section id="services" className="scroll-mt-20 py-20 sm:py-24"><div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8"><div className="grid gap-7 lg:grid-cols-[0.7fr_1.3fr] lg:items-end"><div><p className="section-kicker">Service directory</p><h2 className="section-title">Find the right place to start.</h2><p className="section-copy">Search by service name or narrow the list by category.</p></div><div className="relative lg:justify-self-end lg:w-full lg:max-w-xl"><Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search PAN, passport, certificate..." className="h-14 w-full border border-slate-300 bg-white pl-12 pr-4 text-base font-semibold text-slate-900 outline-none transition placeholder:font-normal placeholder:text-slate-400 focus:border-[#0857d6] focus:ring-4 focus:ring-blue-100" aria-label="Search services" /></div></div><div className="mt-8 flex gap-2 overflow-x-auto pb-2" aria-label="Service categories">{categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={activeCategory === category ? "filter-button filter-button-active" : "filter-button"} aria-pressed={activeCategory === category}>{category}</button>)}</div><div className="mt-7 grid gap-px overflow-hidden border border-slate-200 bg-slate-200 sm:grid-cols-2 lg:grid-cols-3">{filteredServices.map((service) => { const Icon = service.icon; const selected = service.id === activeServiceId; return <article key={service.id} className={"service-tile " + (selected ? "service-tile-selected" : "")}><div className="flex items-start justify-between gap-4"><span className={"service-icon service-icon-" + service.accent}><Icon className="h-6 w-6" /></span>{selected && <span className="selected-label"><Check className="h-3.5 w-3.5" /> Selected</span>}</div><p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{service.category}</p><h3 className="mt-2 text-xl font-black text-[#071f4f]">{service.title}</h3><p className="mt-2 min-h-10 text-xs font-semibold leading-5 text-[#0857d6]">{service.localTitle}</p><p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p><button type="button" onClick={() => onSelectService(service.id, true)} className="service-action">{selected ? "Review checklist" : "Start this service"} <ArrowRight className="h-4 w-4" /></button></article>; })}</div>{filteredServices.length === 0 && <div className="border-x border-b border-slate-200 bg-white px-6 py-14 text-center"><CircleHelp className="mx-auto h-8 w-8 text-slate-300" /><h3 className="mt-4 text-lg font-black text-[#071f4f]">No matching service found</h3><p className="mt-2 text-sm text-slate-500">Try a broader search or choose Other Online Services.</p><button type="button" onClick={() => { setQuery(""); setActiveCategory("All services"); onSelectService("other-services", true); }} className="secondary-button mx-auto mt-5 h-11 px-5 text-sm">Ask about another service</button></div>}</div></section>;
}
