"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Compass } from "lucide-react";

import { defaultLocale, isLocale, localeEnglishName, localeMeta, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { localeFontClass } from "@/i18n/labels";

/*
 * A mistyped or stale URL should not dump someone on the bare Next.js error
 * page. `not-found.tsx` gets no params, so the locale is read from the pathname:
 * the copy matches the language they were already trying to read, and the
 * language list gives them a way out.
 */
export default function NotFound() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const locale: Locale =
    segments[0] && isLocale(segments[0]) ? segments[0] : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="page min-h-screen bg-canvas">
      <main className="band-navy flex min-h-screen items-center">
        <div className="shell section-pad text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-card border border-white/15 bg-white/[0.04]">
            <Compass className="h-6 w-6 text-signal" />
          </span>

          <p className="kicker mt-7 text-signal">{dict.notFound.kicker}</p>
          <h1 className="mx-auto mt-3 max-w-[20ch] text-h1 font-bold text-white">
            {dict.notFound.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[52ch] text-body text-pretty text-on-navy-soft">
            {dict.notFound.copy}
          </p>

          <Link href={"/" + locale} className="btn btn-signal btn-lg mt-8 inline-flex">
            {dict.notFound.backHome}
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>

          <p className="meta-label mt-12 text-on-navy-muted">{dict.notFound.chooseLanguage}</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {locales.map((item) => (
              <li key={item}>
                <Link
                  href={"/" + item}
                  hrefLang={item}
                  rel="alternate"
                  aria-current={item === locale ? "true" : undefined}
                  className={
                    "inline-flex min-h-[48px] items-center gap-2 rounded-card border px-4 text-small font-medium transition hover:bg-white/10 " +
                    (item === locale
                      ? "border-signal text-signal"
                      : "border-white/15 text-on-navy-soft")
                  }
                >
                  <span className={localeFontClass(item)}>{localeMeta[item].label}</span>
                  {localeEnglishName(item) && (
                    <span lang="en" className="text-micro text-on-navy-muted">
                      {localeEnglishName(item)}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
