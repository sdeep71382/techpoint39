"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Languages, Menu, Phone, X } from "lucide-react";

import {
  localeEnglishName,
  localeMeta,
  localePath,
  locales,
  stripLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact } from "@/i18n/services";
import { localeFontClass } from "@/i18n/labels";

/*
 * A plain link per language. Each one is a real, crawlable URL carrying
 * rel="alternate", so the switcher also tells search engines the three pages are
 * translations of each other. The current language stays visible but is not a
 * link, so the control is never a dead end.
 */
function LanguageSwitcher({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const menuId = useId();
  const dict = getDictionary(locale);

  useEffect(() => {
    if (!isOpen) return;

    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  // The hash is not part of usePathname, so the current section is carried over
  // by hand. Switching language mid-page should not throw the visitor to the top.
  function targetFor(next: Locale) {
    const base = localePath(next, stripLocale(pathname));
    if (typeof window === "undefined") return base;
    const hash = window.location.hash;
    return hash ? base + hash : base;
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        className="btn-round"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        aria-label={dict.nav.languageLabel}
        title={dict.nav.languageLabel}
        onClick={() => setIsOpen((current) => !current)}
      >
        <Languages className="h-[18px] w-[18px]" />
      </button>

      {isOpen && (
        <div
          id={menuId}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-48 overflow-hidden rounded-card border border-line bg-paper shadow-panel"
        >
          <p className="meta-label border-b border-line px-3.5 py-2.5 text-muted-strong">
            {dict.nav.language}
          </p>
          <ul>
            {locales.map((item) => {
              const isCurrent = item === locale;
              return (
                <li key={item}>
                  <a
                    href={targetFor(item)}
                    hrefLang={item}
                    rel="alternate"
                    aria-current={isCurrent ? "true" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={
                      "flex min-h-[44px] items-center justify-between gap-2 px-3.5 text-small font-medium transition hover:bg-canvas " +
                      (isCurrent ? "text-royal" : "text-navy")
                    }
                  >
                    <span className={localeFontClass(item)}>{localeMeta[item].label}</span>
                    {isCurrent ? (
                      <Check className="h-4 w-4 flex-none" strokeWidth={3} />
                    ) : (
                      /* The English name is invisible to many Punjabi and Hindi
                          readers, so it is marked as its own language. */
                      localeEnglishName(item) && (
                        <span lang="en" className="text-micro text-muted">
                          {localeEnglishName(item)}
                        </span>
                      )
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function SiteHeader({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = [
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.process, href: "#process" },
    { label: dict.nav.whyUs, href: "#why-us" },
    { label: dict.nav.questions, href: "#questions" },
  ];

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // The bar used to have no shadow, so it only read as sticky because of the blur.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="site-header" data-scrolled={isScrolled}>
      <div className="shell flex h-[68px] items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5" aria-label={dict.nav.home}>
          <span className="flex-none border border-line bg-paper">
            <Image
              src="/techpoint-logo-52.png"
              alt=""
              width={52}
              height={37}
              priority
              sizes="52px"
              className="brand-logo-52"
            />
          </span>
          {/* The wordmark is a brand asset, so it stays in Latin script everywhere. */}
          <span className="leading-none" lang="en">
            <span className="block font-display text-[15px] font-bold tracking-tight text-navy">
              Tech Point
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-royal">
              Services
            </span>
          </span>
        </a>

        {/*
          Nav and actions appear from 768px instead of 1024px. Between the old
          two breakpoints the header showed only a logo and a hamburger: no phone
          link, no request button, and the sticky call bar was already hidden.
        */}
        <nav className="hidden items-center gap-7 md:flex" aria-label={dict.nav.home}>
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <a
            href={"tel:+91" + contact.phoneNumber}
            className="btn-round"
            aria-label={dict.nav.call + " " + contact.phoneDisplay}
            title={dict.nav.call}
          >
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <a href="#request-builder" className="btn btn-primary hidden md:inline-flex">
            {dict.nav.startRequest}
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="btn-round md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={dict.nav.toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-nav" className="border-t border-line bg-paper md:hidden">
          <nav className="shell flex flex-col gap-1 py-4" aria-label={dict.nav.toggleMenu}>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex min-h-[52px] items-center border-b border-line/70 text-body font-semibold text-navy"
              >
                {link.label}
              </a>
            ))}

            {/* The language list is repeated inline so it is reachable on a phone
                without opening a floating menu that could sit under the call bar. */}
            <p className="meta-label mt-3 border-b border-line/70 pb-2 pt-3 text-muted-strong">
              {dict.nav.language}
            </p>
            <ul>
              {locales.map((item) => (
                <li key={item}>
                  <a
                    href={"/" + item}
                    hrefLang={item}
                    rel="alternate"
                    aria-current={item === locale ? "true" : undefined}
                    className={
                      "flex min-h-[44px] items-center gap-2 text-body font-semibold " +
                      (item === locale ? "text-royal" : "text-navy")
                    }
                  >
                    <span className={localeFontClass(item)}>{localeMeta[item].label}</span>
                    {item !== locale && localeEnglishName(item) && (
                      <span lang="en" className="text-micro font-normal text-muted">
                        {localeEnglishName(item)}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={"tel:+91" + contact.phoneNumber}
              className="btn btn-ghost mt-3 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="h-4 w-4" />
              {dict.nav.call} {contact.phoneDisplay}
            </a>
            <a
              href="#request-builder"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary mt-2 w-full"
            >
              {dict.nav.startRequest}
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
