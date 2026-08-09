const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

// Missió/Visió apareixen amb una animació quan l'usuari hi arriba fent
// scroll. Sense JS o amb prefers-reduced-motion, es veuen normals des del
// principi (mai depenen del JS per ser visibles).
export default function initPillarsReveal() {
  const container = document.querySelector(".qui-som__pillars");

  if (!container || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
    return;
  }

  const cards = container.querySelectorAll(".qui-som__pillar");

  if (!cards.length) {
    return;
  }

  container.classList.add("js-animate");

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

  cards.forEach((card) => observer.observe(card));
}
