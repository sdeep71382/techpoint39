import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Devanagari, Noto_Sans_Gurmukhi, Space_Grotesk } from "next/font/google";
import { notFound } from "next/navigation";

import { isLocale, locales, localeMeta, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

import "../globals.css";

/*
 * The root layout lives inside [locale] rather than at src/app/layout.tsx.
 * `<html lang>` has to be correct on the server, and a layout at the app root
 * cannot read the params of a child segment. Putting the layout here means
 * Punjabi and Hindi pages are announced and hyphenated correctly, and the
 * language is part of the URL rather than a client-side guess.
 *
 * Fonts are all loaded once. The language-specific display face is swapped in
 * globals.css from [data-locale], so switching languages never waits on a
 * network request.
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const gurmukhi = Noto_Sans_Gurmukhi({ subsets: ["gurmukhi"], variable: "--font-gurmukhi", display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-devanagari", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techpointservices.example";

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocaleParams): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: dict.meta.title,
    description: dict.meta.description,
    applicationName: "Tech Point Services",
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(locales.map((item) => [item, `/${item}`])),
        "x-default": `/${locales[0]}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Tech Point Services",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
      url: `/${locale}`,
      locale: localeMeta[locale].ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.ogTitle,
      description: dict.meta.ogDescription,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#071f4f",
  colorScheme: "light",
};

export default async function LocaleLayout({ children, params }: LocaleParams & { children: React.ReactNode }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return (
    <html
      lang={locale}
      dir={localeMeta[locale].dir}
      data-locale={locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${gurmukhi.variable} ${devanagari.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
