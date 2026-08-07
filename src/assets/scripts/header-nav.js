// Breakpoint del menú mòbil/tablet -> escriptori. Ha de coincidir amb
// $breakpoint-nav-desktop a src/assets/styles/_variables.scss.
const DESKTOP_QUERY = "(min-width: 1024px)";

export default function initHeaderNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav-primary");
  const overlay = document.querySelector(".nav-overlay");
  const closeButton = document.querySelector(".nav-close");

  if (!toggle || !nav || !overlay) {
    return;
  }

  // El calaix es desplega per sobre del header (top: 0): els seus controls
  // queden tapats i no han de ser accessibles mentre el menú és obert.
  const inertTargets = [
    document.getElementById("main-content"),
    document.querySelector(".site-footer"),
    document.querySelector(".site-header__logo"),
    toggle,
  ].filter(Boolean);

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  const openMenu = () => {
    toggle.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-open");
    inertTargets.forEach((el) => el.setAttribute("inert", ""));

    (closeButton || nav.querySelector(".nav-primary__link"))?.focus();
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
    inertTargets.forEach((el) => el.removeAttribute("inert"));

    if (returnFocus) {
      toggle.focus();
    }
  };

  toggle.addEventListener("click", () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeButton?.addEventListener("click", () => closeMenu({ returnFocus: true }));

  overlay.addEventListener("click", () => closeMenu());

  nav.addEventListener("click", (event) => {
    if (event.target.closest(".nav-primary__link")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      closeMenu({ returnFocus: true });
    }
  });

  window.matchMedia(DESKTOP_QUERY).addEventListener("change", (event) => {
    if (event.matches && isOpen()) {
      closeMenu();
    }
  });
}
