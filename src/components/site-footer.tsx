import Image from "next/image";

export default function SiteFooter() {
  return <footer className="bg-[#061630] pb-24 pt-10 text-white sm:pb-10"><div className="mx-auto grid max-w-[1320px] gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-end lg:px-8"><div><div className="flex items-center gap-3"><span className="relative h-10 w-[52px] overflow-hidden bg-white"><Image src="/techpoint-logo.jpeg" alt="" fill className="object-contain p-1" sizes="52px" /></span><span className="text-sm font-black uppercase tracking-[0.12em]">Tech Point Services</span></div><p className="mt-5 max-w-2xl text-xs leading-6 text-slate-400">Tech Point Services is an independent assistance provider and is not an official government website. Fees, eligibility, processing, and approval are governed by the relevant department.</p></div><p className="text-xs text-slate-500">© 2026 Tech Point Services</p></div></footer>;
}
