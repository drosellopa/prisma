// En dispositius amb ratolí real, el gir el fa només el CSS (:hover /
// :focus-within a _centres-membres.scss) — coincideix exactament amb "en
// fer hover gira, en treure el ratolí torna". Aquí només calen dos casos
// que el CSS sol no pot cobrir: tocar la targeta en tàctil (no hi ha
// :hover fiable) i tornar-la a tocar per desfer-la.
const HOVER_CAPABLE_QUERY = "(hover: hover) and (pointer: fine)";

export default function initFlipCards() {
  if (window.matchMedia(HOVER_CAPABLE_QUERY).matches) {
    return;
  }

  const cards = document.querySelectorAll(".centres-membres__card");

  cards.forEach((card) => {
    const trigger = card.querySelector(".centres-membres__card-face--front");

    trigger?.addEventListener("click", () => {
      const flipped = card.classList.toggle("is-flipped");
      trigger.setAttribute("aria-expanded", String(flipped));
    });
  });
}
