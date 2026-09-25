/** Ease-in cubic — accelerates into the black hole. */
export function easeInCubic(t: number): number {
  return t * t * t;
}

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

/**
 * Progress through the sticky hero zoom (0 at top → 1 when leaving the hero).
 */
export function heroZoomProgress(hero: HTMLElement): number {
  const range = Math.max(1, hero.offsetHeight - window.innerHeight);
  return clamp01(-hero.getBoundingClientRect().top / range);
}

/** Camera orbit radius: start far, dive into the event horizon. */
export function radiusFromZoom(zoom: number): number {
  const start = 8;
  const end = 0.08;
  const t = easeInCubic(zoom);
  return start + (end - start) * t;
}
