# BACKLOG.md

**Quality Care Services — Master Implementation Backlog**

> This is not a README. This is the single execution plan for transforming the current
> production website into the approved architecture defined in `PROJECT.md`.
>
> **Governing authority:** `PROJECT.md` is the constitution. Every task here is bound by
> it — the Rule of Truth (canonical seven services only), no frameworks, backwards
> compatibility, no SEO-only content, and the Definition of Done. Where this backlog and
> `PROJECT.md` ever appear to conflict, `PROJECT.md` wins.
>
> **How to use this document.** Work top to bottom within an epic unless a task's
> Dependencies say otherwise. Every task is scoped to a single implementation session and
> is independently deployable. Nothing ships that isn't reviewed and that doesn't satisfy
> the Definition of Done (§18 of `PROJECT.md`).

---

## Conventions

**Task ID:** `E{epic}-T{task}` (e.g. `E1-T2`).

**Priority:** Critical / High / Medium / Low.

**Effort:** S (≤ half session) · M (one session) · L (near a full session; still one sitting).

**Regression Risk:** Low / Medium / High — the chance a change breaks existing, working
production behaviour.

**Status:** ✅ Completed (with commit and date) · 🔶 Partial (done slices enumerated) ·
⬜ Pending. A task without a Status line is Pending. Status lines are updated as work
ships (living-document rule). A task is only marked ✅ when its Acceptance Criteria *and*
the standing Definition of Done are both satisfied and the change is production-reviewed.

**Standing Definition of Done (applies to _every_ task, not repeated per task):** works on
desktop; works on mobile; Lighthouse checked; accessibility checked (WCAG 2.2 AA); SEO
checked; analytics verified where relevant; no regression to existing pages, anchors, or
features; production-reviewed before deploy. Task-level Acceptance Criteria are *in addition
to* this baseline.

**Standing constraints (apply to every task):** no framework; no redesign; no invented
services; no secrets committed; existing URLs/anchors preserved; only the canonical seven
services (Patient Care, Elder Care, Mother & Newborn Care, Child Care, Maid Services, Home
Cook Services, Housekeeping / Dusting & Cleaning).

