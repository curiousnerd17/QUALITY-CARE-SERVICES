# MONITORING.md

**Quality Care Services — Production Monitoring Runbook (P0-5)**

> Minimum monitoring per IMPLEMENTATION_MASTER_PLAN.md Phase P0-5: homepage
> uptime, weekly synthetic inquiry-form test, alerts to the owner. Two free
> hosted services; zero code, zero infrastructure, nothing served publicly
> (this file is publish-blocked in `netlify.toml` per the P0-4 convention).
>
> **Design rationale (recorded 2026-07-19):** hosted uptime (UptimeRobot-class)
> + hosted cron (cron-job.org-class) chosen over GitHub Actions (excluded by
> scope unless required — it isn't) and Netlify functions (adds a build surface
> to a deliberately buildless site). The weekly TEST email doubles as a
> human-detectable heartbeat: no Monday TEST email in the inbox = investigate.

---

## Monitor 1 — Homepage uptime (owner setup, ~5 min)

Service: **UptimeRobot** (free tier) — https://uptimerobot.com
Account: create with the business email.

| Setting | Value |
|---|---|
| Monitor type | HTTP(s) — Keyword |
| URL | `https://qualitycareservices.in/` |
| Keyword | `id="main-content"` (alert when **missing**) |
| Interval | 5 minutes |
| Alert contact | Owner email (and install the free UptimeRobot mobile app for push; SMS is paid — not needed) |

Why keyword and not plain HTTP: a 200 serving an error shell would pass a
status-only check; the keyword proves the real page markup rendered.

**CONVENTION — uptime marker (binding):** the check matches the structural
attribute `id="main-content"` (the skip-link target on `<main>`), **never
visible copy**. Rationale: copy (headlines, brand phrasing, meta text) is
scheduled to change across P1/P9 and would false-alarm; `id="main-content"`
is constitutionally protected — existing anchors and the skip link must keep
working (PROJECT.md §4/§13/§19) — so it survives every planned change, and it
appears only in genuine page markup, never in an error shell. If this ID is
ever renamed (it should not be), the monitor keyword must be updated in the
same commit.

**Verification after setup:** dashboard shows the monitor "Up"; use
"Test notification" to confirm the alert email arrives.

## Monitor 2 — Weekly synthetic inquiry-form test (owner setup, ~5 min)

Service: **cron-job.org** (free tier) — https://cron-job.org
Account: create with the business email.

| Setting | Value |
|---|---|
| Title | `QCS weekly form test` |
| URL | `https://api.web3forms.com/submit` |
| Schedule | Weekly, Monday 09:00 IST |
| Request method | POST |
| Headers | `Content-Type: application/x-www-form-urlencoded` and `Accept: application/json` |
| Notifications | ON — email on failure (non-2xx response) |

Request body (one line; **replace `ACCESS_KEY_FROM_INDEX_HTML` with the
`access_key` value from `index.html` — do not store it anywhere else**):

```
access_key=ACCESS_KEY_FROM_INDEX_HTML&subject=SYNTHETIC%20TEST%20%E2%80%94%20IGNORE&from_name=QCS%20Monitoring&name=TEST%20%E2%80%94%20Synthetic%20Monitor%20(ignore)&phone=9999999999&location=TEST%20%E2%80%94%20monitoring&service=Other%20Requirement&urgency=Just%20Exploring%20Options&message=This%20is%20an%20automated%20monitoring%20submission.%20Do%20not%20contact%20the%20customer.
```

**CONVENTION — synthetic submission identity (binding):** every synthetic
submission, from any tool, now or in the future, MUST carry exactly:

- **Subject:** `SYNTHETIC TEST — IGNORE`
- **Message:** `This is an automated monitoring submission. Do not contact the customer.`

Rationale: a fixed, exact subject makes inbox filtering/labeling reliable and
lead reports clean, and the message removes any chance that staff treat the
test as a real family and call the number. Never vary this wording; if it must
ever change, update this runbook and every configured job in the same change.

Notes: the phone value passes the site's `[6-9]\d{9}` validation shape;
`service=Other Requirement` keeps lead reports clean; the honeypot field is
simply omitted (equivalent to unchecked). This POST exercises the same
endpoint, key, and field set as a real visitor submission.

**How this detects failure, two independent ways:**
1. **Machine alert:** Web3Forms returns non-2xx (e.g. key revoked/invalid) →
   cron-job.org emails the owner immediately.
2. **Human heartbeat:** every Monday a "SYNTHETIC TEST" email arrives in the
   business inbox. **No Monday TEST email = the pipeline is broken somewhere**
   (key, Web3Forms delivery, or mail routing) — exactly the failure mode that
   went undetected for ~18 days in the July 2026 incident.

**Verification after setup:** use "Test run" once; confirm (a) cron-job.org
shows HTTP 200 and (b) the TEST email arrives in the inbox within minutes.
Delete nothing — let the weekly schedule run.

## Weekly 30-second owner routine

Monday morning: TEST email present? UptimeRobot showing green? Done.
Missing TEST email or red monitor → check Web3Forms dashboard and
`IMPLEMENTATION_PROGRESS.md` blocker procedure; redeploy/rollback via Netlify
if needed.

## Escalation / change control

- If the Web3Forms key is ever rotated again: update the cron-job.org body the
  same day (this runbook's payload references the key by location, not value).
- New pages (e.g. `/services/patient-care`) get their own UptimeRobot keyword
  monitor as they ship (P7/P8; one minute each).
- This file is repository-only. It must keep its forced-404 rule in
  `netlify.toml` (P0-4 convention).

---

## Setup status ledger

| Item | Status | Date | By |
|---|---|---|---|
| UptimeRobot account + homepage monitor | ⬜ Owner action required | — | — |
| Alert email test received | ⬜ Owner action required | — | — |
| cron-job.org account + weekly form job | ⬜ Owner action required | — | — |
| First synthetic TEST email confirmed in inbox | ⬜ Owner action required | — | — |

*Update this ledger and IMPLEMENTATION_PROGRESS.md when setup completes; P0-5
closes only when all four rows are ✅.*
