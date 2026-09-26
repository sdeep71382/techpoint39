"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { phoneNumber } from "@/components/site-data";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/80 bg-white/[0.92] backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-3" aria-label="Tech Point Services home">
          <span className="relative h-11 w-14 overflow-hidden border border-slate-200 bg-white"><Image src="/techpoint-logo.jpeg" alt="" fill priority className="object-contain p-1" sizes="56px" /></span>
          <span><span className="block text-[15px] font-black uppercase leading-none text-[#071f4f]">Tech Point</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.28em] text-[#0857d6]">Services</span></span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation"><a href="#services" className="nav-link">Services</a><a href="#process" className="nav-link">How it works</a><a href="#why-us" className="nav-link">Why us</a><a href="#questions" className="nav-link">Questions</a></nav>
        <div className="hidden items-center gap-2 lg:flex"><a href={"tel:+91" + phoneNumber} className="icon-action" aria-label={"Call " + phoneNumber} title="Call us"><Phone className="h-[18px] w-[18px]" /></a><a href="#request-builder" className="primary-button h-11 px-5 text-sm">Start a request <ArrowRight className="h-4 w-4" /></a></div>
        <button type="button" className="icon-action lg:hidden" onClick={() => setIsMenuOpen((current) => !current)} aria-label="Toggle navigation" aria-expanded={isMenuOpen}>{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
      {isMenuOpen && <div className="border-t border-slate-200 bg-white px-4 py-5 shadow-xl lg:hidden"><nav className="mx-auto grid max-w-[1320px] gap-1" aria-label="Mobile navigation">{[["Services", "#services"], ["How it works", "#process"], ["Why us", "#why-us"], ["Questions", "#questions"]].map(([label, href]) => <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="border-b border-slate-100 px-2 py-4 text-base font-bold text-slate-800">{label}</a>)}<a href="#request-builder" onClick={() => setIsMenuOpen(false)} className="primary-button mt-3 h-12 justify-center">Start a request <ArrowRight className="h-4 w-4" /></a></nav></div>}
    </header>
  );
}