**Open business decisions that gate content tasks** (owner: business; must be resolved
before the dependent task's copy is finalized):

- **D1 — Patient Care scope. ✅ RESOLVED (2026-07-03, recorded at E1-T2 sign-off).**
  Patient Care is a combined service: clinical nursing by qualified nurses where
  required, plus non-clinical care by experienced attendants. The clinical/non-clinical
  distinction must remain clear throughout the website. Legacy "Home Nursing" and
  "Patient Attendant" reconcile into Patient Care as its clinical and non-clinical
  sides ("Bedridden Patient Care" / "Post Hospitalization Care" form options fold in
  likewise). "ICU Care at Home" branding is **not** auto-carried: high-dependency
  wording requires a final business honesty confirmation at E1-T3 copy review before
  any such claim ships.
- **D2 — Legacy service mapping. ✅ RESOLVED (2026-07-03, recorded at E1-T2 sign-off).**
  "Caretaker" is a role, not a standalone service: its scope is absorbed contextually
  into Patient Care, Elder Care, Mother & Newborn Care, and Child Care. "Full-Time
  Domestic Helpers" is absorbed into Maid Services (full-time as an engagement mode).
  Neither remains a standalone card, form option, or schema offer.
- **D3 — Mother-support framing. ✅ RESOLVED (Amendment v1.1).** Mother & Newborn Care is a single canonical service that includes post-delivery mother support and newborn care. "Mother Care" and "Newborn Care" are not separate services.
- **D4 — Home-services boundaries.** Where Maid Services, Home Cook Services, and
  Housekeeping/Cleaning stop and start, so the three pages differentiate honestly.
- **D5 — Short-notice/one-off availability.** Real or not, per service.

---

# EPIC 1 — Production Foundation Cleanup

*Goal: make the live homepage internally consistent, asset-clean, and truthful to the
canonical seven services before any new pages are built. Highest business impact; lowest
architectural risk.*

### E1-T1 — Resolve logo/image reference mismatch (`.png` vs `.jpg`)
- **Status:** ✅ Completed (audited 2026-07-02) — every icon/OG/Twitter/manifest reference
  now points to `images/logo-optimized.png`, which exists in the repository (`index.html`
  head, JSON-LD, and header logo; `404.html`; `manifest.webmanifest`; `browserconfig.xml`).
  No `.jpg` logo reference remains. Residual action: verify the deployed asset and social
  preview per the Deployment Notes on the next production deploy.
- **Description:** `index.html` references `logo-optimized.jpg` for favicons and OG/Twitter
  images, while `manifest.webmanifest`, `browserconfig.xml`, and `404.html` reference
  `logo-optimized.png`. Determine which asset actually exists, then standardize every
  reference to the correct, existing file across all files.
- **Priority:** Critical
- **Effort:** S
- **Dependencies:** None
- **Files Affected:** `index.html`, `404.html`, `manifest.webmanifest`, `browserconfig.xml`
- **Regression Risk:** Low
- **Acceptance Criteria:** All icon/OG/Twitter references resolve to a real file (no 404 on
  any referenced image); favicon renders in-browser; OG image resolves when the URL is
  shared (e.g. WhatsApp/social preview); manifest and browserconfig icons resolve.
- **Deployment Notes:** Verify the physical asset on the deployed tree, not just the repo
  snapshot. Purge/re-share a link to confirm the social preview updates.

### E1-T2 — Inventory current vs canonical services (decision-support, no code)
- **Status:** ✅ Completed (2026-07-03) — six-surface inventory produced (service cards,
  form `<select>` options, hero service tags, footer service links, JSON-LD `makesOffer`,
  title/meta/OG) and mapped to the canonical seven; business sign-off recorded, resolving
  D1 and D2 (see Open Business Decisions above). Mapping outcome:
  **keep** — Elder Care, Mother & Newborn Care, Child Care, Maid Services,
  Housekeeping / Dusting & Cleaning (residual legacy labels — "Mother Care",
  "Child Care / Baby Care", "House Maids", "Housekeeping Workers" — persist in
  `data-service` values, form options, hero tags, footer, WhatsApp texts, and schema
  and are renamed via E1-T3/E1-T5/E1-T6);
  **merge into Patient Care** — Home Nursing, ICU Care at Home (branding subject to the
  D1 honesty check), Patient Attendant, Bedridden Patient Care, Post Hospitalization Care;
  **retire as standalone, absorb** — Caretakers (role absorbed contextually per D2),
  Full-Time Domestic Helpers (into Maid Services);
  **missing, to create** — Patient Care card (E1-T3), Home Cook Services card (E1-T4);
  group headings "Healthcare Services" / "Domestic Support Services" rename to
  "Care Services" / "Home Support Services" (E1-T3).
- **Description:** Produce a mapping table of every service currently shown on the homepage
  (Home Nursing, ICU Care at Home, Patient Attendant, Caretakers, Full-Time Domestic
  Helpers, plus existing care/domestic cards) against the canonical seven. Flag each as
  keep / rename / merge / retire. Feeds decisions D1 and D2.
- **Priority:** Critical
- **Effort:** S
- **Dependencies:** None
- **Files Affected:** None (analysis artifact only; no site change)
- **Regression Risk:** Low
- **Acceptance Criteria:** A written mapping exists; D1 and D2 can be answered from it;
  business sign-off recorded before E1-T3 begins.
- **Deployment Notes:** Not deployable; a planning gate for the rest of Epic 1.

### E1-T3 — Reconcile homepage service cards to the canonical seven
- **Status:** 🔶 Partial (updated 2026-07-03) —
  **Done slices:** Mother & Newborn Care and Child Care cards reconciled (commit
  `b6ab352`, 2026-07-01); domestic card titles aligned to "Maid Services" and
  "Housekeeping / Dusting & Cleaning" (commit `163e2b9`, 2026-07-01).
  **Reconciliation implemented 2026-07-03** (uncommitted, on `ds-3a-service-card`,
  pending review): Patient Care umbrella card created per D1 (bullets "Qualified
  Nurses" / "Experienced Attendants" / "Recovery Support" keep the clinical/non-clinical
  distinction visible; no ICU claims remain); Home Nursing, ICU Care at Home, and
  Patient Attendant cards removed (merged into Patient Care); Caretakers card retired
  (role, per D2); Full-Time Domestic Helpers card retired and absorbed into Maid
  Services ("part-time or full-time" in description, per D2); group headings renamed to
  "Care Services" / "Home Support Services"; card order aligned to PROJECT.md §5;
  in-section WhatsApp texts/aria-labels canonicalized. One additive form option
  ("Patient Care") added so the new card's Call-back preselect works per this task's
  acceptance criteria — the full option sweep remains E1-T5. Kept cards' `data-service`
  values stay pinned to existing legacy option names until E1-T5's 1:1 rename.
  **Review corrections applied 2026-07-03** (business direction during E1-T3 review):
  Patient Care description set to "Qualified Nurses and Experienced Patient Attendants,
  matched according to the patient's needs." with bullets "Qualified Nurses" /
  "Experienced Patient Attendants" / "Recovery & Daily Care"; Home Cook Services card
  pulled forward from E1-T4 so all seven canonical services are displayed (see E1-T4
  status); Home Support order fixed as Maid → Home Cook → Housekeeping.
  **Remaining scope:** E1-T5 canonical form/`data-service` sweep; Home Cook copy
  finalization (D4); production review + DoD pass.
- **Description:** Update the homepage services section so the displayed services are
  exactly the canonical seven (grouped Care Services vs Home Support Services), renaming/merging/retiring per the
  approved E1-T2 mapping. Sub-capabilities appear inside their parent service, not as
  standalone cards. No new services invented.
- **Priority:** Critical
- **Effort:** M
- **Dependencies:** E1-T2; D1; D2
- **Files Affected:** `index.html` (services section), `style.css` (only if card
  count/grid changes)
- **Regression Risk:** Medium — touches a primary, high-traffic section and its `data-service`
  hooks.
- **Acceptance Criteria:** Exactly seven services shown, named per canonical list; each card
  retains a working Call-back (`data-service`) and pre-filled WhatsApp link; no reference to
  a non-offered service remains in the section; grid renders cleanly at all breakpoints.
- **Deployment Notes:** Confirm each `data-service` value still matches a form `<option>` (see
  E1-T5).

### E1-T4 — Surface Home Cook Services as a first-class card
- **Status:** 🔶 Card implemented 2026-07-03 per business direction during E1-T3 review
  (uncommitted, on `ds-3a-service-card`): card added between Maid Services and
  Housekeeping (canonical §5 order) with working Call-back
  (`data-service="Home Cook Services"` plus matching additive form option) and
  pre-filled WhatsApp. Card copy is a conservative draft — "Daily Meal Preparation /
  Home-Style Cooking / Regular Schedules", no boundary or short-notice claims — final
  wording still gated on **D4** (and D5 for any availability claims).
- **Description:** Ensure Home Cook Services (currently only implied under "Kitchen Work")
  has its own visible service card in the Home cluster, matching the existing card pattern.
- **Priority:** Critical
- **Effort:** S
- **Dependencies:** E1-T3; D4
- **Files Affected:** `index.html` (services section)
- **Regression Risk:** Low
- **Acceptance Criteria:** A Home Cook Services card exists with working Call-back and
  pre-filled WhatsApp; content stays within genuinely offered cook scope.
- **Deployment Notes:** May be delivered together with E1-T3 in one session.

### E1-T5 — Align inquiry-form service options with canonical services
- **Description:** Update the form's service `<select>` options and every `data-service`
  value so they map 1:1 to the canonical seven (removing non-offered options like legacy
  attendant/caretaker labels where D2 retires them). Preserve the auto-fill behaviour.
- **Priority:** High
- **Effort:** S
- **Dependencies:** E1-T3; D1; D2
- **Files Affected:** `index.html` (form), cross-check `main.js` (`data-service` handler —
  no logic change expected)
- **Regression Risk:** Medium — form is the core lead-capture path.
- **Acceptance Criteria:** Every card/CTA `data-service` value matches an existing `<option>`;
  selecting a service via a card pre-selects it in the form; submission still succeeds; lead
  is service-tagged.
- **Deployment Notes:** Do not alter Web3Forms wiring; placeholder access key stays as-is in
  any shared code (real key lives only in production).

### E1-T6 — Remove legacy terminology across homepage copy, schema, and footer
- **Description:** Sweep `index.html` for lingering non-canonical service names in body
  copy, footer link lists, hero service tags, and JSON-LD `makesOffer`; reconcile all to
  the canonical seven. (Schema specifics tracked in E5-T2; this task covers the visible-copy
  + footer sweep.)
- **Priority:** High
- **Effort:** M
- **Dependencies:** E1-T3; E1-T5; D1; D2
- **Files Affected:** `index.html`
- **Regression Risk:** Medium — footer links currently all point to `#services`; keep them
  working (real service-page URLs are wired later in E5-T3).
- **Acceptance Criteria:** No non-offered service term appears anywhere in visible homepage
  copy or footer; footer/service tags reflect canonical names; existing anchors still resolve.
- **Deployment Notes:** Coordinate wording with the eventual service-page titles for
  consistency.

### E1-T7 — Remove dead `.about-placeholder*` CSS and matching JS selector
- **Description:** The About-placeholder styles exist in CSS and are referenced in the
  `main.js` reveal-target selector, but the corresponding HTML does not exist. Remove the
  dead CSS rules and drop the orphaned selector token from the reveal query.
- **Priority:** Low
- **Effort:** S
- **Dependencies:** None
- **Files Affected:** `style.css`, `main.js`
- **Regression Risk:** Low
- **Acceptance Criteria:** No `.about-placeholder*` rules remain; reveal animation still
  works for all real targets; no console errors; visual output unchanged.
- **Deployment Notes:** Pure cleanup; safe to batch with another small Epic 1 task.

### E1-T8 — Correct `sitemap.xml` `lastmod` to a real date
- **Status:** ✅ Completed (audited 2026-07-02) — `lastmod` is a real, non-future date
  (2026-06-28). Note: homepage content changed on 2026-07-01 (commit `b6ab352`); refresh
  `lastmod` with the next content deploy, per the habit this task establishes.
- **Description:** The sitemap currently carries a placeholder/future `lastmod`. Set it to
  the genuine last-modified date and establish the habit of updating it on content change.
- **Priority:** Medium
- **Effort:** S
- **Dependencies:** None
- **Files Affected:** `sitemap.xml`
- **Regression Risk:** Low
- **Acceptance Criteria:** `lastmod` reflects a real, non-future date; sitemap validates.
- **Deployment Notes:** Revisit whenever homepage content materially changes; service-page
  URLs added later in E5-T9.

---

# EPIC 2 — Homepage Improvements

*Goal: sharpen the homepage as a hub + fast conversion funnel, per PROJECT.md §7–§8, §12.
No redesign — refinement only.*

### E2-T1 — Regroup services into Care Services and Home Support Services clusters
- **Description:** Present the seven services under the two approved groupings (Care Services:
  Patient, Elder, Mother & Newborn, Child; Home Support Services: Maid, Cook, Housekeeping) using the existing
  `service-group` pattern.
- **Priority:** High
- **Effort:** S
- **Dependencies:** E1-T3, E1-T4
- **Files Affected:** `index.html` (services section)
- **Regression Risk:** Low
- **Acceptance Criteria:** Two clearly labelled groups; all seven present; responsive at all
  breakpoints; no orphaned card.
- **Deployment Notes:** Can follow directly from E1-T3.

### E2-T2 — Add an in-content CTA after the trust/"why us" block
- **Description:** Insert one matched CTA (Call + WhatsApp) after the trust section to
  capture users convinced by trust signals before they reach services. Reuse existing button
  components.
- **Priority:** Medium
- **Effort:** S
- **Dependencies:** None
- **Files Affected:** `index.html`, `style.css` (only if spacing utilities needed)
- **Regression Risk:** Low
- **Acceptance Criteria:** CTA renders, is keyboard-reachable, uses existing button styles,
  and fires analytics events (post E6-T2/E6-T3); no layout shift introduced.
- **Deployment Notes:** Keep tone calm per §11; no manufactured urgency.

### E2-T3 — Trim primary navigation to real destinations
- **Description:** Reduce header nav to Services, About, Service Areas, Reviews, FAQ, Contact
  — removing "Trust" and "How It Works" from the nav bar while keeping those sections on the
  page. Preserve mobile menu behaviour.
- **Priority:** Medium
- **Effort:** S
- **Dependencies:** None
- **Files Affected:** `index.html` (header nav), cross-check `main.js` (menu toggle — no
  logic change expected)
- **Regression Risk:** Medium — nav is global and mobile-menu logic is attached to it.
- **Acceptance Criteria:** Nav shows the reduced set; all links resolve to existing anchors;
  mobile menu opens/closes and traps `Escape` correctly; removed sections still exist and are
  reachable by scroll.
- **Deployment Notes:** Anchor links must remain valid (backwards compatibility).

### E2-T4 — Reduce inquiry-form friction (make urgency optional)
- **Description:** Re-evaluate required fields; make the "urgency" select optional to lower
  drop-off, keeping name, phone, location, and service required. Validation logic updated
  accordingly.
- **Priority:** Medium
- **Effort:** S
- **Dependencies:** E1-T5
- **Files Affected:** `index.html` (form), `main.js` (validation)
- **Regression Risk:** Medium — touches validated form logic.
- **Acceptance Criteria:** Form submits with urgency blank; still blocks on missing
  name/phone/location/service and invalid phone; success/error messaging unchanged.
- **Deployment Notes:** Confirm Web3Forms still receives all fields; service tag preserved.

### E2-T5 — Homepage meta & heading consistency pass
- **Description:** Verify the homepage `<title>`, meta description, single-`<h1>` outline,
  and section headings reflect the canonical services and hub role (broad local intent, not
  per-service). Fix the footer heading-level dilution noted in audit (demote competing footer
  headings if they harm the outline).
- **Priority:** Medium
- **Effort:** M
- **Dependencies:** E1-T6
- **Files Affected:** `index.html`
- **Regression Risk:** Low
- **Acceptance Criteria:** Exactly one `<h1>`; clean heading outline; title/description
  describe the hub honestly with canonical services; no non-offered term present.
- **Deployment Notes:** Keep description within length best-practice; don't keyword-stuff.

---

# EPIC 3 — Patient Care Page

*Goal: build the first service page under `/services/patient-care` using the approved
template (PROJECT.md §10; canonical detail in `SERVICE_PAGE_SPEC.md`, **FROZEN
v1.2**). This epic also establishes the reusable service-page template consumed by
Epic 4. Highest-intent service — build first.*

> **Content gate:** copy for the scope, "who it's for," and FAQ blocks cannot be finalized
> until **D1** (and shift/relief structure) is resolved. Structural tasks may proceed;
> mark copy "draft — pending D1" until then.

### E3-T1 — Establish `/services/` structure and shared page template
- **Description:** Create the `/services/` directory and a single reusable service-page
  template (static HTML shell + existing CSS classes) implementing the approved section
  order, reusing the global header, footer, floating WhatsApp, and sticky mobile Call. This
  template is the component other service pages fill.
- **Priority:** Critical
- **Effort:** L
- **Dependencies:** Epic 1 complete
- **Files Affected:** new `/services/` page file(s); `style.css` (only additive service-page
  classes if strictly needed)
- **Regression Risk:** Low (additive; homepage untouched)
- **Acceptance Criteria:** Template renders all template slots in order; header/footer/
  floating elements identical to homepage; no new dependency; passes Lighthouse baseline.
- **Deployment Notes:** Additive only; do not alter homepage. Confirm Netlify serves the new
  path and `/assets/*` caching applies.

### E3-T2 — Breadcrumb (visible + placeholder for schema)
- **Description:** Implement Home › Services › Patient Care breadcrumb in the template.
- **Priority:** High · **Effort:** S · **Dependencies:** E3-T1
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Breadcrumb visible, links resolve to `/` and `/services/`; matches
  the URL path; ready for `BreadcrumbList` (E3-T10).
- **Deployment Notes:** Keep label text identical to schema names.

### E3-T3 — Service hero
- **Description:** H1 (service + Kota + reassurance), one-line value proposition, Call +
  service-specific pre-filled WhatsApp CTAs above the fold on mobile, local coverage line.
- **Priority:** Critical · **Effort:** M · **Dependencies:** E3-T1; hero copy pending D1
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Single H1; CTAs reachable above the fold on mobile; WhatsApp
  message pre-fills patient-care context; hero image (if used) has explicit dimensions and
  priority load (coordinate with E7-T1 pattern).
- **Deployment Notes:** No clinical claims; calm tone per §11.

### E3-T4 — "What Patient Care Includes" (scope) section
- **Description:** Honest, itemized scope of delivered support, explicitly stating the
  medical/non-medical boundary.
- **Priority:** Critical · **Effort:** M · **Dependencies:** E3-T1; **D1**
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Scope reflects only genuinely delivered capabilities; boundary
  stated; no invented scope; H2 present in outline.
- **Deployment Notes:** Blocked from final copy until D1; ship structure with draft only if
  clearly marked and not indexed prematurely.

### E3-T5 — "Who Patient Care Is For" section
- **Description:** 3–5 concrete situational profiles (post-discharge family, chronic/bedridden
  care, adult children arranging supervision, caregiver relief) mapped to real scope.
- **Priority:** High · **Effort:** S · **Dependencies:** E3-T1; D1
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Profiles map to delivered scope; visitor can self-identify; H2 in
  outline.

### E3-T6 — "How We Arrange Care" section
- **Description:** Genuine 3–4 step process, patient-framed, emphasizing honest response
  speed for urgent discharge.
- **Priority:** High · **Effort:** S · **Dependencies:** E3-T1
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Reuses homepage process pattern, re-framed; no timeline promised
  that can't be honored.

### E3-T7 — "Why Families Trust Us With Patient Care" (trust) section
- **Description:** Service-specific trust points: verification, condition-matching,
  availability during service, local presence, honest scope.
- **Priority:** High · **Effort:** S · **Dependencies:** E3-T1
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Trust points are patient-care-specific (not generic), truthful,
  non-clinical; placed immediately before a CTA.

### E3-T8 — Patient Care FAQ (visible)
- **Description:** 5–7 service-specific Q&As (response speed, 12h/24h options, what the
  attendant does/doesn't do, temporary vs long-term, how charges are decided, verification;
  optional bedridden handling).
- **Priority:** High · **Effort:** M · **Dependencies:** E3-T1; **D1** (Q on scope/shift)
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Visible FAQ present; no cost figures (approach only); content will
  be mirrored exactly by `FAQPage` schema in E3-T10.

### E3-T9 — Areas served + Related services
- **Description:** Kota + localities honest coverage block; Related Services links to Elder
  Care (primary) and other genuine overlaps.
- **Priority:** Medium · **Effort:** S · **Dependencies:** E3-T1
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** Coverage stated honestly; related links point to intended (even if
  not-yet-built) service URLs, tracked in E4/E5 linking; no fake locality pages.
- **Deployment Notes:** If target service pages don't exist yet, link to the homepage service
  anchor as an interim and update when the page ships (record in E5-T3).

### E3-T10 — Structured data (Breadcrumb + Service + FAQPage)
- **Description:** Add `BreadcrumbList`, a `Service` node referencing the canonical
  `LocalBusiness` `@id`, and a `FAQPage` mirroring the visible FAQ exactly.
- **Priority:** High · **Effort:** M · **Dependencies:** E3-T2, E3-T4, E3-T8; **D1**
- **Files Affected:** service page (JSON-LD)
- **Regression Risk:** Low
- **Acceptance Criteria:** Valid in Rich Results Test; `Service.description`/`areaServed`
  truthful; `provider` references homepage `@id`; FAQ schema matches visible FAQ 1:1; no
  orphan schema.
- **Deployment Notes:** Only after copy is D1-final.

### E3-T11 — Page-level conversion blocks + CTA wiring
- **Description:** Mid-page and end CTAs; end CTA routes to the inquiry form with Patient Care
  pre-selected (`data-service`), WhatsApp fallback; persistent floating WhatsApp + sticky Call
  inherited.
- **Priority:** High · **Effort:** S · **Dependencies:** E3-T1, E1-T5
- **Files Affected:** service page
- **Regression Risk:** Low
- **Acceptance Criteria:** End CTA pre-selects Patient Care in the form; all WhatsApp links
  pre-fill patient-care context; analytics events fire (post Epic 6).

### E3-T12 — Patient Care page testing & sign-off
- **Description:** Full Definition-of-Done pass for the page: desktop/mobile, Lighthouse,
  accessibility, SEO/schema validation, analytics events, no regression.
- **Priority:** High · **Effort:** M · **Dependencies:** E3-T1…E3-T11
- **Files Affected:** none (verification)
- **Regression Risk:** Low
- **Acceptance Criteria:** All DoD boxes checked; schema valid; page added to sitemap
  (E5-T9); internal links from homepage/footer wired (E5-T3).
- **Deployment Notes:** This page's completion certifies the reusable template for Epic 4.

---

# EPIC 4 — Remaining Service Pages

*Goal: build the remaining six service pages by filling the template certified in Epic 3.
No structural re-invention — reuse. Build order follows PROJECT.md priority.*

> **Reusable components (do not duplicate):** the certified service-page template
> (E3-T1, per `SERVICE_PAGE_SPEC.md` FROZEN v1.2),
> global header/footer, floating WhatsApp, sticky Call, button components, card/section CSS
> classes, breadcrumb pattern, and the `Service`/`Breadcrumb`/`FAQPage` schema pattern.
> Each task below = fill the template with that service's real content + schema + links +
> testing, in one session per page.

**Per-page task shape (identical for each):** hero · scope · who-it's-for · how-it-works ·
trust · FAQ · areas · related · schema · internal-link wiring · page test/DoD. Each page is
independently deployable.

### E4-T1 — Elder Care page (`/services/elder-care`)
- **Priority:** Critical · **Effort:** L · **Dependencies:** E3 template certified
- **Files Affected:** new `/services/elder-care` page; sitemap (E5-T9)
- **Regression Risk:** Low (additive)
- **Acceptance Criteria:** Template filled with honest elder-care content; research-mode
  depth + reassurance emphasis; related links to Patient Care (+ Cook/Housekeeping where a
  real household overlap exists); valid schema; DoD passed.
- **Deployment Notes:** Reciprocal link with Patient Care (update E3-T9 interim link).

### E4-T2 — Home Cook Services page (`/services/home-cook-services`)
- **Priority:** Critical · **Effort:** L · **Dependencies:** E3 template certified; **D4**,
  **D5**
- **Files Affected:** new page; sitemap
- **Regression Risk:** Low
- **Acceptance Criteria:** Net-new-demand page; scope within genuine cook offering; generous
  discovery links from Maid & Housekeeping; valid schema; DoD passed.
- **Deployment Notes:** Highest currently-unserved demand; prioritize alongside Elder Care.

### E4-T3 — Child Care page (`/services/child-care`)
- **Priority:** High · **Effort:** L · **Dependencies:** E3 template certified
- **Files Affected:** new page; sitemap
- **Regression Risk:** Low
- **Acceptance Criteria:** Safety-forward trust; age band clearly differentiated from Mother & Newborn Care; links to Mother & Newborn Care; valid schema; DoD passed.

### E4-T4 — Mother & Newborn Care page (`/services/mother-newborn-care`)
- **Priority:** High · **Effort:** L · **Dependencies:** E3 template certified
- **Files Affected:** new page; sitemap
- **Regression Risk:** Low
- **Acceptance Criteria:** Combined mother + newborn service (post-delivery mother support + newborn care); highest trust register; differentiated from Child Care; valid schema; DoD passed.

### E4-T5 — Maid Services page (`/services/maid-services`)
- **Priority:** High · **Effort:** L · **Dependencies:** E3 template certified; **D4**
- **Files Affected:** new page; sitemap
- **Regression Risk:** Low
- **Acceptance Criteria:** Scope differentiated from Housekeeping & Cook; Home-cluster
  internal links; valid schema; DoD passed.

### E4-T6 — Housekeeping / Dusting & Cleaning page (`/services/housekeeping-cleaning`)
- **Priority:** High · **Effort:** L · **Dependencies:** E3 template certified; **D4**, **D5**
- **Files Affected:** new page; sitemap
- **Regression Risk:** Low
- **Acceptance Criteria:** Cleaning/dusting/upkeep scope only (no "deep cleaning" language —
  not offered); recurring + short-notice paths; Home-cluster links; valid schema; DoD passed.

### E4-T7 — `/services/` hub page (optional but recommended)
- **Description:** A lightweight hub listing all seven services, linking to each page and
  back-linked from each breadcrumb.
- **Priority:** Medium · **Effort:** M · **Dependencies:** at least E4-T1…E4-T6 in progress
- **Files Affected:** new `/services/` index; footer/nav link
- **Regression Risk:** Low
- **Acceptance Criteria:** Hub lists exactly seven; reciprocal links with each page; valid
  `BreadcrumbList`/`ItemList` if used; DoD passed.

---

# EPIC 5 — SEO

*Goal: technical SEO correctness across homepage and service pages. No SEO-only content;
structure and accuracy only (PROJECT.md §7).*

### E5-T1 — Homepage meta / canonical / OG / Twitter verification
- **Description:** Confirm title, description, `rel=canonical`, OG and Twitter tags are
  present, accurate (canonical services), and reference a real image (depends on E1-T1).
- **Priority:** High · **Effort:** S · **Dependencies:** E1-T1, E1-T6
- **Files Affected:** `index.html`
- **Regression Risk:** Low
- **Acceptance Criteria:** All tags present and valid; OG/Twitter image resolves; preview
  renders correctly.

### E5-T2 — Homepage schema cleanup (`LocalBusiness` + `FAQPage`)
- **Description:** Update `makesOffer` to list only the canonical seven; confirm NAP, geo,
  hours; ensure `FAQPage` mirrors visible homepage FAQ.
- **Priority:** High · **Effort:** M · **Dependencies:** E1-T6
- **Files Affected:** `index.html` (JSON-LD)
- **Regression Risk:** Low
- **Acceptance Criteria:** Valid in Rich Results Test; only canonical services offered; FAQ
  schema matches visible FAQ 1:1; single canonical `@id`.

### E5-T3 — Internal-link wiring: homepage/footer → real service URLs
- **Description:** Point homepage service cards and footer service list to the real
  `/services/*` URLs as each page ships (replacing `#services` interim links). Wire related-
  service reciprocals.
- **Priority:** High · **Effort:** M · **Dependencies:** service pages exist (E3/E4)
- **Files Affected:** `index.html`, service pages
- **Regression Risk:** Medium — global footer touched.
- **Acceptance Criteria:** No dead links; each service card/footer link resolves to its page;
  clusters cross-linked honestly; old anchors still function.
- **Deployment Notes:** Roll out incrementally as pages go live; never leave a link pointing
  to a non-existent page.

### E5-T4 — `Organization` + `WebSite` schema
- **Description:** Add `Organization` and `WebSite` nodes for entity clarity.
- **Priority:** Medium · **Effort:** S · **Dependencies:** None
- **Files Affected:** `index.html`
- **Regression Risk:** Low
- **Acceptance Criteria:** Valid schema; consistent with `LocalBusiness` `@id`/NAP.

### E5-T5 — Breadcrumb schema audit across service pages
- **Description:** Verify every service page emits valid `BreadcrumbList` matching its
  visible breadcrumb and URL.
- **Priority:** Medium · **Effort:** S · **Dependencies:** E3-T10, E4-*
- **Files Affected:** service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** All breadcrumbs valid and consistent with paths.

### E5-T6 — Per-page canonical tags for service pages
- **Description:** Ensure each service page has a correct self-referential canonical.
- **Priority:** High · **Effort:** S · **Dependencies:** E3/E4 pages
- **Files Affected:** service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** Each page canonical points to its own stable URL; no cross-canonical
  errors.

### E5-T7 — Per-page OG/Twitter for service pages
- **Description:** Service-specific OG/Twitter tags (title, description, image) on each page.
- **Priority:** Medium · **Effort:** S · **Dependencies:** E3/E4 pages; E1-T1
- **Files Affected:** service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** Valid tags; images resolve; previews render per page.

### E5-T8 — Per-page `Service` structured data audit
- **Description:** Confirm each service page's `Service` node is truthful, references the
  canonical `@id`, and carries correct `areaServed`.
- **Priority:** High · **Effort:** S · **Dependencies:** E3-T10, E4-*
- **Files Affected:** service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** All `Service` nodes valid, truthful, and linked to `LocalBusiness`.

### E5-T9 — Sitemap: add service pages and maintain `lastmod`
- **Description:** Add each service URL to `sitemap.xml` as it ships; keep `lastmod` accurate.
- **Priority:** High · **Effort:** S · **Dependencies:** each page live; E1-T8
- **Files Affected:** `sitemap.xml`
- **Regression Risk:** Low
- **Acceptance Criteria:** Sitemap lists all live canonical pages; validates; no URL listed
  before it is live.
- **Deployment Notes:** Submit/refresh in Search Console (E10-T7).

---

# EPIC 6 — Analytics

*Goal: measure the actions that represent leads (PROJECT.md §16), consistently across
homepage and every service page.*

> **Baseline note (2026-07-02 audit):** the GA4 base tag was installed pre-backlog
> (commit `850f5eb`). No event tracking exists yet — `main.js` contains no
> `gtag`/`dataLayer` calls. The tasks below cover the event layer only.

### E6-T1 — Define GA4 event taxonomy
- **Description:** Specify event names/parameters for call clicks, WhatsApp clicks, form
  submissions, and a `service` parameter for attribution. Documented before implementation.
- **Priority:** High · **Effort:** S · **Dependencies:** None
- **Files Affected:** none (spec artifact)
- **Regression Risk:** Low
- **Acceptance Criteria:** A single documented taxonomy all later tasks follow.

### E6-T2 — Call-click tracking
- **Description:** Fire a GA4 event on every `tel:` interaction (header, hero, cards, sticky
  mobile, CTAs), with a `service`/location parameter where relevant.
- **Priority:** High · **Effort:** M · **Dependencies:** E6-T1
- **Files Affected:** `main.js` (and/or per-link data attributes); `index.html`
- **Regression Risk:** Medium — touches global JS.
- **Acceptance Criteria:** Event fires on all call entry points; no duplicate/lost events;
  visible in GA4 DebugView.
- **Deployment Notes:** Must respect CSP (§15).

### E6-T3 — WhatsApp-click tracking
- **Description:** GA4 event on every WhatsApp entry point (floating, hero, cards, CTAs),
  including `service` context.
- **Priority:** High · **Effort:** M · **Dependencies:** E6-T1
- **Files Affected:** `main.js`; `index.html`
- **Regression Risk:** Medium
- **Acceptance Criteria:** Event fires on all WhatsApp links; service context captured;
  DebugView confirmed.

### E6-T4 — Form-submission tracking
- **Description:** GA4 event on successful inquiry submission, including selected service.
- **Priority:** High · **Effort:** S · **Dependencies:** E6-T1
- **Files Affected:** `main.js` (submit success path)
- **Regression Risk:** Medium — inside the lead path.
- **Acceptance Criteria:** Event fires only on success; carries service tag; no interference
  with submission or cooldown behaviour.

### E6-T5 — Service-page conversion tracking rollout
- **Description:** Apply the same event taxonomy to every service page's CTAs so conversions
  are attributable per service/page.
- **Priority:** Medium · **Effort:** M · **Dependencies:** E6-T2…E6-T4; E3/E4 pages
- **Files Affected:** service pages; shared JS
- **Regression Risk:** Low
- **Acceptance Criteria:** Each service page's call/WhatsApp/form events fire with correct
  `service` attribution; verified in DebugView.

---

# EPIC 7 — Performance

*Goal: protect Core Web Vitals (PROJECT.md §14). Behaviour-preserving optimizations only.*

### E7-T1 — Hero image optimization (LCP)
- **Description:** Right-size the hero, add responsive `srcset` and modern formats
  (WebP/AVIF) with fallback, keep explicit dimensions and priority load.
- **Priority:** High · **Effort:** M · **Dependencies:** None
- **Files Affected:** `index.html`; image assets
- **Regression Risk:** Low
- **Acceptance Criteria:** LCP improves or holds; no CLS introduced; correct image served per
  viewport; graceful fallback for older browsers.
- **Deployment Notes:** Establishes the hero pattern reused by service pages.

### E7-T2 — Site-wide image audit (formats, dimensions, lazy-loading)
- **Description:** Ensure all informative images have dimensions, appropriate formats, and
  below-the-fold media is lazy-loaded (map already lazy).
- **Priority:** Medium · **Effort:** M · **Dependencies:** E7-T1
- **Files Affected:** `index.html`, service pages, assets
- **Regression Risk:** Low
- **Acceptance Criteria:** No layout shift from images; below-fold media deferred; formats
  optimized.

### E7-T3 — Font Awesome subset / self-host
- **Description:** Replace the full CDN icon CSS with a subset (or self-hosted subset) of only
  used glyphs to cut render-path weight and remove a third-party critical dependency.
- **Priority:** High · **Effort:** M · **Dependencies:** None
- **Files Affected:** `index.html`, `404.html`, service pages, assets; `netlify.toml` (CSP if
  source origin changes)
- **Regression Risk:** Medium — icons are used widely; a missing glyph is visible.
- **Acceptance Criteria:** All existing icons still render; total icon payload reduced; CSP
  updated if the origin changes; no console/font errors.
- **Deployment Notes:** Verify FAQ chevron (`::after` glyph) and brand icons specifically.

### E7-T4 — Move review loading off `window.load`
- **Description:** Fire `loadReviews` on `DOMContentLoaded` (or after observer setup) so
  testimonials aren't blocked by the heavy map iframe.
- **Priority:** Medium · **Effort:** S · **Dependencies:** None
- **Files Affected:** `main.js`
- **Regression Risk:** Low
- **Acceptance Criteria:** Reviews render sooner; fallback still works on API failure; no
  double-render.

### E7-T5 — JavaScript cleanup pass
- **Description:** Remove dead selectors (coordinated with E1-T7), confirm listeners are
  necessary and leak-free, keep JS minimal.
- **Priority:** Low · **Effort:** S · **Dependencies:** E1-T7
- **Files Affected:** `main.js`
- **Regression Risk:** Low
- **Acceptance Criteria:** No dead code; all features work; no console errors.

---

# EPIC 8 — Accessibility

*Goal: WCAG 2.2 AA across homepage and every service page (PROJECT.md §13).*

### E8-T1 — Keyboard navigation audit
- **Description:** Verify all interactive elements (nav, menu toggle, cards, CTAs, form,
  FAQ `details`) are reachable/operable by keyboard; skip link works; `Escape` closes menu.
- **Priority:** High · **Effort:** M · **Dependencies:** E2-T3 (nav changes)
- **Files Affected:** `index.html`, service pages, `main.js` (only if gaps found)
- **Regression Risk:** Low
- **Acceptance Criteria:** Full keyboard traversal with visible focus; no traps; skip link
  functional.

### E8-T2 — ARIA & semantics audit
- **Description:** Confirm landmarks, `aria-expanded`/`aria-controls` on the menu, decorative
  icons `aria-hidden`, form status roles, and heading structure on all pages.
- **Priority:** High · **Effort:** M · **Dependencies:** E3/E4 pages
- **Files Affected:** `index.html`, service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** No missing/incorrect ARIA; clean outline per page; SR smoke-test
  passes.

### E8-T3 — Color-contrast verification
- **Description:** Verify `--muted` on tinted sections and footer links on dark background meet
  AA; adjust tokens only if needed (no redesign).
- **Priority:** Medium · **Effort:** S · **Dependencies:** None
- **Files Affected:** `style.css` (token values only if failing)
- **Regression Risk:** Low
- **Acceptance Criteria:** All text/background pairs ≥ AA; visual identity preserved.

### E8-T4 — Form accessibility verification
- **Description:** Confirm labels, error announcement (`role=alert`), `aria-invalid` on
  failures, and focus management on the inquiry form (and any service-page form path).
- **Priority:** High · **Effort:** S · **Dependencies:** E2-T4
- **Files Affected:** `index.html`, `main.js`
- **Regression Risk:** Low
- **Acceptance Criteria:** Errors announced; invalid fields focus/flag correctly; labels
  associated.

### E8-T5 — Focus-state consistency
- **Description:** Ensure visible `:focus-visible` styling on all interactive elements across
  pages.
- **Priority:** Medium · **Effort:** S · **Dependencies:** E3/E4 pages
- **Files Affected:** `style.css`
- **Regression Risk:** Low
- **Acceptance Criteria:** Consistent visible focus everywhere; no removed outlines without
  replacement.

---

# EPIC 9 — Security

*Goal: maintain and tighten the security posture (PROJECT.md §15).*

### E9-T1 — CSP tightening (reduce `unsafe-inline`)
- **Description:** Externalize inline scripts (GA4 init, footer copyright IIFE) or adopt
  hash/nonce so `script-src 'unsafe-inline'` can be removed.
- **Priority:** Medium · **Effort:** M · **Dependencies:** E6 (analytics finalized)
- **Files Affected:** `index.html`, `404.html`, service pages, `netlify.toml`, `main.js`
- **Regression Risk:** High — a wrong CSP breaks scripts/analytics site-wide.
- **Acceptance Criteria:** GA4, copyright, and all scripts run under the tightened CSP; no
  console CSP violations; analytics still fire.
- **Deployment Notes:** Stage and verify on a preview deploy before production.

### E9-T2 — Security-headers verification
- **Description:** Confirm HSTS, `X-Frame-Options`, `X-Content-Type-Options`,
  `Referrer-Policy`, `Permissions-Policy` apply to all responses including new
  `/services/*` paths and that redirects (http/www → canonical) still hold.
- **Priority:** High · **Effort:** S · **Dependencies:** E3/E4 pages
- **Files Affected:** `netlify.toml`
- **Regression Risk:** Low
- **Acceptance Criteria:** Headers present on service pages; redirects verified; no header
  regressions.

### E9-T3 — Dependency review
- **Description:** Audit external origins (icon CDN, form, reviews API, analytics, map); ensure
  each is necessary, on the CSP allowlist, and minimal.
- **Priority:** Medium · **Effort:** S · **Dependencies:** E7-T3
- **Files Affected:** `netlify.toml` (CSP), page `<head>`s
- **Regression Risk:** Low
- **Acceptance Criteria:** No unused external origins; CSP allowlist matches actual usage.

### E9-T4 — Secrets review
- **Description:** Confirm no secrets/API keys are committed; placeholders used in shared code;
  real keys only in the live environment.
- **Priority:** High · **Effort:** S · **Dependencies:** None
- **Files Affected:** repository-wide (review), `index.html` (form key placeholder)
- **Regression Risk:** Low
- **Acceptance Criteria:** No secret in source history/tree; placeholder present in shared
  code; production key confirmed set in environment only.

---

# EPIC 10 — Testing

*Goal: enforce the Definition of Done (PROJECT.md §18) at the release level. These run per
deployable task and as a suite before each production push.*

### E10-T1 — Desktop test pass
- **Description:** Functional/visual verification across major desktop browsers for the
  changed surface and its neighbours.
- **Priority:** High · **Effort:** S · **Dependencies:** the task under test
- **Files Affected:** none (verification)
- **Regression Risk:** Low
- **Acceptance Criteria:** Layout/behaviour correct; no console errors.

### E10-T2 — Mobile test pass
- **Description:** Verify mobile layout, sticky call bar, floating WhatsApp, menu, and
  above-the-fold CTAs on real/emulated devices.
- **Priority:** High · **Effort:** S · **Dependencies:** the task under test
- **Files Affected:** none
- **Regression Risk:** Low
- **Acceptance Criteria:** Mobile conversion elements reachable above the fold; menu and
  stickies work.

### E10-T3 — Regression test pass
- **Description:** Confirm existing pages, anchors, footer links, and features still work
  after each change (backwards compatibility).
- **Priority:** Critical · **Effort:** M · **Dependencies:** the task under test
- **Files Affected:** none
- **Regression Risk:** Low
- **Acceptance Criteria:** No existing URL/anchor/feature broken; form and reviews still
  function.

### E10-T4 — SEO validation
- **Description:** Validate titles, descriptions, canonicals, headings, and internal links on
  changed pages.
- **Priority:** High · **Effort:** S · **Dependencies:** E5-*
- **Files Affected:** none
- **Regression Risk:** Low
- **Acceptance Criteria:** All SEO elements correct and canonical-service-accurate.

### E10-T5 — Structured-data validation
- **Description:** Run Rich Results / schema validation on homepage and each service page.
- **Priority:** High · **Effort:** S · **Dependencies:** E5-T2, E3-T10, E4-*, E5-T8
- **Files Affected:** none
- **Regression Risk:** Low
- **Acceptance Criteria:** All JSON-LD valid; schema mirrors visible content; single `@id`.

### E10-T6 — Lighthouse pass
- **Description:** Run Lighthouse (performance, accessibility, best practices, SEO) on changed
  pages; record scores; address regressions.
- **Priority:** High · **Effort:** S · **Dependencies:** E7-*, E8-*
- **Files Affected:** none
- **Regression Risk:** Low
- **Acceptance Criteria:** Scores meet/beat the pre-change baseline; no new critical audit
  failure.

### E10-T7 — Analytics verification
- **Description:** Confirm call/WhatsApp/form events (and service attribution) fire correctly
  in GA4 DebugView across homepage and service pages.
- **Priority:** High · **Effort:** S · **Dependencies:** E6-*
- **Files Affected:** none
- **Regression Risk:** Low
- **Acceptance Criteria:** All lead events fire once, with correct parameters; no missing/dupe
  events.

### E10-T8 — Search Console validation
- **Description:** After service pages ship, submit/refresh the sitemap, request indexing, and
  monitor coverage/enhancements for errors.
- **Priority:** Medium · **Effort:** S · **Dependencies:** E5-T9, pages live
- **Files Affected:** none
- **Regression Risk:** Low
- **Acceptance Criteria:** Sitemap accepted; new URLs discovered; no coverage errors; schema
  enhancements report clean.

---

# EPIC DS — Design System Foundation & Component Migration

*Goal: a token-based design system (color, radius, spacing, elevation) that is the single
source of visual truth, adopted component-by-component with zero unreviewed visual change.
Implements PROJECT.md §11 and the v1.2 Design Token System amendment.*

> **Governing rules for this epic:**
> - Components consume tokens; new work never introduces new hardcoded visual values.
> - **Value-neutral** tokenization (identical rendered output) is low-risk refactoring
>   under Engineering Principle 3 and may interleave with other epics.
> - Any migration that **changes appearance** is a UI change requiring explicit approval
>   per PROJECT.md §19 before it ships.
> - **Epic 1 (Rule of Truth) outranks DS polish.** DS work touching the services section
>   must coordinate with E1-T3/E1-T4, whose card set will change.
> - **ID mapping note:** in-code CSS comments label the foundation scales "DS-1"; the
>   canonical task IDs are DS-2A/DS-2B below. Align the comments in the next
>   CSS-touching DS ticket — not as a standalone edit.

### DS-2A — Color token foundation
- **Status:** ✅ Completed (commit `30bf463`, 2026-07-01)
- **Description:** Introduce primitive color scales (`--primary-50…900`, neutrals,
  semantic status colors), surface tokens, and brand aliases; re-point existing
  compatibility tokens (`--bg`, `--text`, `--primary`, …) value-identically. Legacy
  `--blue` / `--section-blue` marked deprecated in-code (no new consumers; retired in
  DS-3C).
- **Priority:** High · **Effort:** M · **Dependencies:** None
- **Files Affected:** `assets/css/style.css` (`:root` only)
- **Regression Risk:** Low (value-identical re-pointing)
- **Acceptance Criteria:** Rendered output unchanged; all legacy tokens resolve to
  identical values; deprecation policy documented in-code. *(Delivered value-neutral.)*

### DS-2B — Radius / Spacing / Elevation token foundation
- **Status:** ✅ Completed (commit `d628cd0`, 2026-07-01)
- **Description:** Introduce the `--radius-*` scale, the 4px-base `--space-*` scale, and
  `--elevation-e1…e4`. Foundation only: the compatibility token `--radius: 8px` remains
  the active consumer token; no component consumed the new scales at completion time.
- **Priority:** High · **Effort:** S · **Dependencies:** DS-2A
- **Files Affected:** `assets/css/style.css` (`:root` only)
- **Regression Risk:** Low (additive, unconsumed)
- **Acceptance Criteria:** Rendered output unchanged; scales documented in-code as
  foundation-only. *(Delivered value-neutral.)*

### DS-2C — Typography scale foundation *(proposed — not yet approved)*
- **Status:** ⬜ Proposed — requires explicit approval before any work begins; listed so
  the foundation stream is complete.
- **Description:** Introduce a type-scale token set (sizes, weights, line-heights)
  following the DS-2A/DS-2B foundation-only pattern (additive, unconsumed at delivery).
- **Priority:** Low · **Effort:** S · **Dependencies:** None (foundation-only, additive)
- **Files Affected:** `assets/css/style.css` (`:root` only)
- **Regression Risk:** Low
- **Acceptance Criteria:** Rendered output unchanged; scale documented as foundation-only.

### DS-3A — Service Card token migration
- **Status:** 🔶 In progress — **Direction A "Conservative Premium Healthcare" approved
  2026-07-02** after a three-direction design review (A Conservative Premium / B Modern
  Home Care / C Luxury Concierge). Work moved off `main` to feature branch
  `ds-3a-service-card` and amended per the approved spec:
  **kept** — token adoption, `--space-24` padding, 44px `--primary-50` tinted icon chip,
  `--elevation-e1` at rest, `:focus-within` (`--primary-500` border), `--space-20` grid
  gap; **amended** — radius `--radius-lg`→`--radius-md`, hover lift+border → shadow-only
  deepen to `--elevation-e2`; **extended** — typography hierarchy (service-card h4
  1.03→1.14rem, bullets weight 700→600, CTAs weight 900→700 with 44px min-height,
  service-card-scoped selectors only). In-code "DS-1" comment IDs aligned to DS-2B.
  Awaiting §19 visual sign-off and DoD pass; certification still waits for E1-T3/E1-T4
  per the dependency note below.
- **Description:** Migrate `.service-card` (icon, points list, actions, and grid context)
  to the DS token scales. Appearance changes require §19 approval before ship.
- **Priority:** Medium · **Effort:** M
- **Dependencies:** DS-2A, DS-2B; **coordinate with E1-T3/E1-T4** — the card set will
  change; do not certify this migration until the canonical seven are in place.
- **Files Affected:** `assets/css/style.css`
- **Regression Risk:** Medium — highest-traffic section; hover/focus and responsive grid
  behaviour must hold at all breakpoints.
- **Acceptance Criteria:** No hardcoded visual values remain in service-card scope;
  approved visual deltas documented; all breakpoints verified; focus states accessible;
  DoD passed.
- **Deployment Notes:** Continuation moves to a feature branch per PROJECT.md §17.

### DS-3B — Buttons & CTA components migration
- **Status:** ⬜ Pending
- **Description:** Migrate header/hero/service/CTA buttons (including WhatsApp variants,
  floating WhatsApp, sticky mobile Call) to token scales; value-neutral unless deltas
  are explicitly approved.
- **Priority:** Medium · **Effort:** M · **Dependencies:** DS-2A, DS-2B
- **Files Affected:** `assets/css/style.css`
- **Regression Risk:** Medium — buttons are the conversion surface (§12); above-the-fold
  CTA layout must not shift.
- **Acceptance Criteria:** All button styles token-driven; conversion surfaces visually
  and behaviourally unchanged unless approved; DoD passed.

### DS-3C — Trust / process / testimonial cards migration (+ legacy blue retirement)
- **Status:** ⬜ Pending
- **Description:** Migrate trust, process, and testimonial cards to tokens; retire the
  deprecated `--blue` / `--section-blue` by mapping process-step icons and the inquiry
  section tint to the forward palette. This is a deliberate visual change — the
  replacement colors require §19 approval.
- **Priority:** Medium · **Effort:** M · **Dependencies:** DS-2A, DS-2B
- **Files Affected:** `assets/css/style.css`
- **Regression Risk:** Medium — visible accent change on process/inquiry sections.
- **Acceptance Criteria:** No `--blue`/`--section-blue` consumers remain; deprecated
  tokens removed from `:root`; approved replacement documented; DoD passed.

### DS-3D — Form & inquiry section migration
- **Status:** ⬜ Pending
- **Description:** Migrate the inquiry form (fields, validation states, status messages)
  to tokens, preserving validation behaviour and accessibility roles.
- **Priority:** Medium · **Effort:** M · **Dependencies:** DS-2A, DS-2B; coordinate with
  E2-T4 (validation change) and E8-T4 (form a11y) to avoid double-touching.
- **Files Affected:** `assets/css/style.css`
- **Regression Risk:** Medium — inside the lead-capture path.
- **Acceptance Criteria:** Form fully token-driven; submission, validation, and
  error/success states unchanged; DoD passed.

### DS-3E — Header / footer migration
- **Status:** ⬜ Pending
- **Description:** Migrate header, nav, and footer to tokens; verify footer text contrast
  on `--surface-inverse` (feeds E8-T3).
- **Priority:** Low · **Effort:** M · **Dependencies:** DS-2A, DS-2B; coordinate with
  E2-T3 (nav trim).
- **Files Affected:** `assets/css/style.css`
- **Regression Risk:** Medium — global chrome on every page.
- **Acceptance Criteria:** Header/footer token-driven; contrast ≥ AA on the dark footer;
  no layout shift; DoD passed.

### DS-4 — Legacy compatibility-token retirement
- **Status:** ⬜ Pending
- **Description:** Once DS-3A…DS-3E land, remove legacy compatibility tokens
  (`--radius`, `--shadow-sm/md/lg/xl`, and special-purpose shadows that gained elevation
  equivalents) or re-point them as thin aliases, leaving a single token vocabulary.
- **Priority:** Low · **Effort:** S · **Dependencies:** DS-3A…DS-3E all complete
- **Files Affected:** `assets/css/style.css`
- **Regression Risk:** Low if truly unconsumed — verify with a full-file audit first.
- **Acceptance Criteria:** No orphaned tokens; no visual change; single coherent scale
  vocabulary in `:root`; DoD passed.

---

# EPIC SP — Service Page Implementation

*Goal: implement the service-page system against the frozen architecture.
**Architecture milestone: ✅ Complete (2026-07-03)** — `SERVICE_PAGE_SPEC.md`
**FROZEN v1.2** (approval: granted; repository record: the documentation freeze
commit), the canonical specification for all service pages (PROJECT.md §10,
v1.3 amendment).*

> **Relationship to existing epics (no duplication, no renumbering):**
> - **Epic 3** still builds and certifies the Patient Care page and the reusable
>   template; **Epic 4** still fills the certified template for the remaining six.
>   Both now build against `SERVICE_PAGE_SPEC.md` v1.2 — the "approved section
>   order" in E3-T1 is the frozen spec's slot order (breadcrumb · hero + optional
>   emergency band · scope · who-it's-for + decision aid · journey · pricing ·
>   trust + evidence block · mid CTA · FAQ · areas · related · end CTA · footer).
> - This epic holds only the **cross-cutting, spec-introduced work** that no
>   existing task covers. Existing task IDs, scopes, and dependencies are unchanged.
> - The spec's decision gates (SERVICE_PAGE_SPEC.md §12) bind every task below;
>   E6-T1 (GA4 event taxonomy) should complete before Epic 3 ships (spec gate 5).

