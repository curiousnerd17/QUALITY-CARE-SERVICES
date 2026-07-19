# RUNBOOK.md

**Quality Care Services — Operations Runbook & Account Inventory (P0-7)**

> Everything needed to operate, maintain, recover, and hand over this website.
> **Repository-only — never deployed** (forced-404 rule in `netlify.toml` per
> the P0-4 convention). **No passwords, keys, or secrets belong in this file —
> ever.** Rows marked ⬜ OWNER are facts only the owner can supply; fill them
> in, commit, done.
>
> Companion documents: `MONITORING.md` (alerting/synthetic tests) ·
> `IMPLEMENTATION_PROGRESS.md` (current state) · `PROJECT.md` §15/§17
> (security & git policy).

---

## 1. Account Inventory

| Account | Purpose | Identifier (public) | Owner | Recovery method | MFA | Backup contact | Notes |
|---|---|---|---|---|---|---|---|
| Domain registrar | `qualitycareservices.in` registration + DNS | ⬜ OWNER (registrar name) | Owner | ⬜ OWNER | ⬜ OWNER | ⬜ OWNER | ⚠️ **Single point of total failure.** Record expiry date + enable auto-renew. DNS points to Netlify |
| GitHub | Source of truth for all code/docs | `github.com/curiousnerd17/QUALITY-CARE-SERVICES` (public repo) | Owner (`curiousnerd17`) | GitHub account recovery via account email | ⬜ OWNER | ⬜ OWNER | `main` = production history; `ds-3a-service-card` = active feature branch |
| Netlify | Hosting, deploys, headers/redirects, rollback | Site serving `qualitycareservices.in` | Owner | Login via linked email/GitHub | ⬜ OWNER | ⬜ OWNER | Config is in-repo (`netlify.toml`); rollback is one click (see §2) |
| Web3Forms | Inquiry-form submission → email | Access key lives in `index.html` (client-public by design) | Owner | Login = business email | ⬜ OWNER | ⬜ OWNER | Key rotated 2026-07-19 after incident; if rotated again, update `index.html` **and** the cron-job.org body (MONITORING.md) same day |
| Google Analytics 4 | Traffic measurement (events pending P3) | Property `G-NT5DDR1ET5` | Owner | Google account recovery | ⬜ OWNER | ⬜ OWNER | Add second admin user as part of escrow (§4) |
| Google Search Console | Index monitoring | ⬜ Not yet verified (token stubs in `index.html`; planned P2/A-8) | Owner | Google account | ⬜ OWNER | ⬜ OWNER | Verify during P2 |
| Google Business Profile | Local-pack presence | ⬜ **Placeholder — not yet created** (planned P2/A-8) | Owner | Google account | — | — | Create with exact NAP from the site footer |
| Business email (Gmail) | Lead delivery, account anchor for most services above | `qualitycareserviceskota@gmail.com` | Owner | Google recovery (phone + backup email) ⬜ OWNER confirm both are set | ⬜ OWNER | ⬜ OWNER | ⚠️ Loss of this mailbox = loss of leads + most account recoveries. Domain-mail migration planned (P2/A-3) |
| Reviews Apps Script | Serves testimonials JSON to `main.js` | Endpoint URL hardcoded in `assets/js/main.js` | ⬜ OWNER (which Google account owns the script + sheet?) | Google account | ⬜ OWNER | ⬜ OWNER | Site degrades gracefully to built-in fallback reviews if this dies |
| UptimeRobot | Homepage uptime alerts | ⬜ OWNER (pending P0-5 setup) | Owner | Login = business email | ⬜ OWNER | ⬜ OWNER | Config in `MONITORING.md` |
| cron-job.org | Weekly synthetic form test | ⬜ OWNER (pending P0-5 setup) | Owner | Login = business email | ⬜ OWNER | ⬜ OWNER | Config + payload in `MONITORING.md` |

## 2. Deployment Runbook

**Branch workflow (PROJECT.md §17):** all work on feature branches (current:
`ds-3a-service-card`) → owner review → merge to **`main` (production branch)**
→ push → Netlify deploys. Preview: Netlify builds Deploy Previews for branches/
PRs — use one for any risky change (CSP, form path). ⚠️ Exact deploy trigger
(auto-from-`main` vs manual) is verified and recorded in P0-8 — until then,
treat "push to main" as "deploys production."

**Deploy steps:** 1) branch merged + pushed to `main` · 2) if CSS/JS changed,
confirm `?v=` token bumped in `index.html` + `404.html` (P0-3 convention) ·
3) if a new root doc was added, confirm its 404 rule exists (P0-4 convention) ·
4) watch the Netlify deploy log to "Published".

