# Knowledge Editorial Guidelines

**Status:** Canonical. Binding on every word published under `/knowledge/`.
**Precedence:** Where these rules conflict with an SEO opportunity, **these rules win.**

---

## 1. The YMYL boundary — the most important rule here

This business arranges care. It does not provide medicine. Everything published must
sit on the correct side of that line, and the line must be visible to the reader.

### Never publish

- **Diagnosis.** No article suggests what a condition might be, or how to recognise one.
- **Treatment advice.** No medication, dosing, wound care, physiotherapy instruction,
  feeding technique, or clinical procedure — however routine it seems.
- **Emergency guidance.** No "what to do if…" for a medical emergency. Any article
  touching an urgent scenario says *seek immediate medical help* and stops there.
- **Prognosis or recovery timelines.** Those belong to the medical team who know the case.
- **Anything a reader could substitute for their doctor's advice.**

### Always publish instead

The **logistics** of care: what to prepare, what to ask, who to hire, how a shift works,
how to supervise an arrangement, what tends to go wrong between a family and an
attendant. That is real, useful, and genuinely ours to write.

### The boundary is stated on the page

Every article carries slot 9, "What we do NOT advise", naming its own limits and
directing the reader to the treating doctor. On mother-and-newborn and patient-care
topics this must be the bluntest paragraph on the page.

### The test

> Could a reader act on this sentence instead of calling their doctor, and be harmed?
> If yes, it does not ship — regardless of how well-sourced or obvious it seems.

---

## 2. Honest claims only

Inherited from `PROJECT.md` §19 and applied without exception.

| Rule | Detail |
|---|---|
| **Only the seven canonical services** | Never describe work the business does not do |
| **No invented statistics** | No "90% of families…" without a real, citable source. Prefer no number to an invented one |
| **No fabricated testimonials, reviews, ratings or case studies** | Commit `33afb33` exists because this project already caught an unapproved, unattributed review |
| **No invented local facts** | Hospital names, timings, availability, costs — every one needs verification, and local facts go stale fastest |
| **No claims about staff credentials beyond what is true** | "Qualified nurses where clinical care is required" is true. "Certified specialists" is not |
| **Uncertainty is stated, not hidden** | "This varies by household" is an acceptable and often correct answer |

**Truth review is a separate, non-delegable step.** Before publish, a human reads the
article specifically asking: *is every factual claim here something we can stand behind?*
Anything that fails comes out. This is not the same pass as copy-editing.

---

## 3. No legal or financial guarantees

- No guarantees of outcome, availability, timing, or staff continuity.
- No employment-law, contract, tax or immigration advice — point to a qualified
  professional instead.
- No guardianship, inheritance or property guidance.
- **No fixed prices.** What a placement costs depends on hours, shift and duty. A number
  published before those are known would not be honest. This is already the stated
  position on the live category pages; do not undercut it.
- No statement that could read as a warranty of safety. "Every person we place is
  verified before a placement starts" is true and provable. "Completely safe" is not.

---

## 4. No exaggerated marketing

The Knowledge Center exists to be useful, not to sell. An article that is useful sells
better than one that tries to.

**Banned:** "best", "#1", "leading", "trusted by thousands", "world-class",
"guaranteed", "ultimate", "complete guide", "everything you need to know", manufactured
urgency, fake scarcity.

**Tone:** plain, direct, and calm. Most readers arrive during a difficult week — a
discharge, a fall, a new baby, a household that has stopped coping. Write for someone
tired and worried, not for a search engine.

- Short sentences. Concrete nouns.
- Say the useful thing first; do not bury it under an introduction.
- Address the reader as "you". Refer to the business as "we".
- Do not perform empathy. Being genuinely useful *is* the empathy.

---

## 5. No filler

An operational definition, so this is reviewable rather than a slogan:

**Symptoms of filler** — any of these means the section is cut or rewritten:

- A paragraph that restates the heading in different words
- A list where every item could apply to any of the seven services
- "In today's fast-paced world…" or any variant
- A section that exists because the outline had a gap
- Padding to reach a word count
- A definition of a term the reader already understands

**There is no minimum word count.** A 600-word article that answers the question fully
is better than a 1,800-word one that circles it.

> **Skipping a month is always better than publishing filler.** A corpus of padded
> articles is debt, and by the time it is visible it is 40 articles deep.

---

## 6. Local relevance

Kota is where this business operates, and local detail is the one thing a national
content site cannot copy. But locality must be **real**, not decorative.

### The find-replace test

> Take the draft. Replace every instance of "Kota" and every locality name with
> "Jaipur". **If the article is still true and still useful, the locality was
> decoration.** Remove it, or make the article genuinely local.

An article earns local framing only if swapping the city makes it **factually wrong**.

| Example | Verdict |
|---|---|
| "Elder Care in Talwandi" | ❌ Doorway pattern. Swap to Jaipur — still true |
| "Patient Care Services in Kota" | ❌ Duplicates the service page |
| "Preparing a home for elderly care through Kota's summer" | ✅ Kota's May–June heat is a specific, real, local condition |
| "What to arrange before a hospital discharge in Kota" — named hospitals, real discharge timings, actual equipment-hire options | ✅ Passes, **if** every local fact has been verified |

**No locality name appears in any URL slug.** That rule has no exceptions.

---

## 7. Review workflow

Every article passes all five gates, in order. No gate is skipped under deadline
pressure — the deadline moves instead.

| Gate | Question | Owner |
|---|---|---|
| 1 · Scope | Does this map to one of the seven canonical services? | Writer |
| 2 · Usefulness | Would a reader in this situation actually act on it? | Writer |
| 3 · Filler | Does any section trip §5? | Editor |
| 4 · **Truth** | Is every factual claim one we can stand behind? | **Human, non-delegable** |
| 5 · **YMYL** | Does any sentence cross §1? Is slot 9 specific and honest? | **Human, non-delegable** |

Gates 4 and 5 are the two that erode first under cadence pressure, which is exactly why
they are named separately and assigned to a person rather than a process.

---

## 8. Freshness

- `article:modified_time` and the sitemap `lastmod` update together on every
  substantive edit. Typo fixes are not substantive.
- Articles containing **local facts** carry the shortest review cycle — those go stale
  fastest and are the most damaging when wrong.
- A retired article is redirected, never silently deleted. A published URL is a
  permanent commitment (`PROJECT.md` §9).
