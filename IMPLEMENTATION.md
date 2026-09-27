# Tech Point Services Website Implementation

## Overview

A responsive service-business website built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. The experience follows one useful customer journey: find a service, check starter documents, and contact support with a prepared request. It is published in three languages — English (primary), Punjabi, and Hindi.

## Languages

The site is routed per language rather than switched client-side, so every version has a shareable URL, a correct server-rendered `<html lang>`, and its own metadata.

| Locale | URL | Script typeface |
| --- | --- | --- |
| English | `/en` | Space Grotesk + Inter |
| Punjabi | `/pa` | Noto Sans Gurmukhi |
| Hindi | `/hi` | Noto Sans Devanagari |

**How it works**

- `src/app/[locale]/layout.tsx` is the root layout. It reads the locale segment, sets `lang`, `dir`, and `data-locale`, and generates static params for all three versions. The app root deliberately has no `layout.tsx` — a layout at the root cannot read a child segment's params, so `<html lang>` would be wrong for Punjabi and Hindi.
- `src/proxy.ts` (Next.js 16's name for middleware) sends `/` and any path without a locale segment to the best match from the `Accept-Language` header, falling back to `/en`. `/api` is excluded so the contact endpoint is unaffected.
- `globals.css` swaps `--font-display` per locale via `:root[data-locale="pa"]` and `:root[data-locale="hi"]`. All four font families are loaded once, so switching language never waits on the network.
- `src/app/[locale]/[...rest]/page.tsx` catches unknown paths and raises `notFound()`, so a mistyped URL renders the localized 404 inside the locale layout instead of Next's bare error page.

**Where the copy lives**

- `src/i18n/dictionaries/en.ts` holds every UI string and defines the `Dictionary` type. The object is intentionally **not** `as const`, so `pa.ts` and `hi.ts` are type-checked against it: a missing key, an extra key, or a function with the wrong arity fails the build rather than rendering a blank.
- `src/i18n/services.ts` models each service as `Localized` fields (`Record<Locale, string>` for name, description, and turnaround, `Record<Locale, string[]>` for documents).
- `src/i18n/config.ts` holds the locale list, display names, `og:locale`, and the `stripLocale` / `localePath` path helpers.

**How dictionaries reach components**

The dictionaries contain formatting functions (`left(n)`, `resultCount(shown, total)`, the WhatsApp message builders), and React cannot serialise functions across the server/client boundary. Only the locale string is passed; each component calls `getDictionary(locale)` for itself. This also means no page is blocked on a per-language request — all three are bundled and every route is statically prerendered.

**Deliberate exceptions to translation**

- The wordmark, email address, and phone number stay in Latin script and are tagged `lang="en"`.
- The contact form's `name` attributes stay English because the API and the inbox depend on them. The visible labels and the option text are localized; the service `<option>` value stays the English service name so submissions remain readable and filterable whichever language was used.
- The API returns a machine-readable `code` alongside every English `error` string, and `contact-form.tsx` maps that code to the matching line in the active dictionary.
- Each service card shows two secondary labels: Punjabi and Hindi on the English page, then the neighbouring language and English on the regional pages. A service stays identifiable for a reader who uses more than one script.


## Experience Direction

- Brand palette is fixed: royal blue `#0857d6`, navy `#071f4f`, ink `#07101f`, signal yellow `#ffd21f`, alert red `#e11d2f`, white and off-white surfaces
- Space Grotesk for display, Inter for interface and body, Noto Sans Gurmukhi and Noto Sans Devanagari as the display face on the Punjabi and Hindi pages
- Real font weights only (400 / 500 / 600 / 700), so nothing is synthesised
- One type scale in `tailwind.config.ts`, every size paired with a line height
- Functional interactions instead of decorative motion
- No location, office address, or geographic service claims

## Design System

**Type scale** (`tailwind.config.ts` → `fontSize`)

| Token | Size | Use |
| --- | --- | --- |
| `kicker` | 12px / 0.14em / uppercase | Section eyebrows |
| `micro` | 13px | Fine print, counters |
| `small` | 14px | Supporting copy, chips |
| `body` | 16px | Default |
| `lead` | 18px | Hero and section intros |
| `lead-lg` | 20px | Reserved |
| `h4` | 17px | Card titles, FAQ questions |
| `h3` | 21px | Panel titles |
| `h2` | clamp(28px → 41.6px) | Section headings |
| `h1` | clamp(38.4px → 60px) | Hero only |

The `h1` cap is 3.75rem (60px), not 4.15rem. In the hero's text column — 507px at a
1280px viewport — a 66px headline broke to five lines and pushed the whole hero past
the fold. At 60px it breaks to four, which keeps the hero on one screen without
making the headline feel small.

**Colour tokens** — `royal`, `navy`, `navy-deep`, `ink`, `signal`, `alert`, `canvas`, `paper`, `tint`, `line`, `line-strong`, `muted`, `muted-strong`, `on-navy`, `on-navy-soft`, `on-navy-muted`

**Component classes** live in `@layer components` in `src/app/globals.css`: `shell`, `section-pad`, `section-pad-tight`, `section-pad-lead`, `kicker`, `eyebrow`, `section-title`, `section-copy`, `local-label`, `meta-label`, `btn` + variants, `btn-round`, `badge` + variants, `field`, `field-label`, `select-wrap`, `chip`, `service-card` + modifiers, `icon-tile` + accents, `doc-row`, `doc-check`, `panel`, `panel-topbar`, `meter`, `note-strip`, `nav-link`, `faq-answer`, `faq-row`, `site-header`, `hero`, `band-navy`, `site-footer`, `mobile-bar`.

Because component classes sit in `@layer components`, plain Tailwind utilities override them without `!important`. Do not reintroduce `!important` overrides or redefine Tailwind class names globally.

**Section rhythm** — three padding tiers, each stepping at 640px and 1024px rather than
jumping straight from phone to desktop padding:

| Class | < 640px | ≥ 640px | ≥ 1024px | Used by |
| --- | --- | --- | --- | --- |
| `section-pad-tight` | 56px | 56px | 64px | Service directory |
| `section-pad` | 56px | 72px | 80px | Process, why us, questions |
| `section-pad-lead` | 56px | 80px | 88px | Contact (closing section) |

The previous build gave every section a flat 5.5rem, which stacked up to 176px of
blank space between two adjacent sections and made the page read as a series of
unrelated blocks. The three tiers give the page a hierarchy: the long
self-scrolling directory supplies its own rhythm and gets the least air, the
closing contact section is allowed the most.

**Hero height** — measured, not estimated:

| Viewport | Hero height | Notes |
| --- | --- | --- |
| 1280px and up | 762px | Fits one 820px screen |
| 1024px | 916px | Tightest desktop case. The two CTAs are `white-space: nowrap`, so their combined 414px sets a floor on the text column; below roughly 1040px of viewport they wrap to two rows via `sm:flex-wrap` |
| 768px and below | Stacked | Text above a full-width builder |

The CTA row is `sm:flex-wrap lg:flex-row`. Allowing it to wrap means the text column
can shrink below the nowrap buttons' natural width instead of being pinned by it,
which is what keeps 1024px from growing further. Above `lg` the buttons are forced
onto one row, so the two-column hero never shows a ragged stack of CTAs.

## Purposeful Interactions

### Request Builder

The hero includes a working request builder. A customer can:

1. Select a service.
2. Review the service summary, including a rough turnaround.
3. Mark starter documents they already have.
4. See readiness progress and a remaining-document count update immediately.
5. Open WhatsApp with the service and marked documents included in the message.

The checklist is guidance only. The interface states that exact requirements can vary and are confirmed before work begins.

### Service Directory

- Text search across service names in all three languages, categories, and descriptions
- Category filters with live result counts
- Live result total and a one-click filter reset
- Selected-service state visible on the matching card
- Each card lists its own document requirements inline
- Each service action updates the request builder and moves the customer to it
- Cards collapse on small screens via `data-expanded`; details are always visible from 768px
- A useful empty state names the failed search term and routes unmatched needs to Other Online Services

### Supporting Interactions

- Sticky navigation with a shadow that appears on scroll
- Collapsible mobile navigation with body scroll lock
- Expandable FAQ rows, multiple answers open at once, plus expand and collapse all
- Copy-email action with confirmation feedback
- Contextual call and WhatsApp actions throughout the page
- Persistent call and WhatsApp bar below 768px
- Progress meter exposed as `role="progressbar"` with `aria-valuenow`
- Language switcher in the header, repeated inline in the mobile menu and in the footer
- Every language link is a real URL carrying `hrefLang` and `rel="alternate"`, matching the `alternates.languages` metadata
- Required fields marked with a visible asterisk plus a screen-reader-only word, since a bare `*` announces as "star"
- Reduced-motion support

## Main Sections

- Sticky navigation with contact actions visible from 768px up
- Offer-led hero with interactive request builder
- Trust and preparation principles
- Searchable, filterable service directory
- Four-step process
- Why Tech Point support principles
- Accessible FAQ accordion with multi-open
- Contact call to action and independent-provider disclaimer
- Footer with navigation, contact details, and the disclaimer

## Services Included

- PAN Card: new and correction
- Driving Licence: new and renewal
- Passport: new and renewal
- Voter ID Card
- Aadhaar-related services
- Birth and Death Certificate
- Income, Caste and Residence Certificate
- Online Government Forms
- Printout, Photocopy and Scanning
- Other Online Services

Each service carries a name, description, turnaround, and document checklist in all three languages. The turnaround is guidance rather than a promise.

## Key Files

- `src/i18n/config.ts`: Locale list, display names, `og:locale`, and path helpers
- `src/i18n/dictionaries/en.ts`: All UI copy in English, and the `Dictionary` type every other language must satisfy
- `src/i18n/dictionaries/pa.ts`, `hi.ts`: Punjabi and Hindi translations
- `src/i18n/dictionaries.ts`: `getDictionary(locale)`
- `src/i18n/services.ts`: The ten services with per-locale content, plus brand contact details
- `src/i18n/labels.ts`: Which scripts appear as secondary labels, and the matching typeface class
- `src/app/[locale]/layout.tsx`: Root layout — fonts, `lang`/`dir`, static params, hreflang metadata
- `src/app/[locale]/page.tsx`: Resolves the locale and hands off to the client page
- `src/app/[locale]/not-found.tsx`: Localized 404 with links back to each language
- `src/app/[locale]/[...rest]/page.tsx`: Routes unknown paths to the localized 404
- `src/proxy.ts`: Locale negotiation and redirect
- `src/components/home-page.tsx`: Page-level state and component composition
- `src/components/service-local-label.tsx`: Renders secondary language labels with the correct script, typeface, and language tag
- `src/components/`: Independent header, hero, request builder, service directory, content sections, contact, footer, and mobile action components
- `src/app/globals.css`: Design tokens, base styles, per-locale font swap, and component classes
- `tailwind.config.ts`: Brand tokens, type scale, and Tailwind configuration
- `public/techpoint-logo-52.png`, `-46.png`: Render-size logo assets derived from the supplied JPEG
- `public/techpoint-logo.jpeg`: Supplied logo asset, kept as the source of truth for those two
- `public/techpoint-services-flyer.jpeg`: Original brand reference
- `public/favicon.svg`: Site icon

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. The root path redirects to the visitor's best-matching language, so `/en`, `/pa`, and `/hi` can also be opened directly.

Production checks:

```bash
npm run lint
npm run build
```

## Contact Configuration

The phone and WhatsApp number is `9780332509`. The contact form sends submissions through Resend to `techpointservices39@gmail.com` by default. Configure these environment variables in `.env.local`, and the equivalent three in the Vercel project settings:

```env
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=Tech Point Services <hello@techpointservices.in>
CONTACT_EMAIL=techpointservices39@gmail.com
```

Run `npm run check:email` after editing. It validates the key, lists verified sending domains, and performs a real test send, printing the specific fix for whichever step fails.

WhatsApp links are generated from the currently selected service and checklist state.

### Verified sender

`techpointservices.in` is verified in Resend, so `FROM_EMAIL` sends from the site's own domain and `CONTACT_EMAIL` is free to be any readable address.

This matters because the fallback, `onboarding@resend.dev`, is Resend's shared free-tier domain and carries two restrictions that are easy to misread as a broken form:

- **It only delivers to the inbox that owns the API key.** Repointing `CONTACT_EMAIL` to any other address is rejected with a `403` before the message is even built. The form then reports `send_failed` and no mail goes anywhere.
- **Gmail treats it as an unverified bulk sender.** Messages are accepted, so Resend reports `last_event: "delivered"`, but they land in Spam rather than the Primary inbox. The visitor sees the success message and the enquiry goes quiet.

Both disappear with a verified sender. Because Gmail-side filtering is invisible to the sender, every accepted send logs its Resend id to the runtime logs:

```
Contact email accepted {
  id: '01a0e16f-...', service: 'Passport', replyTo: '...',
  from: 'Tech Point Services <hello@techpointservices.in>',
  to: 'techpointservices39@gmail.com'
}
```

That id is the join key to the Resend dashboard, so an enquiry that went quiet can still be traced after the fact. Note that Vercel only applies environment variable changes to a new deployment.

## Open Items

Decisions taken during the redesign that are still worth a second opinion:

- **Content width** was reduced from 1440px to 1280px (`maxWidth.shell` in `tailwind.config.ts`). Confirmed during Phase 2, when the hero grid was retuned against a 1280px measure. The old width put the hero heading and the request builder very far apart on a wide monitor. Revert the one value to put it back.
- **Hero headline size** — the `h1` clamp cap sits at 3.75rem (60px) so the hero fits one screen. Restoring the larger 4.15rem cap would need a shorter headline string, since the column width is what forces the line count, not the font size.
- **Verified sender** - resolved. `techpointservices.in` is verified in Resend and `FROM_EMAIL` sends from `hello@techpointservices.in`, so mail reaches the Primary inbox and `CONTACT_EMAIL` is unrestricted. See Contact Configuration above.

## Disclaimer

Tech Point Services is presented as an independent assistance provider, not an official government website. Department rules govern eligibility, fees, processing, and final approval.