**Post-deploy verification checklist (every deploy, ~3 min):** homepage loads,
`id="main-content"` present in view-source · no non-canonical service names
(after P1: search page source for "ICU", "Caretaker", "Domestic Helper") ·
one synthetic form submission arrives (or trigger the cron-job.org test run) ·
`?v=` visible on CSS/JS references · `/PROJECT.md` returns 404 (after this
branch deploys) · UptimeRobot still green 10 minutes later.

**Rollback:** Netlify → Deploys → pick the last good deploy → **"Publish
deploy"** (instant, one click, no git required). Then diagnose in git, fix
forward, redeploy. Never debug live while broken — roll back first.

## 3. Incident Response

| Incident | Detection | Immediate action | Escalation | Verification |
|---|---|---|---|---|
| **Form failure** (submissions error or TEST email missing on Monday) | cron-job.org failure email · missing Monday "SYNTHETIC TEST — IGNORE" email · customer report | Check Web3Forms dashboard status + key validity vs `index.html`; check Gmail spam folder; browser-test the live form | If key invalid → rotate in Web3Forms, update `index.html` + cron body, deploy. If Web3Forms itself is down → phone/WhatsApp remain the primary channels; no site change needed | Live browser submission arrives in inbox; cron test-run returns 200 |
| **Site outage** (homepage down/blank) | UptimeRobot alert (keyword `id="main-content"` missing) | Check Netlify status page + deploy log; if a recent deploy caused it → **rollback (§2)** | If Netlify platform outage → wait (static site, nothing else to do); if DNS → next row | UptimeRobot green; manual load on phone data (not just Wi-Fi) |
| **DNS problem** (domain not resolving; site fine on `*.netlify.app` URL) | UptimeRobot alert + `netlify.app` URL still working | Check domain expiry FIRST (registrar) — most likely cause; then registrar DNS records still pointing at Netlify per Netlify's domain settings | Registrar support (account holder must call — see §4 escrow); renew/restore domain | `qualitycareservices.in` resolves; HTTPS valid; UptimeRobot green |
| **Netlify deploy failure** (build/deploy errors; site serving stale) | Netlify deploy log email/UI | Read the deploy log (usually a `netlify.toml` syntax error — validate TOML locally); previous deploy keeps serving, so **production is safe** — fix forward calmly | If config valid but deploys fail → Netlify support/status | New deploy "Published"; post-deploy checklist passes |

**All incidents:** record a one-line postmortem in `IMPLEMENTATION_PROGRESS.md`
Session Log (root cause · impact · fix · prevention), per the July-2026
form-incident precedent.

## 4. Escrow — what a trusted second person needs

If the owner becomes unavailable, a second person can fully operate this
project with: **(1)** access to the business Gmail account (via Google's
account-recovery contact or delegated access set up in advance — this unlocks
Web3Forms, GA4, GSC, monitoring accounts); **(2)** GitHub access (add them as
a repo collaborator now — the repo is public to read, collaborator = write);
**(3)** Netlify team member access (add now, free); **(4)** registrar account
access or at minimum the registrar name + account email so support recovery is
possible; **(5)** this file. **No secrets need storing anywhere:** every
credential is recoverable through the accounts above, and the one "key" in
this system (Web3Forms) is public-by-design in `index.html`.

⬜ OWNER — escrow activation checklist (do once, ~15 min): name the trusted
person · add as GitHub collaborator · add as Netlify team member · add as GA4
admin · set them as Google account recovery contact · tell them this file
exists and where.

## 5. Maintenance Checklist

**Weekly (~1 min):** Monday "SYNTHETIC TEST — IGNORE" email arrived ·
UptimeRobot green · glance at inbox for unanswered leads.
**Monthly (~15 min):** GA4 review (traffic + lead events once P3 ships) ·
`sitemap.xml` `lastmod` still true vs last content change · Netlify deploy
list matches expectations (no unknown deploys) · MONITORING.md ledger still
4/4.
**Quarterly (~1 hour — the master-plan P10 cadence):** live header/CSP check
on every route class · doc-URL spot check (`/PROJECT.md` → 404) · contrast
spot-check of any changed tokens · schema validation (Rich Results) · secrets
scan of new commits · domain expiry ≥ 6 months away · Netlify rollback drill
(publish previous deploy to a preview, not production) · re-verify one
MONITORING.md synthetic test end-to-end · review this runbook for drift and
update the "Last reviewed" line below.

---

*Last reviewed: 2026-07-19 (created). Review quarterly or on any account,
deploy-process, or incident-procedure change.*
