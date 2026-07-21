# IMPLEMENTATION_READINESS_REPORT.md

**Quality Care Services — Implementation Readiness Audit of LOCAL_SEO_MASTER_PLAN.v2.md**
**Reviewer role:** Principal Technical Program Manager / SEO Implementation Reviewer
**Date:** 2026-07-21 · **Audited artifact:** `LOCAL_SEO_MASTER_PLAN.v2.md` · **Repo state:** `main` @ `a94f7b7`

> **Supersession notice.** This replaces the readiness report dated 2026-07-20, which was
> destroyed by `git clean -fd` and survives only as ~96% salvage
> (`IMPLEMENTATION_READINESS_REPORT.SALVAGE.md`). This is **not** a restoration of that
> audit. It is a **new assessment of the repository as it exists on 2026-07-21**. Findings
> attributable to the earlier audit are cited as such; nothing is claimed as a historical
> observation that could not be re-verified today.

> **Scope discipline.** The strategy is authoritative. This report evaluates *execution
> readiness only*. No section of the plan is rewritten, no architecture redesigned, no page
> added, no keyword research performed. Where a plan item is judged unachievable as
> scheduled, it is flagged for owner decision — not silently corrected.

---

## EXECUTIVE SUMMARY

The program has advanced materially since the previous audit. **Three of the five earlier
blockers now have implemented fixes on branches**, and the measurement layer that was
confirmed absent now exists in code. But every one of those fixes is **unmerged and
undeployed**, and the single highest-leverage external dependency — Google Business
Profile — has still not been started.

Verified by direct repository evidence today: Search Console remains unverified, zero of
seven service pages exist, no consent artifact exists, no lead log exists, and the
monitoring ledger stands at 0 of 4.

A new governance risk has appeared that did not exist at the previous audit: **the two
frozen strategy documents were destroyed** because they were never committed. One is 96%
recovered; the other is 20% recovered and rebuilt as v2.0 from repository evidence.

**Verdict: NOT READY.** The path to READY is materially shorter than before and is now
gated primarily on merge/deploy actions plus one external clock the business has not yet
started. Estimated time to READY: **7–14 days**, dominated by GBP verification latency.

---

## PART I — ANSWERS TO THE NINE REVIEW QUESTIONS

### Q1 · Is every recommendation implementable?

**Yes, with one section carrying an explicit confidence caveat.**

Implementable as written: Parts 0, 1, 3, 4, 5, 6, 7, 8 in full; Part 10 phases structurally.

**Carries a caveat, disclosed rather than corrected:**

- **W1 — Part 2 keyword architecture is re-derived, not original.** v1.0's reasoned tables
  were lost. v2.0 rebuilds them from the canonical taxonomy, the spec's title patterns, the
  live `makesOffer` descriptions and the live FAQ set. The *classes* are implementable; the
  *priority ordering* has lower confidence than v1.0's and must be validated against
  Search Console before dependent copy is finalised. v2.0 states this itself.
- **W2 — Part 10 Week 5 "replace reasoned priority with measured priority" remains
  unachievable on its stated timeline.** Carried from the previous audit and re-verified:
  Search Console is still unverified today, so a Week-5 measurement window would hold
  almost no query-level data. The *activity* is implementable; the stated *outcome* is not.

### Q2 · Are there hidden implementation risks?

Six, in descending order of consequence:

1. **GBP does not exist and the external clock has not started.** `RUNBOOK.md` §1 still
   records "Placeholder — not yet created". Indian GBP verification can take 1–3 weeks,
   fail, or need repeat attempts. Phase B and the entire review flywheel depend on it. This
   remains the largest schedule risk in the program and it is now **one day older** than at
   the previous audit with no progress.
2. **Review velocity is the longest-lead asset and still has not started.** Reviews
   compound; every week of delay shifts the whole accumulation curve right permanently.
3. **All completed engineering sits unmerged.** P3 (`bed1c2a`) and B5 (`0f23caf`,
   `6023a4d`) are on branches, undeployed. Until they merge, the live site has no event
   layer and the publish blocklist gap remains open in production.
4. **Governance documents are partially untracked.** The `git clean -fd` incident proved
   the exposure: only untracked files were destroyed. **Partially remediated** —
   `SEO_EXECUTION_PLAYBOOK.md` and `evidence/` were committed in `eb38c22` and are now
   tracked. **Still untracked and therefore still destructible:**
   `LOCAL_SEO_MASTER_PLAN.v2.md`, this report, and both `.SALVAGE.md` files. The incident
   remains repeatable for those five artifacts until they are committed.
