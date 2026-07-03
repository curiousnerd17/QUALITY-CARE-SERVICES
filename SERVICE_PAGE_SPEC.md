# SERVICE_PAGE_SPEC.md

**Quality Care Services — Service Page Architecture Specification**

> **Status:** FROZEN v1.2
> **Approval:** Granted (architectural approval, 2026-07-03)
> **Repository record:** documentation freeze commit — see `CHANGELOG.md` and git
> history
>
> This document is the permanent, canonical reference for all service-page work
> (Epics 3–4 and EPIC SP in `BACKLOG.md`). Structural changes follow the change
> control in §14.
>
> **Governing authority:** `PROJECT.md` is the constitution and always wins on
> conflict. This spec details the approved page template (PROJECT.md §10, amended
> v1.3 at freeze to summarize and defer to this document). All standing
> constraints apply: the canonical seven
> services only (Rule of Truth, §5), no frameworks, no redesign, backwards
> compatibility, no SEO-only content, WCAG 2.2 AA, Definition of Done (§18).

---

## Table of Contents

1. [Purpose & Scope](#1-purpose--scope)
2. [Canonical Page Template](#2-canonical-page-template)
3. [Reusable Components](#3-reusable-components)
4. [SEO Architecture](#4-seo-architecture)
5. [Trust Architecture](#5-trust-architecture)
6. [Conversion Architecture](#6-conversion-architecture)
7. [Content Architecture](#7-content-architecture)
8. [Imagery & Photography Standards](#8-imagery--photography-standards)
9. [Accessibility Architecture](#9-accessibility-architecture)
10. [Performance Architecture](#10-performance-architecture)
11. [Future Scalability](#11-future-scalability)
12. [Decision Gates & Open Items](#12-decision-gates--open-items)
13. [Risks & Trade-offs](#13-risks--trade-offs)
14. [Governance & Change Control](#14-governance--change-control)

---

## 1. Purpose & Scope

This specification defines the one shared architecture that all seven canonical
service pages inherit:

| Canonical Service | URL (PROJECT.md §9) |
|---|---|
| Patient Care | `/services/patient-care` |
| Elder Care | `/services/elder-care` |
| Mother & Newborn Care | `/services/mother-newborn-care` |
| Child Care | `/services/child-care` |
| Maid Services | `/services/maid-services` |
| Home Cook Services | `/services/home-cook-services` |
| Housekeeping / Dusting & Cleaning | `/services/housekeeping-cleaning` |

The pages are optimized, in priority order, for: **trust, clarity, business growth,
Google understanding, and long-term maintainability** — never visual novelty. Only
content varies between pages; structure, components, and behaviour do not.

---

## 2. Canonical Page Template

Every service page uses this exact slot order. If a slot does not apply, it still
occupies its position with honest content (structural consistency rule, PROJECT.md §10).

```
 1. Global Header                       (reused, byte-identical)
 2. Breadcrumb                          Home › Services › {Service}
 3. Hero                                H1 · value proposition · Call + WhatsApp · coverage line
 3a. Emergency Assistance band          OPTIONAL · per-service · D5-gated · default OFF
 4. What {Service} Includes             honest scope, stated boundaries
 5. Who {Service} Is For                situational profiles
 5a. Service Decision Aid               "Not sure which service you need?" (embedded)
 6. How It Works — What to Expect       first contact → assessment → matching → scheduling → ongoing support
 7. How Pricing Works                   factors only — NO prices
 8. Why Families Trust Us               service-specific trust
 9. Mid-page CTA band                   Call + WhatsApp (trust precedes ask)
10. FAQ                                 5–7 service-specific Q&As (details/summary)
11. Areas Served                        Kota + named localities, honest
12. Related Services                    2–3 genuine adjacent links
13. End CTA                             Call + WhatsApp + form path, service pre-selected
14. Global Footer                       (reused, byte-identical)
 +  Floating WhatsApp / Sticky mobile Call (persistent, reused, site-wide)
 +  RESERVED slot between 10 and 11: service-tagged testimonials (Phase 5 only; never
    shipped generic or empty)
 +  RESERVED slot between 12 and 13: Related Resources — future blog articles
    (dormant until a blog exists; see §3.5; never shipped empty)
```

### Why each slot exists

- **Breadcrumb** — orientation for visitors landing deep from Google; visible
  counterpart of `BreadcrumbList` schema.
- **Hero** — answers "do they do this, here, and can I reach them right now?" in one
  screen. Call + WhatsApp above the fold on mobile (PROJECT.md §12).
- **Emergency Assistance band (optional)** — a calm path for visitors in urgent need
  (e.g. a discharge happening today). One quiet sentence plus a call action. Exists
  because urgent visitors should not have to scan a long page — but appears **only**
  on services where the business has confirmed urgent arrangement is real (**D5**).
  Default is OFF for every page until that confirmation is recorded per service.
- **What {Service} Includes** — the page's trust and SEO core: the honest, concrete
  scope of what is delivered, including explicit boundaries (clinical vs non-clinical
  for Patient Care per D1; no "deep cleaning" for Housekeeping; etc.). Prevents
  mis-set expectations.
- **Who {Service} Is For** — stressed visitors pattern-match to their own situation;
  3–5 concrete profiles let them self-identify.
- **Service Decision Aid (embedded)** — catches mis-routed visitors at the exact
  moment of realization and hands them to the right sibling page instead of losing
  them. See §3 for pair mapping.
- **How It Works — What to Expect** — the single journey section. Reduces the fear of
  an unknown commitment by walking the genuine engagement stages: **first contact →
  assessment (listen-first) → staff matching → scheduling & start → ongoing support**.
  This slot deliberately merges the approved "How it works" process with the
  "what to expect after you contact us" journey — one section, told from the family's
  side, so the page never explains the same steps twice.
- **How Pricing Works** — transparency section. **Displays no prices, ever.** States
  honestly that the charge depends on four factors: **service**, **duration**,
  **shift**, and **specific requirements** — and that the exact charge is discussed
  after the situation is understood, with no obligation. Exists because unexplained
  pricing is the largest unspoken anxiety before a call; naming the factors is trust,
  quoting figures on a page that can't know the situation would be dishonest.
  Positioned directly before the trust block because pricing transparency *is* trust
  content, and both feed the mid-page CTA (trust precedes ask, §12).
- **Why Families Trust Us** — concentrated, service-specific reassurance
  (verification, matching, availability during service, local presence), immediately
  before the mid-page ask. Carries the Evidence Block (§3.4) as its structured
  proof layer.
- **Mid-page CTA** — captures readers convinced by process + pricing + trust.
- **FAQ** — answers the questions people won't ask on the phone; mirrored 1:1 in
  `FAQPage` schema; genuinely useful first, schema second.
- **Areas Served** — local legitimacy (Kota + Talwandi, Vigyan Nagar, Mahaveer Nagar,
  Kunhari, Landmark City), replacing the prohibited fake-locality-page pattern.
- **Related Services** — keeps mis-landed visitors in the funnel; builds the internal
  link lattice crawlers use to understand the clusters.
- **End CTA** — for the reader who needed the whole page; routes to the inquiry form
  with the service pre-selected for lead attribution.

---

## 3. Reusable Components

Per the Component Philosophy (PROJECT.md): every reusable section exists once
conceptually. Only copy, links, `data-service` values, and pre-filled WhatsApp text
vary per page. All styling is bound by the Design System dependency rule below.

### 3.0 Design System dependency rule (binding)

Every component in this spec — and **every future component added to any service
page** — must consume the existing Design System token scales (color tokens,
`--radius-*`, `--space-*`, `--elevation-*`) as its only source of visual values.

- No component may introduce a new visual value (color, radius, spacing, shadow,
  size) outside the Design System.
- If a component genuinely needs a value the scales do not provide, that value is
  first proposed as a Design System foundation amendment and approved (PROJECT.md
  §11 binding rules, §19) — the token lands before the component ships, never the
  reverse.
- Deprecated legacy tokens (`--radius`, `--shadow-*`, `--blue`, `--section-blue`)
  must not gain new consumers (DS-2A/DS-2B deprecation policy).
- This rule applies with equal force to every component introduced by this spec
  (Emergency band, Decision Aid, Pricing block, Evidence Block, Related Resources)
  and to anything added after freeze.

| Component | Origin | Shared across all 7 |
|---|---|---|
| Global header + nav | Exists (homepage) | Yes — byte-identical |
| Global footer | Exists | Yes — byte-identical |
| Floating WhatsApp | Exists | Yes |
| Sticky mobile Call bar | Exists | Yes |
| Buttons / CTA pair (Call + WhatsApp) | Exists (DS-3B pending) | Yes |
| Breadcrumb | New | Yes — labels/URLs vary |
| Service hero | New pattern | Yes — content varies |
| **Emergency Assistance band** | **New (v1.1)** | Optional — D5-gated per service, default OFF |
| Scope checklist ("what's included") | Derived from card bullet pattern | Yes |
| "Who it's for" profile cards | Reuse card pattern | Yes |
| **Service Decision Aid** | **New (v1.1)** | Yes — pair-mapped copy |
| Journey steps ("How It Works — What to Expect") | Reuse homepage process pattern, extended | Yes |
| **Pricing factors block** | **New (v1.1)** | Yes — near-identical copy, service-adjusted examples |
| Trust points block | Reuse homepage trust pattern | Yes — service-scoped copy |
| **Evidence Block** | **New (v1.2)** | Yes — every figure business-verified (§3.4) |
| FAQ (`details`/`summary`) | Reuse homepage FAQ component | Yes |
| Areas-served block | New | Yes — identical content initially |
| Related-services cards | Compact variant of service card | Yes — links vary |
| **Related Resources** | **New (v1.2) — dormant** | Reserved; activates only when a blog exists (§3.5) |
| CTA band (mid + end) | Reuse in-content CTA pattern (E2-T2) | Yes |
| JSON-LD blocks (Breadcrumb / Service / FAQ) | New pattern | Yes — one structure, per-page values |

### 3.1 Emergency Assistance band — component contract

- **Placement:** directly below the hero CTAs (slot 3a).
- **Tone:** calm and factual. No marketing language, no countdowns, no scarcity, no
  red/alarm styling. Neutral or lightly tinted surface using existing tokens; never
  the semantic-danger color.
- **Canonical copy shape (draft):** *"Need support urgently — for example, a
  discharge happening today? Call us directly. We will tell you honestly how quickly
  we can arrange help."* + one Call action.
- **Honesty rules:** no guaranteed response times, no "24/7" or "emergency team"
  claims unless the business confirms them as real for that service (**D5**). No
  clinical-emergency framing — this business is not an ambulance or ICU service, and
  copy must never imply it (D1 honesty boundary).
- **Applicability:** ON only where confirmed (Patient Care is the expected first
  candidate); OFF everywhere else. The band's absence needs no placeholder.

### 3.2 Service Decision Aid — component contract

- **Placement:** end of "Who {Service} Is For" (slot 5a) — the point where a
  mis-routed visitor self-identifies out.
- **Form:** heading ("Not sure which service you need?"), one honest differentiator
  paragraph, one link to the sibling service. Never a comparison table, never
  competitor comparison, never more than ~60 words — long comparisons duplicate the
  sibling page's content and cannibalize its ranking.
- **Pair mapping:**

| Page | Compares against | Differentiator axis |
|---|---|---|
| Patient Care | Elder Care | recovery/condition-driven care vs age-related ongoing support |
| Elder Care | Patient Care | as above, reversed |
| Mother & Newborn Care | Child Care | post-delivery mother + newborn support vs care for older children while parents work |
| Child Care | Mother & Newborn Care | as above, reversed |
| Maid Services | Housekeeping | **D4-gated** boundary wording |
| Housekeeping | Maid Services | **D4-gated** |
| Home Cook Services | Maid Services | dedicated cooking vs general household help — **D4-gated** |

- The two D3-resolved care pairs can ship immediately; all Home Support decision-aid
  copy waits for **D4**.
- **SEO note:** this component honestly satisfies "X vs Y" queries without creating
  thin comparison pages.

### 3.3 Pricing factors block — component contract

- **Placement:** slot 7, after the journey section, before trust.
- **Content:** a short intro sentence, the four factors as a semantic list —
  **service · duration (hours per day, days per week, engagement length) · shift
  (day / night / 12-hour / 24-hour, matching real offerings) · specific requirements
  (condition, household size, tasks)** — and one closing honesty line: the exact
  charge is discussed after the situation is understood; no obligation.
- **Prohibitions:** no figures, no "starting from…", no rate cards, no
  "affordable/cheapest/best price" language, no discount or urgency framing, no
  `Offer`/price schema, no `priceRange` added to `LocalBusiness`.
- **FAQ coordination:** the existing "how charges are decided" FAQ item (E3-T8)
  remains for long-tail coverage but must be consistent with — and shorter than —
  this section; it may reference the same four factors.

### 3.4 Evidence Block — component contract

- **Placement:** inside "Why Families Trust Us" (slot 8), as the structured proof
  layer beneath the trust points.
- **Form:** 3–4 compact fact items rendered with existing card/stat patterns and
  tokens (§3.0) — e.g. years operating, verification practice, replacement
  practice, local presence. Calm presentation: no animated counters, no
  badge/award graphics, no trust seals that don't exist.
- **Honesty rules:** every figure and claim is business-verified and recorded in an
  **evidence ledger** (claim · source · verified-on date) before it ships. No
  rounded-up counts, no "1000+ families" style claims without records. Where a
  number cannot be verified, the item states the practice qualitatively instead
  ("every caregiver is background-verified") — and only if that practice is real.
- **Freshness:** ledger entries are re-verified on the content freshness cycle
  (§7); a figure that can no longer be verified is removed or replaced, never left
  to drift.
- **Scope:** shared component; service-specific proof preferred where it exists,
  honest shared proof otherwise.
- **Schema:** none — no ratings, awards, or certification markup.

### 3.5 Related Resources — component contract

- **Placement:** reserved slot between Related Services (12) and the End CTA (13).
- **Dormancy:** does not render at all until the blog exists — and the blog itself
  requires a constitutional scope amendment first (§11). Never ships empty, with
  placeholder links, or with third-party content as filler.
- **Activation contract:** 2–3 articles per page, chosen solely by whether they
  genuinely help *this page's* visitor (e.g. post-discharge home preparation on
  the Patient Care page); each linked article links back to its service page.
- **Boundaries:** never a substitute for Related Services (services and reading
  are different decisions); plain "helpful reading" tone; no clickbait titles; no
  SEO-only articles feeding it (PROJECT.md §7 applies to the blog too).
- **Styling:** existing card/link patterns and tokens only (§3.0).

---

## 4. SEO Architecture

### 4.1 Titles & descriptions

Title pattern (~50–60 chars, brand-suffixed; **city in title, never in URL**):

- Care cluster: `{Service} at Home in Kota | Quality Care Services`
- Home Support cluster: `{Service} in Kota | Quality Care Services`

| Page | Draft title | Gate |
|---|---|---|
| Patient Care | Patient Care at Home in Kota \| Quality Care Services | D1-final; no ICU claims |
| Elder Care | Elder Care at Home in Kota \| Quality Care Services | — |
| Mother & Newborn Care | Mother & Newborn Care at Home in Kota \| Quality Care Services | single combined service (D3) |
| Child Care | Child Care at Home in Kota \| Quality Care Services | age-band differentiated |
| Maid Services | Maid Services in Kota \| Quality Care Services | **D4** |
| Home Cook Services | Home Cook Services in Kota \| Quality Care Services | **D4/D5** |
| Housekeeping / Cleaning | Housekeeping & Cleaning in Kota \| Quality Care Services | **D4/D5**; no "deep cleaning" |

Meta description: one honest sentence of scope + one of trust + implicit CTA,
140–160 chars, written only after copy is decision-final. Never keyword-stuffed.

### 4.2 Heading hierarchy

- Exactly one `<h1>`: the service + city core (e.g. "Patient Care at Home in Kota").
- One `<h2>` per template slot 4–13 (including "How Pricing Works" and the CTA
  headings); `<h3>` only for sub-items (scope items, profiles, journey steps, the
  Decision Aid heading).
- FAQ questions are `<summary>` elements (native disclosure, consistent with the
  homepage), never headings.
- No skipped levels; clean outline per page.

### 4.3 Canonical URL & file strategy

- Self-referential canonical on every page, exactly matching the §9 URL table.
- **Open decision (must precede the first page):** file strategy
  (`patient-care.html` vs `patient-care/index.html`) and trailing-slash form,
  normalized via Netlify so exactly one URL form returns 200 and all variants 301.
  The canonical tag, sitemap, schema `url`, breadcrumb, and every internal link use
  that single form. Recorded in §12.

### 4.4 Breadcrumb

`Home › Services › {Service}` — visible text identical to schema names and to
canonical service names (§5 of PROJECT.md). "Services" points to `/services/` once
the hub (E4-T7) exists; interim target is the homepage `#services` anchor.

### 4.5 Internal linking lattice

- Homepage service cards + footer service list → each page as it ships (E5-T3);
  never link to an unshipped page.
- Related-services reciprocals: Patient ↔ Elder (primary pair); Mother & Newborn ↔
  Child; Maid ↔ Cook ↔ Housekeeping (Home Support triangle); Elder → Cook /
  Housekeeping where the household overlap is genuine.
- The Service Decision Aid adds one deliberate sibling link per page (§3.2).
- Breadcrumb links up; the `/services/` hub links down to all seven.

### 4.6 Schema — one entity, referenced everywhere

- `LocalBusiness` exists **once**, on the homepage, with a stable `@id`. Never
  duplicated onto service pages.
- Each service page carries exactly three nodes:
  1. `BreadcrumbList` — matches the visible breadcrumb;
  2. `Service` — canonical name, truthful description, `areaServed` Kota +
     localities, `provider` → the homepage `@id`;
  3. `FAQPage` — mirrors the visible FAQ 1:1, nothing more.
- `Organization` + `WebSite` (E5-T4) stay homepage-level, same `@id` family.
- **No** `Review`, `AggregateRating`, `Offer`, or price schema until the underlying
  reality exists and is visible on the page.

### 4.7 Sitemap

Each URL added only when live, with a real `lastmod` (E1-T8 habit); Search Console
submission per E10-T8.

### 4.8 Local SEO scalability (city × service)

The local-SEO architecture is tiered so future growth never requires retrofitting
existing pages:

- **Tier 1 — today (single city).** Kota lives in titles, H1s, visible content,
  and `Service.areaServed` — never in URLs (PROJECT.md §9). One `LocalBusiness`
  entity, one Google Business Profile, NAP consistent everywhere.
- **Tier 2 — adjacent coverage growth.** Newly and genuinely served localities
  extend the Areas Served section and `areaServed` lists on the existing pages.
  No new pages, no new URLs.
- **Tier 3 — a genuine second city.** Requires a constitutional scope amendment
  first (PROJECT.md roadmap stage 8). The framework recorded now so nothing built
  today blocks it:
  - The existing seven URLs never change; they remain canonical.
  - New city×service pages are created **only** for combinations actually
    delivered in that city, each meeting this spec's full usefulness bar — same
    template, real local content (staff, coverage, contact reality for that city).
  - The URL namespace for city pages is decided at amendment time; today's
    city-free URLs keep every option open. Whatever is chosen: one URL form,
    301 discipline, self-referential canonicals.
  - Schema becomes multi-location: one parent `Organization`; one `LocalBusiness`
    node per real location with its own stable `@id`, NAP, and Google Business
    Profile; each city's `Service` nodes reference their own city's
    `LocalBusiness`.
- **Hard prohibition (all tiers, permanent):** no programmatic or thin
  city×service matrix pages; no page for a city or combination the business does
  not genuinely serve; location content is never generated to rank (PROJECT.md §7).

---

## 5. Trust Architecture

Trust is layered where decisions happen, not concentrated in one banner:

| Layer | Location | Signal | Why there |
|---|---|---|---|
| Ambient | Hero coverage line | verified caregivers, local Kota team | first-screen credibility without delaying the call decision |
| Calm urgency | Emergency band (where ON) | honest "we'll tell you how fast we can help" | urgency handled with honesty, not pressure |
| Candor | Scope section | explicit boundaries (clinical/non-clinical; what is *not* included) | honesty about limits beats inflated claims; prevents bad-fit leads |
| Journey | How It Works — What to Expect | assessment-first, matching, ongoing support | an unknown commitment made known reduces contact anxiety |
| Transparency | How Pricing Works | factors named, no hidden approach | unexplained pricing is the largest unspoken pre-call anxiety |
| Concentrated | Why Families Trust Us | verification, experience, matching, reachable-during-service, local presence | immediately before the mid-page CTA (§12: trust precedes ask) |
| Objection-handling | FAQ | verification process, what staff won't do, charge approach | answers what people are too anxious to ask by phone |
| Local legitimacy | Areas Served | named real localities | proves actual local presence |
| Final reassurance | one line in end CTA | listen-first framing | softens the last ask |

Constraints: emergency/short-notice claims **D5-gated**; all experience and
verification claims must reflect actual practice; trust content is service-specific
per page (E3-T7), never the generic homepage set.

---

## 6. Conversion Architecture

Call and WhatsApp are equal-weight; both reachable above the fold on mobile on every
page (PROJECT.md §12).

| Surface | Position | Contents |
|---|---|---|
| Hero CTA | above fold | Call + service-pre-filled WhatsApp |
| Emergency band (where ON) | below hero | single Call action |
| Mid-page CTA band | after Why Families Trust Us | Call + WhatsApp |
| End CTA | after Related Services | Call + WhatsApp + inquiry-form path with service pre-selected |
| Floating WhatsApp | persistent | site-wide; service-context pre-fill on service pages |
| Sticky mobile Call | persistent (mobile) | site-wide |

### CTA priority hierarchy

| Tier | Action | Role & rules |
|---|---|---|
| **1 — co-primary** | **Call + WhatsApp** | Equal weight per PROJECT.md §12 — never demote one below the other. Both above the fold on mobile. Consistent pair ordering everywhere (Call first, WhatsApp second — a layout convention, not a priority statement). Primary button styling via tokens (DS-3B). |
| **2 — secondary** | **Inquiry form / callback** | Appears only in the end CTA, routed to `/#contact` with service pre-select. Secondary visual styling; never competes with the Tier-1 pair in the same band except in the end CTA, where it is the third option. |
| **3 — reinforcement** | **Floating WhatsApp · Sticky mobile Call** | Persistent ambient surfaces; never styled to compete with in-content bands; not counted as content CTAs. |

Band composition rules: each in-content CTA band contains exactly one Tier-1 pair.
The Emergency Assistance band is the single exception — Call only, because urgency
favors the fastest synchronous channel. No band ever contains two Tier-1 pairs, or
a Tier-2 action without the Tier-1 pair present.

**Anti-spam rules:** three in-content CTA blocks is the ceiling (the emergency band,
where ON, is an urgent-path affordance, not a fourth marketing CTA — it contains no
persuasion copy). Never two CTA bands in adjacent slots. No CTA inside the
comprehension zone (scope → who-it's-for → journey → pricing). All CTA copy is calm
("Talk to us about elder care"); no manufactured urgency anywhere.

**Form routing:** the inquiry form lives on the homepage. Service-page end CTAs route
to `/#contact` with a service parameter (e.g. `?service=Patient%20Care` or an
equivalent hash convention) plus a small additive `main.js` extension that reads it
and pre-selects the matching `<option>`. One form, one Web3Forms integration, one
validation path. Acceptable because WhatsApp/Call dominate this market; the form is
the tertiary path. Mechanism must be finalized before E3-T11 (§12).

**Analytics:** every conversion surface carries the GA4 taxonomy (Epic 6) with
per-service attribution from the first day each page ships.

---

## 7. Content Architecture

| Attribute | Care Services pages | Home Support pages |
|---|---|---|
| Visible body copy | 900–1,100 words | 700–900 words |
| H1 | 1 | 1 |
| H2 | 8–9 (one per slot) | 8–9 |
| H3 | 5–9 | 4–7 |
| FAQ count | 6–7 | 5–6 |
| Images | 1 hero (LCP, priority) + 0–1 in-body | 1 hero + 0–1 |
| Icons | existing set for scope/journey items, decorative (`aria-hidden`) | same |

Word counts are ceilings against padding as much as floors against thinness; no
sentence exists solely to lengthen a page (§7 prohibition on SEO-only content).

Per-section copy rules:

- **Hero:** one-line value proposition; no adjectives doing the work facts should do.
- **Emergency band:** ≤ 30 words, factual, D5-verified (§3.1).
- **Scope:** itemized, concrete, boundary-stating; only genuinely delivered
  capabilities.
- **Who it's for:** 3–5 situational profiles mapped to real scope.
- **Decision Aid:** ≤ 60 words + one link (§3.2).
- **Journey:** 4–5 steps — first contact, assessment, matching, scheduling & start,
  ongoing support; no timeline promised that can't be honored.
- **Pricing:** ~80–120 words; the four factors; no figures (§3.3).
- **Trust:** service-specific, truthful, non-clinical.
- **FAQ:** genuinely useful first; mirrored exactly in schema; no cost figures
  (approach only).
- **Tone everywhere:** calm, honest, plain — the audience is stressed; the copy must
  lower anxiety (PROJECT.md §11).

Content gates: Patient Care copy is D1-final. All three Home Support pages'
differentiating copy (scope boundaries, decision aids, availability claims) waits on
**D4/D5**.

### Content freshness governance

Every service page lives on a review cycle so published truth never drifts from
business truth:

- **Cycle:** each page is reviewed at least every **6 months**, and immediately on
  any triggering event — a D-decision change, a scope/offering change, a
  pricing-factor change, a locality coverage change, or an Evidence Block figure
  changing.
- **Review scope:** scope claims and boundaries, FAQ accuracy, Evidence Block
  figures (§3.4 ledger), availability/emergency claims (D5 ledger), areas served,
  internal links, and schema still mirroring visible content 1:1.
- **Outcomes:**
  - **Reviewed** — verified accurate, no change needed. Recorded; no deploy.
  - **Updated** — content changed. Ships via the normal branch → review → deploy
    flow, refreshes the sitemap `lastmod`, and gets a CHANGELOG.md line.
- **Visible freshness:** a page may carry a short "Content reviewed: {month year}"
  line only when it reflects a genuinely completed review — never decorative,
  never auto-bumped.
- **Ownership:** business truth is confirmed by the business owner; engineering
  executes. Review records live in CHANGELOG.md and commit history, not in this
  spec (this spec never carries task status, §14).

---

## 8. Imagery & Photography Standards

These standards govern all service-page imagery (and, at freeze, become the reference
for imagery site-wide). They implement PROJECT.md §11 — "no imagery implying clinical
procedures the business does not perform" — and the trust-first positioning.

### Authenticity rules

- **Real caregivers only.** People shown as staff must actually work with the
  business. No models posing as caregivers.
- **Real homes.** Settings must be genuine Kota-area home environments, not staged
  studio sets or Western stock interiors that contradict the local audience's
  reality.
- **Natural lighting.** Available/ambient light; no clinical white-box lighting, no
  heavy filters, no artificial perfection. Imperfect-but-real beats polished-but-fake.
- **No fake doctors.** No white coats, stethoscopes, hospital equipment, or any
  visual implying clinical procedures the business does not perform. Patient Care
  imagery may show attendant-level support honestly; it must never look like a
  hospital ward or ICU (D1 honesty boundary).
- **No AI-generated or AI-looking imagery.** No generative portraits, no synthetic
  "caregiver smiling at elderly hand-holding" stock clichés, no uncanny composites.
  If a real photo does not exist yet, use the existing honest generic (the current
  caregiver hero) or no image — never a fake.

### Consent & dignity rules

- **Written consent** from every identifiable staff member before their photo ships.
- **Clients, patients, and family members are not photographed for the website** —
  the business places people around vulnerable individuals in private homes;
  their privacy outranks any marketing value. Children and newborns are never
  identifiable in any site imagery, full stop.
- Staff are depicted with dignity — at work, competent, unposed; never in
  contrived emotional tableaux.

### Technical rules

- Hero images follow the E7-T1 pattern: right-sized, responsive `srcset`, AVIF/WebP
  with fallback, explicit `width`/`height`, `fetchpriority="high"` (LCP element).
- In-body images: `loading="lazy"`, explicit dimensions.
- One consistent aspect ratio for service heroes across all seven pages (exact ratio
  fixed at template certification, E3-T12) so pages feel like one system.
- **Alt text:** informative images get meaningful alt describing what is genuinely
  shown ("caregiver helping an elderly man walk in his home in Kota" — only if that
  is literally what the photo shows); decorative images `alt=""`; icons
  `aria-hidden="true"`.
- File naming: lowercase, hyphenated, content-describing (`elder-care-hero.avif`).

### Rollout rule

Real photography is a Phase-5-compatible asset that can arrive incrementally. Pages
may ship with the existing honest hero imagery and upgrade photo-by-photo; they may
never ship with stock or AI imagery as a bridge.

---

## 9. Accessibility Architecture

Target: WCAG 2.2 AA, inherited as Definition of Done, not retrofitted.

- **Keyboard:** every interactive element reachable and operable; skip link on every
  page; `Escape` closes the mobile menu; native `details`/`summary` FAQ; logical tab
  order follows visual order.
- **Focus:** visible `:focus-visible` on all interactive elements via the token
  system (extends the DS-3A treatment site-wide per E8-T5); no removed outlines
  without replacement; sticky mobile bar must never obscure the focused element
  (scroll-padding accounted for).
- **ARIA & semantics:** correct landmarks (`header`, `nav`, `main`, `footer`);
  breadcrumb as `<nav aria-label="Breadcrumb">`; decorative icons
  `aria-hidden="true"`; WhatsApp/Call links carry descriptive accessible names
  including the service ("WhatsApp us about Patient Care"); form status uses
  `role="alert"` / `aria-invalid` (E8-T4). Native semantics over ARIA everywhere.
- **Emergency band:** static content — not an ARIA live region; not distinguished by
  color alone; its Call action meets target-size rules.
- **Pricing factors:** semantic list markup, not styled divs.
- **Contrast:** all text/background pairs ≥ 4.5:1 (3:1 large text), verified with
  tooling on tinted sections and the dark footer — never assumed (§13 of PROJECT.md).
- **Touch targets:** ≥ 44×44px for all CTAs and FAQ summaries (exceeds WCAG 2.2's
  24px minimum); adequate spacing between sticky bar and floating WhatsApp.
- **Reduced motion:** scroll-reveal wrapped in
  `prefers-reduced-motion: no-preference`; content never hidden when JS or animation
  is unavailable.

---

## 10. Performance Architecture

- **Images:** per §8 technical rules; the hero is the LCP element with priority load;
  everything below the fold defers; no maps or heavy embeds on service pages in v1.
- **Critical CSS:** deliberately **not** extracted per-page — manual extraction with
  no build step is drift-prone, and the single shared `style.css` is cache-hot on any
  second page view. The lever is keeping `style.css` lean and immutable-cached.
- **Fonts:** no new font families. Font Awesome subsetting (E7-T3) lands before or
  alongside the Epic 4 rollout so all seven pages inherit the lighter payload.
- **JavaScript:** zero new JS per page beyond (a) the small additive `main.js`
  form-pre-select reader and (b) the shared GA4 event layer; `defer` everywhere; no
  new third-party origins (CSP unchanged).
- **Lighthouse targets (mobile):** Performance ≥ 90 (aspire 95+), Accessibility 100,
  Best Practices 100, SEO 100.
- **Core Web Vitals:** LCP ≤ 2.5s (aim ≤ 2.0s) · CLS ≤ 0.1 (aim ≈ 0) · INP ≤ 200ms.
  Targets exist to catch regressions, not to stretch.

---

## 11. Future Scalability

Scalability derives from four already-made decisions: shallow IA, stable city-free
URLs, a single `LocalBusiness` entity referenced by `@id`, and one token-driven
template. Additions are additive:

- **Blog** — `/blog/` namespace, own lightweight template, `Article` schema; articles
  link *into* service pages. Requires constitutional scope amendment first
  (PROJECT.md roadmap stage 8); nothing in this architecture blocks it. Service
  pages surface blog content only through the dormant Related Resources component
  (§3.5).
- **Reviews** — the reserved testimonial slot activates in Phase 5 with service-tagged
  real reviews; `Review` schema only when reviews are visible and genuine.
- **Doctors** — **Rule of Truth flag:** not on the canonical seven. Path: §5 amendment
  first → new page on this template → new `Service` node. Nothing pre-built.
- **Hiring** — standalone `/careers` page outside the service funnel; `JobPosting`
  schema; reuses header/footer/tokens but not this template (different audience and
  conversion goal).
- **Cities** — §9 keeps cities out of URLs precisely for this: a genuine second city
  extends `areaServed`, titles, and content; service URLs never change. Fake location
  pages remain prohibited regardless. Full tiered framework: §4.8.

---

## 12. Decision Gates & Open Items

Items only the business/governance side can resolve; each blocks the mapped scope and
nothing else:

| # | Decision | Blocks |
|---|---|---|
| 1 | **D4 — Home-services boundaries** | Maid / Cook / Housekeeping scope copy, decision aids, meta |
| 2 | **D5 — short-notice/one-off availability, per service** | Emergency Assistance band activation anywhere; availability claims |
| 3 | **Canonical URL file/slash strategy** (§4.3) | first page shipped (E3-T1) |
| 4 | **Form pre-select mechanism confirmation** (§6) | E3-T11 |
| 5 | **GA4 event taxonomy** (E6-T1 — spec-only, no dependencies) | should precede E3 ship |
| 6 | **PROJECT.md §10 amendment** to reflect this template's slots (see §14) — ✅ resolved: v1.3 amendment shipped with the freeze (2026-07-03) | spec freeze (done) |
| 7 | **Emergency band per-service ON/OFF ledger** (starts all-OFF; flips only with recorded D5 confirmation) | each activation |
| 8 | **Evidence ledger** — business-verified figures/claims with verified-on dates (§3.4) | Evidence Block shipping on any page |

Pre-certification verifications (engineering, pulled forward from Epic 8): homepage
tinted-background contrast and reduced-motion behaviour must be verified **before**
template certification (E3-T12), or seven pages inherit any defect.

---

## 13. Risks & Trade-offs

### Risks

1. **D4 unresolved** → thin/duplicative Home Support pages; blocks 3 of 7 pages'
   final copy. Highest-priority open item.
2. **Template drift** across seven hand-copied static files (no include mechanism by
   constitutional design). Mitigations: E3-T12 certification freezes canonical
   markup; documented reference snippet per component; "diff against the certified
   template" as a review-checklist item for every Epic 4 page; any global-chrome
   change is an all-pages task by definition.
3. **Canonical URL form decided late** → seven-page cleanup.
4. **Emergency band scope-creep** → if copy drifts toward marketing urgency it
   violates §11/§12; the component contract (§3.1) is the guardrail.
5. **Decision Aid content growth** → if it grows past the 60-word contract it becomes
   duplicate content; the contract is the guardrail.
6. **Interim internal links** to unshipped pages → rollout discipline: never link to
   a page that isn't live.
7. **Inherited a11y defects** → pre-certification verification (§12).
8. **Evidence/freshness drift** — published figures or claims going stale would
   contradict the trust positioning. Guardrails: the evidence ledger (§3.4) and the
   content freshness cycle (§7).

### Trade-offs (accepted deliberately)

- **Single homepage form** over per-page embedded forms — maintainability and one
  integration, at the cost of cross-page friction on the tertiary conversion path.
- **No critical-CSS inlining** — cacheability and no-build simplicity over
  first-paint micro-optimization.
- **"What to Expect" merged into the journey section** rather than a second step
  section — anxiety-reduction intent fully preserved, duplication avoided.
- **Decision Aid embedded** rather than a standalone comparison section — catches
  mis-routed visitors at the right moment without inviting duplicate-content
  comparison pages.
- **No standalone "Benefits" section** — benefits live concretely in scope and
  who-it's-for; abstract benefit copy conflicts with the calm/honest register.
- **Manual template duplication** — constitutional no-build purity, paid for with
  review discipline.
- **Testimonials deferred to Phase 5** — no social proof over weak social proof.

---

## 14. Governance & Change Control

- **Freeze status:** **FROZEN v1.2**. Approval: granted (architectural approval,
  2026-07-03). Repository record: the documentation freeze commit (see
  `CHANGELOG.md` and git history). This document is the permanent reference for
  all service-page work; Epic 3/4 and EPIC SP tasks implement against it.
- **Constitutional consistency:** PROJECT.md §10 was amended (**v1.3, 2026-07-03**,
  alongside this freeze) to match this spec's slot order and to reference this
  document as the canonical specification. PROJECT.md remains the constitution and
  wins on any conflict.
- **Change control after freeze:** structural changes (slots, order, component
  contracts, schema architecture) require the same review-and-approval path as a
  PROJECT.md amendment. Copy-level refinements within an existing contract follow
  the normal branch → review → deploy flow.
- **Documentation hierarchy placement:** PROJECT.md (constitution) → this spec
  (service-page architecture reference) → BACKLOG.md (task state) → CHANGELOG.md
  (release history). This spec never carries task status; that stays in BACKLOG.md.

---

## Spec History

- **v1.2 (2026-07-03) — FROZEN** (approval: granted; repository record: the
  documentation freeze commit). Six additions on
  v1.1: tiered Local SEO scalability architecture for future city×service growth
  (§4.8); reusable Evidence Block trust component with business-verified evidence
  ledger (§3.4); content freshness governance — Reviewed/Updated outcomes on a
  6-month plus event-driven cycle (§7); dormant Related Resources component for
  future blog integration (§3.5); explicit three-tier CTA priority hierarchy
  honoring the §12 Call/WhatsApp equal-weight rule (§6); binding Design System
  dependency rule for all current and future components (§3.0). No slot-order
  changes.
- **v1.1 (2026-07-03) — DRAFT, pending approval.** Initial written spec. Incorporates
  the approved-in-principle v1.0 architecture (chat review, 2026-07-03) plus five
  requested improvements: How Pricing Works section (no prices; four factors);
  optional D5-gated Emergency Assistance band; embedded Service Decision Aid
  component; "What to Expect" merged into a single journey section; Imagery &
  Photography Standards (real caregivers, real homes, natural light, no fake
  doctors, no AI-looking stock, plus consent/dignity rules).
