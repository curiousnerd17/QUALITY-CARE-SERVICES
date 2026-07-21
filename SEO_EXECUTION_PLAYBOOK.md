# SEO_EXECUTION_PLAYBOOK.md

**Quality Care Services — Operational Execution System for the Frozen Local SEO Program**
**Version:** 1.0 · **Created:** 2026-07-21 · **Owner:** Founder (sole operator)
**Governs:** *how* the frozen strategy is executed. **Never** *what* the strategy is.

> **Scope discipline — binding.**
> `LOCAL_SEO_MASTER_PLAN.md` v1.0 and `IMPLEMENTATION_READINESS_REPORT.md` are **FROZEN**.
> This playbook does not amend, reinterpret, extend, summarise, or supersede either one.
> It contains **no keywords, no page recommendations, no content suggestions, and no SEO
> analysis.** Where execution requires knowing *what* to do, this document points at the
> frozen source and stops. Its entire subject is the machinery: cadence, gates, approvals,
> evidence, rollback, and recording.
>
> **Repository-only — never deployed.** This file requires a forced-404 rule in
> `netlify.toml` before the next deploy, per the P0-4 convention. See §12.4.

---

## Table of Contents

| # | Section |
|---|---|
| §0 | Authority, roles, and the operating premise |
| §1 | Execution workflow |
| §2 | Weekly operating rhythm |
| §3 | Monthly review process |
| §4 | Decision log format |
| §5 | Business approval workflow |
| §6 | Engineering approval workflow |
| §7 | Definition of Ready |
| §8 | Definition of Done |
| §9 | Quality checklist |
| §10 | SEO change management process |
| §11 | Rollback strategy |
| §12 | Documentation update rules |
| §13 | Evidence collection process |
| §14 | Search Console review cadence |
| §15 | Google Business Profile maintenance cadence |
| §16 | Review management workflow |
| §17 | Content publishing workflow |
| §18 | Issue severity classification |
| §19 | Risk management |
| §20 | Success review process |
| App. A | Cold-start / re-entry protocol |
| App. B | Behind-schedule recovery protocol |
| App. C | Minimum viable week |
| App. D | Artifact index |
| App. E | Playbook activation checklist |

---

## §0 — Authority, roles, and the operating premise

### 0.1 Authority hierarchy (read top-down; higher wins on conflict)

| Rank | Document | Authority over |
|---|---|---|
| 1 | `PROJECT.md` | Constitution. Truth, scope, stack, §18 DoD, §19 never-change rules |
| 2 | `LOCAL_SEO_MASTER_PLAN.md` **(FROZEN)** | SEO strategy, sequencing, success metrics |
| 2 | `SERVICE_PAGE_SPEC.md` **(FROZEN)** | Page template law |
| 3 | `IMPLEMENTATION_READINESS_REPORT.md` **(FROZEN)** | Blocker/warning register as of 2026-07-20 |
| 4 | `BACKLOG.md` | Task-level authority: IDs, dependencies, acceptance criteria |
| 5 | `IMPLEMENTATION_MASTER_PLAN.md` | Phase definitions P0–P10, risk register R1–R7 |
| 6 | **This playbook** | Process only: cadence, gates, approvals, recording |
| 7 | `RUNBOOK.md` · `MONITORING.md` | Operational procedures, accounts, alerting |

**Conflict rule.** If this playbook ever appears to contradict a document above it, the
higher document wins and **this playbook is wrong and must be corrected** — not the other
way round. Record the correction as an `OD` entry (§4).

**Freeze rule.** Nothing in the two frozen documents may be edited. If execution proves a
frozen element unworkable, the only legal path is §20.5 — a written amendment proposal,
approved as a Business decision, applied as a **new version** of the frozen document with
a changelog entry. Never silent drift. Never an in-place edit.

### 0.2 The operating premise

One person holds three roles that this project's governance assumes are three people.
The entire playbook exists to keep those roles honestly separated when they share a skull.

| Hat | Role | Decides | Never does |
|---|---|---|---|
| 🔵 **Operator** | Business owner | Scope, truth, copy meaning, GBP, reviews, decisions D/A/F | Write code; approve own build |
| 🟢 **Builder** | Engineering | Implementation, technical execution, verification runs | Decide business truth; grant §19 approval |
| 🟠 **Reviewer** | Approval authority | §19 sign-off, merge approval, ship/no-ship | Build; decide scope |

**The Separation Rule (binding, non-negotiable):**

> **No item may be built and approved by the same hat in the same working session.**
> The Reviewer hat is worn **on a different calendar day** from the Builder hat, at the
> start of a session, before any new building begins, against a written checklist —
> never from memory of having just written the thing.

This is not ceremony. Solo operators fail at exactly this seam: the reviewer's eye cannot
form while the builder's context is still hot. Time is the only available substitute for a
second person. Everything in §5, §6, §9 and §13 is built to make the review mechanical —
pass/fail checks that survive a tired Friday — rather than dependent on judgment or mood.

### 0.3 Day-0 state (as of this playbook's creation)

Per the frozen readiness report, the program is **NOT READY** with five open blockers
(B1–B5) and eleven warnings (W1–W11). Therefore:

- **Gate 0 is in force.** Until B1–B5 clear, the only legal work is Gate-0 work: the
  blocker-clearing items the readiness report lists as executable today.
- Phase-D and Phase-E work items are **not Ready** by definition (§7) and may not be
  started, regardless of available time or enthusiasm.
- The playbook itself is live from day one — Gate-0 work runs through the same workflow,
  cadence, approvals, evidence, and recording as everything after it.

---

## §1 — Execution workflow

### 1.1 The single lane

Every unit of work — engineering task, business decision, GBP action, citation, review
response — travels one path. No item skips a state. No item exists outside the lane.

```
   ┌──────────┐
   │  INTAKE  │  captured, not yet assessed
   └────┬─────┘
        │  assess against §7
        ▼
   ┌──────────┐        blocked
   │  READY?  │─────────────────────► BLOCKED ──► (decision → §5, or dependency wait)
   └────┬─────┘                          │
        │ yes                            └──► re-enters at READY? when unblocked
        ▼
   ┌──────────┐
   │  QUEUED  │  Ready, waiting for a build slot
   └────┬─────┘
        │  WIP limit permits
        ▼
   ┌──────────┐   🟢 Builder hat
   │  BUILD   │   branch · implement · self-verify
   └────┬─────┘
        │  evidence captured (§13)
        ▼
   ┌──────────┐   🟢 Builder hat, same session
   │  VERIFY  │   §9 quality checklist run, results recorded
   └────┬─────┘
        │  ≥1 calendar day gap  ⟵ the Separation Rule
        ▼
   ┌──────────┐   🟠 Reviewer hat
   │  REVIEW  │   §6 · diff read cold · §19 sign-off if visible
   └────┬─────┘
        │  approved
        ▼
   ┌──────────┐
   │   SHIP   │   merge → deploy → RUNBOOK §2 post-deploy checklist
   └────┬─────┘
        │  production verified
        ▼
   ┌──────────┐
   │  RECORD  │   §12 doc updates · §13 evidence filed · §4 decisions logged
   └────┬─────┘
        │  §8 fully satisfied
        ▼
   ┌──────────┐
   │  CLOSED  │
   └──────────┘
```

**An item is not closed until RECORD completes.** Shipped-but-unrecorded is the single
most common failure mode of solo execution, and it is the one that destroys the ability to
execute consistently for years — because next year's operator (you, with no memory of
this) cannot reconstruct why anything is the way it is.

### 1.2 Work-in-progress limits (binding)

| Lane | WIP limit | Rationale |
|---|---|---|
| 🟢 Engineering build | **1** | Single maintainer; parallel branches produce merge risk and half-done work (§19 R7) |
| 🔵 Business execution | **1** | GBP/citation/review work is sequential by nature |
| 🔵 Business decisions | **3 open max** | More than three open decisions means the program is decision-starved, not work-starved — stop building and go decide (§5.5) |
| 🟠 Awaiting review | **2** | Beyond two, review becomes a batch chore and quality collapses |

**Exceeding a WIP limit is itself an S3 issue (§18).** Log it, stop intake, drain.

### 1.3 Item classification at intake

Every intake item is tagged with three attributes before it can be assessed for Ready:

| Attribute | Values | Determines |
|---|---|---|
| **Lane** | Engineering · Business · Decision | Which approval path (§5 or §6) |
| **Change class** | C0 · C1 · C2 · C3 | Rigour, batching, observation window (§10) |
| **Source ID** | Existing `BACKLOG.md` ID (`E3-T4`, `A-9`, `SP-T1`, `D4`…) | Traceability |

**No new task IDs.** The frozen plan creates none (Appendix C) and neither does this
playbook. If an intake item has no existing ID, it is **out of scope** until a Business
decision (§5) either maps it to an existing ID or explicitly approves adding one to
`BACKLOG.md`. Undocumented work is the mechanism by which frozen strategies quietly rot.

### 1.4 Where state lives

The lane state of every active item lives in `IMPLEMENTATION_PROGRESS.md` under
**Current Sprint**. It is updated at the Friday Close (§2.4), not continuously. One
source of truth, one update moment, no drift between three trackers.

---

## §2 — Weekly operating rhythm

### 2.1 Design constraints

The rhythm assumes: one person, a business to actually run, ~6–8 hours per week available
during the 90-day build, dropping to ~2–3 hours per week in steady state. It is built to
degrade gracefully — see Appendix C for the irreducible core when a week collapses.

**Fixed slots beat good intentions.** The slots below are calendar commitments, not
aspirations. A slot that moves twice in a month is a slot that has failed; re-time it
deliberately at the Monthly Review (§3) rather than letting it erode.

### 2.2 The week at a glance

| Slot | Day / time | Duration | Hat | Purpose |
|---|---|---|---|---|
| **Ops Check** | Mon 09:00 | 10 min | 🔵 | Heartbeat: nothing is on fire |
| **Weekly Plan** | Mon 09:10 | 20 min | 🔵 | Choose the week's one engineering + one business item |
| **Review Block** | Tue 09:00 | 30 min | 🟠 | Review whatever was built last week (cold) |
| **Build Block A** | Tue | 90–120 min | 🟢 | The week's engineering item |
| **Build Block B** | Thu | 90–120 min | 🟢 | Continuation / verification |
| **Business Block** | Wed | 45–60 min | 🔵 | GBP · reviews · citations · decisions |
| **Friday Close** | Fri 16:00 | 45 min | 🔵 | Record, update docs, set next week |

Total: ~6 hours committed. Build blocks are the only variable-length slots.

### 2.3 Monday Ops Check — 10 minutes, never skipped

Runs first, before planning, because planning against a broken system is wasted planning.
This is the `RUNBOOK.md` §5 weekly checklist plus the SEO surfaces.

| # | Check | Source | Fail → |
|---|---|---|---|
| 1 | Monday `SYNTHETIC TEST — IGNORE` email arrived | Business inbox | S1 (§18) — lead path may be dead |
| 2 | UptimeRobot green | UptimeRobot | S1 |
| 3 | No unanswered leads sitting in the inbox | Business inbox | S2 — business impact, immediate |
| 4 | Search Console: no new manual action, no new coverage error spike | GSC (§14.2) | S1 if manual action; else S3 |
| 5 | GBP: profile still live, not suspended, no unapproved edits | GBP dashboard (§15.2) | S1 if suspended |
| 6 | New reviews since last week? | GBP | Route to §16 |
| 7 | Netlify deploy list matches expectation — no deploys you didn't make | Netlify | S1 (unexplained deploy = possible compromise) |

