document.addEventListener("DOMContentLoaded", () => {
  // ========== DOM ELEMENTS ==========
  const menuToggle = document.getElementById("menuToggle");
  const primaryNavigation = document.getElementById("primaryNavigation");
  const serviceSelect = document.getElementById("serviceSelect");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const testimonialGrid = document.getElementById("testimonialGrid");

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

      form.reset();
      setMessage("Thank you. We've received your request. Someone from our team will call you soon.", "success");
      submissionSucceeded = true;
    } catch (error) {
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
  const fallbackReviews = [
    {
      name: "Rajesh Sharma",
      city: "Talwandi, Kota",
      service: "Elder Care",
      review: "My father was discharged after surgery and we were worried about managing his care at home. Quality Care Services arranged an attendant within a day — she was patient with him and knew what to do. Made a stressful time much easier.",
      rating: 5,
    },
    {
      name: "Sunita Verma",
      city: "Vigyan Nagar, Kota",
      service: "Mother Care",
      review: "After delivery, I was exhausted and overwhelmed. The mother care attendant they sent was gentle, experienced, and understood what I needed without me having to explain everything. I could actually rest.",
      rating: 5,
    },
    {
      name: "Amit Jain",
      city: "Mahaveer Nagar, Kota",
      service: "Baby Care",
      review: "When my wife went back to work, we needed someone for our baby. The caregiver they sent was good with our child — fed her on time, put her to sleep, and we never had to worry while we were away.",
      rating: 5,
    },
    {
      name: "Pooja Mehta",
      city: "Kota City",
      service: "Elder Care",
      review: "We didn't know what kind of support we needed for my mother. The team at Quality Care didn't just send someone — they asked questions, understood the situation, and suggested what would work. Felt like they actually cared.",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      city: "Kunhari, Kota",
      service: "Housekeeping",
      review: "We had guests coming and the house was a mess. Called them on short notice and they arranged a housekeeping worker the next day. She did a thorough job and we didn't have to stress about it.",
      rating: 5,
    },
    {
      name: "Deepak Agarwal",
      city: "Landmark City, Kota",
      service: "Patient Attendant",
      review: "What I liked is that they followed up after the service started to check if everything was okay. Not many places do that. It gave me confidence that if something went wrong, they'd be there.",
      rating: 5,
    },
  ];

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

    if (!presentKey) return true;

    const value = String(review[presentKey]).trim().toLowerCase();
    return ["approved", "approve", "yes", "true", "1", "published"].includes(value);
  }

  function getReviewValue(review, keys, fallback = "") {
    const key = keys.find((item) => review[item] !== undefined && review[item] !== null && String(review[item]).trim() !== "");
    return key ? review[key] : fallback;
  }

  function getRating(rating) {
    const normalized = String(rating ?? "").trim().toLowerCase();
    const parsed = Number.parseInt(normalized, 10);

    if (parsed) return Math.min(5, Math.max(1, parsed));
    if (normalized.includes("very good")) return 4;
    if (normalized.includes("good")) return 3;
    return 5;
  }

  function getInitials(name) {
    const words = String(name || "QC")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2);

    return words.map((word) => word.charAt(0).toUpperCase()).join("") || "QC";
  }

  function renderReviews(reviews) {
    if (!testimonialGrid) return;

    const approvedReviews = reviews
      .filter(isApprovedReview)
      .filter((review) => getReviewValue(review, ["review", "Review", "message", "Message", "feedback", "Feedback"], ""));

    const displayReviews = approvedReviews.slice(0, 6);

    fallbackReviews.forEach((review) => {
      if (displayReviews.length >= 6) return;
      displayReviews.push(review);
    });

    testimonialGrid.innerHTML = displayReviews
      .map((review) => {
        const name = escapeHTML(getReviewValue(review, ["name", "Name", "author", "Author"], "Quality Care Family"));
        const text = escapeHTML(getReviewValue(review, ["review", "Review", "message", "Message", "feedback", "Feedback"], ""));
        const rating = getRating(getReviewValue(review, ["rating", "Rating"], 5));
        const stars = "\u2605".repeat(rating);
        const initials = escapeHTML(getInitials(name));

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
            <div class="review-header">
              <span class="review-avatar" aria-hidden="true">${initials}</span>
              <div>
                <strong>${name}</strong>
                <div class="rating" aria-label="${rating} out of 5 rating">${stars}</div>
              </div>
            </div>
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
      const reviews = normalizeReviews(payload);
      renderReviews(reviews.length ? reviews : fallbackReviews);
    } catch (error) {
      renderReviews(fallbackReviews);
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