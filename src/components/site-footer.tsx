import Image from "next/image";
import { Mail, MessageCircle, Phone } from "lucide-react";

import { localeEnglishName, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { contact } from "@/i18n/services";
import { localeFontClass } from "@/i18n/labels";

const languageCodes = ["en", "pa", "hi"] as const;

export default function SiteFooter({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  const navLinks = [
    { label: dict.nav.services, href: "#services" },
    { label: dict.nav.process, href: "#process" },
    { label: dict.nav.whyUs, href: "#why-us" },
    { label: dict.nav.questions, href: "#questions" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="site-footer">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex-none border border-white/15 bg-paper">
              <Image
                src="/techpoint-logo-46.png"
                alt=""
                width={46}
                height={33}
                sizes="46px"
                className="brand-logo-46"
                loading="lazy"
              />
            </span>
            {/* The wordmark is a brand asset, so it stays in Latin script everywhere. */}
            <span lang="en" className="font-display text-small font-bold uppercase tracking-[0.14em] text-white">
              Tech Point Services
            </span>
          </div>
          <p className="mt-5 max-w-[52ch] text-small leading-relaxed text-on-navy-muted">
            {dict.footer.disclaimer}
          </p>
        </div>

        {/* The footer had no navigation at all, only a logo and a disclaimer. */}
        <nav aria-label={dict.footer.explore}>
          <p className="meta-label text-signal">{dict.footer.explore}</p>
          <ul className="mt-4 grid gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center text-small text-on-navy-soft transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* A crawlable path to every language, so the three pages are reachable
              from each other without relying on the interactive switcher. */}
          <p className="meta-label mt-6 text-signal">{dict.nav.language}</p>
          <ul className="mt-4 grid gap-1">
            {languageCodes.map((code) => (
              <li key={code}>
                <a
                  href={"/" + code}
                  hrefLang={code}
                  rel="alternate"
                  aria-current={code === locale ? "true" : undefined}
                  className={
                    "inline-flex min-h-[44px] items-center gap-2 text-small transition hover:text-white " +
                    (code === locale ? "text-signal" : "text-on-navy-soft")
                  }
                >
                  <span className={localeFontClass(code)}>{localeMeta[code].label}</span>
                  {localeEnglishName(code) && (
                    <span lang="en" className="text-micro text-on-navy-muted">
                      {localeEnglishName(code)}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="meta-label text-signal">{dict.footer.reachUs}</p>
          <ul className="mt-4 grid gap-1">
            <li>
              <a
                href={"tel:+91" + contact.phoneNumber}
                className="inline-flex min-h-[44px] items-center gap-2 text-small text-on-navy-soft transition hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 flex-none text-signal" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={"mailto:" + contact.email}
                className="inline-flex min-h-[44px] items-center gap-2 break-all text-small text-on-navy-soft transition hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 flex-none text-signal" />
                <span lang="en">{contact.email}</span>
              </a>
            </li>
            <li>
              <a
                href={"https://wa.me/91" + contact.phoneNumber}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-small text-on-navy-soft transition hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 flex-none text-signal" />
                {dict.footer.whatsappUs}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-micro text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p lang="en">&copy; 2026 Tech Point Services</p>
          <p>{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
