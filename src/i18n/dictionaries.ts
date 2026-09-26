import { defaultLocale, type Locale } from "./config";
import { en, type Dictionary } from "./dictionaries/en";
import { pa } from "./dictionaries/pa";
import { hi } from "./dictionaries/hi";

/*
 * All three dictionaries are bundled, so a language switch is instant and every
 * URL is statically rendered. The site is one page of copy, so shipping the
 * extra strings costs far less than a round trip per language.
 */
const dictionaries: Record<Locale, Dictionary> = { en, pa, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export type { Dictionary };
