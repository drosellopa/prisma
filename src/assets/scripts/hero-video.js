// Coincideix amb $breakpoint-hero-image a _variables.scss: per sota, el
// vídeo ni es descarrega (preload="none" + mai es crida .play()), només es
// veu el poster, igual que abans amb la imatge estàtica.
const DESKTOP_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const desktopQuery = window.matchMedia(DESKTOP_QUERY);
const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

// Exportat perquè hero-slider.js hi comprovi si el vídeo del slide 1 s'ha de
// reproduir abans de reiniciar-lo (mateix criteri que aquí: escriptori i
// sense prefers-reduced-motion).
export function shouldPlayHeroVideo() {
  return desktopQuery.matches && !reducedMotionQuery.matches;
}

export default function initHeroVideo() {
  const video = document.querySelector(".hero__bg-video");

  if (!video) {
    return;
  }

  const sync = () => {
    if (shouldPlayHeroVideo()) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  desktopQuery.addEventListener("change", sync);
  reducedMotionQuery.addEventListener("change", sync);
  sync();
}
