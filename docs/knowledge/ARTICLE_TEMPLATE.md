# Knowledge Article Template — Production Standard

**Status:** Canonical. Every `/knowledge/<category>/<slug>/` page inherits this structure.
**Sprint:** 2A · Architecture only. No article has been written against it yet.
**Binding on:** all future Knowledge articles, without exception.

---

## 1. Non-negotiable constraints

These come from the live repository, not from preference. Breaking any one of them
produces a defect this project has already shipped once.

| Constraint | Reason |
|---|---|
| **Reuse existing CSS classes only** | Sprint 1 shipped 8 pages with zero new CSS. Adding CSS forces a cache-token bump on *every* page (see below) |
| **No new `?v=` token unless `style.css` or `main.js` changes** | `/assets/*` is `max-age=31536000, immutable`. Commit `dfb456c` exists because a CSS fix was invisible for three commits behind a stale token |
| **If the token changes, it changes on ALL pages in one commit** | Partial bumps are the `dfb456c` failure mode |
| **No inline `style=` and no `<style>` blocks** | CSP `style-src` has no `unsafe-inline`. Violations work locally and fail silently in production |
| **GA4 snippet on every page** | `main.js` no-ops without it; a page missing it collects nothing |
| **One `<h1>` per page, no skipped heading levels** | Accessibility standard already enforced sitewide |
| **All images `.webp`, explicit `width`/`height`, `loading="lazy"` below the fold** | Core Web Vitals; `/images/*` is a 30-day cache |

---

## 2. File and URL contract

```
File:  knowledge/<category>/<article-slug>/index.html
URL:   https://qualitycareservices.in/knowledge/<category>/<article-slug>/
```

`<category>` must be one of the seven canonical service slugs. No eighth category
exists, and inventing one requires a `PROJECT.md` §5 amendment first.

### Required redirect guards — 2 rules per article

**This corrects an assumption in the original architecture.** The frozen plan claimed
directory-index URLs cost *zero* redirect rules per article. Serving is indeed free —
Netlify resolves `dir/index.html` at `/dir/` natively. But Sprint 1 production
verification proved that both non-canonical forms remain publicly reachable:

- `/knowledge/<cat>/<slug>/index.html` → serves the page directly
- `/knowledge/<cat>/<slug>/index` → serves it too, via Netlify's extensionless `.html` lookup

So every article ships with **two 301 guards**, in the same commit as the article,
following the exact pattern in `netlify.toml`:

```toml
[[redirects]]
  from = "/knowledge/<category>/<slug>/index.html"
  to = "/knowledge/<category>/<slug>/"
  status = 301
  force = true

[[redirects]]
  from = "/knowledge/<category>/<slug>/index"
  to = "/knowledge/<category>/<slug>/"
  status = 301
  force = true
```

**Do NOT add a `/knowledge/<cat>/<slug>` (no trailing slash) rule.** Commit `22f85a6`
removed exactly that form from `/services/` and `/careers/` because it self-redirected.
Netlify handles the missing slash natively.

> **Scaling note, recorded honestly:** at 2 rules per article, 40 articles adds 80 rules
> to a file already past 500 lines. This is a real cost and it was not in the original
> plan. Before article 20, evaluate enabling Netlify's Pretty URLs asset-optimisation
> setting, which strips `/index.html` globally and would make all of these rules
> redundant. That is a one-setting change, not an architecture change — but it must be
> **verified on a deploy preview** before the guards are removed. Until then, the guards
> are the only proven mechanism.

---

## 3. Slot order

Slots are fixed. Optional slots may be omitted, never reordered.

