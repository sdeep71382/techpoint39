import { Mail, MessageCircle, Phone } from "lucide-react";

import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact } from "@/i18n/services";
import ContactForm from "@/components/contact-form";

type ContactSectionProps = {
  locale: Locale;
  whatsappUrl: string;
};

export default function ContactSection({ locale, whatsappUrl }: ContactSectionProps) {
  const dict = getDictionary(locale);

  return (
    <section id="contact" className="band-navy scroll-mt-20">
      {/* The closing section carries the most weight, so it gets the most air. */}
      <div className="shell section-pad-lead grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="kicker text-signal">{dict.contact.kicker}</p>
          <h2 className="mt-3 text-h2 font-bold text-white">{dict.contact.title}</h2>

          <ul className="mt-6 grid gap-3">
            <li>
              <a
                href={"tel:+91" + contact.phoneNumber}
                className="inline-flex min-h-[48px] items-center gap-2.5 text-body text-on-navy-soft transition hover:text-white"
              >
                <Phone className="h-4 w-4 flex-none text-signal" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={"mailto:" + contact.email}
                className="inline-flex min-h-[48px] items-center gap-2.5 break-all text-body text-on-navy-soft transition hover:text-white"
              >
                <Mail className="h-4 w-4 flex-none text-signal" />
                {/* An address is not translated. */}
                <span lang="en">{contact.email}</span>
              </a>
            </li>
          </ul>

          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn btn-signal btn-lg mt-7">
            <MessageCircle className="h-5 w-5" />
            {dict.contact.whatsapp}
          </a>

          <p className="mt-6 max-w-[46ch] text-small leading-relaxed text-on-navy-muted">
            {dict.contact.disclaimer}
          </p>
        </div>

        <div className="rounded-panel bg-paper p-5 shadow-panel sm:p-7">
          <p className="meta-label text-royal">{dict.contact.formKicker}</p>
          <h3 className="mt-2 text-h3 font-bold text-navy">{dict.contact.formTitle}</h3>
          <p className="mt-2 text-small leading-relaxed text-muted">{dict.contact.formCopy}</p>
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
