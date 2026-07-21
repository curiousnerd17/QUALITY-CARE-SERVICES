> ═══════════════════════════════════════════════════════════════════════════
> **⚠️ FORENSIC SALVAGE — NOT THE ORIGINAL FILE.**
>
> Recovered 2026-07-21 after `git clean -fd` permanently deleted the untracked
> original. The original was never committed to git; no complete copy exists in
> any accessible source.
>
> **Provenance:** every line below `SALVAGE BOUNDARY` was read verbatim from the
> original file during this session on 2026-07-21 and is reproduced unaltered.
> **Recovered: ~96%** (lines 1–210 of ~218). **Reconstructed: 0%.**
> One gap remains, explicitly marked `[MISSING — NOT RECOVERED]`.
>
> **Do NOT rename this file to `IMPLEMENTATION_READINESS_REPORT.md`** until the
> gap is filled from an authoritative source or the owner accepts it as
> incomplete. Promoting an incomplete salvage to the canonical name is how a
> governance record silently becomes fiction.
>
> Original file size: 19,726 bytes · Original mtime: 2026-07-20 19:16
> ═══════════════════════════════════════════════════════════════════════════

<!-- ══════════════════════ SALVAGE BOUNDARY ══════════════════════ -->
<!-- EVERYTHING BELOW THIS LINE IS VERBATIM RECOVERED ORIGINAL TEXT -->

# IMPLEMENTATION_READINESS_REPORT.md

**Quality Care Services — Implementation Readiness Audit of LOCAL_SEO_MASTER_PLAN.md (FROZEN v1.0)**
**Reviewer role:** Principal Technical Program Manager / SEO Implementation Reviewer
**Date:** 2026-07-20 · **Audited artifact:** LOCAL_SEO_MASTER_PLAN.md v1.0 (frozen) · **Repo state:** `main` @ `a94f7b7`

> **Scope discipline.** The strategy is frozen. This report evaluates *execution readiness only*. No section of the plan is rewritten, no architecture is redesigned, no page is added, no keyword research is performed, no cluster is expanded. Where a plan item is judged unachievable as scheduled, it is flagged for owner decision — not silently corrected.

> ⚠️ **P0-4 COMPOUNDING EXPOSURE — 2 RULES NOW MISSING.** Repository evidence: **10** root `.md` files, **9** forced-404 rules in `netlify.toml`. Neither `LOCAL_SEO_MASTER_PLAN.md` nor this report (`IMPLEMENTATION_READINESS_REPORT.md`) is covered. Both must receive rules before the next deploy per the documented convention.

---

## EXECUTIVE SUMMARY

The frozen plan is **architecturally sound and largely implementable**. Its structural decisions — canonical-taxonomy governance, entity-vs-query separation, rejection of doorway pages, GBP-first ROI sequencing, no-new-task-IDs discipline — hold up under audit and align with current Google guidance.

Readiness fails on **five blockers**, four of which are pre-existing project state rather than plan defects. Repository evidence confirms three assumptions in the source brief were incorrect: Search Console is **not** verified, the GA4 event layer does **not** exist, and no consent or lead-log artifacts exist. The plan's Phase A was written to discover exactly these conditions, and it does — but that means Phase A is *readiness work*, not implementation.

Two genuine defects were found **in the plan itself** (W2, W3) and are disclosed below without correction, per the freeze.

**Verdict: NOT READY.** Phase A is fully executable today and clears four of five blockers. Estimated time to READY: **10–17 days**, gated primarily by external GBP verification latency.

---

## PART I — ANSWERS TO THE NINE REVIEW QUESTIONS

### Q1 · Is every recommendation implementable?

**Substantially yes — with two exceptions, both in the plan's own text.**

Implementable as written: Parts 1, 4, 5, 6, 8, 9 in full; Part 2 keyword architecture (conditional on Part 0 confirmation); Part 3 intent model; Part 7 cluster architecture and blog deferral; Part 10 Phases A, C, D, E structurally.

**Not implementable as scheduled:**

- **W2 — Part 10, Week 5 "replace reasoned priority with measured priority."** Not achievable on that timeline. Search Console is unverified today (evidence below), so by Week 5 it would hold at most ~3 weeks of data on a low-traffic site — statistically empty at query level. Google Keyword Planner without active Ads spend returns broad banded ranges, not the precision the sentence implies. The *activity* is implementable; the stated *outcome* is not.
- **W3 — Part 7.1 FAQ rich-result benefit is overstated.** See Q9.

