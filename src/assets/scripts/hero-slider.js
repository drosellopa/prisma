// Única font de veritat per a la cadència de l'autoplay — vegeu la
// instrucció explícita de mantenir-ho en una sola constant fàcil de tocar.
const SLIDE_DURATION = 10000;
const SLIDE_COUNT = 3;

// Ha de coincidir amb $hero-bg-duration a _hero.scss (temps que triga
// l'escenari de fons a creuar-se): el contingut de text no comença a
// canviar fins que el fons ja ha arrencat la transició.
const BG_DURATION_MS = 1500;
const CONTENT_DELAY_MS = 280;

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function initHeroSlider() {
  const hero = document.querySelector(".hero");

  if (!hero) {
    return;
  }

  const bgLayers = hero.querySelectorAll("[data-slide-bg]");
  const slideCopies = hero.querySelectorAll(".hero__slide-copy");
  const prevButton = hero.querySelector("[data-hero-prev]");
  const nextButton = hero.querySelector("[data-hero-next]");
  const dots = hero.querySelectorAll("[data-hero-dot]");
  const progressBar = hero.querySelector("[data-hero-progress]");
  const announce = hero.querySelector("[data-hero-announce]");
  const content = hero.querySelector(".hero__content");

  if (!bgLayers.length || slideCopies.length < SLIDE_COUNT) {
    return;
  }

  const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;

  let current = 0;
  let isTransitioning = false;
  let timerId = null;
  let paused = false;

  const bgFor = (index) => hero.querySelector(`[data-slide-bg="${index}"]`);
  const copyFor = (index) => hero.querySelector(`.hero__slide-copy[data-slide="${index}"]`);

  function updateIndicators(index) {
    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === index;
      dot.classList.toggle("hero__dot--active", isActive);
      dot.setAttribute("aria-selected", String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });

    if (announce) {
      const tagline = copyFor(index)?.querySelector(".hero__tagline")?.textContent ?? "";
      announce.textContent = `Diapositiva ${index + 1} de ${SLIDE_COUNT}: ${tagline}`;
    }
  }

  function restartProgress() {
    if (!progressBar || reducedMotion) {
      return;
    }

    progressBar.classList.remove("is-running");
    // Força un reflow perquè el navegador "oblidi" l'animació anterior
    // abans de tornar-la a afegir; si no, no es reinicia.
    // eslint-disable-next-line no-unused-expressions
    progressBar.offsetWidth;
    progressBar.style.animationDuration = `${SLIDE_DURATION}ms`;
    progressBar.classList.add("is-running");
  }

  function goToSlide(index) {
    if (index === current || isTransitioning) {
      return;
    }

    const previous = current;
    // Sentit del parallax: amb 3 diapositives, la distància circular +1
    // sempre és "endavant" i l'altra sempre és "enrere" (vegeu .hero--dir-*
    // a _hero.scss, que decideixen cap a quin costat es desplacen fons i
    // contingut).
    const forward = (index - current + SLIDE_COUNT) % SLIDE_COUNT === 1;
    hero.classList.toggle("hero--dir-forward", forward);
    hero.classList.toggle("hero--dir-backward", !forward);

    current = index;
    isTransitioning = true;

    const previousBg = bgFor(previous);
    previousBg?.classList.remove("hero__bg-group--active");
    previousBg?.classList.add("hero__bg-group--exit");
    bgFor(index)?.classList.add("hero__bg-group--active");
    updateIndicators(index);
    // Únic cicle temporal: cada canvi de diapositiva (automàtic o manual)
    // reinicia la barra de progrés, mai al revés.
    restartProgress();

    const revealContent = () => {
      const previousCopy = copyFor(previous);
      const nextCopy = copyFor(index);

      if (previousCopy) {
        previousCopy.classList.remove("hero__slide-copy--current", "hero__slide-copy--active");
        previousCopy.classList.add("hero__slide-copy--exit");
      }

      if (nextCopy) {
        nextCopy.classList.remove("hero__slide-copy--exit");
        nextCopy.classList.add("hero__slide-copy--current");
        // Reflow abans d'afegir --active perquè la transició opacity/
        // translateX(/Y) arrenqui des de l'estat inicial en comptes de
        // saltar directament al final.
        // eslint-disable-next-line no-unused-expressions
        nextCopy.offsetWidth;
        requestAnimationFrame(() => nextCopy.classList.add("hero__slide-copy--active"));
      }
    };

    if (reducedMotion) {
      revealContent();
    } else {
      window.setTimeout(revealContent, CONTENT_DELAY_MS);
    }

    window.setTimeout(() => {
      isTransitioning = false;
      // Un cop acabat el desplaçament de sortida, treu --exit: torna la
      // capa al repòs invisible (visibility: hidden) en comptes de deixar-
      // la "visible" (encara que transparent) indefinidament, cosa que la
      // mantindria enfocable per teclat sense necessitat.
      previousBg?.classList.remove("hero__bg-group--exit");
      copyFor(previous)?.classList.remove("hero__slide-copy--exit");
    }, BG_DURATION_MS);
  }

  function next() {
    goToSlide((current + 1) % SLIDE_COUNT);
  }

  function prev() {
    goToSlide((current - 1 + SLIDE_COUNT) % SLIDE_COUNT);
  }

  function stopTimer() {
    if (timerId !== null) {
      window.clearInterval(timerId);
      timerId = null;
    }
  }

  function startTimer() {
    if (reducedMotion || paused) {
      return;
    }

    stopTimer();
    timerId = window.setInterval(next, SLIDE_DURATION);
  }

  // Reinicia només el temporitzador de l'autoplay (la barra ja es reinicia
  // dins goToSlide, per a qualsevol canvi, manual o automàtic).
  function restartTimer() {
    stopTimer();
    startTimer();
  }

  function manualGoTo(index) {
    goToSlide(index);
    restartTimer();
  }

  prevButton?.addEventListener("click", () => {
    prev();
    restartTimer();
  });

  nextButton?.addEventListener("click", () => {
    next();
    restartTimer();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => manualGoTo(index));
  });

  // Navegació per teclat dins l'indicador (patró tablist estàndard):
  // fletxes esquerra/dreta mouen el focus i activen la diapositiva.
  const dotsContainer = hero.querySelector(".hero__dots");
  dotsContainer?.addEventListener("keydown", (event) => {
    const dotsArray = Array.from(dots);
    const focusedIndex = dotsArray.indexOf(document.activeElement);

    if (focusedIndex === -1) {
      return;
    }

    let targetIndex = null;

    if (event.key === "ArrowRight") {
      targetIndex = (focusedIndex + 1) % SLIDE_COUNT;
    } else if (event.key === "ArrowLeft") {
      targetIndex = (focusedIndex - 1 + SLIDE_COUNT) % SLIDE_COUNT;
    } else if (event.key === "Home") {
      targetIndex = 0;
    } else if (event.key === "End") {
      targetIndex = SLIDE_COUNT - 1;
    }

    if (targetIndex !== null) {
      event.preventDefault();
      dotsArray[targetIndex].focus();
      manualGoTo(targetIndex);
    }
  });

  // Pausa en hover/focus (WCAG 2.2.2 — contingut que avança sol necessita
  // un mecanisme per aturar-lo) i quan la pestanya no és visible.
  function pause() {
    paused = true;
    stopTimer();
    hero.classList.add("is-paused");
  }

  function resume() {
    paused = false;
    hero.classList.remove("is-paused");
    startTimer();
  }

  // El hover amb ratolí només pausa dins .hero__content (títol + text +
  // CTA): passar per sobre de la imatge de fons, les fletxes o els punts
  // no atura l'autoplay. El focus de teclat, en canvi, es manté a tot el
  // hero perquè fletxes i punts (fora de .hero__content) segueixin
  // complint WCAG 2.2.2 en navegar-hi amb Tab.
  content?.addEventListener("pointerenter", pause);
  content?.addEventListener("pointerleave", resume);
  hero.addEventListener("focusin", pause);
  hero.addEventListener("focusout", (event) => {
    if (!hero.contains(event.relatedTarget)) {
      resume();
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopTimer();
    } else if (!paused) {
      startTimer();
    }
  });

  updateIndicators(0);
  startTimer();
  restartProgress();
}
