# IMPLEMENTATION_PROGRESS.md

**Quality Care Services — Execution Dashboard**

> Living tracker for IMPLEMENTATION_MASTER_PLAN.md execution. Roadmap detail
> lives in the master plan; task detail lives in BACKLOG.md; releases in
> CHANGELOG.md. **This file records only current state and progress.**
> Update after every implementation session. Keep entries one line where
> possible. Never delete history — append.
>
> ⚠️ Public until P0-4 ships (publish-directory restriction). Write nothing
> non-public here.

---

## Executive Status

| Field | Value |
|---|---|
| **Overall status** | 🟡 P0 In Progress — **form incident RESOLVED 2026-07-19**; lead pipeline operational |
| **Overall completion** | ~4% of master plan (P0-1 ✅, P0-2 ✅) |
| **Current phase** | P0 — Production Stabilization (In Progress) |
| **Current milestone** | M1 — Production Stabilization |
| **Current branch** | `ds-3a-service-card` — clean, ✅ pushed (`origin/ds-3a-service-card` @ `a78c43e`) |
| **Live production** | `main` @ `d628cd0` (pre-truth-release state) |
| **Last update** | 2026-07-19 (Session 3 — P0-2 CLOSED; incident resolved) |
| **Current release target** | R1 "Stabilization" = P0 complete, deployed, verified |

---

## Phase Progress

| Phase | Status | % | Started | Completed | Branch | Notes |
|---|---|---|---|---|---|---|
| P0 Production Stabilization | **Engineering Complete** | 100% eng / owner items open | 2026-07-19 | 2026-07-19 (eng) | `ds-3a-service-card` | All 8 items done or owner-queued; **P0-8 verdict: PASS WITH OWNER ACTIONS** (Session 9) |
| P1 Truth Release | Not Started | 0% | — | — | `ds-3a-service-card` (pre-work exists) | Homepage reconciliation already committed on branch, awaiting review |
| P2 Trust, Privacy & Local Presence | Not Started | 0% | — | — | — | Needs business inputs: D6, evidence facts, mail hosting |
| P3 Measurement | Not Started | 0% | — | — | — | — |
| P4 Accessibility & Conversion | Not Started | 0% | — | — | — | Needs §19 approvals for visible deltas |
| P5 Performance Hardening | Not Started | 0% | — | — | — | — |
| P6 Security Hardening | Not Started | 0% | — | — | — | Ships alone; preview-deploy staged |
| P7 Patient Care Page + Template | Not Started | 0% | — | — | — | Gated: P1, P3, P4, SP-T1, SP-T2 |
| P8 Remaining Service Pages | Not Started | 0% | — | — | — | Gated: P7 cert; D4/D5 for Home Support pages |
| P9 Brand & Design System | Not Started | 0% | — | — | — | DS-3A diff exists (uncommitted); §19-heavy |
| P10 Operational Maturity | Not Started | 0% (continuous) | — | n/a | — | Seeded by P0-5/P0-7 |

Status vocabulary: Not Started → In Progress → Review → Verified → Released → Complete.

---

## Current Sprint

| Field | Value |
|---|---|
| **Objective** | Execute Phase P0 — end the form incident, secure the pipeline |
| **Current task** | **P0-8 ✅ — PHASE P0 ENGINEERING COMPLETE.** Verdict: **PASS WITH OWNER ACTIONS** (Netlify UI mapping verify · P0-5 accounts · RUNBOOK fill-ins · post-deploy checks). Next phase: **P1 Truth Release review** |
| **Files being modified** | P0-1 touched: `assets/css/style.css` (commit only), governance docs (line-ending capture), planning docs. Next expected: `index.html` (form key), `netlify.toml` |
| **Expected deliverable** | Working, synthetically-monitored form; docs off production; cache-busting live; runbook |
| **Risks** | R1 (cache pinning — fix before any CSS/JS deploy); R5 (form path regression) |
| **Dependencies** | Web3Forms account access (owner); Netlify + registrar access for P0-7/P0-8 |
| **Acceptance criteria** | Per master plan P0: test lead arrives; `/PROJECT.md` → 404; alert fires on broken form; `origin/ds-3a-service-card` exists |

---

## Completed Work

*(Chronological. Pre-plan baseline entries from CHANGELOG included for context — marked ⬅ baseline.)*

