export type PerspectiveAngles = {
  yaw: number;
  pitch: number;
  progress: number;
};

/** Map page scroll to orbit-style perspective (same language as galaxy OrbitControls). */
export function perspectiveFromScroll(
  scrollY: number,
  maxScroll: number,
): PerspectiveAngles {
  const progress =
    maxScroll <= 0 ? 0 : Math.min(1, Math.max(0, scrollY / maxScroll));

  // Horizontal orbit — the main “drag perspective” gesture on the galaxy
  const yaw = progress * Math.PI * 1.35;
  // Subtle elevation change, like pitching the orbit camera
  const pitch = 0.18 + Math.sin(progress * Math.PI) * 0.22;

  return { yaw, pitch, progress };
}

export function maxScrollDistance(): number {
  return Math.max(
    0,
    document.documentElement.scrollHeight - window.innerHeight,
  );
}
