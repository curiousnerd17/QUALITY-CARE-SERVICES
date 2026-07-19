# IMPLEMENTATION_MASTER_PLAN.md

**Quality Care Services — Master Implementation Roadmap**

> **Status:** ACTIVE — single source of truth for all future implementation phases.
> **Created:** 2026-07-19, consolidating the findings of ten completed audits
> (Engineering, UX/Visual Design, CRO, Technical SEO, Brand, Accessibility,
> Performance, Security, Business Strategy, Production Readiness).
> **Position in the Documentation Hierarchy:** PROJECT.md (constitution) →
> SERVICE_PAGE_SPEC.md (frozen service-page architecture) → **this document
> (implementation roadmap)** → BACKLOG.md (task-level state) → CHANGELOG.md
> (release history). On conflict, PROJECT.md wins, then the frozen spec.
> This plan **references existing BACKLOG task IDs** (E*, DS-*, SP-*) wherever
> a task already exists; it creates new IDs (prefix `A-` for audit-derived)
> only for work no existing task covers. It does not duplicate the backlog;
> it sequences it.
>
> ⚠️ **Publication note:** until P0-4 (publish-directory restriction) ships,
> every file in this repository — including this plan — is publicly served
> at the production origin. Write nothing into this document that cannot be
> public, and treat P0-4 as the fix.

---

## Executive Summary

**Implementation philosophy.** Ten audits reached ten NO verdicts, but their
findings converge on a small set of root causes: an unverified production
deployment, valuable work stranded unreleased, zero observability, and a
documentation layer that outran execution. The philosophy of this plan is
therefore **stabilize → tell the truth → measure → harden → grow**: repair the
production foundation first, release the already-approved canonical-services
work, instrument the site so future claims are verifiable, remediate the
measured accessibility/performance/security defects, and only then build the
seven service pages and brand refinements on a foundation that is monitored,
truthful, and deliverable.

**Project goals** (unchanged, per PROJECT.md §3): rank for genuine local
intent, generate calls / WhatsApp conversations / form leads, convert through
clarity and trust, scale one honest page at a time, remain framework-free and
maintainable.

**Current maturity** (audit consensus): platform architecture excellent
(static, no-build, config-as-code); governance documentation exceptional;
execution materially behind — live site advertises retired services, the form
lead channel is (almost certainly) broken in production, no monitoring or
analytics events exist, several measured WCAG failures, no privacy apparatus,
internal docs publicly served, work stranded on an unpushed branch.
Overall operational maturity ≈ 48/100; product quality ≈ 60/100.

**Desired end state** (12-month horizon): the live site truthfully presents
exactly the canonical seven services with valid schema; all three conversion
channels work and are synthetically monitored; GA4 lead events attribute
per service; WCAG 2.2 AA verifiably passes; Core Web Vitals measured in the
field and passing; CSP tightened with `unsafe-inline` removed; privacy policy
published and accurate; seven service pages live on the certified template
with the full internal-link lattice, sitemap, and Search Console coverage;
evidence-backed trust content; brand assets (logo color, tagline, photography)
aligned with the documented identity; and a one-page operations runbook,
account inventory, and quarterly verification cadence keeping it all true.

---

## Guiding Principles

Binding on every phase and every implementation session:

1. **PROJECT.md is the constitution; SERVICE_PAGE_SPEC.md v1.2 is frozen.**
   No architectural change without formal amendment. No frameworks, ever.
2. **Rule of Truth outranks everything** — only the canonical seven services,
   named consistently, in copy, schema, navigation, and forms.
3. **No redesign without §19 approval.** Any change that alters rendered
   appearance (including token value changes such as contrast fixes) requires
   explicit approval before it ships. Value-neutral refactoring does not.
4. **One phase at a time; no overlapping implementations.** A phase begins
   only when its dependencies' exit criteria are met. Parallel work is allowed
   only where this plan explicitly marks a stream as parallel-safe.
5. **Branch → review → merge → deploy → verify.** No direct commits to `main`.
   Every branch is pushed to the remote the same day it is created. Reviews
   have a 72-hour SLA; a stalled review is escalated, not waited out.
6. **Every phase ends with verification on the live production site**, not
   the local tree. "Declared" is not "delivered" — headers, schema, forms,
   and analytics are checked where users experience them.
7. **Regression testing is mandatory** per the standing Definition of Done
   (PROJECT.md §18): desktop, mobile, existing anchors/URLs, form, reviews.
8. **No unnecessary refactoring.** Touch only files in the phase's scope.
   Batch opportunistic cleanups only where the phase explicitly includes them.
9. **Fix the pipeline before shipping through it.** Cache-busting (P0-3) must
   land in or before the first deploy that changes CSS/JS, or fixes will not
   reliably reach returning visitors.
10. **Business decisions gate content, not structure.** Structural work may
    proceed while D4/D5/new decisions are open; gated copy ships only after
    the decision is recorded in BACKLOG.md.
11. **Never invent numbers, reviews, or claims.** Evidence Block items require
    a ledger entry (claim · source · verified-on) before shipping.
12. **Update the paper trail with every phase**: BACKLOG status ledger,
    CHANGELOG entry per shipped change, sitemap `lastmod` on content change,
    and this plan's phase-status table.

---

