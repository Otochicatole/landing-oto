const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Duration scales with distance so the black hole zoom can be read clearly. */
function durationForDistance(distancePx: number): number {
  const ms = Math.abs(distancePx) * 1.15;
  return Math.min(4800, Math.max(2200, ms));
}

let activeFrame = 0;

export function smoothScrollTo(targetY: number): void {
  cancelAnimationFrame(activeFrame);

  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1) return;

  if (prefersReducedMotion()) {
    window.scrollTo(0, targetY);
    return;
  }

  const duration = durationForDistance(delta);
  const startTime = performance.now();

  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, startY + delta * easeInOutCubic(t));
    if (t < 1) {
      activeFrame = requestAnimationFrame(step);
    }
  };

  activeFrame = requestAnimationFrame(step);
}

export function smoothScrollToHash(hash: string): void {
  const id = hash.replace(/^#/, "");
  if (!id) {
    smoothScrollTo(0);
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY;
  const offset = 72; // fixed nav clearance
  smoothScrollTo(Math.max(0, top - offset));
}