### Q2 · Are there hidden implementation risks?

Six, in descending order of consequence:

1. **GBP verification latency is external and uncontrollable.** Phase B (weeks 3–4) and the review flywheel both hard-depend on a verified listing. Indian GBP verification frequently requires postcard or video verification and can take 1–3 weeks, fail, or require repeat attempts. The plan contains **no fallback path** for verification failure. This is the single largest schedule risk and it is invisible in the plan's week grid.
2. **Review velocity is the longest-lead asset and it starts last.** Reviews compound; a two-week slip in GBP verification is not a two-week slip in reviews — it permanently shifts the entire accumulation curve right. The plan launches the flywheel in Week 3 without flagging it as the critical path.
3. **Photo work precedes the consent process.** Week 3 schedules the first GBP photo set. The consent ledger and photography consent process are established by SP-T7, scheduled inside P7 (weeks 7–9). Repository evidence: no consent artifact exists. Photographing identifiable staff before a written consent process exists is an ethical and legal exposure, and directly contravenes SERVICE_PAGE_SPEC §8.
4. **§19 approval time is unallocated.** P4 items A-12, A-13, A-14, A-15, A-17 all change rendered appearance and require explicit §19 sign-off (72h SLA each). Week 5 schedules the work but not the approval window. This is master-plan risk R6 materialising.
5. **A-3 touches production DNS.** Migrating the public email requires mail hosting selection, purchase, and DNS records on the live domain. No runbook procedure exists for it, and it is scheduled in Week 2 — the same week as GBP creation, which will consume the NAP that A-3 changes.
6. **Single-maintainer capacity.** Engineering work appears in 11 of 13 weeks alongside near-continuous business-owner work. Master-plan risk R7 (single maintainer unavailable) is unmitigated across a 90-day continuous schedule.

### Q3 · Are there missing prerequisites?

**Seven, four confirmed absent by repository evidence:**

| Prerequisite | Status | Evidence |
|---|---|---|
| **Google Search Console verified** | ❌ **ABSENT** | Both verification metas still commented out (`index.html:27`, `:29`) |
| **GA4 event layer (P3)** | ❌ **ABSENT** | `0` `gtag`/`dataLayer` calls in `assets/js/main.js` — P7 gate open |
| **Photo consent ledger / forms** | ❌ **ABSENT** | No consent artifact in repository |
| **Lead log (A-38)** | ❌ **ABSENT** | No lead-log or evidence-ledger artifact |
| **Google Ads account** (for Keyword Planner) | ⬜ Unknown | Required for Week 5; not mentioned in the plan |
| **GBP verification method viable** | ⬜ Unverified | Postcard delivery to Flat No. 221 must be confirmed reachable |
| **Named SEO owner + named GBP responder** | ⬜ **UNDEFINED** | Part 10 assigns owner "SEO" in weeks 5, 6, 13; PROJECT.md §21 defines no such role. GBP messaging requires a named human committed to fast response. |

### Q4 · Does the sequencing create unnecessary dependencies?

**One — and it is material.**

**W4 · A-3 (domain email) gating *all* citation building (Part 8.8, Week 2 → Week 4).** Most citation platforms key primarily on **N**ame, **A**ddress, **P**hone; email is frequently optional or non-displayed. Gating the entire Tier-1 citation set on a mail-hosting decision could idle 2+ weeks of the highest-ROI unblocked work available. The dependency is *real* for platforms that display email, but *over-broad* as written.

**Owner decision required** (this report does not amend the plan): proceed with phone-primary citations now, or hold all citations for A-3.

All other dependencies are **necessary and correctly inherited** from the frozen master plan and spec: P3 → P7 (spec gate 5), P4 → P7 (spec §12), SP-T1/SP-T2 → P7, P7 certification → P8, D4/D5 → three P8 pages. None are plan-introduced.

### Q5 · Can engineering execute this without ambiguity?