| Date | Phase | Task | Commit | Verification | Release |
|---|---|---|---|---|---|
| 2026-07-01 | ⬅ baseline | DS-2A / DS-2B token foundations | `30bf463` / `d628cd0` | Value-neutral, verified | Live |
| 2026-07-02 | ⬅ baseline | E1-T1 asset refs, E1-T8 sitemap date (audited ✅) | (audit) | Verified in repo | Live |
| 2026-07-03 | ⬅ baseline | E1-T2 + D1/D2/D3 resolutions; E1-T3/T4 homepage reconciliation; spec freeze v1.2 | `3a52d41`, `19aad71`, `b8315ba` | ⚠️ Not production-reviewed; **not deployed** | Branch only |
| 2026-07-19 | Planning | 10 audits + IMPLEMENTATION_MASTER_PLAN.md + this tracker | (P0-1 docs commit) | n/a (docs) | — |
| 2026-07-19 | P0 | **P0-1** repo safety: DS-3A diff committed; CRLF state captured; planning docs committed | `ef4bd6c`, `69f53fe`, `55476af` | ✅ Local verification (clean status) | ✅ Pushed to origin |
| 2026-07-19 | P0 | **P0-2** investigation: form flow documented; placeholder confirmed repo+live; key history mapped (junk value → real UUID key → placeholder); repo confirmed public; code-level verification of validation/failure/cooldown paths | (docs commit) | ✅ Investigation verified; ⛔ success-path verification blocked (no valid key) | ⛔ Blocked on owner (B1) |
| 2026-07-19 | P0 | **P0-2 closure**: owner deployed fresh rotated key; live browser test + email delivery confirmed; incident resolved | `a78c43e` (owner) | ✅ End-to-end (owner-verified) | ✅ Live |
| 2026-07-19 | P0 | **P0-3** cache-busting: query-version tokens on CSS/JS in both HTML files | `95e504a` | ✅ Local serve test + minimal-diff review | ⬜ Rides next branch deploy |
| 2026-07-19 | P0 | **P0-4** publish restriction: 7 forced-404 doc rules in netlify.toml | `4e0ba80` | ✅ TOML validated; full .md coverage confirmed | ⬜ Rides next branch deploy |
| 2026-07-19 | P0 | **P0-5** monitoring runbook (MONITORING.md) + its publish rule; payload validated; uptime target verified live | (this session) | ✅ Engineering; ⬜ owner account setup per ledger | n/a (external services) |
| — | — | *(append new rows here)* | — | — | — |

---

## Current Blockers

| # | Description | Severity | Owner | Dependency | Resolution plan | Status |
|---|---|---|---|---|---|---|
| B1 | ~~Production form key placeholder → lead loss~~ **INCIDENT RESOLVED 2026-07-19.** Owner executed all six recovery steps: fresh UUID key generated (verified: valid format, ≠ leaked `f42cd3…`, ≠ placeholder), old key(s) revoked (owner-attested), `index.html` updated by owner (commit `a78c43e`), deployed, **live browser submission test passed — success message ✓, cooldown ✓, inquiry email received ✓**. Incident window: ~2026-07-01 → 2026-07-19 (~18 days). Session 2 log remains the official incident record. | 🔴 Critical | Owner | — | Follow-up protection lands in P0-5 (synthetic form test + alerting) | ✅ **Resolved 2026-07-19** |
| B2 | Truth-release work unreviewed/unmerged on `ds-3a-service-card` | 🔴 Critical | Owner (review) | P1 review session (72h SLA) | ✅ Pushed 2026-07-19 (`origin/ds-3a-service-card`); only review + merge remain | Open — review only |
| B3 | Internal docs publicly served (`/PROJECT.md` confirmed live) | 🟠 High | Owner | Netlify config | P0-4 publish-dir restriction; blocklist completed to 12/12 on `b5-publish-blocklist` (see Readiness-B5 block below) | Open — awaiting deploy verification |
| B4 | D4 (Home Support boundaries) unresolved — gates 3 of 7 service pages | 🟠 High | Business | Owner decision | Escalate at P7 start; time-box | Open |
| B5 | D5 (short-notice availability per service) unresolved | 🟡 Medium | Business | Owner decision | Same escalation as B4 | Open |
| B6 | §19 approvals needed for visible fixes (WA contrast, hero image, DS-3A) | 🟡 Medium | Owner (governance) | Before/after evidence | Batch per phase (P1, P2, P4) | Open |
| B7 | ~~DS-3A CSS diff uncommitted 17 days~~ | 🟡 Medium | Owner | — | Committed as `ef4bd6c` (P0-1); §19 sign-off + DoD still pending under B6 | ✅ **Resolved 2026-07-19** |

> ⚠️ **ID-NAMESPACE WARNING — two different B-registers exist.** The `B1…B7` IDs above are
> this document's own register. `IMPLEMENTATION_READINESS_REPORT.md` maintains a **separate**
> `B1…B5` register, and the IDs **collide with different meanings**:
>
> | ID | Here (progress doc) | In the readiness report |
> |---|---|---|
> | B3 | Internal docs publicly served | GBP does not exist / verification latency |
> | B5 | **D5 — short-notice availability unresolved** | **Root docs outside the publish blocklist** |
>
> Always qualify the register when writing "B5". Unqualified, it is ambiguous, and the two
> B5s are unrelated: one is a Netlify config gap, the other an open business decision.

### Readiness-Report Blocker B5 — publish blocklist completion

**Scope:** `IMPLEMENTATION_READINESS_REPORT.md` → Part III → **B5** ("2 root docs outside the
P0-4 blocklist"). This is the *config* blocker. It is **not** progress-doc B5 (D5 short-notice
availability), which remains **Open** and untouched by this work.

