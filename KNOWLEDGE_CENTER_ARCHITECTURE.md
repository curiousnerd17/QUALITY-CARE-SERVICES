# Knowledge Center — Platform Architecture

**Version:** **1.0 — FROZEN** (see §24)
**Sprint:** E7 · Planning only
**Status:** Frozen blueprint for owner-gated implementation. **Nothing in this document has been implemented.**
**Date:** 26 July 2026 · Part II (§16–§24) added at the freeze review
**Supersedes:** nothing. **Amends:** `PROJECT.md` §9, §19, §20 and `LOCAL_SEO_MASTER_PLAN.md` §7.4, §8.3 — *proposed only, see §0.*

---

## How to read this document

`§0` is a gate, not an introduction. The Knowledge Center as described in the E7 brief
cannot be built without amending four rules this project has already declared
constitutional. Those amendments may well be the right call — but they are the owner's to
make, and making them silently inside an implementation sprint is exactly the failure mode
`PROJECT.md` §19 exists to prevent.

Part I (`§1`–`§15`) answers the original E7 brief in order; Part II (`§16`–`§24`) adds the
governance layer and the freeze review. Every recommendation is marked:

| Mark | Meaning |
|---|---|
| **DECIDED** | Follows necessarily from an existing rule or a verified technical fact. No owner input needed. |
| **RECOMMENDED** | My professional judgement. Implementable as written; overridable. |
| **⬜ D-n** | A decision only the owner can make. Listed in full in the Appendix. |
| **⚠️ UNVERIFIED** | A technical assumption that must be proven on a Netlify deploy preview before code depends on it. |

The distinction in the last row matters here. This project has already been burned once by
an unverified Netlify assumption — the `:slug` placeholder defect caught at 8/9 on the
preview matrix during SP-T1. Nothing in this plan repeats that pattern without a labelled
verification task attached.

---

# §0 — GOVERNANCE GATE

Five collisions between the E7 brief and the existing constitution. Each needs a decision
before any code is written.

## G-1 · Scope expansion requires a constitutional amendment

`PROJECT.md` §20, stage 8:

> **Future Platform** — authority building and continuous improvement (Phases 5–6), and
> any expansion beyond the current scope — **which requires a constitutional amendment
> before work begins.**

A Knowledge Center is an expansion beyond current scope. It introduces a new top-level
URL space, a new page type, a new content lifecycle, and a new maintenance burden. The
constitution says this needs an amendment, adopted first.

**Required:** a short amendment to `PROJECT.md` adding the Knowledge Center to §8
(architecture) and §9 (URL strategy), adopted as its own commit **before** E8-T1.
→ **⬜ D-6**

## G-2 · The blog is currently deferred by a written decision with unlock criteria

`LOCAL_SEO_MASTER_PLAN.md` §7.4:

> **Deferred.** It would compete with service pages for authority and owner time. […]
> Unlock requires all four service-page fundamentals first: the certified template, the
> shipped service pages, the measurement layer, and genuine capacity — not enthusiasm.

Status of the four criteria, assessed against the repository:

| Criterion | Status | Evidence |
|---|---|---|
| Certified template | ✅ Met | `services/patient-care.html`, certified and inherited by six pages |
| Shipped service pages | ✅ Met | All seven live; hub live; reciprocal links closed |
| Measurement layer | ✅ Met | GA4 `G-NT5DDR1ET5` on all 12 pages; Search Console verified; `evidence/2026-07/P3-measurement-layer/` |
| Genuine capacity | ⬜ Unknown | Not a technical question. Only the owner can answer it. |

Three of four are objectively met. The fourth is the one the deferral note was actually
worried about, and it is the one this document cannot settle. §7 below sizes the real
commitment so the question can be answered with a number rather than a feeling.
→ **⬜ D-7**

## G-3 · Per-locality pages are prohibited twice, and the brief asks for them

The E7 brief §8 offers these examples:

> Patient Care in Kota · Elder Care in Talwandi · Home Care in Mahaveer Nagar

The constitution forbids this pattern in three separate places:

| Source | Rule |
|---|---|
| `PROJECT.md` §9 | "**No city in the URL** — single-city business; the city belongs in titles, content, and schema" |
| `LOCAL_SEO_MASTER_PLAN.md` §4.2 | "Per-locality pages · ❌ **Never** · Doorway pattern; `PROJECT.md` §7 hard prohibition" |
| `LOCAL_SEO_MASTER_PLAN.md` §8.3 | "Kota in titles, H1s, visible content and `Service.areaServed` — **never in URLs**" |

`PROJECT.md` §20 Phase 3 adds: "honest service-area content […] **without any fake
location pages**."

The brief's own instruction — *"Avoid doorway pages. Ensure every location page provides
genuine value"* — is pulling in the same direction as the constitution. The two are
reconcilable, but not by building `<service>-in-<locality>` URLs. §8 below proposes a
narrow carve-out that captures the local intent without the doorway pattern, and a
falsifiable test for whether any given local article qualifies.
→ **⬜ D-9**

## G-4 · "No deep nesting" versus a three-level taxonomy

`PROJECT.md` §9: *"Lowercase, hyphen-separated, self-describing. No dates, no IDs, **no
deep nesting**."*

A scalable knowledge taxonomy is inherently three levels
(`/knowledge/<category>/<article>/`). §2 presents both the nested design and a flat
alternative that honours §9 literally, with the trade-offs, so the amendment is made
knowingly rather than by drift.
→ **⬜ D-8**

## G-5 · YMYL — the brief's own example article is not publishable as written

`LOCAL_SEO_MASTER_PLAN.md` §7.3, binding content governance rule 7:

> **No medical advice** — YMYL boundary; the site explains **how care is arranged**.

The brief's example URL is `/knowledge/patient-care/how-to-care-for-bedridden-patient/`.
Written literally — repositioning schedules, pressure-sore prevention, feeding technique —
that is clinical instruction from an unqualified publisher about a vulnerable patient. It
is the single highest-risk thing this platform could do, in both the search sense (YMYL
demotion) and the real sense (a family follows it and someone is harmed).

It is also a genuinely valuable query that this business is genuinely qualified to answer —
just not in that frame. §9 defines the boundary precisely and demonstrates the reframe on
this exact example. **This is not a reason to avoid the topic. It is a reason to own the
half of it we are actually expert in.**
→ **DECIDED** (boundary defined in §9; no owner input required, but review it)

---

# §1 — INFORMATION ARCHITECTURE

## 1.1 The organising principle

**RECOMMENDED.** The Knowledge Center is not organised by topic interest. It is organised
by **the canonical seven services, plus a small number of cross-cutting categories that
exist because a real reader need does not fit inside one service.**

This is the difference between a knowledge platform and a blog. A blog's taxonomy grows to
fit whatever gets written. This taxonomy is fixed by the business's actual offering, and
the writing grows to fit it. It also satisfies the brief's anti-orphan rule structurally
rather than by discipline: if every category maps to a service, no article can be orphaned
by construction.

## 1.2 Tier 1 — Categories (the closed set)

**Service-aligned categories.** Exactly seven, named and slugged identically to the
canonical services. Never renamed, never merged, never added to except by adding a
canonical service (which `PROJECT.md` §19 forbids inventing).

| # | Category | Slug | Maps to |
|---|---|---|---|
| 1 | Patient Care | `patient-care` | `/services/patient-care` |
| 2 | Elder Care | `elder-care` | `/services/elder-care` |
| 3 | Mother & Newborn Care | `mother-newborn-care` | `/services/mother-newborn-care` |
| 4 | Child Care | `child-care` | `/services/child-care` |
| 5 | Maid Services | `maid-services` | `/services/maid-services` |
| 6 | Home Cook Services | `home-cook-services` | `/services/home-cook-services` |
| 7 | Housekeeping / Dusting & Cleaning | `housekeeping-cleaning` | `/services/housekeeping-cleaning` |

**Cross-cutting categories.** Three, and only three at V1. Each exists because there is a
real reader question that genuinely spans services and would be duplicated seven times
otherwise.

| # | Category | Slug | Why it must exist separately |
|---|---|---|---|
| 8 | Choosing Care | `choosing-care` | How to hire, vet, brief, supervise and end an arrangement. Identical across all seven services — writing it per-service would be seven near-duplicate pages, the exact duplicate-content failure §3 is designed to prevent. |
| 9 | Family Resources | `family-resources` | Planning, coordination between siblings, caregiver burnout, cost planning, what to do when a family disagrees. Reader-state topics, not service topics. |
| 10 | Kota | `kota` | Locality-specific practical knowledge. Tightly gated — see §8. |

**Ten categories. Hard cap at V1.** Adding an eleventh creates a permanent URL and is
therefore an amendment-level act, not an editorial one.

## 1.3 What the brief listed that I recommend *against* as categories

**DECIDED** — this is a taxonomy correctness issue, not a preference.

### "Checklists" is a format, not a topic

An article can simultaneously be *Elder Care* and *a checklist*. If both are categories,
every checklist forces a choice between two true homes, or gets published at two URLs.
That is the classic taxonomy error and it produces duplicate content at scale.

**Resolution:** `content_type` is a separate axis (§3.2). `checklist` is a value on that
axis. It is filterable, badgeable, and schema-visible — it is simply not in the URL. A
"Checklists" *view* can exist later at `/knowledge/checklists/` as a **curated index page
that links to articles living in their real categories**, with a self-referencing
canonical. That is a list page, not a category.

### "Local Guides" collapses into the `kota` category

A single-city business does not need a "local guides" abstraction above its one city.
`/knowledge/kota/` is more honest, shorter, and does not pretend to a geographic breadth
the business does not have. If a genuine second city is ever added (which
`LOCAL_SEO_MASTER_PLAN.md` §5.4 says requires its own scope amendment), it becomes
`/knowledge/<city>/` and the pattern already generalises.

### "Company Updates" does not belong in the Knowledge Center at all

**RECOMMENDED.** Two different content lifecycles:

| | Knowledge | Updates |
|---|---|---|
| Value over time | Compounds | Decays |
| Update cadence | Reviewed and refreshed | Never touched again |
| Correct `lastmod` behaviour | Changes | Frozen |
| What a stale one signals | Neglect | Nothing |

Mixing them means either treating news as evergreen (and having a `/knowledge/` tree full
of things nobody should read in 2029) or treating evergreen as news (and losing the
freshness signal on the articles that deserve it).

**Reserve `/updates/` at root** — outside `/knowledge/` — and do not build it until there
is something real to announce. Google Business Profile Posts are a better home for most
of what would go there anyway, and that channel is currently unused. → **⬜ D-10**

## 1.4 Tier 0 — The hub

`/knowledge/` is infrastructure in exactly the sense `netlify.toml` already uses for
`/services/`: canonical entry point, parent of every category, central internal-link
distribution node, permanent URL. It carries the same three redirect guards.

## 1.5 Future expansion paths

| Trigger | Expansion | Cost | Gate |
|---|---|---|---|
| New canonical service added | New category, 1:1, automatic | 1 directory + hub link | Requires a §5 services amendment first — services drive categories, never the reverse |
| A tag reaches ≥6 articles | Topic page at `/knowledge/topics/<tag>/` | 1 page + index entry | Editorial review; below 6 articles it is thin content |
| A category exceeds ~40 articles | Sub-category tier | Nested one level deeper | Amendment (deepens nesting again) |
| Genuine second city | `/knowledge/<city>/` | Mirrors `kota` | Scope amendment per `LOCAL_SEO_MASTER_PLAN.md` §5.4 |
| Hindi | `/hi/knowledge/…` full mirror | Large — see §11 | ⬜ D-12 |

---

# §2 — URL ARCHITECTURE

## 2.1 The recommendation, and why it differs from every existing page

**RECOMMENDED — directory-index files, trailing slash, three levels.**

```
/knowledge/                                        knowledge/index.html
/knowledge/patient-care/                           knowledge/patient-care/index.html
/knowledge/patient-care/<article-slug>/            knowledge/patient-care/<article-slug>/index.html
```

Every existing content page in this repository is a **flat file** served at an
**extensionless, slash-free** URL (`/services/patient-care` ← `services/patient-care.html`).
I am recommending the Knowledge Center break from that, and the reason is not aesthetic.

## 2.2 Why flat files cannot scale to 500 articles

`netlify.toml` lines 233–250 record a defect found during SP-T1 preview testing:

> The original SP-T1 implementation used placeholder rules:
> `from = "/services/:slug.html"  to = "/services/:slug"`
> Preview testing returned `Location: /services/:slug` — **the literal string**. Netlify
> does NOT substitute a placeholder when the `to` value combines it with a literal suffix.

The fix was **explicit exact-match pairs, two redirect rules per page** — one 301
canonicalising the `.html` form, one 200 rewrite serving the clean URL from the flat file.
Seven services therefore cost fourteen rules, which are visible in the file today.

That cost is linear and unavoidable under the flat-file convention:

| Articles | Redirect rules required | `netlify.toml` size |
|---|---|---|
| 10 | 20 | manageable |
| 50 | 100 | unpleasant |
| 200 | 400 | unmaintainable |
| 500 | **1,000** | a configuration file nobody can review |

Every one of those rules must be hand-written, in the same commit as the article, and
never mistyped. Netlify also evaluates redirects in order, first match wins — a
thousand-rule file is a latency and correctness hazard, and a merge-conflict magnet.

**Directory-index files require zero redirect rules per article.** Netlify serves
`knowledge/patient-care/foo/index.html` at `/knowledge/patient-care/foo/` natively. The
marginal routing cost of the 500th article is the same as the first: nothing.

## 2.3 Four further reasons, all already proven in this repository

**1 · It is not actually a new convention here.** `/services/` and `/careers/` are already
directory indexes with trailing slashes. `netlify.toml` lines 180–183 state the rule as
constitutional:

> Per spec §4.4 the hub's canonical form carries the trailing slash, while leaf service
> pages per `PROJECT.md` §9 do not. That asymmetry is deliberate and constitutional — **a
> directory index takes the slash, a leaf does not.**

Under this design every knowledge URL *is* a directory index. The existing rule covers it
without amendment. The asymmetry does not widen; it is applied consistently.

**2 · It eliminates the local-development regression class.** Sprint E5 spent three
hotfix commits (`a480c85`, `5aabaea`, `0d2312b`) converting 115 internal links from the
extensionless form to explicit `.html`, because `python -m http.server` cannot perform
Netlify's rewrite and every clean URL 404'd locally. The site now carries `.html` in its
internal links while its canonical tags carry the extensionless form — a permanent, if
harmless, inconsistency.

`python -m http.server` serves `dir/` → `dir/index.html` natively, exactly as Netlify
does. Under directory-index, **the internal link, the canonical tag, the sitemap entry,
the breadcrumb, and the local dev server all use the identical string.** That entire class
of bug cannot occur.

**3 · Breadcrumb hierarchy is literal in the path**, so `BreadcrumbList` is derivable from
the file path rather than hand-maintained — which matters when a script generates 500 of
them (§14, R-1).

**4 · Clean partitioning.** `path:/knowledge/` filters the whole platform in Search
Console; `/knowledge/<category>/` filters a cluster. Sitemap partitioning (§5.9) falls out
of the same boundary. Under flat files, `/knowledge/foo` and `/knowledge/bar` are
siblings of `/services/…` in every path-prefix tool.

## 2.4 The cost of this recommendation, stated plainly

- It **deepens nesting to three levels**, which `PROJECT.md` §9 prohibits. → **⬜ D-8**
- It introduces a **second file convention** in one repository (flat leaves under
  `/services/`, directory indexes under `/knowledge/`). This is real added cognitive load.
  The mitigating fact is that the boundary is crisp and already articulated: *service
  pages are flat leaves; everything with children is a directory index.*
- `/knowledge/<cat>/<slug>/index.html` is reachable as a second URL unless Netlify's
  Pretty URLs post-processing strips it. **⚠️ UNVERIFIED — must be tested on a deploy
  preview (task E8-T0).** The canonical tag makes this an untidiness rather than an
  indexing risk, but it must be measured, not assumed. This is the same category of
  assumption that produced the SP-T1 defect.