| # | Slot | Required | Markup |
|---|---|---|---|
| 1 | Skip link, header, primary nav | Yes | Copied byte-identical from an existing page |
| 2 | Breadcrumb — Home › Knowledge › Category › Article | Yes | `<nav class="breadcrumb">`, 4 levels |
| 3 | **Title block** — eyebrow + `<h1>` + standfirst | Yes | `.hub-hero` / `.hub-hero-inner` / `.hub-hero-lede` |
| 4 | **Intro** — what this answers, in 2–3 sentences | Yes | `.section` + `.section-header` |
| 5 | **When this guide is useful** — the reader's situation | Yes | `.section` + `.service-points` |
| 6 | **What families should know** — the substance | Yes | `.section`, `<h2>`/`<h3>` |
| 7 | **Practical considerations** — what to arrange, ask, prepare | Yes | `.section--tinted` + `.evidence-grid` |
| 8 | **What Quality Care can help with** | Yes | `.section` — factual, no selling |
| 9 | **What we do NOT advise** — the YMYL boundary, in public | **Yes** | `.scope-col--boundary` + `.scope-col-note` |
| 10 | **Related services** — primary service page, named | Yes | `.hub-hero-actions` with `.btn` |
| 11 | **Related articles** — 2–4 siblings | Yes* | `.services-grid` or `.evidence-grid` |
| 12 | **FAQ** — 3–6 questions | Optional | `.faq-list` + `<details class="faq-item">` |
| 13 | **CTA** | Yes | `.prefooter-section` |
| 14 | Footer, floating WhatsApp, sticky call, `main.js` | Yes | Copied byte-identical |

\* Slot 11 is required from **article 3 onward** in a category. Articles 1 and 2 link to
the category page and the service page instead; a "Related articles" block containing
one link looks like an oversight.

### Slot 9 is not optional

Every article states, in plain language, what it does not cover. On health-adjacent
topics this must name the boundary explicitly — arranging care versus clinical
instruction — and direct the reader to the treating doctor. The Sprint 1 category pages
model the wording; inherit their tone.

---

## 4. Head block — required elements

Copy the head from an existing Knowledge category page and change only the marked values.

| Element | Rule |
|---|---|
| `<title>` | 50–60 chars, `<Specific Answer> \| Quality Care Services`. See `SEO_STANDARD.md` |
| `<meta name="description">` | 149–158 chars, hand-written |
| `<link rel="canonical">` | Absolute, `https://`, non-`www`, **trailing slash**, identical to the sitemap `<loc>` |
| `og:type` | **`article`** — not `website`. This is the one head difference from hub/category pages |
| `article:published_time` | ISO date. Set once, never edited |
| `article:modified_time` | ISO date. Updated on every substantive edit |
| `og:title` / `twitter:title` | Identical to `<title>` |
| `og:description` / `twitter:description` | Identical to the meta description |
| `og:image` / `twitter:image` | `/images/logo-optimized.png` unless the article has a real image of its own |
| GA4 snippet | `G-NT5DDR1ET5`, unmodified |
| `style.css?v=` / `main.js?v=` | Current sitewide token, unmodified |

---

## 5. Pre-publish checklist

Every box must be ticked before the article is committed.

**Structure**
- [ ] File at `knowledge/<category>/<slug>/index.html`
- [ ] Slot order correct; slot 9 present and specific
- [ ] Exactly one `<h1>`; no skipped heading levels
- [ ] No duplicate `id` attributes; every `aria-labelledby` resolves
- [ ] No new CSS class used that is absent from `style.css`
- [ ] No inline `style=` or `<style>`

**Head**
- [ ] Title 50–60 chars; description 149–158 chars
- [ ] Canonical matches sitemap `<loc>` character-for-character
- [ ] `og:type=article` with both timestamps
- [ ] description = `og:description` = `twitter:description`
- [ ] GA4 present; cache token matches every other page

**Routing**
- [ ] 2 guard rules added to `netlify.toml` in the same commit
- [ ] No `/knowledge/<cat>/<slug>` (slashless) rule added

**Links & schema**
- [ ] Mandatory links present per `INTERNAL_LINKING.md`
- [ ] `BreadcrumbList` mirrors the visible breadcrumb 1:1
- [ ] `FAQPage` present **only if** a visible FAQ exists, mirrored 1:1
- [ ] No forbidden schema type (`SCHEMA_STANDARD.md`)

**Content**
- [ ] Passes every rule in `EDITORIAL_GUIDELINES.md`
- [ ] Truth review completed by a human — not delegable

**Publication**
- [ ] Added to `sitemap.xml` with today's `lastmod`
- [ ] Category page's article list updated to include it
- [ ] If this is article 3 in the category, the service page's Related Resources slot is activated

**Post-deploy**
- [ ] URL returns 200; `/index.html` and `/index` both 301