**Implementation.** Branch `b5-publish-blocklist`. `netlify.toml` only; 29 lines added, 0 removed.
The audit recorded 2 uncovered docs against 10; the live gap was **3 against 12** —
`SEO_EXECUTION_PLAYBOOK.md` was created after the audit date. Rules added for
`LOCAL_SEO_MASTER_PLAN.md`, `IMPLEMENTATION_READINESS_REPORT.md`, `SEO_EXECUTION_PLAYBOOK.md`,
plus a pre-armed rule for `DECISION_LOG.md` (not yet created). Coverage: **12/12 root `.md`
files, 13 forced-404 rules.** Build block, domain redirects, security headers, CSP, and cache
policy byte-identical. No HTML/CSS/JS/routing/build change.

**Deployment verification commands — all four must pass before B5 may be marked CLOSED:**

```bash
# The three previously-unprotected documents — expect: HTTP/2 404
curl -I https://qualitycareservices.in/LOCAL_SEO_MASTER_PLAN.md
curl -I https://qualitycareservices.in/IMPLEMENTATION_READINESS_REPORT.md
curl -I https://qualitycareservices.in/SEO_EXECUTION_PLAYBOOK.md

# Production behaviour unchanged — expect: HTTP/2 200
curl -I https://qualitycareservices.in/
```

| # | Command target | Expected | Result | Date |
|---|---|---|---|---|
| 1 | `/LOCAL_SEO_MASTER_PLAN.md` | `HTTP/2 404` | ⬜ | — |
| 2 | `/IMPLEMENTATION_READINESS_REPORT.md` | `HTTP/2 404` | ⬜ | — |
| 3 | `/SEO_EXECUTION_PLAYBOOK.md` | `HTTP/2 404` | ⬜ | — |
| 4 | `/` (homepage) | `HTTP/2 200` | ⬜ | — |

**Status: ⬜ PENDING DEPLOY VERIFICATION.**

**Closure instruction.** When — and only when — all four rows above read ✅ against the live
production domain, replace the status line immediately above with:

> **Readiness-Report Blocker B5 → ✅ CLOSED (YYYY-MM-DD).** 12/12 root docs publish-protected;
> verified in production by the four commands above; homepage 200 confirmed unchanged.

Do **not** pre-mark this closed from a Deploy Preview URL. A preview proves the rules parse;
only the production domain proves the live exposure is shut. This ordering is
`SEO_EXECUTION_PLAYBOOK.md` §8 closure requirement C1.

---

## Next Actions

*(Immediate only — the roadmap lives in the master plan.)*

- [x] **P0-1** Protect work: DS-3A diff + docs committed (`ef4bd6c`, `69f53fe`, `55476af`) ✅
- [x] **P0-1** Branch pushed — `origin/ds-3a-service-card` exists ✅ (2026-07-19)
- [x] **P0-2** Owner recovery steps 1–6 complete; engineering closure checklist run ✅ (2026-07-19)
- [x] **P0-3** Cache-busting: `?v=20260719` query-version tokens on `style.css`/`main.js` in `index.html` + `404.html`; convention comment added; verified byte-identical serving across cache keys ✅ (deploys with the truth release)
- [x] **P0-4** Publish restriction: forced-404 rules for all 7 repo-root docs in `netlify.toml` (necessity proven — PROJECT.md and BACKLOG.md both fetched live pre-change); convention: every new root doc gets a rule in its creating commit ✅ (deploys with the truth release; owner may cherry-pick sooner)
- [ ] **P0-3** Cache-busting for `/assets/*` (before any CSS/JS deploy)
- [x] **P0-5 (engineering)** Monitoring designed + full runbook `MONITORING.md` (UptimeRobot keyword monitor · cron-job.org weekly synthetic form POST · alert paths · weekly 30-second owner routine · setup ledger); publish-blocked per P0-4 convention ✅
- [ ] **P0-5 (OWNER, ~10 min)** Create the two free accounts and configure per MONITORING.md; confirm test alert + first Monday TEST email; tick the four ledger rows — P0-5 closes then
- [x] **P0-6** `.gitattributes` (LF pinned repo+worktree, binary rules) + one-time renormalization of the 3 CRLF blobs, content-identical (verified) ✅ — **no contributor action needed in the normal case** (fresh clones and pulls are clean); see the clarified recipe in the Session 7 log
- [x] **P0-7** `RUNBOOK.md`: 11-account inventory (purpose/owner/recovery/MFA/backup per account, ⬜ OWNER rows for owner-only facts) · deployment + one-click rollback runbook · 4-scenario incident response · no-secrets escrow design · weekly/monthly/quarterly maintenance cadence · publish-blocked (9/9 root docs covered) ✅
- [ ] **P0-7 (OWNER, ~20 min)** Fill the ⬜ OWNER inventory rows (registrar!, MFA states, backup contacts) + run the §4 escrow activation checklist (add second person to GitHub/Netlify/GA4 + Google recovery contact)
- [x] **P0-8** Final verification battery run (Session 9): docs 9/9 protected · config clean (no duplicates/conflicts/shadowing) · static refs 100% resolved · secret scan clean · rollback/branch/preview documented ✅
- [ ] **P0-8 (OWNER VERIFY, ~5 min)** In Netlify UI confirm: production branch (`main`?), deploy trigger (auto on push?), deploy previews enabled — record answers in RUNBOOK §2
- [ ] **(OWNER) After next deploy:** run RUNBOOK §2 post-deploy checklist — incl. `/PROJECT.md` → 404 and `?v=` visible on CSS/JS
- [ ] Then: P1 review session for the truth release

