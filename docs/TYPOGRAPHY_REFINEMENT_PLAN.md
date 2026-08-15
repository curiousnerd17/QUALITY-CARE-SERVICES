# TYPOGRAPHY_REFINEMENT_PLAN.md

> ## 🔵 POST-LAUNCH OPTIMIZATION
>
> **Status:** Approved as an architectural recommendation. **NOT scheduled. NOT implemented.**
> **Do not action this document as part of any launch work.** The production branch stays
> focused on business value, SEO and trust-building until the owner explicitly schedules it.
>
> | Field | Value |
> |---|---|
> | **Type** | Post-launch optimization · reading typography |
> | **Priority** | Low — no user-facing defect, no broken layout, no conversion impact |
> | **Blocking anything?** | No |
> | **Blocked by** | Nothing technical. Awaits owner scheduling + one visual decision (§4) |
> | **Scope** | Desktop and tablet only. Mobile is already correct and must not change |
> | **Est. effort** | ~2 h implementation + ~1 h visual verification |
> | **Risk** | LOW (see §7) |
> | **Created** | 2026-08-02 |
> | **Location** | `docs/` per `PROJECT.md` documentation convention. Automatically publish-blocked by the fail-closed `/docs/*` rule already armed in `netlify.toml` — **no config change required** |

---

## 1. Current issue

Long-form reading content renders at an uncomfortably wide measure on desktop and tablet.
Measured in **characters per line (CPL)** at the 16px body size:

| Context | 768px | 1024px | 1280px | 1440px |
|---|---:|---:|---:|---:|
| **Knowledge article body** | 91 | 123 | **145** | **145** |
| **Policy pages** (Privacy, Terms) | 91 | 95 | 95 | 95 |

**Reference bands**

- Bringhurst, *The Elements of Typographic Style*: 45–75 CPL
- Practical web ideal: 60–70 CPL
- **WCAG 2.1 SC 1.4.8 Visual Presentation (AAA): ≤ 80 characters per line**

Both page types **fail SC 1.4.8 at every viewport from 768px upward**. At 145 CPL the eye
cannot reliably locate the start of the next line, which is the specific failure mode the
criterion exists to prevent.

**Mobile is already correct and is explicitly out of scope.** At ≤640px the container is
336–406px wide, giving 42–51 CPL. The measure proposed below is wider than that container,
so the cap never engages and mobile rendering is byte-identical.

---

## 2. Why it exists

Three independent causes, none of them a mistake at the time:

**a) `.container` is a layout container, not a reading container.**

```css
.container { width: min(1160px, calc(100% - 40px)); margin-inline: auto; }
@media (max-width: 640px) { .container { width: calc(100% - 24px); } }
```

It exists to hold card grids (`.services-grid`, `.trust-grid`, `.evidence-grid`), which
legitimately want 1160px. Long-form paragraphs inherit that width because nothing narrower
sits between them and the container. **`.container` must not be capped** — doing so would
collapse every grid on the site.

**b) 84 article paragraphs have no width constraint at all.**

In the 21 Knowledge Center articles the substance section is built as:

```html
<section class="section">
  <div class="container">
    <div class="section-header">…</div>
    <h3>…</h3>  <p>…</p>
    <h3>…</h3>  <p>…</p>
    …
  </div>
</section>
```

The `<h3>` and `<p>` are **direct children of `.container`** with no intermediate wrapper,
so they render at the full 1160px. This is the worst-affected content on the site — 21
articles, ~18,800 words, the longest-form material published.

**c) Existing caps accreted independently and none targets a reading measure.**

| Wrapper | Cap | CPL @1280 |
|---|---:|---:|
| `.about-grid` | 860px | 108 |
| `.faq-list` | 820px | 103 |
| `.policy-inner` | 760px | 95 |
| `.section-header` | 760px | 95 |
| `.hub-hero-lede` | 760px | 90 |
| `.hero-subtitle` | 650px | 81 |

