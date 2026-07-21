# GA4 Custom Dimension Registration — P3 Measurement Layer

**Deployment evidence · Phase P3 · BACKLOG E6-T1…E6-T4**
**Property:** `G-NT5DDR1ET5` · **Branch:** `p3-measurement-layer` · **Commit:** `bed1c2a`
**Repository-only — never deployed.** Requires the `/evidence/*` publish rule (see §4).

---

## 1. Gating statement

> **P3 is NOT operational until all five dimensions below exist in GA4.**

The event layer collects these parameters from the moment it deploys, but GA4 does
**not** surface an unregistered parameter in any report, exploration, or audience.
Until registration completes, every event arrives with its attribution invisible —
`inquiry_form_submitted` would be countable, but not attributable to a service.

Until §2 is complete, the correct status entry is **"collecting, not yet reportable."**

---

## 2. Registration record

**GA4 path:** Admin → Data display → Custom definitions → Custom dimensions → *Create custom dimension*

Parameter names are **case-sensitive** and must match the code exactly. Copy them
verbatim from the right-hand column; a typo produces a permanently empty dimension.

| # | Dimension name | Scope | Event parameter | Emitted by | Registered (YYYY-MM-DD) | By |
|---|---|---|---|---|---|---|
| 1 | Service | Event | `service` | `call_click`, `whatsapp_click`, `service_selected`, `inquiry_form_started`, `inquiry_form_submitted`, `inquiry_form_failed` | ⬜ | ⬜ |
| 2 | Urgency | Event | `urgency` | `inquiry_form_submitted` | ⬜ | ⬜ |
| 3 | Link Section | Event | `link_section` | `call_click`, `whatsapp_click`, `service_selected`, `external_link_click` | ⬜ | ⬜ |
| 4 | Failure Type | Event | `failure_type` | `inquiry_form_failed` | ⬜ | ⬜ |
| 5 | Method | Event | `method` | `service_selected` | ⬜ | ⬜ |

**Suggested descriptions** (optional field, but future-you will want them):

| Parameter | Description |
|---|---|
| `service` | Canonical service associated with the interaction. Empty on generic (non-service-specific) entry points. |
| `urgency` | Timeframe selected on a successful inquiry submission. |
| `link_section` | Page region of the clicked element: header, home, services, inquiry, contact, prefooter, footer, sticky-call-mobile. |
| `failure_type` | `validation` (client-side, never reached the network) or `submission` (Web3Forms/network failure). |
| `method` | How a service was selected: `service_card` or `dropdown`. |

**Quota check:** 5 of 50 event-scoped custom dimensions used (standard property limit).
No quota risk. E6-T5 will reuse these same five for service pages — no new dimensions
are required by the remaining roadmap.

---

## 3. Timing — register at or before deploy, not after

⚠️ **GA4 custom dimensions are not retroactive.** Events collected before a dimension
is registered are permanently unavailable for that dimension in reports. The data is
not "backfilled later" — it is gone for reporting purposes.

Consequence: every hour between deployment and registration is a permanent hole in the
attribution record, and it lands exactly on the first traffic the measurement layer
ever sees.

**GA4 accepts a parameter name that it has never received.** These five can therefore be
registered *before* the deploy, closing the blind spot entirely.

> ### ✅ DECIDED 2026-07-21 — register before deploying P3
>
> Registration precedes deployment. Rationale: GA4 custom dimensions are not
> retroactive, so any registration lag is a permanent, unrecoverable hole in the
> attribution record — and it would land on the first traffic the measurement layer
> ever sees. Pre-registration reduces that window to zero at no cost.
>
> This supersedes the earlier "immediately after deployment" sequencing.

**Binding order of operations:**

```
1. Register all 5 dimensions in GA4   ← blind spot closes here
2. Record the dates in §2 above
3. Merge + deploy P3
4. DebugView verification (§5 checks 1–3)
5. Wait 24–48h → §5 check 4 → P3 becomes operational
```

**Do not deploy P3 before §2 shows five registration dates.** If deployment happens
first regardless, record both timestamps so the size of the unattributable window is
known rather than guessed:

- **Deployed at:** ⬜ ______________________
- **Registration completed at:** ⬜ ______________________
- **Unattributable window:** ⬜ ______________________

---

## 4. Prerequisite — publish exclusion for this directory ⚠️

`evidence/` was created outside the forced-404 blocklist — publicly servable, including
any screenshots or validator output filed here later. Same exposure class as readiness
blocker B5, one directory over.

> ### ✅ RESOLVED 2026-07-21 — commit `6023a4d` on `b5-publish-blocklist`
>
> ```toml
> [[redirects]]
>   from = "/evidence/*"
>   to = "/404.html"
>   status = 404
>   force = true
> ```
>
> Shipped as a **B5 follow-up commit, not inside P3** — the P3 commit remains frozen
> at 3 files (`main.js`, `index.html`, `404.html`).
>
> A splat, not another per-file rule. The per-file list is fail-open: a new root
> document stays public until somebody remembers a rule, which is how B5 arose and
> then widened from 2 uncovered docs to 3. `/evidence/*` is fail-closed — every file
> in the tree is covered on creation, forever, with no further action.
>
> Blocklist now: **17 redirects** (3 domain + 14 forced-404). Additive only; headers,
> CSP, cache policy and build block byte-identical.

**This rule must reach production before or with P3**, otherwise this very file is
publicly readable.

- **Deployed:** ⬜ ______________________
- **Verified** (`curl -I https://qualitycareservices.in/evidence/2026-07/P3-measurement-layer/ga4-custom-dimensions.md` → `HTTP/2 404`): ⬜

---

## 5. Verification after registration

Custom dimensions take **24–48 hours** to populate standard reports. Do not conclude
that registration failed before then.

| # | Check | Expected | Result |
|---|---|---|---|
| 1 | All 5 appear under Custom definitions | 5 active, scope = Event | ⬜ |
| 2 | Parameter names match code exactly (case-sensitive) | Exact match | ⬜ |
| 3 | DebugView shows parameters on live events | Values present | ⬜ |
| 4 | After 24–48h: Reports → Engagement → Events, `inquiry_form_submitted` breaks down by Service | Service values, not `(not set)` | ⬜ |
| 5 | `link_section` distinguishes `sticky-call-mobile` from `header` on `call_click` | Both appear | ⬜ |

**Check 4 is the real proof.** Checks 1–3 confirm registration; only check 4 confirms the
dimensions are reportable — which is the condition P3 is gated on.

---

## 6. Sign-off

P3 becomes **operational** when §2 shows five registration dates, §4 shows the splat rule
verified, and §5 check 4 passes.

- **P3 operational:** ⬜ ______________________
- **Recorded in `IMPLEMENTATION_PROGRESS.md`:** ⬜

---

*Created 2026-07-21 as the P3 deployment evidence record. Fill in place; do not
reconstruct from memory later (SEO_EXECUTION_PLAYBOOK.md §13.1).*
