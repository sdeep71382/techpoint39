"use client";

import { useState } from "react";
import { Check, ClipboardCheck, Copy, Headphones, Phone, ShieldCheck, Zap } from "lucide-react";
import { email, phoneNumber } from "@/components/site-data";

export default function WhyUsSection() {
  const [copied, setCopied] = useState(false);
  async function copyEmail() { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }
  const items = [
    { icon: ShieldCheck, title: "Safe & secure", text: "Careful handling and only service-relevant document guidance." },
    { icon: Zap, title: "Time conscious", text: "Preparation first, so avoidable back-and-forth is reduced." },
    { icon: Headphones, title: "Professional help", text: "Clear explanations in simple language when you need them." },
    { icon: ClipboardCheck, title: "Process focused", text: "Structured support for forms, uploads, and follow-up steps." },
  ];
  return <section id="why-us" className="scroll-mt-20 bg-white py-20 sm:py-24"><div className="mx-auto grid max-w-[1320px] gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:px-8"><div><p className="section-kicker">Why Tech Point</p><h2 className="section-title">Support should feel clear, not complicated.</h2><p className="section-copy">Our role is practical: help you understand the requirement, prepare the request, and move through the applicable online process with confidence.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={"tel:+91" + phoneNumber} className="primary-button h-12 justify-center px-5"><Phone className="h-4 w-4" /> Call {phoneNumber}</a><button type="button" onClick={copyEmail} className="secondary-button h-12 justify-center px-5" aria-live="polite">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Email copied" : "Copy email"}</button></div></div><div className="border border-slate-200 bg-[#f7f9fc] p-3 sm:p-6"><div className="grid gap-px bg-slate-200 sm:grid-cols-2">{items.map((item) => { const Icon = item.icon; return <div key={item.title} className="bg-white p-6 sm:p-7"><Icon className="h-6 w-6 text-[#0857d6]" /><h3 className="mt-5 text-base font-black text-[#071f4f]">{item.title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p></div>; })}</div></div></div></section>;
}
