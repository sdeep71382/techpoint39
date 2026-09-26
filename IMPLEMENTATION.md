# Tech Point Services Website Implementation

## Overview

This is a responsive service-business website built with Next.js App Router, TypeScript, Tailwind CSS, and Lucide icons. The experience follows one useful customer journey: find a service, check starter documents, and contact support with a prepared request.

## Experience Direction

- Premium, restrained visual system using royal blue, navy, white, black, yellow, and small red accents
- Functional interactions instead of decorative motion
- Clear hierarchy, precise spacing, and high-contrast typography
- Responsive behavior for mobile, tablet, and desktop
- Small Punjabi and Hindi translations on service names while keeping the primary interface in English
- No location, office address, or geographic service claims

## Purposeful Interactions

### Request Builder

The hero includes a working request builder. A customer can:

1. Select a service.
2. Review the service summary.
3. Mark starter documents they already have.
4. See readiness progress update immediately.
5. Open WhatsApp with the service and marked documents included in the message.

The checklist is guidance only. The interface states that exact requirements can vary and are confirmed before work begins.

### Service Directory

- Text search across service names, descriptions, and bilingual labels
- Category filters for identity, certificates, applications, and document work
- Selected-service state visible on the matching card
- Each service action updates the request builder and moves the customer to it
- A useful empty state routes unmatched needs to Other Online Services

### Supporting Interactions

- Collapsible mobile navigation with body scroll lock
- Expandable FAQ rows
- Copy-email action with confirmation feedback
- Contextual call and WhatsApp actions throughout the page
- Persistent call and WhatsApp bar on mobile
- Reduced-motion support

## Main Sections

- Sticky navigation
- Offer-led hero with interactive request builder
- Trust and preparation principles
- Searchable, filterable service directory
- Four-step process
- Why Tech Point support principles
- Accessible FAQ accordion
- Contact call to action and independent-provider disclaimer

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

## Key Files

- `src/app/page.tsx`: Page-level state and component composition
- `src/components/site-data.ts`: Shared service content, categories, FAQs, and brand contact details
- `src/components/`: Independent header, hero, request builder, service directory, content sections, contact, footer, and mobile action components
- `src/app/globals.css`: Visual system, responsive rules, and interaction states
- `src/app/layout.tsx`: Metadata and root layout
- `tailwind.config.ts`: Brand tokens and Tailwind configuration
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

The phone and WhatsApp number is `9780332509`. The email is `techpointservices39@gmail.com`. WhatsApp links are generated from the currently selected service and checklist state.

## Disclaimer

Tech Point Services is presented as an independent assistance provider, not an official government website. Department rules govern eligibility, fees, processing, and final approval.