5. **Photo work still precedes the consent process.** Phase B Week 3 schedules the first
   GBP photo set; the consent process is SP-T7, inside P7 (Weeks 7–9). No consent artifact
   exists in the repository. Photographing identifiable staff before a written consent
   process exists is an ethical and legal exposure and contravenes `SERVICE_PAGE_SPEC.md` §8.
6. **Single-maintainer capacity.** Engineering work appears in most weeks alongside
   near-continuous business-owner work. `IMPLEMENTATION_MASTER_PLAN.md` risk R7 is
   unmitigated across a 90-day continuous schedule; `RUNBOOK.md` §4 escrow is not activated.

### Q3 · Are there missing prerequisites?

**Eight. Five confirmed absent by direct repository evidence today.**

| Prerequisite | Status | Evidence (verified 2026-07-21) |
|---|---|---|
| **Google Search Console verified** | ❌ **ABSENT** | `index.html:27,29` — both verification metas still commented out |
| **GA4 event layer (P3)** | 🔶 **EXISTS, UNMERGED** | 9 `trackEvent` calls on `p3-measurement-layer`; `main` still has none |
| **Photo consent ledger / forms** | ❌ **ABSENT** | No consent artifact anywhere in the repository |
| **Lead log (A-38)** | ❌ **ABSENT** | No lead-log or evidence-ledger artifact |
| **Google Business Profile** | ❌ **ABSENT** | `RUNBOOK.md` §1 — "Placeholder — not yet created" |
| **Monitoring live** | ❌ **ABSENT** | `MONITORING.md` ledger: 4 rows still "⬜ Owner action required" |
| **Google Ads account** (Keyword Planner) | ⬜ Unknown | Required for Part 10 Week 5; not recorded anywhere |
| **Named SEO owner + named GBP responder** | ⬜ **UNDEFINED** | Part 10 assigns owner "SEO"; `PROJECT.md` §21 defines no such role |

### Q4 · Does the sequencing create unnecessary dependencies?

**One, unchanged and still material.**

**W3 · A-3 (domain email) gating *all* citation building.** Most citation platforms key on
**N**ame, **A**ddress, **P**hone; email is frequently optional or non-displayed. Gating the
entire Tier-1 citation set on a mail-hosting decision could idle weeks of the highest-ROI
unblocked work available. The dependency is real for platforms that display email, but
over-broad as written.

**Owner decision required** (this report does not amend the plan): proceed with
phone-primary citations now, or hold all citations for A-3.

All other dependencies are necessary and correctly inherited: P3 → P7, P4 → P7,
SP-T1/SP-T2 → P7, P7 certification → P8, D4/D5 → three P8 pages. None are plan-introduced.

### Q5 · Can engineering execute this without ambiguity?

**Engineering-owned work: YES.** Every engineering action in Part 10 delegates to an
existing `BACKLOG.md` ID (E6-T1…T4, SP-T1…SP-T8, A-12…A-20, E3-T1…T12, E4-T1…T7,
E5-T3/T4/T6/T9) carrying description, dependencies, files-affected, regression risk and
acceptance criteria. No engineering item requires interpretation.

**Business-owned work: PARTIAL.** Three items still lack the specificity to be executed or
verified:

- "Seed GBP Q&A from the site FAQ" — no count, no selection criteria, no author named
- "GBP posts cadence established" — cadence undefined *(a monthly default is now proposed
  in `SEO_EXECUTION_PLAYBOOK.md` §15.5, pending confirmation as `OD-001`)*
- "Launch the review flywheel" — script, consent step and requesting party not specified

**One gate remains under-wired:** **F-029** (Patient Care wording) appears in Appendix B but
is not attached to the Week 7 gate, despite governing the copy of the page built in Weeks
7–8. Engineering would reach Week 7 and discover the ambiguity.

### Q6 · Which business decisions block implementation?

Eight open, ranked by blast radius. **D1, D2 and D3 are resolved** and are not listed.

