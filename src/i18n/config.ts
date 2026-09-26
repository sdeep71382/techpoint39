export const locales = ["en", "pa", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; english: string; ogLocale: string; dir: "ltr" }
> = {
  en: { label: "English", english: "English", ogLocale: "en_IN", dir: "ltr" },
  pa: { label: "ਪੰਜਾਬੀ", english: "Punjabi", ogLocale: "pa_IN", dir: "ltr" },
  hi: { label: "हिन्दी", english: "Hindi", ogLocale: "hi_IN", dir: "ltr" },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * The English name shown next to a language, or null when it would only repeat
 * the native label. "English / English" beside a language switcher is noise, but
 * "ਪੰਜਾਬੀ / Punjabi" is the one a reader who cannot read Gurmukhi needs.
 */
export function localeEnglishName(locale: Locale): string | null {
  const meta = localeMeta[locale];
  return meta.label === meta.english ? null : meta.english;
}

/** Strips a leading locale segment, so "/" -> "/" and "/pa#x" -> "#x". */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && isLocale(segments[0])) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

export function localePath(locale: Locale, path = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : "/" + path;
  return `/${locale}${clean}`;
}