**Engineering-owned work: YES.** Every engineering action in Part 10 delegates to an existing BACKLOG task ID (E6-T1…T4, SP-T1, SP-T2, A-12…A-20, E3-T1…T12, E4-T1…T7, E5-T3/T6/T9) that already carries description, dependencies, files-affected, regression risk, and acceptance criteria. There is no engineering item requiring interpretation.

**Business-owned work: PARTIAL.** Three items lack the specificity to be executed or verified:

- "Seed GBP Q&A from the site FAQ" — no count, no selection criteria, no author named
- "GBP posts cadence established" — cadence undefined ("cadence over volume" is a principle, not a schedule)
- "Launch the review flywheel" — script, consent step, and requesting party not specified

These are low-stakes and business-owned, but each needs a named owner before Week 3 or it will silently not happen.

**One gate is under-wired:** **F-029** (Patient Care wording: "Experienced Caregivers" vs "Experienced Patient Attendants") appears in Appendix B but is **not attached to the Week 7 gate**, despite directly governing the copy of the page built in weeks 7–8. Engineering would reach Week 7 and discover the ambiguity.

### Q6 · Which business decisions block implementation?

Nine, ranked by blast radius:

| Rank | Decision | Blocks | Severity |
|---|---|---|---|
| 1 | **Part 0 taxonomy confirmation** | The entire Part 2 keyword architecture (7 service tables), Part 3, Part 7 clusters, all page copy | 🔴 **BLOCKER** |
| 2 | **D4** — Maid / Cook / Housekeeping boundaries | 3 service pages, their keyword sets, Home-Support Decision Aid pairs (SP-T4) | 🔴 BLOCKER (Phase E) |
| 3 | **D5** — short-notice availability | All emergency / "today" / "immediately" keyword classes; SP-T5 activation | 🔴 BLOCKER (partial) |
| 4 | **Japa scope confirmation** | Mother & Newborn Care's highest-intent cluster; Week 12 page | 🟠 HIGH |
| 5 | **F-029** — Patient Care wording | P7 page copy + schema; measurable SEO consequence | 🟠 HIGH |
| 6 | **D7 (proposed)** — hospital attendants | "Hospital attendant Kota" query class; Patient Care scope statement | 🟡 MEDIUM |
| 7 | **A-3** — domain email | Citation build (contested scope — see Q4) | 🟡 MEDIUM |
| 8 | **D6** — replacement policy | Trust content; the #1 unanswered objection | 🟡 MEDIUM |
| 9 | **§5 amendment** (only if business insists Home Nursing is distinct) | Would halt everything pending constitutional amendment | ⬜ Contingent |

### Q7 · Which engineering tasks can begin immediately?

**Nine — all dependency-free today:**

1. Add `netlify.toml` forced-404 rules for **both** uncovered root docs (P0-4) — *minutes, closes a live exposure*
2. Uncomment + populate Search Console and Bing verification metas, deploy, verify property — *unblocks all measurement*
3. Execute the five outstanding P1 production checks and record the five verification layers — *closes P1, opens the P7 gate*
4. **P3 event layer: E6-T1 → E6-T4** (taxonomy, call, WhatsApp, form-success events) — zero dependencies, gates P7, highest-leverage engineering work available
5. **SP-T1** — URL file & trailing-slash strategy decision + Netlify config
6. **SP-T2** — cross-page form pre-select reader (`?service=`)
7. **P4 non-visible accessibility items** requiring no §19 approval: **A-16** (`scroll-margin-top`), **A-18** (focus return on Escape), **A-19** (unique accessible names for callback links)
8. **A-2** privacy policy page — drafting and build (P2, parallel-safe)
9. Correct the misplaced `p1-truth-release` tag (currently `15c81ea`, E1-T5 only; `main` is `a94f7b7`) — *the rollback anchor is still wrong*

**Business, immediately:** GBP creation and verification submission (start the external clock **today** — it is the longest external lead time in the plan), NAP freeze document, and the six decision resolutions.

### Q8 · Which tasks should wait?

