import { NextResponse, type NextRequest } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

/**
 * Sends bare paths to the best matching language version of the page, so a
 * visitor who follows a shared "/services" link or arrives on "/" is not forced
 * through English first. An explicit choice such as "/pa" is left alone, and the
 * language switcher in the header is how someone changes it.
 */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const weight = params
        .map((param) => param.trim())
        .find((param) => param.startsWith("q="))
        ?.slice(2);
      return { tag: tag.toLowerCase(), quality: weight ? Number(weight) : 1 };
    })
    .filter((entry) => Number.isFinite(entry.quality))
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    const target = request.nextUrl.clone();
    target.pathname = `/${preferredLocale(request)}`;
    return NextResponse.redirect(target);
  }

  if (isLocale(segments[0])) {
    // Normalise a trailing slash so /pa/ and /pa do not compete in search results.
    if (segments.length === 1 && pathname.endsWith("/")) {
      const target = request.nextUrl.clone();
      target.pathname = `/${segments[0]}`;
      return NextResponse.redirect(target);
    }
    return NextResponse.next();
  }

  // Anything that is not a locale segment: prefix it, keeping the query string.
  const target = request.nextUrl.clone();
  target.pathname = `/${preferredLocale(request)}${pathname}`;
  return NextResponse.redirect(target);
}

export const config = {
  /*
   * Everything except API routes, Next internals and files with an extension.
   * /api/contact must keep working regardless of the visitor's language.
   */
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