Seven different widths, none derived from a typographic target. **At 768px none of them
engages at all** — the container is 728px, narrower than every cap — which is why tablet
collapses uniformly to 91 CPL. Tablet currently has no reading measure whatsoever.

---

## 3. Selector strategy

**Requirement: zero HTML edits.** An earlier iteration proposed a `.article-page` scope
class on `<main>`; it was rejected because the repository should not need 21 HTML edits to
support typography. It was implemented and fully reverted on 2026-08-02.

### Chosen selector

```css
.container > h3,
.container > h3 ~ p
```

### Why this is safe — measured across all 43 pages

| Selector | ART | TERMS | PRIV | cluster | k-hub | service | s-hub | home | about | careers | 404 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `.container > h3` | 84 | 13 | 6 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `.container > h3 ~ p` | 85 | 26 | 11 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

**Leakage outside Phase 1 scope: zero.**

The policy pages use `<div class="container policy-inner">` — one element carrying both
classes — so `.container > h3` reaches article headings *and* policy headings, and nothing
else on the site. The selector is not unique to articles; it is unique to **exactly the
Phase 1 scope**, which is a better outcome than page-level scoping.

### Why the general sibling combinator (`~`) and not adjacent (`+`)

Article body shapes were measured:

```
HPHPHPHP    × 20 articles
HPPHPHPHP   ×  1 article    ← knowledge/patient-care/questions-before-hiring-a-caregiver/
```

`h3 + p` would silently miss the second paragraph in that article, leaving it at 145 CPL
beside siblings at ~68. `h3 ~ p` catches all 85 today and stays correct if any future
article puts two paragraphs under one heading.

### Why `<h3>` must be capped alongside `<p>`

They alternate as **siblings**. Capping the paragraph alone would leave each heading
full-width at 1160px while its own paragraph sat inset by ~300px — the pair would stop
sharing a left edge. Capping both keeps the heading bound to its text.

### Rejected alternatives

| Candidate | Why rejected |
|---|---|
| `.article-page` scope class | Requires 21 HTML edits for a CSS concern. Rejected by owner |
| `main > .section > .container > p` | Leaks onto 7 service pages + services hub. Would out-specify and override `.pricing-closing` (760px). Out of scope |
| `.container > h3 + p` | Already broken by the one `HPPHPHPHP` article |
| `body:has(.breadcrumb li:nth-child(4))` | Semantically the cleanest hook — 4 crumbs *means* article, uniquely matches 21 pages. Needs `:has()` (Firefox 121+, Dec 2023). Degrades gracefully but buys nothing over the combinator. **Keep in reserve for Phase 2** |

### Known residual fragility

A paragraph placed **before** the first `<h3>` in a container would not match. No article
does this today — every body block starts with a heading — and
`docs/knowledge/ARTICLE_TEMPLATE.md` §6 specifies the substance slot as `.section` +
`<h2>`/`<h3>`. **Recommended hardening:** make heading-first explicit in
`ARTICLE_TEMPLATE.md` when this ships, so the convention is documented rather than implied.

---

## 4. Reading-measure token

```css
:root {
  /* Editorial reading measure. See docs/TYPOGRAPHY_REFINEMENT_PLAN.md */
  --reading-measure: 62ch;
}
```

### Calibration data — computed on the real corpus

> 85 article body paragraphs · **median 347 characters** · mean 342 · range 68–499

| Option | px @16px | CPL | Lines / median ¶ | Assessment |
|---|---:|---:|---:|---|
| 60ch | 528 | 66.0 | 5.3 | inside ideal 60–70 |
| **62ch** | **546** | **68.2** | **5.1** | **inside ideal 60–70 — RECOMMENDED** |
| 64ch | 563 | 70.4 | 4.9 | Bringhurst, upper half |
| 66ch | 581 | 72.6 | 4.8 | Bringhurst, upper half |
| 68ch | 598 | 74.8 | 4.6 | Bringhurst, upper half |