---

## Current Risks

*(Active now; full register in master plan.)*

| Risk | Impact | Likelihood | Mitigation | Status |
|---|---|---|---|---|
| R1 Cache-pinned stale assets after next deploy | High | High until P0-3 | P0-3 ships first | 🔴 Active |
| R5 Lead-path regression during P0-2/P1 form edits | Critical | Medium | Synthetic form test after every form-touching deploy | 🔴 Active |
| R7 Single maintainer / single disk | Critical | Low | P0-1 push today; P0-7 escrow | 🔴 Active |
| R3 D4/D5 stall | High | High | Escalation scheduled at P7 start | 🟡 Watching |
| R6 §19 approval bottleneck | Medium | Medium | Batched approval requests, 72h SLA | 🟡 Watching |

---

## Verification Status

*(One row per completed task. Legend: ✅ done · ⬜ pending · — n/a.)*

| Task | Impl. | Code Review | Regression | Prod. Verification | Released |
|---|---|---|---|---|---|
| E1-T3/T4 homepage reconciliation | ✅ | ⬜ | ⬜ | ⬜ | ⬜ |
| DS-3A service-card migration | ✅ (`ef4bd6c`) | ⬜ (§19 pending) | ⬜ | ⬜ | ⬜ |
| P0-1 repository safety | ✅ | ✅ | — (no user-facing change) | — | ✅ Pushed |
| P0-3 cache-busting | ✅ | ✅ (4-line diff reviewed) | ✅ Byte-identical serving verified across cache keys; no CSS/JS content touched | ⬜ Post-deploy check: view-source shows `?v=` on live (rides truth-release deploy; P0-8 habit) | ⬜ Awaits branch deploy |
| P0-4 publish restriction | ✅ | ✅ (additive-only diff; TOML parse-validated; 7/7 root docs covered, 0 uncovered) | ✅ Site files unaffected (rules match doc paths only; publish/headers unchanged) | ⬜ Post-deploy check: fetch each doc URL, expect 404 | ⬜ Awaits branch deploy |
| P0-5 monitoring | ✅ eng (runbook + rule) | ✅ (payload urldecode + phone-regex validated; TOML 8/8 docs covered) | — (no site code touched) | ⬜ Owner: test alert + first TEST email per MONITORING.md ledger | n/a |
| P0-6 git hygiene | ✅ | ✅ (staged `diff -w` = attributes file only; per-file staged==pre-CR-strip verified) | ✅ Binaries unstaged; site files' blobs already LF, unchanged | — (repo-internal) | ✅ (repo policy active on commit) |
| P0-7 runbook | ✅ (doc + publish rule) | ✅ (TOML 9/9 docs covered; secret-scan clean — prose mentions only) | — (no site code touched) | ⬜ Post-deploy: `/RUNBOOK.md` → 404 | ⬜ Owner fill-ins + escrow activation |
| P0-8 final verification | ✅ (report; trackers only) | ✅ (scripted battery: docs/config/static/security all pass) | — (read-only phase) | ⬜ Netlify UI mapping = OWNER VERIFY; post-deploy checklist = owner | ✅ (verdict recorded) |
| P0-2 form pipeline recovery | ✅ (`a78c43e`, owner) | ✅ (key format verified, non-leaked) | ✅ Code-level paths + live cooldown confirmed by owner | ✅ **Owner live browser test + email delivery confirmed** | ✅ Deployed 2026-07-19 |
| Readiness-B5 publish blocklist completion | ✅ (`b5-publish-blocklist`) | ⬜ Cold review pending (≥1 day after build — playbook §6.2) | ✅ Additive-only diff; TOML parse-validated (16 redirects, 8 header blocks); 12/12 root docs covered, 0 uncovered; headers/CSP/build byte-identical; 0 HTML/CSS/JS files touched | ⬜ 4 curl commands vs production (3× 404 + homepage 200) — see Readiness-B5 block above | ⬜ Awaits branch deploy |
| *(append as tasks complete)* | | | | | |

---

## Release History

| Release | Date | Phases included | Deployment | Post-deploy verification | Issues found |
|---|---|---|---|---|---|
| (pre-plan) `d628cd0` | 2026-07-01 | Baseline (DS-2B tip) | Live | ⚠️ Never formally verified | Form key placeholder shipped; docs publicly served |
| Hotfix "Form key recovery" | 2026-07-19 | P0-2 only (key line; homepage content unchanged — truth release still pending review) | ✅ Deployed by owner | ✅ Live browser submission + success message + cooldown + email delivery (owner-verified) | None |
| R1 "Stabilization" | *target: TBD* | P0 (remaining: P0-3…P0-8) | — | — | — |
| *(append per release)* | | | | | |

---

