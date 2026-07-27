# Knowledge Structured Data Standard

**Status:** Canonical. Binding on every `/knowledge/` page.

---

## 1. The governing rule

> **Structured data describes what is actually on the page. Nothing else.**
>
> If a property would require inventing a fact, a person, a rating, or a piece of
> content that does not exist, the property does not ship.

This is not caution for its own sake. Fabricated structured data is a manual-action
risk, and it is the machine-readable form of lying to the reader.

---

## 2. Allowed types

Exactly three. Adding a fourth is a governance decision, not an editorial one.

### 2.1 `BreadcrumbList` — required on every page

Four levels on an article, mirroring the visible `<nav class="breadcrumb">` **exactly**:
same names, same order, same count.

```
Home › Knowledge › <Category> › <Article Title>
```

| Rule | Detail |
|---|---|
| `position` | Sequential from 1, no gaps |
| `name` | Character-identical to the visible breadcrumb text |
| `item` | Absolute URL with trailing slash. The final item may omit `item` or self-reference |
| Verification | Automated 1:1 comparison against the rendered breadcrumb before publish |

Already verified passing on all 8 live Knowledge pages.

### 2.2 `Article` — required on articles, forbidden elsewhere

**`Article` — not `BlogPosting` (this is not a blog), not `NewsArticle`.**

Ships only on `/knowledge/<category>/<slug>/`. The hub and the seven category pages
carry `BreadcrumbList` only.

Required properties:

| Property | Value |
|---|---|
| `headline` | ≤110 characters |
| `description` | Identical to the meta description |
| `image` | Absolute URL |
| `datePublished` | Matches `article:published_time` |
| `dateModified` | Matches `article:modified_time` |
| `author` | `Organization`, referencing the homepage `@id` |
| `publisher` | Same `@id` |
| `mainEntityOfPage` | The canonical URL |
| `inLanguage` | `en-IN` |

`LocalBusiness` is never duplicated off the homepage — reference its `@id` instead.

### 2.3 `FAQPage` — conditional

Ships **only when a visible FAQ section exists on the page**, and then mirrors it 1:1 —
same questions, same answers, same wording, same count. No question in the schema that a
reader cannot see, and no visible question missing from the schema.

Most articles will not have an FAQ. That is fine. An FAQ added solely to emit schema is
content added for SEO, which `PROJECT.md` §19 forbids.

**Stated honestly:** Google narrowed FAQ rich-result eligibility to authoritative
government and health organisations in August 2023. A local service business should
**not** expect FAQ rich results to render. The on-page value is real — it answers
questions people actually have. The rich-result expectation is not. The 1:1 mirroring is
mandatory regardless, because sitewide consistency is worth more than the feature.

---

## 3. Never add

Each of these is either fabricated, unsupported, or actively harmful here.

| Type / property | Why it is forbidden |
|---|---|
| `AggregateRating`, `Review` on an article | Fabricated. Articles do not have ratings. Commit `33afb33` exists because this project already caught an unapproved, unattributed review |
| `HowTo` | Google removed HowTo rich results in 2023 — markup with no consumer, on exactly the clinical-adjacent content editorial rules restrict |
| `MedicalWebPage`, `MedicalCondition`, `MedicalProcedure`, `Drug`, `Physician` | Would claim medical authority this business does not have. The single most damaging possible addition |
| `reviewedBy` | A lie until a named, real, qualified reviewer exists and has actually reviewed the article |
| `Person` as `author` | No named author exists. `Organization` authorship is the truthful form |
| `VideoObject` | No video exists |
| `speakable` | Narrow support; premature |
| `Product`, `Offer`, `price`, `priceRange` on an article | The business does not publish fixed prices, and an article is not a product |
| `JobPosting` | Belongs to `/careers/`, per-role, with real dates. Never on Knowledge |
| `ItemList` on a category page with no articles | Would describe content that does not exist. Add only once the category holds real articles |
| `Event`, `Course`, `Recipe` | Nothing on this site is any of these |

---

## 4. Placement and format

- All JSON-LD sits in `<head>`, in `<script type="application/ld+json">` blocks.
- One `@type` per block. Do not merge unrelated nodes into a graph unless they genuinely
  reference each other.
- `application/ld+json` is exempt from the CSP `script-src` restriction, but the CSP
  still forbids inline `style` — that constraint is unrelated and still applies.
- Validate every new block before publishing. A malformed node is worse than no node.

---

## 5. Change control

| Change | Requires |
|---|---|
| Adding a property to an allowed type | Editorial review — the property must describe something real |
| Adding a **new type** | Owner approval, recorded in this file with the reason |
| Removing a forbidden type from §3 | Owner approval **and** evidence the underlying fact now exists (e.g. a real named medical reviewer has been engaged) |

When a category's first articles ship, revisit whether `ItemList` on that category page
has become truthful. It is currently absent for exactly the right reason.