All five fit inside the content column at 768 / 1024 / 1280 / 1440 and all five pass
SC 1.4.8. **The spread between best and worst is 0.7 of a line per paragraph** — this is
fine-tuning, not correctness.

### Why `ch` and not `px`

`1ch` is the advance width of the `0` glyph — roughly 0.55em in the `system-ui` stack. The
unit is font-relative, so the measure **self-corrects** if the type scale changes and stays
correct when a visitor raises their default font size. A px cap silently becomes wrong in
both cases.

The `0` advance varies ~5% between SF Pro (macOS/iOS), Segoe UI (Windows) and Roboto
(Android). 62ch leaves headroom so the widest-rendering platform still sits under ~72 CPL;
68ch could push past 78 on Segoe UI.

### ⚠️ OPEN DECISION — owner sign-off required before implementation

**The value 62ch is a reasoned recommendation from measured data, not a visual judgement.**
No browser was available during analysis (sandbox blocks Chromium downloads; the pages are
undeployed), so the five options were never compared on screen.

**Before implementing, run the visual comparison.** Serve the repo from its root, open any
knowledge article at 1440px, and cycle the options in DevTools:

```js
document.documentElement.style.setProperty('--reading-measure','62ch')
```

Record the chosen value here before writing any CSS:

```
CHOSEN VALUE: ______ch      decided by: __________      date: __________
```

---

## 5. Affected pages

**23 pages. No cluster pages, no service pages, no homepage.**

| Group | Pages | Elements affected |
|---|---:|---|
| Knowledge Center articles | **21** | 84 `<h3>` + 85 `<p>` |
| Terms & Conditions | **1** | 13 `<h3>` + 26 `<p>` |
| Privacy Policy | **1** | 6 `<h3>` + 11 `<p>` |

**Explicitly NOT affected** — verified by selector-reach test across all 43 pages:

Homepage · About · 7 service pages · services hub · knowledge hub · **7 knowledge cluster
pages** · Careers · 404 · every card component (`.service-card`, `.trust-card`,
`.process-card`, `.evidence-item`, `.scope-col`, `.decision-aid`, `.testimonial-card`) ·
FAQ (`.faq-list`, `.faq-item`) · hero sections · CTA sections · contact sections · nav ·
footer.

> **Note on cluster pages:** the 7 knowledge category pages contain **zero** uncapped
> long-form prose. Their text lives in `.section-header` (a shared component also used by
> the homepage and service pages) and inside cards. Both are out of scope, so clusters
> correctly receive no change.

---

## 6. Implementation steps

> Prerequisite: §4 open decision resolved and the chosen value recorded.

**Step 1 — Add the token.** In `assets/css/style.css`, append to the `:root` block after
`--space-96`:

```css
  /* Editorial reading measure — see docs/TYPOGRAPHY_REFINEMENT_PLAN.md
     Consumers: knowledge articles + the two policy pages ONLY.
     Cards, FAQ, hero, CTA, homepage, About and service pages are NOT consumers. */
  --reading-measure: __ch;
```

**Step 2 — Add the rules.** Append **after** the existing `.policy-page` block (source
order matters: the `.policy-inner` override has identical specificity to the 760px rule
above it):

```css
/* ── EDITORIAL READING MEASURE · PHASE 1 ─────────────────────────────────────
   Long-form reading pages only: 21 knowledge articles + 2 policy pages.
   Scoped structurally — no page-level class, no HTML edits.
   Verified zero leakage across all 43 pages.
   Mobile unaffected: below ~640px the container is narrower than the measure,
   so the cap never engages.
   ────────────────────────────────────────────────────────────────────────── */

.policy-page .policy-inner { max-width: var(--reading-measure); }

.container > h3,
.container > h3 ~ p {
  max-width: var(--reading-measure);
  margin-inline: auto;
}

/* Editorial rhythm for the same blocks. Article leading rises 1.6 → 1.7 to
   match the policy pages, the site's existing long-form standard. Heading
   spacing is asymmetric on purpose so a subheading binds to the text it
   introduces rather than floating equidistant between two blocks. */
.container > h3 ~ p { margin: 0 auto 1.25em; line-height: 1.7; }
.container > h3     { margin: 2em auto 0.5em; }
```

