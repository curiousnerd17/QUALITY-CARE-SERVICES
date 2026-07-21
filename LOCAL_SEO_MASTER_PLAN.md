# LOCAL_SEO_MASTER_PLAN.v2.md

**Quality Care Services — Local SEO Master Plan**
**Version:** 2.0 · **Date:** 2026-07-21 · **Supersedes:** v1.0 (2026-07-20, lost)
**Status:** Canonical. Governs SEO strategy at authority rank 2 (SEO_EXECUTION_PLAYBOOK.md §0.1).

---

## Provenance notice — read before relying on any section

v1.0 was never committed to git and was permanently destroyed by `git clean -fd` on
2026-07-21. Recovery attempts against git objects, dangling blobs, stash, reflog, editor
history and every reachable session transcript all failed. ~20% survived in verbatim
form and is preserved in `LOCAL_SEO_MASTER_PLAN.SALVAGE.md`.

This document is **v2.0 — a new version**, not a restoration. It is issued under the
amendment path (SEO_EXECUTION_PLAYBOOK.md §20.5). Every section carries a provenance tag:

| Tag | Meaning |
|---|---|
| ✅ **RECOVERED** | Verbatim v1.0 text, reproduced unaltered from the salvage |
| 📐 **DERIVED** | Rebuilt from surviving repository evidence, with the source cited inline |

**Nothing here is invented.** Derived sections restate what `PROJECT.md`,
`SERVICE_PAGE_SPEC.md`, `BACKLOG.md` and the live production code already establish.
Where v1.0 held reasoning that exists in no surviving artifact, that reasoning is gone and
this document does not pretend otherwise.

**Binding constraint inherited from v1.0** (recovered verbatim from its closing line):
*all keyword priorities are reasoned, not measured; validate before acting. No
search-volume figures are asserted anywhere in this plan.* v2.0 holds that line exactly.

---

## PART 0 — TAXONOMY RECONCILIATION (read first) 📐 DERIVED

**Source:** `PROJECT.md` §5 (incl. v1.1 amendment), `BACKLOG.md` D1/D2/D3 resolutions.

The canonical service list is **seven**, fixed by `PROJECT.md` §5 and binding on every
page, schema node, navigation item, internal link, sitemap entry and CTA:

| # | Canonical Service | Cluster |
|---|---|---|
| 1 | Patient Care | Care Services |
| 2 | Elder Care | Care Services |
| 3 | Mother & Newborn Care | Care Services |
| 4 | Child Care | Care Services |
| 5 | Maid Services | Home Support Services |
| 6 | Home Cook Services | Home Support Services |
| 7 | Housekeeping / Dusting & Cleaning | Home Support Services |

Reconciliations already resolved and **not reopened here**:

- **D1 ✅** — Patient Care is a combined service: clinical nursing by qualified nurses
  where required, plus non-clinical care by experienced attendants. Legacy "Home Nursing"
  and "Patient Attendant" fold in as its clinical and non-clinical sides. **"ICU Care at
  Home" branding is not carried.**
- **D2 ✅** — "Caretaker" is a role, not a service; absorbed contextually.
- **D3 ✅** — "Newborn & Baby Care" consolidated into **Mother & Newborn Care** as one
  combined service, never split. **Child Care** is separate and does not overlap.

### The distinction that resolves this: **entity truth vs. query capture** 📐 DERIVED

The business **is** seven services (`PROJECT.md` §5). Families **search** in language that
does not always match those names — "patient attendant", "nursing at home", "japa",
"babysitter", "part-time maid". These are not new services and must never become pages.

The rule: **entity truth governs what exists; query capture governs how it is described.**
A query is served by honest on-page language *inside* the correct canonical service page —
never by inventing a service, a page, or a locality variant (`PROJECT.md` §7 prohibitions).

---

## PART 1 — BUSINESS ENTITY ANALYSIS 📐 DERIVED

**Source:** `PROJECT.md` §2, §6; live `index.html` schema and copy.

### 1.1 What this business actually is

Quality Care Services connects families in Kota with verified caregivers and domestic
staff, and arranges that support in the family's home. It operates a **listen-first**
model: understand the situation, match suitable staff, stay reachable throughout the
engagement as a locally based team — not a distant call center (`PROJECT.md` §2).

It places people inside customers' homes, often around vulnerable individuals. Honesty,
verification and clear communication are the product, not the marketing.

### 1.2 Entity definition for search

One `LocalBusiness` entity, declared once on the homepage with a stable `@id`, never
duplicated onto service pages (`SERVICE_PAGE_SPEC.md` §4.6). Live schema evidence:

- **Name:** Quality Care Services
- **Category:** home care and domestic support provider
- **`areaServed`:** Kota + Talwandi, Vigyan Nagar, Mahaveer Nagar, Kunhari, Landmark City
- **`makesOffer`:** the canonical seven, each with a truthful description

### 1.3 Market context (Kota-specific reasoning)

Single-city operation. No operational presence elsewhere, therefore no city expansion and
no city×service pages (`SERVICE_PAGE_SPEC.md` §4.8 Tier 3 requires a constitutional
amendment first). Local pack presence and entity strength are the primary levers
available; on-site depth is the secondary lever.

### 1.4 Search intent segments (the four buyers) 📐 DERIVED

`PROJECT.md` §6 defines the audiences. Condensed to the buying postures that govern page
construction:

| Segment | Posture | Governs |
|---|---|---|
| **Families in acute need** | High urgency, low patience — patient discharged today, sudden requirement | Call/WhatsApp above the fold; Emergency band (D5-gated, default OFF) |
| **Adult children arranging elderly care** | Research mode; often outside Kota; seek reassurance | Depth, trust content, verification evidence |
| **Working parents** | Safety-dominant; planning ahead | Child Care and Mother & Newborn scope clarity |
| **Households needing domestic support** | Practical, recurring or short-notice | Home Support cluster; D4/D5 gated |

Through-line across all four: **trust under stress.** Copy lowers anxiety and makes the
next step obvious (`PROJECT.md` §6).

---

## PART 2 — KEYWORD ARCHITECTURE 📐 DERIVED

> ⚠️ **This is the section most affected by the v1.0 loss.** v1.0's seven reasoned
> keyword tables existed in no other artifact and are gone. What follows is rebuilt from
> surviving evidence only: the canonical service names (`PROJECT.md` §5), the title
> patterns and per-page gates (`SERVICE_PAGE_SPEC.md` §4.1), the live `makesOffer`
> descriptions, the ten live FAQ questions, and the local scope (`PROJECT.md` §7).
>
> **It is not v1.0's reasoning.** Treat priorities as re-derived, and validate against
> Search Console before acting on them.

### Rules binding this entire part ✅ RECOVERED (methodology) / 📐 DERIVED (statement)

1. **No search-volume figures are asserted anywhere.** Priorities are reasoned, not
   measured (v1.0 closing line, recovered verbatim).
2. **No keyword justifies a page.** Only a real canonical service does (`PROJECT.md` §5, §7).
3. **No per-locality pages.** Localities live in content and `areaServed`, never in URLs
   (`PROJECT.md` §7, §9).
4. **City in the title, never in the URL** (`SERVICE_PAGE_SPEC.md` §4.1, `PROJECT.md` §9).
5. **Boundaries are as binding as targets.** Each table names what is *not* pursued.
6. Query classes are served by honest on-page language inside the correct service page.

**Title patterns** (`SERVICE_PAGE_SPEC.md` §4.1, recovered verbatim from the spec):

- Care cluster: `{Service} at Home in Kota | Quality Care Services`
- Home Support cluster: `{Service} in Kota | Quality Care Services`

### 2.1 Patient Care — `/services/patient-care`

**Scope (live schema):** qualified nurses and experienced caregivers for recovery and
daily care at home, matched to the patient's needs.

| Class | Query shapes (reasoned) |
|---|---|
| Primary | patient care at home Kota |
| Supporting | nursing care at home Kota · patient attendant Kota · bedridden patient care Kota · post-hospitalization care at home Kota |
| Question-intent | verification of staff · 24-hour availability · how charges are decided *(live FAQ evidence)* |

**Boundaries — do not pursue:** ICU / high-dependency claims (**D1**); any medical-advice
class (YMYL); hospital-attendant placement (**D7 unresolved**).
**Gate:** **F-029** governs "Experienced Caregivers" vs "Experienced Patient Attendants"
in copy and schema — unresolved.

### 2.2 Elder Care — `/services/elder-care`

**Scope (live schema):** daily support for seniors including hygiene, mobility, meal
support, and companionship.

| Class | Query shapes (reasoned) |
|---|---|
| Primary | elder care at home Kota |
| Supporting | elderly care Kota · senior care at home Kota · attendant for elderly parents Kota |
| Question-intent | verification · 24-hour caregivers · short-period engagement *(live FAQ)* |

**Highest research-mode value.** Adult children frequently research from outside Kota
(`PROJECT.md` §6) — depth and verification evidence matter more here than urgency copy.
**Boundaries:** no medical/clinical claims; no outcome guarantees.

### 2.3 Mother & Newborn Care — `/services/mother-newborn-care`

**Scope (live schema):** support for mothers and newborn babies during the first weeks
after delivery, including recovery help and feeding support.