### SP-T1 — Canonical URL file & trailing-slash strategy
- **Description:** Decide the service-page file strategy (`/services/{slug}.html`
  vs `/services/{slug}/index.html`) and the canonical trailing-slash form;
  configure Netlify so exactly one URL form returns 200 and all variants 301;
  record the decision. Canonical tags, sitemap entries, schema `url`s, breadcrumbs,
  and every internal link use the single chosen form (spec §4.3, gate 3).
- **Priority:** Critical · **Effort:** S · **Dependencies:** None — **gates E3-T1**
- **Files Affected:** `netlify.toml` (at implementation)
- **Regression Risk:** Low (additive config; no existing URL touched)
- **Acceptance Criteria:** Decision recorded; on a preview deploy exactly one form
  serves 200 and all variants 301; settled before the first service page ships.

### SP-T2 — Cross-page form pre-select mechanism
- **Description:** Additive `main.js` reader for a service parameter on `/#contact`
  (e.g. `?service=Patient%20Care`) that pre-selects the matching form `<option>`,
  enabling service-page end CTAs (spec §6, gate 4). Existing same-page
  `data-service` behaviour unchanged.
- **Priority:** High · **Effort:** S · **Dependencies:** E1-T5 — **gates E3-T11**
- **Files Affected:** `main.js`
- **Regression Risk:** Medium — touches lead-path JS.
- **Acceptance Criteria:** Parameterized link pre-selects the service; same-page
  autofill unchanged; submission unaffected; unknown values no-op gracefully.

