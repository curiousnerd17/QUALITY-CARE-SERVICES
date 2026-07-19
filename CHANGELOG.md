# CHANGELOG.md

**Quality Care Services — Release History**

> Newest first. One line per shipped change. Task/epic IDs reference `BACKLOG.md`;
> governance amendments reference `PROJECT.md`. Created 2026-07-02 to close the
> Documentation Hierarchy gap (PROJECT.md lists this file as the release history).

## 2026-07-19

- feat(ops): minimum production monitoring designed and documented (**P0-5**) —
  `MONITORING.md` runbook (UptimeRobot homepage keyword monitor · cron-job.org
  weekly synthetic form POST · alert delivery · owner routine · setup ledger)
  plus its forced-404 publish rule; zero code, zero infrastructure, free tiers
  only. Owner account setup (~10 min) itemized in the runbook ledger; P0-5
  closes at 4/4.
- fix(security): publish restriction — forced-404 redirect rules for all seven
  repository-root documentation files in `netlify.toml` (**P0-4**); necessity
  proven by pre-change live fetches of PROJECT.md and BACKLOG.md from
  production; purely additive, site serving and headers unchanged; exposure
  closes when this branch deploys.
- feat(deploy): cache-busting query-version tokens (`?v=20260719`) on
  `style.css`/`main.js` in `index.html` and `404.html` (**P0-3**) — deployed
  CSS/JS changes now reliably reach returning browsers despite the 1-year
  `immutable` cache; filenames and old URLs unchanged; zero visual or
  behavioural change (verified byte-identical across cache keys). Convention:
  bump the token in both files on any asset-changing deploy.
- `a78c43e` — fix(forms): production Web3Forms access key configured by owner —
  fresh rotated key (old exposed keys revoked, owner-attested), deployed, and
  **verified end-to-end in production** (live browser submission, success
  message, cooldown, inquiry email received). **P0-2 complete; form-outage
  incident RESOLVED** (window ~2026-07-01 → 2026-07-19; official record:
  IMPLEMENTATION_PROGRESS.md Session 2 log). Hotfix shipped the key line only;
  homepage content unchanged pending P1 review.

- `ef4bd6c` — feat(design): DS-3A service-card token migration committed to
  `ds-3a-service-card` for repository safety (**P0-1**, IMPLEMENTATION_MASTER_PLAN.md);
  §19 visual sign-off and DoD still pending — not merged, not deployed
- `69f53fe` — chore(docs): governance-doc line-ending state captured,
  content-identical per `git diff -w` (**P0-1**; LF normalization follows in P0-6)
- docs(planning): IMPLEMENTATION_MASTER_PLAN.md and IMPLEMENTATION_PROGRESS.md
  added; P0-1 recorded across the tracker, backlog, and this changelog
  (**P0-1** closing commit); branch subsequently pushed to origin.
- docs(ops): **P0-2** production-form investigation recorded — placeholder key
  confirmed repo-wide and (by deploy-state match) live; incident window bounded
  at the ~2026-07-01 deploy; historical keys identified in public git history
  (rotation required); work **stopped on owner inputs** (fresh Web3Forms key +
  PROJECT.md §15 decision) per stop conditions. No site code changed.

## 2026-07-03

- `19aad71` — docs(architecture): `SERVICE_PAGE_SPEC.md`
  frozen as **v1.2** — the approved, canonical service-page architecture
  specification for Epics 3–4 and EPIC SP
- `19aad71` — docs(sync): project documentation synchronized
  with the frozen spec — PROJECT.md **v1.3 amendment** (§10 template updated to the
  frozen slot order; SERVICE_PAGE_SPEC.md added to the Documentation Hierarchy);
  BACKLOG.md architecture milestone recorded complete and **EPIC SP — Service Page
  Implementation** added (SP-T1…SP-T8)
- `3a52d41` — feat(homepage): reconcile canonical service architecture — the canonical
  seven services implemented on the homepage; Patient Care established as the umbrella
  service (qualified nurses + experienced caregivers, per **D1**); Home Cook Services
  added as a first-class card; legacy Caretakers merged into contextual services and
  Full-Time Domestic Helpers merged into Maid Services (per **D2**); homepage service
  architecture aligned with business decisions D1 and D2 (**E1-T3**; partial **E1-T4**)
- `eb6582e` — docs(project): synchronize roadmap and backlog — PROJECT.md roadmap
  synchronization; BACKLOG.md status updates (E1-T2 ✅ with D1/D2 resolutions recorded,
  Design System roadmap/DS-3A status updates); CHANGELOG.md created for
  documentation-hierarchy synchronization

## 2026-07-01

- `d628cd0` — refactor(design): radius, spacing, and elevation token foundation
  (**DS-2B**; foundation only, no visual change)
- `30bf463` — refactor(design): color token foundation (**DS-2A**; value-neutral
  re-pointing; legacy `--blue`/`--section-blue` deprecated)
- `b6ab352` — feat(home): Mother & Newborn Care and Child Care cards reconciled to
  canonical services (partial **E1-T3**)
- `d9dd1d0` — fix(html): remove accidental text from `<head>`
- `163e2b9` — feat(homepage): domestic card titles aligned with canonical naming —
  "Maid Services", "Housekeeping / Dusting & Cleaning" (partial **E1-T3**)
- `d0d7f26` — fix(hero): restore caregiver image path
- `e6d09d8` — docs: canonical service architecture **v1.1 amendment** (Mother & Newborn
  Care consolidation; cluster renames; PROJECT.md §5)
- `caffdea` — docs: add project constitution (`PROJECT.md`) and implementation backlog
  (`BACKLOG.md`)
- `850f5eb` — feat(analytics): integrate Google Analytics 4 base tag and update CSP
  (pre-backlog; event tracking remains open under Epic 6)

## 2026-06-28 and earlier

- `ed4329e`, `077fff3`, `b5d5ef4`, `77901b0`, `f84fa54` — initial website and repository
  setup (pre-governance)