**Record:** one line in `IMPLEMENTATION_PROGRESS.md` Session Log — `Ops Check YYYY-MM-DD:
7/7 green` or the exception. Ten minutes, every Monday, for years. This single habit is
what caught the July-2026 form outage's absence of detection.

### 2.4 Monday Weekly Plan — 20 minutes

1. **Read the top of `IMPLEMENTATION_PROGRESS.md`** — Current Blockers, then Next Actions.
2. **Check decision aging (§4.6).** Any decision past its time-box escalates *this week*
   ahead of build work. A stalled decision costs more than a slow build.
3. **Select exactly one engineering item and one business item** from the Ready queue,
   respecting §1.2 WIP limits and the frozen sequencing. You are not choosing *what the
   strategy is* — the frozen plan and `BACKLOG.md` already decided order. You are choosing
   only which already-sequenced, already-Ready item fits this week's actual capacity.
4. **Confirm both pass §7 Definition of Ready.** If the top item is not Ready, do not
   "start it anyway" — take the next Ready item and log why (§4).
5. **Write the two items into Current Sprint** with a one-line success statement each.

**The honesty rule:** if you have 2 hours this week, select a 2-hour item. Selecting a
6-hour item and delivering a third of it produces a half-built branch, which is worse than
nothing — it carries merge risk, occupies the WIP slot, and decays.

### 2.5 Tuesday Review Block — 30 minutes, cold

The Separation Rule made operational. Review what was built ≥1 day ago, **before** opening
any new build work, with the §6 checklist open. If nothing awaits review, the slot is spent
on §14 Search Console scan or evidence backfill — never absorbed into building.

### 2.6 Build blocks

- One branch. One item. Per `PROJECT.md` §17.
- Branch is **pushed at the end of every block**, complete or not (R7 mitigation:
  work survives the operator).
- If the block ends mid-item, write a `WIP:` note in the Session Log stating exactly where
  you stopped and what the next physical action is. Future-you has no memory.
- Evidence is captured **during** the block (§13), never reconstructed afterward.
- If an item exceeds two build blocks, it was mis-sized: stop, and at Friday Close either
  split it against existing acceptance criteria or return it to Queued with a note.

### 2.7 Wednesday Business Block — 45–60 minutes

Priority order, strictly:

1. **Review responses owed** (§16 SLA — always first; it is time-sensitive and public)
2. **Open decisions past time-box** (§4.6)
3. **This week's selected business item** (GBP depth, citations, consent, lead log — per
   the frozen sequence)
4. **GBP maintenance** for the current cadence slot (§15)

### 2.8 Friday Close — 45 minutes, the load-bearing slot

If only one slot survives a bad week, it is this one. Recording is what makes years of
execution possible.

| Step | Action | Target |
|---|---|---|
| 1 | Update `IMPLEMENTATION_PROGRESS.md` — Current Sprint, Blockers, Next Actions, Session Log | 15 min |
| 2 | File this week's evidence into `evidence/` per §13 | 10 min |
| 3 | Append any decisions taken to `DECISION_LOG.md` (§4) | 5 min |
| 4 | Update `BACKLOG.md` status lines for anything closed | 5 min |
| 5 | Add `CHANGELOG.md` lines for anything shipped | 5 min |
| 6 | Write next week's two candidate items into Next Actions | 5 min |

**Closing question, answered in writing every Friday:**
> *"If I disappeared for a month, could someone open this repository and know exactly
> where the program stands and what to do next?"*

If the answer is no, the Close is not finished.

---

## §3 — Monthly review process

**When:** first working Monday of the month, replacing that week's Weekly Plan.
**Duration:** 90 minutes, timeboxed. **Hat:** 🔵 Operator, with 🟠 Reviewer for §3.6.

### 3.1 Inputs assembled before starting (10 min)

