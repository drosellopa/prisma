// Coincideix amb $breakpoint-hero-image a _variables.scss: per sota, el
// vídeo ni es descarrega (preload="none" + mai es crida .play()), només es
// veu el poster, igual que abans amb la imatge estàtica.
const DESKTOP_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export default function initHeroVideo() {
  const video = document.querySelector(".hero__background");

  if (!video) {
    return;
  }

  const desktopQuery = window.matchMedia(DESKTOP_QUERY);
  const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);

  const sync = () => {
    if (desktopQuery.matches && !reducedMotionQuery.matches) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  desktopQuery.addEventListener("change", sync);
  reducedMotionQuery.addEventListener("change", sync);
  sync();
}
