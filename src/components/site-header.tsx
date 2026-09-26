"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { phoneNumber } from "@/components/site-data";

const links = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Why us", href: "#why-us" },
  { label: "Questions", href: "#questions" },
];

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        <a href="#top" className="flex items-center gap-2.5" aria-label="Tech Point Services home">
          <span className="relative h-10 w-[52px] flex-none overflow-hidden border border-line bg-paper">
            <Image src="/techpoint-logo.jpeg" alt="" fill priority className="object-contain p-1" sizes="52px" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[15px] font-bold tracking-tight text-navy">Tech Point</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.22em] text-royal">Services</span>
          </span>
        </a>

        {/*
          Nav and actions now appear from 768px instead of 1024px. Between the old
          two breakpoints the header showed only a logo and a hamburger: no phone
          link, no request button, and the sticky call bar was already hidden.
        */}
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href={"tel:+91" + phoneNumber} className="btn-round" aria-label={"Call " + phoneNumber} title="Call us">
            <Phone className="h-[18px] w-[18px]" />
          </a>
          <a href="#request-builder" className="btn btn-primary hidden md:inline-flex">
            Start a request
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="btn-round md:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-nav" className="border-t border-line bg-paper md:hidden">
          <nav className="shell flex flex-col gap-1 py-4" aria-label="Mobile navigation">
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
            <a
              href={"tel:+91" + phoneNumber}
              className="btn btn-ghost mt-3 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="h-4 w-4" />
              Call {phoneNumber}
            </a>
            <a
              href="#request-builder"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary mt-2 w-full"
            >
              Start a request
              <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
