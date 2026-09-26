"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, CircleHelp, Search, X } from "lucide-react";
import ServiceLocalLabel from "@/components/service-local-label";
import { categories, type Category, type Service } from "@/components/site-data";

type ServiceDirectoryProps = {
  services: Service[];
  activeServiceId: string;
  onSelectService: (serviceId: string, moveToBuilder?: boolean) => void;
};

export default function ServiceDirectory({ services, activeServiceId, onSelectService }: ServiceDirectoryProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("All services");
  const [query, setQuery] = useState("");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const searchTerm = query.trim().toLowerCase();

  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        const matchesCategory = activeCategory === "All services" || service.category === activeCategory;
        const haystack = [service.title, service.titlePa, service.titleHi, service.description, service.category]
          .join(" ")
          .toLowerCase();
        return matchesCategory && (!searchTerm || haystack.includes(searchTerm));
      }),
    [activeCategory, searchTerm, services],
  );

  const countForCategory = (category: Category) =>
    category === "All services"
      ? services.length
      : services.filter((service) => service.category === category).length;

  const hasFilters = searchTerm !== "" || activeCategory !== "All services";

  function clearFilters() {
    setQuery("");
    setActiveCategory("All services");
  }

  return (
    <section id="services" className="scroll-mt-20 bg-paper">
      <div className="shell section-pad">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="kicker text-royal">Service directory</p>
            <h2 className="section-title mt-3">Find the right place to start.</h2>
            <p className="section-copy mt-4 max-w-[46ch] text-pretty">
              Search by service name or narrow the list by category.
            </p>
          </div>

          <div className="relative lg:w-full lg:max-w-xl lg:justify-self-end">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input
              id="service-search"
              type="search"
              className="field rounded-full pl-11"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search PAN, passport, certificate..."
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-canvas hover:text-navy"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Service categories">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className="chip"
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
              <span className="chip-count">{countForCategory(category)}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-small text-muted">
          <p aria-live="polite">
            Showing <span className="font-semibold text-navy">{filteredServices.length}</span> of{" "}
            {services.length} services
          </p>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="btn btn-ghost min-h-[36px] px-3 text-small">
              <X className="h-3.5 w-3.5" />
              Clear filters
            </button>
          )}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            const selected = service.id === activeServiceId;
            const expanded = expandedServiceId === service.id;
            return (
              <article
                key={service.id}
                className="service-card rounded-card border border-line p-5"
                data-selected={selected}
                data-expanded={expanded}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className={"icon-tile icon-tile-" + service.accent}>
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  {selected && (
                    <span className="badge badge-royal">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      Selected
                    </span>
                  )}
                </div>

                <p className="meta-label mt-5 text-muted-strong">{service.category}</p>
                <h3 className="mt-1.5 text-h4 font-semibold text-navy">{service.title}</h3>
                <ServiceLocalLabel service={service} className="mt-1.5 block text-small text-royal" />

                {/*
                  The old build set `display: none` on the details and then set
                  `display: flex` two rules later in the same media query, so this
                  panel was always open and the toggle did nothing.
                */}
                <div className="service-card__details flex-col pt-4">
                  <p className="text-small leading-relaxed text-muted">{service.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {service.documents.map((document) => (
                      <li key={document} className="badge badge-outline whitespace-normal text-micro">
                        {document}
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.id, true)}
                    className="btn btn-ghost mt-4 min-h-[40px] self-start px-3.5 text-small"
                  >
                    {selected ? "Review checklist" : "Start this service"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  className="service-card__toggle"
                  onClick={() => setExpandedServiceId(expanded ? null : service.id)}
                  aria-expanded={expanded}
                >
                  {expanded ? "Hide details" : "View details"}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-5 rounded-card border border-line bg-paper px-6 py-14 text-center">
            <CircleHelp className="mx-auto h-8 w-8 text-line-strong" />
            <h3 className="mt-4 text-h4 font-semibold text-navy">No matching service found</h3>
            <p className="mx-auto mt-2 max-w-[46ch] text-small text-muted">
              {searchTerm
                ? "Nothing matches \u201c" + searchTerm + "\u201d. Try a broader word, or ask us directly."
                : "There are no services in this category yet. Ask us directly instead."}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={clearFilters} className="btn btn-secondary">
                Reset the list
              </button>
              <button
                type="button"
                onClick={() => onSelectService("other-services", true)}
                className="btn btn-primary"
              >
                Ask about another service
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