## Overall Roadmap

| Phase | Name | Objective | Business value | Priority | Complexity | Depends on | Expected outcome |
|---|---|---|---|---|---|---|---|
| **P0** | Production Stabilization | End the live incident; make the pipeline safe and observable | Stops silent lead loss; protects all future work | 🔴 Emergency | S–M | — | Working, monitored form; branch backed up; docs no longer public; deploys deliverable |
| **P1** | Truth Release | Canonical seven everywhere: page, head, schema, form | Ends Rule-of-Truth violation on the live site; fixes lead qualification | 🔴 Critical | M | P0 | Live site matches D1/D2 decisions end-to-end |
| **P2** | Trust, Privacy & Local Presence | Privacy policy, honest data claims, proof layer, GBP/citations, hero image mitigation | Legal exposure closed; first real evidence; local pack eligibility | 🔴 Critical | M | P0 (P1 for copy consistency) | Compliant data handling; verifiable trust signals; entity corroborated |
| **P3** | Measurement | GA4 event taxonomy + call/WhatsApp/form events + field CWV | The business can finally see which services drive leads | 🟠 High | S–M | P0 | Per-service lead attribution live in GA4; DoD "analytics verified" becomes executable |
| **P4** | Accessibility & Conversion Remediation | Fix the five measured WCAG failures + top conversion friction | AA claimable; fewer lost anxious users | 🟠 High | S–M | P0 (P3 for CTA event checks) | Measured contrast/focus/anchor defects gone; form friction reduced |
| **P5** | Performance Hardening | Icon subset, image right-sizing, hero formats, load-order fixes | Faster on the slow-4G devices the audience uses; CWV margin restored | 🟡 Medium | M | P0 | ~300 KB removed from cold load; LCP margin comfortable |
| **P6** | Security Hardening | CSP tightening, SRI/form-action, 404 fixes, headers verified live | Closes remaining hardening gaps before page count multiplies | 🟡 Medium | M | P3 (analytics final), P5 (icon origin decision) | `unsafe-inline` removed; policy verified on every page class |
| **P7** | Patient Care Page & Template Certification | First service page per frozen spec; template certified | First service-intent landing page; unlocks the remaining six | 🟠 High | L | P1–P4; SP-T1; D1 (✅) | `/services/patient-care` live, valid schema, DoD passed, template certified |
| **P8** | Remaining Service Pages & SEO Wiring | Six pages + hub + internal links + sitemap + homepage title demotion | Full commercial-intent coverage; topical cluster complete | 🟠 High | XL (6×L) | P7; D4, D5 | All seven pages live, interlinked, indexed, attributed |
| **P9** | Brand & Design System Completion | Logo/tagline/photography alignment; DS-3B…E, DS-4; typography scale | Identity finally matches the documented brand; single token vocabulary | 🟡 Medium | L | P1; §19 approvals; photography consent | Coherent brand; design system fully adopted |
| **P10** | Operational Maturity (continuous) | Runbook cadence, quarterly verification, business systems | Long-term survivability; compounding trust assets | 🟢 Ongoing | S recurring | P0 seed items | Calendar-driven verification; continuity documented; review flywheel running |

Complexity: S ≤ half session · M = one session · L = multiple sessions · XL = multi-week.

---

## Phase Details

### PHASE P0 — Production Stabilization (Emergency)

**Purpose.** End the active production incident (broken form), remove the
active information exposure (public internal docs), back up stranded work,
and make the deploy pipeline able to deliver and detect. Nothing else ships
until P0 is done.

**Scope (each item once, with source-audit consolidation):**

- **P0-1 · Push the feature branch** (`ds-3a-service-card`) to the remote
  immediately; commit or explicitly stash-and-record the DS-3A working diff.
  *(Production Readiness, Engineering, Security — single-disk loss risk.)*
- **P0-2 · Verify and fix the inquiry form**: live test submission; replace
  the placeholder Web3Forms key with a working key (these keys are
  client-public by design — committing the real key is acceptable and ends
  the "environment" fiction); **rotate** the historically leaked key
  (commits `f84fa54`/`77901b0`). Record the incident and a short postmortem
  in CHANGELOG/BACKLOG. *(All audits; incident.)*
- **P0-3 · Cache-busting**: introduce version query strings (e.g.
  `style.css?v=YYYYMMDD`) or renamed-on-change assets for `/assets/*`;
  alternatively drop `immutable` until versioning exists. Must land **in or
  before** the next CSS/JS-touching deploy. *(Engineering, Performance.)*
- **P0-4 · Restrict the publish directory**: deploy only site files; exclude
  `*.md` documentation (PROJECT, BACKLOG, CHANGELOG, SERVICE_PAGE_SPEC,
  README, this plan) and the unused source images. *(Security — confirmed
  live exposure of `/PROJECT.md`.)*
- **P0-5 · Minimum monitoring**: one external uptime check on `/`; one
  scheduled (weekly) scripted test submission of the form with alerting on
  failure; alert delivery to the owner's phone/email. *(Production
  Readiness — 18-day silent failure.)*
- **P0-6 · Git hygiene**: add `.gitattributes` (LF normalization) and land
  the pending CRLF-only doc changes as one clearly-labeled normalization
  commit; note the stale `.git/index.lock` (audit-session artifact) for
  deletion if git complains.
