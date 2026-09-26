import { MessageCircle, Phone } from "lucide-react";
import { phoneNumber } from "@/components/site-data";

type MobileContactBarProps = { whatsappUrl: string };

export default function MobileContactBar({ whatsappUrl }: MobileContactBarProps) {
  return (
    /*
      Shown below 768px to match the header breakpoint. It used to disappear at
      640px while the header stayed collapsed until 1024px, which left tablets
      with no visible way to make contact.
    */
    <div className="mobile-bar">
      <a href={"tel:+91" + phoneNumber} className="btn btn-ghost">
        <Phone className="h-4 w-4" />
        Call
      </a>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}
