"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, CircleHelp, Search, X } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { filterKeys, services, type FilterKey } from "@/i18n/services";
import ServiceLocalLabel from "@/components/service-local-label";

type ServiceDirectoryProps = {
  locale: Locale;
  activeServiceId: string;
  onSelectService: (serviceId: string, moveToBuilder?: boolean) => void;
};

export default function ServiceDirectory({
  locale,
  activeServiceId,
  onSelectService,
}: ServiceDirectoryProps) {
  const dict = getDictionary(locale);
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);

  const searchTerm = query.trim().toLowerCase();

  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        const matchesCategory = activeFilter === "all" || service.category === activeFilter;
        /*
         * Every name and description is searched, not just the current language.
         * Someone who landed on the Punjabi page still types "passport", and
         * someone on the English page may type "paasport".
         */
        const haystack = [
          service.name.en,
          service.name.pa,
          service.name.hi,
          service.description[locale],
          dict.directory.categories[service.category],
        ]
          .join(" ")
          .toLowerCase();
        return matchesCategory && (!searchTerm || haystack.includes(searchTerm));
      }),
    [activeFilter, searchTerm, locale, dict],
  );

  const countForFilter = (filter: FilterKey) =>
    filter === "all"
      ? services.length
      : services.filter((service) => service.category === filter).length;

  const hasFilters = searchTerm !== "" || activeFilter !== "all";

  function clearFilters() {
    setQuery("");
    setActiveFilter("all");
  }

  return (
    <section id="services" className="scroll-mt-20 bg-paper">
      <div className="shell section-pad">
        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="kicker text-royal">{dict.directory.kicker}</p>
            <h2 className="section-title mt-3">{dict.directory.title}</h2>
            <p className="section-copy mt-4 max-w-[46ch] text-pretty">{dict.directory.copy}</p>
          </div>

          <div className="relative lg:w-full lg:max-w-xl lg:justify-self-end">
            <label htmlFor="service-search" className="sr-only">
              {dict.directory.searchLabel}
            </label>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted" />
            <input
              id="service-search"
              type="search"
              className="field rounded-full pl-11"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={dict.directory.searchPlaceholder}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-canvas hover:text-navy"
                aria-label={dict.directory.clearSearch}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={dict.directory.searchLabel}>
          {filterKeys.map((filter) => (
            <button
              key={filter}
              type="button"
              className="chip"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {dict.directory.categories[filter]}
              <span className="chip-count">{countForFilter(filter)}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-small text-muted">
          <p aria-live="polite">{dict.directory.resultCount(filteredServices.length, services.length)}</p>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="btn btn-ghost min-h-[36px] px-3 text-small">
              <X className="h-3.5 w-3.5" />
              {dict.directory.clearFilters}
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
                      {dict.directory.selected}
                    </span>
                  )}
                </div>

                <p className="meta-label mt-5 text-muted-strong">
                  {dict.directory.categories[service.category]}
                </p>
                <h3 className="mt-1.5 text-h4 font-semibold text-navy">{service.name[locale]}</h3>
                <ServiceLocalLabel
                  service={service}
                  locale={locale}
                  className="mt-1.5 block text-small text-royal"
                />

                {/*
                  The old build set `display: none` on the details and then set
                  `display: flex` two rules later in the same media query, so this
                  panel was always open and the toggle did nothing.
                */}
                <div className="service-card__details flex-col pt-4">
                  <p className="text-small leading-relaxed text-muted">
                    {service.description[locale]}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {service.documents[locale].map((document) => (
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
                    {selected ? dict.directory.review : dict.directory.start}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <button
                  type="button"
                  className="service-card__toggle"
                  onClick={() => setExpandedServiceId(expanded ? null : service.id)}
                  aria-expanded={expanded}
                >
                  {expanded ? dict.directory.hideDetails : dict.directory.viewDetails}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="mt-5 rounded-card border border-line bg-paper px-6 py-14 text-center">
            <CircleHelp className="mx-auto h-8 w-8 text-line-strong" />
            <h3 className="mt-4 text-h4 font-semibold text-navy">{dict.directory.emptyTitle}</h3>
            <p className="mx-auto mt-2 max-w-[46ch] text-small text-muted">
              {searchTerm ? dict.directory.emptyTerm(searchTerm) : dict.directory.emptyGeneric}
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={clearFilters} className="btn btn-secondary">
                {dict.directory.reset}
              </button>
              <button
                type="button"
                onClick={() => onSelectService("other-services", true)}
                className="btn btn-primary"
              >
                {dict.directory.askAnother}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
