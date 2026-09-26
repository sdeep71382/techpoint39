import { Mail, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { email, phoneDisplay, phoneNumber } from "@/components/site-data";

type ContactSectionProps = { whatsappUrl: string };

export default function ContactSection({ whatsappUrl }: ContactSectionProps) {
  return (
    <section id="contact" className="band-navy scroll-mt-20">
      <div className="shell section-pad grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="kicker text-signal">Ready when you are</p>
          <h2 className="mt-3 text-h2 font-bold text-white">
            Start with the service. We will help make the next step clear.
          </h2>

          <ul className="mt-6 grid gap-3">
            <li>
              <a
                href={"tel:+91" + phoneNumber}
                className="inline-flex min-h-[48px] items-center gap-2.5 text-body text-on-navy-soft transition hover:text-white"
              >
                <Phone className="h-4 w-4 flex-none text-signal" />
                {phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={"mailto:" + email}
                className="inline-flex min-h-[48px] items-center gap-2.5 break-all text-body text-on-navy-soft transition hover:text-white"
              >
                <Mail className="h-4 w-4 flex-none text-signal" />
                {email}
              </a>
            </li>
          </ul>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-signal btn-lg mt-7"
          >
            <MessageCircle className="h-5 w-5" />
            Continue on WhatsApp
          </a>

          <p className="mt-6 max-w-[46ch] text-small leading-relaxed text-on-navy-muted">
            Tech Point Services is an independent assistance provider, not a government department.
            Department rules govern eligibility, fees, and final approval.
          </p>
        </div>

        <div className="rounded-panel bg-paper p-5 shadow-panel sm:p-7">
          <p className="meta-label text-royal">Send an enquiry</p>
          <h3 className="mt-2 text-h3 font-bold text-navy">Tell us what you need.</h3>
          <p className="mt-2 text-small leading-relaxed text-muted">
            We will review your request and respond with the next useful step.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
