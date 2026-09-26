import Image from "next/image";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { email, phoneDisplay, phoneNumber } from "@/components/site-data";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#process" },
  { label: "Why us", href: "#why-us" },
  { label: "Questions", href: "#questions" },
  { label: "Contact", href: "#contact" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.3fr_1fr_1fr] md:gap-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative h-9 w-[46px] flex-none overflow-hidden border border-white/15 bg-paper">
              <Image src="/techpoint-logo.jpeg" alt="" fill className="object-contain p-1" sizes="46px" />
            </span>
            <span className="font-display text-small font-bold uppercase tracking-[0.14em] text-white">
              Tech Point Services
            </span>
          </div>
          <p className="mt-5 max-w-[52ch] text-small leading-relaxed text-on-navy-muted">
            Tech Point Services is an independent assistance provider and is not an official government
            website. Fees, eligibility, processing, and approval are governed by the relevant department.
          </p>
        </div>

        {/* The footer had no navigation at all, only a logo and a disclaimer. */}
        <nav aria-label="Footer navigation">
          <p className="meta-label text-signal">Explore</p>
          <ul className="mt-4 grid gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center text-small text-on-navy-soft transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="meta-label text-signal">Reach us</p>
          <ul className="mt-4 grid gap-1">
            <li>
              <a
                href={"tel:+91" + phoneNumber}
                className="inline-flex min-h-[44px] items-center gap-2 text-small text-on-navy-soft transition hover:text-white"
              >
                <Phone className="h-3.5 w-3.5 flex-none text-signal" />
                {phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={"mailto:" + email}
                className="inline-flex min-h-[44px] items-center gap-2 break-all text-small text-on-navy-soft transition hover:text-white"
              >
                <Mail className="h-3.5 w-3.5 flex-none text-signal" />
                {email}
              </a>
            </li>
            <li>
              <a
                href={"https://wa.me/91" + phoneNumber}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-small text-on-navy-soft transition hover:text-white"
              >
                <MessageCircle className="h-3.5 w-3.5 flex-none text-signal" />
                WhatsApp us
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-2 py-5 text-micro text-on-navy-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Tech Point Services</p>
          <p>Independent assistance provider &middot; Not a government website</p>
        </div>
      </div>
    </footer>
  );
}
