# NEAR_ME_PAGE_SPEC.md

**Canonical architecture specification for Near Me pages.**
**Reference implementation: `/patient-care-near-me/`**

| Field | Value |
|---|---|
| **Version** | **1.9 — FROZEN** |
| **Status** | 🔒 **CANONICAL** — single inheritance source for every future Near Me page |
| **Created** | 2026-08-02 |
| **Applies to** | All Near Me pages. Hard ceiling: **seven**, one per canonical service (§16) |
| **Authority** | Subordinate to `PROJECT.md`. On conflict, `PROJECT.md` wins |
| **Sibling specs** | `SERVICE_PAGE_SPEC.md` (service pages) · `docs/knowledge/ARTICLE_TEMPLATE.md` (articles) |
| **Location** | `docs/` per `PROJECT.md` convention. Publish-blocked by the fail-closed `/docs/*` rule in `netlify.toml` — **no config change required** |

---

## REVISION HISTORY

Amendments append here. **§14 requires every architecture-review change to add a row.**

| Ver | Date | Change | Approved by |
|---|---|---|---|
| 1.0 | 2026-08-02 | Initial implementation spec — IA, slots, schema, linking, local SEO, metadata, FAQ, CTA, mobile, acceptance criteria | Owner |
| 1.1 | 2026-08-02 | Objective broadened to five questions (Q1–Q5); hero decision record added (Option D adopted); N5 rewritten to navigation logistics; N12 two-part routing added after four of six proposed routes were found to be non-services | Owner |
| 1.2 | 2026-08-02 | Governance layer: Page Ownership, Content Boundary Matrix, SEO Guardrails G1–G15, Content Governance, Success Metrics M1–M10, Inheritance Contract, Definition of Done | Owner |
| 1.3 | 2026-08-02 | Governance maturity pass: Revision History, normative language key, dependency hierarchy, exception policy, deprecation policy. No architecture, slot, component, SEO or implementation change | Owner |
| **1.4** | **2026-08-02** | **P2 resolved by scope — N5 split into visitor-guidance items (ship immediately) and business-process items (held); operational claims register added. Gate 1 split into 1A repository / 1B business verification / 1C measurement. GA4 dimension registration reclassified from build blocker to pre-launch recommendation. No architecture, slot, component or SEO change** | **Owner** |
| 1.5 | 2026-08-02 | Word-budget measurement basis corrected to exclude `.faq-list`; range 1,000–1,400. *Recorded retroactively on 2026-08-04 — the correction was written into §4 but the version header and this table were never updated. Logged per §14 rather than silently absorbed* | Owner |
| 1.6 | 2026-08-04 | Differentiation contract (§3.1) added — mandatory-unique sections, shared-wording allowance, and a numeric duplication budget between sibling Near Me pages. §10 FAQ mandate reduced from 10 to 5–6 with quality criteria. G16 added. §16 build sequence changed from strictly serial to parallel-with-noindex on owner direction. §3 verification allowance 3 → 4 lines. Gate 2 updated | Owner |
| 1.7 | 2026-08-04 | Three-section intent floor added to §3.1 — ≥ 3 sections must fail the service-name swap test, protecting purpose rather than only wording. F3 strengthened: no FAQ may substantially repeat a body section's primary message. N9 verification 4 → 5 bullets, ordered as the real sequence. §12 records the `.service-points li` flex constraint — plain text only, no inline `<strong>`. Hero availability chip de-promised | Owner |
| 1.8 | 2026-08-04 | Surfaced by building page 2 and measuring it. `#verification` exempted from the pairwise wording budget — the 15% threshold was set by intuition and measured 64.2%; four of its five bullets are shared verified facts that MUST stay identical. Replaced with a structural rule testing bullet 4 only (0% overlap). `#verification` no longer counts toward the three-section intent floor because its purpose survives a service-name swap. Patient-care worked example corrected accordingly; elder-care example added | Owner |
| **1.9** | **2026-08-04** | **Surfaced by Gate 6 live-browser measurement. §4 N2 DOM order reversed — `.hub-hero-actions` now precedes `.hero-indicators`. The v1.0–1.8 order put a 190px stacked chip block between the lede and the buttons, pushing both hero CTAs 90–353px below a 640px fold on all seven pages, breaching the §12 MUST. §12 clarified: only the in-hero buttons satisfy it; the sticky mobile bar and floating WhatsApp button MUST NOT be counted. No chips removed, hidden or reduced; no CSS, component, schema, routing or content change** | **Owner** |

---

## NORMATIVE LANGUAGE

Key words are interpreted per **RFC 2119**. Where a requirement appears in prose without a keyword, the strength table below governs.

| Keyword | Meaning |
|---|---|
| **MUST** / **MUST NOT** | Absolute. Non-compliance blocks release (§17) |
| **SHOULD** / **SHOULD NOT** | Strong default. Deviation requires a recorded exception (§18) |
| **MAY** | Genuinely optional. No approval needed |

### Requirement strength — the values that were previously ambiguous

| Requirement | Strength |
|---|---|
| `<main>` ≥ 1,000 words, measured excluding `.faq-list` | **MUST** (below the floor, cancel — G14) |
| `<main>` ≤ 1,400 words, measured excluding `.faq-list` | **SHOULD** |
| ≥ 3 sections fail the service-name swap test (§3.1 intent floor) | **MUST** |
| Shingle overlap vs parent service page < 15% | **MUST** |
| `"near me"` ≤ 3× body, ≤ 1× heading | **MUST** |
| 5–6 FAQs, each passing F1–F5 (§10), unique site-wide and across siblings | **MUST** |
| §3.1 pairwise duplication budget | **MUST** |
| `section[id]` values exactly as §4 | **MUST** |
| Zero new components, CSS, tokens, images | **MUST** |
| Schema = `BreadcrumbList` + `WebPage` + `FAQPage` | **MUST** |
| `LocalBusiness` or `Service` node on this page | **MUST NOT** |
| Exactly one in-content inbound link | **MUST** |
| Nav or footer placement | **MUST NOT** |
| H1 + both **in-hero** Tier-1 CTAs above fold at 360×640 (§12 v1.9 — sticky bar/floating button do not count) | **MUST** |
| Every guardrail G1–G16 | **MUST NOT** violate |
| Family-level §3.1 review passes before any page is indexed | **MUST** (v1.6 — replaces the former "build one page at a time") |
| Inline `<strong>` or `<a>` inside `.service-points li` | **MUST NOT** (§12) |
| Sitemap priority 0.6 | **SHOULD** |
| Hero carries 4 `.hero-indicators` chips | **SHOULD** (count is a design choice; the component is a MUST) |
| Promote hero to `.hero-section` once real photography exists | **MAY** (requires spec amendment) |

---

## §0 · PREREQUISITES — none of these are optional

Three items must close **before** any Near Me page is built. They are recorded here so no future contributor discovers them mid-build.

| # | Prerequisite | Owner | Status |
|---|---|---|---|
| **P0** | **`PROJECT.md` amendment** admitting a bounded local-intent page type. §7 states *"Location lives in titles, content, and schema — never in the URL"*; §19 states *"Never add content solely for SEO"*; `LOCAL_SEO_MASTER_PLAN` §4.3 states *"No other page type is authorised."* Precedent: the Knowledge Center required the v1.4 amendment (commit `68e3015`) | Owner | ⬜ Open |
| **P1** | **Add `@id` to the `Service` node** on `/services/patient-care`. It currently has `url` but no `@id`, so this page cannot reference it without minting a duplicate entity. One line, ships before or with the page | Eng | ⬜ Open |
| **P2** | **Owner verification of N5 operational claims.** **Not a build blocker** — resolved by scope, see the register below. Only items asserting a *business process* need an answer; visitor-guidance items ship without one | Owner | 🟡 Partial — build unblocked |