| Class | Query shapes (reasoned) |
|---|---|
| Primary | mother and newborn care Kota |
| Supporting | post delivery care at home Kota · newborn baby care at home Kota |
| ⚠️ Gated | *japa* query class — **blocked pending japa scope confirmation** |
| Question-intent | post-delivery support availability *(live FAQ)* |

**Boundaries:** never split into two services (`PROJECT.md` §5, D3); no lactation,
medical or clinical advice; **no japa targeting until the business confirms delivery
genuinely matches what Kota families mean by the term.**

### 2.4 Child Care — `/services/child-care`

**Scope (live schema):** dependable care at home for young children while parents are at
work or away.

| Class | Query shapes (reasoned) |
|---|---|
| Primary | child care at home Kota |
| Supporting | babysitter Kota · nanny at home Kota · caregiver for children Kota |
| Question-intent | caregivers for newborns and young children *(live FAQ)* |

**Boundaries:** distinct from Mother & Newborn Care — the two do not overlap
(`PROJECT.md` §5). No daycare-centre or crèche implication; care is delivered at home.
Age-band differentiation required (`SERVICE_PAGE_SPEC.md` §4.1 gate).

### 2.5 Maid Services — `/services/maid-services` ⚠️ D4-GATED

**Scope (live schema):** part-time or full-time help with cleaning, kitchen work, and
daily tasks.

| Class | Query shapes (reasoned) |
|---|---|
| Primary | maid service Kota |
| Supporting | part time maid Kota · full time maid Kota · house maid Kota |

**Blocked by D4.** Scope boundaries against Home Cook and Housekeeping are unresolved;
targeting cannot be finalised, nor the Decision Aid pairing (SP-T4), until D4 is decided.

### 2.6 Home Cook Services — `/services/home-cook-services` ⚠️ D4-GATED

**Scope (live schema):** experienced home cooks for daily, fresh, home-style meal
preparation.

| Class | Query shapes (reasoned) |
|---|---|
| Primary | home cook Kota |
| Supporting | cook for home Kota · daily cook Kota · home-style meal cook Kota |

**Blocked by D4** (boundary against Maid Services) **and D5** (short-notice availability).

### 2.7 Housekeeping / Dusting & Cleaning — `/services/housekeeping-cleaning` ⚠️ D4-GATED

**Scope (live schema):** help with daily household cleaning and upkeep.

| Class | Query shapes (reasoned) |
|---|---|
| Primary | housekeeping services Kota |
| Supporting | dusting and cleaning Kota · household cleaning Kota |

**Boundaries — binding:** **no deep cleaning, no sanitisation targeting.** Not offered
(E4-T6); produces unqualified leads (Appendix A, recovered). **Blocked by D4/D5.**

### 2.8 Brand & navigational 📐 DERIVED

Brand queries ("Quality Care Services Kota", contact/phone navigational forms) are served
by the homepage and the `LocalBusiness` entity. **Branded search volume is a Part 10.4
success metric** — it grows as referrals, reviews and citations compound.

### 2.9 Cross-service and hub-level 📐 DERIVED

Head-level local intent — home care and domestic support in Kota — belongs to the
**homepage as business hub** (`PROJECT.md` §7). The homepage never tries to rank for
everything; it routes to the right service page. A `/services/` hub (E4-T7) may later
carry cluster-level intent.

---

## PART 3 — SEARCH INTENT MAPPING 📐 DERIVED

**Source:** `PROJECT.md` §6, §12; `SERVICE_PAGE_SPEC.md` §2, §6.

### 3.1 Intent → page type → conversion action

| Intent | Page type | Primary action |
|---|---|---|
| Urgent need (discharge today, sudden requirement) | Service page hero / Emergency band *(D5-gated, default OFF)* | Call |
| Service research (comparing, understanding scope) | Service page: What's Included · Who It's For · How It Works | WhatsApp or form |
| Question intent (verification, availability, charges) | Service page FAQ + homepage FAQ | Form or call |
| Brand / navigational | Homepage | Call |
| Wrong-service arrival | Service Decision Aid (SP-T4) | Sibling page, not exit |

### 3.2 Intent distribution and where effort belongs