**Step 3 — Bump the cache token.** `/assets/*` is served
`Cache-Control: public, max-age=31536000, immutable`. Per the P0-3 convention, bump `?v=`
across **all** page files or returning visitors never receive the change:

```
find . -name "*.html" -not -path "./.netlify/*" -exec sed -i 's/?v=OLD/?v=NEW/g' {} +
```

**Step 4 — Validate.** Re-run the standard sweep: broken links, broken anchors, JSON-LD
parse, heading order, duplicate IDs, inline styles, GA4 presence — across all pages.
Expected: **0 issues**. Confirm CSS braces balance and no undefined `var()`.

**Step 5 — Confirm scope.** Verify the selector matches only the 23 intended pages, and
that `git diff` shows **no HTML change other than the cache token**.

**Step 6 — Visual verification.** See §8. **Do not merge without it.**

**Step 7 — Harden the convention.** Add a line to `docs/knowledge/ARTICLE_TEMPLATE.md` §6
stating that the substance block opens with a heading, so the selector's assumption is
documented.

---

## 7. Rollback steps

**Risk: LOW.** Single CSS block, no HTML logic, fully reversible.

| Risk | Assessment |
|---|---|
| Leakage outside scope | Zero — verified across 43 pages |
| Browser support | Universal. Child and general-sibling combinators are CSS 2.1. No `:has()` |
| Future content shape | One gap: a paragraph before the first `<h3>`. Not present today; §6 Step 7 closes it |
| CLS | None — the stylesheet is render-blocking, so the cap applies before first paint |
| SEO | Neutral. No content, markup, URL, heading, schema or metadata change |
| Reversibility | One commit |

**To roll back:**

1. Delete the `--reading-measure` declaration from `:root`.
2. Delete the `EDITORIAL READING MEASURE · PHASE 1` block in full.
3. Restore the previous `?v=` cache token across all page files, **or** bump it again —
   either restores correct cache behaviour.
4. Re-run the validation sweep.

No HTML content or structure is modified by this change, so **no content rollback exists or
is required**. If the change was committed, `git revert <sha>` is sufficient and complete.

---

## 8. Screenshots required before merge

**Mandatory. This change alters visible layout on 23 pages and has never been rendered.**

Serve from the repository root — `python -m http.server 8080` — so root-relative asset
paths resolve. Opening files via `file://` will render **unstyled** and is not a valid test.

### Required captures

| # | Page | Viewport | Verify |
|---|---|---|---|
| 1 | Any knowledge article | 1440 | Body measure; `<h3>` and `<p>` share a left edge; whitespace reads intentional |
| 2 | Same article | 1280 | Same |
| 3 | Same article | **768** | The breakpoint with no working measure today — largest improvement |
| 4 | Same article | 390 | **Must be pixel-identical to today.** Cap must not engage |
| 5 | `/terms/` | 1440 | Headings, paragraphs, lists and `.policy-contact` all narrow together |
| 6 | `/privacy-policy` | 1280 | Same |
| 7 | `knowledge/patient-care/questions-before-hiring-a-caregiver/` | 1280 | **The `HPPHPHPHP` article.** Confirm *both* consecutive paragraphs are capped |
| 8 | Homepage | 1440 | **Must be unchanged** |
| 9 | Any service page | 1440 | **Must be unchanged** — confirm `.pricing-closing` still 760px |
| 10 | Any knowledge **cluster** page | 1440 | **Must be unchanged** |

### Sign-off checklist