| Rank | Decision | Blocks | Severity |
|---|---|---|---|
| 1 | **D4** — Maid / Cook / Housekeeping boundaries | 3 service pages, their query classes, Decision Aid pairs (SP-T4) | 🔴 BLOCKER (Phase E) |
| 2 | **D5** — short-notice availability | All urgency query classes; Emergency band activation (SP-T5) | 🔴 BLOCKER (partial) |
| 3 | **Japa scope confirmation** | Mother & Newborn Care's highest-intent class; Week 12 page | 🟠 HIGH |
| 4 | **F-029** — Patient Care wording | P7 page copy + schema | 🟠 HIGH |
| 5 | **D7 (proposed)** — hospital attendants | "Hospital attendant Kota" class; Patient Care scope statement | 🟡 MEDIUM |
| 6 | **A-3** — domain email | Citation build (contested scope — see Q4) | 🟡 MEDIUM |
| 7 | **D6** — replacement policy | Trust content; the #1 unanswered objection | 🟡 MEDIUM |
| 8 | **§5 amendment** (only if the business insists Home Nursing is distinct) | Would halt everything pending constitutional amendment | ⬜ Contingent |

> **Part 0 taxonomy** was the previous audit's rank-1 blocker. `PROJECT.md` §5 and its v1.1
> amendment state the canonical seven unambiguously, and v2.0 Part 0 is derived directly
> from them. **Treated as settled by the constitution**, not by this report.

### Q7 · Which engineering tasks can begin immediately?

**Ten — all dependency-free today:**

1. **Commit the untracked governance documents** — closes the exact exposure that destroyed
   two frozen documents. Highest-value, lowest-cost action available.
2. **Merge and deploy B5** (`0f23caf`, `6023a4d`) — closes the live publish-blocklist gap
3. **Cold-review, merge and deploy P3** (`bed1c2a`) — activates the measurement layer
4. Uncomment + populate Search Console and Bing verification metas, deploy, verify property
5. Execute the five outstanding P1 production checks; record the five verification layers
6. **SP-T1** — URL file & trailing-slash strategy decision + Netlify config
7. **SP-T2** — cross-page form pre-select reader (`?service=`)
8. **P4 non-visible accessibility items** requiring no §19 approval: **A-16**
   (`scroll-margin-top`), **A-18** (focus return on Escape), **A-19** (unique accessible
   names for callback links)
9. **A-2** privacy policy page — drafting and build (P2, parallel-safe)
10. Retire or re-point the stale `p1-truth-release` tag (see I2)

**Business, immediately:** GBP creation and verification submission — **start the external
clock today**; it is the longest external lead time in the program. Then the NAP freeze
document and the eight decision resolutions.

### Q8 · Which tasks should wait?

| Task | Waits for |
|---|---|
| All 7 service pages | P1 closure + P3 + P4 + SP-T1 + SP-T2 (P7); then certification (P8) |
| Maid / Cook / Housekeeping query + copy work | **D4**, **D5** |
| Mother & Newborn *japa* class | Business scope confirmation |
| Hospital-attendant query class | **D7** |
| Urgency / same-day classes | **D5** |
| Patient Care page copy | **F-029** |
| Citation build | **A-3** decision (or the Q4 scope ruling) |
| GBP photo set | Consent process (SP-T7) — currently scheduled *after* the photos |
| §19-gated P4 items (A-12/13/14/15/17) | Batched visual approval with before/after evidence |
| Blog | All Part 7.4 unlock criteria |
| Hindi content | **A-42** scope decision |
| City expansion | Genuine operational presence + constitutional amendment |

### Q9 · Are there conflicts with modern Google SEO guidance?

**No new conflicts. One carried forward, already corrected inside v2.0.**

🟠 **FAQPage rich results.** Google narrowed FAQ rich-result eligibility to well-known
authoritative government and health-organisation sites (announced August 2023). A local
service business should not expect FAQ rich results to render. **v2.0 Part 7.1 now carries
this correction inline**, so the expectation error the previous audit found in v1.0 no
longer exists in the governing document. `FAQPage` mirroring remains mandated by the frozen
spec regardless, remains valid markup, and carries no penalty.

**Confirmed aligned with current guidance:**