## Session Log

*(Append one entry per implementation session. Keep to ~6 lines.)*

**2026-07-19 — Session 0 (planning, no implementation)**
- Objective: consolidate 10 audits into an execution system.
- Completed: IMPLEMENTATION_MASTER_PLAN.md v1.0; this tracker initialized to true current state.
- Remaining: everything — P0 not started.
- Decisions: phase order stabilize→truth→measure→harden→grow; `A-` ID convention; 72h review SLA.
- Next session goal: execute P0-1 through P0-4.

**2026-07-19 — Session 1 (P0-1 repository safety)**
- Objective: secure all uncommitted/unpushed work; nothing user-facing.
- Completed: stale `.git/index.lock` cleared; DS-3A diff committed (`ef4bd6c`, commit-only — §19/DoD still pending); CRLF doc state captured content-identically (`69f53fe`); planning docs + tracker/BACKLOG/CHANGELOG updates committed; working tree clean.
- Remaining: **push** — blocked in sandbox (HTTPS remote, no credentials). Owner runs `git push -u origin ds-3a-service-card`.
- Decisions: commit (not stash) chosen — stashes are loss-prone and this is the work's designated feature branch; CRLF captured as-is rather than discarded ("never discard work"), proper normalization deferred to P0-6.
- Next session goal: P0-2 (form verify/fix/rotate) after owner confirms push.

**2026-07-19 — Session 2 (P0-2 form pipeline — investigation; STOP condition reached)**
- Objective: verify and restore the production lead pipeline.
- Completed: full form-flow assessment; key confirmed placeholder on `main`, feature branch, working tree, and (by deploy-state match) live production; key history mapped — non-UUID junk value (`f84fa54`) → real UUID-format key, prefix `f42cd3…` (`77901b0`) → placeholder (`caffdea`), bounding the incident start at the ~2026-07-01 deploy; GitHub repo confirmed **public**, so both historical keys are world-readable; code-level verification of validation, network-failure, honeypot, duplicate-protection, and cooldown paths (all correct); branch push confirmed done.
- Remaining: key restoration + live success-path test — ⛔ **stopped per stop conditions**: correct production key unavailable, rotation requires the owner's Web3Forms dashboard, and committing a key conflicts with PROJECT.md §15 as written (constitutional decision surfaced per §21, not overridden).
- Decisions: do **not** reuse the leaked `f42cd3…` key (public history + rotation mandate); no placeholder shipped; no code modified; blocked state documented in B1 with a 4-step owner unblock checklist.
- Next session goal: on receipt of fresh key + §15 decision — commit key, deploy, owner browser test, close incident with postmortem note.