## 2.5 The alternative, if D-8 is declined

**Flat, two-level, category as metadata only:**

```
/knowledge/                          knowledge/index.html
/knowledge/<article-slug>            knowledge/<article-slug>.html
```

Honours §9 literally. Costs: two redirect rules per article (the 1,000-rule problem
returns); category has no URL, so category pages must live at a parallel path or not
exist; breadcrumbs become hand-maintained metadata rather than path-derived; the article
namespace is global, so `patient-care-checklist` and `elder-care-checklist` must be
disambiguated by hand forever.

**I do not recommend it.** It saves one constitutional amendment and costs the platform
its ability to scale. But it is a coherent position and the choice is the owner's.

## 2.6 Slug rules — DECIDED

Inherits `PROJECT.md` §9 and adds knowledge-specific constraints:

| Rule | Reason |
|---|---|
| Lowercase, hyphen-separated, ASCII only | Existing §9 rule |
| ≤ 5 words, ≤ 60 characters | Readable in a SERP breadcrumb and in a WhatsApp share |
| **No dates, no years** | A slug with `2026` in it can never be refreshed in place — it forces a migration to stay current, which §9 forbids |
| **No IDs, no numbers as identifiers** | §9 |
| **No locality except inside `/knowledge/kota/`** | §8, G-3 |
| Verb-led for procedural content | `preparing-a-room-…` reads as an action; `room-preparation` reads as a filing label |
| No stop-word padding | `how-to-choose-an-attendant` not `how-to-choose-the-right-attendant-for-your-family` |
| Never re-slugged after publication | A published URL is a permanent commitment (§9). Retitle freely — the `<h1>` and the slug are decoupled by design |

If a slug ever must change: 301 in the same commit, old path never silently dropped (§9).

## 2.7 Multilingual reservation — DECIDED (reserved, not built)

`/hi/knowledge/patient-care/<slug>/` — **language prefix above the content tree**, not
inside it.

Language is a site-level axis. Putting it above the taxonomy means the English tree is
never touched when Hindi arrives, `hreflang` pairs are a mechanical mirror, and
`/hi/services/…` follows the same rule later without a second decision. Putting it inside
(`/knowledge/hi/…`) would make Hindi look like a topic category and would not generalise
to the service pages.

Reserve the prefix now by never creating a top-level directory named `hi`. That is the
entire cost today.

---

# §3 — CONTENT TAXONOMY

## 3.1 Four axes, only one of which is in the URL

**DECIDED.** The single most important taxonomy rule in this document:

> **Exactly one axis appears in the URL. Every other axis is metadata.**

Every duplicate-content problem a knowledge platform can have comes from violating this.

| Axis | Cardinality | In URL? | Purpose |
|---|---|---|---|
| **Category** | Exactly 1, mandatory | ✅ Yes | Canonical home. Closed set of 10 (§1.2) |
| **Content type** | Exactly 1, mandatory | ❌ No | Template variant, badge, future filter |
| **Tags** | 0–5, optional | ❌ No (V1) | Clustering, related-article selection, future topic pages |
| **Service mapping** | 1 primary + 0–3 secondary | ❌ No | Anti-orphan link generation, cluster reporting |

## 3.2 Content types — closed set

| Type | Definition | Template variant |
|---|---|---|
| `guide` | Multi-step, comprehensive, the reader is planning something | Full, with ToC |
| `explainer` | Answers one question well; the reader is deciding or worried | Full, ToC optional |
| `checklist` | Enumerated, printable, the reader is executing | Compact, list-dominant, ToC suppressed |
| `comparison` | Two or more genuine options weighed honestly | Full, comparison block |
| `preparation` | What to arrange before an event (discharge, delivery, a first shift) | Full, timeline block |
| `local` | Kota-specific practical knowledge (§8) | Full, gated by the §8.4 test |

Six values. Adding one is an editorial-governance decision, not a code change — because
content type is not in the URL, which is the whole point.

## 3.3 Tags — controlled vocabulary, no pages at V1

Tags are a **closed controlled vocabulary maintained in one file**, not free text. Free-text
tagging is how a taxonomy rots: `bedridden`, `bed-ridden`, and `bed ridden` become three
tags inside a year.

**No tag pages at V1.** A tag page backed by two articles is thin content, and thin
content at scale is the fastest way to damage a domain that currently has none. Threshold
for promoting a tag to `/knowledge/topics/<tag>/`: **≥ 6 published articles**, plus
editorial judgement that the grouping is a thing a reader would actually look for.

Starter vocabulary (~20 terms), grouped:

- **Reader state** — `first-time-arranging-care`, `hospital-discharge`, `after-surgery`, `long-term`, `emergency`, `family-disagreement`
- **Who it concerns** — `bedridden`, `dementia`, `post-natal`, `newborn`, `toddler`, `elderly-parent`
- **Practical** — `home-setup`, `hygiene`, `nutrition`, `medication-management`, `night-shift`, `safety`
- **Arrangement** — `hiring`, `verification`, `supervision`, `handover`, `cost-planning`

## 3.4 Service mapping — the anti-orphan mechanism

**DECIDED.** Every article declares `primary_service` — one of the canonical seven. This
is **mandatory and unskippable**; an article that cannot name a primary service is an
article this business has no standing to publish, and the front-matter validator (§14,
R-1) should reject it at build time rather than at review time.

This single required field delivers both halves of the brief's closing instruction:

- *"Every article must map to at least one canonical service page"* — enforced by schema, not by discipline.
- *"Every service page should eventually have a supporting topic cluster"* — becomes a measurable coverage report: group all articles by `primary_service`, and any service with a count below the §6.5 threshold is a visible gap.

Cross-cutting categories still declare a primary service. A `choosing-care` article about
vetting an attendant declares `patient-care` if that is the service it most serves. It is
allowed to be an imperfect fit; it is not allowed to be absent.

## 3.5 Cross-topic relationships

Curated, not computed. Each article declares 2–4 `related_articles` by slug. Automated
"related posts" widgets on a 500-article corpus reliably surface the least relevant thing
in the category, and a hand-curated pair of links from a 40-article corpus outperforms
them anyway.

The article generator (§14) validates that every declared relation resolves to a published
slug, and reports **inbound link counts** so an article nobody links to is visible before
it becomes an orphan.

## 3.6 Duplicate-content controls — DECIDED

| Risk | Control |
|---|---|
| Same article in two categories | Impossible — category is single-valued and in the path |
| Tag pages duplicating category pages | No tag pages until the ≥6 threshold |
| Curated list pages (`/knowledge/checklists/`) duplicating articles | List pages carry only titles + one-line summaries, never article body text; self-referencing canonical |
| Paginated category pages | No pagination until a category exceeds ~30 articles; then `?page=2` with a canonical to page 1 is **wrong** — use distinct, self-canonicalling URLs with unique intros |
| Near-duplicate service permutations | Structurally prevented by §8's find-replace test |
| Hindi mirror | `hreflang` + `x-default`, reciprocal, when built |

---

# §4 — ARTICLE TEMPLATE

## 4.1 Design constraint

**DECIDED.** The article template is built the way `SERVICE_PAGE_SPEC.md` built the
service template: **a fixed, numbered slot order**, certified once on a single reference
article, then inherited byte-for-byte by every article after it. That method produced
seven pages with zero structural drift in E4–E5. It is the only method in this project's
history that has been shown to work.

Slots are **mandatory** or **conditional**. Conditional slots are omitted entirely when
they do not apply — never shipped empty. This is the same rule
`SERVICE_PAGE_SPEC.md` §3.5 applies to the dormant Related Resources slot.

## 4.2 Slot order

| # | Slot | Status | Component reuse |
|---|---|---|---|
| 1 | Skip link · header · nav | Mandatory | Existing, identical to all 12 pages |
| 2 | Breadcrumb — Home › Knowledge › Category › Article | Mandatory | `.breadcrumb` ✅ exists |
| 3 | Article header — eyebrow (category), `<h1>`, standfirst | Mandatory | `.section-header`, `.eyebrow` ✅ exist |
| 4 | **Article meta bar** — content-type badge, reading time, published, last updated, author | Mandatory | 🆕 `.article-meta` |
| 5 | Hero image | Conditional — only where a real, relevant image exists | `.hero-media` pattern ✅ exists |
| 6 | **Key points** — 3–5 bullets answering the query immediately | Mandatory | `.service-points` ✅ exists |
| 7 | **Table of contents** | Conditional — ≥ 4 `<h2>`s, and never on `checklist` | 🆕 `.article-toc` |
| 8 | **Article body** | Mandatory | 🆕 `.article-body` prose scope |
| 9 | Mid-article contextual service link | Mandatory, exactly one | `.cta-band` ✅ exists |
| 10 | **Disclaimer** | Conditional — see §4.5 | 🆕 `.article-disclaimer` |
| 11 | FAQ — mirrored 1:1 into `FAQPage` | Conditional — 3–8 questions or omit | `.faq-list`, `.faq-item` ✅ exist |
| 12 | Related services — the primary service, plus genuine adjacencies | Mandatory | `.related-grid` ✅ exists |
| 13 | Related articles — 2–4 curated | Mandatory from article #5 onward | `.related-grid` ✅ exists |
| 14 | End CTA | Mandatory | `.prefooter-section` ✅ exists |
| 15 | Footer | Mandatory | Existing global footer |
| 16 | Floating WhatsApp · sticky mobile call | Mandatory | Existing |

**Component audit: 11 of 16 slots reuse components that already ship.** Four new
components are needed, and one is a prose scope rather than a component.

## 4.3 New CSS required

**RECOMMENDED.** Estimated **120–170 lines**, appended to `assets/css/style.css` in a
single dedicated commit, using existing design tokens only — no new colours, no new type
scale, no new spacing values. `PROJECT.md` §19 forbids redesign; this adds no visual
vocabulary, it applies the existing one to a page type that does not yet exist.

| Component | Purpose | Notes |
|---|---|---|
| `.article-meta` | Meta bar | Extends the `.job-status` pill pattern shipped in E6 |
| `.article-toc` | Sticky-on-desktop ToC | `position: sticky`; collapses to static above the body on mobile |
| `.article-body` | Prose scope | The only place in the stylesheet where bare `p`, `ul`, `h2`, `h3`, `blockquote`, `table` are styled — deliberately scoped so it cannot leak into any existing page |
| `.article-disclaimer` | Bordered notice | Muted, not alarming; visually quieter than a CTA |
| `.knowledge-card` | Hub/category listing item | May turn out to be `.service-card` with a modifier — decide during E8-T2 |

**Binding:** any change to `style.css` **requires bumping `?v=` on every page in the same
commit.** This project has already shipped one bug where a real CSS fix was invisible for
three commits because eight pages still requested a stale token under a one-year immutable
cache (`dfb456c`). At 500 pages this is not a discipline problem, it is an automation
requirement (§14, R-1).

## 4.4 Reading time and dates

- **Reading time** — computed from word count at 200 wpm, rounded to the nearest minute, floor of 1. Computed by the generator, never typed. A hand-typed reading time is wrong the moment the article is edited.
- **Published** — set once, never changed.
- **Last updated** — changes only on a **material** edit. Fixing a typo is not a material edit. `dateModified` in schema must match the visible date exactly; churning it to fake freshness is the kind of thing that is both dishonest and ineffective.

## 4.5 Author and disclaimer — the honesty-critical slots

**DECIDED, and this is the slot most likely to be got wrong.**

**Author at V1 is the `Organization`, not a person.**

`SERVICE_PAGE_SPEC.md` §3.4 forbids fabricated people, credentials and certifications, and
this project has already removed six invented testimonials for exactly that reason
(`64147d5`). Inventing "Dr. Anjali Sharma, Care Specialist" to satisfy an E-E-A-T checkbox
would be the same violation in a new costume — and a more serious one, because a fake
medical byline on health-adjacent content is a real-world harm vector, not just a
credibility risk.

Byline reads: **"Quality Care Services"**, with a one-line statement of the actual basis
of the expertise — the arranging and supervising of care in Kota homes. That is a true
authority claim, and it is the one this business can defend.

`Person` authors and `reviewedBy` medical reviewers are **reserved** in the schema shape
(§11) and unlock the moment a real, named, consenting individual exists. Not before.

**Disclaimer** appears whenever an article touches health, medication, infant care, or
anything a reader could act on to someone's physical detriment. Plain wording, e.g.:

> This article explains how care is usually arranged and what to prepare. It is not
> medical advice. For anything clinical — medication, wound care, feeding, or a change in
> someone's condition — follow the instructions of the treating doctor or nurse.

Not legal boilerplate. Not fine print. Same body text size, visually distinct, positioned
after the body and before the FAQs so it is read rather than scrolled past.

---

# §5 — SEO ARCHITECTURE

Each element below states **what** and **why it exists**, per the brief.

## 5.1 Titles

**Formula:** `<Specific Answer> | Quality Care Services`
**Length:** 50–60 characters. **Category name is not repeated in the title** — the
breadcrumb and URL already carry it, and spending 15 characters restating it costs the
part that earns the click.

*Why:* the title is the single strongest on-page relevance signal and the entire basis of
the click decision. Existing site titles run 50–58 characters (measured); articles inherit
that band.

**Kota appears in the title only when the article is genuinely Kota-specific.** Appending
"in Kota" to a universal explainer is the sentence-level version of the doorway pattern
§8 forbids at the URL level.

## 5.2 Meta descriptions

**Length:** 149–158 characters — the measured band across all 12 existing pages, verified
in the E6 self-review. Written as a promise of what the reader will learn, not a summary
of what the page contains. Never auto-generated from the first paragraph.

*Why:* not a ranking factor; entirely a click-through factor. It is the only copy in the
SERP the business fully controls.

## 5.3 Canonicals

Self-referencing absolute canonical on every page, including the hub and every category
page. Absolute, `https://`, non-`www`, trailing slash, matching the sitemap `<loc>`
character for character.

*Why:* the site already normalises four host/protocol variants via `netlify.toml`. The
canonical is the last line of defence for the `index.html` variant flagged **⚠️
UNVERIFIED** in §2.4, and for tracking parameters on shared links.

## 5.4 Breadcrumbs

Visible `.breadcrumb` + `BreadcrumbList` JSON-LD, mirroring each other exactly, four
levels: Home › Knowledge › Category › Article.

*Why:* Google replaces the URL in mobile results with the breadcrumb trail, so this is
visible SERP real estate. It is also the reader's only orientation cue when they land on
article 300 from a search result with no prior context.

## 5.5 Open Graph and Twitter Cards

`og:type=article` (not `website` — articles carry `article:published_time` and
`article:modified_time`), `og:title`, `og:description`, `og:url`, `og:image`,
`og:site_name`, `twitter:card=summary_large_image` where a real image exists, else
`summary`.

*Why:* in this market the dominant sharing surface is WhatsApp, which renders OG tags.
An article shared into a family group with no preview card converts materially worse than
one with a title, line of description, and image. This is a conversion mechanism, not a
social-media one.

## 5.6 Article schema

`Article` — **not** `BlogPosting` (this is not a blog) and **not** `NewsArticle`.

Required properties: `headline` (≤110 chars), `description`, `image`, `datePublished`,
`dateModified`, `author` (Organization → homepage `@id`), `publisher` (same `@id`),
`mainEntityOfPage`, `inLanguage: en-IN`, `about`, `isPartOf`.

*Why:* it is the machine-readable statement of authorship, freshness and topic. As search
shifts toward generated answers, an unambiguous entity graph is the difference between
being cited and being paraphrased anonymously.

**Reserved, absent at V1:** `reviewedBy`, `Person` author, `HowTo`, `VideoObject`,
`speakable`. Each is a lie until the corresponding real thing exists.

## 5.7 FAQ schema

`FAQPage`, mirrored **1:1** with the visible FAQs — the identical rule enforced on all
seven service pages and the careers page, and verified programmatically in every sprint.

