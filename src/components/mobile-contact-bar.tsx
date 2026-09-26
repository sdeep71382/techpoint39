import { MessageCircle, Phone } from "lucide-react";
import { phoneNumber } from "@/components/site-data";

type MobileContactBarProps = { whatsappUrl: string };

export default function MobileContactBar({ whatsappUrl }: MobileContactBarProps) {
  return <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-slate-200 bg-white p-2 shadow-[0_-12px_30px_rgba(7,31,79,0.12)] sm:hidden"><a href={"tel:+91" + phoneNumber} className="inline-flex h-12 items-center justify-center gap-2 font-black text-[#071f4f]"><Phone className="h-4 w-4" /> Call</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 bg-[#0857d6] font-black text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a></div>;
}
