# Knowledge Internal Linking Standard

**Status:** Canonical. Binding on every `/knowledge/` page.

---

## 1. The authority model

The **service pages are the commercial assets.** The Knowledge Center exists to pass
qualified readers and authority to them — not to accumulate its own traffic as a vanity
metric.

Link flow is deliberately asymmetric: articles link **down** to services generously and
**across** to each other sparingly.

```
                        Homepage
                       /        \
                      /          \
            /services/            /knowledge/          ← both in nav + footer, every page
                 |                     |
                 |                     v
                 |            7 category pages
                 |                     |
                 |                     v
                 |                 Articles
                 |                  /    \
                 |                 /      \
                 |     2–4 related articles (siblings)
                 |                 |
                 v                 |
        7 service pages  <---------+          every article, always
                 ^
                 |
        Related Resources slot (activates at 3 articles in that category)
```

---

## 2. Mandatory links — every article, no exceptions

| # | Target | Location | Anchor form |
|---|---|---|---|
| 1 | Its category's **service page** | Slot 8 body mention **and** slot 10 Related services | Descriptive phrase naming the service |
| 2 | Its **category page** | Slot 2 breadcrumb | Category name |
| 3 | **`/knowledge/`** | Slot 2 breadcrumb | "Knowledge" |
| 4 | **2–4 related articles** | Slot 11 | Article titles |
| 5 | **Contact / WhatsApp** | Slot 13 CTA | Existing global CTA components |

This makes orphan articles **structurally impossible**: a published article carries at
minimum five outbound internal links, and at least one inbound from its category index.

**Exception for the first two articles in a category:** slot 11 requires 2–4 siblings,
which do not yet exist. Articles 1 and 2 link back to the category page and the service
page instead. A "Related articles" block containing one link looks like an oversight and
is worse than omitting the block.

---

## 3. Link budget and anti-stuffing

| Rule | Detail |
|---|---|
| In-body contextual links | **2–5 per 1,000 words**. Above that the body reads as an SEO artefact |
| Repeat links | **Never link the same target twice in the body.** First mention only |
| Anchor text | The natural phrase for that sentence, varied across the corpus |
| Bent sentences | If a sentence must be reworded to accommodate an anchor, the link does not belong there |
| Exact-match repetition | Forbidden. A hundred articles linking "patient care in Kota" to one page is a detectable pattern |
| Forbidden forms | "click here", "read more", bare URLs, "this page" |
| Link modules | **No block added purely to distribute authority.** `PROJECT.md` §19 |

---

## 4. The reverse direction — Related Resources

`SERVICE_PAGE_SPEC.md` §3.5 reserved a **Related Resources** slot on the service
template two sprints before the Knowledge Center existed. It is dormant, with the
standing rule that it is *never shipped empty*.

**No service page needs restructuring.** The slot is waiting.

### Activation rule

> A service page's Related Resources slot activates when **≥ 3 published articles**
> declare that service as their category. It shows 3–4 links, refreshed as the cluster grows.

Three, not one — a slot containing a single link looks like an oversight and is not
worth the visual weight.

Because category and service are 1:1 by design, "how many articles does this service
have?" is a file count in one directory. No tracking system is needed.

### Cluster milestones

| Milestone | Articles in category | Meaning |
|---|---|---|
| Seeded | 1–2 | Cluster exists; Related Resources still dormant |
| **Activated** | **3** | Reverse links go live on the service page |
| Credible | 5–6 | Reads as genuine depth |
| Authoritative | 8–10 | Realistic ceiling for a business this size |

At 8 articles × 7 categories the platform tops out near **56 articles** of defensible
depth — consistent with the 20–50 target this architecture was scoped for.

---

## 5. Category page maintenance

A category page's article list is **not** automatic. When an article publishes, its
category page is updated in the **same commit**. An article that exists but is not
listed on its category page has exactly zero inbound links and is orphaned in practice
even though the file is live.

Current state: all seven category pages carry an honest "The First Guides Are Being
Written" section. When the first article lands in a category, that section is replaced
by a real list. When it does, revisit whether `ItemList` schema has become truthful for
that page — see `SCHEMA_STANDARD.md` §5.

---

## 6. What is deliberately not linked

| Not linked | Reason |
|---|---|
| Article → homepage, other than via the header logo and breadcrumb | The homepage needs no help; extra links dilute flow to service pages |
| Article → `/careers/` | Different audience entirely. Nav and footer already cover it |
| Article → a service page it does not relate to | Padding. The reader can reach all seven from the footer |
| Cross-category article links "for balance" | Related articles are chosen because they are genuinely related, never to even out a link graph |
| Automated "related posts" widgets | On a 40-article corpus a hand-curated pair outperforms them, and automation reliably surfaces the least relevant item |

---

## 7. Verification before publish

- [ ] All five mandatory links present and resolving
- [ ] Related articles resolve to **published** URLs, not planned ones
- [ ] No target linked twice in the body
- [ ] Anchor text varied; no exact-match repetition against existing articles
- [ ] Category page updated in the same commit
- [ ] If this is article 3 in the category, the service page's Related Resources slot is activated in the same commit
- [ ] In-body link count within 2–5 per 1,000 words

Sprint 1 verified 32 internal references across the 8 foundation pages with zero broken
links. That is the standard to hold.
