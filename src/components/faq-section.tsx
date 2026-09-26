"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/components/site-data";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <section id="questions" className="scroll-mt-20 border-t border-slate-200 py-20 sm:py-24"><div className="mx-auto grid max-w-[1100px] gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8"><div><p className="section-kicker">Before you begin</p><h2 className="section-title">Common questions, plainly answered.</h2><p className="section-copy">Still unsure? Call and tell us the service name. We will help you identify the next useful step.</p></div><div className="border-t border-slate-300">{faqs.map((faq, index) => { const isOpen = openFaq === index; return <div key={faq.question} className="border-b border-slate-300"><button type="button" className="flex w-full items-center justify-between gap-6 py-5 text-left" onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}><span className="text-base font-black text-[#071f4f]">{faq.question}</span><ChevronDown className={"h-5 w-5 shrink-0 text-[#0857d6] transition-transform " + (isOpen ? "rotate-180" : "")} /></button><div className={"faq-answer " + (isOpen ? "faq-answer-open" : "")}><p className="pb-5 pr-10 text-sm leading-7 text-slate-600">{faq.answer}</p></div></div>; })}</div></div></section>;
}