### SP-T3 — Pricing factors block ("How Pricing Works")
- **Description:** Build the shared pricing-transparency component per spec §3.3 —
  the four factors (service, duration, shift, requirements), no figures, no price
  schema; shared copy with service-adjusted examples.
- **Priority:** High · **Effort:** S · **Dependencies:** E3-T1 (template slot)
- **Files Affected:** service-page template/pages; `style.css` only if a strictly
  needed additive, token-only class (spec §3.0)
- **Regression Risk:** Low
- **Acceptance Criteria:** Contract §3.3 satisfied on every page; consistent with
  the charges FAQ; no price figure anywhere.

### SP-T4 — Service Decision Aid component
- **Description:** Embedded "Not sure which service you need?" per spec §3.2 —
  ≤ 60 words plus one sibling link, pair-mapped. Care-cluster pairs
  (Patient ↔ Elder; Mother & Newborn ↔ Child) can ship now; Home Support pair
  copy is **D4-gated**.
- **Priority:** Medium · **Effort:** S · **Dependencies:** E3-T1; **D4** (Home
  Support pairs only)
- **Files Affected:** service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** Contract §3.2 honored; pair mapping per the spec table;
  never a comparison table.

### SP-T5 — Emergency Assistance band + D5 activation ledger
- **Description:** Build the calm urgent-path band per spec §3.1 (ships OFF on
  every page); establish the per-service ON/OFF ledger; activate per service only
  on a recorded D5 confirmation (Patient Care is the expected first candidate).