- **P0-7 · Runbook + account inventory** (one page, kept **outside** the
  deployed tree per P0-4): accounts (registrar + domain expiry/auto-renew,
  Netlify, Web3Forms, GA4, Search Console, reviews Apps Script owner, Gmail),
  deploy/rollback steps (Netlify one-click), and who to call. Grant escrowed
  access to one trusted second person. *(Production Readiness, Business.)*
- **P0-8 · Verify deploy mapping**: confirm which branch auto-deploys, and
  confirm live response headers once (all routes: `/`, an `.html` path, an
  asset, a doc path post-P0-4). *(Security, Engineering — NEEDS VERIFICATION
  items.)*

**Files likely to change:** `netlify.toml`, `index.html` (asset refs, form
key), `404.html` (asset refs), `.gitattributes` (new), ops runbook (new,
undeployed), BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** `assets/css/style.css` visual values,
homepage content/copy, `SERVICE_PAGE_SPEC.md`, PROJECT.md (except a §15
correction note if the key-handling policy is amended).

**Implementation checklist:** branch pushed → form tested/fixed/rotated →
cache-busting live → publish dir restricted → uptime + synthetic form checks
alerting → `.gitattributes` landed → runbook written + access escrowed →
deploy mapping and live headers verified → BACKLOG/CHANGELOG updated.

**Acceptance criteria:** a real test lead arrives end-to-end; `/PROJECT.md`
returns 404 on production; a deliberately broken form (staging test) triggers
an alert; a CSS change deployed to a preview is visible on hard-refresh *and*
normal revisit; `origin/ds-3a-service-card` exists.

**Regression checklist:** homepage renders identically (P0 is visually
neutral); all anchors work; call/WhatsApp links unchanged; 404 page still
serves; robots/sitemap unaffected.

**Completion / exit criteria:** all acceptance criteria verified **on
production**; incident postmortem recorded; no P0 item deferred. P1 may then
begin.

---

### PHASE P1 — Truth Release (Canonical Seven Everywhere)

**Purpose.** Make the live site truthful to business decisions D1/D2/D3 in
every surface — visible copy, metadata, schema, and the form — completing
Epic 1 and the related Epic 2/5 metadata tasks as one coherent release.

