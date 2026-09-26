import { notFound } from "next/navigation";

/**
 * The site is a single page per language, so any deeper path is a dead end.
 *
 * Without this, `/pa/nope` never enters the `[locale]` segment at all and Next
 * answers with its own bare 404 page: no branding, no `<html lang>`, and no way
 * to reach the Punjabi or Hindi version. Routing the miss into the segment
 * means the layout's fonts and the localized `not-found.tsx` both apply.
 */
export default function CatchAllPage() {
  notFound();
}
