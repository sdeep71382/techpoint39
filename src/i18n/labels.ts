import type { Locale } from "./config";
import { locales } from "./config";

/**
 * Which scripts to show as a secondary label under a service title.
 *
 * On the English page this is the Punjabi and Hindi name, as before. On a
 * regional page the two useful fallbacks are the neighbouring language and
 * English, so a service is still identifiable when a visitor reads more than
 * one script.
 */
const alternates: Record<Locale, Locale[]> = {
  en: ["pa", "hi"],
  pa: ["hi", "en"],
  hi: ["pa", "en"],
};

export function alternateLocales(locale: Locale): Locale[] {
  return alternates[locale] ?? locales.filter((item) => item !== locale);
}

const fontClass: Record<Locale, string> = {
  en: "",
  pa: "font-local",
  hi: "font-local-hi",
};

export function localeFontClass(locale: Locale): string {
  return fontClass[locale] ?? "";
}