- [ ] Reading measure looks calm, not cramped or stranded
- [ ] Heading/paragraph left edges align on every article
- [ ] Whitespace either side reads as intentional, not broken
- [ ] Mobile (#4) is visually identical to production
- [ ] Out-of-scope pages (#8, #9, #10) are visually identical
- [ ] The `HPPHPHPHP` article (#7) has no orphaned full-width paragraph
- [ ] Chosen `ch` value recorded in §4

---

## 9. Phase 2 — future migration

**Proposal only. Not approved. Not scheduled.**

Phase 1 deliberately leaves the rest of the site's reading widths untouched. Once Phase 1
has been live long enough to judge, Phase 2 would consolidate the remaining ad-hoc caps
onto the same token.

### Candidates

| Component | Current | CPL @1280 | Pages | Notes |
|---|---:|---:|---:|---|
| `.about-grid` | 860px | 108 | 1 | About "Our Story" — genuine long-form |
| `.faq-list` | 820px | 103 | 31 | FAQ answers, 2–4 sentences each |
| `.hub-hero-lede` | 760px | 90 | ~31 | Hero lede — display-adjacent, may warrant its own token |
| `.hero-subtitle` | 650px | 81 | ~8 | Display text; likely leave alone |
| Homepage `.container > p` | none | 145 | 1 | 3 paragraphs |
| Services hub `.container > p` | none | 145 | 1 | 1 paragraph |

### Deliberate non-candidates

`.section-header` (760px) should **stay wide**. It is centred display text — an `<h2>` plus
one intro line, read at a glance rather than line by line. A wider heading block above a
narrower body block is the intended editorial hierarchy, not a defect.

Card interiors (`.scope-col`, `.evidence-item`, `.trust-card`, `.service-card`,
`.process-card`) are **not** reading containers and must not be migrated. A separate audit
on 2026-08-02 confirmed all sit at 36–41 CPL on mobile — inside the comfort band — and that
reducing their padding to widen the measure traded real visual quality for ~2 CPL. That
change was implemented and reverted; **do not repeat it.**

### Migration path

1. Ship Phase 1. Let it settle.
2. Introduce `--reading-measure-wide` if FAQ and hero lede need a distinct, wider value.
3. Migrate one component per commit, each with its own before/after screenshots.
4. Homepage and services hub paragraphs last — they are marketing copy, not editorial, and
   narrowing them affects the primary conversion path.
5. When every consumer is migrated, delete the orphaned literal max-widths and record the
   final token set in `PROJECT.md` §11 (Design Principles).

### Phase 2 open questions

- Should FAQ answers share the body measure, or read slightly wider as reference material?
- Should hero ledes get a display measure (~50ch) rather than a reading measure?
- Does the homepage want an editorial measure at all, or is wider copy correct for a
  conversion page?

---

## Appendix — measurement method

- **CPL formula:** `width_px / (0.50 × font_px)`. 0.50em is the standard average advance for
  English prose in a humanist sans (Bringhurst's alphabet-length method gives 0.48–0.52em).
- **`ch` → CPL:** `1ch` ≈ 0.55em, so `N ch` renders ≈ `1.1 × N` characters per line.
- **Body font:** 16px (browser default; no root font-size is set). `line-height: 1.6`;
  `1.7` on `.policy-page`.
- **Container:** `min(1160px, calc(100% - 40px))`; `calc(100% - 24px)` at ≤640px.
- **Corpus:** 85 article body paragraphs extracted via `.container > h3 ~ p`; median 347
  characters.
- **Selector reach:** BeautifulSoup `select()` run against all 43 HTML files.
- **Not verified:** rendered output. No browser was available during analysis — Chromium
  downloads are blocked by the sandbox network allowlist, and the pages are undeployed.
  **All figures are computed from the CSS box model, not observed.** This is precisely why
  §8 is mandatory.

---

*This document is repository-only. It is publish-blocked by the fail-closed `/docs/*` rule
in `netlify.toml` and requires no configuration change.*