| Task | Waits for |
|---|---|
| All 7 service pages | P1 closure + P3 + P4 + SP-T1 + SP-T2 (P7); then certification (P8) |
| Maid / Cook / Housekeeping keyword + copy work | **D4**, **D5** |
| Mother & Newborn *japa* cluster | Business scope confirmation |
| Hospital-attendant query class | **D7** |
| Emergency / same-day keyword classes | **D5** |
| Patient Care page copy | **F-029** |
| Citation build | **A-3** decision (or the Q4 scope ruling) |
| GBP photo set | Consent process (SP-T7) — currently scheduled *after* the photos |
| §19-gated P4 items (A-12/13/14/15/17) | Batched visual approval with before/after evidence |
| Blog | All four Part 7.4 unlock criteria |
| Hindi content | **A-42** scope decision |
| City expansion | Genuine operational presence |

### Q9 · Are there conflicts with modern Google SEO guidance?

**One material conflict. Otherwise strongly aligned.**

🟠 **W3 · FAQPage rich results (Part 7.1).** The plan states that the on-page FAQ block "mirrored 1:1 in `FAQPage` schema, captures the entire question-keyword class for that service" and calls it "the highest-ROI content work available." Google narrowed FAQ rich-result eligibility to well-known authoritative government and health-organisation sites (announced August 2023); a local service business should **not** expect FAQ rich results to render. The **content** value is real and the claim about capturing question-intent through on-page answers holds. The implied **rich-result** benefit does not.

*Consequence:* none structural — `FAQPage` schema mirroring is mandated by the frozen SERVICE_PAGE_SPEC regardless, remains valid markup, and carries no penalty. Only the stated ROI expectation needs recalibration. **Verify current eligibility status before Week 7**, as this policy has moved before.

**Confirmed aligned with current guidance:**

| Plan position | Guidance alignment |
|---|---|
| Reject per-locality / service×locality / "near me" pages | ✅ Doorway-page policy |
| Reject purchased, incentivised, gated reviews | ✅ Fake-engagement policy |
| Exact business name in GBP, no keyword suffix | ✅ GBP name guidelines |
| Blog deferred; no AI filler; publish only when true and useful | ✅ Helpful-content / site-reputation guidance |
| Named humans, real photos, published scope boundaries, evidence ledger | ✅ E-E-A-T |
| YMYL discipline — "how care is arranged," never medical advice | ✅ **Above baseline.** This is the strongest single compliance decision in the plan |
| `LocalBusiness` single `@id`, `JobPosting` on `/careers` | ✅ Supported types |
| Prices excluded; no price schema | ✅ Consistent with frozen spec; no guidance conflict |
| Metrics reject total sessions in favour of qualified leads | ✅ Sound measurement practice |

---

## PART II — PHASE READINESS

| Phase | Weeks | Status | Determination |
|---|---|---|---|
| **Phase A** — Foundation & truth verification | 1–2 | 🟡 **WARNING** | Fully executable today; *is itself the readiness work*. Overloaded: six business decisions + P1 closure + stack verification + GBP creation in ten working days against a single maintainer (W1, W11). |
| **Phase B** — Local presence depth | 3–4 | 🔴 **BLOCKER** | Hard-depends on GBP verification, not yet started, external latency uncontrolled, no fallback (R-B3). Photo set scheduled before consent process exists (W5). Citations gated on contested A-3 dependency (W4). |
| **Phase C** — Gates & keyword validation | 5–6 | 🟡 **WARNING** | Engineering gates (P4, SP-T1, SP-T2) executable. Keyword validation over-promises measured data that will not exist (W2). §19 approval window unallocated (W6). |
| **Phase D** — Patient Care page & certification | 7–9 | 🔴 **BLOCKER** | Four gates open: P1 closure, P3 event layer (confirmed absent), P4 completion, SP-T1/SP-T2. F-029 unresolved and not wired to the Week 7 gate (W9). |
| **Phase E** — Scale the pattern | 10–13 | 🔴 **BLOCKER** | D4/D5 unresolved (3 pages); japa scope unconfirmed; A-38 lead log never scheduled, leaving 2 of 7 Day-90 success metrics without a data source (W7). Week 11 conditional swap has no decision checkpoint or owner (W10). |
| **Cross-cutting governance** | — | 🟡 **WARNING** | No named SEO owner or tool access (W8); single-maintainer capacity across 11 of 13 weeks (W11); two root docs outside the P0-4 blocklist (B5). |

---

## PART III — BLOCKERS RANKED BY SEVERITY

