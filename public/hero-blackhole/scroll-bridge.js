(() => {
  const DEFAULT_RADIUS = 8;
  const BASE_PITCH = 0.35;

  function applyPerspective(yaw, pitch, radius) {
    const experience = window.__otochiBlackhole;
    if (!experience || !experience.camera) return;

    const camera =
      experience.camera.modes &&
      experience.camera.modes.debug &&
      experience.camera.modes.debug.instance;
    if (!camera) return;

    const r = radius == null ? DEFAULT_RADIUS : radius;
    const elevation = pitch == null ? BASE_PITCH : pitch;
    const phi = Math.PI / 2 - elevation;
    camera.position.x = r * Math.sin(phi) * Math.sin(yaw || 0);
    camera.position.y = r * Math.cos(phi);
    camera.position.z = r * Math.sin(phi) * Math.cos(yaw || 0);
    camera.lookAt(0, 0, 0);

    // Narrow FOV as we dive in — sells the zoom into the event horizon
    if (typeof radius === "number") {
      const t = Math.min(
        1,
        Math.max(0, (DEFAULT_RADIUS - r) / (DEFAULT_RADIUS - 0.08)),
      );
      camera.fov = 45 - t * 18;
      camera.updateProjectionMatrix();
    }
  }

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    const data = event.data;
    if (!data || data.type !== "otochi-perspective") return;
    applyPerspective(data.yaw, data.pitch, data.radius);
  });

  try {
    window.parent.postMessage(
      { type: "otochi-blackhole-ready" },
      window.location.origin,
    );
  } catch {
    // ignore
  }
})();