### P2 · Operational claims register

N5 items are split by what they assert. **Visitor-guidance items describe what a family can tell or send us — they need no verification and ship immediately.** Only process items assert what *we* do.

| # | N5 item | Type | Verification | Answer | Ships |
|---|---|---|---|---|---|
| 1 | Landmark-based directions | Visitor guidance | Not required | — | ✅ Now |
| 2 | Hospital as reference point | Visitor guidance | Not required | — | ✅ Now |
| 3 | Colony / locality | Visitor guidance | Not required | — | ✅ Now |
| 4 | Sharing a location pin on WhatsApp | Visitor guidance — a WhatsApp feature plus our published number | Not required | — | ✅ Now |
| 5 | **Caregiver calls on approach** | **Business process** | **Required** | ⬜ `YES` / `NO` / `PARTIAL` | ⛔ Held |
| 6 | **Pin is used to navigate** | **Business process** | **Required** | ⬜ `YES` / `NO` / `PARTIAL` | ⛔ Held |

**Recording procedure.** When the owner answers, write the answer into the table above, add a Revision History row, and act on it:

- **`YES`** → write the item as stated fact; remove its holding marker from the page.
- **`PARTIAL`** → write only the part that is always true; never generalise a sometimes.
- **`NO`** → delete the item permanently and strike its row here. **Cut, not softened.**

**Until answered**, items 5–6 exist on the page only as an HTML comment marker — invisible, no placeholder text — the same pattern used for the Founder Story on `/about/`. The page ships with four items and is complete without them.

> **Strategic note, recorded once and not re-argued:** "near me" queries are resolved primarily through **Google Business Profile** proximity and prominence, not on-page keywords. The GBP does not yet exist. `docs/knowledge/CONTENT_ROADMAP.md` already identifies it as the highest-return unblocked item. This page is a complement to the GBP, never a substitute.

---

## §0.1 · DEPENDENCY HIERARCHY

This spec is **subordinate**. On any conflict, the higher authority wins and this document is amended to match — never the reverse.

```
PROJECT.md  (constitution — §5 services · §7 SEO · §9 URLs · §12 conversion · §19 immutables)
   │
   ├── LOCAL_SEO_MASTER_PLAN.md   (page-type authorisation · anti-patterns · metrics posture)
   │
   ├── SERVICE_PAGE_SPEC.md       (parent page this satellite links up to)
   │
   └── ► NEAR_ME_PAGE_SPEC.md  ◄  (this document)
             │
             └── every /{service}-near-me/ page
```

| Depends on | For | Breaks this spec if it changes |
|---|---|---|
| `PROJECT.md` §5 | The canonical seven service names | §1, §4 N12, G4 |
| `PROJECT.md` §7, §19 | SEO prohibitions; URL rule; P0 amendment | §0 P0, §13 |
| `PROJECT.md` §12 | CTA hierarchy | §11 |
| `LOCAL_SEO_MASTER_PLAN` §4.2–4.3, App. A | Page-type authorisation; anti-patterns; "sessions is not a metric" | §13, §15 |
| `SERVICE_PAGE_SPEC.md` | Parent template; banned components; §3.1 no guarantees; §3.3 no prices | §3, §4, G10, G12 |
| `assets/js/main.js` | `link_section` derived from `closest("section[id]").id` | §4 IDs, §14, §15 |
| `evidence/…/ga4-custom-dimensions.md` | The five dimensions §15 depends on | §15 |
| `netlify.toml` | Routing guards; `/docs/*` publish block | §9 |
| `sitemap.xml` | Priority ladder | §7 |
| `docs/knowledge/INTERNAL_LINKING.md` | Anchor-text prohibitions | §7 |
| `assets/css/style.css` | Every component in §4 | §4, §12 |

**Downstream:** the six future Near Me pages inherit from here (§16). Amending a **frozen** element obliges retrofitting every page already built — see §19.

---

## §1 · PAGE OWNERSHIP

Every page on this site owns exactly one user intent. **Before writing any new content, find its owner here.** If content does not fit an owner, it does not belong on the site.

| Page / family | Owns | Answers | Never covers |
|---|---|---|---|
| **Homepage** `/` | **Discovery** | *Who are you, what do you offer, can I trust you?* | Deep service detail; logistics; education |
| **`/services/`** | **Comparison** | *Which of the seven do I need?* | Individual service depth; logistics |
| **`/services/{slug}`** | **Service understanding** | *What is this service, who is it for, what does the charge depend on?* | Local logistics; education; comparison across services |
| **`/{service}-near-me/`** | **Local availability + operational logistics** | *Can you help today, reach me, and what happens next?* | What the service is; pricing factors; who it's for |
| **`/knowledge/`** | **Education** | *How do I prepare, decide, and judge?* | Selling; logistics; service definition |
| **`/about/`** | **Company identity + verification** | *Who runs this and how do you vet people?* | Service detail; logistics |
| **`/careers/`** | **Recruitment** | *Can I work here?* | Anything customer-facing |
| **`/terms/`, `/privacy-policy`** | **Legal + policy** | *What am I agreeing to?* | Marketing of any kind |

**Rule:** content may be *referenced* across owners by link. It may not be *restated*.

---

## §2 · OBJECTIVE

> **`/services/patient-care` answers:** *"What is this service, and is it right for us?"*
> **`/patient-care-near-me/` answers five operational questions the service page does not:*

| ID | Question |
|---|---|
| **Q1** | Can you help me **today**? |
| **Q2** | Can you reach **my location**? |
| **Q3** | How does **availability** work? |
| **Q4** | What happens **after I contact you**? |
| **Q5** | What should I **do next**? |

**Acceptance rule:** every slot maps to ≥ 1 question. **A slot mapping to none is cut.**

### Search intent

| Intent | Target | Owner if not this page |
|---|---|---|
| Informational | ❌ | `/knowledge/patient-care/` |
| Commercial investigation | 🟡 secondary | `/services/patient-care` |
| **Local / transactional** | ✅ **primary** | — |

**Visitor model:** mobile, already decided, time-pressured, frequently at or near a hospital. **Converts by phone, not by reading.**

---

## §3 · CONTENT BOUNDARY MATRIX

**The permanent anti-duplication reference.** Consult before writing a single sentence.