**2026-07-19 — Session 2b (owner decision recorded; standing by)**
- Objective: record the owner's P0-2 decision and prepare for resumption.
- Owner decision: STOP approved. No workaround; no key committed by engineering; §15 unchanged; deployment architecture unchanged. Owner personally executes all six recovery steps (key generation → revocation → `index.html` edit → deploy → browser test → email confirmation). P0-3 explicitly on hold. Session 2's investigation stands as the official incident record.
- **Session 3 resume checklist (run when owner confirms):** (1) pull/sync — expect an owner-authored `index.html` change (or a dirty working tree); never overwrite it; (2) verify no placeholder remains on any branch or, by fresh fetch, on the live site; (3) record the owner's browser-test result and email confirmation as the success-path verification; (4) confirm old keys revoked (owner attestation — dashboard is owner-only); (5) CHANGELOG incident-closure entry with lost-leads window if the owner's inbox check bounded it; (6) mark P0-2 ✅ Complete in all trackers; (7) unlock P0-3.
- Note for the record (per §21 surfacing duty, decision remains the owner's): if the owner's `index.html` edit is committed to the public repo, §15's current wording and repo reality will differ; a future reconciliation note is available whenever the owner wishes — none required now.
- Next session goal: execute the resume checklist on owner confirmation. No code changes until then.

**2026-07-19 — Session 3 (P0-2 closure — INCIDENT RESOLVED)**
- Objective: documentation closure of P0-2 on owner confirmation.
- Owner confirmation received: production deployed; live browser submission successful; success message displayed; cooldown behaved correctly; inquiry email received in the production inbox. **Lead pipeline verified end-to-end and operational.**
- Engineering closure checklist results: (1) repo synced — owner committed the fix as `a78c43e fix(forms): configure production Web3Forms access key` and pushed; tree clean; (2) placeholder gone — new key verified valid UUID format, ≠ leaked `f42cd3…`, ≠ placeholder (value never echoed); (3) owner test recorded as the success-path verification; (4) old-key revocation owner-attested; (5) CHANGELOG closure entry added; (6) P0-2 marked ✅ everywhere; (7) P0-3 unlocked as Current Task (not begun, per instruction).
- **Incident summary (official record = Session 2 log):** placeholder key deployed ~2026-07-01 (`caffdea` scrub without a key-delivery mechanism) → all form submissions failed ~18 days → detected by audit 2026-07-19 → resolved same day by owner with fresh rotated key. Leads lost: unbounded (inbox check optional, owner discretion). Root-cause protection: P0-5 synthetic form test + alerting.
- Live-state note: the hotfix deployed **only** the key line — live homepage remains the pre-truth-release version (verified by fetch); P1 content correctly still gated behind review (B2). Local `main` ref may be behind its remote if the fix was also applied there — run `git fetch` at P1 start.
- Next session goal: P0-3 (cache-busting) — first implementation session of the remaining P0 items.

**2026-07-19 — Session 4 (P0-3 cache-busting — implemented)**
- Objective: eliminate stale-asset risk under the 1-year `immutable` cache on `/assets/*`.
- Strategy chosen: **manual query-string versioning** (`?v=20260719`) — justified against filename fingerprinting (manual renames, error-prone, breaks "no renaming"), build-time hashing (build systems prohibited), and versioned filenames (renames break old URLs). Query tokens: 5-line diff, filenames stable (old URLs keep working), RFC 9111 cache keys include the query so browser + Netlify CDN both fetch fresh on token bump, and the existing `immutable` header becomes correct per-URL. `netlify.toml` deliberately untouched — headers work as-is with this scheme.
- Implemented: `?v=20260719` on `style.css` + `main.js` references in `index.html` and `404.html`; one convention comment at the index.html reference site. **Convention: bump the token in BOTH files in any deploy that changes the referenced asset.**
- Verified: full diff = 4 reference lines + 1 comment (nothing else); local HTTP serve test — versioned and unversioned URLs return byte-identical content (md5-matched) across distinct cache keys → zero visual/functional change, guaranteed cache invalidation on token change. CSS/JS file contents untouched.
- Deployment note: production gets cache-busting when this branch deploys (truth release) — correct sequencing, since that deploy is also the first CSS-changing deploy; interim `main` hotfixes don't change CSS/JS and remain safe.
- Residual discipline: token bumps are manual — added to the review convention here and enforced via the P0-8/P10 post-deploy verification habit.
- Next session goal: P0-4 (publish-directory restriction).

**2026-07-19 — Session 5 (P0-4 publish restriction — implemented)**
- Objective: ensure repository documentation can never be publicly served.
- **Necessity assessment (required before changing anything):** NECESSARY — proven by live evidence, not assumption. `publish = "."` deploys the repo root; `https://…/PROJECT.md` (earlier today) and `https://…/BACKLOG.md` (this session, pre-change) both returned full document content from production. `netlify.toml` itself verified NOT served by Netlify (no rule needed).
- Mechanism chosen: **forced-404 redirect rules per doc file** — Netlify redirects can't match by extension (`*.md` unsupported), and the fail-closed alternative (dedicated publish subdirectory) would restructure the repo, conflict with the review-pending truth-release branch, and cross the "no architecture changes" line. Blocklist chosen as the minimum change; its fail-open nature mitigated by an in-file convention ("every new root doc gets a rule in its creating commit") plus the quarterly cadence check (master plan R11). Allowlist restructure recorded as a deferred owner decision.
- Implemented: 7 `[[redirects]]` rules (`status = 404`, `force = true`, → `/404.html`) covering PROJECT, BACKLOG, CHANGELOG, README, SERVICE_PAGE_SPEC, IMPLEMENTATION_MASTER_PLAN, IMPLEMENTATION_PROGRESS. Purely additive (+53 lines, 0 deletions); `publish`, headers, and existing redirects untouched.
- Verified: TOML parses; 7/7 repo-root `.md` files covered, 0 uncovered (scripted cross-check); site-file serving unaffected (rules match doc paths only). Production verification deferred to the deploy it rides: fetch each doc URL, expect 404 with the styled 404 page.
- ⚠️ Exposure note: the live site remains exposed until this branch deploys. Owner option to close it sooner: cherry-pick this commit onto the deployed branch.
- Next session goal: P0-5 (uptime + synthetic form monitoring).

**2026-07-19 — Session 6 (P0-5 minimum monitoring — engineering complete; owner setup itemized)**
- Objective: uptime check + weekly synthetic form test + owner alerting, smallest production-grade solution.
- Approaches compared (before implementing): hosted uptime (UptimeRobot-class) ✓ · hosted cron with POST (cron-job.org-class) ✓ · GitHub Actions ✗ (excluded by scope; not required) · Netlify functions ✗ (adds build surface to a buildless site). **Chosen: two free hosted services, zero code, zero repo infrastructure.** The weekly TEST email doubles as a human-detectable heartbeat — the exact failure mode of the July incident (silent form death) becomes visible within one week worst-case, minutes best-case.
- Implemented (engineering): `MONITORING.md` runbook — exact UptimeRobot keyword-monitor settings; exact cron-job.org weekly POST job with a validated synthetic payload (urldecode + site phone-regex checked; `service=Other Requirement` keeps lead data clean; key referenced by location in index.html, never duplicated); alert-delivery paths (UptimeRobot email/app-push; cron-job.org failure email; Monday heartbeat); weekly 30-second owner routine; escalation notes; 4-row setup ledger. Plus the mandatory P0-4-convention publish rule for the new doc (8/8 root docs now covered — TOML revalidated).
- **STOP boundary honored — owner actions required (accounts need the business email):** create UptimeRobot account + monitor; test its alert; create cron-job.org account + weekly job; confirm first TEST email in inbox. ~10 minutes total; P0-5 closes when the MONITORING.md ledger shows 4/4 ✅.
- ⚠️ Environment note: mid-session, 9 tracked files appeared modified (~±4,600 lines) — diagnosed as Windows-side LF→CRLF re-saves with **zero content change** (`git diff -w` = netlify.toml +6 only; per-file md5 verified). Files restored to committed LF endings, byte-identical to HEAD (verified). Second CRLF event today — **P0-6 (.gitattributes) is now urgent.**
- Next session goal: P0-6 (.gitattributes + normalization commit).

**2026-07-19 — Session 7 (P0-6 git hygiene — complete)**
- Objective: permanently eliminate CRLF/LF drift after two same-day incidents.
- Root cause (required analysis, delivered pre-implementation): event 1 = Windows editor re-saves (CRLF worktree vs LF blobs); event 2 = untouched files flipping en masse — signature of a Windows-git rematerialization (global `core.autocrlf=true` most likely; Windows global config not inspectable from the sandbox), on a worktree physically shared by two differently-configured gits.
- Implemented: `.gitattributes` — `* text=auto eol=lf` default (LF in blobs AND worktree, so both gits agree on the shared folder; in-repo attributes override every local autocrlf) + explicit rules per type (html/css/js/md/toml/json/webmanifest/xml/svg/txt + dotfiles) + explicit `binary` for png/jpg/jpeg/webp/avif/gif/ico/woff/woff2/pdf (mis-detection cost = corruption; rule cost = one line). Rationale documented in-file.
- One-time renormalization: exactly the three CRLF blobs (BACKLOG.md, PROJECT.md, README.md — the P0-1 capture) rewritten LF, all other blobs already LF and untouched.
- Verified: staged `git diff --cached -w --stat` = `.gitattributes` +43 only (zero content change); per-file assertion staged-bytes == pre-normalization-bytes-minus-CR (3/3 VERIFIED); no image/binary staged; post-commit `git ls-files --eol` all `i/lf`, worktree clean.
- Future-Windows-checkout proof: `eol=lf` attribute governs materialization on every OS regardless of local config — a CRLF re-save by any tool is normalized away at `add`/`diff`, so phantom diffs are structurally impossible.
- **Contributor-recipe clarification (2026-07-19, supersedes the broader wording in the `05582d9` commit message):** `git add --renormalize .` was the *maintainer's* one-time command, executed inside `05582d9` — nobody runs it again (Case C only). Fresh clones and normal pulls need **nothing** (not Case A). Only a working tree that *already* held stale CRLF copies (narrow Case B) may keep those bytes on disk — git's attribute-normalized comparison means they show clean and produce no phantom diffs even so; `git checkout -- <paths>` (or re-clone) is an optional cosmetic step to force LF on disk immediately, relevant here mainly because the worktree is shared with the sandbox git. Owner post-pull rule of thumb: unexplained "modified" files in `git status` → `git checkout -- .`; clean status → do nothing.
- Next session goal: P0-7 (runbook + account inventory) — the last engineering item of P0 alongside P0-8 verification.

**2026-07-19 — Session 8 (P0-7 runbook + account inventory — complete)**
- Objective: operational documentation to run, recover, and transfer the project.
- Implemented: `RUNBOOK.md` — §1 inventory of all 11 accounts (registrar, GitHub, Netlify, Web3Forms, GA4, GSC, GBP placeholder, business Gmail, reviews Apps Script, UptimeRobot, cron-job.org) with purpose/owner/recovery/MFA/backup per account; owner-only facts marked ⬜ OWNER rather than guessed; registrar and Gmail flagged as the two single-points-of-failure. §2 deployment runbook (branch flow per §17, deploy steps incl. the P0-3 token and P0-4 rule conventions, post-deploy 3-minute checklist, one-click Netlify rollback with roll-back-first doctrine). §3 incident response for form failure / outage / DNS / deploy failure (detection→action→escalation→verification each, built on MONITORING.md signals and the July incident precedent). §4 escrow: second person needs Gmail access path + GitHub collaborator + Netlify team + GA4 admin + this file — zero stored secrets by design (all credentials recoverable via accounts; the one "key" is public-by-design). §5 weekly/monthly/quarterly maintenance (quarterly = the master-plan P10 cadence).
- Scope note (conflict surfaced, not silently expanded): the session's DO-NOT list includes Netlify config, but the DOCUMENT LOCATION requirement mandates the P0-4 convention, whose binding rule requires a forced-404 rule in the same commit that creates a root doc — without it the *account inventory* would deploy publicly. The single rule was added; publish/headers untouched; TOML revalidated (9/9 root docs covered, 0 uncovered).
- Verified: secret scan clean (matches are prose about secrets, no values); no site code touched.
- Owner follow-ups: fill ⬜ OWNER rows (registrar identity + expiry is the most important fact in the file) and run the §4 escrow activation checklist.
- Next session goal: P0-8 (deploy-mapping + live verification) — closes Phase P0 engineering.

**2026-07-19 — Session 9 (P0-8 final verification — PHASE P0 ENGINEERING COMPLETE)**
- Objective: final production audit closing Phase P0.
- **Verification battery results (scripted, recorded):** ① Repo→Netlify mapping — publish `"."` ✓, no build command (correct for static) ✓; production branch / deploy trigger / preview enablement live in the Netlify UI, **not repo-verifiable → ⬜ OWNER VERIFY** (strong inference from deploy history: `main`, auto-on-push — confirm, don't assume). ② Documentation protection — all 7 required docs + all 9 root `.md` files covered by forced-404 rules, 0 uncovered; DESIGN_GUIDELINES.md not present (n/a); rules take live effect on this branch's deploy. ③ Deployment safety — rollback (one-click), branch workflow, production branch, and preview usage all documented in RUNBOOK §2 ✓. ④ Config review — 12 redirect rules, no duplicates, no conflicts; ordering correct (host 301s → doc 404s chains properly); no 404 rule shadows any site path (all `.md`-scoped); known minor: `/*.html` cache header may not match bare `/` (defaults cover it; owner confirms post-deploy). ⑤ Static validation — all 10 core files present; every local reference in `index.html` resolves (0 unresolved). ⑥ Security — credential-pattern scan across all tracked files: clean (single hit = RUNBOOK's own "no passwords" prose, false positive); Web3Forms key in `index.html` is public-by-design per owner decision, not a leak; docs unexposed in config (live exposure ends at deploy).
- **Verdict: PASS WITH OWNER ACTIONS.** No blocking repository issues. Owner actions: Netlify UI mapping verification (record in RUNBOOK §2) · P0-5 accounts to ledger 4/4 · RUNBOOK ⬜ OWNER rows + escrow activation · post-deploy checklist after the next deploy.
- **Phase P0 engineering: COMPLETE** — all 8 items done or owner-queued, in one day, including one resolved production incident. The branch now carries the full stabilization set (cache-busting, doc protection, monitoring runbook, git hygiene, ops runbook) and awaits the P1 review to reach production.
- Next phase: **P1 Truth Release** — review + merge + deploy of the canonical-seven work (72h review SLA applies).

**2026-07-19 — Official Postmortem: Production Form Outage (issued by owner)**
- **Root cause:** placeholder access key accidentally deployed after credential scrubbing (`caffdea` scrubbed the key per §15 policy with no key-delivery mechanism in place; the next deploy shipped the placeholder).
- **Impact:** production inquiries could not reach the business (window ~2026-07-01 → 2026-07-19, ~18 days; count unbounded).
- **Detection:** P0-2 investigation (audit-driven; no monitoring existed to detect it earlier).
- **Resolution:** fresh Web3Forms key generated (rotation — old exposed keys revoked); production deployment completed; live submission verified end-to-end (success message, cooldown, email delivery).
- **Prevention (already scheduled in the master plan):** P0-5 weekly synthetic form test + alerting (detection); P0-8 post-deploy verification habit (would have caught the placeholder on deploy day); the §15 wording/reality reconciliation remains available at owner discretion.
- Status: **CLOSED.**

---

## Milestone Tracker

| Milestone | Maps to | Status | Progress |
|---|---|---|---|
| **M1 · Production Stabilization** | P0 | 🟡 In Progress (P0-1 ✅, P0-2 ✅) | 35% |
| **M2 · Truth Release** | P1 | 🟡 Pre-work on branch, unreviewed | 0% (impl. ~60% staged) |
| **M3 · Trust & Privacy** | P2 | ⬜ Not Started | 0% |
| **M4 · Measurement** | P3 | ⬜ Not Started | 0% |
| **M5 · Accessibility** | P4 | ⬜ Not Started | 0% |
| **M6 · Performance** | P5 | ⬜ Not Started | 0% |
| **M7 · Security** | P6 | ⬜ Not Started | 0% |
| **M8 · Patient Care Template Certified** | P7 | ⬜ Gated (M2, M4, M5, SP-T1/T2) | 0% |
| **M9 · Complete Service Pages** | P8 | ⬜ Gated (M8, D4/D5) | 0% |
| **M10 · Enterprise Ready** | P9 + P10 cadence running | ⬜ Not Started | 0% |

---

## Project Health Dashboard

| Area | Health |
|---|---|
| Production Stability | 🟡 Yellow (lead pipeline restored; monitoring still absent) |
| Documentation | 🟢 Green |
| Testing | 🔴 Red |
| Verification | 🔴 Red |
| Deployment | 🔴 Red |
| SEO | 🟡 Yellow |
| Accessibility | 🟡 Yellow |
| Performance | 🟡 Yellow |
| Security | 🟡 Yellow |
| Business Readiness | 🟡 Yellow |
| **Overall Health** | 🟡 **Yellow** (active incident resolved 2026-07-19; expected 🟢 after P0 complete + P1–P3) |

---

*Tracker v1.0 · created 2026-07-19 · update after every session.*