Effort concentrates where trust is decided, not where volume looks largest. Per
`SERVICE_PAGE_SPEC.md` §2, the load-bearing slots are **What {Service} Includes** (the
page's trust and SEO core) and **Why Families Trust Us**. Pricing transparency ("How
Pricing Works", factors only, no prices) precedes the mid-page CTA because unexplained
pricing is the largest unspoken anxiety before a call.

### 3.3 Intent rules binding page construction

1. Trust precedes ask — the mid-page CTA follows process + pricing + trust
   (`SERVICE_PAGE_SPEC.md` §2).
2. Call and WhatsApp above the fold on mobile (`PROJECT.md` §12).
3. FAQ answers real questions first, schema second; mirrored 1:1 in `FAQPage`.
4. No page targets an intent the business cannot honestly serve.

---

## PART 4 — WEBSITE INFORMATION ARCHITECTURE ✅ RECOVERED (from PROJECT.md §8, unchanged)

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

### 4.1 Target architecture

Shallow, honest hierarchy. Homepage = hub and fast conversion funnel. Service pages = the
depth layer, built incrementally, one at a time. **Status: Reviewed and Approved**
(`PROJECT.md` §8); changes require §19/§21 approval.

### 4.2 Page-type decisions with justification

| Page type | Verdict | Why |
|---|---|---|
| One page per canonical service | ✅ Build | Real offering; service-specific intent (`PROJECT.md` §7) |
| `/services/` hub | ⬜ Optional (E4-T7) | Links down to all seven; breadcrumb target |
| Per-locality pages | ❌ Never | Doorway pattern; `PROJECT.md` §7 hard prohibition |
| City×service matrix | ❌ Never (all tiers) | `SERVICE_PAGE_SPEC.md` §4.8 hard prohibition |
| Blog | ⏸ Deferred | Part 7.4 unlock criteria |

### 4.3 Total page count at full build-out

Homepage + 7 service pages + optional `/services/` hub + privacy policy (A-2) + careers
(A-40, `JobPosting`). **No other page type is authorised.**

---

## PART 5 — URL STRATEGY ✅ RECOVERED (from PROJECT.md §9, unchanged)

### 5.1 Existing strategy — confirmed, not changed

| Canonical Service | URL |
|---|---|
| Patient Care | `/services/patient-care` |
| Elder Care | `/services/elder-care` |
| Mother & Newborn Care | `/services/mother-newborn-care` |
| Child Care | `/services/child-care` |
| Maid Services | `/services/maid-services` |
| Home Cook Services | `/services/home-cook-services` |
| Housekeeping / Dusting & Cleaning | `/services/housekeeping-cleaning` |

### 5.2 Why "no city in the URL" is the right long-term call

Single-city business today; the city belongs in titles, content and schema. City-free URLs
keep every future option open without retrofitting (`PROJECT.md` §9,
`SERVICE_PAGE_SPEC.md` §4.8).

### 5.3 Supporting-page URLs

Lowercase, hyphen-separated, self-describing. No dates, no IDs, no deep nesting.

### 5.4 Future expansion (design now, build never-until-needed)

Tier 3 (genuine second city) requires a constitutional scope amendment before any work.
The existing seven URLs never change (`SERVICE_PAGE_SPEC.md` §4.8).

### 5.5 Technical URL rules (already tasked as SP-T1)

**SP-T1 — unresolved.** File strategy (`patient-care.html` vs `patient-care/index.html`)
and trailing-slash form, normalized via Netlify so exactly one URL form returns 200 and
all variants 301. Canonical tag, sitemap, schema `url`, breadcrumb and every internal link
use that single form. **Blocks the first page shipped** (`SERVICE_PAGE_SPEC.md` §4.3, §12).

---

## PART 6 — INTERNAL LINKING BLUEPRINT ✅ RECOVERED (from SERVICE_PAGE_SPEC.md §4.5)

### 6.1 Authority flow model

Homepage (hub, `LocalBusiness` `@id`) → service cards and footer service list → each
service page as it ships (E5-T3). Breadcrumb links up; the `/services/` hub links down to
all seven. **Never link to an unshipped page.**

### 6.2 Link rules

1. Homepage service cards + footer → each page **as it ships** (E5-T3).
2. Breadcrumb `Home › Services › {Service}` — visible text identical to schema names and
   canonical service names.
3. The Service Decision Aid adds **one deliberate sibling link per page** (SP-T4).
4. Related Services: 2–3 genuine adjacent links only.
5. Existing homepage anchors (`#services`, `#faq`, `#contact`) must keep working.

### 6.3 Adjacency map (genuine relationships only) ✅ RECOVERED verbatim

- Patient ↔ Elder (primary pair)
- Mother & Newborn ↔ Child
- Maid ↔ Cook ↔ Housekeeping (Home Support triangle)
- Elder → Cook / Housekeeping where the household overlap is genuine

---

## PART 7 — CONTENT CLUSTER STRATEGY 📐 DERIVED

**Source:** `PROJECT.md` §5 clusters, `SERVICE_PAGE_SPEC.md` §7, §3.5.

### 7.1 Cluster model

Two clusters, matching `PROJECT.md` §5: **Care Services** (Patient, Elder, Mother &
Newborn, Child) and **Home Support Services** (Maid, Home Cook, Housekeeping). The
homepage is the hub; service pages are the depth layer; the adjacency map (6.3) is the
lattice between them.

> **Correction carried forward from the v1.0 audit (W3):** Google narrowed FAQ rich-result
> eligibility to well-known authoritative government and health-organisation sites
> (announced August 2023). A local service business should **not** expect FAQ rich results
> to render. The on-page content value is real; the rich-result expectation is not.
> `FAQPage` mirroring remains mandated by the frozen spec regardless.

### 7.2 Cluster inventory (topics only — not titles, not briefs)

Per-service depth lives inside each service page's template slots
(`SERVICE_PAGE_SPEC.md` §2). **No separate article inventory exists while the blog is
deferred.**

### 7.3 Content governance rules (binding)

1. No content created solely to rank (`PROJECT.md` §7, §19).
2. No AI-generated filler.
3. Every claim must be true today and evidenced if asked.
4. No prices, ever (`SERVICE_PAGE_SPEC.md` §3.3).
5. No response-time or outcome guarantees (D5-gated).
6. No superlatives ("best", "No.1").
7. No medical advice — YMYL boundary; the site explains **how care is arranged**.
8. Content freshness governed by SP-T8.

### 7.4 Blog — deferral decision and unlock criteria

**Deferred.** It would compete with service pages for authority and owner time. The
Related Resources slot (`SERVICE_PAGE_SPEC.md` §3.5) stays dormant and is **never shipped
empty**. Unlock requires all four service-page fundamentals first: the certified template,
the shipped service pages, the measurement layer, and genuine capacity — not enthusiasm.

---

## PART 8 — LOCAL SEO STRATEGY 📐 DERIVED

**Source:** `BACKLOG.md` A-8, A-9, A-39; `PROJECT.md` §7; `RUNBOOK.md` §1; live schema.

### 8.1 Google Business Profile (maps to A-8, P2)

Does not yet exist (`RUNBOOK.md` §1: "Placeholder — not yet created"). Requirements:
exact business name with **no keyword suffix**; the canonical seven as services using
canonical names; full description; attributes; hours; service area; photo set (consent
first — SP-T7); `sameAs` added to site schema. **Highest-ROI unblocked work available.**

### 8.2 NAP consistency

One canonical NAP, frozen in a single internal reference before any citation or profile is
created. Every surface must match **character for character**. Inconsistent NAP actively
damages local ranking (Appendix A, recovered). **A-3** (domain email migration) is the
open dependency.

### 8.3 Location signals (on-site)

Kota in titles, H1s, visible content and `Service.areaServed` — never in URLs. Areas
Served section names Kota + Talwandi, Vigyan Nagar, Mahaveer Nagar, Kunhari, Landmark City
(`SERVICE_PAGE_SPEC.md` §2, live schema).

### 8.4 Service area strategy

Tier 1 (single city) today. Tier 2 growth extends `areaServed` and the Areas Served
section on existing pages — **no new pages, no new URLs** (`SERVICE_PAGE_SPEC.md` §4.8).

### 8.5 Trust signals (E-E-A-T)

Named humans, real photos (consent on file), published scope boundaries, the Evidence
Block with its ledger (SP-T6, A-5), verification claims that can be evidenced, and the
D6 replacement policy (A-6).

### 8.6 Review strategy (maps to A-39)

The compounding trust asset. Requests embedded at engagement completion with a consent
step and a direct review link, applied **uniformly** — never selectively by expected
sentiment. **Never buy, incentivise, or gate reviews** (Appendix A, recovered). Review
count *and velocity* are Part 10.4 metrics.

### 8.7 Photo strategy

Real photos only, per `SERVICE_PAGE_SPEC.md` §8 authenticity, consent and dignity rules.
**Written consent must precede photography** — the consent process (SP-T7) is a
prerequisite, not a follow-up.

### 8.8 Citation strategy (maps to A-9)

Tier 1: Justdial, Sulekha, IndiaMART, Bing Places, Apple — with the frozen NAP. Tier 2
follows. **Never purchase citation packages** (Appendix A, recovered).

### 8.9 Two channels competitors in this market systematically ignore

📐 **DERIVED, and stated conservatively.** v1.0's specific claim here did not survive and
is not reconstructed. What the surviving artifacts support: (a) **review velocity** as a
sustained habit rather than a one-off push, and (b) **honest scope boundaries published
in public** — stating what is *not* offered. Both are available today, cost nothing, and
compound. Whether v1.0 named these two is unknown; this is not presented as its reasoning.

---

## PART 9 — COMPETITOR RESEARCH FRAMEWORK 📐 DERIVED

### 9.1 Competitor set definition

Local Kota providers appearing in the local pack and organic results for the Part 2
primary classes. Set is fixed per quarter so comparisons are stable.

### 9.2 Data-collection template (one row per competitor, per quarter)

| Field | Notes |
|---|---|
| Name · URL · GBP present | — |
| Local pack presence for primary classes | Manual observation, monthly |
| Review count · rating · velocity | Velocity matters more than count |
| Services claimed | Note anything they claim that we truthfully cannot |
| NAP consistency | Observable weakness in this market |
| Page depth per service | Do they have service pages at all? |

### 9.3 Analysis method

Compare quarter over quarter, not week to week. Look for durable gaps, not momentary
rankings.

### 9.4 Binding rule

**Competitor behaviour never justifies violating `PROJECT.md` §5, §7 or §19.** If a
competitor ranks by doing something prohibited here, that is not a strategy to copy.

---

<!-- ═══════════ EVERYTHING BELOW IS VERBATIM RECOVERED v1.0 TEXT ═══════════ -->
<!-- Original lines 596–740. Reproduced unaltered. Do not edit in place.      -->

## PART 10 — 90-DAY ROADMAP ✅ RECOVERED VERBATIM

### 10.1 Sequencing logic

Three constraints shape this schedule, and ignoring any of them breaks the project's governance:

1. **The existing roadmap gates page work.** P7 (first service page) requires P1 ✅, P3 (measurement), P4 (accessibility), SP-T1 (URL strategy), SP-T2 (form pre-select). Service pages *cannot* honestly be scheduled in week 2.
2. **GBP is unblocked and outranks everything on ROI.** It is parallel-safe after P0 and delivers local-pack visibility that no amount of on-site content can substitute for.
3. **D4 and D5 gate three of seven pages.** They must be forced early or they will stall the back half. The master plan already flags this as risk R3.

**Therefore: front-load Local SEO (unblocked, highest ROI), run the P3/P4 engineering gates in parallel, then ship pages in the order the backlog already prioritises.**

### 10.2 Week-by-week

#### Phase A · Weeks 1–2 — Foundation & truth verification

| Week | Work | Owner | Maps to |
|---|---|---|---|
| 1 | **Close P1 properly:** run the 5 outstanding production checks (Rich Results, form ×8, rendered testimonials, mobile/desktop + console, cache). Record all five verification layers. | Eng | P1 exit |
| 1 | **Verify the SEO stack actually exists** — confirm Search Console property is verified and receiving data, GA4 is collecting, sitemap submitted. *(The brief states these are configured; the head carries commented-out verification stubs. Verify, don't assume.)* | Eng | E10-T8 |
| 1 | **Freeze the canonical NAP** (Part 8.2) in one internal reference document | Business | A-8 prep |
| 1 | **Force the blocking decisions:** Part 0 taxonomy confirmation · D4 · D5 · D7 (hospital attendants) · japa scope · F-029 wording | Business | R3 mitigation |
| 2 | **Create and verify Google Business Profile** — full setup per 8.1 | Business | A-8 |
| 2 | **A-3 decision: domain email** — settle before citations | Business | A-3 |
| 2 | Add `/LOCAL_SEO_MASTER_PLAN.md` to the netlify.toml publish blocklist | Eng | P0-4 |

#### Phase B · Weeks 3–4 — Local presence depth

| Week | Work | Owner | Maps to |
|---|---|---|---|
| 3 | GBP depth: seven services (canonical names), full description, attributes, hours, service area, first photo set | Business | A-8 |
| 3 | GBP `sameAs` added to site schema | Eng | E5-T4 |
| 3 | **Launch the review flywheel** — script, consent step, direct review link, request built into engagement completion | Business | A-39 |
| 4 | Tier 1 citations (Justdial, Sulekha, IndiaMART, Bing Places, Apple) with frozen NAP | Business | A-9 |
| 4 | Seed GBP Q&A from the site FAQ | Business | A-8 |
| 4 | **P3 measurement:** GA4 event taxonomy + call/WhatsApp/form events, DebugView verified | Eng | E6-T1…T4 |

#### Phase C · Weeks 5–6 — Gates and keyword validation

| Week | Work | Owner | Maps to |
|---|---|---|---|
| 5 | **Validate Part 2 keywords against real data** — Keyword Planner + first GSC impressions. Replace reasoned priority with measured priority. | SEO | — |
| 5 | **P4 accessibility remediation** (gates P7): five measured WCAG failures + `scroll-margin-top` + unique CTA names | Eng | A-12…A-20 |
| 6 | **SP-T1** URL/trailing-slash strategy decided and configured; **SP-T2** form pre-select reader | Eng | SP-T1/T2 |
| 6 | **P2 trust layer:** privacy policy live and linked; hero image mitigation | Eng | A-2, A-4 |
| 6 | **Competitor sweep #1** using the Part 9 template | SEO | — |

#### Phase D · Weeks 7–9 — First service page & template certification

| Week | Work | Owner | Maps to |
|---|---|---|---|
| 7–8 | **`/services/patient-care`** built to frozen spec — the highest-intent service, absorbing home-nursing/attendant query demand honestly | Eng | P7 / E3-T1…T12 |
| 8 | Schema (BreadcrumbList + Service→`@id` + FAQPage 1:1), canonical, OG, sitemap entry | Eng | E3-T10, E5-T6/T9 |
| 9 | **Template certification** — full DoD pass; certification snapshot recorded as the reference for all six remaining pages | Eng | E3-T12 |
| 9 | Homepage card + footer re-pointed to the live URL | Eng | E5-T3 |
| 9 | Evidence Block v1 with ledger; D6 replacement policy published | Business | A-5, A-6 |

#### Phase E · Weeks 10–13 — Scale the pattern

| Week | Work | Owner | Maps to |
|---|---|---|---|
| 10 | **`/services/elder-care`** (Critical — highest research-mode value) | Eng | E4-T1 |
| 11 | **`/services/home-cook-services`** (Critical — highest unserved demand) *if D4/D5 resolved; else swap in `/services/child-care`* | Eng | E4-T2 / E4-T3 |
| 12 | **`/services/mother-newborn-care`** *(only if japa scope confirmed)* | Eng | E4-T4 |
| 12 | Tier 2 citations · second photo set · GBP posts cadence established | Business | A-9 |
| 13 | **90-day review:** GSC impressions/clicks/positions by query · GBP insights (calls, direction requests, messages) · GA4 lead events by service · review count and velocity · competitor sweep #2 · re-prioritise the next 90 days | All | P10 |

### 10.3 What is deliberately NOT in the first 90 days

| Deferred | Why |
|---|---|
| Blog / articles | Part 7.4 unlock criteria unmet; would compete with service pages for authority and owner time |
| Remaining 3 service pages (Maid, Housekeeping, + one) | Realistic capacity; D4-gated; better shipped well in month 4 than badly in month 3 |
| Hindi pages | Maps to A-42; requires a scope decision, not improvisation |
| Link building | Earned through GBP, citations, and referral relationships first. No paid or exchanged links, ever. |
| City expansion | No operational presence to justify it |

### 10.4 Success metrics (measure these, not sessions)

| Metric | Why it matters | Source |
|---|---|---|
| **Qualified leads per service** | The actual business objective | GA4 (P3 events) + lead log (A-38) |
| GBP calls, messages, direction requests | Local pack performance, unfiltered | GBP Insights |
| Review count **and velocity** | The compounding trust asset | GBP |
| Impressions/clicks/position for Part 2 primaries | Ranking progress on terms that convert | Search Console |
| Local pack presence for primary keywords | The single most valuable local position | Manual, monthly |
| Branded search volume | Entity strength — grows as referrals and reviews compound | Search Console |
| **Lead-to-placement rate** | Guards against ranking for the wrong queries | Business (A-38) |

🚫 **Explicitly not a success metric: total sessions.** Per the brief, and because vanity traffic in this category is worse than no traffic — it consumes operator time answering calls we cannot serve.

---

## APPENDIX A — ANTI-PATTERNS (do not do these) ✅ RECOVERED VERBATIM

| Anti-pattern | Why it is refused |
|---|---|
| Per-locality / doorway pages | §7 hard prohibition; thin-content spam signal |
| Keyword-stuffed GBP business name | Guideline violation; suspension risk |
| Buying or incentivising reviews | Guideline violation; existential risk to a trust business |
| Purchased citation packages | NAP inconsistency actively damages local ranking |
| AI-generated filler articles | §7 prohibition; brief prohibition; YMYL risk |
| Publishing prices or price schema | SERVICE_PAGE_SPEC §3.3 — no prices, ever |
| Response-time or outcome guarantees | D5-gated; spec §3.1 forbids response-time guarantees |
| "Best" / "No.1" / superlative claims | Unverifiable; §11 calm-and-honest identity; currently zero on the live site |
| Reintroducing "Home Nursing" as a service | Reverses PHASE P1; violates §5, §19, D1 |
| Targeting deep cleaning / sanitisation | Not offered (E4-T6); produces unqualified leads |
| Medical advice content | YMYL boundary; business does not provide clinical guidance |
| Link exchanges or paid links | Guideline violation; no place in a durable local strategy |

---

## APPENDIX B — OPEN DECISIONS BLOCKING EXECUTION ✅ RECOVERED VERBATIM

| ID | Decision | Blocks | Owner |
|---|---|---|---|
| **Part 0** | Confirm canonical-seven taxonomy governs this plan (vs. the brief's 8-item list) | Everything in Part 2 | Business |
| **D4** | Maid / Home Cook / Housekeeping scope boundaries | 3 service pages, their keyword sets, Decision Aid pairs | Business |
| **D5** | Short-notice / one-off availability, per service | All emergency + "immediately/today" keyword classes | Business |
| **D6** | Replacement / dissatisfaction policy | Trust content; the #1 unanswered objection | Business |
| **D7 (proposed)** | Do we place attendants **inside hospitals**? | "Hospital attendant Kota" query class | Business |
| **A-3** | Domain email migration | Citation build (must precede it) | Business |
| **F-029** | "Experienced Caregivers" vs "Experienced Patient Attendants" | Patient Care copy + schema; measurable SEO consequence | Business |
| **Japa scope** | Does delivery genuinely match what Kota families mean by *japa*? | Mother & Newborn Care's highest-intent cluster | Business |
| **§5 amendment?** | Only if the business insists "Home Nursing" is a distinct service | Would require constitutional amendment before any SEO work | Business |

---

## APPENDIX C — RELATIONSHIP TO EXISTING ROADMAP ✅ RECOVERED VERBATIM

This plan creates **no new engineering work items**. Every action maps to an existing ID:

- **P2** → A-2 (privacy), A-3 (email), A-4 (hero), A-5 (evidence), A-6 (D6), A-8 (GBP), A-9 (citations), E5-T4 (Organization/WebSite schema)
- **P3** → E6-T1…T4 (event taxonomy + call/WhatsApp/form events)
- **P4** → A-12…A-23 (accessibility + conversion remediation)
- **P7** → E3-T1…T12, SP-T1…SP-T7 (Patient Care page + certification)
- **P8** → E4-T1…T7, E5-T3/T6/T7/T9, A-30 (remaining pages + SEO wiring)
- **P10** → A-38 (lead log), A-39 (reviews), A-40 (careers), A-41 (referrals), A-42 (Hindi)

Where this document adds value is **sequencing and rationale** — which of the already-approved items to do first, in what order, and why. Task-level authority remains with BACKLOG.md.

<!-- ═══════════════════ END OF RECOVERED v1.0 TEXT ═══════════════════ -->

---

## APPENDIX D — v2.0 PROVENANCE LEDGER 📐 NEW IN v2.0

| Part | Provenance | Primary evidence |
|---|---|---|
| Part 0 | 📐 Derived | `PROJECT.md` §5 + v1.1 amendment; `BACKLOG.md` D1/D2/D3 |
| Part 1 | 📐 Derived | `PROJECT.md` §2, §6; live `index.html` schema |
| **Part 2** | 📐 **Derived — v1.0 tables unrecoverable** | `SERVICE_PAGE_SPEC.md` §4.1; live `makesOffer`; live FAQ; `PROJECT.md` §5, §7 |
| Part 3 | 📐 Derived | `PROJECT.md` §6, §12; `SERVICE_PAGE_SPEC.md` §2, §6 |
| Part 4 | ✅ Recovered via `PROJECT.md` §8 | Architecture unchanged and approved |
| Part 5 | ✅ Recovered via `PROJECT.md` §9 | URL table unchanged |
| Part 6 | ✅ Recovered via `SERVICE_PAGE_SPEC.md` §4.5 | Adjacency map verbatim |
| Part 7 | 📐 Derived | `PROJECT.md` §5, §7, §19; `SERVICE_PAGE_SPEC.md` §7, §3.5 |
| Part 8 | 📐 Derived | `BACKLOG.md` A-8/A-9/A-39; `RUNBOOK.md` §1; live schema |
| Part 9 | 📐 Derived | Framework only; v1.0 specifics lost |
| **Part 10** | ✅ **Recovered verbatim** | Salvage, original lines 596–688 |
| **Appendix A/B/C** | ✅ **Recovered verbatim** | Salvage, original lines 689–740 |

**Known permanent losses.** v1.0's specific reasoning in Part 2 (seven keyword tables),
Part 8.9 (the two named channels), and Part 9 (competitor specifics) existed in no other
artifact. v2.0 rebuilds Parts 2 and 9 from repository evidence and states 8.9
conservatively. None of it is presented as v1.0's reasoning.

---

*End of LOCAL_SEO_MASTER_PLAN.v2.md — 2026-07-21. Supersedes v1.0 (lost). No website
changes are authorized by this document. All keyword priorities are reasoned, not
measured; validate before acting. No search-volume figures are asserted anywhere in this
plan.*
