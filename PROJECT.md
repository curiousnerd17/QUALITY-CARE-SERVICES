# PROJECT.md

**Quality Care Services — Engineering Playbook & Project Constitution**

> This is not a README. This is the permanent engineering handbook and governing
> constitution for this repository. It defines what this project *is*, what it must
> *never become*, and how any engineer — human or AI — is expected to work within it.
> When a decision is ambiguous, this document is the tie-breaker. When this document
> conflicts with a convenient shortcut, this document wins.

---

## Table of Contents

1. [Project](#1-project)
2. [Business Overview](#2-business-overview)
3. [Project Vision](#3-project-vision)
4. [Engineering Principles](#4-engineering-principles)
5. [Canonical Business Services](#5-canonical-business-services)
6. [Target Users](#6-target-users)
7. [SEO Strategy](#7-seo-strategy)
8. [Information Architecture](#8-information-architecture)
9. [URL Strategy](#9-url-strategy)
10. [Page Template Standard](#10-page-template-standard)
11. [Design Principles](#11-design-principles)
12. [Conversion Strategy](#12-conversion-strategy)
13. [Accessibility](#13-accessibility)
14. [Performance Standards](#14-performance-standards)
15. [Security](#15-security)
16. [Analytics](#16-analytics)
17. [Git Workflow](#17-git-workflow)
18. [Definition of Done](#18-definition-of-done)
19. [Things That Must Never Change](#19-things-that-must-never-change)
20. [Future Roadmap](#20-future-roadmap)
21. [AI Collaboration Rules](#21-ai-collaboration-rules)

---

## 1. Project

| Field | Value |
|---|---|
| **Project Name** | Quality Care Services |
| **Type** | Production Business Website (live, receiving real users) |
| **Business Domain** | Home Care & Domestic Home Services |
| **Primary Market** | Kota, Rajasthan, India (and immediately surrounding areas) |
| **Repository Status** | Production. Every change is production-critical. |

### Current Tech Stack

- **HTML5** — semantic, hand-authored
- **CSS3** — custom properties (design tokens), no preprocessor
- **Vanilla JavaScript (ES6)** — no build step, no bundler required
- **Netlify** — hosting, redirects, headers, caching
- **Web3Forms** — inquiry form submission handling
- **Google Analytics 4** — behavioural and conversion measurement
- **Google Search Console** — indexing and search-performance monitoring

### Explicitly Excluded Technologies

This stack is a deliberate architectural decision, not a limitation. The following are
**prohibited** without a formal constitutional amendment (see §19):

- ❌ React
- ❌ Next.js
- ❌ Bootstrap
- ❌ Tailwind
- ❌ Any SPA framework, CSS framework, or mandatory build toolchain

The site must remain buildable and deployable as static files. Simplicity is the feature.

---

## 2. Business Overview

Quality Care Services connects families in Kota with verified caregivers and domestic
staff, and arranges that support in the family's home. The business is built on trust:
it places people inside customers' homes, often around vulnerable individuals (patients,
the elderly, newborns), so honesty, verification, and clear communication are core to
both the operation and the product.

The company operates a **listen-first** model: it understands the family's situation,
matches suitable staff, and stays reachable throughout the engagement as a locally based
team — not a distant call center.

### The company provides these REAL services only

- Patient Care
- Elder Care
- Mother & Newborn Care
- Child Care
- Maid Services
- Home Cook Services
- Housekeeping / Dusting & Cleaning

> **Rule of Truth.** Never invent services. Never advertise, imply, or build pages,
> schema, or copy for services the business does not actually offer. If a service is not
> on the canonical list in §5, it does not exist on this website. This rule outranks any
> SEO, marketing, or "it would rank well" argument.

---

## 3. Project Vision

The goal is **not** simply to have a website. The goal is to build a trustworthy local
business platform that earns its traffic and converts it into real enquiries.

Concretely, the platform must:

- **Rank well on Google** for genuine, service-specific and local search intent.
- **Generate leads** — calls, WhatsApp messages, and form submissions.
- **Convert visitors into enquiries** through clarity and trust, not pressure.
- **Scale gradually** — from a single homepage today to a small constellation of honest
  service pages, one page at a time, without ever breaking what already works.
- **Remain simple to maintain** — any competent web developer should be able to read the
  source and make a safe change on day one.
- **Stay framework-free** — permanently.

Every future decision is measured against this vision. Growth that compromises
maintainability, honesty, or simplicity is the wrong growth.

---

## 4. Engineering Principles

These principles govern *how* work is done in this repository.

1. **Production first.** The site is live and receiving users. Treat every change as
   production-critical. There is no "just a small change."
2. **Incremental improvements over rewrites.** Prefer the smallest change that achieves
   the goal. Additive change beats replacement.
3. **Never rewrite working code.** If it works, is understood, and is safe, leave it.
   Refactor only with a clear reason and no behavioural regression.
4. **Preserve backwards compatibility.** Existing URLs, anchors, and features must keep
   working. New pages are additive; old paths do not move without a `301`.
5. **Simplicity over complexity.** The simplest solution that is correct and maintainable
   is the right one. Complexity must earn its place.
6. **Performance first.** Speed is a feature and a ranking factor. Ship less, not more.
7. **Accessibility matters.** The audience includes elderly users and stressed families.
   Accessible is not optional; it is part of "working."
8. **SEO is part of architecture.** Structure, semantics, and internal linking are
   designed in, not bolted on. SEO is never an excuse to add fake content.
9. **Security by default.** Secure headers, HTTPS, and a strict CSP are baseline, not
   enhancements.
10. **Do not modify unrelated code.** Scope every change tightly. Leave the rest alone.

---

## 5. Canonical Business Services

These are the **official, canonical services**. This list is the single source of truth.

> **v1.1 Amendment (Governance Update):** "Newborn & Baby Care" consolidated into "Mother & Newborn Care" as a single combined service; cluster names updated to "Care Services" and "Home Support Services"; reordered per business finalization.

| # | Canonical Service | Cluster |
|---|---|---|
| 1 | Patient Care | Care Services |
| 2 | Elder Care | Care Services |
| 3 | Mother & Newborn Care | Care Services |
| 4 | Child Care | Care Services |
| 5 | Maid Services | Home Support Services |
| 6 | Home Cook Services | Home Support Services |
| 7 | Housekeeping / Dusting & Cleaning | Home Support Services |

**Mother & Newborn Care** is a single combined service covering post-delivery support for mothers and care for newborn babies — never split into two services. **Child Care** is a separate service for young children whose parents are at work and need dependable care at home. The two services do not overlap.

### Binding Constraint

All future **pages, structured data (schema), navigation, page copy, internal links,
sitemap entries, and CTAs** must use **only** these seven services, named consistently.

- No service outside this list may be added to the site without amending this document
  and confirming it is a real business offering.
- Legacy labels that predate this list (e.g. terms once used on the homepage that are not
  on it) must be reconciled *into* these seven — renamed, merged, or retired — never left
  to contradict the canonical set.
- Sub-capabilities (for example, specific tasks within Patient Care) are presented
  *inside* their parent service, never as standalone "services," and only where genuinely
  delivered.

---

## 6. Target Users

The site serves several real audiences, each arriving with a different mindset:

- **Families in acute need** — a patient discharged from hospital, a sudden requirement at
  home. High urgency, low patience; they need to trust and contact fast.
- **Adult children arranging elderly care** — often busy or living outside Kota; they
  research, seek reassurance, and value a locally reachable team.
- **Patient families** — households managing an ill, recovering, or bedridden member who
  need supervision, relief, or ongoing support.
- **Working parents** — couples needing dependable child care or newborn/baby care while
  they work; their dominant concern is safety.
- **Households needing domestic support** — families wanting reliable maid, cook, or
  housekeeping help, recurring or short-notice.
- **People needing everyday domestic help** — including elderly or dual-income homes that
  simply need dependable daily assistance.

Across all audiences the through-line is **trust under stress**. Design and copy must
lower anxiety and make the next step obvious.

---

## 7. SEO Strategy

SEO here is a discipline of honesty and structure, not volume.

- **The homepage is the business hub.** It targets broad, brand and head-level local
  intent, communicates trust, and routes users to the right service page. It is a funnel
  and a hub — not a page that tries to rank for everything at once.
- **Dedicated service pages target service-specific search intent.** Each canonical
  service earns one page with its own title, H1, and genuinely useful content. The page
  ranks *because* it is useful to someone choosing that service.
- **Local SEO focuses on Kota and surrounding areas** — Kota plus named localities
  (e.g. Talwandi, Vigyan Nagar, Mahaveer Nagar, Kunhari, Landmark City). Location lives in
  titles, content, and schema — never in the URL.
- **Structured data reflects reality** — one canonical `LocalBusiness` entity, with
  `Service` and `FAQPage` nodes that mirror only visible, real content.

### Hard SEO Prohibitions

- ❌ **No SEO spam.**
- ❌ **No keyword stuffing.**
- ❌ **No fake location pages** (no thin per-locality landing pages).
- ❌ **No fake services** (see §5 Rule of Truth).
- ❌ **No content created solely to rank.** Every page and section must represent a real
  offering and be genuinely useful to a real visitor.

---

## 8. Information Architecture

The approved and reviewed architecture is a shallow, honest hierarchy:

```
Homepage
   │
   ▼
Service Pages   (one per canonical service)
   │
   ▼
Contact / Inquiry
   │
   ▼
FAQ
   │
   ▼
Reviews
```

- **Homepage** — hub and fast conversion funnel; summary of the seven services, trust,
  service areas, general FAQ, reviews, and contact.
- **Service Pages** — the depth layer; one page per canonical service, built incrementally.
- **Contact / Inquiry** — call, WhatsApp, and the inquiry form; reachable from everywhere.
- **FAQ** — general questions on the homepage; service-specific questions on each service
  page.
- **Reviews** — social proof, loaded dynamically with a static fallback.

> **Status: Reviewed and Approved.** This architecture has been audited across multiple
> review phases (Information Architecture, SEO Architecture, Content Architecture) and is
> the approved target. Changes to the architecture itself require review and approval per
> §19 and §21.

---

## 9. URL Strategy

Future service pages follow one flat, readable, permanent convention under `/services/`:

| Canonical Service | URL |
|---|---|
| Patient Care | `/services/patient-care` |
| Elder Care | `/services/elder-care` |
| Mother & Newborn Care | `/services/mother-newborn-care` |
| Child Care | `/services/child-care` |
| Maid Services | `/services/maid-services` |
| Home Cook Services | `/services/home-cook-services` |
| Housekeeping / Dusting & Cleaning | `/services/housekeeping-cleaning` |

### URL Rules

- **URLs must remain stable.** A published URL is a permanent commitment.
- Lowercase, hyphen-separated, self-describing. No dates, no IDs, no deep nesting.
- **No city in the URL** — single-city business; the city belongs in titles, content, and
  schema, keeping URLs flexible for the future.
- If a URL ever must move (it should not), a `301` redirect is mandatory and the old path
  is never silently dropped.
- Existing homepage anchors (`#services`, `#faq`, `#contact`, etc.) must keep working.
  Service pages are **additive**.

---

## 10. Page Template Standard

Every service page inherits one identical structural skeleton. Only the content inside
each block changes per service. This is what makes pages cheap to build, consistent for
users, and coherent for crawlers.

**Approved service-page section order:**

1. **Hero** — H1, one-line value proposition, primary Call + WhatsApp CTAs (WhatsApp
   pre-filled for that service), local coverage line.
2. **What the service includes** — the honest, concrete scope of what is delivered.
3. **Who it is for** — situational profiles so visitors self-identify.
4. **How it works** — the genuine 3–4 step engagement process.
5. **Why choose us** — service-specific trust points (not the generic homepage set).
6. **FAQ** — service-specific questions; visible content mirrored in `FAQPage` schema.
7. **Areas served** — Kota + localities, stated honestly.
8. **Related services** — internal links to 2–3 genuinely adjacent services.
9. **CTA** — matched conversion block (Call, WhatsApp, and inquiry-form path).
10. **Footer** — global footer, identical across the site, linking to real service URLs.

**Template rules:**

- Exactly one `<h1>`; `<h2>` per major section; `<h3>` for sub-items. No skipped levels.
- Global header, footer, floating WhatsApp, and mobile sticky Call are **reused**, never
  rebuilt per page.
- Every service page carries `BreadcrumbList`, a `Service` node referencing the canonical
  `LocalBusiness` by `@id`, and a `FAQPage` mirroring its visible FAQ.
- If a section does not apply, it still occupies its slot with honest content, preserving
  structural consistency.

---

## 11. Design Principles

The visual identity is deliberate and must be respected. UI philosophy:

- **Premium** — considered, quality-first presentation.
- **Minimal** — nothing on screen that does not serve the user.
- **Clean** — generous spacing, clear hierarchy, legible typography.
- **Trustworthy** — visuals reinforce credibility, never overpromise.
- **Calm** — the audience is often stressed; the interface must reduce anxiety, not add to
  it. No manufactured urgency, no aggressive visual noise.
- **Healthcare appropriate** — restrained, respectful, and honest; no imagery implying
  clinical procedures the business does not perform.

> **Avoid visual clutter.** When in doubt, remove. Do not redesign the site or its visual
> identity without explicit approval (see §19).

---

## 12. Conversion Strategy

Conversion infrastructure is a core asset and must be preserved and extended, never
weakened. The approved conversion surfaces:

- **Call** — persistent header Call button (desktop) and prominent Call CTAs throughout.
- **WhatsApp** — the dominant contact channel for this market; used with
  **service-specific pre-filled messages**.
- **Inquiry Form** — labeled, validated, spam-protected; captures the service via the
  existing `data-service` auto-fill mechanism so every lead is categorizable.
- **Floating WhatsApp** — persistent, present at every scroll depth, site-wide.
- **Sticky Mobile Call** — persistent bottom call bar on mobile.
- **Service-specific CTA** — each service page carries a matched CTA and pre-filled
  WhatsApp for that service.

**Conversion rules:**

- Call and WhatsApp are weighted **equally**; both must be reachable above the fold on
  mobile on every page.
- Trust precedes the ask: heaviest reassurance sits immediately before each CTA.
- Honest urgency only — acknowledge that some situations cannot wait; never manufacture
  scarcity or pressure.
- Keep form friction low; reconsider whether every field must be required.

---

## 13. Accessibility

Accessibility is part of the Definition of Done, targeting **WCAG 2.2 AA**.

- **Semantic HTML** — correct landmarks (`header`, `main`, `nav`, `footer`), `article`,
  `address`, and native elements (e.g. `details`/`summary`) over JavaScript re-creations.
- **Keyboard navigation** — every interactive element reachable and operable by keyboard;
  a working skip link; `Escape` closes the mobile menu.
- **Proper headings** — one `<h1>` per page, no skipped levels, a clean outline.
- **Alt text** — meaningful alternative text on all informative images; decorative icons
  marked `aria-hidden`.
- **Accessible forms** — every field has a real `<label>`; validation is announced;
  status messages use appropriate roles.
- **Visible focus states**, sufficient **color contrast**, and respect for
  `prefers-reduced-motion`.

Contrast on tinted and dark backgrounds must be verified, not assumed.

---

## 14. Performance Standards

Performance is a ranking factor and a UX feature. Goals:

- **Fast loading** — optimize the critical path; measure Core Web Vitals (LCP, CLS, INP).
- **Optimized images** — right-sized, modern formats where appropriate, explicit
  dimensions to prevent layout shift; below-the-fold media lazy-loaded; the hero treated
  as the LCP element with priority loading.
- **Minimal JavaScript** — vanilla, deferred, no unnecessary work; feature-detect and
  degrade gracefully.
- **No unnecessary libraries** — every third-party dependency must justify its weight.
  Prefer removing dependencies over adding them.
- **Caching** — long-lived immutable caching for versioned assets; always-revalidate for
  HTML (per the Netlify configuration).

---

## 15. Security

Security is baseline, enforced primarily via Netlify headers and disciplined practice.

- **CSP** — a Content Security Policy is maintained and kept as strict as functionality
  allows; inline scripts are minimized with the goal of tightening the policy over time.
- **HTTPS** — enforced site-wide, with HSTS; HTTP and `www` variants redirect to the
  canonical HTTPS origin.
- **Security headers** — `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`,
  and a scoped `Permissions-Policy` are maintained on all responses.
- **No secrets committed to Git** — ever.
- **API keys never stored in the repository** — form and integration keys live only in the
  live environment; placeholders are used in any shared or committed code.
- Client-side sanitization is UX hygiene only and is **never** treated as the trust
  boundary; the server/provider side is authoritative.

---

## 16. Analytics

GA4 is used to measure real business outcomes, not vanity metrics. The measurement
philosophy is: **track the actions that represent leads.**

Tracked events:

- **Call clicks** — taps on any `tel:` action.
- **WhatsApp clicks** — clicks on any WhatsApp entry point.
- **Form submissions** — successful inquiry submissions.
- **Future service-page conversions** — the same events, attributable per service page, so
  the business can see which services drive demand.

Analytics must respect the CSP and privacy posture; no measurement that undermines the
security or trust commitments in this document.

---

## 17. Git Workflow

A disciplined, review-gated flow protects the live site.

1. **Feature branch** — all work happens on a branch, never directly on the production
   branch.
2. **Review** — every change is reviewed before it can be deployed (see §21).
3. **Commit** — clear, scoped commits; unfinished or experimental work is never committed
   to a deployable branch.
4. **Deploy** — only reviewed, complete work reaches production.

> **Never commit unfinished work.** If it is not complete and reviewed, it does not ship.

---

## 18. Definition of Done

A task is complete **only** when every one of the following is true:

- ✅ **Works on desktop**
- ✅ **Works on mobile**
- ✅ **Lighthouse checked** (performance, accessibility, best practices, SEO)
- ✅ **Accessibility checked** (keyboard, semantics, contrast, WCAG 2.2 AA)
- ✅ **SEO checked** (titles, headings, canonical, schema, internal links)
- ✅ **Analytics verified** (relevant events fire correctly)
- ✅ **No regression** (existing pages, anchors, and features still work)
- ✅ **Production reviewed** (approved before deployment)

If any box is unchecked, the task is **not** done.

---

## 19. Things That Must Never Change

Permanent, constitutional rules. Changing any of these requires an explicit, approved
amendment to this document — not a code review comment, not a convenient exception.

- 🚫 **Never redesign the website without approval.**
- 🚫 **Never change the technology stack.**
- 🚫 **Never introduce frameworks** (React, Next.js, Bootstrap, Tailwind, or any other).
- 🚫 **Never remove working features.**
- 🚫 **Never invent business services** — the canonical seven in §5 are the only services.
- 🚫 **Never sacrifice maintainability** for cleverness, novelty, or short-term speed.
- 🚫 **Never break backwards compatibility** — existing URLs and anchors keep working.
- 🚫 **Never commit secrets or API keys** to the repository.
- 🚫 **Never add content solely for SEO** — every page must be a real offering, genuinely
  useful.

---

## 20. Future Roadmap

Growth is deliberate and incremental. Each phase builds on a stable predecessor; no phase
breaks the live site.

### Phase 1 — Foundation
Stabilize and correct the existing homepage: reconcile displayed services to the canonical
seven, fix asset/reference integrity, ensure schema reflects reality, confirm the
conversion and accessibility baseline.

### Phase 2 — Service Pages
Introduce dedicated, indexable pages for the canonical services under `/services/`, one at
a time, using the approved page template. Priority order favors highest-intent and
currently-underserved real services. Additive only.

### Phase 3 — Local SEO
Strengthen local presence: consistent NAP with the Google Business Profile, a
Place-linked map, honest service-area content, and per-service local signals — without any
fake location pages.

### Phase 4 — Performance
Tighten Core Web Vitals: right-size and modernize images, reduce render-path dependencies,
and trim JavaScript, all while preserving behaviour.

### Phase 5 — Authority
Build genuine trust and authority: deepen verification and trust content, service-tagged
reviews, and honest social proof that compounds over time.

### Phase 6 — Continuous Improvement
Ongoing measurement, iteration, and maintenance against this constitution — small,
reviewed, reversible improvements, indefinitely.

---

## 21. AI Collaboration Rules

This repository is developed with AI assistance under clear, bounded roles. AI is a
contributor, not an authority; this document and human review are the authorities.

### Role Assignments

**ChatGPT — Architecture & Governance**
- Architecture and information-architecture decisions
- Planning and roadmap sequencing
- Technical SEO strategy
- Production review
- Final approval

**Claude — Implementation**
- Large implementations
- Refactoring
- UI improvements
- Code generation

### Collaboration Rules

- **Every major implementation must be reviewed before deployment.** No AI-generated
  change reaches production unreviewed.
- All AI work is bound by this constitution — especially the Rule of Truth (§5), the
  no-framework rule (§19), backwards compatibility (§4), and the Definition of Done (§18).
- AI must not invent services, add SEO-only content, change the stack, redesign the site,
  or remove working features. When a request would violate this document, the correct
  action is to surface the conflict, not to comply.
- When business truth is required to proceed (for example, the exact scope of a service),
  AI must request that decision rather than assume it.

---
## Business Positioning

Quality Care Services is a trusted local home care and domestic support provider.

The business is positioned around one central promise:

"Reliable, verified support for families at home."

Care Services and Home Support Services are two service clusters under one trusted local brand.

All future content, navigation, and SEO must reinforce this positioning consistently.

## Component Philosophy

Every reusable section should exist only once conceptually.

Examples:

- Header
- Footer
- CTA
- FAQ
- Service Card
- Trust Section

Future pages must reuse existing patterns instead of creating new variations unless there is a justified business reason.

Consistency is preferred over creativity.

## Documentation Hierarchy

PROJECT.md
Permanent Constitution

BACKLOG.md
Current Tasks

CHANGELOG.md
Release History

README.md
Repository Overview

Architecture decisions always belong inside PROJECT.md.

Temporary work never belongs here.

> **This document is the project's constitution.** It is expected to outlive any single
> contributor, conversation, or tool. Keep it current, keep it honest, and when in doubt,
> defer to it.