- **Priority:** Medium · **Effort:** S · **Dependencies:** E3-T1; **D5** per
  activation (spec gates 2 and 7)
- **Files Affected:** service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** Contract §3.1 honored (≤ 30 words, Call only, no
  urgency marketing, no response-time guarantees); all-OFF default; ledger entry
  recorded before any activation.

### SP-T6 — Evidence Block + evidence ledger
- **Description:** Build the structured trust-proof component per spec §3.4 inside
  the trust section; establish the evidence ledger (claim · source · verified-on).
  Only ledger-backed items ship; unverifiable numbers become qualitative statements
  of real practice.
- **Priority:** High · **Effort:** M · **Dependencies:** E3-T1; business
  verification of every claim (spec gate 8)
- **Files Affected:** service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** Every shipped figure ledger-backed; no ratings/awards
  markup; calm presentation (no animated counters or invented seals).

### SP-T7 — Imagery standards adoption
- **Description:** Apply spec §8 to service-page imagery: staff photo consent
  process; hero aspect ratio fixed at template certification; E7-T1 technical
  pattern; the existing honest hero reused until real photography exists — never
  stock or AI imagery as a bridge.
- **Priority:** Medium · **Effort:** M · **Dependencies:** coordinate with E7-T1;
  aspect ratio fixed at E3-T12
