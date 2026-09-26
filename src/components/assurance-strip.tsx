import { assurances } from "@/components/site-data";

export default function AssuranceStrip() {
  return <section className="border-y border-slate-200 bg-white"><div className="mx-auto grid max-w-[1320px] divide-y divide-slate-200 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0 lg:px-8">{assurances.map((item) => { const Icon = item.icon; return <div key={item.title} className="flex gap-4 py-7 md:px-6 first:pl-0 last:pr-0"><Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#0857d6]" /><div><h2 className="text-sm font-black text-[#071f4f]">{item.title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{item.text}</p></div></div>; })}</div></section>;
}