| Plan position | Guidance alignment |
|---|---|
| Reject per-locality / city×service / doorway pages | ✅ Doorway-page policy |
| Reject purchased, incentivised, gated reviews | ✅ Fake-engagement policy |
| Exact business name in GBP, no keyword suffix | ✅ GBP name guidelines |
| Blog deferred; no AI filler; publish only when true and useful | ✅ Helpful-content guidance |
| Named humans, real photos, published scope boundaries, evidence ledger | ✅ E-E-A-T |
| YMYL discipline — "how care is arranged," never medical advice | ✅ **Above baseline** |
| `LocalBusiness` single `@id`; `JobPosting` on `/careers` | ✅ Supported types |
| Prices excluded; no price schema | ✅ Consistent with frozen spec |
| Metrics reject total sessions in favour of qualified leads | ✅ Sound measurement practice |
| No search-volume figures asserted | ✅ Honest given no data source exists yet |

---

## PART II — PHASE READINESS

| Phase | Weeks | Status | Determination |
|---|---|---|---|
| **Phase A** — Foundation & truth verification | 1–2 | 🟡 **WARNING** | Executable today and *is itself the readiness work*. Overloaded: eight business decisions + P1 closure + stack verification + GBP creation against a single maintainer (W4, W8). |
| **Phase B** — Local presence depth | 3–4 | 🔴 **BLOCKER** | Hard-depends on GBP verification, **not yet started**, external latency uncontrolled, no fallback recorded. Photo set scheduled before the consent process exists (W5). Citations gated on contested A-3 (W3). |
| **Phase C** — Gates & keyword validation | 5–6 | 🟡 **WARNING** | Engineering gates (P4, SP-T1, SP-T2) executable. Keyword validation over-promises data that will not exist (W2). §19 approval window unallocated (W6). |
| **Phase D** — Patient Care page & certification | 7–9 | 🔴 **BLOCKER** | Gates open: P1 closure, P3 merge+deploy, P4 completion, SP-T1/SP-T2. F-029 unresolved and not wired to the Week 7 gate (W7). |
| **Phase E** — Scale the pattern | 10–13 | 🔴 **BLOCKER** | D4/D5 unresolved (3 pages); japa scope unconfirmed; A-38 lead log never scheduled, leaving 2 of 7 Day-90 success metrics without a data source (W9). Week 11 conditional swap has no decision checkpoint or owner. |
| **Cross-cutting governance** | — | 🔴 **BLOCKER** | **B4 — governance documents untracked.** No named SEO owner or tool access (W8); single-maintainer capacity unmitigated; escrow not activated. |

---

## PART III — BLOCKERS RANKED BY SEVERITY

| # | Blocker | Severity | Evidence (verified 2026-07-21) | Clears when |
|---|---|---|---|---|
| **B1** | **Search Console not verified** | 🔴 **CRITICAL** | `index.html:27,29` — both metas commented out | Token added, deployed, property verified, sitemap submitted |
| **B2** | **GBP does not exist; external clock not started** | 🔴 **CRITICAL** | `RUNBOOK.md` §1 placeholder row | Listing created **and verified**; contingency recorded if verification fails |
| **B3** | **P3 + B5 complete but unmerged and undeployed** | 🔴 **HIGH** | `bed1c2a`, `0f23caf`, `6023a4d` on branches; `main` @ `a94f7b7` | Cold review → merge → deploy → production verification |
| **B4** | **Governance documents partly untracked — incident is repeatable** | 🟠 **MEDIUM** *(downgraded from HIGH)* | Playbook + `evidence/` now tracked (`eb38c22`). Still `??`: `LOCAL_SEO_MASTER_PLAN.v2.md`, this report, both `.SALVAGE.md` files | Remaining five artifacts committed to git |
| **B5** | **P1 not formally closed** (gates P7) | 🟠 **MEDIUM** | 5 production checks + paper trail outstanding | Five verification layers recorded in BACKLOG/CHANGELOG |
| **B6** | **Monitoring not live** | 🟠 **MEDIUM** | `MONITORING.md` ledger 0/4 | Owner completes the ~10-minute setup; ledger 4/4 |

**Secondary gate (not a blocker, but P7-fatal if ignored):** the measurement layer exists in
code but not in production. Until P3 deploys and the five GA4 custom dimensions are
registered, no Part 10.4 metric that depends on GA4 is reportable.

### Warnings register

W1 Part 2 re-derived, lower confidence · W2 Week-5 measurement over-promise · W3
A-3→citations over-broad dependency · W4 Phase-A overload · W5 photos before consent
process · W6 §19 approval time unallocated · W7 F-029 not wired to Week-7 gate · W8 no named
SEO owner / GBP responder · W9 A-38 unscheduled → 2 metrics unmeasurable · W10
single-maintainer capacity; escrow not activated.

### Informational