| Topic | Owner page | Near Me allowed? | Action on Near Me page |
|---|---|---|---|
| **Service scope** (what's included/excluded) | `/services/patient-care` | ❌ **No** | Link only |
| **Pricing factors** | `/services/patient-care` | ❌ **No** | Link only. Never restate the four factors |
| **Who the service is for** | `/services/patient-care` | ❌ **No** | Link only |
| **Nurse vs caregiver distinction** | `/services/patient-care` | ⚠️ **One line max** | Disambiguation only, in §4 N12. Never a section |
| **The 5-stage arranging journey** | `/services/patient-care` | ❌ **No** | Link only |
| **Areas-served chip grid** (`.area-grid`) | `/services/patient-care` | ❌ **BANNED COMPONENT** | Coverage handled differently — §4 N4 |
| **Coverage depth** (routine vs confirm-first) | **Near Me** | ✅ **Owns** | Full treatment |
| **Local logistics / navigation** | **Near Me** | ✅ **Owns** | Full treatment — exists nowhere else |
| **Availability mechanics** (today vs standard, factors) | **Near Me** | ✅ **Owns** | Full treatment |
| **Post-contact operational sequence** | **Near Me** | ✅ **Owns** | Full treatment. Distinct from the arranging journey |
| **Short-notice limits** | **Near Me** | ✅ **Owns** | D5 boundary, plainly stated |
| **Verification process** | `/about/` (full) · service page (evidence block) | ⚠️ **5 lines max** | Condensed + deep link to `/about/#verification`. Ordered as the real sequence: identity → address → background/references → experience matching → replacement. Never the 6-item evidence grid. The experience-matching line **MUST** be service-specific (§3.1) |
| **Replacement commitment** | `/services/patient-care` | ⚠️ **One clause** | May appear inside a logistics sentence only |
| **Education / how to prepare** | `/knowledge/patient-care/` | ❌ **No** | Link only |
| **Company story, founder, team** | `/about/` | ❌ **No** | Link only |
| **FAQs** | Distributed | ✅ **5–6 unique** | Logistics only. Unique against the existing site corpus **and** against every sibling Near Me page (§10) |
| **Trust claims** (counts, years, awards) | Nowhere — none verified | ❌ **No** | Prohibited site-wide |

---

## §3.1 · DIFFERENTIATION CONTRACT

**Purpose.** Seven pages sharing one slot skeleton is structurally close to the doorway pattern G1 and G2 already prohibit. The skeleton stays fixed — that is the architecture. What must not be shared is the *prose inside it*.

**The governing test — the independent-value test:**

> If a page's mandatory-unique sections could be produced by find-and-replacing the service name on a sibling Near Me page, **that page MUST NOT be built.** Each Near Me page has to earn its URL by being independently useful to a family, not by being another keyword variation.

This test is normative. It is evaluated at Gate 2 and a failure cancels the page rather than triggering a rewrite loop.

### The three-section intent floor

Overlap percentages measure *wording*. They do not measure *purpose* — a page can clear every numeric threshold by paraphrasing a sibling while saying nothing new. The following rule protects intent directly:

> Every Near Me page **MUST** carry **at least three sections whose primary purpose is service-specific** — sections that exist because *this* service creates a question no other service creates. A section whose purpose survives a service-name find-and-replace does not count toward the three, however differently it is worded.

**How to judge it.** Ask of each candidate section: *if I swapped the service name and changed nothing else, would this section still make sense?* If yes, it is a shared-purpose section. Shared-purpose sections are permitted and often necessary — but three sections **MUST** fail that swap test.

**Worked example — `/patient-care-near-me/` (reference implementation):**

| Section | Survives a service-name swap? | Counts? |
|---|---|---|
| `#availability` — discharge timing drives urgency | ❌ No. A cook is not arranged against a hospital discharge | ✅ |
| `#nearest-vs-suitable` — proximity vs condition-matched experience | ❌ No. For housekeeping, nearest genuinely is best | ✅ |
| `#short-notice-limits` — verification cannot be skipped to meet a discharge deadline | ❌ No. Nothing about housekeeping creates that tension | ✅ |
| `#verification` — experience matching, mobile vs bedbound | ✅ Yes — purpose survives (see v1.8 note). Only bullet 4 differs | — |
| `#coverage` — six localities, travel reliability | ✅ Yes — shared purpose | — |
| `#finding-you` — landmark-based address finding | ✅ Yes — shared purpose | — |

**Three qualifying sections. Floor met.**

**Second worked example — `/elder-care-near-me/`:**

| Section | Survives a service-name swap? | Counts? |
|---|---|---|
| `#availability` — duration, not speed; will the daily journey survive month eight | ❌ No. A cleaner is replaceable; an elderly parent settling in again is not | ✅ |
| `#nearest-vs-suitable` — the parent has to accept the person, not just the family | ❌ No. Nobody needs to bond with a cook | ✅ |
| `#short-notice-limits` — the Elder Care / Patient Care boundary, and no multi-year personnel promise | ❌ No. The boundary exists only between these two services | ✅ |

**Three qualifying sections. Floor met.** Measured against patient-care: `__ALL__` 5.7%, every mandatory-unique section 0.0–4.1%, FAQ question overlap 0%, longest shared sentence none. A page that cannot reach three is not a distinct page — it is the parent service page with a proximity framing, and **MUST NOT** be built (G16).

### 🔴 MANDATORY UNIQUE — content MUST be written from scratch per service

| Area | Slot · `section[id]` | Pairwise budget | What makes it genuinely different |
|---|---|---|---|
| **Hero** | N2 · `#…-near-me-hero` | **< 10%** | Lede names this service's actual first question. Four chips carry service-specific facts, not generic reassurance |
| **Local intent explanation** | N4 · `#coverage` | **< 10%** | Why proximity matters *for this service* — daily continuity differs sharply between 24-hour care and a weekly clean |
| **Operational process** | N5 · `#finding-you` + N6 · `#after-contact` | **< 10%** | What we ask for and what happens next. A cook's start differs from a night nurse's |
| **Decision guidance** | N7 · `#short-notice-limits` + N8 · `#nearest-vs-suitable` | **< 10%** | The trade-off a family actually faces. "Nearest vs most suitable" means something different for each service |
| **FAQ** | N11 · `#faq` | **0%** question overlap · **< 10%** answer overlap | Every question service-specific. See §10 |
| **Verification considerations** | N9 · `#verification` | **exempt — structural rule below** | The *process* is identical across services and MUST NOT be reinvented. See the v1.8 measurement note |
| **Related services** | N12 · `#other-services` | **< 15%** | Adjacencies differ per service. Framing sentences may partially recur; the routing set MUST NOT |

**Note on the 15% allowance.** Service routing is deliberately looser because forcing it below 10% would push a writer toward inventing distinctions that do not exist — the exact failure mode `PROJECT.md` §7 prohibits. A genuine shared fact stated plainly is preferable to a manufactured difference. *(Measured: elder-care vs patient-care `#other-services` = 0.6%. The allowance is comfortable.)*

### ⚠️ v1.8 measurement note — `#verification` is exempt from the wording budget

The v1.6–1.7 spec set `#verification` at **< 15%**. Building the second page measured it at **64.2%**, and investigation showed the page was right and the threshold was wrong.

N9 carries five bullets. **Four state verified facts that are identical for every service** — identity checked in person, address proof verified, background and references completed before confirmation, replacement is our job. These are sourced from `/about/#verification`. Rewording them per page to depress a percentage would manufacture difference, and would drift from what `/about/` actually says. §3.1 already prohibits exactly that.

**Structural rule, replacing the percentage:**

| Bullet | Rule |
|---|---|
| 1 Identity · 2 Address · 3 Background and references · 5 Replacement | **MUST** be stated identically across all seven pages. Paraphrase is a defect, not a differentiator |
| **4 Experience matching** | **MUST** be service-specific, **0% 8-gram overlap** against every sibling. This is the only differentiating line and the only one measured |

**`#verification` MUST NOT count toward the three-section intent floor.** Its purpose — reassure the reader that people are checked — survives a service-name swap intact. Only bullet 4 does not, and one line is not a section.

### 🟢 SHARED WORDING PERMITTED — reuse is correct, not lazy

| Shared | Why |
|---|---|
| Global header, nav, breadcrumb trail, footer | Structural components. Identical by design |
| Sticky call bar · floating WhatsApp | Global conversion components |
| **N10 mid-CTA · N13 final CTA** | Conversion consistency is a feature. Vary only the pre-filled WhatsApp service token |
| Hero chip **structure** (4 chips) | Structure shared · chip **text** is mandatory-unique |
| Schema skeleton — node types, `publisher`/`about` `@id` pattern, breadcrumb depth | §6 is frozen |
| **Factual constants** — phone number, WhatsApp URL, the six locality names, business name, "Kota" | Repeating a fact is not duplication. Never paraphrase these to game a metric |

### 📏 DUPLICATION BUDGET — measured, not estimated

Measured as **8-gram (shingle) overlap** on `<main>`, excluding the 🟢 shared components above. Automated at Gate 2 for **every pair** of built Near Me pages.

| Scope | Threshold | Strength |
|---|---|---|
| Any two Near Me pages, whole `<main>` | **< 20%** | **MUST** |
| Any 🔴 mandatory-unique section, pairwise | **< 10%** (verification, related services: **< 15%**) | **MUST** |
| Longest shared sentence between any two Near Me pages | **≤ 12 words**, excluding factual constants | **MUST** |
| FAQ question text across the family | **0 repeats** | **MUST** |
| FAQ answer text, pairwise | **< 10%** | **MUST** |
| Near Me page vs its parent service page | **< 15%** | **MUST** (unchanged) |

**On breach:** the offending section is rewritten. If it cannot clear the budget without inventing service distinctions that are not real, **the page is cancelled** (G14 logic — cancel rather than pad, cancel rather than fabricate).

**Reference implementation.** `/patient-care-near-me/` is the baseline every sibling is measured against. Its five FAQs were selected on 2026-08-04 specifically because none of them clone onto another service.

---

## §4 · SLOT STRUCTURE — NEAR-ME TEMPLATE v1

**Section `id` values are binding.** `main.js` derives the GA4 `link_section` parameter from `element.closest("section[id]").id`. **Renaming a section id silently renames a GA4 dimension value and breaks historical comparison.** IDs below are part of the frozen contract.

| Slot | `section[id]` | Section | Answers | Component (all existing) | Collision control |
|---|---|---|---|---|---|
| **N1** | — | Breadcrumb | — | `nav.breadcrumb`, **4 items** | Home › Services › Patient Care › Patient Care Near Me |
| **N2** | `near-me-hero` | Hero | Q1 Q2 Q5 | `.hub-hero` + `.hub-hero-inner` + **`.hub-hero-actions`** + `.hero-indicators` | New composition. No image. See §5. **DOM order is binding — actions BEFORE indicators (v1.9)** |
| **N3** | `availability` | Today vs standard + what governs it | Q1 Q3 | `.section-header` + `.pricing-factors` | Component reused for *availability* factors; service page uses it for price |
| **N4** | `coverage` | Coverage in depth | Q2 | `.scope-grid` + 2 × `.scope-col` | **`.area-grid` banned** |
| **N5** | `finding-you` | How we find you | Q2 | `.evidence-grid` + 5 × `.evidence-item` | Operational; unique site-wide. **Gated by P2** |
| **N6** | `after-contact` | What happens after you contact us | Q4 | `.process-grid` + 4 × `.process-card` | Plain `.process-grid` (4 cards). Service page uses `.journey-grid` (5). Different modifier, count, content |
| **N7** | `short-notice-limits` | What we cannot do at short notice | Q1 Q3 | `.scope-col.scope-col--boundary` + `.scope-col-note` | D5 boundary |
| **N8** | `nearest-vs-suitable` | Nearest ≠ most suitable | reframe | `.decision-aid` | Exactly one sibling link → service page |
| **N9** | `verification` | Verification, condensed | trust | `.scope-col` + `.service-points` (5, in process order) | **Not** the 6-item evidence block. Experience-matching line is service-specific (§3.1). **No inline `<strong>` or `<a>` inside these `<li>`** — see §12 |
| **N10** | `mid-cta` | Mid CTA | Q5 | `.cta-band` + `.cta-band-inner` + `.cta-band-actions` | Trust precedes ask (§12 PROJECT.md) |
| **N11** | `faq` | FAQ — 5–6 unique | Q1–Q4 | `.section.faq-section` + `.faq-list` + `.faq-item` (`<details>`/`<summary>`) | Mirrored 1:1 by `FAQPage` |
| **N12** | `other-services` | **Need a different service?** | routing | `.services-grid` + 4 × `.service-card` **+** `.scope-col--boundary` | **Two-part** — see below |
| **N13** | — | End CTA | Q5 | `.prefooter-section` + `.prefooter-inner` + `.prefooter-actions` | Tier-1 pair + form path |

**Zero new components · zero new CSS · zero new design tokens · zero new images.**

**Content budget: 1,000–1,400 words in `<main>`, measured EXCLUDING the `.faq-list` block.** Below 1,000 the page is thin — **cancel rather than pad.**

> **v1.5 correction — measurement basis.** The v1.0–1.4 budget said "1,000–1,300 all-in" and was benchmarked against the service page at *"~1,400 words"*. Two errors: the service page is actually **1,569** all-in, and the all-in basis is incompatible with §10, which mandates **10 FAQs** where the service page carries 6. A 10-answer FAQ block runs ~700 words on its own, so an all-in ceiling of 1,300 could only be met by breaching the FAQ mandate or by gutting the operational content this page exists to carry — the two requirements contradicted each other. *(v1.6 note: §10 now mandates 5–6 FAQs, which removes the original pressure. The excluding-`.faq-list` measurement basis is retained regardless, so the budget measures operational substance rather than answer volume.)*
>
> **Corrected basis, for comparison:**
>
> | Page | All-in | Excl. FAQ | FAQ block |
> |---|---:|---:|---:|
> | `/services/patient-care` | 1,569 | 1,144 | 425 |
> | `/patient-care-near-me/` | 2,082 | **1,366** | 716 |
>
> The FAQ block is sized by the §10 question count, not by editorial choice, so it is measured separately. **The floor remains a MUST (G14); the ceiling remains a SHOULD.**

### N5 — How we find you (5 items)

Landmark-based directions · hospital as reference point (discharge cases) · colony/locality resolution · **share your location on WhatsApp** (pin or live) · phone guidance on the day.

> **⚠️ P2 gate.** *"WhatsApp has a location-share feature"* is a fact about WhatsApp. *"We use the pin to navigate"* and *"the caregiver calls when close"* are claims about **us**. Both require owner confirmation. Unconfirmed items are removed.

### N12 — Two-part routing block

**Part 1 — services we do provide.** `.services-grid` + 4 × `.service-card`, linking to canonical pages using **exact §5 names**:
`Elder Care` · `Mother & Newborn Care` · `Child Care` · `Maid Services`

Plus **one disambiguation line**: qualified nurses are arranged *within* Patient Care → link to `/services/patient-care`.

**Part 2 — things we do not arrange.** `.scope-col--boundary`, naming honestly and pointing to the right kind of provider:
ICU / high-dependency setup · physiotherapy · diagnostic tests and sample collection · medical equipment supply, rental or maintenance · ambulance and emergency response

> **Why Part 2 exists:** a visitor needing an ICU setup will bounce regardless. Saying so plainly costs nothing, mirrors what the service page already does, protects operator time (an explicit `LOCAL_SEO_MASTER_PLAN` metric), and earns goodwill that produces referrals.

> **🚫 Constitutional:** ICU Care, Physiotherapy, Medical Equipment and "Nursing Care" **are not services** (`PROJECT.md` §5, §19). They may appear on this page **only** as exclusions. Creating a page for any of them violates the Rule of Truth.

### Banned on every Near Me page

`.area-grid` / `.service-area-section` · `.journey-grid` · the 6-item `.evidence-grid` trust block · `.hero-section` with a service-page image · `.related-grid` · any restatement of scope, pricing, or who-it's-for.

---

## §5 · HERO DECISION RECORD

Four options evaluated against the constraint that **the business has zero photographs of itself** — no team, no office, no real placements. `/about/` deliberately ships without imagery for this reason.

| Option | Verdict |
|---|---|
| A — plain text-only `.hub-hero` | Differentiates, but commercially thin for a landing page |
| B — `.hero-section` + new photograph | **Impossible today.** No real asset. Stock contradicts the site's documented stance |
| C — `.hero-section` + `caregiver-optimized.jpg` | Trades service-page duplication for **homepage** duplication. Net-neutral |
| **D — `.hub-hero` + `.hero-indicators`** | ✅ **ADOPTED** |

**Verification:** `.hero-indicators` is **not scoped** to `.hero-section` — the CSS selector is bare (`max-width: 680px; margin: 24px 0 0`). It fits inside `.hub-hero-inner` (760px). **No CSS change required.**

**Composition:** eyebrow → H1 → lede → 4 × `.hero-indicators` chips → `.hub-hero-actions`.

**Rationale:** the chips answer Q1–Q3 at a glance, before any scroll. On a page whose job is *"can you help me today,"* information outperforms atmosphere. No page currently pairs `.hub-hero` with `.hero-indicators`, so it differentiates from both the service page and the homepage.

**Upgrade path:** once the GBP exists and authentic office/team photography is taken, promote to `.hero-section`. Requires a v2 amendment to this spec. **Not a launch blocker.**

---

## §6 · SCHEMA STRATEGY

| Node | Include | Detail |
|---|---|---|
| `BreadcrumbList` | ✅ | 4 items, mirrors the visible trail **exactly** |
| `WebPage` | ✅ | `@id` `…/patient-care-near-me/#webpage`; `publisher` + `about` → `@id` refs; `inLanguage: en-IN`; `areaServed` |
| `FAQPage` | ✅ | 10 questions, **verbatim** mirror of the visible `<details>` |
| `LocalBusiness` | ❌ | `PROJECT.md` §7: **one canonical entity**. Reference `…/#business` by `@id` only |
| `Service` | ❌ | Canonical `Service` lives on the service page. Reference `…/services/patient-care#service` (P1) |

**Binding conventions:**
- JSON-LD is raw JSON inside `<script>`. The HTML parser does **not** decode entities. **Ampersands must be `&`, never `&amp;`.**
- `FAQPage` questions must be unique site-wide. Google merges duplicates and may suppress both pages.

**Cross-document note:** the 4-item breadcrumb removes the "breadcrumb depth 4 = knowledge article" uniqueness noted in `docs/TYPOGRAPHY_REFINEMENT_PLAN.md` §3. That selector was already rejected in favour of `.container > h3 ~ p`, so there is no live impact — but correct that document when the first Near Me page ships.

---

## §7 · INTERNAL LINKING

```
Homepage
 └─ /services/
      └─ /services/patient-care          ← primary authority
           └─ /patient-care-near-me/     ← satellite, links UP
```

| Direction | Target | Rule |
|---|---|---|
| Inbound | `/services/patient-care` → this page | **One** contextual link, in its areas-served section. The only in-content inbound |
| Inbound | Nav / footer | ❌ **None.** Global placement signals parity with the seven services |
| Inbound | Sitemap | priority **0.6** (service pages are 0.9) |
| Outbound | `/services/patient-care` | 2–3 contextual (N8, N9, N12) |
| Outbound | `/knowledge/patient-care/` | 1 — informational drift |
| Outbound | 4 sibling services | N12 Part 1 |
| Outbound | `/about/` | 1 — verification depth |
| Outbound | `/#inquiry` | CTA |

**Anchor text:** descriptive and varied. **Never** exact-match `"patient care near me"`. Forbidden per `INTERNAL_LINKING.md` §3: "click here", "read more", bare URLs.

---

## §8 · LOCAL SEO

| Element | Implementation | Guard |
|---|---|---|
| City | Title, H1, body, `areaServed` — **never the URL** | URL carries a proximity modifier, not a place name |
| Localities | The six used site-wide, **once each, in prose** | ❌ No repeated lists for density |
| Landmarks | Navigation aids only (N5) | ❌ Never *"patient care near [Hospital]"*. Never as headings |
| `"near me"` | **≤ 3× visible body, ≤ 1× any heading** | Above that reads as stuffing |

**Bright line:** if a section could be copy-pasted with one locality name swapped and still make sense, it is doorway content and **must be deleted**.

---

## §9 · METADATA

| Element | Spec |
|---|---|
| URL | `/patient-care-near-me/` — directory index, **trailing slash** |
| Routing | 2 guards: `/…/index.html` and `/…/index` → 301 → `/…/`. Slash-less form **not** guarded (commit `22f85a6`) |
| Title | 48–58 chars. Local phrase once. Must differ substantively from the service page title |
| Description | 146–160 chars. Describes **reach and response**, not the service |
| H1 | Exactly one. States the proximity proposition |
| Canonical | Self-referential |
| OG / Twitter | **8 OG + 5 Twitter**, incl. `og:image:alt` + `twitter:image:alt`. Image: `logo-optimized.png` |
| GA4 | `G-NT5DDR1ET5` gtag block — mandatory |
| Assets | Root-relative; `?v=` token matching site-wide |

**Known platform issue:** Netlify strips trailing slashes on directory indexes in production — verified on `/services/`, `/careers/`, `/knowledge/patient-care/`. Canonical declares the slash; served URL omits it. **Pre-existing and site-wide.** Do not special-case this page.

---

## §10 · FAQ — 5–6 questions, logistics only

**Standard: 5–6 questions per page.** More is permitted only where a service genuinely produces more questions that pass every test below — the burden is on the extra question to justify itself, not on the editor to justify cutting it.

The target is **not** FAQPage rich results. Google restricted those in 2023 to authoritative government and health sources; a local home-care business gets no SERP feature from this markup. The markup stays because it is accurate and cheap. The block exists for one reason only: **to answer what a family would otherwise have to phone and ask.**

### Admission tests — a question ships only if it passes all five

| # | Test | Fails when |
|---|---|---|
| **F1** | Answers a real concern a family actually raises | Written to host a keyword |
| **F2** | Specific to **this** service | The answer would read identically on a sibling Near Me page |
| **F3** | Adds value the body does not already carry | **No FAQ may substantially repeat the primary message of a body section.** If a body section already answers it, the FAQ either adds something genuinely new or is removed. Restating a section in question form is padding |
| **F4** | Not generic filler | Could appear on any home-services site anywhere |
| **F5** | Answerable honestly today | Honest answer is *"we don't know yet"* — **cut, not softened** |

**F2 is the anti-doorway control and the most common failure.** Coverage lists, "how do I describe my location", and "do you cover unlisted areas" all fail F2 — they are page-family questions, not service questions, and they belong in a body section written once.

### Reference implementation — `/patient-care-near-me/`, 5 questions

Reduced from ten on 2026-08-04. Retained:

1. What if I am just outside Kota city limits? — *F2 via daily-continuity requirement*
2. My relative is being discharged tonight. What can you realistically do? — *discharge is unique to patient care*
3. Does the charge change if I am further from your office? — *cost drivers are service-specific*
4. Does the caregiver travel daily, or stay at the house? — *live-in vs day duty*
5. I am arranging this from another city. Can you start before I arrive? — *remote adult children; strong local reality*

Cut, with reason: *"Which areas can you reach"* (F2, F3 — `#coverage` owns it) · *"Can someone start today"* (F3 — `#availability` + `#short-notice-limits` own it) · *"How do I describe my location"* (F2, F3 — `#finding-you` owns it) · *"Is availability different by area"* (F2, F3) · *"Do you cover unlisted areas"* (F3 — restates Q1).

**Uniqueness:** every question **MUST** be unique against the existing site corpus **and** carry 0% question-text overlap with every sibling Near Me page (§3.1).

**Schema:** the `FAQPage` node mirrors the visible block **1:1** — same count, same wording. Changing one without the other is a release blocker (Gate 5).

---

## §11 · CONVERSION & CTA

| Tier | CTA | Placement | Rationale |
|---|---|---|---|
| **Primary** | Call `tel:+918302482096` | N2, N10, N13, sticky mobile bar | Highest-intent visitor on the site. Do not make them read |
| **Secondary** | WhatsApp, pre-filled with service + location context | Beside every call CTA + floating button | Dominant channel; works from a hospital corridor |
| **Final** | Form via `/?service=Patient%20Care#inquiry` | N13 only | Non-urgent researcher; out-of-city family member |

Call and WhatsApp weighted **equally**; both above the fold on mobile (`PROJECT.md` §12). CTA weight shifts from immediate to considered as urgency drops with scroll depth.

---

## §12 · MOBILE

Inherits every approved mobile rule. **No new CSS.**

| Component | ≤ 640px |
|---|---|
| `.container` | 336px at 360px viewport |
| `.hub-hero` | reduced padding (existing override) |
| `.hero-indicators li` | full width, stacked |
| `.scope-grid`, `.evidence-grid` | 1 column |
| `.process-grid`, `.services-grid` | 2 col @980 → 1 col @640 |
| `.service-points li` | block flow + hanging indent |
| `.floating-whatsapp` | 98px — clears the sticky call bar |

**Requirement:** H1 + both Tier-1 CTAs visible without scrolling at 360 × 640.

> **v1.9 clarification — what satisfies this.** The requirement is met by the **in-hero `.hub-hero-actions` buttons only**. The sticky mobile call bar and the floating WhatsApp button are persistent global components and **MUST NOT** be counted toward it. They are additional affordances, not a substitute for the hero's own call to action.
>
> **Why this needed saying.** Gate 6 measured all seven pages failing this MUST at 360×640, and §11 — which lists the sticky bar and floating button as Tier-1 delivery points — could be read as excusing it. That reading is rejected. A visitor who lands on the page must see the page's own CTA, not only the furniture that appears on every page of the site.
>
> **Root cause and fix.** `.hero-indicators` occupies 190px when its four chips stack below 640px. With the v1.0–1.8 DOM order (indicators before actions) the buttons were pushed 90–353px below the fold on every page. §4 N2 now mandates **actions before indicators**. The chips are unchanged — same four, same text, same position in the visual hierarchy relative to everything else, simply after the buttons rather than before them.

### ⚠️ Inline elements inside `.service-points li` — known constraint

`.service-points li` is `display: flex; align-items: center` **above 640px**. A flex container turns every in-flow child into its own flex item, so an inline `<strong>` or `<a>` inside one of these `<li>` becomes a **separate column** rather than part of the sentence. The `display: block` correction in `style.css` is scoped to `@media (max-width: 640px)` **only** — desktop is unmodified by design (the fix was mobile-scoped and approved as such).

**Rule for Near Me pages:** `.service-points li` **MUST** contain plain text only. Express emphasis or step labels with wording and punctuation — `Identity — government photo identity is checked…` — never with `<strong>`. Widening the mobile fix to all breakpoints is an architecture-review change (§14) and is **not** authorised by this spec.

---

## §13 · SEO GUARDRAILS

**Architectural rules, not recommendations. Violating any of these invalidates the page.**

| # | 🚫 Never | Why |
|---|---|---|
| **G1** | Create city × locality pages | `PROJECT.md` §7 hard prohibition; doorway pattern |
| **G2** | Create service × hospital or service × landmark pages | Doorway pattern; `LOCAL_SEO_MASTER_PLAN` Appendix A |
| **G3** | Create more than **one** Near Me page per canonical service | Internal cannibalisation; ceiling is seven (§16) |
| **G4** | Create a Near Me page for a non-service (ICU, physiotherapy, equipment, "nursing care") | `PROJECT.md` §5 Rule of Truth, §19 |
| **G5** | Duplicate any service-page heading verbatim | Duplicate-content signal; §3 matrix |
| **G6** | Optimise for keyword density | §7 hard prohibition. `"near me"` ≤ 3× body, ≤ 1× heading |
| **G7** | Use exact-match anchor text for the target phrase | Clearest doorway signal |
| **G8** | Place a Near Me page in global nav or footer | Signals parity with canonical services |
| **G9** | Emit a second `LocalBusiness` or `Service` node | Entity fragmentation; NAP damage |
| **G10** | Publish response-time **guarantees** | D5-gated; `SERVICE_PAGE_SPEC` §3.1 |
| **G11** | Publish counts, years, awards, certifications, insurance | None verified. Site-wide prohibition |
| **G12** | Publish prices or price schema | `SERVICE_PAGE_SPEC` §3.3 — no prices, ever |
| **G13** | Use superlatives — "nearest", "fastest", "best", "No.1" | Unverifiable; §11 identity |
| **G14** | Ship below the word floor by padding | Thin content. Cancel instead |
| **G15** | Reuse `.area-grid` or `.journey-grid` | Reserved to the service page |
| **G16** | Ship a page that breaches the §3.1 duplication budget, or whose unique sections are a service-name find-and-replace of a sibling | The doorway pattern G1–G2 prohibit, arriving through the back door. Cancel rather than pad or fabricate |

---

## §14 · CONTENT GOVERNANCE

### ✅ Editors may change freely — no architecture review

- FAQ **answers** (wording, accuracy, corrections)
- Coverage wording within N4
- Availability wording within N3
- CTA button **copy** (not placement, not tier)
- Internal link **anchor text** (within §7 rules)
- N5 logistics wording, provided P2-verified claims stay true
- Typo, grammar and tone corrections anywhere
- `lastmod` in `sitemap.xml`

### 🔒 Architecture review required — owner approval before work

- **Adding, removing or reordering any slot** (N1–N13)
- **Changing any `section[id]`** — breaks GA4 `link_section` continuity
- Changing which **component** a slot uses
- Adding a **new schema type** or a second entity node
- Adding, removing or **re-tiering a CTA**
- Changing **internal-link topology** (new inbound source, nav/footer placement, sitemap priority)
- Changing the **canonical URL** or routing guards
- Adding a **new page relationship** or a new Near Me page
- Any change to §13 guardrails
- Any new **image** or design-system component
- Raising or lowering the **word budget** or duplication threshold

### Change record

Every architecture-review change appends a row: date · what changed · who approved · which spec section was amended.

---

## §15 · SUCCESS METRICS

> 🚫 **Explicitly NOT a success metric: total sessions.** Per `LOCAL_SEO_MASTER_PLAN`: *"vanity traffic in this category is worse than no traffic — it consumes operator time answering calls we cannot serve."*

### ⚠️ Measurement prerequisite

**0 of 5 GA4 custom dimensions are registered** (`evidence/2026-07/P3-measurement-layer/ga4-custom-dimensions.md`). Until `service`, `urgency`, `link_section`, `failure_type` and `method` are registered, **every event arrives unattributable and GA4 dimensions are not retroactive.** Register before launch or the launch is unmeasurable.

### Metrics

| # | Metric | Source | Baseline | Review |
|---|---|---|---|---|
| **M1** | Organic **impressions** for `"…near me"` queries | Search Console — page filter | 0 | 30 / 60 / 90 d |
| **M2** | **CTR** from those impressions | Search Console | — | 90 d |
| **M3** | **Query growth** — distinct queries surfacing the page | Search Console | 0 | 90 d |
| **M4** | **`call_click`** events, `link_section` on this page | GA4 | 0 | Monthly |
| **M5** | **`whatsapp_click`** events, `link_section` on this page | GA4 | 0 | Monthly |
| **M6** | **`inquiry_form_submitted`** with `service = Patient Care` originating here | GA4 | 0 | Monthly |
| **M7** | **Average engagement time** | GA4 | — | 90 d |
| **M8** | **Bounce / no-engagement rate** | GA4 | — | 90 d |
| **M9** | **Internal navigation to `/services/patient-care`** — the page routing correctly rather than dead-ending | GA4 page-path flow | — | 90 d |
| **M10** | **Lead-to-placement rate** for leads attributed here | Business lead log (A-38) | — | Quarterly |

### Interpretation rules

- **M10 governs.** High M4/M5 with low M10 means the page is attracting **unservable** demand — the failure mode `LOCAL_SEO_MASTER_PLAN` warns about. Fix by tightening N7 limits, not by chasing traffic.
- **M9 low** means the page dead-ends. Fix N8/N12 routing.
- **M1 flat at 90 days** most likely reflects the missing GBP (§0), not the page. Do not respond by building more Near Me pages.
- **Kill criterion:** if at 180 days M1 is negligible **and** M10 is below the site average, the page has not earned its canonical URL. Retire it rather than optimise it.

---

## §16 · INHERITANCE CONTRACT

Future Near Me pages inherit this specification. **Hard ceiling: seven pages, one per canonical service.** Any locality dimension is the `SERVICE_PAGE_SPEC` §4.8 city × service prohibition and is refused (G1, G2).

### 🔒 FROZEN — identical on every Near Me page

| Frozen | Detail |
|---|---|
| **Layout** | Slots N1–N13 |
| **Slot order** | Exactly as §4. No insertion, removal or reordering |
| **Section IDs** | The `section[id]` values in §4 — GA4 attribution keys |
| **CTA hierarchy** | Call = primary · WhatsApp = secondary, equal weight · form = final, N13 only |
| **Schema strategy** | `BreadcrumbList` + `WebPage` + `FAQPage`. Never `LocalBusiness`, never `Service` |
| **Internal-linking philosophy** | Satellite links up; one in-content inbound from its parent service page; never in nav or footer; sitemap 0.6 |
| **Design system** | Components in §4 only. Zero new components, CSS, tokens or images |
| **Mobile behaviour** | §12 in full |
| **Metadata shape** | §9 lengths, tag counts, canonical form, routing guards |
| **SEO guardrails** | §13 G1–G16 |
| **Governance model** | §14 |
| **Definition of Done** | §17 |

### 🔄 MAY VARY — per service

| Variable | Constraint |
|---|---|
| Service name and slug | Exact `PROJECT.md` §5 canonical name |
| Breadcrumb leaf | Matches the service |
| **Service-specific logistics** (N5, N6) | Must be genuinely different; a cook's logistics ≠ a nurse's |
| **Coverage wording** (N4) | Same six localities; service-specific nuance |
| **Availability wording** (N3) | Service-specific realities |
| **5–6 FAQs** (N11) | **Must pass F1–F5 (§10).** If a service cannot produce **five** questions that pass every test, **that page is not built** |
| **Related services** (N12 Part 1) | 4 genuine adjacencies for that service |
| **Non-services list** (N12 Part 2) | Service-appropriate exclusions |
| **Decision Aid copy** (N8) | Service-specific reframe + one sibling link |
| Hero chips (N2) | 4 chips, service-appropriate |

### Build sequence

**Superseded at v1.6 by owner direction.** The v1.0–1.5 rule was strictly serial: ship one page, wait 90 days for Search Console data, then consider the next.

**Current rule — parallel build behind a publication gate:**

1. The remaining six pages **MAY** be built as one body of work against this specification.
2. Every page **MUST** pass §17 individually. No page inherits another's certification.
3. The **whole family MUST** pass the §3.1 pairwise duplication budget before any of them is indexed — this is a family-level gate, not a per-page one.
4. Pages built ahead of the review cycle **MUST** ship `noindex` (or stay unmerged) until the family gate passes. A page that is live and indexed is a page that cannot be quietly fixed.
5. `/patient-care-near-me/` remains the reference implementation. Improvements found while building siblings **MUST** be back-propagated to it, and the change recorded here.

**Rationale, recorded so it is not re-argued:** serial building was the safer SEO posture but guaranteed template drift — six pages written months apart against a spec that had moved would diverge in exactly the ways this document exists to prevent. Building together and gating publication keeps the architecture consistent while preserving the ability to withdraw the pattern before it is ever exposed.

**Unchanged:** the GBP prerequisite (§0, and the strategic note at P2). Near-me queries resolve primarily through Google Business Profile proximity. Building all seven pages does not change that, and none of them should be mistaken for the near-me strategy.

---

## §17 · DEFINITION OF DONE

**The official release gate for every Near Me page.** All gates must pass. Any failure blocks release.

### Gate 1A — Repository prerequisites *(blocks the build)*
- [ ] P0 `PROJECT.md` amendment approved and committed
- [ ] P1 `@id` present on the parent service page's `Service` node
- [ ] Governing spec frozen; no competing planning documents

### Gate 1B — Business verification *(does not block the build; blocks specific content only)*
- [ ] P2 process claims answered `YES` / `NO` / `PARTIAL` and recorded in the §0 register
- [ ] Any item answered `NO` deleted from the page and struck from the register
- [ ] Items still unanswered present **only** as HTML comment markers — no visible placeholder

> **Separation of concerns.** Gate 1A is engineering readiness — the repository either is or is not ready, and that is knowable without asking anyone. Gate 1B is business fact, knowable only by the owner. A page **MAY** be built, reviewed and merged with Gate 1B partially open, provided every unanswered item is absent from the rendered page.

### Gate 1C — Measurement *(recommended before production launch, not before merge)*
- [ ] 5 GA4 custom dimensions registered (§15)

> **Why this is a launch recommendation, not a build blocker.** Implementation does not depend on analytics configuration. However GA4 custom dimensions are **not retroactive** — every hour between deployment and registration is attribution permanently lost. Register before the page goes live, or accept that its first traffic is unattributable.

### Gate 2 — Content
- [ ] `<main>` **1,000–1,400 words**, measured **excluding** `.faq-list` (v1.5)
- [ ] **Shingle overlap vs the parent service page `<main>` < 15%** (excluding header/footer/nav) — automated
- [ ] **§3.1 duplication budget passes against every sibling Near Me page** — automated, pairwise
- [ ] **Independent-value test (§3.1)** — mandatory-unique sections are not a service-name find-and-replace of a sibling
- [ ] **Three-section intent floor (§3.1)** — ≥ 3 sections fail the service-name swap test; named explicitly in the build report
- [ ] **No shared sentence > 12 words** with any sibling, excluding factual constants
- [ ] Every slot maps to ≥ 1 of Q1–Q5
- [ ] Zero banned components (§4)
- [ ] Zero topics owned by another page (§3 matrix)
- [ ] **5–6 FAQs**, each passing F1–F5 (§10), unique against the site corpus and 0% question overlap with siblings
- [ ] `"near me"` ≤ 3× body, ≤ 1× heading
- [ ] No prices, counts, guarantees, superlatives or unverifiable claims
- [ ] Non-services appear **only** as exclusions

### Gate 3 — Technical QA
- [ ] 1 × `h1`; no heading-level skips; 0 duplicate IDs
- [ ] 0 broken links and 0 broken anchors **site-wide**
- [ ] 0 new CSS classes, 0 new Font Awesome icons, 0 inline styles
- [ ] 2 netlify guards present; TOML parses; no duplicate `from`
- [ ] Sitemap entry at priority 0.6
- [ ] Exactly 1 inbound in-content link; none in nav or footer
- [ ] Cache `?v=` token bumped if any asset changed
- [ ] `section[id]` values match §4 exactly

### Gate 4 — Accessibility
- [ ] Skip link, landmarks, `aria-labelledby` on every section
- [ ] All decorative icons `aria-hidden="true"`
- [ ] All `target="_blank"` carry `rel="noopener noreferrer"`
- [ ] Every link has an accessible name
- [ ] `lang="en-IN"`; no inline styles (CSP has no `'unsafe-inline'` for `style-src`)
- [ ] 0 regressions across all site pages

### Gate 5 — Schema
- [ ] 3 nodes; 0 parse errors
- [ ] **0 HTML entities inside any JSON-LD block**
- [ ] `FAQPage` **verbatim 1:1** with the visible FAQ
- [ ] No `LocalBusiness`, no `Service` node
- [ ] Rich Results Test passes for `BreadcrumbList` and `FAQPage`

### Gate 6 — Mobile
- [ ] Rendered in a real browser at **360 / 390 / 768 / 1280**
- [ ] H1 + both Tier-1 CTAs above the fold at 360 × 640
- [ ] No horizontal scroll; no overflow; no overlap at any width
- [ ] Floating WhatsApp clears the sticky call bar

### Gate 7 — Post-deployment
- [ ] URL inspected in **Search Console**; indexable; canonical recognised
- [ ] Sitemap resubmitted
- [ ] Live schema validated on the deployed URL
- [ ] GA4 receiving `call_click` / `whatsapp_click` with correct `link_section`
- [ ] 30-day review scheduled against §15

---

## §18 · EXCEPTION POLICY

Some requirement will eventually be unmeetable. This is how that is handled — **not** by quiet deviation.

### Default: no exception

A requirement that cannot be met is a signal the page should not ship in that form. The spec already prescribes **cancel-over-compromise** in five places, and those remain absolute:

| Situation | Prescribed action |
|---|---|
| Fewer than **5** logistics FAQs pass F1–F5 (§10) | **The page is not built** (§16) |
| A mandatory-unique section cannot clear §3.1 without inventing distinctions | **Cancel the page** (G16) — never fabricate a difference |
| Content below the 1,000-word floor | **Cancel — do not pad** (G14) |
| An operational claim cannot be owner-verified | **Cut, not softened** (§0 P2, §4 N5) |
| An FAQ answer is not yet known | **Cut, not softened** (§10) |
| Page fails the 180-day kill criterion | **Retire — do not optimise** (§15) |

### When an exception may be requested

Only where **all four** hold: the requirement is **SHOULD**, not MUST · no guardrail G1–G16 is touched · no `PROJECT.md` rule is touched · the deviation is reversible.

**A MUST is never excepted.** Changing a MUST is a spec amendment (§14), not an exception.

### Procedure

1. Requester records: which requirement, why unmeetable, what is proposed instead, blast radius.
2. **Owner approves or refuses.** No implicit approval; silence is refusal.
3. If approved, a row is added to the register below **and** to Revision History.
4. Every exception carries an **expiry** — a date or a named event. No open-ended exceptions.
5. On expiry the exception lapses and the requirement applies again.

### Exception register

| # | Requirement | Page(s) | Rationale | Approved | Expires |
|---|---|---|---|---|---|
| **E1** | §3.1 pairwise budget — `#coverage` **< 10%**. Measured **10.3%** | `/maid-services-near-me/` ↔ `/mother-newborn-care-near-me/` | See below | Owner, 2026-08-04 | Reviewed at family-wide QA |

**E1 — rationale, recorded precisely:**

- All 12 shared 8-grams originate in **structural scaffolding and factual geographic boundary language** only: the `.scope-col--boundary` heading *"Where to call and confirm first"*, and boundary bullets 1–2, *"The outer edges of the city"* and *"Locations outside Kota city"*.
- **The service-specific third bullet remains differentiated** on every page — maid: *"anywhere the requirement is short and the journey is not"*; mother-newborn: *"anywhere the requirement includes nights and the route home is difficult after dark"*.
- **No substantive service-intent duplication was found.** The `#coverage` sections argue different things; only the shared frame is common.
- Rewording the boundary bullets or the heading to depress the metric would be a manufactured difference of exactly the kind §3.1 prohibits, with no reader benefit.
- **This is not permission to ignore genuine duplication elsewhere.** E1 covers this one section pair on these two pages and nothing else.

**Deliberately NOT done:** the GREEN list was not extended and no threshold was changed. If the same classification problem recurs across the family-wide QA, the metric may be revisited then — a single instance is an exception, a pattern would be evidence.

> **Why this is strict:** `netlify.toml` records three separate fail-open incidents where a convention lagged the thing it was meant to govern. Undocumented exceptions are how that happens.

---

## §19 · DEPRECATION & MIGRATION

### Amending this spec

| Change class | Effect on pages already built |
|---|---|
| **Editorial** — wording, clarification, typo | None. Patch version |
| **Additive** — a new MAY, a new metric, a new guardrail that nothing currently violates | None. Minor version |
| **Frozen-element change** (§16) — slot, order, `section[id]`, CTA tier, schema set, linking topology, mobile behaviour | **Every existing Near Me page MUST be retrofitted in the same release.** Major version |

**Rule:** Near Me pages MUST NOT diverge by version. Either all pages conform to the current spec, or the change is not made. A fleet on mixed versions defeats the purpose of an inheritance source.

**`section[id]` changes carry a measurement cost:** renaming an ID discontinues its GA4 `link_section` history. Any such amendment MUST record the old→new mapping in Revision History so historical data remains interpretable.

### Retiring a single page

Triggered by the §15 kill criterion or an owner decision.

1. Remove from `sitemap.xml`.
2. Remove the inbound link from the parent service page.
3. **301 to the parent service page** — never 404. `PROJECT.md` §9: *"a published URL is a permanent commitment"* and *"the old path is never silently dropped."*
4. Keep the redirect indefinitely.
5. Record in Revision History.

### Retiring the pattern

If Near Me pages are abandoned as a strategy: retire each page per the above, mark this document **SUPERSEDED** with the date and reason, and **retain it** — it is the record of why the pattern was tried and what it cost. Deleting it loses the lesson.

### Superseding this spec

A replacement MUST state which version it supersedes, carry forward the Revision History, and specify the migration path for every existing page. This document then reads **SUPERSEDED BY <name>** at the top and is retained, not deleted.

---

## APPENDIX — audit basis

Derived from a direct read of the production repository on 2026-08-02: 43 HTML pages · `SERVICE_PAGE_SPEC` slot structure and per-slot components · knowledge-article template · full CSS component vocabulary · head/schema conventions across four reference page types · `netlify.toml` routing conventions · sitemap priority ladder · the complete 158-question FAQ corpus · the `/services/patient-care` heading inventory · the GA4 event layer in `assets/js/main.js` · `PROJECT.md` §5, §7, §9, §12, §19 · `LOCAL_SEO_MASTER_PLAN` §4.2, §4.3, Appendix A.

**Not verified:** rendered output. No browser was available during specification — Chromium downloads are blocked by the sandbox network allowlist. All layout figures are computed from the CSS box model. This is why Gate 6 requires real-browser verification.

---

*Repository-only. Publish-blocked by the fail-closed `/docs/*` rule in `netlify.toml`; no configuration change required.*
