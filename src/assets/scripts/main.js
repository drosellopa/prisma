/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

import initHeaderNav from "./header-nav.js";
import initHeroSlider from "./hero-slider.js";
import initPillarsReveal from "./pillars-reveal.js";
import initFlipCards from "./flip-cards.js";
import initScrollReveal from "./scroll-reveal.js";

/**
 * Write any other JavaScript below
 */

(function () {
  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
})();

initHeaderNav();
initHeroSlider();
initPillarsReveal();
initFlipCards();
initScrollReveal();
