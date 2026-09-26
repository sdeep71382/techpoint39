import { localeFontClass, alternateLocales } from "@/i18n/labels";
import type { Locale } from "@/i18n/config";
import type { Service } from "@/i18n/services";

type ServiceLocalLabelProps = {
  service: Pick<Service, "name">;
  locale: Locale;
  className?: string;
};

/**
 * Each language on the label gets its own element, its own `lang` attribute and
 * its own typeface. One combined string inside an English <p> made the browser
 * fall back to an arbitrary system font and made screen readers announce
 * Punjabi and Hindi with an English voice.
 *
 * When the page is already in one of those scripts the label is skipped, so a
 * card never repeats the heading directly underneath it.
 */
export default function ServiceLocalLabel({ service, locale, className = "" }: ServiceLocalLabelProps) {
  const others = alternateLocales(locale);
  if (others.length === 0) return null;

  return (
    <span className={className}>
      {others.map((other, index) => (
        <span key={other}>
          {index > 0 && (
            <span aria-hidden="true" className="mx-1.5 text-line-strong">
              /
            </span>
          )}
          <span lang={other} className={localeFontClass(other)}>
            {service.name[other]}
          </span>
        </span>
      ))}
    </span>
  );
}