- **Files Affected:** image assets; service pages
- **Regression Risk:** Low
- **Acceptance Criteria:** Spec §8 rules verifiably met on every shipped page;
  written consent recorded for every identifiable staff member shown.

### SP-T8 — Content freshness governance operationalization
- **Description:** Stand up the spec §7 review cycle: 6-month cadence plus event
  triggers; Reviewed/Updated outcomes recorded via CHANGELOG.md and commit
  history; the optional honest "Content reviewed" line convention; sitemap
  `lastmod` refresh on Updated outcomes.
- **Priority:** Medium · **Effort:** S · **Dependencies:** first service page live
- **Files Affected:** none initially (process); `sitemap.xml`/pages on Updated
  outcomes
- **Regression Risk:** Low
- **Acceptance Criteria:** First review date scheduled as each page ships;
  Reviewed/Updated convention visible in practice (CHANGELOG lines); no
  decorative freshness stamps.

---

## Suggested Execution Order (dependency-aware)

1. **Epic 1** (foundation cleanup) — resolves D1/D2 gates, fixes assets, truth-aligns the
   homepage.
2. **Epic 2** (homepage refinement) — hub/funnel sharpening on the cleaned base.
3. **Epic 3** (Patient Care) — builds and *certifies* the reusable service-page template.
4. **Epic 4** (remaining pages) — fills the certified template; order: Elder Care & Home Cook
   Services first (Critical), then Child, Mother & Newborn, Maid, Housekeeping.
