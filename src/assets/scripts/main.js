/**
 * Import dependencies from node_modules
 * see commented examples below
 */

// import 'some-node-module';
// import SomeModule from 'some-node-module';

import initHeaderNav from "./header-nav.js";
import initHeroVideo from "./hero-video.js";
import initHeroSlider from "./hero-slider.js";
import initPillarsReveal from "./pillars-reveal.js";

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
initHeroVideo();
initHeroSlider();
initPillarsReveal();
