import { MessageCircle, Phone } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact } from "@/i18n/services";

type MobileContactBarProps = {
  locale: Locale;
  whatsappUrl: string;
};

export default function MobileContactBar({ locale, whatsappUrl }: MobileContactBarProps) {
  const dict = getDictionary(locale);

  return (
    /*
      Shown below 768px to match the header breakpoint. It used to disappear at
      640px while the header stayed collapsed until 1024px, which left tablets
      with no visible way to make contact.
    */
    <div className="mobile-bar">
      <a href={"tel:+91" + contact.phoneNumber} className="btn btn-ghost">
        <Phone className="h-4 w-4" />
        {dict.mobileBar.call}
      </a>
      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
        <MessageCircle className="h-4 w-4" />
        {dict.mobileBar.whatsapp}
      </a>
    </div>
  );
}