**Scope:** review + merge the `ds-3a-service-card` homepage reconciliation
(completes E1-T3/E1-T4 sign-off; DS-3A CSS may ship with it only if its §19
visual sign-off is granted — otherwise split it out); **E1-T5** form
`<select>` reduced to the canonical seven + "Other Requirement", with 1:1
`data-service` renames; **E1-T6** legacy-name sweep (hero service tags,
footer service list, prefooter copy, About wording); **E2-T5/E5-T1** title ≤
60 chars + meta description ≤ 160 chars on hub-role messaging (broad local
intent — deliberately *not* per-service keywords), OG/Twitter aligned;
**E5-T2** JSON-LD `makesOffer` rewritten to exactly the canonical seven,
`priceRange` removed (or spec §3.3 formally amended — decide, don't drift),
`areaServed` + Landmark City; **A-1** rewrite the two clinical FAQ answers
(visible + FAQPage schema, kept 1:1) to D1-honest scope — no ICU claims, no
unqualified "injections/dressings" nursing claims; **E1-T8 habit** sitemap
`lastmod` refreshed with this deploy; **E1-T7** dead `.about-placeholder*`
CSS + JS selector removed (batched cleanup); footer heading levels demoted
per the E2-T5 outline note.

**Files likely to change:** `index.html` (head, hero tags, form, footer,
JSON-LD, FAQ), `assets/js/main.js` (E1-T7 selector only), `assets/css/style.css`
(E1-T7 removal; DS-3A only if approved), `sitemap.xml`, BACKLOG.md,
CHANGELOG.md.
**Files that must NOT change:** `netlify.toml` (except nothing —
P0 finished it), `404.html`, `SERVICE_PAGE_SPEC.md`, images.

**Implementation checklist:** branch review → merge → E1-T5 sweep with every
`data-service` verified against an existing `<option>` → E1-T6 sweep (grep
for every legacy term: Home Nursing, ICU, Attendant, Caretaker, Domestic
Helper, Mother Care, Baby Care, House Maids, Housekeeping Workers) → head
metadata rewrite → schema rewrite → FAQ rewrite mirrored in schema → sitemap
→ deploy → live verification.

**Acceptance criteria:** zero non-canonical service names anywhere in the
served homepage (view-source grep on production); every card pre-selects the
correct form option; form submits successfully with each of the 8 options;
Rich Results Test passes with exactly seven `makesOffer` services; title and
description render un-truncated in SERP preview tools.

**Regression checklist:** all 8 nav anchors resolve; WhatsApp links open with
correct pre-filled text per card; reviews section renders; mobile menu,
sticky call, floating WhatsApp unaffected; 404 unaffected.

**Completion / exit criteria:** production grep clean; schema valid; DoD
pass recorded; BACKLOG marks E1 complete; CHANGELOG entry. Gates P7.

---

### PHASE P2 — Trust, Privacy & Local Presence

**Purpose.** Close the legal/privacy exposure, replace assertion with
evidence, mitigate the hero-image authenticity risk, and give the business
entity an existence beyond its own website.

**Scope:**

- **A-2 · Privacy policy page** (new, e.g. `/privacy`): honest description of
  the actual data flow (Web3Forms processing, email delivery, GA4 analytics),
  retention statement, contact for requests; linked from footer + form.
  Correct the "Your information stays with us" microcopy to a truthful line.
  *(Security, SEO/E-E-A-T. Legal review recommended — DPDP context; not
  legal advice.)*
- **A-3 · Domain email**: migrate public contact + schema email from Gmail to
  a domain mailbox; update `index.html`, schema, and the runbook. *(Brand,
  Security. Requires mail hosting decision — business.)*
- **A-4 · Hero image mitigation (interim)**: replace or de-brand the current
  AI-appearance hero so no garbled synthetic branding is visible — per the
  spec's own §8 rule ("honest generic or nothing; never fake"). Full
  photography program is P9. §19 approval required. *(UX, Brand.)*
- **A-5 · Evidence Block v1 on the homepage**: 3 business-verified facts with
  the evidence ledger started (claim · source · verified-on) per spec §3.4.
  Gated on business verification of each fact.
- **A-6 · New business decision — D6 Replacement/dissatisfaction policy**:
  record the real practice; publish one honest sentence in trust section +
  FAQ. *(CRO #1 unanswered objection; Business. Owner decision required.)*
- **A-7 · FAQ additions** (business-confirmed): caregiver gender preference;
  payment timing/advance; "what our caregivers do and don't do" boundary
  item. Mirrored 1:1 in FAQPage schema. *(CRO, SEO candor layer.)*
- **A-8 · Google Business Profile**: create/claim, exact-NAP, link via
  `sameAs` in schema; add Search Console + Bing verification tokens (stubs
  already in head); submit sitemap. *(SEO — E5 adjacent, E10-T8 precursor.)*
- **A-9 · Citations seed**: Justdial, Sulekha, IndiaMART listings with exact
  NAP. *(SEO/Business — business-owner task, tracked here for sequencing.)*
- **E5-T4 · Organization + WebSite schema** nodes (fits naturally with A-8).

**Files likely to change:** `index.html` (footer link, microcopy, schema,
FAQ, verification metas), new `/privacy` page, evidence ledger (undeployed
ops doc), BACKLOG.md, CHANGELOG.md, `sitemap.xml` (privacy page entry).
**Files that must NOT change:** form logic in `main.js`; netlify.toml
(headers already verified in P0); frozen spec.

**Acceptance / exit criteria:** privacy page live and linked; no untrue
privacy claim remains; GBP verified and linked; Search Console receiving
data; 3 ledger-backed facts visible; D6 recorded in BACKLOG; hero shows no
synthetic branding artifacts. Regression: FAQ schema still mirrors visible
FAQ 1:1; anchors intact.

---

### PHASE P3 — Measurement

**Purpose.** Give the business eyes: per-service lead attribution and field
performance data. Makes the Definition of Done's "analytics verified" and
the spec §10 CWV targets executable for every later phase.

**Scope:** **E6-T1** event taxonomy documented (call_click, whatsapp_click,
form_submit_success + `service`/`placement` params — one page, written
before code); **E6-T2** call-click events on every `tel:` surface; **E6-T3**
WhatsApp-click events on every entry point; **E6-T4** form-success event with
service tag (fires only on success; no interference with cooldown);
**A-10** lightweight field CWV reporting (e.g. `web-vitals` snippet, ~2 KB,
reporting into GA4) — respects CSP; **A-11** GA4 DebugView verification
session recorded (fulfils E10-T7 for the homepage).

**Files likely to change:** `assets/js/main.js`, `index.html` (data
attributes only if needed), taxonomy doc (ops), BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** form validation logic beyond the success
hook; CSP (events must work within the existing policy — if not, defer the
conflicting piece to P6 rather than loosening CSP here).

**Acceptance / exit criteria:** every conversion surface fires exactly one
correctly-parameterized event, verified in DebugView; events visible in GA4
reports within 48h; CWV data arriving; no duplicate or lost submissions;
cooldown behavior unchanged. Regression: form still submits; no console
errors; CSP violation count on production = 0.

---

### PHASE P4 — Accessibility & Conversion Remediation

**Purpose.** Clear every *measured* WCAG 2.2 AA failure and the top
conversion-friction items — before the template is certified (spec §12
requires pre-certification a11y verification, so P4 gates P7).

**Scope — accessibility (all measured in the a11y audit):** **A-12** input
border token darkened to ≥3:1; **A-13** WhatsApp button green/text treatment
to ≥4.5:1 (§19 — visible change); **A-14** error-message red on its field to
≥4.5:1; **A-15** footer focus-ring variant visible on `--surface-inverse`;
**A-16** `scroll-margin-top` (~90px) on anchor targets (fixes WCAG 2.4.11
*and* the universal nav-landing bug); **A-17** placeholder contrast lift;
**A-18** menu focus returns to toggle on Escape; **A-19** unique accessible
names for the seven "Get a Callback" links (service-inclusive, per spec §9
convention); **A-20** `rem`-respecting base font sizing (browser preference
support — coordinate with DS-2C if approved, else minimal change).
**Scope — conversion (CRO audit):** **E2-T4** urgency select optional
(validation updated); **E2-T2** post-trust CTA band (reuses existing button
components; events from P3); **E2-T3** nav trimmed to real destinations
(sections remain, anchors keep working); **A-21** FAQ phone number becomes a
`tel:` link + tel/wa links inside relevant FAQ answers; **A-22** success
message sets an honest callback expectation and cooldown copy reworded
("Request received — we'll call you soon"); **A-23** `target="_blank"`
new-window indication on WhatsApp links.

**Files likely to change:** `assets/css/style.css` (tokens, focus, scroll
margin), `index.html` (nav, CTA band, FAQ links, aria-labels, form required
attrs), `assets/js/main.js` (validation, focus return, cooldown copy),
BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** layout/grid structure; section order;
service-card markup (frozen until P7 template work); schema.

**Acceptance / exit criteria:** all five measured contrast/focus failures
re-measured ≥ threshold; anchor navigation lands headings fully visible under
the sticky header on mobile and desktop; form submits with urgency blank and
still blocks on the true required set; new CTA fires P3 events; screen-reader
links list shows seven distinct callback names. §19 approvals recorded for
every visible delta. Regression: full keyboard traversal, mobile menu,
sticky/floating elements, reveal animations, reduced-motion behavior.

---

### PHASE P5 — Performance Hardening

**Purpose.** Remove the ~300 KB of third-party and image waste identified by
measurement, restoring LCP margin on slow-4G devices before seven more pages
inherit the payload.

**Scope:** **E7-T3** Font Awesome subset or self-hosted subset / inline-SVG
swap for the ~20 used glyphs (verify FAQ chevron + brand icons; CSP origin
update in coordination with P6); **E7-T1** hero `srcset` + AVIF/WebP with
JPEG fallback, `decoding="sync"` removed — establishes the pattern service
pages reuse; **A-24** logo right-sized (~5–10 KB header variant; correct OG
image sizing while there); **E7-T4** reviews load moved to `DOMContentLoaded`
+ reserved grid min-height (also closes the CLS edge and the empty-shelf
trust gap); **A-25** delete `images/caregiver.png` and `images/logo.png`
(8.4 MB unreferenced) from the deployed tree; **A-26** `preconnect` for
googletagmanager; **E7-T5** JS cleanup pass (dead selectors — mostly done in
P1's E1-T7; confirm). Byte budget adopted (below) and added to review
checklist.

**Files likely to change:** `index.html`, `404.html` (icon strategy),
`assets/css/style.css` (icon classes if self-hosted), image assets,
`netlify.toml` (CSP only if icon origin changes — coordinate with P6),
BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** visual appearance (all P5 work is
behavior/weight-neutral by definition — any visible icon difference needs
§19 sign-off).

**Acceptance / exit criteria:** cold-load transfer reduced ≥ 250 KB
(measured); all icons render identically; hero serves ≤ 100 KB to mobile;
field CWV (P3 instrumentation) shows LCP stable-or-better after 2 weeks; no
CLS regression. **Byte budget (standing):** first-party CSS ≤ 40 KB raw,
first-party JS ≤ 20 KB raw, icon payload ≤ 30 KB, LCP image ≤ 100 KB, other
images ≤ 50 KB, cold transfer ≤ 400 KB excl. analytics, ≤ 12 requests,
≤ 2 third-party origins.

---

### PHASE P6 — Security Hardening

**Purpose.** Tighten the policy layer now that analytics (P3) and the icon
origin (P5) are final — the two dependencies that previously justified
`unsafe-inline` and the CDN origin.

**Scope:** **E9-T1** externalize the GA4 init snippet, footer copyright IIFE,
hero `onerror`, and FA preload `onload` handler; remove `script-src
'unsafe-inline'`; **A-27** add `form-action` (self + web3forms) and
`frame-ancestors 'none'` to CSP; narrow `connect-src` to the specific Apps
Script path; reconsider `img-src https:` wildcard; **A-28** SRI on any
remaining CDN stylesheet (moot if P5 self-hosted); **A-29** 404.html fixes:
root-relative asset paths + inline `<style>` moved into `style.css`;
**E9-T2** live header verification on every route class incl. future
`/services/*`; **E9-T3** dependency/origin review against actual usage;
**E9-T4** secrets review closed (history leak acknowledged, key rotation from
P0-2 recorded); HSTS `preload` token considered.

**Files likely to change:** `netlify.toml`, `index.html`, `404.html`,
`assets/js/main.js` (externalized snippets), `assets/css/style.css` (404
styles), BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** form submission flow; analytics events
(must keep firing under the tightened policy — this is the phase's central
risk).

**Acceptance / exit criteria:** staged on a preview deploy first (per
E9-T1's own note); zero CSP violations in console across all pages; GA4
events still verified in DebugView post-tightening; 404 renders styled at a
nested path; headers confirmed live on all route classes. **Rollback plan
mandatory before deploy** (previous netlify.toml retained; Netlify one-click
rollback rehearsed).

---

### PHASE P7 — Patient Care Page & Template Certification

**Purpose.** Build `/services/patient-care` against SERVICE_PAGE_SPEC v1.2,
certifying the reusable template that the remaining six pages fill (Epic 3 +
the spec-introduced SP tasks).

**Pre-conditions (hard gates):** P1 (canonical baseline), P3 (E6-T1 taxonomy
— spec gate 5), P4 (pre-certification a11y verification — spec §12),
**SP-T1** URL file & trailing-slash strategy decided and configured (exactly
one form 200s, variants 301), **SP-T2** `?service=` form pre-select reader
(additive `main.js`), D1 (✅ resolved).

**Scope:** E3-T1 template shell (slot order per frozen spec §2) → E3-T2
breadcrumb → E3-T3 hero (Call + service-prefilled WhatsApp above fold) →
E3-T4 scope w/ clinical boundary → E3-T5 who-it's-for + **SP-T4** Decision
Aid (Patient↔Elder pair — shippable now) → E3-T6 journey → **SP-T3** pricing
factors block → E3-T7 trust + **SP-T6** Evidence Block (ledger-backed) →
mid CTA → E3-T8 FAQ → E3-T9 areas + related (interim links to homepage
anchors, recorded for E5-T3) → E3-T10 schema (BreadcrumbList + Service→`@id`
+ FAQPage 1:1) → E3-T11 CTAs wired w/ P3 events → **SP-T5** emergency band
built OFF (D5 ledger established, all-OFF) → **SP-T7** imagery per §8 (reuse
honest hero pattern; ratio fixed at certification) → E3-T12 full DoD pass =
**template certification**. E5-T6/E5-T7 canonical + OG for this page. Sitemap
entry (E5-T9). **SP-T8** freshness governance starts with this page.

**Files likely to change:** new `/services/` page file(s), `main.js`
(SP-T2), `netlify.toml` (SP-T1 redirects), `sitemap.xml`, `style.css` (only
strictly-needed additive token-consuming classes per spec §3.0), homepage
(one interim link update), BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** homepage structure/sections; global
header/footer markup (reused byte-identical — any change is an all-pages
change by definition); frozen spec (structural change requires §14 process).

**Acceptance / exit criteria:** every spec slot present in order; single H1;
schema valid in Rich Results; WhatsApp/CTAs carry patient-care context and
fire attributed events; page passes the full DoD incl. Lighthouse baseline
(spec §10 targets); breadcrumb/canonical/URL agree with SP-T1; certification
diff snapshot recorded as the canonical template reference for P8.
Regression: homepage untouched except the one link; all P0 monitoring green.

---

### PHASE P8 — Remaining Service Pages & SEO Wiring

**Purpose.** Fill the certified template six times and complete the site's
information architecture, internal-link lattice, and index coverage.

**Pre-conditions:** P7 certification; **D4 resolved** (gates Maid / Cook /
Housekeeping copy, decision aids, meta); **D5 resolved per-service** (gates
any availability claims / emergency-band activation). *Escalate D4/D5 to the
business at P7 start — they are the critical path.*

**Scope (order per BACKLOG):** E4-T1 Elder Care and E4-T2 Home Cook
(Critical — highest unserved demand) → E4-T3 Child Care → E4-T4 Mother &
Newborn → E4-T5 Maid → E4-T6 Housekeeping (each = template fill + schema +
per-page canonical/OG [E5-T6/T7] + FAQ + Decision Aid pair + related links +
DoD, one session per page; "diff against certified template" is a mandatory
review item — spec risk #2) → **E5-T3** homepage cards + footer service list
re-pointed to real URLs incrementally as each page ships (never linking to an
unshipped page) → E4-T7 `/services/` hub → **A-30** homepage title/meta
demotion to hub role in the same wave the pages claim their keywords
(prevents self-cannibalization) → E5-T5/E5-T8 schema audits → E5-T9 sitemap
per page → E6-T5 per-page event attribution → E10-T8 Search Console
submission/coverage monitoring → footer "Services" links finally real
(closing the seven-labels-one-anchor defect).

**Files likely to change:** six new page files + hub, `index.html` (links,
head), `sitemap.xml`, BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** the certified template structure (copy-level
variation only); global chrome (any change = all-pages task).

**Acceptance / exit criteria:** seven pages + hub live, each schema-valid,
DoD-passed, interlinked per spec §4.5; no dead or premature links at any
point during rollout (incremental discipline); Search Console shows all URLs
discovered with zero coverage errors; per-service events visible in GA4;
homepage no longer competes for service keywords. Phase may pause safely
between pages (each is independently deployable).

---

### PHASE P9 — Brand & Design System Completion

**Purpose.** Close the gap between the documented identity ("Conservative
Premium Healthcare"; calm, premium, trustworthy) and the shipped assets, and
finish the token migration so one visual vocabulary governs all eight pages.

**Scope — brand (each item §19-gated, business approval required):**
**A-31** logo recolored/redrawn into the teal system with accurate (or no)
tagline — the highest-leverage identity fix; **A-32** adopt one tagline
("We'll listen first." recommended by three audits) across hero region,
meta, and footer sign-off; **A-33** CTA voice unified ("Talk to our team"
family); **A-34** real photography program per spec §8 (real staff, real
homes, written consent, no AI/stock) replacing the interim hero and seeding
service-page imagery; **A-35** one human anchor (founder/team note) on the
homepage; **A-36** footer redesigned to 3–4 breathing columns; **A-37**
Inquiry + Contact sections consolidated (one door, nav updated, anchors
preserved via redirects/aliases per backwards-compatibility rule).
**Scope — design system:** **DS-2C** typography scale approval + adoption
(coordinate with A-20's rem work; reduce weight usage page-wide); **DS-3B**
buttons/CTA migration; **DS-3C** trust/process/testimonial cards + retirement
of `--blue`/`--section-blue` (visible accent change — §19); **DS-3D** form
migration; **DS-3E** header/footer migration (feeds A-36); **DS-4** legacy
compatibility-token retirement (single token vocabulary).

**Files likely to change:** `assets/css/style.css` (extensively, token
layer), `index.html` + all service pages (imagery, tagline, footer),
`images/*` (photography), logo assets, BACKLOG.md, CHANGELOG.md.
**Files that must NOT change:** page structure, schema, URLs, conversion
wiring, netlify.toml.

**Acceptance / exit criteria:** every visible delta carries a recorded §19
approval; zero hardcoded visual values remain outside the token scales
(DS-4 audit); one accent family site-wide; photography consent ledger
complete for every identifiable person; before/after screenshots archived;
field CWV unregressed. Regression: full DoD on every page (global chrome
changed = all-pages verification).

---

### PHASE P10 — Operational Maturity (Continuous)

**Purpose.** Convert the audit series' one-off verification into permanent,
calendar-driven practice, and stand up the business-side systems the website
depends on. Runs from P0 onward; never "completes."

**Scope — recurring engineering cadence (quarterly):** live header + CSP
check on every route class; contrast spot-check of any changed tokens;
Lighthouse + field-CWV review against spec §10; schema validation; sitemap
`lastmod` audit; secrets/history scan; dependency pin review; restore-drill
(Netlify rollback rehearsal).
**Scope — content cadence:** spec §7 freshness reviews (6-month + event
triggers) per live page; evidence + D5 ledgers re-verified.
**Scope — business systems (business-owned, tracked for sequencing):**
**A-38** lead log / lightweight system of record with five KPIs (leads by
source/service, placement rate, engagement length, caregiver retention,
review count); **A-39** review-request flywheel (every completed engagement,
with consent) feeding GBP and the Phase-5 testimonial slot; **A-40**
caregiver recruitment surface (`/careers` per spec §11 — outside the service
template; JobPosting schema) and a written caregiver value proposition;
**A-41** institutional referral kit (hospital discharge desks, physicians —
the D1 honest-scope story as the pitch); **A-42** Hindi inclusion roadmap
item (interim reassurance line if truthful; parallel Hindi pages as a future
scope decision); **A-43** replacement/incident/complaint operational SOPs
matching the published D6 policy.

**Exit criteria:** none — success is the cadence running. Reviewed dates
logged in CHANGELOG; missed cycles are treated as incidents, not slippage.

---

## Cross-Phase Dependencies

**Hard ordering (must finish first):**
- P0 gates *everything* (P0-3 cache-busting specifically gates any CSS/JS
  deploy; P0-4 gates adding any new internal doc — including edits to this
  plan — safely).
- P1 gates P2 copy consistency, P7 (canonical baseline), A-30.
- P3 gates P4's CTA event checks, P6 (CSP must be tightened against final
  analytics), P7 (spec gate 5), and all DoD "analytics verified" claims.
- P4 gates P7 (spec §12 pre-certification verification).
- P5's icon-origin decision gates P6's final CSP allowlist.
- SP-T1 + SP-T2 gate P7; P7 certification gates P8; D4/D5 gate specific P8
  pages (Elder Care, Child Care, Mother & Newborn are D4-independent and may
  proceed while Home Support pages wait).

**Parallel-safe streams:** P2 (privacy/GBP/citations) alongside P3–P5;
P10 business items (A-38…A-43) anytime after P0; DS value-neutral
tokenization may interleave anywhere (per BACKLOG DS rules); documentation
updates always.

**Must never overlap:** P6 (CSP change) with any other deploy — it ships
alone, staged on preview, with rehearsed rollback. P9 global-chrome changes
(DS-3E/A-36) with P8 page rollout — chrome changes are all-pages tasks and
must land between page shipments, not during. Two phases must never have
open working branches touching `index.html` simultaneously.

---

## Risk Register

| # | Risk | Type | Likelihood | Impact | Mitigation |
|---|---|---|---|---|---|
| R1 | Cache-pinned users receive stale CSS/JS after fixes ship | Deployment | High (until P0-3) | High | P0-3 first; verify with a marker comment fetch post-deploy |
| R2 | CSP tightening (P6) breaks analytics or scripts site-wide | Regression | Medium | High | Preview-deploy staging; DebugView re-verification; rehearsed one-click rollback; ships alone |
| R3 | D4/D5 stall blocks 3 of 7 pages indefinitely | Schedule | High | High | Escalate at P7 start; reorder P8 to D4-independent pages; time-box decisions |
| R4 | Template drift across seven hand-copied pages | Regression | Medium | Medium | Certification snapshot + mandatory diff-review per page (spec risk #2) |
| R5 | Form/lead-path regression during E1-T5, E2-T4, SP-T2, or P6 | Regression | Medium | Critical | Synthetic form test (P0-5) runs after every deploy touching the form path |
| R6 | §19 approval bottleneck stalls visible fixes (contrast, hero, logo) | Process | Medium | Medium | Batch approval requests per phase with before/after evidence; 72h review SLA |
| R7 | Single maintainer unavailable mid-phase | Continuity | Low | Critical | P0-7 runbook + escrowed access; every branch pushed daily; phases independently deployable |
| R8 | Evidence Block / testimonial claims fail verification later | Trust | Low | High | Ledger discipline (§3.4); freshness cycle removes unverifiable items |
| R9 | Homepage/service-page keyword cannibalization during P8 rollout | SEO | Medium | Medium | A-30 title demotion shipped in the same wave; Search Console monitoring |
| R10 | Rollback of a mixed-concern deploy reverts unrelated good changes | Rollback | Medium | Medium | One concern per branch/deploy (Guiding Principle 4); small releases |
| R11 | New docs (incl. this plan) publicly exposed if P0-4 regresses | Security | Low | Medium | Post-deploy check of a doc URL added to the quarterly cadence |
| R12 | Icon subset (E7-T3) drops a glyph in production | Regression | Medium | Low | Glyph inventory checklist incl. FAQ chevron + brand icons; visual diff pass |

---

## Verification Strategy

Every phase closes with the same five-layer verification, executed **against
production** (or a preview deploy for R2-class changes), and recorded in
BACKLOG/CHANGELOG:

1. **Functional** — the phase's acceptance criteria, item by item; the
   synthetic form test passes; all three contact channels exercised.
2. **Regression** — standing DoD: desktop + mobile, every existing anchor and
   URL, form, reviews, menu, stickies, 404; zero console errors; zero CSP
   violations.
3. **Measured** — the relevant instruments for the phase: contrast ratios
   re-computed (P4/P9), transfer sizes re-measured (P5), Rich Results /
   schema validation (P1/P7/P8), GA4 DebugView (P3 onward), Lighthouse +
   field CWV against spec §10 (P5 onward), live headers (P0/P6).
4. **Truth** — grep the served HTML for non-canonical service names (P1
   onward, every phase); schema mirrors visible content 1:1; every published
   figure has a ledger entry.
5. **Paper** — BACKLOG statuses updated, CHANGELOG line added, sitemap
   `lastmod` refreshed on content change, this plan's status table updated,
   §19/D-decision records filed where applicable.

A phase without all five layers recorded is not complete, regardless of what
shipped.

---

## Change Management

- This document is a **living roadmap** under the same discipline as
  BACKLOG.md: statuses update as phases progress; history is preserved, not
  rewritten.
- **Scope changes** (adding/removing/reordering phases, changing gates)
  require the same review-and-approval path as a BACKLOG restructure, with a
  dated note in this file. **Status updates** (marking items done, recording
  decisions) follow the normal living-document rule.
- This plan must never contradict PROJECT.md or the frozen spec; if a
  conflict is discovered, the constitution wins and this file is corrected
  with a dated correction note.
- New audit findings or incidents enter as new `A-` items in the appropriate
  phase (or a new phase), never as untracked side work.
- Task-level detail continues to live in BACKLOG.md; this plan sequences, it
  does not duplicate. When a phase completes, its BACKLOG tasks are the
  authoritative record of what shipped.
- Keep this file's public-exposure status in mind (see header note) until
  P0-4 ships; afterwards it remains in the repo but outside the publish
  directory.

---

## Future Claude/Fable Workflow

Every future implementation prompt follows this four-step loop. **Never skip
a step. One phase — usually one task — per session.**

**1 · Planning (before any edit):**
Read PROJECT.md constraints for the affected area → read this plan's phase
section → read the relevant BACKLOG task(s) and SERVICE_PAGE_SPEC section →
confirm the phase's dependencies/gates are met and no business decision is
pending → state the scope (files to change, files not to change) and the
§19/D-gate status → create the feature branch (named for the task ID) and
**push it immediately**.

**2 · Implementation:**
Smallest change that satisfies the acceptance criteria → canonical seven
names only → tokens only (no new hardcoded visual values) → no unrelated
edits → commit in scoped, conventional messages referencing task IDs → push
daily → if a constraint conflict or missing business truth is discovered,
**stop and surface it** rather than assuming (PROJECT.md §21).

**3 · Verification:**
Run the five-layer Verification Strategy above → record results explicitly
(what was checked, on which surface, with what outcome) → for visible
changes, present before/after evidence for §19 approval → for lead-path
changes, run the synthetic form test → do not self-certify a DoD item that
was not actually executed.

**4 · Release:**
Review (72h SLA) → merge → deploy → **verify on production** (truth grep,
form test, monitoring green, cache-bust confirmed) → update BACKLOG status,
CHANGELOG line, sitemap `lastmod` if content changed, and this plan's phase
status → close the branch. If verification fails: Netlify one-click rollback
first, diagnose second, redeploy third — and record the incident.

> **Standing instruction to every future implementation session:** if a
> request conflicts with this plan's sequencing, the frozen spec, or the
> constitution, the correct response is to surface the conflict and propose
> the compliant path — not to comply silently. That rule has protected this
> project before; keep it.

---

*End of IMPLEMENTATION_MASTER_PLAN.md — v1.0, 2026-07-19.*
