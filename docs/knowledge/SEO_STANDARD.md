# Knowledge SEO Standard

**Status:** Canonical. Binding on every `/knowledge/` page.
**Basis:** measured from the 20 pages already live, not chosen from general practice.

---

## 1. Titles

**Format:** `<Specific Answer> | Quality Care Services`
**Length:** 50–60 characters, brand included.

The category name is **not** repeated in the title. The breadcrumb and URL already carry
it, and spending 15 characters restating "Patient Care" costs the part that earns the
click.

| Rule | Reason |
|---|---|
| Lead with the answer, not the topic | "Preparing a Room Before Discharge" beats "Room Preparation Guide" |
| Every title unique across the corpus | Duplicate titles are self-cannibalisation |
| "Kota" **only** when the article is genuinely Kota-specific | Appending "in Kota" to a universal explainer is the sentence-level doorway pattern |
| No year, no "2026", no "Ultimate", no "Complete" | Dates force a migration to stay current; superlatives are unverifiable |

**Verified band on live pages:** 53–58 characters across all 8 Knowledge pages.

---

## 2. Meta descriptions

**Length:** 149–158 characters. Hand-written, always.

Written as a promise of what the reader will learn, not a summary of what the page
contains. Never auto-generated from the first paragraph.

- Not a ranking factor; entirely a click-through factor.
- Must be unique across the corpus.
- Must match `og:description` and `twitter:description` **exactly**. Sprint 1.1 changed
  all three together for this reason — changing one and leaving two is a defect.

**Verified band on live pages:** 152–156 characters across all 8 Knowledge pages.

---

## 3. Canonical

```
<link rel="canonical" href="https://qualitycareservices.in/knowledge/<category>/<slug>/" />
```

| Property | Value |
|---|---|
| Form | Absolute |
| Protocol | `https://` |
| Host | non-`www` |
| Trailing slash | **Yes** — every `/knowledge/` path is a directory index |
| Self-referencing | Always |
| Match to sitemap `<loc>` | Character-for-character |

The site normalises four host/protocol variants in `netlify.toml`. The canonical is the
last line of defence for tracking parameters on shared links, and for the `index.html`
forms until their guards deploy.

---

## 4. Open Graph

| Tag | Value |
|---|---|
| `og:type` | **`article`** — the one head difference from hub and category pages, which use `website` |
| `og:url` | Identical to canonical |
| `og:title` | Identical to `<title>` |
| `og:description` | Identical to meta description |
| `og:image` | Absolute URL. `/images/logo-optimized.png` unless the article has its own real image |
| `og:site_name` | `Quality Care Services` |
| `og:locale` | `en_IN` |
| `article:published_time` | ISO date. Set once, never changed |
| `article:modified_time` | ISO date. Updated on every substantive edit |

**Why this matters more here than on most sites:** WhatsApp is the dominant sharing
surface in this market and it renders OG tags. An article shared into a family group
with no preview card converts materially worse than one with a title, a line of
description and an image. This is a conversion mechanism, not a social-media one.

---

## 5. Twitter

| Tag | Value |
|---|---|
| `twitter:card` | `summary_large_image` where a real image exists, else `summary` |
| `twitter:title` | Identical to `<title>` |
| `twitter:description` | Identical to meta description |
| `twitter:image` | Identical to `og:image` |

---

## 6. Heading hierarchy

```
h1  — exactly one, the article title (slot 3)
h2  — each top-level section (slots 4–13)
h3  — subsections, cards, list-block headings
h4  — only inside a card that already sits under an h3
```

- **No skipped levels.** `h2` → `h4` is a defect.
- The `<h1>` is the only place the full title appears in the body.
- Footer headings (`h2` "Quality Care Services", `h3` column titles) are part of the
  shared footer and are not counted against the article's outline.
- Heading text is descriptive, never a bare keyword.

---

## 7. Internal linking

Full rules in `INTERNAL_LINKING.md`. SEO-relevant constraints:

- **2–5 in-body contextual links per 1,000 words.** Above that the body reads as an SEO artefact.
- **Never link the same target twice in the body** — first mention only.
- **Anchor text is the natural phrase**, varied across the corpus. If a sentence has to
  be bent to accommodate an anchor, the link does not belong there.
- **No exact-match anchor repetition** — a hundred articles all linking the phrase
  "patient care in Kota" to the same page is a pattern, and a detectable one.
- **No "click here", no bare URLs.**
- **No link blocks added purely to distribute authority.** `PROJECT.md` §19: never add
  content solely for SEO.

---

## 8. Image alt text

| Rule | Detail |
|---|---|
| Informative images | Describe what the image conveys **in context**, not what it depicts in isolation |
| Decorative icons | `aria-hidden="true"` and no alt text — all Font Awesome `<i>` elements |
| Never | Keyword stuffing, "image of…", "photo of…", filename-as-alt, empty alt on an informative image |
| Length | Under ~125 characters; one clear sentence |
| Format | `.webp` only, explicit `width` and `height`, `loading="lazy"` below the fold |
| Naming | `<category>-<subject>.webp`, lowercase, hyphenated |

If an image adds nothing a sentence could not say, do not add it. Sprint 1 shipped
text-only pages deliberately; that remains acceptable.

---

## 9. Sitemap

Each article adds one `<url>` block to `sitemap.xml`, in the same commit:

```xml
<url>
  <loc>https://qualitycareservices.in/knowledge/<category>/<slug>/</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

Priority ladder in use: home `1.0` · services `0.9` · knowledge hub `0.8` · categories
and careers `0.7` · **articles `0.6`** · privacy `0.3`.

`lastmod` equals the article's `article:modified_time`. Never hand-edit one without the
other. The single flat sitemap stays until it exceeds ~50 URLs; splitting is deferred
and non-breaking when it happens.

---

## 10. Deliberately not done

| Not doing | Reason |
|---|---|
| `HowTo` schema | Google removed HowTo rich results in 2023. Markup with no consumer |
| Keyword-density targets | Optimising a discredited metric at the cost of readability |
| Auto-generated meta descriptions | Reliably worse than none |
| Dated URLs or titles | Blocks in-place refresh |
| Tag or topic pages | Below 6 articles per tag this is thin content. Deferred |
| FAQ rich-result expectations | Google narrowed eligibility to authoritative government and health bodies in Aug 2023. The on-page value is real; the rich-result expectation is not |