- Search Console: last full month, per §14.3
- GBP Insights: last full month, per §15.4
- GA4: lead events by service (once P3 ships; until then, record *"not yet measurable —
  P3 open"* rather than substituting a proxy metric)
- Lead log (A-38) — once it exists; until then this is an open blocker, not a blank row
- `IMPLEMENTATION_PROGRESS.md` — phase progress, blockers, risks
- `DECISION_LOG.md` — open and aging decisions
- `evidence/` — the month's folder

### 3.2 Agenda (timeboxed — a timebox overrun is itself a finding)

| # | Item | Min | Output |
|---|---|---|---|
| 1 | **Ops health** — 4 weekly Ops Checks reviewed as a set; any recurring amber? | 5 | Issues logged (§18) |
| 2 | **Metric review** — the frozen Part 10.4 metrics only | 20 | Numbers recorded; **no interpretation yet** |
| 3 | **Interpretation** — what moved, what didn't, what is too early to tell (§3.3) | 15 | Written 3–5 sentence read |
| 4 | **Decision review** — open decisions, aging, escalation, time-box breaches | 10 | Decisions forced or escalated |
| 5 | **Risk review** — §19 register, tripwires checked | 10 | Register updated |
| 6 | **Documentation drift audit** (§3.6) | 10 | Drift corrected or ticketed |
| 7 | **Capacity honesty** — hours actually available next month vs plan | 5 | Plan re-scoped, not re-hoped |
| 8 | **Next-month sequencing** — from the frozen roadmap only | 15 | 4 weekly slots pre-loaded |

### 3.3 The interpretation discipline

Record numbers first, interpret second, **never interpret in the same breath as recording**.
Three verdicts are permitted per metric, and only three:

- **Moved** — changed beyond the noise floor, with a plausible attributed cause
- **Flat** — no material change
- **Too early** — insufficient data window to say anything honest

**"Too early" is a valid, common, and correct answer** in the first two quarters. A local
service business in a single city produces low-volume data; month-over-month wobble at
low counts is noise. Guardrails:

| Data | Minimum window before interpretation |
|---|---|
| Search Console query-level position | 28 days minimum; 90 days preferred |
| Search Console impressions/clicks | 28 days |
| GBP calls / direction requests | 30 days, compared to the same month prior where available |
| Review velocity | 90 days (it is a compounding curve, not a monthly figure) |
| Lead-to-placement rate | 90 days or 30 leads, whichever is later |

**Binding rule:** no strategy-affecting conclusion may be drawn from a window shorter than
the table above. The frozen readiness report already flagged premature measurement as
warning W2. Do not repeat the error monthly.

### 3.4 What the Monthly Review may and may not change

| May change | May not change |
|---|---|
| Which Ready item runs which week | The frozen sequence's dependency order |
| Time allocation between lanes | Any element of the frozen strategy |
| Risk ratings, tripwires, mitigations | Success metric definitions (Part 10.4) |
| Process in this playbook | Page inventory, keywords, clusters |
| Decision time-boxes and escalation | Anything in `PROJECT.md` §19 |

Anything in the right column requires §20.5 (amendment), not a monthly nudge.

### 3.5 Monthly output artifact

One appended section in `IMPLEMENTATION_PROGRESS.md`:

```
### Monthly Review — YYYY-MM

Metrics (recorded, not interpreted):
- [metric]: [value] · window: [dates] · source: [tool]

Read: [3–5 sentences. Moved / Flat / Too early per metric.]
Decisions taken: [OD/D IDs, or "none"]
Risks changed: [R-IDs, or "none"]
Drift found: [doc drift, or "none"]
Capacity next month: [hours/week, honestly]
Next month sequencing: [4 week-slots, from the frozen roadmap]
```

### 3.6 Documentation drift audit (10 min, mechanical)

| Check | Pass condition |
|---|---|
| Root `.md` count vs `netlify.toml` forced-404 rule count | Equal (P0-4 convention) |
| `BACKLOG.md` status lines vs what actually shipped | Match |
| `CHANGELOG.md` has a line for every production deploy this month | Match |
| `RUNBOOK.md` account inventory — new accounts added? | Inventory current |
| `MONITORING.md` ledger | Still accurate; new pages have monitors |
| Any ⬜ OWNER placeholder older than 60 days | Escalate as a decision (§4) |

---

## §4 — Decision log format

### 4.1 Why a separate log

Decisions currently live scattered across `BACKLOG.md` (D1–D7), the frozen plan's
Appendix B, `PROJECT.md` amendments, and commit messages. For a multi-year solo program
that is unrecoverable. **`DECISION_LOG.md` becomes the single chronological record of every
decision taken, its reasoning, and its consequences.**

It does **not** move or restate existing decisions. Pre-existing IDs (`D1`…`D7`, `A-3`,
`F-029`, Part 0, japa scope) keep their homes and authority; the log **references** them
and records the moment and reasoning of resolution.

### 4.2 File conventions

- **Location:** repository root, `DECISION_LOG.md`
- **Requires a forced-404 rule in `netlify.toml`** before the next deploy (P0-4)
- **Append-only.** Entries are never edited after status reaches Decided, except to add a
  `Superseded by:` line. Never delete. Never rewrite history.
- **Newest first**, matching `CHANGELOG.md` convention.

### 4.3 ID scheme

| Prefix | Meaning | Example |
|---|---|---|
| `D-n` | Pre-existing business scope decisions | `D4` — owned by `BACKLOG.md` |
| `A-n` / `F-n` / `SP-Tn` | Pre-existing backlog-owned decisions | `A-3`, `F-029` |
| **`OD-nnn`** | **Operational decision** — new, created by this playbook | `OD-001` |

`OD` entries cover execution choices only: cadence, tooling, sequencing within already-
approved order, process changes, contingency selection. **An `OD` entry may never decide a
matter reserved to the frozen strategy or `PROJECT.md` §19.** If drafting one starts to
feel like strategy, it is strategy — stop and go to §20.5.

### 4.4 Entry template (copy verbatim)

```markdown
### OD-007 — [Short imperative title]

- **Date:** YYYY-MM-DD
- **Status:** Proposed | Decided | Superseded | Reversed
- **Hat:** 🔵 Operator | 🟢 Builder | 🟠 Reviewer
- **Type:** Scope | Sequencing | Process | Tooling | Contingency | Content-truth
- **Governs / relates to:** [BACKLOG ID · frozen-plan Part reference · risk ID]
- **Time-box:** decide by YYYY-MM-DD (§4.6)

**Context.** [What forced a decision. 2–4 sentences. Written so it is legible to
someone with zero memory of this week.]

**Options considered.**
1. [Option] — [consequence]
2. [Option] — [consequence]
3. [Do nothing] — [consequence]   ← always include; often correct

**Decision.** [One unambiguous sentence in the active voice.]

**Reasoning.** [Why this option. Include what you were optimising for and what you
knowingly traded away.]

**Consequences.**
- Unblocks: [items]
- Blocks / defers: [items]
- Reversible? [Yes — how, at what cost | No — why not]
- Evidence: [evidence/ path, if any]

**Review trigger.** [The condition under which this decision should be revisited —
a date, a metric threshold, or an event. "Never" is a valid answer; write it.]
```

### 4.5 What must be logged

| Must log | Need not log |
|---|---|
| Any resolution of a `D`/`A`/`F` decision | Routine task execution |
| Any deviation from the frozen sequence | Choosing which Ready item to do first |
| Any contingency path taken (e.g. GBP verification failure) | Ordinary code implementation choices |
| Any §19 approval or refusal | Typo fixes |
| Any rollback (§11) | — |
| Any process change to this playbook | — |
| Any "we are deliberately not doing X" | — |
| Any time-box breach and its consequence | — |

**The deliberate-inaction rule.** Decisions *not* to act are the ones that vanish from
memory and get re-litigated annually. Log them with the same rigour.

### 4.6 Time-boxing and escalation

Every open decision carries a **decide-by date** at creation. Default time-boxes:

| Decision blast radius | Default time-box |
|---|---|
| Blocks a phase or ≥2 work items | 7 days |
| Blocks one work item | 14 days |
| Blocks nothing; improves clarity | 30 days |

**On breach:** at the next Monday Plan the decision **pre-empts all build work** until
resolved or explicitly re-timeboxed once (with reasoning logged). A decision that breaches
its time-box **twice** is auto-escalated to an S3 issue (§18) and the dependent work is
formally moved to Blocked with the reason recorded — a visible stall rather than a silent
one. The frozen program already carries this failure mode as risk R3.

---

## §5 — Business approval workflow

**Applies to:** scope, service truth, public-facing wording meaning, GBP content, review
responses, citation data, anything touching `PROJECT.md` §5 (canonical services) or §19.

### 5.1 Trigger — when Business approval is mandatory

Approval is required before implementation whenever a change would:

1. Alter what the business claims to offer, to whom, or where
2. Alter any public-facing claim about capability, availability, or outcome
3. Alter the canonical NAP or any citation-visible business datum
4. Publish anything with a named human, a photograph, or a customer's words
5. Commit the business to an ongoing operational obligation (response times, cadences)
6. Resolve any open `D`/`A`/`F` decision
7. Deviate from the frozen sequence

If in doubt, it triggers. The cost of an unnecessary approval is fifteen minutes; the cost
of an unapproved public claim in a care business is the business.

### 5.2 The workflow

```
1. FRAME     🔵  Write the decision as an OD/D entry (§4.4) — Context, Options,
                 including "do nothing". No decision yet. Set the time-box.
                     │
                     │  ≥1 calendar day  ⟵ the Separation Rule
                     ▼
2. TEST      🔵  Truth test (§5.3). Any FAIL kills the option outright —
                 it is not traded off, it is removed.
                     │
                     ▼
3. DECIDE    🔵  One sentence, active voice, in the log. Status → Decided.
                     │
                     ▼
4. RECORD    🔵  Append to DECISION_LOG.md. Update the owning document's status
                 line (BACKLOG.md for D/A/F IDs).
                     │
                     ▼
5. RELEASE   🔵  The dependent work item becomes eligible for Ready (§7).
```

### 5.3 The truth test — every option, every time

Any option answering "no" to any of these is **eliminated, not weighed**:

| # | Question | Source |
|---|---|---|
| 1 | Is it literally true, today, of this business? | `PROJECT.md` §5 Rule of Truth |
| 2 | Can it be evidenced if a family asks? | E-E-A-T |
| 3 | Is it one of the canonical seven services? | `PROJECT.md` §5, §19 |
| 4 | Would it survive being read aloud to a customer? | §11 calm-and-honest identity |
| 5 | Does it avoid every frozen-plan Appendix A anti-pattern? | Frozen plan |
| 6 | Does it avoid a guarantee, superlative, or medical claim? | Frozen spec + YMYL |
| 7 | If a person is named or shown, is written consent on file? | Consent ledger |

### 5.4 §19 visual approvals (the batched path)

Changes altering rendered appearance need explicit §19 sign-off with a **72-hour SLA**
(inherited from `IMPLEMENTATION_MASTER_PLAN.md`; the readiness report flags unallocated
approval time as warning W6). Because a solo operator's SLA is with themselves, it is
enforced structurally:

- **Batch per phase**, not per item — one approval session covering all visible changes.
- Each item is presented as a **before/after screenshot pair** filed in `evidence/`.
- The approval session is a **Tuesday Review Block**, wearing 🟠, ≥1 day after the build.
- **The 72h clock is scheduled, not hoped for**: on creating a §19 request, book the review
  slot immediately. An SLA with no calendar entry is a wish.
- Outcome recorded in `DECISION_LOG.md`: approved / approved-with-changes / refused, **with
  reasoning either way**. A refusal without recorded reasoning will be re-litigated.

### 5.5 The decision-starvation stop rule

If **three or more** decisions sit open past their time-box, **engineering work stops** at
the next Monday Plan and the entire week's capacity goes to deciding. Rationale: building
against unresolved truth produces work that must be redone, and redone work is how a solo
operator loses a quarter. This is the operational form of frozen risk R3.

---

## §6 — Engineering approval workflow

**Applies to:** every change to the repository that will reach production.

### 6.1 Principle

The solo reviewer's only real advantages over the builder are **time**, **a checklist**,
and **the diff**. The workflow maximises all three and deliberately minimises reliance on
recall, care, or discipline in the moment.

### 6.2 The workflow

| # | Stage | Hat | Requirement |
|---|---|---|---|
| 1 | **Branch** | 🟢 | Feature branch per `PROJECT.md` §17. Never on `main`. |
| 2 | **Build** | 🟢 | One item. Pushed at end of every block. |
| 3 | **Self-verify** | 🟢 | §9 quality checklist run; results written down, not remembered |
| 4 | **Preview deploy** | 🟢 | Netlify Deploy Preview built and opened. **Mandatory for C2/C3 (§10).** |
| 5 | **Evidence** | 🟢 | Captured per §13 before the session ends |
| 6 | **⏸ Gap** | — | **≥1 calendar day.** Non-negotiable. |
| 7 | **Cold diff read** | 🟠 | `git diff main...branch` read **in full**, line by line, before opening the site |
| 8 | **Checklist review** | 🟠 | §9 re-run independently against the preview — not trusting step 3 |
| 9 | **§19 check** | 🟠 | Visible change? → §5.4 approval must already be recorded |
| 10 | **Ship decision** | 🟠 | Approve / return / abandon — written in the Session Log |
| 11 | **Merge + deploy** | 🟢 | Per `RUNBOOK.md` §2, including `?v=` token and P0-4 checks |
| 12 | **Production verify** | 🟠 | `RUNBOOK.md` §2 post-deploy checklist on the live site |
| 13 | **Record** | 🔵 | §12 documentation updates; §8 satisfied; item CLOSED |

### 6.3 The cold diff read — why step 7 is separate

Reading the rendered page tells you whether it *looks* right. Reading the diff tells you
what you *actually changed* — including the accidental deletion, the stray debug line, the
committed secret, the unrelated file swept in. The builder cannot see these; they are
invisible to the person who wrote them hours ago. The reviewer, a day later, can.

**Mandatory diff questions, answered aloud or in writing:**

1. Is every changed file one I intended to change?
2. Is there anything here I cannot explain the purpose of?
3. Any secret, key, token, or credential? (`PROJECT.md` §19)
4. Any removed line that was doing real work? (§19 never remove working features)
5. Any URL or anchor changed? (§19 backwards compatibility)
6. Any non-canonical service name reintroduced? (§5 Rule of Truth)
7. Does the change stay inside its stated scope, with no opportunistic extras?

**Question 7 catches the most damage.** Scope creep in an unreviewed solo commit is how
frozen strategies get quietly amended by accident.

### 6.4 Return conditions (mandatory — not discretionary)

The Reviewer **must** return, not approve, when any of these hold:

- Any §9 check fails or is unrun
- Evidence missing for a C2/C3 change
- The diff contains anything unexplained
- A visible change lacks recorded §19 approval
- Scope exceeds the item's stated boundary
- The builder was you, today (the Separation Rule was breached)

**Breaching the Separation Rule for expedience is an S3 issue (§18) and is logged.** The
one exception is S1 incident response (§18.3), where speed is correctly prioritised — and
in that case a retrospective cold review is scheduled within 48 hours, not skipped.

---

## §7 — Definition of Ready

**Purpose:** the gate that prevents starting work that cannot be finished. In a solo
program, an unfinishable item does not merely stall — it consumes the only WIP slot,
carries a decaying branch, and erodes trust in the whole system.

### 7.1 Universal Ready criteria — all must be true

| # | Criterion | Verified against |
|---|---|---|
| R1 | The item maps to an **existing** ID in `BACKLOG.md` | `BACKLOG.md` |
| R2 | Every dependency is **closed**, not merely "in progress" | `BACKLOG.md` dependencies |
| R3 | Every gating decision is **Decided** and logged | `DECISION_LOG.md` |
| R4 | Acceptance criteria exist and are testable as written | `BACKLOG.md` task entry |
| R5 | Change class assigned (C0–C3) | §10 |
| R6 | Rollback path is known **before** starting | §11 |
| R7 | Evidence requirements known | §13 |
| R8 | It fits the honestly available capacity for the period | §2.4 |
| R9 | Required access/accounts exist and are reachable **now** | `RUNBOOK.md` §1 |
| R10 | It does not require a frozen-document amendment | §0.1 |

### 7.2 Additional Ready criteria by lane

**Engineering items also require:**

- The `PROJECT.md` §18 DoD is achievable for this item today — specifically, if the item
  requires analytics verification, the P3 event layer must exist. *(Per the frozen
  readiness report this layer is currently absent; items requiring it are **not Ready**.)*
- Files-affected list is known and bounded
- Regression risk is stated, and its verification method named
- If visible: the §19 approval path is identified and the review slot booked

**Business items also require:**

- The canonical NAP is frozen and available (per the frozen plan's Part 8.2)
- Any published human or photograph has written consent **on file already** — not
  "to be obtained" *(the frozen readiness report flags photos-before-consent as W5)*
- A named responder exists for anything creating an inbound channel *(readiness W8)*
- The truth test (§5.3) has been passed by the governing decision

**Decision items also require:**

- Options are enumerable and the decider has the information to choose
- A time-box is set (§4.6)
- The consequence of *not* deciding is written down

### 7.3 Not-Ready handling

An item failing Ready is **never** started "carefully." It is moved to **Blocked**, with:

1. The specific failing criterion (R-number)
2. The single action that would unblock it
3. Its owner and time-box

Then the next Ready item is selected. **Blocked items are not failures — undetected
blocked items are.** The Monday Plan reviews the blocked list every week; anything blocked
for three consecutive weeks is escalated to the Monthly Review as a program risk.

---

## §8 — Definition of Done

### 8.1 The constitutional baseline — not amended here

`PROJECT.md` §18 defines Done and **this playbook does not modify it.** Reproduced for
operational convenience only; §18 remains authoritative:

- ✅ Works on desktop
- ✅ Works on mobile
- ✅ Lighthouse checked
- ✅ Accessibility checked (keyboard, semantics, contrast, WCAG 2.2 AA)
- ✅ SEO checked (titles, headings, canonical, schema, internal links)
- ✅ Analytics verified (relevant events fire correctly)
- ✅ No regression
- ✅ Production reviewed

Plus each task's own Acceptance Criteria in `BACKLOG.md`.

### 8.2 The execution layer — what this playbook adds

§18 defines when work is *technically* complete. It does not define when work is
*operationally* complete — i.e. when it is safe to forget about it. An item is CLOSED only
when §18 is satisfied **and** every row below is true:

| # | Closure requirement | Artifact |
|---|---|---|
| C1 | Production verified post-deploy (not just "deploy succeeded") | `RUNBOOK.md` §2 checklist result |
| C2 | Evidence filed at the required level for its change class | `evidence/` (§13) |
| C3 | `BACKLOG.md` status line updated with commit + date | `BACKLOG.md` |
| C4 | `CHANGELOG.md` line added if anything shipped | `CHANGELOG.md` |
| C5 | `IMPLEMENTATION_PROGRESS.md` updated (sprint, phase, blockers) | Progress doc |
| C6 | Decisions taken during the work are logged | `DECISION_LOG.md` |
| C7 | Rollback anchor correct and verified pointing at the right commit | Git tag |
| C8 | Any new root doc has its forced-404 rule | `netlify.toml` |
| C9 | Any new public page has its uptime monitor | `MONITORING.md` |
| C10 | Observation window scheduled if the class requires one | §10.4 |

### 8.3 The two Done levels

| Level | Meaning | Applies to |
|---|---|---|
| **Done** | §18 + C1–C10 satisfied. Item closed. | Every item |
| **Certified** | Done **plus** a reference snapshot recorded for replication | Template-defining work only (per the frozen plan's certification step) |

**Certified** exists because the frozen program replicates one certified page template
across subsequent pages, and template drift across hand-built pages is a named risk (R4).
Certification is not extra polish; it is the artifact that makes the next replication
verifiable. What must be certified, and against what criteria, is governed by the frozen
spec and `BACKLOG.md` — not by this playbook.

### 8.4 Partial completion

`BACKLOG.md` already defines 🔶 **Partial** with enumerated done-slices. That convention
stands. A Partial item:

- Enumerates precisely what is done and what is not
- Must still be **shippable or fully reverted** — never left half-deployed
- Holds its WIP slot until resolved (it is not a way to start something else)
- Is reviewed at every Monday Plan until closed or reverted

---

## §9 — Quality checklist

Run twice: by 🟢 Builder at self-verify, and independently by 🟠 Reviewer ≥1 day later.
**Written results both times.** A remembered checklist is an unrun checklist.

### 9.1 Every change (no exceptions)

| # | Check | Pass condition |
|---|---|---|
| 1 | Scope | Only the intended files changed |
| 2 | Secrets | No key, token, password, or credential in the diff |
| 3 | Truth | No non-canonical service name anywhere in source or copy |
| 4 | Compatibility | No existing URL or anchor broken |
| 5 | Features | Nothing working was removed |
| 6 | Stack | No framework, no new dependency, no build step introduced |
| 7 | Desktop | Renders and functions |
| 8 | Mobile | Renders and functions at a real small viewport |
| 9 | Console | No new errors or warnings |
| 10 | Keyboard | Tab order intact; focus visible; Escape behaves |
| 11 | Lead path | Call, WhatsApp, and form still work end-to-end |
| 12 | Cache | `?v=` token bumped if CSS/JS changed (P0-3) |
| 13 | Docs | New root doc → forced-404 rule present (P0-4) |
| 14 | Rollback | Anchor identified and correct |

### 9.2 Additional — copy or content changes

| # | Check |
|---|---|
| 15 | Truth test (§5.3) passed and recorded |
| 16 | No guarantee, superlative, or unverifiable claim |
| 17 | No medical advice; scope stays within how care is arranged |
| 18 | Business approval recorded (§5) |
| 19 | Named humans / photographs have written consent on file |
| 20 | Terminology matches the canonical seven exactly |

### 9.3 Additional — technical SEO surface changes

Verification only — the *content* of these elements is governed by the frozen spec.

| # | Check |
|---|---|
| 21 | Title and meta description present, unique, correctly lengthed |
| 22 | Exactly one `<h1>`; heading hierarchy unbroken |
| 23 | Canonical tag present and self-referential unless deliberately otherwise |
| 24 | Structured data validates (Rich Results Test) with zero errors |
| 25 | `@id` references resolve; no orphan or duplicate entity |
| 26 | OG/Twitter tags present; preview renders |
| 27 | Sitemap includes the page; `lastmod` is a real date |
| 28 | `robots.txt` and meta robots permit indexing as intended |
| 29 | Internal links resolve; no 404s introduced |
| 30 | Breadcrumb markup matches the visible breadcrumb |

### 9.4 Additional — analytics changes

| # | Check |
|---|---|
| 31 | Event fires, verified live in GA4 DebugView — not inferred from code |
| 32 | Event name matches the defined taxonomy exactly |
| 33 | No duplicate firing on a single interaction |
| 34 | No PII in any parameter |
| 35 | Existing events still fire (regression) |

### 9.5 Additional — off-site changes (GBP, citations, directories)

| # | Check |
|---|---|
| 36 | NAP matches the frozen canonical NAP **character for character** |
| 37 | Business name is the exact legal/trading name, no keyword suffix |
| 38 | Categories/services use canonical names only |
| 39 | Before-state captured as evidence prior to editing (§13) |
| 40 | Change recorded in the off-site change register (§10.6) |
| 41 | No guideline-violating pattern (frozen Appendix A) |

### 9.6 Deploy checklist

Governed by `RUNBOOK.md` §2. Run every deploy without exception; a deploy that skipped it
is an S3 issue and its verification must be performed retroactively the same day.

---

## §10 — SEO change management process

### 10.1 Why SEO changes need their own class system

SEO changes differ from ordinary software changes in three ways that break normal
practice: **effects are delayed** (weeks, not seconds), **effects are unattributable when
batched** (three simultaneous changes produce one uninterpretable outcome), and **some are
practically irreversible** (a URL change propagates through an index you do not control).
The class system exists to match rigour, batching rules, and patience to blast radius.

### 10.2 Change classes

| Class | Definition | Examples (types, not instructions) | Reversible? |
|---|---|---|---|
| **C0** | No search-visible effect | Repo docs, comments, internal tooling | Trivially |
| **C1** | Visible to users, no index-structure effect | Copy refinement within approved meaning, styling | Yes, cheaply |
| **C2** | Alters how a page is understood or measured | Metadata, headings, schema, internal linking, analytics events | Yes, with a re-crawl delay |
| **C3** | Alters index structure or off-site entity data | URLs, canonicals, redirects, robots/sitemap directives, NAP, GBP identity fields, new indexable pages | **Slowly and imperfectly** |

### 10.3 Requirements by class

| Requirement | C0 | C1 | C2 | C3 |
|---|:--:|:--:|:--:|:--:|
| §9.1 core checklist | ✅ | ✅ | ✅ | ✅ |
| Business approval (§5) | — | If meaning changes | If meaning changes | **Always** |
| Cold review (§6) | ✅ | ✅ | ✅ | ✅ |
| Preview deploy before merge | — | Recommended | **Required** | **Required** |
| Evidence: before-state | — | — | **Required** | **Required** |
| Evidence: after-state | — | Recommended | **Required** | **Required** |
| Rollback rehearsed before shipping | — | — | Recommended | **Required** |
| Ships alone (no other SEO change) | — | — | **Required** | **Required** |
| Observation window before next change to the same surface | — | — | **14 days** | **28 days** |
| Logged in `DECISION_LOG.md` | — | — | Recommended | **Required** |

### 10.4 The observation window — the core discipline

> **One SEO signal change per surface at a time. Then wait. Then read.**

After shipping a C2 or C3 change, no further C2/C3 change touches the same surface (page,
template, or off-site profile) until the window closes. Rationale: overlapping changes make
the effect unattributable, and unattributable effects mean you learn nothing — you are
simply doing SEO with your eyes closed, permanently.

**Windows are logged with an explicit end date.** Check open windows at the Monday Plan.
C0/C1 work continues freely during a window; other surfaces continue freely.

**Legitimate override:** an S1/S2 issue (§18). Overriding is logged with reasoning, and the
observation window restarts from the fix.

### 10.5 Batching rules

| Batch this | Never batch this |
|---|---|
| Multiple C0 changes | Two C3 changes |
| Multiple C1 changes on one page | A C3 with any C2 |
| A C2 with unrelated C0s | Schema changes with URL changes |
| §19 visual approvals (§5.4) | Content-meaning changes with technical SEO changes |

**Reason:** when a batched deploy correlates with a ranking or traffic movement, an
unbatched deploy tells you *which* change did it. A batched one tells you nothing, and the
knowledge is unrecoverable after the fact.

### 10.6 The off-site change register

On-site changes are versioned by git. **Off-site changes have no version control** — GBP,
citations, and directory listings can be edited to any state with no history, sometimes by
third parties. They therefore need a manual register.

Maintained in `DECISION_LOG.md` under a dedicated `## Off-site change register` heading,
newest first:

```
| Date | Surface | Field | Before | After | Reason | Evidence |
|---|---|---|---|---|---|---|
| 2026-08-04 | GBP | Hours | [prior] | [new] | [reason] | evidence/2026-08/gbp-hours/ |
```

**Binding rule:** no off-site field is edited without capturing the before-state first
(§13.4). Without it there is no rollback — only guessing at what it used to say.

---

## §11 — Rollback strategy

### 11.1 Principle

> **Roll back first. Diagnose second. Never debug a broken production surface live.**

Inherited verbatim from `RUNBOOK.md` §2. The playbook extends it to the surfaces the SEO
program touches, which have very different reversal characteristics.

### 11.2 Rollback by surface

| Surface | Mechanism | Time to reverse | Completeness |
|---|---|---|---|
| **Site (deploy)** | Netlify → Deploys → previous good → *Publish deploy* | ~1 min | Total |
| **Repository** | `git revert` on a branch → review → merge | One session | Total |
| **Schema / metadata** | Site rollback, then wait for re-crawl | Deploy instant; index days–weeks | Total, delayed |
| **URLs / redirects** | Site rollback + restore prior redirect rules | Deploy instant; index weeks | **Partial** — external links and index memory persist |
| **Sitemap / robots** | Site rollback + resubmit | Hours–days | Near-total |
| **GA4 events** | Revert code; historical data **cannot** be rewritten | Instant forward | **Forward only** |
| **GBP fields** | Manual re-edit from the before-state | Minutes + re-approval | Total *if* the before-state was captured |
| **GBP suspension** | Reinstatement request | Days–weeks, uncertain | **Not guaranteed** |
| **Citations** | Manual re-edit, per platform | Days–weeks | Partial; some platforms never update |
| **Published review response** | Edit or delete | Minutes | Text reverts; **screenshots do not** |

### 11.3 The irreversibility ladder — respect it

```
  reversible ────────────────────────────────────────► irreversible
  deploy → code → schema → sitemap → URLs → citations → GBP identity → suspension
```

**Rule:** the further right a change sits, the more it needs — business approval, before-
state evidence, a rehearsed reversal, and a slept-on decision. C3 changes at the right end
of this ladder are the only changes in the program that can cause damage the program cannot
undo. Treat them accordingly, every time, even the tenth time.

### 11.4 Rollback decision tree

```
Something is wrong in production.
│
├─ Is the site down, or the lead path broken?
│  └─ YES → ROLL BACK NOW (Netlify one-click). Diagnose after. [S1]
│
├─ Is it a visible defect not affecting the lead path?
│  ├─ Fix known and ≤30 min?  → fix forward on a branch, normal review
│  └─ Otherwise               → roll back, then fix calmly [S2]
│
├─ Is it an SEO regression (indexing, schema errors, coverage)?
│  └─ Not an emergency. Do NOT panic-change.
│     Capture evidence → confirm it is real, not lag (§14.4) → then act. [S2/S3]
│
└─ Is it off-site (GBP / citation)?
   └─ Restore from the captured before-state. If none exists,
      log it as an incident and reconstruct from the frozen canonical NAP. [S2]
```

### 11.5 Rollback anchors

- A git tag marks the last known-good state of each shipped phase.
- **The anchor is verified at ship time, not assumed** — the frozen readiness report
  records `p1-truth-release` pointing at the wrong commit (informational item I2), which is
  precisely the failure this rule prevents. An anchor pointing at the wrong commit is worse
  than no anchor: it produces false confidence in a crisis.
- Anchor verification is closure requirement **C7** (§8.2).

### 11.6 The rollback drill

`RUNBOOK.md` prescribes a quarterly rollback drill (publish a previous deploy to a preview,
not production). **It is not optional and not skippable.** An unrehearsed rollback performed
for the first time during a real outage, by a stressed solo operator, is not a rollback
plan — it is a hope. Record each drill's date and outcome in `IMPLEMENTATION_PROGRESS.md`.

### 11.7 Post-rollback obligations

Every rollback, without exception:

1. `DECISION_LOG.md` entry — what, why, what state was restored
2. One-line postmortem in the Session Log: root cause · impact · fix · prevention
   *(the July-2026 form-incident precedent)*
3. The reverted item returns to **Blocked**, not Queued — it needs a new Ready assessment
4. If the failure passed the §9 checklist, **the checklist is defective**: add the missing
   check in the same week. A checklist that misses the same class of failure twice is a
   process failure, not bad luck.

---

## §12 — Documentation update rules

### 12.1 Principle

> **Documentation is updated in the same change that makes it stale. Never later.**

"Later" does not arrive for a solo operator. Every doc update deferred to a future session
is a doc update that will not happen, and the compound result is a repository that lies —
at which point the frozen strategy is no longer executable, because nobody can tell what
state it is in.

### 12.2 Which document changes when

| When this happens | Update this | Within |
|---|---|---|
| Anything ships to production | `CHANGELOG.md` | Same session |
| A task changes status | `BACKLOG.md` status line | Same session |
| A sprint, blocker, or risk moves | `IMPLEMENTATION_PROGRESS.md` | Friday Close |
| A decision is taken | `DECISION_LOG.md` | Same session |
| An incident occurs | Session Log postmortem line | Same day |
| A new account is created | `RUNBOOK.md` §1 inventory | Same session |
| A new public page ships | `MONITORING.md` + its monitor | Same session |
| A new root `.md` is added | `netlify.toml` forced-404 rule | **Before next deploy** |
| A deploy/rollback procedure changes | `RUNBOOK.md` | Same session |
| A process in this playbook changes | This file + `DECISION_LOG.md` | Same session |
| A frozen document is contradicted by reality | **Nothing is edited** → §20.5 amendment | Next Monthly Review |

### 12.3 Never-edit list

| Document | Rule |
|---|---|
| `LOCAL_SEO_MASTER_PLAN.md` | **FROZEN.** No edits. Amendment = new version via §20.5 |
| `IMPLEMENTATION_READINESS_REPORT.md` | **FROZEN.** A point-in-time audit; it does not get "updated" as blockers clear — blocker status lives in `IMPLEMENTATION_PROGRESS.md` |
| `SERVICE_PAGE_SPEC.md` | **FROZEN.** Template law |
| `PROJECT.md` | Constitutional. Change only by explicit approved amendment, never in passing |

**Common and costly mistake to avoid:** "updating" the frozen readiness report as blockers
clear. Do not. It is an audit dated 2026-07-20 and its value is precisely that it records
what was true then. Live blocker status belongs in `IMPLEMENTATION_PROGRESS.md`.

### 12.4 New-document rules

Any new repository-root document must, in the same change:

1. Receive a forced-404 rule in `netlify.toml` (P0-4 convention)
2. State its authority level relative to §0.1
3. Be listed in Appendix D of this playbook
4. Carry a "Last reviewed" line if it is operational

**This playbook and `DECISION_LOG.md` both require rule (1) before the next deploy.** The
frozen readiness report already records two uncovered root documents as blocker B5; adding
two more without rules would compound a live exposure.

### 12.5 Review cadence for living documents

| Document | Reviewed | Trigger |
|---|---|---|
| `IMPLEMENTATION_PROGRESS.md` | Weekly | Friday Close |
| `DECISION_LOG.md` | Monthly | Decision aging review |
| This playbook | Quarterly | §20 success review |
| `RUNBOOK.md` | Quarterly | Its own cadence |
| `MONITORING.md` | Quarterly | Its own cadence |
| `BACKLOG.md` | Monthly | Drift audit (§3.6) |

### 12.6 Writing rules for future-you

Every entry is written for a reader with **zero memory of the context**, because within six
months that reader is you.

- Name things by their IDs, never "that thing we discussed"
- Record the *reasoning*, not just the outcome — the outcome without the reasoning gets
  re-litigated; with the reasoning it gets respected
- Record what was **rejected** and why
- Date everything; use ISO `YYYY-MM-DD` exclusively
- No pronouns without antecedents; no relative time references ("last week", "recently")

---

## §13 — Evidence collection process

### 13.1 Principle

> **Evidence is captured at the moment of the change. Evidence reconstructed later is not
> evidence — it is recollection.**

Evidence exists for four reasons, in order of long-run value: proving Done honestly;
enabling rollback (you cannot restore a state you did not record); enabling attribution
(what did this change actually do?); and surviving operator memory decay across years.

### 13.2 Directory structure

```
evidence/
├── 2026-07/
│   ├── E6-T1-ga4-taxonomy/
│   │   ├── before-console.png
│   │   ├── after-debugview.png
│   │   ├── checklist.md
│   │   └── notes.md
│   └── A-8-gbp-creation/
│       ├── before-search-serp.png
│       ├── after-profile.png
│       └── notes.md
├── 2026-08/
└── baselines/
    ├── 2026-07-21-gsc-baseline.png
    └── 2026-07-21-nap-canonical.md
```

**Conventions:** one folder per item, named `{ID}-{slug}`; month folders `YYYY-MM`;
`baselines/` holds point-in-time program-level snapshots that are never overwritten.

`evidence/` is repository-only and must be excluded from publishing alongside the root
documents (P0-4 convention). Keep binary volume sane — screenshots, not videos.

### 13.3 What to capture by change class

| Class | Before | After | Retention |
|---|---|---|---|
| **C0** | — | — | — |
| **C1** | Screenshot if visible | Screenshot | 12 months |
| **C2** | **Required** — state of the surface + relevant validator output | **Required** — same views, post-change | **Permanent** |
| **C3** | **Required** — full state, every field, plus validator/tool output | **Required** — full state + verification | **Permanent** |

### 13.4 The off-site before-state rule (critical)

Before editing **any** off-site surface — GBP field, citation, directory listing — capture
the current state first. Screenshot the whole record, not just the field being changed.

**Why it is non-negotiable:** these platforms have no version history, no undo, and
sometimes no support path. The before-state screenshot **is** the rollback plan (§11.2).
Without it, a mistaken GBP edit can only be reversed by guessing what it used to say — and
inconsistent NAP data actively damages local ranking, per the frozen plan's own reasoning.

### 13.5 The five verification layers

The P1 precedent established recording verification at five layers. Applied to any C2/C3
change, the layers are:

| Layer | Question | Artifact |
|---|---|---|
| 1 · Source | Is it correct in the repository? | Diff / commit |
| 2 · Build | Did it deploy? | Deploy log |
| 3 · Rendered | Does it appear correctly to a browser? | Screenshot |
| 4 · Machine | Do validators/tools agree? | Validator output |
| 5 · Behavioural | Does the user-facing behaviour actually work? | Test result |

Layers 3–5 are the ones skipped under time pressure, and they are the ones that catch real
failures. Layers 1–2 only prove you changed something, never that it works.

### 13.6 Baselines

Capture a program-level baseline: **now** (before further change), at each phase boundary,
and at each quarterly success review. Baselines make "did this help?" answerable years
later, when the alternative is arguing with your own memory.

### 13.7 Evidence hygiene

- Capture during the work session, never after
- No PII in evidence — redact customer names, numbers, and addresses before filing
- Filenames describe content, not `screenshot-1.png`
- A `notes.md` per folder: what was changed, why, what to look for later
- Filed at Friday Close at the latest (§2.8 step 2)

---

## §14 — Search Console review cadence

> **Scope note.** This section defines *when to look, what to look at, and what constitutes
> a signal.* What the data means for strategy is governed by the frozen plan. Search Console
> review produces **observations and issues** — never spontaneous strategy changes.

### 14.1 Prerequisite

Per the frozen readiness report, Search Console is **not verified** (blocker B2). Until
verification completes and data accrues, this cadence runs in a reduced form: §14.2 checks
apply from day one of verification; §14.3 and §14.4 only become meaningful after the data
windows in §3.3 are met. **Record "insufficient data" rather than inventing a reading.**

### 14.2 Weekly — 5 minutes, inside the Monday Ops Check

Health only. Not performance. Resist opening the performance report; weekly performance
data at this volume is noise, and reacting to it is the fastest route to abandoning a
frozen strategy for no reason.

| # | Check | Escalate if |
|---|---|---|
| 1 | Manual actions | **Any** → S1 (§18) |
| 2 | Security issues | **Any** → S1 |
| 3 | Coverage/indexing errors — new spike | New errors on key pages → S2 |
| 4 | Sitemap status | Read failure or parse error → S3 |

### 14.3 Monthly — 30 minutes, inside the Monthly Review

Record the frozen Part 10.4 metrics for the last complete month. Record first, interpret
second (§3.3).

| # | Report | Record |
|---|---|---|
| 1 | Performance — 28-day window | Impressions, clicks, average position |
| 2 | Performance — query view | Positions for the frozen plan's primary terms only. **Do not go term-hunting; do not add terms to any list.** Observation, not research. |
| 3 | Performance — page view | Which pages receive impressions |
| 4 | Branded vs non-branded | Branded search volume trend |
| 5 | Coverage | Indexed count vs expected count |
| 6 | Enhancements | Structured-data errors/warnings |
| 7 | Core Web Vitals | Status by URL group |

**Also file:** screenshots into `evidence/YYYY-MM/gsc-monthly/`. The data window in Search
Console is finite; screenshots outlive it.

### 14.4 Quarterly — 60 minutes, inside the success review

| # | Analysis |
|---|---|
| 1 | 90-day trend for each Part 10.4 metric vs the previous 90 days |
| 2 | Query-position movement over a statistically meaningful window |
| 3 | Page-level performance comparison across shipped pages |
| 4 | Indexing completeness vs intended architecture |
| 5 | Structured-data error trend |
| 6 | Findings written up per §20 — **as findings, never as unilateral strategy changes** |

### 14.5 Anti-panic rules (binding)

1. **Never act on a single week of data.** Ever.
2. **Position fluctuation within ±3 positions is noise** at this volume — no action.
3. **A drop is confirmed only if** it persists ≥14 days **and** appears in more than one
   report. Otherwise it is lag, sampling, or a Google-side fluctuation.
4. **Never make a C2/C3 change in reaction to data inside an open observation window**
   (§10.4) — you would be reacting to an effect you have not finished measuring.
5. **Google-side volatility is not your regression.** Before diagnosing your own site,
   check whether the movement is broad. If it is, the correct action is to wait.
6. **When data contradicts the frozen strategy**, the output is an **amendment proposal**
   (§20.5) reviewed at a quarterly boundary — never an in-flight pivot.

---

## §15 — Google Business Profile maintenance cadence

> **Scope note.** *What* belongs on the profile is governed by the frozen plan's local SEO
> section. This section governs **when it is checked, by whom, with what response, and how
> changes are recorded.**

### 15.1 Prerequisite and standing conditions

Per the frozen readiness report the profile does not yet exist and verification latency is
uncontrolled (blocker B3), with **no fallback path defined**. Two operational obligations
follow, both owned by 🔵 Operator:

- **Start the verification clock at the earliest legal moment.** It is the longest external
  lead time in the program and nothing else compresses it.
- **A contingency decision must be logged (§4) *before* verification fails**, not after —
  specifying what the program does if verification fails or stalls beyond a stated date.
  Deciding under pressure, with a stalled program, produces bad decisions.

Additionally, per readiness warning W8: **a named human responder** must exist before any
inbound channel (messaging, Q&A) is enabled. If nobody can respond within the SLA, the
channel stays off — an unanswered channel is worse than an absent one.

### 15.2 Weekly — 3 minutes, inside the Monday Ops Check

| # | Check | Escalate if |
|---|---|---|
| 1 | Profile live and not suspended | Suspended → **S1** |
| 2 | No Google-applied or third-party edits to name, address, phone, category | Any unapproved edit → **S1** |
| 3 | New reviews | → §16 |
| 4 | New Q&A submissions | → §16.6 |
| 5 | Unanswered messages (if messaging is on) | Any → S2 |

**Suspension is S1** because it removes local-pack presence entirely and reinstatement is
slow, uncertain, and outside your control (§11.2).

### 15.3 Monthly — 20 minutes, inside the Business Block

| # | Task |
|---|---|
| 1 | **NAP integrity audit** — every field compared character-for-character against the frozen canonical NAP |
| 2 | Hours accurate, including any upcoming special hours |
| 3 | Services listed use canonical names exactly; nothing has drifted or been auto-added |
| 4 | Description unchanged from the approved text |
| 5 | Photos still present (platforms silently remove); consent still on file for every identifiable person |
| 6 | Insights recorded for the Monthly Review: calls, messages, direction requests |
| 7 | Post cadence slot honoured (§15.5) |
| 8 | Any change made → off-site change register (§10.6) + before-state evidence (§13.4) |

### 15.4 Quarterly — 45 minutes

| # | Task |
|---|---|
| 1 | Full profile audit against the frozen local SEO section, field by field |
| 2 | Citation consistency spot-check against the canonical NAP |
| 3 | Photo set reviewed for accuracy and consent currency |
| 4 | Q&A reviewed — outdated or incorrect answers corrected |
| 5 | Insights trend over 90 days recorded for §20 |
| 6 | Full-profile screenshot filed to `evidence/baselines/` |

### 15.5 Post cadence — an operational decision to be recorded

The frozen plan establishes that a posting cadence exists and prioritises **consistency
over volume**; it does not state a frequency, and the readiness report flags this as
under-specified (Q5). Frequency is an execution parameter, so it is set here — as a
decision to record, not a content plan.

**Default:** one slot per calendar month, in the Business Block of the first full week.

**Rules governing the slot:**

1. The slot is a **commitment to consistency, not to volume.** A sustained monthly cadence
   outperforms an enthusiastic weekly cadence abandoned in month three.
2. **Nothing is posted merely to fill the slot.** If there is nothing genuinely true and
   useful to say, the slot is recorded as *"no post — nothing true to say this month."*
   That is a successful outcome, not a missed one. `PROJECT.md` §19 forbids content added
   solely for SEO, and that rule does not stop at the site boundary.
3. Post subject matter is governed by the frozen plan. This playbook contributes nothing.
4. Every post passes the truth test (§5.3) before publishing.
5. **Confirm or amend this cadence as `OD-nnn`** at playbook activation (Appendix E), so
   the frequency is a recorded decision with reasoning rather than an inherited default.

### 15.6 GBP change control

GBP is a **C3 surface** (§10.2) for identity fields — name, address, phone, primary
category, URL. Therefore, for those fields, always:

- Business approval (§5)
- Before-state evidence (§13.4)
- Off-site change register entry (§10.6)
- 28-day observation window before the next identity change

Non-identity updates (hours, photos, posts, Q&A answers) are **C1** and need only the
register entry plus before-state evidence.

---

## §16 — Review management workflow

> **Scope note.** Review *strategy* — how requests are framed, when in the engagement they
> occur, what the flywheel is — is governed by the frozen plan. This section governs the
> operational loop: capture, respond, record, escalate.

### 16.1 Standing prohibitions (absolute)

From the frozen plan's anti-patterns and Google's policies. These are not guidelines and
they are never traded off against growth:

- 🚫 Never buy reviews
- 🚫 Never incentivise reviews — no discount, gift, or consideration of any kind
- 🚫 Never gate review requests by expected sentiment (asking only happy customers)
- 🚫 Never write, draft, or edit a review on a customer's behalf
- 🚫 Never bulk-request in a burst — unnatural velocity is a detectable, penalised pattern
- 🚫 Never publish a customer's words or photo without written consent

**These are existential, not tactical.** The business sells trust to families making
vulnerable decisions. A review-manipulation finding does not cost rankings; it costs the
proposition.

### 16.2 The request loop

Requesting is embedded in the engagement lifecycle per the frozen plan. Operationally:

| Stage | Action | Owner | Rule |
|---|---|---|---|
| 1 · Trigger | Engagement reaches its defined completion point | 🔵 | The trigger is defined once and applied uniformly — never selectively by expected sentiment |
| 2 · Consent | Consent step per the frozen process | 🔵 | No consent → no request. Recorded in the consent ledger |
| 3 · Request | Direct review link, per the frozen script | 🔵 | Same script every time. Ad-hoc phrasing is how gating creeps in |
| 4 · Record | Logged: date, service, requested/declined | 🔵 | Enables velocity measurement (a Part 10.4 metric) |
| 5 · No follow-up | One request per engagement. No chasing | 🔵 | Pressuring families in a care context is both wrong and self-defeating |

### 16.3 Response SLA

Every review gets a response. Every one, including 5-star. The response is public and
permanent, and it is read by future customers far more often than by the reviewer.

| Rating | Respond within | Hat |
|---|---|---|
| 1–2 star | **24 hours** | 🔵 |
| 3 star | 48 hours | 🔵 |
| 4–5 star | 7 days | 🔵 |

Response drafting sits at the **top** of the Wednesday Business Block (§2.7). A 1–2 star
review arriving outside that slot is handled the same day — it does not wait for Wednesday.

### 16.4 Negative review protocol

The highest-stakes routine action in the program. A single badly handled public response
can outweigh a quarter of SEO work.

```
1. STOP.       Do not respond immediately. No same-hour responses. Ever.
2. CAPTURE.    Screenshot to evidence/ before anything changes.
3. VERIFY.     Is it a real customer? Is the account of events accurate?
                 Check the lead log and engagement records.
4. CLASSIFY.
   ├─ Accurate complaint      → acknowledge · take it offline · fix the operation
   ├─ Partly accurate         → acknowledge the true part specifically; correct
   │                            the record calmly, without argument
   ├─ Inaccurate              → respond factually, briefly, without defensiveness
   └─ Fake / policy-violating → report to Google. Still respond publicly, neutrally,
                                because removal is uncertain and slow
5. DRAFT.      Written, then left alone for at least a few hours.
6. TEST.       §16.5 response test.
7. PUBLISH.    Within the SLA.
8. RECORD.     DECISION_LOG.md if it changed anything operationally.
9. LEARN.      Recurring theme? → it is an operational issue (§18), not a PR issue.
```

**Never in a response:** legal threats; the customer's private details, medical information,
or engagement specifics; argument; blame; sarcasm; a demand to remove the review.

### 16.5 Response test — all must pass

| # | Question |
|---|---|
| 1 | Would this read well to a prospective customer six months from now? |
| 2 | Does it disclose zero private, medical, or identifying detail? |
| 3 | Is it calm, brief, and non-defensive? |
| 4 | Does it contain nothing untrue? |
| 5 | Does it match the §11 brand identity — quiet, honest, unarguing? |
| 6 | Would the founder be comfortable if it were screenshotted and shared? |

Question 6 is decisive. Assume every response is permanent and public, because it is.

### 16.6 Q&A handling

Same discipline as reviews: monitored weekly (§15.2), answered within 7 days, truth-tested
before publishing. Anyone can answer a public question about the business — including
incorrectly. **An unmonitored Q&A section is a channel for someone else to define the
business.** Incorrect third-party answers are reported and corrected with an authoritative
answer.

### 16.7 Metrics recorded (Part 10.4 — not redefined here)

Recorded monthly: **review count** and **review velocity** (new reviews per month). Velocity
matters more than count because it compounds; a stalled velocity is an early warning that
the request loop has quietly stopped running — the single most common decay in solo
operations.

---

## §17 — Content publishing workflow

> **Scope note.** This section defines the *pipeline* any page or copy passes through. It
> suggests no content, proposes no pages, and defines no topics. What gets published, and
> in what order, is governed by the frozen plan, `SERVICE_PAGE_SPEC.md`, and `BACKLOG.md`.

### 17.1 Standing gates — nothing publishes while any of these is open

| Gate | Condition |
|---|---|
| G1 | All `BACKLOG.md` dependencies for the item are closed |
| G2 | Every gating business decision is Decided and logged |
| G3 | The item passes §7 Definition of Ready |
| G4 | The governing frozen spec requirements are known and achievable |
| G5 | Any required consent is on file **before** build, not promised |
| G6 | Analytics verification is possible (the event layer exists) |
| G7 | No open observation window on the same surface (§10.4) |

**A page that publishes with an open gate cannot be certified**, and an uncertified page
becomes the drift source for every page copied from it (risk R4).

### 17.2 The pipeline

| # | Stage | Hat | Output |
|---|---|---|---|
| 1 | **Authorise** | 🔵 | Item confirmed against `BACKLOG.md`; gates G1–G7 verified |
| 2 | **Truth-fix** | 🔵 | Every factual claim the page will make is confirmed true and evidenced. **Before drafting** — writing first and verifying later inverts the incentive |
| 3 | **Draft** | 🔵 | Copy written to the frozen spec |
| 4 | **Truth test** | 🔵 | §5.3, claim by claim, not paragraph by paragraph |
| 5 | **Approve copy** | 🔵→🟠 | Recorded approval; ≥1 day after drafting |
| 6 | **Build** | 🟢 | Implemented to the certified template |
| 7 | **Template diff** | 🟢 | Structural diff against the certified reference — the R4 drift control |
| 8 | **Self-verify** | 🟢 | §9.1 + §9.2 + §9.3 + §9.4; written results |
| 9 | **Preview** | 🟢 | Deploy Preview; full checklist re-run against it |
| 10 | **Evidence** | 🟢 | §13 at C2/C3 level |
| 11 | **⏸ Gap** | — | ≥1 calendar day |
| 12 | **Cold review** | 🟠 | §6.2 steps 7–10 |
| 13 | **Ship** | 🟢 | Merge, deploy, `RUNBOOK.md` §2 |
| 14 | **Production verify** | 🟠 | Live checks including schema validation on the live URL |
| 15 | **Wire-up** | 🟢 | Sitemap, internal links, monitor — per the frozen spec and `BACKLOG.md` |
| 16 | **Record** | 🔵 | §8 C1–C10 |
| 17 | **Observe** | — | Observation window opens (§10.4); no further C2/C3 on this surface |

### 17.3 The template diff control (step 7)

Every page built after the certified reference is structurally diffed against it before
review. Non-content divergence must be **deliberate and explained in writing**, or removed.
This is the operational answer to frozen risk R4 (template drift across hand-built pages),
and it is mechanical rather than judgment-based precisely so it survives the fifth page,
built tired, months later.

### 17.4 Publishing freeze conditions

No publishing while any of these hold:

- An S1 issue is open (§18)
- The gating decision for the content is open
- Search Console shows an unresolved manual action
- An observation window is open on the same surface
- Consent for any named person or photograph is missing

### 17.5 Post-publication obligations

| When | Action |
|---|---|
| Same day | Verify live rendering, schema, canonical, internal links |
| Same day | Confirm the page is in the sitemap; request indexing |
| +7 days | Confirm indexed in Search Console; **no other action** |
| +28 days | First performance observation (§14.3) — record only |
| +90 days | Include in the quarterly review (§20) |

**Between +7 and +28 days, do nothing to the page.** The urge to tinker is strong and
uniformly counterproductive: it destroys attribution and teaches you nothing.

---

## §18 — Issue severity classification

### 18.1 Purpose

A single scale for everything that can go wrong — site, SEO, off-site, process — so that
response is proportionate and automatic rather than emotional. Solo operators fail in both
directions: panicking over noise, and normalising real breakage.

### 18.2 The scale

| Sev | Name | Definition | Respond within | Action |
|---|---|---|---|---|
| **S1** | **Critical** | Business is losing leads **now**, or a permanent/hard-to-reverse loss is in progress | **Immediately**, drop everything | Roll back or mitigate first; diagnose after |
| **S2** | **High** | Material damage to visibility, trust, or conversion; not immediately fatal | **24 hours** | Next available block; may pre-empt planned work |
| **S3** | **Medium** | Real defect or process failure; no immediate business impact | **7 days** | Scheduled into the week normally |
| **S4** | **Low** | Cosmetic, minor, or informational | **Next review cycle** | Backlog; may be deliberately never fixed |

### 18.3 Classification examples

| Situation | Sev | Why |
|---|---|---|
| Site down / homepage blank | **S1** | No leads possible |
| Inquiry form broken or not delivering | **S1** | Silent lead loss — the July-2026 precedent |
| Missing Monday synthetic test email | **S1** | Lead pipeline unproven; assume broken |
| Call or WhatsApp link broken | **S1** | Primary conversion path |
| Google manual action | **S1** | Visibility loss; slow to reverse |
| GBP suspended | **S1** | Local pack lost; reinstatement uncertain |
| Site security issue / unexplained deploy | **S1** | Trust and control compromised |
| Untrue claim published | **S1** | Rule of Truth; trust business; ethical |
| Named person or photo published without consent | **S1** | Ethical and legal exposure |
| Key page deindexed | **S2** | Visibility loss, recoverable |
| Structured data errors on a live page | **S2** | Degrades understanding |
| Broken internal links / 404s on live pages | **S2** | UX and crawl damage |
| NAP inconsistency discovered in a citation | **S2** | Actively damages local ranking |
| 1–2 star review unanswered past 24h | **S2** | Public trust damage compounding |
| Analytics events not firing | **S2** | Measurement blind; decisions become guesses |
| Core Web Vitals fail on a key page | **S3** | Real, gradual |
| Non-canonical service name found in copy | **S3** | Truth drift — escalates to S1 if it is a public claim |
| Documentation drift found in audit | **S3** | Erodes multi-year executability |
| WIP limit exceeded / Separation Rule breached | **S3** | Process integrity — the system protecting everything else |
| Decision past time-box twice | **S3** | Program stall |
| Rank fluctuation within noise | **S4** | Not an issue. Do not treat as one |
| Cosmetic inconsistency | **S4** | Backlog |

### 18.4 Response protocol by severity

**S1:** stop all other work → mitigate or roll back (§11) → verify the fix → log in the
Session Log with a postmortem line the same day → schedule a cold retrospective review
within 48h if the Separation Rule was bypassed → add the missing §9 check if the checklist
failed to catch it.

**S2:** log immediately → schedule into the next available block → normal workflow (§1),
no shortcuts → record resolution.

**S3:** log → schedule at the Monday Plan → normal workflow.

**S4:** log → address opportunistically or accept permanently. **Deliberately choosing
never to fix an S4 is a legitimate, logged decision** — an S4 list that only grows is
normal and healthy.

### 18.5 The two failure modes to guard against

| Failure | Symptom | Control |
|---|---|---|
| **Over-reacting** | Treating rank noise as S2; emergency changes to a working system | §14.5 anti-panic rules; the observation window |
| **Under-reacting** | Normalising a recurring amber; "I'll look at it next week" for a month | Weekly Ops Check is a written record — three consecutive ambers auto-escalate one severity level |

---

## §19 — Risk management

### 19.1 Inherited registers — carried, not redesigned

Three registers already exist and remain authoritative:

| Register | Source | Contents |
|---|---|---|
| Program risks **R1–R7** | `IMPLEMENTATION_MASTER_PLAN.md` | Cache, CSP, D4/D5 stall, template drift, form regression, §19 bottleneck, single maintainer |
| Blockers **B1–B5** | Frozen readiness report | Taxonomy, Search Console, GBP, P1 closure, publish blocklist |
| Warnings **W1–W11** | Frozen readiness report | Overload, measurement, FAQ expectation, dependency scope, consent, approvals, lead log, ownership, gating, checkpoints, capacity |

**This playbook adds no new risk *analysis*.** It adds the *machinery* for reviewing them:
states, tripwires, cadence, and ownership.

### 19.2 Risk states

| State | Meaning | Review |
|---|---|---|
| **Open** | Live, mitigation in place | Monthly |
| **Tripped** | The tripwire fired; mitigation is being executed | Weekly until closed |
| **Closed** | No longer possible or no longer material | Recorded with the date and reason |
| **Accepted** | Real, unmitigated, deliberately tolerated | Quarterly; **requires a logged decision** |

**"Accepted" must be explicit and logged.** Unlogged acceptance is just forgetting, and the
difference matters when the risk materialises a year later.

### 19.3 Tripwires — the core mechanism

A risk without a tripwire is a worry. Every Open risk carries a **specific, observable
condition** that converts it from monitored to acted-upon, checked at a stated cadence.

| Tripwire form | Example shape |
|---|---|
| **Time-based** | "Decision X unresolved by DATE" |
| **Threshold-based** | "Metric below N for two consecutive months" |
| **Event-based** | "Verification fails" · "Third consecutive amber Ops Check" |
| **Absence-based** | "No Friday Close completed for 2 consecutive weeks" |

Absence-based tripwires matter most for a solo operator: the dangerous failures are things
that **stop happening**, and nothing alerts you to an absence unless you have decided in
advance what absence looks like.

### 19.4 Solo-operator risks and their controls

These are execution-system risks — the ones this playbook exists to manage. They are
operational, not strategic, and they are the likeliest cause of a frozen strategy failing.

| Risk | Why it is the real threat | Control | Tripwire |
|---|---|---|---|
| **Cadence decay** | The rhythm quietly stops; nobody notices because nobody is watching | Weekly Ops Check is written; absence is visible | 2 consecutive missed Friday Closes |
| **Recording debt** | Work ships unrecorded; the repository stops describing reality | §8 C1–C10 gate closure | Any item shipped but not closed within 7 days |
| **Approval collapse** | Separation Rule bypassed "just this once", then always | §6.4 mandatory returns; breach is S3 and logged | Any same-day build+approve |
| **Scope drift** | Small unlogged additions accumulate into an unrecognisable program | §1.3 no new IDs; §6.3 question 7 | Any work item without an existing ID |
| **Strategy drift** | Frozen plan amended by a hundred small in-flight decisions | §0.1 freeze rule; §20.5 amendment path | Any C2/C3 not traceable to a frozen item |
| **Measurement impatience** | Reacting to noise; destroying attribution; abandoning a working strategy | §14.5; §10.4 observation windows | Any C2/C3 shipped inside an open window |
| **Operator absence** | Illness, business demands, life — for weeks | Branches pushed daily; runbook; escrow (`RUNBOOK.md` §4) | 14 days without a session |
| **Motivation decay** | SEO results lag effort by months; enthusiasm does not | Appendix C minimum viable week; §20 makes progress visible | 2 consecutive minimum-viable weeks |
| **Context loss** | Returning after a gap and not knowing where anything stands | §12.6 write-for-future-you; Appendix A | Any session starting with "where was I?" |

### 19.5 Review cadence

| Cadence | Action |
|---|---|
| **Weekly** | Ops Check tests the fast-moving tripwires implicitly |
| **Monthly** | Full register: states, tripwires checked, new risks, closures (§3.2 item 5) |
| **Quarterly** | Deep review inside §20: are the mitigations actually working? |
| **Event** | Any S1/S2 triggers immediate review of the related risk |

### 19.6 New risks

Recorded in `IMPLEMENTATION_PROGRESS.md` Current Risks with: description, category,
likelihood, impact, mitigation, tripwire, owner, state. **Every new risk needs a tripwire
at creation** — a risk logged without one will be read at every monthly review and acted on
at none of them.

---

## §20 — Success review process

### 20.1 Cadence

| Review | When | Duration | Purpose |
|---|---|---|---|
| **Day-90** | End of the frozen 90-day roadmap | 3 hours | First honest verdict; re-sequence the next 90 |
| **Quarterly** | Every 90 days thereafter, indefinitely | 2 hours | Steady-state assessment |
| **Annual** | Every 4th quarterly | +2 hours | Strategy validity; playbook overhaul |

### 20.2 Measurement discipline

Success is measured **only** against the frozen plan's Part 10.4 metrics. This playbook
neither adds, removes, reweights, nor reinterprets them, and explicitly inherits the frozen
plan's rejection of total sessions as a success metric.

Two standing rules:

1. **A metric with no data source is reported as unmeasurable, not estimated.** Per the
   frozen readiness report (W7), some Part 10.4 metrics currently lack a source. "Not yet
   measurable — [blocker]" is the correct, honest entry. Substituting a proxy is how
   measurement systems become fiction.
2. **Record, then interpret, then decide** — three separate steps, in that order, never
   collapsed (§3.3).

### 20.3 Review agenda

| # | Item | Min | Output |
|---|---|---|---|
| 1 | **Delivery** — what actually shipped vs the frozen plan for the period | 20 | Variance, with causes |
| 2 | **Metrics** — Part 10.4, recorded, with windows and sources | 30 | Numbers only |
| 3 | **Interpretation** — Moved / Flat / Too early per metric | 25 | Written read |
| 4 | **Process health** — §20.4 | 20 | Process findings |
| 5 | **Risk review** — full register, mitigations tested | 20 | Register updated |
| 6 | **Decisions** — aged, breached, pending | 10 | Forced or escalated |
| 7 | **Amendment candidates** — §20.5 | 15 | Proposals, or explicitly none |
| 8 | **Next-period sequencing** — from the frozen roadmap | 20 | Next 13 weeks pre-loaded |

### 20.4 Process health — grade the system, not just the results

The distinguishing question of a multi-year program: *is the execution system itself still
running?* Results lag by quarters; process health is observable immediately, and it is the
leading indicator of whether results will ever arrive.

| Metric | Target | Source |
|---|---|---|
| Ops Checks completed | 12/13 weeks | Session Log |
| Friday Closes completed | 11/13 weeks | Session Log |
| Items closed with full §8 C1–C10 | 100% | `BACKLOG.md` vs `evidence/` |
| Separation Rule breaches | 0 | `DECISION_LOG.md` |
| Decisions resolved within time-box | ≥80% | `DECISION_LOG.md` |
| Observation windows respected | 100% | Change register |
| Evidence completeness for C2/C3 | 100% | `evidence/` |
| Rollback drill performed | 1 per quarter | Progress doc |
| Documentation drift found | Trending down | Monthly audits |

**A quarter with weak results but strong process health is a healthy quarter** — SEO lags,
and the system is compounding. **A quarter with strong results but collapsed process health
is a warning**, because the results are not attributable and the system will not survive
the next busy month.

### 20.5 The amendment path — the only legal route to strategy change

The frozen documents can be amended. They cannot be drifted.

```
1. TRIGGER    Evidence over ≥1 full review period contradicts a frozen element.
              Not a hunch. Not one bad month. Not impatience.
                  │
2. PROPOSE    Written amendment proposal:
              · Which frozen element, quoted exactly
              · What evidence contradicts it, with data windows and sources
              · What alternative is proposed
              · What the alternative costs and risks
              · What happens if nothing changes
                  │
3. COOL       ≥7 days. No exceptions. Frozen documents are not amended
              in the emotional aftermath of a disappointing review.
                  │
4. DECIDE     🔵 Business decision (§5), logged as an OD entry, with full reasoning.
                  │
5. APPLY      A NEW VERSION of the frozen document (v1.1, v2.0…).
              The original is never edited. Both remain in the repository.
              CHANGELOG.md records the amendment.
                  │
6. CASCADE    BACKLOG.md, dependent items, and this playbook updated to match.
```

**Amendments are expected and healthy over a multi-year program.** A strategy that never
amends in three years was not being tested against reality. What is fatal is not amendment
— it is *undocumented* amendment, where nobody can say what the strategy is anymore.

### 20.6 Review output

Appended to `IMPLEMENTATION_PROGRESS.md`:

```
## Success Review — [Day-90 | Q_ YYYY]

Period: YYYY-MM-DD → YYYY-MM-DD
Delivered vs planned: [variance + causes]
Metrics: [Part 10.4, each with value · window · source · verdict]
Read: [written interpretation]
Process health: [table from §20.4]
Risks: [changes]
Amendment proposals: [IDs, or "none"]
Next period: [13 weeks sequenced from the frozen roadmap]
Baseline evidence: evidence/baselines/YYYY-MM-DD-*
```

### 20.7 After Day 90 — the steady state

The frozen plan's roadmap covers 90 days. Beyond it, the program does not end and does not
need a new strategy — it enters **steady state**, and the playbook is what makes that
possible:

- The weekly rhythm (§2) continues **unchanged, indefinitely**
- Work continues from `BACKLOG.md` in its dependency-aware order
- The frozen plan's explicitly deferred items unlock **only** by their stated criteria —
  never by impatience, and never by a good quarter
- Quarterly reviews replace the Day-90 review as the re-sequencing moment
- New work enters only through the amendment path (§20.5) or existing backlog IDs

**Steady state is the goal, not a fallback.** A local SEO program in a single city for a
trust-based service business compounds over years through consistency: reviews accumulate,
the entity strengthens, citations age, pages mature. The mechanism that produces that
outcome is not insight. It is a Monday check and a Friday close, performed two hundred
times.

---

## Appendix A — Cold-start / re-entry protocol

**Use when:** returning after ≥14 days away, or whenever a session would otherwise begin
with *"where was I?"*

**Do not open the code first.** Rebuild context in this exact order, ~20 minutes:

| # | Read | Answers |
|---|---|---|
| 1 | `IMPLEMENTATION_PROGRESS.md` — Executive Status, Current Blockers, Next Actions | Where the program stands |
| 2 | Session Log — last 3 entries | What was happening and what stopped |
| 3 | `DECISION_LOG.md` — open decisions and time-boxes | What is waiting on you |
| 4 | Open observation windows (§10.4) | What must not be touched yet |
| 5 | `git log --oneline -20` and `git branch` | What is in flight; any stale branch |
| 6 | Run the Monday Ops Check (§2.3) regardless of the weekday | Whether anything broke while away |

**Then, before any building:**

- Reconcile: does the repository match reality? Anything shipped but unrecorded?
- Any decision breached its time-box? → resolve before building (§4.6)
- Any risk tripwire fired while away? → handle first
- Re-enter at the **Monday Plan** (§2.4), whatever day it is. Select **one** small item.

**Do not attempt to "catch up" in the first session.** The first session back is for
re-establishing the rhythm, not for recovering lost ground. See Appendix B.

---

## Appendix B — Behind-schedule recovery protocol

**Use when:** materially behind the frozen sequence, or after an extended absence.

**The core principle:** the frozen plan's *sequence* is binding; its *dates* are not.
Dependency order exists because the dependencies are real. The calendar was an estimate
made by someone who did not know what your next six months would hold.

| # | Step | Action |
|---|---|---|
| 1 | **Stop planning** | Do not re-plan the whole program. That is displacement activity. |
| 2 | **Assess honestly** | Which items are actually closed? Verify against evidence, not memory. |
| 3 | **Reconcile the record** | Update `IMPLEMENTATION_PROGRESS.md` to reflect reality — including the delay. An accurate record of a delayed program beats an optimistic record of a fictional one. |
| 4 | **Re-baseline capacity** | Hours genuinely available per week now — not aspirationally. |
| 5 | **Re-sequence, never re-strategise** | Keep the frozen dependency order; stretch the calendar. Log as an `OD` entry with reasoning. |
| 6 | **Pick the smallest Ready item** | Ship one thing. Restore the feeling of a working system before restoring throughput. |
| 7 | **Resume the rhythm** | Rhythm before volume. A sustained small cadence outruns a heroic sprint every time. |

**What is forbidden during recovery:**

- 🚫 Skipping the Separation Rule to "make up time" — this is exactly when errors ship
- 🚫 Batching C2/C3 changes to catch up — destroys attribution permanently (§10.5)
- 🚫 Abandoning evidence or recording — it is the compounding asset; skipping it converts
  a delayed program into an unrecoverable one
- 🚫 Concluding the strategy is wrong because execution was slow — those are different
  problems with different remedies, and conflating them is how frozen plans die

---

## Appendix C — Minimum viable week

**Use when:** a week collapses. The irreducible core, **~25 minutes total.** Below this,
the program is dormant, not running — and dormancy must be a *recorded* state, not an
accidental one.

| # | Action | Min | Why irreducible |
|---|---|---|---|
| 1 | Monday Ops Check (§2.3) | 10 | The only thing standing between a silent failure and weeks of lost leads |
| 2 | Review responses owed (§16.3) | 10 | Public, time-sensitive, permanent |
| 3 | One-line Session Log entry: *"Minimum week — [reason]"* | 5 | Makes the gap visible instead of invisible |

**Rules:**

- Two consecutive minimum weeks → tripwire fires (§19.4). At the third, formally re-baseline
  (Appendix B) rather than pretending the schedule still holds.
- Never skip #1. Everything else in the program can wait a week. A broken lead path cannot.
- A minimum week is **not a failure.** An *unrecorded* minimum week is, because it makes
  the program's true state unknowable.

---

## Appendix D — Artifact index

### Governing documents

| File | Role | Editable? |
|---|---|---|
| `PROJECT.md` | Constitution | Amendment only |
| `LOCAL_SEO_MASTER_PLAN.md` | SEO strategy | ❄️ **FROZEN** |
| `IMPLEMENTATION_READINESS_REPORT.md` | Readiness audit, 2026-07-20 | ❄️ **FROZEN** |
| `SERVICE_PAGE_SPEC.md` | Page template law | ❄️ **FROZEN** |
| `IMPLEMENTATION_MASTER_PLAN.md` | Phases P0–P10, risks R1–R7 | Living |
| `BACKLOG.md` | Task authority | Living |
| **`SEO_EXECUTION_PLAYBOOK.md`** | **This file — process authority** | Living (quarterly) |

### Operational documents

| File | Role | Cadence |
|---|---|---|
| `IMPLEMENTATION_PROGRESS.md` | Live program state | Weekly |
| **`DECISION_LOG.md`** | **Decisions + off-site change register** | Per decision |
| `CHANGELOG.md` | Release history | Per ship |
| `RUNBOOK.md` | Ops, accounts, incidents, rollback | Quarterly |
| `MONITORING.md` | Alerting and synthetic tests | Quarterly |
| `evidence/` | Evidence store | Per change |

### Artifacts this playbook introduces

| Artifact | Purpose | Requires |
|---|---|---|
| `DECISION_LOG.md` | §4 decision record + §10.6 off-site register | `netlify.toml` forced-404 rule |
| `evidence/` | §13 evidence store | Publish exclusion; PII discipline |
| `SEO_EXECUTION_PLAYBOOK.md` | This file | `netlify.toml` forced-404 rule |

> ⚠️ Both new root files must receive forced-404 rules **before the next deploy**. The
> frozen readiness report already records two uncovered root documents as blocker **B5**;
> adding two more without rules compounds a live exposure rather than closing it.

### External surfaces

| Surface | Owner | Cadence | Change class |
|---|---|---|---|
| Google Search Console | 🔵 | §14 | Read-mostly |
| Google Business Profile | 🔵 | §15 | C3 identity / C1 other |
| Google Analytics 4 | 🟢 | §3 monthly | C2 |
| Citations / directories | 🔵 | §15.4 quarterly | C3 |
| Netlify | 🟢 | Per deploy | Deploy surface |
| UptimeRobot · cron-job.org | 🟢 | `MONITORING.md` | Ops |

---

## Appendix E — Playbook activation checklist

One-time, ~90 minutes. Until every row is ✅, the execution system is designed but not
running.

| # | Action | Hat | Done |
|---|---|---|---|
| 1 | Add forced-404 rules for `SEO_EXECUTION_PLAYBOOK.md` and `DECISION_LOG.md` in `netlify.toml` (also closes part of B5) | 🟢 | ⬜ |
| 2 | Create `DECISION_LOG.md` with the §4.4 template and the §10.6 register heading | 🔵 | ⬜ |
| 3 | Create `evidence/` with `baselines/` and the current month folder; confirm it is publish-excluded | 🟢 | ⬜ |
| 4 | Back-fill existing resolved decisions (D1, D2, and any others) as log references — **references only, not restatements** | 🔵 | ⬜ |
| 5 | Log every currently-open decision with a time-box (§4.6) | 🔵 | ⬜ |
| 6 | Record `OD-001` — confirm or amend the §15.5 GBP post cadence, with reasoning | 🔵 | ⬜ |
| 7 | Record `OD-002` — the GBP verification-failure contingency, **before** verification is attempted (§15.1) | 🔵 | ⬜ |
| 8 | Name the responder for every inbound channel (readiness W8); record in `RUNBOOK.md` | 🔵 | ⬜ |
| 9 | Book all seven weekly slots (§2.2) as recurring calendar entries | 🔵 | ⬜ |
| 10 | Book the Monthly Review as a recurring first-Monday entry | 🔵 | ⬜ |
| 11 | Book the Day-90 success review | 🔵 | ⬜ |
| 12 | Capture the current baseline into `evidence/baselines/` (pre-change state) | 🟢 | ⬜ |
| 13 | Add tripwires to every Open risk in `IMPLEMENTATION_PROGRESS.md` (§19.3) | 🔵 | ⬜ |
| 14 | Verify the rollback anchor points at the correct commit (readiness I2) | 🟢 | ⬜ |
| 15 | Complete the `RUNBOOK.md` §4 escrow checklist (R7 mitigation) | 🔵 | ⬜ |
| 16 | Run one full workflow (§1) end-to-end on a small Gate-0 item to test the system | All | ⬜ |

**Row 16 is the real activation.** A process document that has never been executed is a
hypothesis. Run it once on something small, find where it is wrong, fix it, and only then
trust it with the program.

---

## Closing note

This playbook contains no SEO. That is deliberate and total. Every strategic question —
what to target, what to build, what to publish, in what order — was answered by the frozen
documents and is answered nowhere here.

What this document provides is the thing a frozen strategy cannot provide for itself:
**a way to still be executing it in eighteen months.** The failure mode for a solo operator
is not choosing the wrong strategy. It is choosing a good one and then, gradually and
without ever deciding to, ceasing to execute it — a missed Friday, an unrecorded ship, an
approval skipped once for speed, a decision that quietly ages out, until the plan is a
document nobody acts on and nobody can reconstruct.

The controls above — the Separation Rule, the observation window, the Friday Close, the
tripwire, the evidence folder — exist for exactly one purpose: to make consistency
structural rather than a matter of willpower. Willpower is not available for years.
Structure is.

---

*End of SEO_EXECUTION_PLAYBOOK.md v1.0 — 2026-07-21.*
*Process authority only. Amends no strategy. Authorizes no website change.*
*Review quarterly per §12.5, or on any change to workflow, cadence, or approval structure.*