*Why, stated honestly:* `LOCAL_SEO_MASTER_PLAN.md` §7.2 already records that Google
narrowed FAQ rich-result eligibility to authoritative government and health organisations
in August 2023. **A local service business should not expect FAQ rich results to render.**
The on-page value is real — it answers the questions people actually have. The rich-result
expectation is not. The mirroring is mandated by the frozen spec regardless, and consistency
across the site is worth more than the feature.

## 5.8 Internal linking

See §6.

## 5.9 Sitemap architecture — DECIDED

The current `sitemap.xml` is a single flat file with 11 URLs. At 500 it stays technically
valid (the limit is 50,000) but becomes operationally useless: one file where every
article's `lastmod` must be hand-edited, in a project that has already needed a dedicated
micro-sprint to correct stale `lastmod` values.

**Move to a sitemap index at E8-T1:**

```
/sitemap.xml                     ← index, lists the children
/sitemap-core.xml                ← home, services hub, 7 services, careers, privacy
/sitemap-knowledge.xml           ← hub + 10 category pages
/sitemap-knowledge-articles.xml  ← every article
```

*Why:* per-section `lastmod` isolation; Search Console reports indexation per sitemap, so
a knowledge indexing problem is visible without being diluted by 12 stable core URLs; and
the article sitemap becomes generator output rather than a hand-maintained file — the only
version of this that survives 500 entries.

`robots.txt` continues to reference `/sitemap.xml` only; the index handles discovery.

## 5.10 What is deliberately NOT done

| Not doing | Why |
|---|---|
| `HowTo` schema | Google removed HowTo rich results for desktop and mobile in 2023. Markup with no consumer, on exactly the clinical content §9 restricts |
| `AggregateRating` on articles | Fabricated. `SERVICE_PAGE_SPEC.md` §3.4 |
| `speakable` | Reserved. Narrow support, and premature before the content exists |
| Keyword density targets | Optimising a discredited metric at the cost of readability |
| Auto-generated meta descriptions | Reliably worse than none |
| Dated URLs | Blocks in-place refresh (§2.6) |

---

# §6 — INTERNAL LINKING STRATEGY

## 6.1 Authority model

The service pages are the commercial assets. **The Knowledge Center exists to pass
authority and qualified readers to them** — not to accumulate its own traffic as a
vanity metric. Link flow is deliberately asymmetric: articles link *down* to services
generously and *across* to each other sparingly.

```
Homepage
   ├──► /services/  ──► 7 service pages ◄─────────┐
   └──► /knowledge/ ──► 10 categories             │  (every article, always)
                            └──► articles ────────┘
                                    └──► 2–4 sibling articles
```

## 6.2 Mandatory links per article — DECIDED

Every article, without exception:

| Target | Where | Form |
|---|---|---|
| Its primary service page | Slot 9 (mid) and Slot 12 (related services) | Descriptive anchor naming the service |
| Its category page | Slot 2 breadcrumb | Category name |
| `/knowledge/` | Slot 2 breadcrumb | "Knowledge" |
| 2–4 related articles | Slot 13 | Article titles |
| Contact / WhatsApp | Slot 14 end CTA | Existing global CTA components |

This makes orphan articles structurally impossible: a published article has at minimum
five outbound internal links and, via the category index, at least one inbound.

## 6.3 Link budget and anti-stuffing rules

- **In-body contextual links: 2–5 per 1,000 words.** Above that, the body reads as an SEO artefact.
- **Never link the same target twice in the body.** First mention only.
- **Anchor text is the natural phrase**, varied per article. If a sentence has to be bent to accommodate an anchor, the link does not belong there.
- **No "click here", no bare URLs, no exact-match anchor repetition** across the corpus — a hundred articles all linking `patient care in Kota` to the same page is a pattern, and a detectable one.
- **No link modules injected purely to distribute authority.** `PROJECT.md` §19: never add content solely for SEO.

## 6.4 The reverse direction — activating a dormant slot

`SERVICE_PAGE_SPEC.md` §3.5 already reserves a **Related Resources** slot on the service
template, dormant, with the standing rule that it is *"never shipped empty"*
(`PROJECT.md` §10 repeats it: *"Related Resources — only if/when a blog exists"*).

**The architecture for the reverse link was designed two sprints ago and is waiting.**
No service page needs restructuring. Activation rule:

> A service page's Related Resources slot activates when **≥ 3 published articles** declare
> it as `primary_service`. It shows 3–4 links, refreshed as the cluster grows.

Three, not one — a slot containing a single link looks like an oversight and is not worth
the visual weight.

## 6.5 Cluster completeness targets

| Milestone | Articles per service | Meaning |
|---|---|---|
| Seeded | 1–2 | Cluster exists; Related Resources still dormant |
| **Activated** | **3** | Reverse links go live |
| Credible | 5–6 | Reads as genuine depth on the topic |
| Authoritative | 8–10 | Realistic ceiling for a business this size |

At 8 articles × 7 services + ~30 cross-cutting, the platform tops out around **85
articles** of genuine, defensible depth. The brief's 500-article horizon is the
architecture's capacity, not a content target — and §7 explains why conflating the two
would be the most expensive mistake available here.

---

# §7 — CONTENT STRATEGY (12-MONTH ROADMAP)

## 7.1 The capacity question, answered with arithmetic

`LOCAL_SEO_MASTER_PLAN.md` §7.4 deferred the blog because it would "compete with service
pages for **authority and owner time**." G-2 leaves capacity as the open criterion, so it
should be sized honestly rather than assumed away.

One genuinely good 1,200-word article on this site requires: topic validation, an outline,
a draft, a truth pass against the evidence standard, a YMYL pass, an SEO pass, image
sourcing with consent where people appear, and owner approval. **Realistically 4–6 hours
of owner-involved time**, because the owner is the only source of the domain knowledge that
makes the article worth publishing.

| Cadence | Articles/yr | Owner hours/yr | Assessment |
|---|---|---|---|
| 1 / week | 52 | 260 | Unrealistic; guarantees AI filler by month three |
| **3 / month** | **36** | **~180** | **Recommended.** Sustainable, leaves refresh capacity |
| 2 / month | 24 | ~120 | Safe floor if capacity is tight |
| 1 / month | 12 | ~60 | Too slow to build cluster authority within a year |

**RECOMMENDED: 3 per month, 36 in year one.** Ten quality articles beat fifty thin ones,
and thin ones on health-adjacent topics actively damage a domain. The platform is
architected for 500; the plan commits to 36. That gap is deliberate and should stay.

## 7.2 Prioritisation model

Each candidate is scored 1–5 on four axes, and **any article scoring 1 on Truth-safety is
rejected outright regardless of the other three.**

| Axis | Question |
|---|---|
| **Business value** | Does this reader convert, eventually? |
| **Search intent** | Are people actually searching this, and at what stage? |
| **Truth-safety** | Can we write this without medical advice, invented statistics, or claims we cannot evidence? *(Veto axis)* |
| **Owner expertise** | Do we know something here that a generic article would not? |

That last axis is the platform's only durable moat. Anyone can generate an article about
elder care. Almost nobody can write about what actually happens when a family in Kota
brings a parent home from hospital.

## 7.3 Twelve-month roadmap

### Q1 — Foundation (9 articles)
Prove the template, seed the highest-intent clusters.

| Category | Count | Focus |
|---|---|---|
| Choosing Care | 3 | How to choose an attendant · What to ask before hiring · What verification actually means |
| Patient Care | 2 | Preparing the home before discharge · What a patient-care attendant does and does not do |
| Elder Care | 2 | Signs a parent needs daily support · Full-time vs part-time vs night-only |
| Family Resources | 2 | Planning care when siblings live in different cities · What to agree before care starts |

Choosing Care leads deliberately: highest commercial intent, lowest YMYL exposure, and it
is where the owner's expertise is strongest and least replicable.

### Q2 — Depth (9 articles)