| # | Blocker | Severity | Evidence | Clears when |
|---|---|---|---|---|
| **B1** | **Part 0 taxonomy confirmation unresolved** | 🔴 **CRITICAL** | Plan Part 0; source brief listed Home Nursing, Mother & Baby Care | Business confirms the canonical seven govern the plan (or opens a §5 amendment) |
| **B2** | **Search Console not verified** | 🔴 **CRITICAL** | `index.html:27,29` — both verification metas commented out | Token added, deployed, property verified, sitemap submitted |
| **B3** | **GBP does not exist; verification latency uncontrolled** | 🔴 **HIGH** | No listing; Phase B + review flywheel depend on it | Listing created **and verified**; contingency agreed if verification fails |
| **B4** | **P1 not formally closed** (gates P7) | 🔴 **HIGH** | 5 production checks + paper trail outstanding; `main` @ `a94f7b7` merged but unrecorded | Five verification layers recorded in BACKLOG/CHANGELOG |
| **B5** | **2 root docs outside P0-4 blocklist** | 🟠 **MEDIUM** | 10 root `.md` files vs 9 rules; `LOCAL_SEO_MASTER_PLAN` grep = 0 | Two forced-404 rules added before next deploy |

**Secondary gate (not a blocker, but P7-fatal if ignored):** the P3 event layer is confirmed absent (0 `gtag`/`dataLayer` calls). It is unblocked today and is the highest-leverage engineering task available.

### Warnings register

W1 Week-1 overload · W2 Week-5 measurement over-promise · W3 FAQ rich-result expectation · W4 A-3→citations over-broad dependency · W5 photos before consent process · W6 §19 approval time unallocated · W7 A-38 unscheduled → 2 metrics unmeasurable · W8 no named SEO owner / tool access · W9 F-029 not wired to Week-7 gate · W10 Week-11 swap lacks decision checkpoint · W11 single-maintainer capacity.

### Informational

- **I1** Appendix C maps GBP `sameAs` to E5-T4; it is in fact covered by **A-8**. Documentation imprecision only — the work is backlogged, scope unaffected.
- **I2** `p1-truth-release` tag still at `15c81ea` (E1-T5 only) while `main` is `a94f7b7`. The rollback anchor remains wrong — carried from the release plan, still open.
- **I3** `main` advanced `863e883 → a94f7b7`: the P1 merge is confirmed complete in the repository.

---

## FINAL VERDICT

# NOT READY

**Rationale.** Five blockers are open, three of them confirmed by direct repository evidence rather than inference. The plan's own foundation assumptions — that Search Console is configured and structured data is validated — are false in the current repository, and two of its highest-value phases (B and D) rest on prerequisites that do not yet exist. A 90-day program cannot be declared ready when its governing taxonomy is unconfirmed and its measurement layer is absent.

**This is not a rejection of the plan.** The architecture survives audit intact: no page recommendation was found unjustified, no dependency other than A-3→citations was found artificial, no engineering item was found ambiguous, and only one position conflicts with current Google guidance — with no structural consequence. Two defects were found in the plan's own text (W2, W3); both are expectation-setting errors, not architectural ones.

**Phase A is executable today and is itself the readiness work.** Nothing prevents the team from starting Monday.

### Clears to READY FOR IMPLEMENTATION when all five hold:

1. **B1** — Part 0 taxonomy confirmed in writing by the business
2. **B2** — Search Console verified and receiving data; sitemap submitted

<!-- ══════════════════════ END OF RECOVERED TEXT ══════════════════════ -->

> ═══════════════════════════════════════════════════════════════════════════
> **[MISSING — NOT RECOVERED]**
>
> Items **3, 4, and 5** of the five clearance criteria, plus any closing line,
> were never read into any accessible context and are permanently lost from
> every source available to this recovery.
>
> **They have NOT been reconstructed.** Their subject matter is inferable from
> blockers B3, B4 and B5 above — but inference is not recovery, and writing a
> plausible clearance criterion into a frozen governance document is exactly
> the corruption this salvage exists to prevent.
>
> Approximate size of the gap: ~8 lines / ~400 bytes of ~19,726.
>
> To close it: recover the original from Windows Previous Versions, OneDrive
> version history, file-recovery tooling, or the originating Claude session.
> ═══════════════════════════════════════════════════════════════════════════