5. **Epic 5 / 6** — run alongside 3–4 (each page ships with SEO + analytics wired).
6. **Epic 7 / 8 / 9** — optimization and hardening, largely parallelizable; E9-T1 (CSP) after
   analytics is final.
7. **Epic 10** — gates every deployable task and every production release.
8. **Epic DS** (design system) — runs as a *parallel, subordinate* stream: value-neutral
   token migrations may interleave with any phase; appearance-changing migrations
   (e.g. DS-3A on the services section, DS-3C accent retirement) queue behind Epic 1
   completion for the affected section and behind explicit §19 approval.

> **2026-07-03 amendment (spec freeze):** the Service Page Architecture milestone
> is complete — `SERVICE_PAGE_SPEC.md` **FROZEN v1.2** is the canonical
> specification. **EPIC SP** joins the order as follows: SP-T1 (URL strategy) and
> E6-T1 (event taxonomy) precede E3-T1; SP-T2…SP-T6 interleave with Epic 3 and
> certify with the template (E3-T12); SP-T7 coordinates with E7-T1; SP-T8 begins
> when the first page goes live. Epics 3–4 build against the frozen spec.

---

## In-Flight / Parked Work (as of 2026-07-03)

- **Service Page Architecture milestone ✅ complete (2026-07-03):**
  `SERVICE_PAGE_SPEC.md` **FROZEN v1.2** — approval: granted; canonical
  specification for all service-page work. Documentation synchronized
  (PROJECT.md §10 v1.3 amendment + Documentation Hierarchy; EPIC SP added to this
  backlog; CHANGELOG.md entries); repository record: the documentation freeze
  commit.