| Category | Count |
|---|---|
| Patient Care | 2 |
| Elder Care | 2 |
| Mother & Newborn | 2 |
| Child Care | 1 |
| Family Resources | 1 |
| Kota | 1 *(first local article — the §8.4 test's live trial)* |

### Q3 — Breadth (9 articles)
Home Support finally gets coverage; three services currently have zero supporting content.

| Category | Count |
|---|---|
| Maid Services | 2 |
| Home Cook Services | 2 |
| Housekeeping | 2 |
| Choosing Care | 1 |
| Kota | 2 |

### Q4 — Consolidation (9 new + refresh cycle)

| Activity | Count |
|---|---|
| Fill the weakest clusters to the 3-article activation threshold | 6 |
| Kota | 2 |
| Checklists curated index page | 1 |
| **Refresh Q1 articles** | 9 reviewed, ~4 materially updated |

### Year-one totals

| Category | Articles | Cluster state |
|---|---|---|
| Choosing Care | 7 | Authoritative |
| Patient Care | 5 | Credible |
| Elder Care | 5 | Credible |
| Mother & Newborn | 3 | Activated |
| Child Care | 3 | Activated |
| Maid Services | 3 | Activated |
| Home Cook | 3 | Activated |
| Housekeeping | 3 | Activated |
| Family Resources | 4 | Activated |
| Kota | 5 | Activated |
| **Total** | **~36–41** | **All seven services activated** |

**Every one of the seven service pages crosses the 3-article Related Resources threshold
within twelve months.** That is the year-one success criterion — not traffic, not article
count.

---

# §8 — LOCAL SEO STRATEGY

## 8.1 The conflict restated

The brief asks for location-based content architecture with examples like *"Elder Care in
Talwandi."* The constitution prohibits per-locality pages in three places (G-3), calling
them a doorway pattern.

**The constitution is right, and the brief's own guardrail agrees with it** — *"Avoid
doorway pages. Ensure every location page provides genuine value."* The task is to find the
form that satisfies both.

## 8.2 What is permanently forbidden — DECIDED

**The permutation matrix.** 7 services × 6 localities = 42 pages that differ only by a
find-and-replace. This is the textbook doorway pattern, it is what
`LOCAL_SEO_MASTER_PLAN.md` §4.2 marks "❌ Never", and at scale it is the single fastest way
to convert a clean domain into a spam-flagged one.

**No URL contains a locality name outside the reserved `/knowledge/kota/` category.**

## 8.3 What is already correct and needs nothing

Existing service pages already carry Kota and the six localities in titles, H1s, the Areas
Served section, and `Service.areaServed`. `LOCAL_SEO_MASTER_PLAN.md` §8.4 states that
service-area growth extends `areaServed` and the Areas Served section on **existing pages —
no new pages, no new URLs.** That mechanism is live and correct.

**Highest-ROI local work is not content at all.** §8.1 of that plan records the Google
Business Profile as *"Does not yet exist […] Highest-ROI unblocked work available."* The
project status confirms verification is still pending. **A verified GBP with real photos,
correct NAP and active Posts will out-perform every local article in this roadmap
combined.** It should not be sequenced behind them.

## 8.4 What is permitted — the carve-out, with a falsifiable test

`/knowledge/kota/` may host articles whose **subject matter is Kota**, as distinct from
articles about a service that happen to mention Kota.

> ### The find-replace test
> **Take the draft. Replace every instance of "Kota" and every locality name with
> "Jaipur". If the article is still true and still useful, it is a doorway page. Reject it.**

An article passes only if replacing the city makes it **factually wrong** — because it
contains real, specific, locally-sourced knowledge.

| Candidate | Verdict |
|---|---|
| "Elder Care in Talwandi" | ❌ Fails. Swap to Jaipur, still true. Doorway. |
| "Patient Care Services in Kota" | ❌ Fails. Duplicates the service page. |
| "Bringing a patient home from hospital in Kota: what to arrange first" — named hospitals, their discharge timing, ambulance and equipment-hire realities | ✅ Passes. Wrong for Jaipur. |
| "Where to hire a hospital bed and oxygen concentrator in Kota" | ✅ Passes, **if** the owner has verified current, real options |
| "Preparing a home for elderly care through Kota's summer" | ✅ Passes — Kota's May–June heat is a specific, real, local condition |
| "What Kota families should know before a night-shift attendant starts" | ⚠️ Borderline. Passes only if it contains genuinely local content (local norms, timings, safety realities), not a universal article with the city inserted |

## 8.5 Governance for local articles

1. **Every `local` article is individually owner-approved against the find-replace test.** No batch approvals.
2. **Cap of 8 in year one.** A `/knowledge/kota/` growing faster than the rest of the platform is the doorway pattern reasserting itself under a new name.
3. **Every factual local claim needs an evidence-ledger entry** — hospital names, timings, availability. Local facts go stale faster than any other content, so `local` carries the shortest review cycle (§9.6).
4. **No locality-name slugs**, even inside `/knowledge/kota/`. `bringing-a-patient-home-from-hospital` — not `patient-care-talwandi`.

## 8.6 If D-9 is declined

If the owner concludes even the carve-out is too close to the line: drop category 10, drop
the 5 Kota articles, redistribute those slots to `Choosing Care` and `Family Resources`,
and rely on GBP plus the existing on-page location signals. **The platform works fine
without local articles.** It does not work at all if the domain gets classified as a
doorway network.

---

# §9 — EDITORIAL STANDARDS

## 9.1 The YMYL boundary — the single most important rule here

**DECIDED.** One sentence governs every article on this platform:

> ### **We explain how care is arranged, prepared for, chosen and supervised.
> ### We do not explain how care is clinically performed.**

`LOCAL_SEO_MASTER_PLAN.md` §7.3 rule 7 states the principle; this is the operational line.

| ✅ We publish | ❌ We never publish |
|---|---|
| What to arrange before a patient comes home | Wound care, dressing changes, catheter handling |
| What questions to ask the discharge nurse | Medication names, dosages, schedules, interactions |
| How to prepare a room, bathroom, or bed area | Repositioning schedules, pressure-sore prevention technique |
| What an attendant's duties are and are not | Feeding technique, tube feeding, aspiration management |
| How to brief and supervise an attendant | Exercises, physiotherapy, mobility technique |
| Signs a family should call the doctor | Whether a symptom is serious, or what it means |
| How care is typically staffed and scheduled | Infant sleep training, feeding schedules, weaning plans |
| What verification and background checks cover | Any diagnosis, prognosis, or treatment guidance |

**This boundary is a strength, not a limitation.** Generic health content is infinitely
available and this business has no advantage in producing it. The logistics, staffing and
supervision of care in a Kota home is knowledge almost nobody else has — and it is
precisely what a family in that situation is desperate for and cannot find.

## 9.2 Worked example — the brief's own article, reframed

**Requested:** `/knowledge/patient-care/how-to-care-for-bedridden-patient/`
❌ Rejected under §9.1. Clinical instruction from an unqualified publisher.

**Publishable replacement:**
`/knowledge/patient-care/preparing-your-home-for-a-bedridden-patient/`

Contents: choosing and setting up the room · access, lighting, and floor safety · what
equipment families typically arrange and where it is hired · bathroom and hygiene access ·
laundry load and how households handle it · what to confirm with the discharge team before
leaving hospital · what an attendant covers versus what stays with the family · how shifts
are typically arranged for a bedridden patient · when to ask the doctor rather than the
attendant.

Same reader. Same search intent. Substantially the same query capture. **Zero clinical
instruction, and every word of it inside this business's actual expertise.**

## 9.3 Honesty standard — inherited verbatim

`SERVICE_PAGE_SPEC.md` §3.4 and `LOCAL_SEO_MASTER_PLAN.md` §7.3 apply unchanged. Restated
because articles create new ways to breach them:

1. **No fabricated reviews, testimonials, ratings, or case studies.** Including composite or "illustrative" families. Six invented testimonials have already been removed from this site (`64147d5`); an article opening "One Kota family we helped…" is the same violation in prose.
2. **No statistics without a citable source.** Not "70% of families struggle with…". If it cannot be sourced, it cannot be written.
3. **No invented credentials, certifications, awards, or medical reviewers.**
4. **No prices, ever** (`SERVICE_PAGE_SPEC.md` §3.3). Cost *factors* may be explained; figures may not.
5. **No guarantees** — response times, outcomes, or availability (D5-gated).
6. **No superlatives** — "best", "No. 1", "leading", "trusted by thousands".
7. **Every claim must be true today**, not aspirational. If a practice is planned rather than current, it is written in the future tense or not at all.
8. **Evidence ledger before any numeric claim** — the standard already applied to service pages.

## 9.4 No AI filler — an operational definition

"No AI fluff" is unenforceable as a slogan. These are the reviewable symptoms, and any one
of them sends a draft back:

| Symptom | Example |
|---|---|
| Restating the question as a paragraph | "Caring for an elderly parent is a challenging journey that many families face." |
| Listing without informing | "Benefits include: comfort, safety, peace of mind." |
| Hedged non-answers | "Every family's situation is unique, so it's important to consider your needs." |
| Concluding by summarising | A final section that adds nothing the article has not said |
| Unattributable specificity | Numbers, timings, or claims nobody in the business can source |
| Empty transitions | "In today's fast-paced world" · "It's worth noting that" |

**The test:** could a competent writer with no connection to this business have produced
this paragraph? If yes, it earns nothing and should be cut. Every article must contain at
least one thing that could only come from actually doing this work in Kota.

## 9.5 Tone and readability

Matches the existing site voice exactly — the one already established across seven service
pages and the careers page.

- **Plain, direct, specific.** Short sentences. Concrete nouns.
- **Second person** for the reader; **"we"** for the business — never third-person corporate.
- **Calm.** No urgency, no fear appeals. Readers arriving at these articles are often already frightened; the content's job is to reduce that, not trade on it.
- **Reading level:** comprehensible to a reader with functional English who is not a native speaker — a real constraint in this market. Target ~Grade 8. Prefer "hire" over "procure", "before" over "prior to".
- **Hindi/Hinglish terms** in common local use are fine where they are what a family would actually say, glossed on first use.
- **Never patronising.** These are adults managing a hard situation competently.

## 9.6 Review workflow

Six gates. An article does not advance until the current gate passes.

| # | Gate | Owner | Rejects on |
|---|---|---|---|
| 1 | **Topic approval** | Owner | Fails §7.2 scoring, or truth-safety veto |
| 2 | **Outline** | Writer → Owner | Wrong reader, wrong scope, overlaps an existing article |
| 3 | **Draft** | Writer | — |
| 4 | **Truth pass** | Owner | Any unevidenced claim, statistic, price, guarantee, or superlative |
| 5 | **YMYL pass** | Owner | Any clinical instruction per §9.1 |
| 6 | **Technical pass** | Engineer | Schema, links, meta, slug, front-matter validation, cache token |

**Gates 4 and 5 are separate on purpose.** They fail for different reasons and a single
combined "review" pass reliably catches one and misses the other.

**Owner sign-off is non-delegable at gates 1, 4 and 5.** These are the gates where the
business's integrity is actually at stake, and they are exactly the gates that get skipped
when a publishing cadence is under pressure — which is the real argument for 3 articles a
month rather than one a week.

## 9.7 Freshness and review cycles

| Content type | Review cycle | Trigger for out-of-cycle review |
|---|---|---|
| `local` | **6 months** | Any named hospital, supplier, or facility changes |
| `guide`, `preparation` | 12 months | Service scope change |
| `checklist` | 12 months | Any step becomes inaccurate |
| `explainer`, `comparison` | 18 months | — |

A review that changes nothing still counts as a review — it is logged, but `dateModified`
is **not** touched. Bumping `dateModified` without a material change is freshness
fabrication: dishonest, and ineffective anyway.

---

# §10 — CONVERSION STRATEGY

## 10.1 Principle

**The article's job is to be useful. The CTA's job is to be available.** A reader who
finishes an article better informed and does not contact us is a success — they will
remember where the help came from. This is a considered, emotionally weighted, often
urgent purchase; pressure tactics on a family researching care for a dying parent are both
repellent and counter-productive.

## 10.2 CTA placement — DECIDED

| Slot | Position | Form | Intensity |
|---|---|---|---|
| — | **Above the fold** | **None** | The reader came for an answer. Interrupting before delivering it forfeits the trust the article was written to earn |
| 9 | Mid-article, after the reader's main question is answered | One contextual link to the primary service, in prose | Minimal |
| 12 | Related services | Card links | Navigational |
| 14 | End of article | Existing `.prefooter-section` — Call · WhatsApp | Standard |
| — | Floating WhatsApp, sticky mobile call | Existing global | Ambient, already sitewide |

## 10.3 Never

Pop-ups · exit-intent overlays · newsletter interstitials · countdown timers · "only 2
slots left" · "limited availability" · guilt framing ("don't let your parents suffer") ·
auto-playing anything · chat widgets that open unprompted · gated content requiring an
email to read.

Several of these would also breach `PROJECT.md` §11 design principles (quiet confidence,
calm, minimal) and §19's no-redesign rule.

## 10.4 Intent-matched CTA copy

Different articles catch readers at different stages, and one CTA sentence cannot serve
all of them.

| Reader stage | Typical article | CTA framing |
|---|---|---|
| Researching, no decision | "Signs a parent needs daily support" | *"If you would like to talk it through, we are happy to answer questions with no obligation."* |
| Comparing options | "Full-time vs part-time vs night-only" | *"Tell us the situation and we will tell you honestly which arrangement usually fits."* |
| Preparing, already decided | "Preparing your home before discharge" | *"If you need someone in place before discharge, call us — we will tell you straight away what is possible."* |
| Urgent | Hospital-discharge articles | *"Call us. We will tell you within one conversation whether we can help."* |

Note what none of them claim: no response-time promise (D5-gated), no availability
guarantee, no pricing.

## 10.5 Measurement

Reuse the existing GA4 event layer in `assets/js/main.js` — no new analytics dependency.
Add `article_*` event parameters carrying category, content type, and primary service, so
the reportable question becomes *"which clusters produce contacts"* rather than *"which
articles get traffic."*

**The success metric for the Knowledge Center is contacts attributable to knowledge
sessions — not pageviews.** Pageviews on a platform like this are a vanity metric and,
worse, one that rewards exactly the thin, broad content §9 forbids.

---

# §11 — FUTURE EXPANSION (ARCHITECT ONLY — DO NOT BUILD)

For each: what is reserved now, what it costs later, and what must not be done today.

| Capability | Reserved now | Cost when built | Do NOT do now |
|---|---|---|---|
| **Advanced search** | `/assets/search-index.json` path; front-matter fields that populate it | Generator emits the index; ~150 lines vanilla JS | Do not add a search box that does nothing. Do not add a CDN search library — CSP is `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com`; any library must be **self-hosted** under `/assets/js/` |
| **Filters** | `content_type`, `category`, `tags` in front matter | Client-side filtering on category pages | Filters must **not** create URLs. Query params only, canonical always to the clean category URL |
| **Author pages** | `/knowledge/authors/<slug>/` path; `author` field already an entity reference not a string | One page per author + schema swap | **Do not invent authors** (§4.5). Organization byline until a real, named, consenting person exists |
| **Medical reviewers** | `reviewedBy` shape in the Article schema | Add reviewer, add visible "Reviewed by" line | **Do not fabricate a reviewer.** This is the highest-severity honesty breach available on this platform |
| **Hindi** | `/hi/` prefix kept free; no top-level `hi` directory | Full mirror + `hreflang` + `x-default` + translated nav/footer. **Roughly doubles maintenance permanently** | Do not machine-translate. Bad Hindi in this market is worse than English |
| **Downloads** | `/assets/downloads/` path; `checklist` content type already distinguishes printables | PDF generation + `DownloadAction` | **Do not gate behind email.** Gating creates a new personal-data category and would require another Privacy Policy amendment — and contradicts the trust posture the whole platform is built on |
| **Video** | `VideoObject` shape reserved | Embed + schema | CSP `frame-src` is currently `https://www.google.com` **only**. YouTube embeds require a CSP change — a security decision, not a content one |
| **AI recommendations / AI search citation** | Complete, consistent front matter from article #1 | Read existing metadata | Nothing. **This is why front-matter discipline matters from the first article** — a corpus with inconsistent metadata cannot be retrofitted cheaply |
| **Voice search** | Question-form `<h2>`s; concise direct answers | Optional `speakable` | Do not add `speakable` speculatively (§5.10) |
| **Related resources on service pages** | Slot already dormant in `SERVICE_PAGE_SPEC.md` §3.5 | Populate at the 3-article threshold (§6.4) | Never ship it empty |

**The load-bearing insight:** almost every future capability depends on **structured,
complete, consistent article metadata**. Nothing else in this document is as cheap to do
correctly now and as expensive to retrofit later.

---

# §12 — FILE STRUCTURE

```
QUALITY-CARE-SERVICES/
├── knowledge/
│   ├── index.html                                   /knowledge/
│   ├── patient-care/
│   │   ├── index.html                               /knowledge/patient-care/
│   │   ├── preparing-your-home-for-a-bedridden-patient/
│   │   │   └── index.html                           /knowledge/patient-care/preparing-…/
│   │   └── <article-slug>/index.html
│   ├── elder-care/            ├── index.html + <article-slug>/index.html
│   ├── mother-newborn-care/   ├── …
│   ├── child-care/            ├── …
│   ├── maid-services/         ├── …
│   ├── home-cook-services/    ├── …
│   ├── housekeeping-cleaning/ ├── …
│   ├── choosing-care/         ├── …
│   ├── family-resources/      ├── …
│   ├── kota/                  └── …
│   └── checklists/index.html          ← curated LIST page, not a category (§1.3)
│
├── content/                            🔒 repo-only, never published
│   ├── articles/<category>/<slug>.md   front matter + body, one file per article
│   ├── taxonomy.yml                    closed vocabularies: categories, types, tags
│   └── EDITORIAL_STANDARDS.md          §9 as a working checklist
│
├── tools/                              🔒 repo-only, never published
│   ├── build_article.py                content/*.md → knowledge/**/index.html
│   ├── build_indexes.py                hub, category pages, checklists index
│   ├── build_sitemaps.py               sitemap index + 3 children
│   ├── build_search_index.py           reserved, not built (§11)
│   └── validate.py                     front matter, links, schema, FAQ 1:1, cache tokens
│
├── assets/css/style.css                +120–170 lines (§4.3), single commit
├── assets/js/main.js                   +article_* GA4 params only
├── assets/search-index.json            reserved (§11)
│
├── sitemap.xml                         → becomes a sitemap INDEX (§5.9)
├── sitemap-core.xml
├── sitemap-knowledge.xml
├── sitemap-knowledge-articles.xml
└── netlify.toml                        +3 hub guards. ZERO per-article rules (§2.2)
```

## 12.1 Publish-security requirement — MANDATORY, easy to forget

`netlify.toml` line 2 is `publish = "."` — **the repository root is the deployed
directory.** Anything committed is public unless explicitly blocked. This has already
caused a live incident in this project (defect B5: internal documentation served in
production).

`content/` and `tools/` therefore **must** get directory splat blocks in the **same commit
that creates them**:

```toml
[[redirects]]
  from = "/content/*"
  to = "/404.html"
  status = 404
  force = true

[[redirects]]
  from = "/tools/*"
  to = "/404.html"
  status = 404
  force = true
```

Directory splats are **fail-closed** — every future file in those trees is protected on
creation, unlike the fail-open per-file root blocklist that produced B5. The file's own
comments (lines 119–131) already prescribe exactly this pattern.

**Note:** creating this planning document has itself triggered that convention. A blocklist
rule for `/KNOWLEDGE_CENTER_ARCHITECTURE.md` ships alongside it.

---

# §13 — IMPLEMENTATION ROADMAP

Sprint E8, in the project's established rhythm: **Implement → Self Review → Commit → Stop →
Independent QA.** One logical change per commit.

## Gate 0 — before any code

| Task | Output | Blocks |
|---|---|---|
| **E8-D** | Owner decisions D-6 … D-13 resolved | Everything |
| **E8-A** | `PROJECT.md` amendment (§8, §9, §19, §20) committed | E8-T1 |
| **E8-T0** | ⚠️ **Deploy-preview verification** of directory-index behaviour: does `/knowledge/x/y/index.html` 301 to `/knowledge/x/y/`? Does the trailing-slash form 200? Test on a preview branch with two throwaway pages | E8-T1. **This is the SP-T1 lesson. Do not skip it.** |

## Build sprints

| Task | Deliverable | Notes |
|---|---|---|
| **E8-T1** | `netlify.toml` guards + sitemap index restructure | Zero per-article rules. Mirrors the `/careers/` guard pattern |
| **E8-T2** | `/knowledge/` hub + article CSS | The one commit that touches `style.css` → cache-token bump across **all** pages |
| **E8-T3** | **Reference article, certified** | The E4 method. One article, reviewed to death, becomes the frozen template |
| **E8-T4** | 10 category index pages | Each ships with ≥1 article; never an empty category |
| **E8-T5** | Nav + footer integration across all existing pages | Same mechanical shape as E6-T3 |
| **E8-T6** | `tools/` generator + validator | **The scalability gate — see §14 R-1** |
| **E8-T7** | Articles 2–9 (Q1 set) | Generated, not hand-written |
| **E8-T8** | Activate Related Resources on services crossing 3 articles | Reverse links |
| **E8-T9** | GA4 `article_*` parameters | Measurement |
| **E8-T10** | `/knowledge/checklists/` curated index | Once ≥5 checklists exist |
| **E9+** | Search · filters · topic pages · Hindi | Each its own sprint, each behind its threshold |

## Sequencing note

**E8-T6 (the generator) is placed after the reference article deliberately.** Building a
generator before knowing exactly what it must emit produces the wrong generator. Certify
the artefact by hand first, then automate reproducing it — the same order that made the
service-page template work.

---

# §14 — ENGINEERING REVIEW

Risks by severity. Each has a mitigation and an owner.

## R-1 · CRITICAL — no build step; template drift at scale

**This is the risk that decides whether the platform survives.**

Every page in this repository is hand-authored HTML with no templating layer. Evidence of
the failure mode already exists at 12 pages:

- E6-T3 (add one nav link) required editing **11 files**.
- Commit `dfb456c` exists because a real CSS fix was invisible for three commits — 8 pages still requested a stale `?v=` token under a one-year immutable cache. The bug was **cache-token drift across hand-edited pages.**

At 500 articles, one nav change is 511 file edits, and the probability that all 511 cache
tokens stay synchronised by hand is effectively zero. **Hand-authoring does not reach 500
articles. It probably does not reach 50.**

**Mitigation — E8-T6.** A repo-local Python generator: `content/*.md` → static HTML,
one template, one place to change the nav, one place to bump the cache token, plus a
validator enforcing front matter, FAQ 1:1 mirroring, link resolution, schema validity, and
token uniformity.

**This does not violate `PROJECT.md` §19's framework prohibition.** The prohibition is on
the *deployed stack* — React, Next.js, Bootstrap, Tailwind. The deployed output remains
exactly what it is today: hand-shaped, dependency-free, vanilla static HTML. The generator
is a repository tool that never ships, in the same category as the verification scripts
already used in every sprint. **⬜ D-11** confirms this reading.

**If D-11 is declined:** the honest consequence is a hard cap of roughly 40–50 articles,
and every global change becomes a scripted bulk edit anyway. That is a legitimate choice —
36 articles is the year-one plan regardless — but it must be a *choice*, not a discovery
made at article 60.

## R-2 · HIGH — YMYL exposure

Health-adjacent content from a non-medical publisher. A single article giving clinical
instruction can damage sitewide trust evaluation, and can harm someone.
**Mitigation:** §9.1 boundary; gate 5 as a separate non-delegable review; disclaimer slot;
`Organization` authorship with a true expertise claim rather than a fake medical one.

## R-3 · HIGH — content governance decay

Cadence pressure erodes gates 4 and 5 first. The corpus fills with the AI filler §9.4
describes, and by then it is 80 articles of debt.
**Mitigation:** 3/month, not 4+; §9.4's reviewable symptom list instead of a slogan;
quarterly corpus audit; and a standing rule that **skipping a month is always better than
publishing filler.**

## R-4 · HIGH — thin content at scale

Below-threshold tag pages, empty categories, near-duplicate local articles.
**Mitigation:** no tag pages below 6 articles; no category ships without an article; §8.4
find-replace test; 8-article local cap.

## R-5 · MEDIUM — cache-token discipline (the recurring one)

`/assets/*` is `max-age=31536000, immutable`. Any CSS change without a token bump on
**every** page is invisible. This has already happened once.
**Mitigation:** generator owns the token; validator fails the build on any mismatch; only
E8-T2 touches `style.css` in the whole sprint.

## R-6 · MEDIUM — netlify.toml growth

Already 422 lines. Splat rules and directory-index architecture keep it flat.
**Mitigation:** §2.2 (zero per-article rules); §12.1 splats not per-file blocks.

## R-7 · MEDIUM — CSP friction on future features

`style-src` has **no** `unsafe-inline` — reconciled in micro-sprint B at real cost. Any
generated inline style breaks silently in production while working locally.
**Mitigation:** validator rejects `style="` and `<style>` in generated output; search must
be self-hosted JS; YouTube requires an explicit `frame-src` decision.

## R-8 · MEDIUM — authority dilution

`LOCAL_SEO_MASTER_PLAN.md` §7.4's original concern: 500 knowledge URLs against 7
commercial pages inverts the site's centre of gravity.
**Mitigation:** §6.1 asymmetric link flow; 36-article year-one cap; conversion measured on
contacts, not pageviews.

## R-9 · LOW — sitemap `lastmod` accuracy

Already required one corrective micro-sprint at 11 URLs.
**Mitigation:** generated, never hand-edited; derived from `dateModified`.

## R-10 · LOW — image weight and Core Web Vitals

`/images/*` is 30-day cache; 500 articles could add hundreds of images.
**Mitigation:** WebP only, dimensions always specified, `loading="lazy"` below the fold,
hero images optional (slot 5 is conditional) rather than decorative-by-default.

## R-11 · LOW — second URL convention in one repository

Flat leaves under `/services/`, directory indexes under `/knowledge/`.
**Mitigation:** documented boundary (§2.4); the rule *"anything with children is a
directory index"* is already constitutional in `netlify.toml` lines 180–183.

---

# §15 — FINAL RECOMMENDATION

## 15.1 Build it, at one third of the assumed scale, on directory-index URLs, behind a generator

Four decisions carry the architecture:

**1 · Directory-index URLs with trailing slashes.** The flat-file convention that serves
seven service pages correctly costs two hand-written Netlify rules per page and does not
survive contact with 500 articles. Directory indexes cost zero, match the already-shipped
`/services/` and `/careers/` pattern, make breadcrumbs derivable from the path, and
eliminate the local-development mismatch that cost three hotfix commits in E5. The price
is one constitutional amendment on nesting depth — pay it.

**2 · Service-aligned taxonomy, exactly one axis in the URL.** Seven categories mirroring
the canonical seven, three cross-cutting, hard cap of ten. Content type and tags are
metadata, never URLs. This makes orphan articles structurally impossible and duplicate
content nearly so, and it is what separates a knowledge platform from a blog that grew.

**3 · A generator before the tenth article.** Hand-authored HTML has already produced a
cache-token drift bug at twelve pages. It will not reach five hundred. A repo-local
Python generator emitting the same vanilla static HTML is not a framework and does not
touch the deployed stack — it is the difference between a platform and an accumulating
liability.

**4 · Thirty-six articles in year one, not five hundred.** The architecture scales to 500.
The content plan commits to 36 — enough to cross the 3-article activation threshold on all
seven services, which is the only year-one outcome that matters commercially. Ten quality
articles beat fifty thin ones, and on health-adjacent content thin ones cause active harm.
**Keep the gap between capacity and commitment deliberate.**

## 15.2 The two things most likely to go wrong

**The YMYL boundary will be tested by the highest-traffic topics.** The queries with the
most volume are exactly the clinical ones §9.1 forbids. The reframe in §9.2 shows this
costs far less traffic than it appears to — but only if gate 5 is genuinely non-delegable.

**The capacity estimate will be optimistic.** It always is. If month three slips, the
correct response is to drop to 2/month, not to lower the review bar. A skipped month is
invisible; a filler article is permanent.

## 15.3 On the 5–10 year horizon

Three properties determine whether this is still working in 2035:

- **URLs never move.** Directory-index paths with no dates, no IDs, no localities, no years survive taxonomy changes, redesigns, translation, and a CMS migration if one ever happens.
- **Metadata is complete from article one.** Every future capability in §11 — search, filters, author pages, AI citation, Hindi — reads existing metadata. A corpus with sloppy front matter cannot be retrofitted cheaply, and this is the single cheapest thing to get right now.
- **The corpus stays small enough to keep true.** 500 articles nobody can review is worse than 80 anyone can defend. The freshness cycles in §9.7 are a commitment to maintain, and maintenance capacity — not authoring capacity — is the real long-term ceiling.

## 15.4 The one thing that outranks all of it

`LOCAL_SEO_MASTER_PLAN.md` §8.1 records the Google Business Profile as *"Highest-ROI
unblocked work available"*, and the E7 brief confirms verification is still pending.

**For a single-city home-care business, a verified GBP with real photos, correct NAP,
complete service listings and active Posts will out-perform this entire twelve-month
content roadmap.** Nothing in this document is an argument for sequencing the Knowledge
Center ahead of it. If capacity is genuinely scarce, GBP first, knowledge second.

---

# PART II — ENTERPRISE ARCHITECTURE REVIEW

Added at the v1.0 freeze review. Part I (§0–§15) is unchanged: no architecture was
redesigned, no principle altered, no URL, taxonomy or template decision revisited. Part II
adds the governance layer that Part I assumed but did not specify.

**Standing rule for this part:** a recommendation is included only if it makes the platform
more maintainable, more governable, or more scalable *at 500 articles*. Anything that only
makes the document look more thorough is rejected in writing, with the reason, in §24.1.

---

# §16 — CONTENT LIFECYCLE

## 16.1 The state machine

**DECIDED.** Nine states. Every article is in exactly one at all times, recorded in the
`status` front-matter field (§21).

```
                   ┌──────────────────────────────────────────────┐
                   │                                              │
   [idea] ──► DRAFT ──► TECHNICAL_REVIEW ──► TRUTH_REVIEW ──► SEO_REVIEW ──► APPROVED
                ▲              │                   │                │            │
                │              │ fail              │ fail           │ fail       │
                └──────────────┴───────────────────┴────────────────┘            │
                                                                                 ▼
                              ARCHIVED ◄────── NEEDS_REVIEW ◄──────────────► PUBLISHED
                                 │                    ▲                          │
                                 │                    └── scheduled review due ───┘
                                 ▼
                             REDIRECTED
```

**Any failed review returns the article to `DRAFT`.** Not to the previous gate. A truth
failure often means the argument was wrong, not the sentence — sending it back one step
invites patching a hole rather than fixing the reasoning.

## 16.2 State definitions

| State | Meaning | Who moves it out | Exit condition |
|---|---|---|---|
| **DRAFT** | Being written or rewritten. Not on disk as HTML. | Writer | Complete body, front matter, FAQs, declared links |
| **TECHNICAL_REVIEW** | Structure, schema, links, front matter, slug, template conformance | Engineer | Validator passes clean (§21.4) |
| **TRUTH_REVIEW** | Every claim evidenced; YMYL boundary; no fabrication | **Owner — non-delegable** | No unevidenced claim, no clinical instruction, no price, no guarantee, no superlative |
| **SEO_REVIEW** | Title, meta, headings, internal links, cannibalisation check | Engineer / SEO | Passes §5 and §22.4 |
| **APPROVED** | Signed off, not yet live. Exists so publication can be *scheduled* rather than coincident with approval | Owner | Publication date reached |
| **PUBLISHED** | Live, indexable, in the sitemap | — | Review date reached, or a trigger fires |
| **NEEDS_REVIEW** | **Still live and indexed.** Flagged as due or suspect. Not a soft-delete | Owner | Reviewed → back to PUBLISHED, or → DRAFT for rewrite, or → ARCHIVED |
| **ARCHIVED** | Deliberately retired. Removed from sitemap and from all internal links. **URL still returns 200** with a dated notice | Owner | Traffic decays, or content is superseded |
| **REDIRECTED** | URL 301s to a successor. Source file retained in `content/` for provenance | — | Terminal |

## 16.3 The two states that carry the most weight

**`NEEDS_REVIEW` means "due", not "broken".** The article stays live throughout. The
alternative — unpublishing on the review date — punishes the reader for an internal process
slipping. The only thing that pulls an article offline immediately is a **truth failure**,
which goes straight to `DRAFT`.

**`ARCHIVED` keeps the URL alive at 200.** Deleting a URL breaks every inbound link,
bookmark and WhatsApp share that ever pointed at it, and `PROJECT.md` §9 forbids silently
dropping a path. An archived article keeps its URL, gains a dated notice at the top
("This article was last reviewed on *date* and is kept for reference; our current guidance
is *link*"), loses its sitemap entry, and is removed from internal link modules. It is
`noindex` only if the content is actively misleading — otherwise the honest signal is a
stale-but-labelled page, not a hidden one.

**`REDIRECTED` is used only when a genuine successor exists** and the old URL should not
be a destination — a merge or a supersession. It is never used to tidy up.

## 16.4 Reconciling with §9.6

§9.6 defines six editorial gates. §16 defines nine states. They are the same process
viewed as workflow and as data, and they map exactly:

| §9.6 gate | §16 state |
|---|---|
| 1 Topic approval | *(pre-`DRAFT`; recorded on the inventory row, not as a state)* |
| 2 Outline | DRAFT |
| 3 Draft | DRAFT |
| 4 Truth pass | TRUTH_REVIEW |
| 5 YMYL pass | TRUTH_REVIEW *(same gate, two distinct checklists — see below)* |
| 6 Technical pass | TECHNICAL_REVIEW + SEO_REVIEW |

**§9.6 remains the operational checklist. §16 is the state field.** Neither supersedes the
other and neither should be edited without the other.

Two notes on collapsing:

- **Truth and YMYL stay one state but two checklists.** They are the same reviewer at the same sitting; making them separate states would imply they can be scheduled apart, which invites doing one and deferring the other. Two signed checklists inside one state is the honest structure.
- **Technical and SEO are separate states even though the same person performs both.** They fail for genuinely different reasons — a broken schema and a cannibalising title are unrelated defects — and batching them is what lets the second one slip. They may be performed in one sitting; they may not be signed in one action.

## 16.5 Transition rules

1. **No state skipping, ever** — including for a one-paragraph correction. A typo fix is a `PUBLISHED → PUBLISHED` edit that never enters the pipeline; anything that changes meaning re-enters at `DRAFT`.
2. **Only `TRUTH_REVIEW` can be failed for a reason that is not written down.** Owner judgement is final and needs no justification. Every other gate must cite a specific rule.
3. **A state change is a commit.** The front-matter `status` field and the git history are the audit trail; no separate log.
4. **`APPROVED` may not sit longer than 30 days.** Beyond that the truth review is stale and the article returns to `TRUTH_REVIEW`.
5. **Nothing enters `PUBLISHED` without a `next_review` date** already set (§18).

---

# §17 — CONTENT OWNERSHIP

## 17.1 Roles are distinct even when the person is not

**DECIDED, and this is the point of the section.** Today one person — the owner — will
hold most of these roles. That is not a reason to collapse the fields.

Recording four roles that resolve to one name costs nothing today and means that
delegating a role later is a **data change, not a schema change**. Collapsing them now
means that hiring a writer in year two requires touching every article ever published.

**What must not happen:** inventing distinct names to make the fields look populated.
`SERVICE_PAGE_SPEC.md` §3.4 forbids fabricated people, and §4.5 already applies this to
bylines. If the owner is the truth reviewer, the field says the owner.

## 17.2 The ownership fields

| Field | Definition | V1 value | Delegable? |
|---|---|---|---|
| `content_owner` | Accountable for this article being correct and current for its whole life. The person the review reminder goes to. | Owner | Later, per-category |
| `author` | Wrote it. **Public-facing byline is the Organization** (§4.5) — this field is internal attribution | Owner, or writer's name once one exists | Yes |
| `technical_reviewer` | Signed `TECHNICAL_REVIEW` and `SEO_REVIEW` | Engineer | Yes |
| `truth_reviewer` | Signed `TRUTH_REVIEW`. **Non-delegable at V1** | Owner | **No** — see 17.3 |
| `medical_reviewer` | Reserved. Empty at V1. | *(absent)* | Only to a real, named, credentialed, consenting person |
| `last_reviewed` | Date of the most recent completed review, whether or not anything changed | ISO date | — |
| `next_review` | Scheduled date, computed from `review_frequency` | ISO date | — |
| `review_frequency` | Months. Defaults by content type (§9.7), overridable per article | Integer | — |

## 17.3 Why `truth_reviewer` is non-delegable

Everything else on this platform can be checked against a rule. Truth review is the one
gate whose standard is *"do we actually know this, and is it true of this business today"* —
and only the person running the business holds that knowledge. This is the same reasoning
that made the owner the sole approver of D3 and D4 rather than something I could infer.

Delegating it is possible eventually, but it is a **deliberate, documented handover**, not
a default that erodes under cadence pressure. This is R-3 (governance decay) written into
the schema.

## 17.4 What is explicitly rejected here

- **A RACI matrix.** Four roles and one accountable person do not need one.
- **Multi-approver sign-off.** Two approvers on a three-article-a-month cadence produces diffusion of responsibility, not rigour.
- **Per-article role assignment ceremony.** Roles default from `taxonomy.yml`; the front matter only records the exception.

---

# §18 — CONTENT INVENTORY

## 18.1 Purpose

One row per article, for the whole life of the article. It answers the questions the
individual files cannot: *what do we have, what is due, what is orphaned, what is not
earning its place.*

**Location:** `content/inventory.csv` — repo-only, blocked from publish by the `/content/*`
splat (§12.1).

**Format: CSV.** Not a spreadsheet file, not JSON, not a database. CSV diffs readably in
git, opens in any tool the owner already has, and imports into any future CMS without a
converter. **RECOMMENDED.**

## 18.2 Fields

| Field | Type | Source | Notes |
|---|---|---|---|
| `id` | `KB-0001` | Assigned once | See 18.3 |
| `slug` | string | Front matter | Immutable after publication (§2.6) |
| `url` | absolute | Derived | `category` + `slug` |
| `title` | string | Front matter | May change; slug may not |
| `category` | enum | Front matter | One of ten (§1.2) |
| `content_type` | enum | Front matter | One of six (§3.2) |
| `primary_service` | enum | Front matter | **Mandatory.** One of the canonical seven |
| `secondary_services` | list | Front matter | 0–3 |
| `status` | enum | Front matter | One of nine (§16) |
| `content_owner` | string | Front matter | §17 |
| `published` | ISO date | Front matter | Set once |
| `updated` | ISO date | Front matter | Material edits only |
| `last_reviewed` | ISO date | Front matter | Includes no-change reviews |
| `next_review` | ISO date | Derived | `last_reviewed` + `review_frequency` |
| `inbound_internal_links` | integer | **Computed** | Orphan detection (§22.7) |
| `outbound_service_links` | integer | **Computed** | Must be ≥ 1 |
| `word_count` | integer | Computed | Feeds reading time |
| `notes` | free text | Manual | Why it exists, what it is waiting on |

## 18.3 Article IDs — accepted, but in the cheap form

The brief asks for a unique ID. **Accepted, as a human-readable sequential key: `KB-0001`,
`KB-0002`, …** Assigned at `DRAFT`, never reused, never changed — including when an
article is archived, redirected, or moved between categories.

**UUIDs are rejected.** They are unreadable in a commit message, unsayable in a
conversation, and solve a collision problem that does not exist at 500 rows.

The slug is already immutable and unique, so the ID earns its place on exactly two
grounds, both real: it survives a **category change** (which changes the URL while the
slug persists), and it is the stable join key for a **future CMS migration**.

## 18.4 Traffic and conversions — REJECTED as stored fields

The brief lists `Traffic` and `Conversions` as inventory fields. **I recommend against
storing them, and this is a genuine architectural objection rather than a preference.**

| Problem | Consequence |
|---|---|
| Stale the moment they are written | A number in a CSV has no timestamp and no window; nobody can tell whether it means last month or last year |
| Hand-transcribed from GA4 | Transcription error, at 500 rows, quarterly |
| Ambiguous | Sessions or users? Which window? Conversions attributed how? |
| **Actively misleading** | A retirement decision (§22.8) made on a stale number is a wrong decision made confidently |

**Instead:** the inventory holds the **join key** (`url`), and metrics are pulled fresh
from GA4 and Search Console **at review time** into a dated quarterly snapshot
(`content/reviews/YYYY-Qn.csv`). Metrics live where they are measured; the inventory holds
what only the inventory knows.

This preserves every use the brief intended — retirement decisions, rewrite decisions,
cluster performance — while removing the decay. It is also strictly less work.

## 18.5 CMS migration path

The inventory is designed so that adopting a CMS later changes **nothing public**:

| Layer | Migrates? |
|---|---|
| URLs | ❌ Never — the whole point of §2 |
| Taxonomy | ❌ Category/type/tag vocabularies import as-is |
| Article bodies | ✅ Markdown imports into any CMS |
| Front matter | ✅ §21 maps 1:1 onto standard CMS fields |
| Inventory | ✅ CSV is the import file |
| Templates | ✅ Rebuilt in the CMS to emit the same HTML |

**A CMS migration under this architecture is an authoring-tool change, not a website
change.** No URL moves, no redirect map, no ranking loss. That property is the return on
the front-matter discipline §11 insisted on.

---

# §19 — CONTENT GOVERNANCE (QUARTERLY REVIEW)

## 19.1 Cadence

**One review per quarter, timeboxed to half a day, covering only what is due.** Not a full
corpus audit — a full audit of 500 articles is a thing that gets scheduled, dreaded, and
then skipped. A quarterly pass over the ~15–25 articles that are actually due is a thing
that happens.

**Scope:** every article whose `next_review` falls in the quarter, plus every article
flagged by an automated check.

## 19.2 The nine checks

| # | Check | Automated? | Fails when |
|---|---|---|---|
| 1 | **Outdated content detection** | Semi | `next_review` past due; or a service scope change touches its `primary_service`; or a `local` article names a facility |
| 2 | **Broken links** | ✅ Fully | Any internal link ≠ 200; any external link ≠ 200 for two consecutive quarters |
| 3 | **Image review** | Manual | Missing/inaccurate alt text; image no longer represents the text; licence expired or unverifiable (§20.7) |
| 4 | **SEO review** | Semi | Title/meta drift outside the bands; no impressions after 2 quarters live; cannibalisation flag (§22.4) |
| 5 | **Fact verification** | Manual, **owner** | Any claim no longer true of the business today |
| 6 | **FAQ freshness** | Semi | FAQ ≠ JSON-LD 1:1; a question no longer asked; a new recurring question absent |
| 7 | **Internal link audit** | ✅ Fully | `inbound_internal_links` = 0; `outbound_service_links` = 0; anchor-text over-repetition across the corpus |
| 8 | **Retirement assessment** | Manual | §19.4 criteria met |
| 9 | **Rewrite assessment** | Manual | §19.5 criteria met |

Checks 2 and 7 run in CI on every commit, not only quarterly — they are cheap and they
catch regressions on the day they are introduced rather than up to 90 days later.

## 19.3 Outputs

Each quarterly review produces exactly two artefacts:

1. `content/reviews/YYYY-Qn.csv` — the dated metrics snapshot (§18.4) plus a per-article verdict: `keep` · `refresh` · `rewrite` · `archive` · `redirect`.
2. Commits implementing the verdicts. **No verdict is recorded without a resulting commit or an explicit deferral reason.** A review that produces a list and no changes is a review that did not happen.

## 19.4 Retirement criteria — ARCHIVE

Archive when **any** of these holds:

- The service it supports no longer exists, or its scope changed such that the article misleads.
- It has been live ≥ 4 quarters with **near-zero impressions** *and* zero inbound internal links *and* nobody in the business would send it to a customer.
- It has been superseded but has **no single successor** (if there is one, `REDIRECT` instead).
- It can no longer be made truthful without a rewrite nobody will do.

**Never archive for being old.** Age is not decay; an evergreen article that is still true and still useful is doing its job at year seven.

## 19.5 Rewrite criteria — DRAFT

Rewrite when:

- **Truth drift** — a material claim is no longer accurate. *Immediate, does not wait for the quarter.*
- **Intent drift** — search results for the target query now answer a different question.
- **Cannibalisation** — two articles compete; one is rewritten to differentiate or merged (§22.4).
- **Quality debt** — an early article no longer meets the standard the corpus has since reached.
- Ranking on page 2 for a query it should own, with the gap being depth or specificity rather than authority.

**Refresh vs rewrite:** a *refresh* updates facts and touches `updated`. A *rewrite* re-enters at `DRAFT` and passes all four gates again.

## 19.6 What is rejected

- **A monthly review cycle.** Nothing meaningful changes in 30 days, and the calendar entry would be ignored by month four.
- **A content scoring rubric (0–100).** Precision theatre. The five-verdict enum is more decidable and less arguable.
- **Automated content-decay alerting.** At 36 articles a year, `next_review` in a CSV is sufficient. Revisit above ~150 articles.

---

# §20 — IMAGE ARCHITECTURE

## 20.1 The rule that comes before all the technical ones

**DECIDED — this is an honesty rule, not a media rule.**

> **No image may imply something untrue.** A stock photograph must never be presented,
> captioned, or contextually framed as a real client, a real member of staff, or a real
> Kota home.

`SERVICE_PAGE_SPEC.md` §3.4 forbids fabricated testimonials; a stock photo of a smiling
family under a caption implying they are a client is the same fabrication in a different
medium, and a more persuasive one. The site already removed six invented testimonials
(`64147d5`) for exactly this reason.

Three permitted image classes, and no fourth:

| Class | Use | Constraint |
|---|---|---|
| **Owned** | Real photos of real work | **Written consent required before capture**, per the existing SP-T7 consent rule. Faces of patients or children: additional explicit consent, and prefer not to |
| **Licensed stock** | Illustrative, generic | Never captioned or framed as depicting this business, its staff, or its clients |
| **Diagrams / illustrations** | Explaining a process or layout | Original; no medical illustration (§9.1) |

## 20.2 Hero images — conditional, never decorative

Slot 5 is **conditional** (§4.2). An article ships without a hero rather than with a
stock photo chosen to fill a hole. A generic hero costs LCP, costs bandwidth on the mobile
connections most of this audience uses, and communicates nothing.

| Property | Standard |
|---|---|
| Aspect ratio | **16:9** (`1600×900`) — deliberately *not* the hero pages' 1920×1072, because articles are content-width, not full-bleed |
| Format | WebP only |
| Weight | ≤ 120 KB |
| Loading | `loading="eager"`, `fetchpriority="high"` — it is the LCP element |
| Dimensions | `width` and `height` **always** present — CLS |
| `object-fit` | `cover` with an explicit `aspect-ratio` — the E5 hero-crop lesson |

## 20.3 In-body images

| Property | Standard |
|---|---|
| Max rendered width | 800 px (content column) |
| Source width | 1600 px (2× for retina) |
| Format | WebP |
| Weight | ≤ 80 KB |
| Loading | `loading="lazy"`, `decoding="async"` |
| Caption | Optional; when present it must add information, not restate the alt text |

## 20.4 Alt text

**Describe the function, not the file.** Alt text answers *"what would a sighted reader
learn from this image that the surrounding text does not say?"*

| ❌ | ✅ |
|---|---|
| `alt="image"` · `alt="patient care"` | `alt="A hospital bed positioned away from the wall on three sides, leaving room to move around it"` |
| Keyword stuffing | Plain description |
| Repeating the caption verbatim | Complementing it |
| Alt text on a purely decorative image | `alt=""` — correct and required |

Validator enforces: every `<img>` has an `alt` attribute; no `alt` is empty **unless** the
image carries `role="presentation"`; no `alt` exceeds 125 characters.

## 20.5 Naming convention

```
images/knowledge/<category>/<article-slug>-<n>.webp
images/knowledge/patient-care/preparing-your-home-for-a-bedridden-patient-1.webp
```

Lowercase, hyphens, ASCII, no spaces, no ampersands, no capitals — **the E5 hero-image
lesson**, where supplied filenames carried trailing spaces, `&` and capitals and had to be
renamed before use. The path mirrors the URL tree, so an article's images are locatable
from its slug alone and removable with the article.

## 20.6 Responsive behaviour

`srcset` at **two** widths (800 / 1600) with `sizes`. Not five. Two widths cover the real
device population, and each additional variant multiplies the storage, the build step and
the number of files that can go stale. **Revisit only if measurement shows a problem.**

No `<picture>` element and no JPEG fallback: WebP support is universal in this audience's
browsers, and the site already ships WebP-only imagery.

## 20.7 Licensing

| Requirement | Rule |
|---|---|
| Provenance record | Every non-owned image gets a row in `content/image-licences.csv`: file, source, licence type, licence URL, date acquired, permitted uses |
| Prohibited | Google Image search results; "found online"; anything whose licence cannot be produced on request |
| Consent | Owned photos of identifiable people: written consent on file before publication (existing SP-T7 rule) |
| Quarterly check | Check 3 (§19.2) verifies the licence row still resolves |

**An image whose licence cannot be evidenced is treated exactly like a claim whose source
cannot be produced: it does not ship.**

## 20.8 WebP strategy

Already the site standard; no migration needed. AVIF is **deliberately not adopted** — it
would add a second format, a `<picture>` element, and a build variant for a marginal size
gain on images already under 120 KB. Reconsider if AVIF becomes single-format viable.

## 20.9 Compression and weight budgets

**Budgets are a gate, not a target.** An image over budget does not ship; it is
recompressed, cropped, or dropped. Slot 5 is conditional precisely so that "drop it" is
always an available answer.

| | Hero | In-body | Diagram |
|---|---|---|---|
| Source width | 1600 px | 1600 px | 1200 px |
| **Ceiling** | **120 KB** | **80 KB** | **40 KB** |
| Target | 60–90 KB | 30–60 KB | ≤20 KB |
| WebP quality | 78–82 | 75–80 | Lossless or 90 |
| Metadata | Stripped — EXIF, GPS, camera data | Stripped | Stripped |

**Quality 78–82, not 90.** Above ~85 the file grows steeply for a difference invisible on
the mobile screens most of this audience uses. Encode once at the chosen quality from the
original; never re-encode an already-compressed WebP — generational loss is cumulative and
irreversible.

**Stripping metadata is a privacy requirement, not an optimisation.** A photograph taken in
a client's home carries GPS coordinates in EXIF by default. Publishing that would disclose
a client's home address, which the Privacy Policy does not permit and no consent form
covers. **The validator rejects any image retaining EXIF.**

**Per-article page-weight ceiling: 500 KB total, images included**, on the assumption of a
mid-range Android on a mobile connection. Articles are read by people sitting in hospital
corridors; the budget reflects that rather than a desktop review.

Encoding is a manual `cwebp` step at V1 and a generator step at E8-T6 — the tool changes,
the budgets do not.

---
# §21 — FRONT MATTER SPECIFICATION

## 21.1 Status: a contract, not a build dependency

**DECIDED.** This specification is binding **from article one, whether or not a generator
ever exists.** Front matter is written by hand into `content/articles/<category>/<slug>.md`
and read by a human today; it is read by a script tomorrow. Nothing here requires D-11.

The reason is §11's load-bearing insight: **every future capability reads existing
metadata, and a corpus with inconsistent metadata cannot be retrofitted cheaply.** The
cost of the contract is a dozen lines per article. The cost of not having it, discovered at
article 80, is re-reading and re-annotating 80 articles.

## 21.2 The contract

```yaml
---
# ── Identity ──────────────────────────────────────────────
id:                 KB-0004               # assigned once, never reused or changed
slug:               preparing-your-home-for-a-bedridden-patient
title:              Preparing Your Home for a Bedridden Patient
description:        >-                    # 149–158 chars, §5.2
  What to arrange in the room, bathroom and daily routine before someone
  bedridden comes home from hospital in Kota.
canonical:          https://qualitycareservices.in/knowledge/patient-care/preparing-your-home-for-a-bedridden-patient/

# ── Taxonomy ──────────────────────────────────────────────
category:           patient-care          # one of ten,  §1.2   → IN THE URL
content_type:       preparation           # one of six,  §3.2   → not in URL
primary_service:    patient-care          # MANDATORY,   §3.4   → one of the canonical seven
secondary_services: [elder-care]          # 0–3
tags:               [hospital-discharge, home-setup, bedridden]   # 0–5, closed vocabulary

# ── Lifecycle ─────────────────────────────────────────────
status:             published             # one of nine, §16
published:          2026-09-14            # set once
updated:            2026-09-14            # material edits only
last_reviewed:      2026-09-14
review_frequency:   12                    # months; default by content_type, §9.7
next_review:        2027-09-14            # derived

# ── Ownership ─────────────────────────────────────────────
content_owner:      owner                 # §17
author:             owner                 # internal; public byline is the Organization
technical_reviewer: engineer
truth_reviewer:     owner                 # non-delegable, §17.3
# medical_reviewer:                       # RESERVED — omit until a real person exists

# ── Relationships ─────────────────────────────────────────
related_articles:   [KB-0001, KB-0007]    # 2–4, curated, §3.5
hero_image:         images/knowledge/patient-care/preparing-your-home-…-1.webp   # optional
hero_alt:           A hospital bed positioned away from the wall on three sides
disclaimer:         true                  # §4.5 — required for health-adjacent content
---
```

## 21.3 Field rules

| Field | Required | Mutable | Validation |
|---|---|---|---|
| `id` | ✅ | ❌ Never | `^KB-\d{4}$`, unique |
| `slug` | ✅ | ❌ After publication | §2.6 rules; unique within category |
| `title` | ✅ | ✅ | Non-empty; decoupled from slug |
| `description` | ✅ | ✅ | 149–158 chars |
| `canonical` | ✅ | ❌ | Must equal derived URL exactly |
| `category` | ✅ | ⚠️ Only with a 301 | Member of the ten |
| `content_type` | ✅ | ✅ | Member of the six |
| `primary_service` | ✅ | ✅ | **One of the canonical seven. Build fails if absent** |
| `secondary_services` | ❌ | ✅ | ≤3, canonical seven, excludes primary |
| `tags` | ❌ | ✅ | ≤5, all present in `taxonomy.yml` |
| `status` | ✅ | ✅ | Member of the nine |
| `published` | ✅ when published | ❌ | ISO 8601 |
| `updated` | ✅ | ✅ | ≥ `published` |
| `last_reviewed` | ✅ | ✅ | ≥ `published` |
| `review_frequency` | ✅ | ✅ | Integer months |
| `next_review` | derived | — | `last_reviewed` + frequency |
| `content_owner` · `author` · `technical_reviewer` · `truth_reviewer` | ✅ | ✅ | Non-empty; real |
| `medical_reviewer` | ❌ | ✅ | **Omit unless real.** Never a placeholder |
| `related_articles` | ✅ from KB-0005 | ✅ | 2–4 valid published `id`s, not self |
| `hero_image` / `hero_alt` | ❌ | ✅ | Both or neither; alt ≤125 chars |
| `disclaimer` | ✅ | ✅ | Boolean; **true** for anything health-adjacent |

## 21.4 Validation rules

These are the checks a validator enforces — and, until one exists, the checklist a human
runs at `TECHNICAL_REVIEW`. They are the same list either way.

1. Every required field present and well-typed.
2. `primary_service` ∈ canonical seven. **Hard fail** — this is §3.4's anti-orphan guarantee.
3. `category` ∈ the ten; `content_type` ∈ the six; every tag ∈ `taxonomy.yml`.
4. `canonical` equals the derived URL character for character.
5. `slug` unique within category; `id` unique globally; neither changed since publication.
6. Every `related_articles` id resolves to a **published** article; no self-reference.
7. Visible FAQ count = `FAQPage` entry count, **text-identical** (the rule already verified on 12 pages).
8. Every `<img>` has `alt`; `alt` ≤ 125 chars; `hero_alt` present iff `hero_image` present.
9. No inline `style=` and no `<style>` block — **CSP `style-src` has no `unsafe-inline`** (R-7).
10. Cache-buster token identical on every page in the commit (R-5).
11. Every internal link resolves 200 on the local server.
12. `disclaimer: true` wherever the body touches health, medication or infant care.
13. `medical_reviewer`, if present, is non-empty and not a placeholder string.
14. Body contains no `₹`, no price figure, no superlative from the blocklist, no response-time guarantee.

Checks 7, 9, 10 and 11 are **already implemented** as ad-hoc Python in every sprint's
self-review. E8-T6 consolidates them into `tools/validate.py`; nothing new is invented.

## 21.5 Rejected fields

| Rejected | Why |
|---|---|
| `keywords` | Meta keywords have been ignored for over a decade; the field invites keyword-first writing |
| `priority` / `weight` | Manual ordering that goes stale; category pages sort by date or curation |
| `featured: true` | Nobody ever un-features anything |
| `seo_title` separate from `title` | Two titles drift. One title, written well |
| `excerpt` separate from `description` | Same reason |
| `word_count` / `reading_time` | **Derived, never authored.** A hand-typed reading time is wrong the moment the article is edited (§4.4) |

---

# §22 — TOPIC CLUSTER GOVERNANCE

## 22.1 The pillar decision — the most important call in Part II

**DECIDED, and it inverts the standard playbook.**

> ### **The service page is the pillar. The category page is an index. The Knowledge Center never builds its own pillar pages.**

Conventional hub-and-spoke SEO says: write a 3,000-word pillar page per cluster, link
supporting articles to it. Applied here, that would produce
`/knowledge/patient-care/` competing directly against `/services/patient-care` for the same
head term — **the site's own commercial page, cannibalised by its own knowledge platform.**

The seven service pages are already pillars in every sense: they are comprehensive, they
own the head terms, they carry `Service` schema, and they are the pages that convert.
Building a second set of pillars would split authority between two pages per topic and
force a choice about which one should rank. There is no version of that trade that is
worth making.

## 22.2 Cluster anatomy

| Element | Role | Where it lives | Count |
|---|---|---|---|
| **Pillar** | Owns the head term; converts | `/services/<service>` | 1, existing |
| **Category index** | Navigational list of the cluster. Deliberately thin: title + one-line summary per article, one short intro | `/knowledge/<category>/` | 1 |
| **Supporting articles** | Own long-tail; link up to the pillar | `/knowledge/<category>/<slug>/` | 3–10 |
| **FAQs** | Inside articles and inside the pillar. **Never a standalone FAQ page** | In-page | per page |
| **Checklists** | A `content_type`, living in its real category | `/knowledge/<category>/<slug>/` | — |
| **Curated resource index** | `/knowledge/checklists/` — links only, self-canonical | Root of `/knowledge/` | 1 |
| **Related services** | Pillar + genuine adjacencies | Slot 12 | 2–4 |

## 22.3 Why category pages must stay thin

A category index that grows introductory essay content becomes a de facto pillar and
recreates the cannibalisation §22.1 avoids.

**Hard limit: ≤ 150 words of unique prose on a category page.** Its intro states what the
cluster covers and links to the service page. Everything else is the list. If a category
page starts wanting to explain the topic, that explanation is an article.

## 22.4 Cannibalisation prevention

Four mechanisms, applied in order:

1. **One query, one owner.** Before an article is approved (gate 1), its target query is checked against the inventory. If an existing article or service page already targets it, the new article is either differentiated, merged, or rejected.
2. **The pillar owns the head term.** No article may target `patient care Kota`, `elder care Kota`, or any canonical service head term. Articles own **question and long-tail** queries.
3. **Title differentiation.** No two titles may be distinguishable only by synonym. `Choosing an attendant` and `Selecting a caregiver` are one article.
4. **Quarterly detection.** Search Console filtered to the cluster: any query where two of our URLs both appear, or where the ranking URL alternates between two of ours, is flagged. Resolution is **merge** (301 the weaker into the stronger) — not "optimise both".

## 22.5 Orphan prevention — three independent guarantees

Belt, braces, and a third thing. The brief asks for no orphan content; one mechanism is not enough at 500 articles.

| # | Guarantee | Enforced by |
|---|---|---|
| 1 | Every article declares `primary_service` | Validator hard-fails without it (§21.4 rule 2) |
| 2 | Every article is linked from its category index | Index is generated from the corpus, not hand-maintained |
| 3 | Every article has ≥1 inbound link from a sibling | `inbound_internal_links` computed quarterly; zero = flagged (§19.2 check 7) |

An article can lose guarantee 3 through churn. It cannot lose 1 or 2 without the build
failing or the index regenerating. **Orphan content is structurally impossible here, not
merely discouraged.**

## 22.6 Cluster health metrics

Reported per service, quarterly:

| Metric | Healthy |
|---|---|
| Article count | ≥3 (activation, §6.5) |
| Articles with 0 inbound internal links | 0 |
| Articles with 0 outbound service links | 0 |
| Queries where 2+ of our URLs compete | 0 |
| Articles past `next_review` | 0 |
| Pillar receives inbound from | ≥3 cluster articles |

## 22.7 Rejected

- **A separate pillar page per cluster** — §22.1. The single most valuable rejection in this document.
- **Tag pages below 6 articles** — thin content (§3.3).
- **Automated related-article selection** — at this corpus size, curated beats computed (§3.5).
- **A visual cluster map artefact** — pretty, immediately stale, and the inventory already answers every question it would.

---

# §23 — ARCHITECTURE DECISION LOG

## 23.1 Location

**The ADL lives here, as §23** — not in a separate file.

`netlify.toml` lines 108–117 pre-arm a blocklist rule for a `DECISION_LOG.md` that does not
yet exist, reserved by `SEO_EXECUTION_PLAYBOOK.md` Appendix E for **project-wide**
decisions. Creating it now to hold Knowledge-Center-only decisions would misuse a reserved
name and split the record across two files. If `DECISION_LOG.md` is later created, it
**references** these ADRs by ID; it does not copy them. One fact, one home.

## 23.2 Format

Each record: **Decision · Reason · Alternatives considered · Trade-offs · Status.** Status
is `Accepted` · `Proposed` (owner gate open) · `Superseded by ADR-nnn` · `Rejected`.
**Records are never deleted or rewritten** — a superseded decision keeps its text and gains
a pointer. The value of a decision log is entirely in what it says about decisions that
later looked wrong.

---

### ADR-001 · Directory-index URLs for the Knowledge Center
- **Decision** — `/knowledge/<category>/<slug>/`, served from `<slug>/index.html`, trailing slash.
- **Reason** — Zero Netlify redirect rules per article. The flat-file convention needs two exact-match rules per page, because placeholder substitution with a literal suffix is broken (defect verified on preview, 2026-07-21); 500 articles would need 1,000 hand-written rules.
- **Alternatives** — (a) Flat files `/knowledge/<slug>` — the 1,000-rule problem, no category URL, hand-maintained breadcrumbs. (b) Flat with category prefix in the slug — unreadable and still 2 rules each. (c) Client-side routing — breaks static hosting and indexing.
- **Trade-offs** — Requires amending `PROJECT.md` §9's "no deep nesting". Introduces a second file convention alongside `/services/`. Gains: path-derivable breadcrumbs, clean sitemap partitioning, and elimination of the local-dev mismatch that cost three hotfix commits in E5.
- **Status** — **Proposed** · gated on **D-8** · verification task **E8-T0**

### ADR-002 · No medical advice — the YMYL boundary
- **Decision** — The platform explains how care is arranged, prepared for, chosen and supervised. It never explains how care is clinically performed.
- **Reason** — `LOCAL_SEO_MASTER_PLAN.md` §7.3 rule 7. Clinical instruction from a non-medical publisher risks both search demotion and real harm to a vulnerable patient.
- **Alternatives** — (a) Publish clinical content with a disclaimer — a disclaimer does not make unqualified advice safe. (b) Commission a medical reviewer — real option, deferred until a real credentialed person exists; fabricating one is the highest-severity honesty breach available here. (c) Avoid health topics entirely — forfeits the platform's whole purpose.
- **Trade-offs** — Loses some high-volume clinical queries. §9.2 shows the reframe retains most of the intent and all of the credibility, and confines the platform to what this business genuinely knows.
- **Status** — **Accepted**

### ADR-003 · Truth-first publishing, inherited unchanged
- **Decision** — `SERVICE_PAGE_SPEC.md` §3.4 and `LOCAL_SEO_MASTER_PLAN.md` §7.3 apply verbatim: no fabricated reviews, statistics, credentials, authors, reviewers, prices, guarantees or superlatives.
- **Reason** — It is the project's founding principle, and articles create new surfaces to breach it — a composite "family we helped", an unsourced statistic, a stock photo framed as a client, an invented byline.
- **Alternatives** — (a) A softer standard for "illustrative" content — this is precisely the reasoning that produced the six invented testimonials removed in `64147d5`. (b) Case studies with consent — permitted, and genuinely valuable, but it is a consent workflow rather than a lowered standard.
- **Trade-offs** — Slower publishing, thinner-looking early articles, no social proof until real proof exists. Every one of those is the cost of being able to defend every sentence.
- **Status** — **Accepted**

### ADR-004 · Service-first clusters; the service page is the pillar
- **Decision** — Categories mirror the canonical seven plus three cross-cutting. The Knowledge Center builds no pillar pages of its own; category pages are thin indexes capped at 150 words.
- **Reason** — A knowledge pillar at `/knowledge/patient-care/` would compete with `/services/patient-care` for the same head term, splitting authority between two of our own pages and cannibalising the one that converts.
- **Alternatives** — (a) Conventional hub-and-spoke with knowledge pillars — direct cannibalisation. (b) Topic-interest taxonomy independent of services — produces orphan-prone content and no commercial path. (c) A flat uncategorised corpus — no cluster signal, no breadcrumbs.
- **Trade-offs** — Categories are constrained by the service list rather than by reader interest, which occasionally forces an imperfect `primary_service` fit. Accepted: an imperfect fit is allowed, an absent one is not.
- **Status** — **Accepted**

### ADR-005 · No locality doorway pages
- **Decision** — No URL contains a locality name outside a single reserved `/knowledge/kota/` category, itself gated by the find-replace test and capped at 8 articles in year one.
- **Reason** — Prohibited in three places: `PROJECT.md` §9, `LOCAL_SEO_MASTER_PLAN.md` §4.2 ("❌ Never · Doorway pattern") and §8.3. The E7 brief's own guardrail agrees.
- **Alternatives** — (a) The 7×6 service-by-locality matrix — 42 find-replace pages; the textbook doorway pattern. (b) No local content at all — safe, and the fallback if D-9 is declined. (c) Locality landing pages with unique intros — the same pattern wearing a hat.
- **Trade-offs** — Forfeits some "service + locality" query capture. Mitigated by the far higher-ROI Google Business Profile work, which is still pending and which outranks this entire roadmap.
- **Status** — **Proposed** · gated on **D-9**

### ADR-006 · Generator deferred to E8-T6, after the reference article
- **Decision** — Build the reference article by hand and certify it; then build the generator to reproduce it. Not the other way round.
- **Reason** — A generator built before the artefact is known produces the wrong generator. The hand-certify-then-scale order is what made the service-page template work across seven pages with zero structural drift.
- **Alternatives** — (a) Generator first — premature abstraction. (b) No generator ever — hand-authoring already produced cache-token drift at 12 pages (`dfb456c`) and 11 file edits for one nav link (E6-T3); it does not reach 500 articles and probably not 50. (c) Adopt a static-site generator (Eleventy, Hugo) — a framework dependency in the deployed toolchain, against the spirit of `PROJECT.md` §19.
- **Trade-offs** — Articles 1–4 are hand-built and must be retro-fitted to the generator's output. Deliberate: four articles of rework is cheap insurance against automating the wrong shape.
- **Status** — **Proposed** · gated on **D-11**

### ADR-007 · Traffic and conversion metrics excluded from the inventory
- **Decision** — `content/inventory.csv` stores the join key, not the numbers. Metrics are pulled fresh from GA4 and Search Console into a dated quarterly snapshot.
- **Reason** — Hand-transcribed metrics have no timestamp and no window, decay immediately, and at 500 rows are transcribed wrongly. A retirement decision made on a stale number is a wrong decision made confidently.
- **Alternatives** — (a) Store them as the brief specified — the decay problem. (b) Automate a GA4 export into the CSV — an API dependency and a credential to manage, for data that is only read four times a year.
- **Trade-offs** — The inventory cannot answer a performance question on its own; a review must open GA4. Correct: that is where the answer actually lives.
- **Status** — **Accepted**

### ADR-008 · Sitemap index replacing the single flat sitemap
- **Decision** — `/sitemap.xml` becomes an index over `core`, `knowledge`, and `knowledge-articles`.
- **Reason** — A single file at 500 URLs is technically valid but operationally useless; `lastmod` accuracy has already required one corrective micro-sprint at 11 URLs. Per-section files isolate `lastmod`, and Search Console then reports indexation per sitemap, so a knowledge indexing problem is visible rather than diluted.
- **Alternatives** — (a) Keep one file — the `lastmod` maintenance problem scales linearly. (b) One sitemap per category — eleven files for a benefit that appears above a few thousand URLs.
- **Trade-offs** — Four files instead of one, and a resubmission in Search Console. `robots.txt` is unchanged.
- **Status** — **Accepted**

### ADR-009 · Organization authorship until a real person exists
- **Decision** — Public byline is "Quality Care Services" with a true statement of the basis of the expertise. `Person` author and `reviewedBy` are reserved in the schema shape and stay absent.
- **Reason** — `SERVICE_PAGE_SPEC.md` §3.4. A fabricated medical byline on health-adjacent content is a real-world harm vector, not merely an E-E-A-T shortcut.
- **Alternatives** — (a) Invent an expert persona — prohibited. (b) Use the owner's real name — available and legitimate; deferred to owner preference, and Organization is the safer default. (c) Omit authorship — weakens the entity graph for no gain.
- **Trade-offs** — Weaker author-level E-E-A-T than a credentialed byline would give. The organisational claim is the one this business can actually defend.
- **Status** — **Accepted**

### ADR-010 · Front matter binding from article one, independent of the generator
- **Decision** — §21's contract is mandatory from the first article, whether or not D-11 is approved.
- **Reason** — Every future capability in §11 — search, filters, author pages, AI citation, Hindi, CMS migration — reads existing metadata. Retrofitting metadata onto 80 published articles is the expensive version of this.
- **Alternatives** — (a) Adopt front matter when the generator arrives — guarantees a retrofit. (b) Minimal front matter now, extend later — the extension is the retrofit.
- **Trade-offs** — ~12 lines of hand-written YAML per article that nothing reads on day one. The cheapest insurance in this document.
- **Status** — **Accepted**

---
# §24 — FREEZE REVIEW

## 24.1 Rejection register

The review brief asked that anything adding unnecessary complexity be rejected in writing.
Fourteen items were considered and declined. Each would have made the document look more
complete; none would have made the platform better.

| # | Rejected | Why | §|
|---|---|---|---|
| 1 | **Traffic / conversion fields in the inventory** | Stale on write, no timestamp, hand-transcribed at 500 rows. Drives confident wrong decisions | 18.4 |
| 2 | **UUID article IDs** | Unreadable in a commit, unsayable aloud, solves a collision problem that does not exist at 500 rows. `KB-0001` does the same job | 18.3 |
| 3 | **Knowledge pillar pages** | Would cannibalise the seven service pages for their own head terms. The service page already *is* the pillar | 22.1 |
| 4 | **Tag pages below 6 articles** | Thin content, at scale, on a domain with no authority to spend | 3.3 |
| 5 | **Automated related-article selection** | At 36–85 articles, curated beats computed, and computed reliably surfaces the least relevant sibling | 3.5 |
| 6 | **A visual cluster map** | Immediately stale; the inventory answers every question it would | 22.7 |
| 7 | **Monthly review cycle** | Nothing meaningful changes in 30 days. The entry gets ignored by month four, and an ignored process is worse than none | 19.6 |
| 8 | **0–100 content scoring rubric** | Precision theatre. Five verdicts are more decidable and less arguable | 19.6 |
| 9 | **RACI matrix** | Four roles, one accountable person | 17.4 |
| 10 | **Multi-approver sign-off** | Diffusion of responsibility, not rigour, at this cadence | 17.4 |
| 11 | **AVIF images** | A second format, a `<picture>` element and a build variant for a marginal gain on files already under 120 KB | 20.8 |
| 12 | **Five `srcset` widths** | Two cover the real device population; each extra variant multiplies files that can go stale | 20.6 |
| 13 | **A separate `DECISION_LOG.md` for the ADL** | Would misuse a name reserved for project-wide decisions and split the record. One fact, one home | 23.1 |
| 14 | **Six rejected front-matter fields** (`keywords`, `priority`, `featured`, `seo_title`, `excerpt`, authored `reading_time`) | Each either drifts from a field that already exists, invites keyword-first writing, or is derivable | 21.5 |

**Two states were considered for collapsing and deliberately kept separate:**
`TECHNICAL_REVIEW` and `SEO_REVIEW` fail for unrelated reasons, and batching them is
exactly what lets the second one slip (§16.4). **One pair was deliberately kept merged:**
truth and YMYL are one state with two checklists, because separating them would imply they
can be scheduled apart.

## 24.2 Internal consistency check

Part II adds governance to Part I; it must not contradict it. Every overlap was reconciled
explicitly rather than left to the reader:

| Potential contradiction | Resolution |
|---|---|
| §9.6 six gates vs §16 nine states | Mapped 1:1 in §16.4. §9.6 is the operational checklist; §16 is the data field. Neither supersedes the other; neither is edited alone |
| §9.7 review cycles vs §17 `review_frequency` | §9.7 sets the defaults; §17's field records the per-article value. Same numbers |
| §3.4 `primary_service` vs §22.5 orphan prevention | §3.4 is guarantee 1 of three. Consistent, now enforced by a build failure rather than by discipline |
| §4.5 Organization author vs §17 `author` field | §17's field is internal attribution; the public byline is unchanged. ADR-009 states both |
| §11 "front matter matters" vs D-11 generator gate | §21.1 and ADR-010 make the contract binding regardless of D-11. The metadata contract does not depend on the tool |
| §5.9 sitemap index vs existing single `sitemap.xml` | ADR-008; `robots.txt` unchanged; E8-T1 owns the migration |
| §19.2 checks vs §21.4 validation | Checks 2 and 7 run per-commit; the rest quarterly. Same rules, two cadences, stated in §19.2 |

**No section of Part I was edited.** The URL architecture, taxonomy, template, SEO,
linking, content, local and roadmap decisions are exactly as reviewed and approved.

## 24.3 The six questions

### 1 · Is this architecture capable of supporting 500+ articles?

**Yes — with one hard dependency, stated honestly.**

| Dimension | At 500 articles |
|---|---|
| Routing | **0** Netlify rules. Directory-index is O(1) in config (ADR-001) |
| Sitemaps | Generated, partitioned, `lastmod` derived (ADR-008) |
| Taxonomy | 10 categories, 1 axis in the URL. Unchanged at any corpus size |
| Orphan prevention | Three independent guarantees, two of which fail the build (§22.5) |
| Cannibalisation | Four mechanisms, one automated quarterly (§22.4) |
| Discovery | Category indexes generated; search reserved and cheap to add (§11) |
| Review load | ~125 articles/year due at 500 — **the real ceiling** (§24.5) |
| **Authoring & maintenance** | **Requires the generator. This is the dependency.** |

**The dependency is R-1.** Hand-authored HTML has already produced cache-token drift at
twelve pages and eleven file edits for one nav link. At 500 articles a single global change
is 511 hand-edits with 511 chances to desynchronise a cache token under a one-year
immutable header. **Without D-11, the honest ceiling is 40–50 articles, not 500.**

The architecture supports 500. The *toolchain* supports 500 only if D-11 is approved. That
distinction is stated rather than blurred.

### 2 · Does it preserve the truth-first philosophy?

**Yes — and Part II strengthened it in four places rather than merely restating it.**

- **ADR-002** — the YMYL boundary is now a decision with recorded alternatives, not a rule someone can reinterpret under cadence pressure.
- **§17.3** — `truth_reviewer` is non-delegable *in the schema*. R-3 (governance decay) is now structural, not aspirational.
- **§20.1** — the honesty standard extended to imagery: no stock photo may imply a real client, staff member, or Kota home. Closes a surface Part I did not cover.
- **§21.3 / ADR-009** — `medical_reviewer` must be omitted rather than placeholdered. A fabricated medical byline is the highest-severity breach available on this platform, and the schema now makes it an act of commission.
- **§19.5** — truth drift triggers an *immediate* rewrite that does not wait for the quarterly cycle. Truth is the only thing on the platform that cannot be scheduled.

Nothing in Part II weakens a standard. Every constraint from `SERVICE_PAGE_SPEC.md` §3.4
and `LOCAL_SEO_MASTER_PLAN.md` §7.3 carries through verbatim.

### 3 · Does it avoid future URL migrations?

**Yes, for every case the architecture controls. Two residual cases exist and both are named.**

Immutable by design: no dates, no IDs, no years, no localities, no service permutations in
any URL. Slug decoupled from title, so retitling is free. Category-in-path with a closed
ten-member set. Hindi reserved *above* the tree so it never disturbs it. CMS migration
touches nothing public (§18.5).

**Residual case 1 — a category change.** Moving an article between categories changes its
path. Mitigated: `id` survives, a 301 is mandatory, and the article's home is fixed at
gate 1 before writing begins. Expected frequency: near zero.

**Residual case 2 — a sub-category tier above ~40 articles per category.** Would deepen
nesting again. At the §7 plan of 36 articles a year across ten categories, this is a
year-eight problem at the earliest, and §1.5 already names it as amendment-gated.

**One-time migration, before article one:** ADR-008's sitemap restructure. It moves no
public URL.

### 4 · Does it minimise future maintenance cost?

**Yes, structurally — and the largest single cost is now measured rather than assumed.**

| Cost driver | Mitigation |
|---|---|
| Per-article routing config | Eliminated — 0 rules (ADR-001) |
| Global changes across N pages | Generator: one template, one nav, one cache token (R-1) |
| Cache-token drift | Validator hard-fails on mismatch (§21.4 rule 10) |
| Sitemap `lastmod` | Derived, never hand-edited (ADR-008) |
| Orphan and broken-link discovery | Per-commit CI, not quarterly archaeology (§19.2) |
| Review scheduling | `next_review` per article; quarterly pass covers only what is due |
| Local-dev divergence | Eliminated by directory-index (§2.3) |
| Metric transcription | Eliminated — pulled fresh at review time (ADR-007) |
| Second URL convention | Bounded by a rule already constitutional: *anything with children is a directory index* |

The unavoidable residual is **human review time**, quantified in §24.5.

### 5 · Is anything still intentionally deferred?

**Yes. Fifteen items, all deliberate, none blocking.**

*Capabilities (§11):* advanced search · filters · author pages · medical reviewers · Hindi
· downloadable resources · video library · AI recommendations · voice-search markup ·
topic pages below the 6-article threshold.

*Content:* `/updates/` reserved but unbuilt (D-10) · `/knowledge/checklists/` until ≥5
checklists exist · Related Resources on each service page until that service reaches 3
articles · sub-category tier until a category exceeds ~40.

*Tooling:* `tools/build_search_index.py` reserved, not written.

Every one has a named trigger and a reserved path. None requires a URL change to unlock.
**Deferral here means "architected, path reserved, deliberately unbuilt" — not "unresolved".**

### 6 · Can this be considered the frozen blueprint?

**Yes — with a distinction that matters.**

**The architecture is frozen. Authorisation to build is not the same thing.** Five owner
decisions remain open (D-6, D-7, D-8, D-9, D-11) and one technical assumption remains
unverified (E8-T0, the directory-index preview test). Freezing the blueprint does not close
those gates; it fixes the design *they decide about*.

Two of the five are load-bearing:

- **D-8 declined** → ADR-001 is superseded by the flat alternative in §2.5, and §2, §12 and ADR-001 are rewritten. Everything else stands.
- **D-11 declined** → R-1 is unmitigated, the answer to question 1 becomes "40–50 articles", and E8-T6 leaves the roadmap. The architecture is unchanged; only its ceiling moves.

D-6, D-7 and D-9 change scope, not structure. **D-9 declined removes one category and five
articles and touches nothing else** — the platform was deliberately designed so the
riskiest element is also the most removable.

## 24.4 Verification status

| Claim | Status |
|---|---|
| Netlify placeholder substitution is broken with a literal suffix | ✅ **Verified** — preview matrix, 2026-07-21, recorded in `netlify.toml` |
| `/services/` and `/careers/` are directory indexes with trailing slashes | ✅ **Verified** — live crawl, all 12 pages HTTP 200 |
| Cache-token drift has occurred in this project | ✅ **Verified** — commit `dfb456c` |
| One nav change required 11 file edits | ✅ **Verified** — sprint E6-T3 |
| Blog deferral criteria 1–3 are met | ✅ **Verified** against the repository |
| `python -m http.server` serves `dir/` → `index.html` | ✅ **Verified** — used in every sprint's crawl |
| **Netlify redirects `/x/y/index.html` → `/x/y/`** | ⚠️ **UNVERIFIED — E8-T0 blocks E8-T1** |
| **Netlify serves `/x/y/` from `y/index.html` with no rule** | ⚠️ **UNVERIFIED — E8-T0** |

The two unverified items are the same class of assumption that produced the SP-T1 defect.
They are cheap to test — two throwaway pages on a deploy preview — and nothing may be built
on them until they are.

## 24.5 The one number worth arguing about

At **36 articles/year** with the §9.7 cycles, steady-state review load is roughly **20–25
reviews a year** on top of authoring. Sustainable.

At **500 articles**, review load alone is **~125 articles a year** — more than three a
week, indefinitely, forever, before a single new article is written.

**Maintenance capacity, not authoring capacity, is this platform's real ceiling.** The
architecture will carry 500 articles. The business will not review them. That is not an
argument against the architecture — it is the argument for §7's deliberate gap between a
capacity of 500 and a commitment of 36, and for §19.4's willingness to archive.

**Build for 500. Plan for 36. Archive without sentiment.**

---

# ARCHITECTURE FREEZE v1.0

**Frozen 26 July 2026.** Sections §0–§23 are the binding blueprint for Knowledge Center
implementation. Changes after this point require a new ADR recording what changed and why —
existing ADRs are superseded, never rewritten.

**What is frozen:** information architecture · URL architecture · taxonomy · article
template · SEO architecture · internal linking · content strategy · local SEO policy ·
editorial standards · conversion strategy · expansion reservations · file structure ·
implementation roadmap · lifecycle · ownership · inventory · governance · imagery · front
matter · cluster governance · ADRs 001–010.

**What is not frozen, and is not meant to be:** article topics, publishing cadence within
the §7 band, tag vocabulary growth, and the five open owner decisions below.

## Remaining deferred decisions

| ID | Decision | Blocks | Recommendation |
|---|---|---|---|
| **D-6** | Adopt the `PROJECT.md` constitutional amendment bringing the Knowledge Center into scope | Everything | **Yes** — required by §20 stage 8 |
| **D-7** | Formally lift the `LOCAL_SEO_MASTER_PLAN.md` §7.4 blog deferral (3 of 4 criteria met; capacity is yours) | Everything | **Yes, at 3 articles/month** |
| **D-8** | Amend §9 "no deep nesting" to permit three levels under `/knowledge/` | ADR-001, §2, §12 | **Yes** — the flat alternative reinstates the 1,000-rule problem |
| **D-9** | Permit `/knowledge/kota/` under the find-replace test, capped at 8 articles/year | ADR-005, category 10 | **Yes, with the cap.** Declining is safe and removes one category cleanly |
| **D-11** | Confirm a repo-local generator does not breach §19's framework ban, given the deployed output stays vanilla static HTML | ADR-006, R-1, question 1 | **Yes** — otherwise accept a 40–50 article ceiling |
| **D-14** | Image sourcing: owned photography (consent workflow), licensed stock (budget + provenance register), or diagrams only | §20 | **Owned + diagrams first.** Stock only with a licence row on file |

*(D-10, D-12 and D-13 from Part I are recommendations, not blockers, and do not gate E8.)*

## Non-negotiable pre-conditions for E8-T1

1. **D-6** adopted and committed as a `PROJECT.md` amendment.
2. **D-8** resolved — the URL architecture cannot be chosen later.
3. **E8-T0** passed on a deploy preview. ⚠️ The two unverified assumptions in §24.4.

## Separately, and outranking all of it

`LOCAL_SEO_MASTER_PLAN.md` §8.1 records the Google Business Profile as *"Highest-ROI
unblocked work available"*, and it is still pending verification. **For a single-city
home-care business it will out-perform this entire twelve-month roadmap.** Nothing in this
blueprint argues for sequencing the Knowledge Center ahead of it.

---
# APPENDIX — OWNER DECISIONS (PART I)

Numbering continues from the existing D1–D5. **Superseded for freeze purposes by the
consolidated list in §24 — this table is retained unedited as the original record.**

| ID | Decision | Blocks | Recommendation |
|---|---|---|---|
| **D-6** | Adopt the `PROJECT.md` constitutional amendment adding the Knowledge Center to scope (§8, §9, §19, §20)? | Everything | **Yes** — required by §20 stage 8 |
| **D-7** | Formally lift the `LOCAL_SEO_MASTER_PLAN.md` §7.4 blog deferral? Three of four unlock criteria are met; capacity is yours to judge against §7.1's arithmetic | Everything | **Yes, at 3 articles/month** |
| **D-8** | Amend §9's "no deep nesting" to permit three levels under `/knowledge/`? | §2 URL architecture | **Yes** — the flat alternative reintroduces the 1,000-rule problem |
| **D-9** | Permit the `/knowledge/kota/` carve-out under the §8.4 find-replace test, with an 8-article cap? | §8, category 10 | **Yes, with the cap and per-article approval.** Declining is safe; the platform works without it |
| **D-10** | Keep Company Updates **out** of `/knowledge/`, reserving `/updates/` at root? | §1.3 | **Yes** — and prefer GBP Posts for most of it |
| **D-11** | Confirm that a repo-local static generator does not breach §19's framework prohibition, given the deployed output stays vanilla static HTML? | §14 R-1, E8-T6 | **Yes** — otherwise accept a hard cap around 40–50 articles |
| **D-12** | Is Hindi a 12–24 month intention or genuinely indefinite? Affects only how seriously the reservation is treated | §11 | Reserve regardless; the cost today is zero |
| **D-13** | Should GBP verification be completed **before** E8 begins? | Sequencing | **Yes** — higher ROI than every article in the roadmap combined |

---

**End of E7 planning deliverable. No code has been written. No implementation has begun.**
