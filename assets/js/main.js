document.addEventListener("DOMContentLoaded", () => {
  // ========== DOM ELEMENTS ==========
  const menuToggle = document.getElementById("menuToggle");
  const primaryNavigation = document.getElementById("primaryNavigation");
  const serviceSelect = document.getElementById("serviceSelect");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const testimonialGrid = document.getElementById("testimonialGrid");
  const urgencySelect = document.getElementById("urgencySelect");

  // ========== ANALYTICS — GA4 EVENT LAYER (P3 · E6-T1…T4) ==========
  // The gtag.js base tag and window.dataLayer are initialised in the <head> of
  // index.html. This layer adds EVENTS ONLY. It deliberately does not:
  //   · initialise GA          — already done in the page head
  //   · fire page_view         — gtag('config') already sends it; a manual
  //                              page_view here would double-count every session
  //   · touch the DOM, styling, markup, or the lead path
  // It is a silent no-op wherever GA is absent (404.html, ad-blockers, offline)
  // and every entry point is wrapped so measurement can never throw into the
  // form or navigation code paths.

  const ANALYTICS_TEXT_LIMIT = 60;

  // Sends a GA4 event. Prefers gtag(); falls back to queueing on dataLayer in
  // the exact shape gtag.js consumes if the library has not parsed yet. If
  // neither exists, does nothing and creates nothing (no global pollution).
  function trackEvent(eventName, params) {
    try {
      if (!eventName) return;
      const payload = params || {};

      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, payload);
      } else if (Array.isArray(window.dataLayer)) {
        (function queueForGtag() {
          window.dataLayer.push(arguments);
        })("event", eventName, payload);
      }
    } catch (error) {
      /* Measurement must never break the page. Swallow deliberately. */
    }
  }

  // Nearest section id — gives every click a page-region context without
  // adding a single attribute to the HTML. Falls back to the landmark region
  // so header and footer entry points are attributable too.
  function analyticsSection(element) {
    try {
      const section = element.closest("section[id]");
      if (section && section.id) return section.id;
      if (element.closest("header")) return "header";
      if (element.closest("footer")) return "footer";
      if (element.closest("nav")) return "nav";

      // A <section> carrying no id — use its first class, minus the suffix.
      const unnamed = element.closest("section[class]");
      if (unnamed) {
        const sectionToken = (unnamed.getAttribute("class") || "").trim().split(/\s+/)[0];
        if (sectionToken) return sectionToken.replace(/-section$/, "");
      }

      // Free-floating element such as the mobile sticky call bar — the single
      // highest-intent mobile CTA, so it must not fall through to "unknown".
      const ownToken = (element.getAttribute("class") || "").trim().split(/\s+/)[0];
      return ownToken || "unknown";
    } catch (error) {
      return "unknown";
    }
  }

  // Visible link text, collapsed and truncated. Never user-entered content.
  function analyticsLabel(element) {
    try {
      const text = (element.textContent || "").replace(/\s+/g, " ").trim();
      return text ? text.slice(0, ANALYTICS_TEXT_LIMIT) : "";
    } catch (error) {
      return "";
    }
  }

  // Service attribution for a clicked element: explicit data-service first,
  // then the enclosing service card's heading. Returns "" when neither exists.
  function analyticsService(element) {
    try {
      const tagged = element.closest("[data-service]");
      if (tagged && tagged.dataset.service) return tagged.dataset.service;

      const card = element.closest(".service-card");
      const heading = card ? card.querySelector("h4, h3") : null;
      return heading ? heading.textContent.replace(/\s+/g, " ").trim() : "";
    } catch (error) {
      return "";
    }
  }

  // Form field readers. Only non-identifying selections are ever read — name,
  // phone, location and message are never touched by the measurement layer.
  function selectedService() {
    return serviceSelect && serviceSelect.value ? serviceSelect.value : "";
  }

  function selectedUrgency() {
    return urgencySelect && urgencySelect.value ? urgencySelect.value : "";
  }

  // ---- One delegated click listener for the whole document ----
  // Delegation is the guarantee against duplicate listeners: exactly one
  // handler is bound regardless of how many links exist, and it also covers
  // markup injected later (e.g. the testimonial grid).
  document.addEventListener("click", (event) => {
    try {
      const target = event.target;
      if (!target || typeof target.closest !== "function") return;

      const link = target.closest("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (!href) return;

      const section = analyticsSection(link);
      const label = analyticsLabel(link);
      const service = analyticsService(link);

      // 1 · Call clicks — every tel: entry point.
      if (href.toLowerCase().startsWith("tel:")) {
        trackEvent("call_click", {
          link_section: section,
          link_text: label,
          service: service,
        });
        return;
      }

      // 2 · WhatsApp clicks — checked before the generic external-link branch
      //     so a WhatsApp click is never counted twice.
      if (href.toLowerCase().indexOf("wa.me") !== -1) {
        trackEvent("whatsapp_click", {
          link_section: section,
          link_text: label,
          service: service,
        });
        return;
      }

      // 3 · Service selected via a service-card CTA. These are internal
      //     (#inquiry) anchors, so this cannot collide with the branches above.
      if (link.hasAttribute("data-service")) {
        trackEvent("service_selected", {
          service: link.dataset.service || "",
          method: "service_card",
          link_section: section,
        });
        return;
      }

      // 4 · External link clicks — any other absolute link off this origin.
      if (/^https?:\/\//i.test(href)) {
        let destination = null;
        try {
          destination = new URL(href, window.location.href);
        } catch (error) {
          return;
        }
        if (destination.hostname && destination.hostname !== window.location.hostname) {
          trackEvent("external_link_click", {
            link_section: section,
            link_text: label,
            link_domain: destination.hostname,
            link_url: destination.href.slice(0, 200),
          });
        }
      }
    } catch (error) {
      /* Never let measurement interfere with a click. */
    }
  });

  // ---- Service selected via the dropdown ----
  // Programmatic assignment (the data-service auto-fill below) does not emit a
  // change event, so this fires only on genuine user selection — no double count.
  serviceSelect?.addEventListener("change", () => {
    if (!serviceSelect.value) return;
    trackEvent("service_selected", {
      service: serviceSelect.value,
      method: "dropdown",
      link_section: analyticsSection(serviceSelect),
    });
  });

  // ---- Inquiry form started ----
  // First genuine interaction with any field, once per page load.
  let inquiryFormStartTracked = false;
  contactForm?.addEventListener("focusin", () => {
    if (inquiryFormStartTracked) return;
    inquiryFormStartTracked = true;
    trackEvent("inquiry_form_started", {
      service: selectedService(),
    });
  });

  // ========== MENU TOGGLE ==========
  function setMenuState(isOpen) {
    if (!menuToggle || !primaryNavigation) return;
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    primaryNavigation.classList.toggle("active", isOpen);
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenuState(!isOpen);
  });

  primaryNavigation?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  // ========== SERVICE SELECT AUTO-FILL ==========
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      if (!serviceSelect) return;
      serviceSelect.value = link.dataset.service || "";
    });
  });

  // ---- Cross-page service intent (?service=…) ----
  // The auto-fill above only works when the link and the form share a page. A
  // CTA on /services/ navigates here instead, so the intent travels in the
  // query string and is applied on arrival — the visitor does not re-select a
  // service they have already chosen.
  //
  // Only a value that exactly matches an existing <option> is accepted, so the
  // parameter can never inject an arbitrary string into a submitted lead.
  // Assignment is deliberately programmatic and fires no `change` event: the
  // originating click already emitted `service_selected` on the source page,
  // and a second event here would double-count the same choice.
  (function applyServiceFromQuery() {
    try {
      if (!serviceSelect || !window.location.search) return;

      const requested = new URLSearchParams(window.location.search).get("service");
      if (!requested) return;

      const match = Array.from(serviceSelect.options).find(
        (option) => option.value && option.value === requested
      );
      if (match) serviceSelect.value = match.value;
    } catch (error) {
      /* A malformed query string must never break the form. */
    }
  })();

  // ========== FORM UTILITIES ==========
  function cleanValue(value) {
    return String(value || "")
      .trim()
      .replace(/<[^>]*>?/gm, "");
  }

  function setMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = `form-message ${type ? `is-${type}` : ""}`.trim();
  }

  function clearErrors(form) {
    form.querySelectorAll(".field-error").forEach((field) => {
      field.classList.remove("field-error");
      field.removeAttribute("aria-invalid");
    });
  }

  // ========== FORM SUBMISSION ==========
  contactForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot?.checked) return;

    clearErrors(form);
    setMessage("", "");

    const requiredFields = Array.from(form.querySelectorAll("[required]"));
    let firstInvalidField = null;

    requiredFields.forEach((field) => {
      field.value = cleanValue(field.value);
      if (!field.value) {
        field.classList.add("field-error");
        field.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) firstInvalidField = field;
      }
    });

    const phoneField = form.querySelector('input[name="phone"]');
    if (phoneField) {
      phoneField.value = phoneField.value.replace(/\D/g, "").slice(-10);
      if (!/^[6-9]\d{9}$/.test(phoneField.value)) {
        phoneField.classList.add("field-error");
        phoneField.setAttribute("aria-invalid", "true");
        if (!firstInvalidField) firstInvalidField = phoneField;
      }
    }

    if (firstInvalidField) {
      trackEvent("inquiry_form_failed", {
        failure_type: "validation",
        field: firstInvalidField.name || firstInvalidField.id || "unknown",
        service: selectedService(),
      });
      setMessage("Please fill in all the required fields, including a valid 10-digit phone number.", "error");
      firstInvalidField.focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonHTML = submitButton?.innerHTML || "Send My Request";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    form.setAttribute("aria-busy", "true");

    let submissionSucceeded = false;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Submission failed");
      }

      // Read the selections BEFORE reset() clears them.
      const submittedService = selectedService();
      const submittedUrgency = selectedUrgency();

      form.reset();
      setMessage("Thank you. We've received your request. Someone from our team will call you soon.", "success");
      submissionSucceeded = true;

      trackEvent("inquiry_form_submitted", {
        service: submittedService,
        urgency: submittedUrgency,
      });
    } catch (error) {
      trackEvent("inquiry_form_failed", {
        failure_type: "submission",
        service: selectedService(),
      });
      setMessage("Something went wrong. Please try again or call us directly — we're here to help.", "error");
    } finally {
      form.removeAttribute("aria-busy");

      if (submissionSucceeded && submitButton) {
        let remaining = 60;
        submitButton.textContent = `Sent — please wait ${remaining}s`;
        const countdown = setInterval(() => {
          remaining -= 1;
          if (remaining <= 0) {
            clearInterval(countdown);
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonHTML;
          } else {
            submitButton.textContent = `Sent — please wait ${remaining}s`;
          }
        }, 1000);
      } else if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonHTML;
      }
    }
  });

  // ========== TESTIMONIALS ==========
  // Only real, approved reviews returned by the sheet are ever rendered. There
  // is deliberately NO fallback/seed/demo review data here: a fabricated or
  // padded testimonial is exactly what the honesty standard forbids, and the
  // seven service pages already withhold testimonials for the same reason
  // (SERVICE_PAGE_SPEC.md §3.4 — nothing ships until it is real and
  // attributable). Where there is nothing verified to show, the section says so.
  const reviewAPI =
    "https://script.google.com/macros/s/AKfycbwLeL7ISz3a6s6ogP8BY_B7xsS56tK4fxsJcWnzXSYWtEiRxtAPiy9hLDheezCC-6rzZQ/exec";

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      };
      return entities[character];
    });
  }

  function normalizeReviews(payload) {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.reviews)) return payload.reviews;
    if (Array.isArray(payload?.data)) return payload.data;
    return [];
  }

  function isApprovedReview(review) {
    const approvalKeys = ["approved", "approval", "status", "isApproved", "Approved", "Status"];
    const presentKey = approvalKeys.find((key) => Object.prototype.hasOwnProperty.call(review, key));

    // Fail CLOSED. If the source supplies no approval column at all, nothing is
    // publishable — previously this returned true, which published every row in
    // the sheet unreviewed onto the homepage. On a business that places staff
    // inside customers' homes, an unmoderated publication path is not
    // acceptable, and "no approval signal" is not the same as "approved".
    if (!presentKey) return false;

    const value = String(review[presentKey]).trim().toLowerCase();
    return ["approved", "approve", "yes", "true", "1", "published"].includes(value);
  }

  function getReviewValue(review, keys, fallback = "") {
    const key = keys.find((item) => review[item] !== undefined && review[item] !== null && String(review[item]).trim() !== "");
    return key ? review[key] : fallback;
  }

  // Returns a 1–5 rating, or null when the source supplied nothing usable.
  // Previously this returned 5 on the fallthrough, so a row with a missing or
  // unparseable rating rendered five filled stars and an aria-label announcing
  // "5 out of 5" that the customer never gave. A rating we do not have is not
  // a five; it is nothing, and the caller renders no stars for it.
  function getRating(rating) {
    const normalized = String(rating ?? "").trim().toLowerCase();
    const parsed = Number.parseInt(normalized, 10);

    if (parsed) return Math.min(5, Math.max(1, parsed));
    if (normalized.includes("very good")) return 4;
    if (normalized.includes("good")) return 3;
    return null;
  }

  function getInitials(name) {
    const words = String(name || "QC")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2);

    return words.map((word) => word.charAt(0).toUpperCase()).join("") || "QC";
  }

  // Honest empty state. Reuses the existing review-card component and shared
  // styles only — no new CSS, and no inline style attributes (the production
  // CSP's style-src does not permit them). Makes no claim about how many
  // reviews exist, invents no customer, and promises no rating.
  function renderReviewsEmptyState() {
    testimonialGrid.innerHTML = `
      <article class="testimonial-card">
        <p>We only publish reviews that come from families we have actually worked with, in their own words. As those come in, they will appear here.</p>
        <p>If we have arranged care for your family and you would like to share your experience, we would be glad to hear from you.</p>
      </article>
    `;
  }

  function renderReviews(reviews) {
    if (!testimonialGrid) return;

    const approvedReviews = reviews
      .filter(isApprovedReview)
      .filter((review) => getReviewValue(review, ["review", "Review", "message", "Message", "feedback", "Feedback"], ""));

    // Show only what is genuinely approved, capped at six. Never padded.
    const displayReviews = approvedReviews.slice(0, 6);

    if (!displayReviews.length) {
      renderReviewsEmptyState();
      return;
    }

    testimonialGrid.innerHTML = displayReviews
      .map((review) => {
        // No invented attribution and no invented rating. Both default to the
        // empty value so an absent field stays absent instead of becoming a
        // fabricated "Quality Care Family" author or a fabricated 5 stars.
        const name = escapeHTML(getReviewValue(review, ["name", "Name", "author", "Author"], ""));
        const text = escapeHTML(getReviewValue(review, ["review", "Review", "message", "Message", "feedback", "Feedback"], ""));
        const rating = getRating(getReviewValue(review, ["rating", "Rating"], ""));

        // Stars only when a rating genuinely came through.
        const ratingHTML = rating
          ? `<div class="rating" aria-label="${rating} out of 5 rating">${"\u2605".repeat(rating)}</div>`
          : "";

        // Attribution block only when a name genuinely came through. An
        // unattributed review still shows its own words; it just does not
        // borrow someone else's name to do it.
        const headerHTML = name
          ? `<div class="review-header">
              <span class="review-avatar" aria-hidden="true">${escapeHTML(getInitials(name))}</span>
              <div>
                <strong>${name}</strong>
                ${ratingHTML}
              </div>
            </div>`
          : ratingHTML;

        // Conditionally extract metadata
        const service = escapeHTML(getReviewValue(review, ["service", "Service", "category", "Category"], ""));
        const city = escapeHTML(getReviewValue(review, ["city", "City", "location", "Location"], ""));
        const date = escapeHTML(getReviewValue(review, ["date", "Date", "reviewDate", "createdAt", "timestamp"], ""));

        let metaHTML = "";
        if (service || city || date) {
          let metaBits = [];
          if (service) metaBits.push(`<span><i class="fa-solid fa-briefcase-medical" aria-hidden="true"></i> ${service}</span>`);
          if (city) metaBits.push(`<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${city}</span>`);
          if (date) metaBits.push(`<span><i class="fa-regular fa-calendar" aria-hidden="true"></i> ${date}</span>`);
          metaHTML = `<div class="review-meta">${metaBits.join("")}</div>`;
        }

        return `
          <article class="testimonial-card">
            ${headerHTML}
            <p>${text}</p>
            ${metaHTML}
          </article>
        `;
      })
      .join("");
  }

  async function loadReviews() {
    if (!testimonialGrid) return;

    try {
      const response = await fetch(reviewAPI, { method: "GET" });
      const payload = await response.json();
      renderReviews(normalizeReviews(payload));
    } catch (error) {
      // Unreachable endpoint, HTTP error, or unparseable payload. We have
      // nothing verified to show, so we say that rather than substitute copy.
      renderReviews([]);
    }
  }

  // ========== FADE-IN ANIMATION ==========
  const revealTargets = document.querySelectorAll(
    ".section-header, .trust-card, .service-card, .process-card, .testimonial-card, .about-placeholder, .area-card, .contact-form"
  );
  revealTargets.forEach((el) => el.classList.add("fade-in"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    // Fallback for older browsers
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // ========== INIT ==========
  window.addEventListener("load", loadReviews, { once: true });
});