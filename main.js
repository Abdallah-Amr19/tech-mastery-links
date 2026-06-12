/* ================================================
         CONTACT OVERLAY — Call / WhatsApp
      ================================================ */
const contactOverlay = document.getElementById("contactOverlay");
let currentAction = "call";

// Open on Call Us / WhatsApp buttons
document.querySelectorAll("[data-action]").forEach((btn) => {
  btn.addEventListener("click", () => {
    currentAction = btn.dataset.action;
    const title = document.getElementById("contactTitle");
    title.textContent =
      currentAction === "whatsapp" ? "Open WhatsApp" : "Ready to connect";
    contactOverlay.hidden = false;
    document.querySelector(".contact-close").focus();
  });
});

// Close
document.querySelector(".contact-close").addEventListener("click", () => {
  contactOverlay.hidden = true;
});
contactOverlay.addEventListener("click", (e) => {
  if (e.target === contactOverlay) contactOverlay.hidden = true;
});

// Choose number
document.querySelectorAll(".contact-choice").forEach((btn) => {
  btn.addEventListener("click", () => {
    const num = btn.dataset.number.replace(/\s/g, "");
    if (currentAction === "whatsapp") {
      window.open(`https://wa.me/${num.replace("+", "")}`, "_blank");
    } else {
      window.location.href = `tel:${num}`;
    }
    contactOverlay.hidden = true;
  });
});

/* ================================================
         SERVICES OVERLAY
      ================================================ */
const servicesOverlay = document.getElementById("servicesOverlay");
const servicesBtn = document.getElementById("servicesBtn");
const servicesClose = document.getElementById("servicesClose");

servicesBtn.addEventListener("click", () => {
  servicesOverlay.hidden = false;
  servicesClose.focus();
});

servicesClose.addEventListener("click", () => {
  servicesOverlay.hidden = true;
  servicesBtn.focus();
});

servicesOverlay.addEventListener("click", (e) => {
  if (e.target === servicesOverlay) {
    servicesOverlay.hidden = true;
    servicesBtn.focus();
  }
});

// Close both overlays with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (!servicesOverlay.hidden) {
      servicesOverlay.hidden = true;
      servicesBtn.focus();
    }
    if (!contactOverlay.hidden) {
      contactOverlay.hidden = true;
    }
  }
});

/* ================================================
         RIPPLE EFFECT on social buttons
      ================================================ */
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `@keyframes rippleAnim { to { transform:scale(1); opacity:0; } }`;
document.head.appendChild(rippleStyle);

document.querySelectorAll(".social-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const existing = this.querySelector(".ripple-effect");
    if (existing) existing.remove();
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement("span");
    Object.assign(ripple.style, {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      left: `${e.clientX - rect.left - size / 2}px`,
      top: `${e.clientY - rect.top - size / 2}px`,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.22)",
      transform: "scale(0)",
      animation: "rippleAnim 0.55s ease-out forwards",
      pointerEvents: "none",
      zIndex: "0",
    });
    ripple.className = "ripple-effect";
    this.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove(), {
      once: true,
    });
  });
});