- **I1** `p1.0.0` correctly points at `a94f7b7` (= `main`). **`p1-truth-release` remains at
  `15c81ea`** — a stale anchor carried from the release plan. Two tags, one correct, one
  misleading; the stale one should be retired or re-pointed.
- **I2** Publish blocklist on `b5-publish-blocklist` stands at **14 forced-404 rules against
  12 root `.md` files**, plus a fail-closed `/evidence/*` splat. Coverage is complete **on
  the branch**; production still runs the older ruleset.
- **I3** `LOCAL_SEO_MASTER_PLAN.md` v1.0 and the 2026-07-20 readiness report were destroyed
  by `git clean -fd`. v1.0 is ~20% recovered (salvage) and superseded by v2.0; the prior
  report is ~96% recovered (salvage) and superseded by this document.
- **I4** 0 of 7 service pages exist; `/services/` has not been created. Consistent with the
  roadmap — P7 has not been reached.
- **I5** **`D7` and `F-029` have no entry in any tracker.** Both appear in the plan's
  Appendix B (recovered v1.0 text) and both gate real work — D7 governs the
  hospital-attendant query class and the Patient Care scope statement; F-029 governs
  Patient Care copy and schema wording. Neither exists in `BACKLOG.md`,
  `IMPLEMENTATION_MASTER_PLAN.md`, `SERVICE_PAGE_SPEC.md` or `PROJECT.md`, so neither can
  be assigned, time-boxed or tracked to closure. D7 is explicitly marked "(proposed)" in
  Appendix B, which explains its absence; **F-029's absence is unexplained** and is the
  more likely of the two to be silently forgotten at the Week 7 gate (see W7).
  *Recommended:* give both a tracker entry before Phase C, or accept in writing that they
  are managed outside the backlog.
- **I6** **The `p3-measurement-layer` branch is no longer file-isolated.** It now carries
  two commits: `bed1c2a` (the P3 analytics layer — `main.js`, `index.html`, `404.html`,
  unchanged and intact) and `eb38c22` (`SEO_EXECUTION_PLAYBOOK.md` + `evidence/`, the
  document restoration). The three-file isolation established at the P3/B5 split therefore
  no longer holds for the branch as a whole: **merging it now also merges documentation.**
  This is not a defect — the restoration commit is additive, repository-only, and touches
  no production surface — but it should be a deliberate choice rather than a surprise at
  merge time. *Options:* merge as-is and note the mixed content in `CHANGELOG.md`, or
  cherry-pick `bed1c2a` alone if the P3 release must stay code-only.

---

## FINAL VERDICT

# NOT READY

**Rationale.** Six blockers are open, all six confirmed by direct repository evidence
rather than inference. Two are external-clock or deployment actions rather than unsolved
problems, which is a materially better position than the previous audit — but the program
still cannot be declared ready while its measurement layer is undeployed, its Search
Console unverified, its Business Profile non-existent, and its governing documents
untracked and therefore destructible.

**This is not a rejection of the plan.** The architecture survives audit intact: no page
recommendation was found unjustified, no dependency other than A-3→citations was found
artificial, no engineering item was found ambiguous, and no position conflicts with current
Google guidance. The one expectation error the previous audit found in v1.0 has been
corrected inside v2.0.

**The honest caveat this audit adds:** v2.0's Part 2 is re-derived rather than original.
Its query classes are sound and traceable to repository evidence, but its priority ordering
carries lower confidence than the lost v1.0 and must be validated against Search Console
before dependent copy is finalised.

**Phase A is executable today and is itself the readiness work.** Nothing prevents starting
tomorrow.

### Clears to READY FOR IMPLEMENTATION when all six hold:

1. **B1** — Search Console verified and receiving data; sitemap submitted
2. **B2** — Google Business Profile created **and verified**, with a verification-failure
   contingency recorded before the attempt
3. **B3** — P3 and B5 cold-reviewed, merged, deployed and production-verified; the five GA4
   custom dimensions registered
4. **B4** — all governance documents committed to git
5. **B5** — P1 formally closed with the five verification layers recorded
6. **B6** — monitoring live; `MONITORING.md` ledger at 4/4

---

*End of IMPLEMENTATION_READINESS_REPORT.md — 2026-07-21. Supersedes the 2026-07-20 report
(lost; ~96% salvage retained). This report authorizes no website change and amends no
strategy. It records readiness only, against the repository state verified on this date.*
