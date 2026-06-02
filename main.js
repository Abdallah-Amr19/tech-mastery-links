/**
 * script.js — Company Links Hub
 * Handles: shimmer injection, ripple clicks, link tracking stubs
 */

/* ================================================
   1. INJECT SHIMMER ELEMENT INTO QR PLACEHOLDER
   Adds the animated shine sweep to the QR box
   ================================================ */
(function injectQrShimmer() {
  const qr = document.querySelector(".qr-placeholder");
  if (!qr) return;

  const shimmer = document.createElement("span");
  shimmer.className = "shimmer";
  shimmer.setAttribute("aria-hidden", "true");
  qr.appendChild(shimmer);
})();

/* ================================================
   2. RIPPLE CLICK EFFECT ON SOCIAL BUTTONS
   Creates a material-design-style ink ripple on click
   ================================================ */
function createRipple(event) {
  const btn = event.currentTarget;

  // Remove any existing ripple to prevent stacking
  const existing = btn.querySelector(".ripple-effect");
  if (existing) existing.remove();

  // Calculate click position relative to button
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  // Create and style the ripple element
  const ripple = document.createElement("span");
  ripple.className = "ripple-effect";

  Object.assign(ripple.style, {
    position: "absolute",
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}px`,
    top: `${y}px`,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.25)",
    transform: "scale(0)",
    animation: "rippleAnim 0.55s ease-out forwards",
    pointerEvents: "none",
    zIndex: "0",
  });

  btn.appendChild(ripple);

  // Clean up after animation completes
  ripple.addEventListener("animationend", () => ripple.remove(), {
    once: true,
  });
}

/* Add ripple keyframes dynamically (avoids editing CSS for a JS-only effect) */
(function addRippleKeyframes() {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rippleAnim {
      to { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
})();

/* Attach ripple handler to all social buttons */
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", createRipple);
});

/* ================================================
   3. LINK CLICK TRACKING STUB
   Replace console.log with your analytics call
   e.g. gtag('event', ...) or plausible('click', ...)
   ================================================ */
document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const platform =
      this.querySelector(".social-btn__name")?.textContent?.trim();

    // ── Analytics stub ──────────────────────────────
    // Uncomment and adapt for your analytics provider:
    //
    // Google Analytics 4:
    // gtag('event', 'social_click', { platform });
    //
    // Plausible:
    // plausible('Social Click', { props: { platform } });
    //
    // Console fallback (dev only):
    console.log(`[Links Hub] Clicked: ${platform}`);
    // ────────────────────────────────────────────────
  });
});

/* ================================================
   4. QR CODE SECTION — CLICK FEEDBACK
   Pulses the QR box briefly on click / tap
   ================================================ */
(function qrClickFeedback() {
  const qr = document.querySelector(".qr-placeholder");
  if (!qr) return;

  qr.setAttribute("tabindex", "0");
  qr.setAttribute("role", "button");

  function pulse() {
    qr.style.transition = "transform 0.15s ease, box-shadow 0.15s ease";
    qr.style.transform = "scale(0.96)";

    setTimeout(() => {
      qr.style.transform = "";
    }, 150);
  }

  qr.addEventListener("click", pulse);
  qr.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pulse();
    }
  });
})();

/* ================================================
   5. INTERSECTION OBSERVER — RE-ANIMATE ON REVISIT
   Resets card animation if user scrolls away & back
   (useful on longer pages; harmless on single-screen)
   ================================================ */
(function observeCard() {
  const card = document.querySelector(".hub-card");
  if (!card || !("IntersectionObserver" in window)) return;

  // Already visible on load — no extra work needed for single-page layout.
  // Observer left as a stub for future multi-section expansion.
})();