- **E1-T2 completion and D1/D2 resolutions recorded 2026-07-03** (this document's status
  ledger); uncommitted pending review. No site code changed — analysis/decision task.
- **E1-T3 reconciliation implemented 2026-07-03** (`index.html` services section +
  additive form options); uncommitted on `ds-3a-service-card`, pending review. After
  review corrections (Patient Care wording, Home Cook card pulled forward from E1-T4,
  Home Support order), the section shows all 7 canonical services. Home Cook copy is
  draft pending D4.

- **DS-3A working diff** now lives on feature branch `ds-3a-service-card` (2026-07-02):
  Direction A approved and the diff amended per the approved spec (see DS-3A Status).
  Still uncommitted, awaiting §19 visual sign-off; nothing merges to `main` until review
  and the DoD pass. The prior "parked on `main`" state is resolved.
- **Documentation amendments** (BACKLOG.md status ledger + EPIC DS, PROJECT.md v1.2
  token amendment + High-Level Roadmap, new CHANGELOG.md) are approved but uncommitted
  in the same working tree, pending a commit decision.
- **Process reminder:** recent work was committed directly to `main`. PROJECT.md §17
  requires feature branches with review before merge; all subsequent tasks — including
  DS-3A's continuation — follow the branch → review → deploy flow.

> **Backlog status:** living document. Update task state as work ships; never mark a task done
> until its Acceptance Criteria *and* the standing Definition of Done are both satisfied and the
> change is production-reviewed.
