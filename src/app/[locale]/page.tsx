import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import HomePage from "@/components/home-page";

type LocaleParams = { params: Promise<{ locale: string }> };

export default async function Page({ params }: LocaleParams) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  /*
   * Only the locale crosses the server/client boundary. The dictionaries hold
   * formatting functions, which React cannot serialise, so each component reads
   * the one it needs for itself.
   */
  return <HomePage locale={raw as Locale} />;
}
