const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Fos d'entrada genèric per a qualsevol element marcat amb .reveal-fade
// (p. ex. el logotip de Serveis, la banda d'Especialització i territori):
// opacity 0 -> 1 en 1s quan l'usuari hi arriba fent scroll. Un sol cop per
// element (s'atura d'observar-lo després) i mai si prefers-reduced-motion.
export default function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal-fade");

  if (!targets.length || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach((target) => {
    target.classList.add("js-fade");
    observer.observe(target);
  });
}
