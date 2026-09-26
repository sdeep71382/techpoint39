# Tech Point Services Website Implementation

## Overview

A responsive service-business website built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. The experience follows one useful customer journey: find a service, check starter documents, and contact support with a prepared request.

## Experience Direction

- Brand palette is fixed: royal blue `#0857d6`, navy `#071f4f`, ink `#07101f`, signal yellow `#ffd21f`, alert red `#e11d2f`, white and off-white surfaces
- Space Grotesk for display, Inter for interface and body, Noto Sans Gurmukhi and Noto Sans Devanagari for the bilingual service labels
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
| `h1` | clamp(38.4px → 66.4px) | Hero only |

**Colour tokens** — `royal`, `navy`, `navy-deep`, `ink`, `signal`, `alert`, `canvas`, `paper`, `tint`, `line`, `line-strong`, `muted`, `muted-strong`, `on-navy`, `on-navy-soft`, `on-navy-muted`

**Component classes** live in `@layer components` in `src/app/globals.css`: `shell`, `section-pad`, `kicker`, `eyebrow`, `section-title`, `section-copy`, `local-label`, `meta-label`, `btn` + variants, `btn-round`, `badge` + variants, `field`, `field-label`, `select-wrap`, `chip`, `service-card` + modifiers, `icon-tile` + accents, `doc-row`, `doc-check`, `panel`, `panel-topbar`, `meter`, `note-strip`, `nav-link`, `faq-answer`, `faq-row`, `site-header`, `hero`, `band-navy`, `site-footer`, `mobile-bar`.

Because component classes sit in `@layer components`, plain Tailwind utilities override them without `!important`. Do not reintroduce `!important` overrides or redefine Tailwind class names globally.

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

- Text search across service names, bilingual labels, categories, and descriptions
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
- Punjabi and Hindi labels tagged `lang="pa"` and `lang="hi"`
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

Each service carries a Punjabi label, a Hindi label, a document checklist, and a rough turnaround used as guidance rather than a promise.

## Key Files

- `src/app/page.tsx`: Page-level state and component composition
- `src/components/site-data.ts`: Shared service content, categories, FAQs, and brand contact details
- `src/components/service-local-label.tsx`: Renders the bilingual labels with the correct script, typeface, and language tag
- `src/components/`: Independent header, hero, request builder, service directory, content sections, contact, footer, and mobile action components
- `src/app/globals.css`: Design tokens, base styles, and component classes
- `src/app/layout.tsx`: Font loading, metadata, and root layout
- `tailwind.config.ts`: Brand tokens, type scale, and Tailwind configuration
- `public/techpoint-logo.jpeg`: Supplied logo asset
- `public/techpoint-services-flyer.jpeg`: Original brand reference
- `public/favicon.svg`: Site icon

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Production checks:

```bash
npm run lint
npm run build
```

## Contact Configuration

The phone and WhatsApp number is `9780332509`. The contact form sends submissions through Resend to `techpointservices39@gmail.com` by default. Configure these environment variables in `.env.local`:

```env
RESEND_API_KEY=re_your_api_key
FROM_EMAIL=Tech Point Services <your-verified-sender@example.com>
CONTACT_EMAIL=techpointservices39@gmail.com
```

`FROM_EMAIL` must use a sender verified in Resend. The default, `onboarding@resend.dev`, only delivers to the Resend account owner. WhatsApp links are generated from the currently selected service and checklist state.

## Disclaimer

Tech Point Services is presented as an independent assistance provider, not an official government website. Department rules govern eligibility, fees, processing, and final approval.
