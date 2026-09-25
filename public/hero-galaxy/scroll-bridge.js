(() => {
  const RADIUS = 6.5;
  const BASE_PITCH = 0.35;

  function applyPerspective(yaw, pitch) {
    const experience = window.__otochiGalaxy;
    if (!experience || !experience.camera) return;

    const camera =
      experience.camera.modes &&
      experience.camera.modes.debug &&
      experience.camera.modes.debug.instance;
    if (!camera) return;

    const elevation = pitch == null ? BASE_PITCH : pitch;
    const phi = Math.PI / 2 - elevation;
    camera.position.x = RADIUS * Math.sin(phi) * Math.sin(yaw);
    camera.position.y = RADIUS * Math.cos(phi);
    camera.position.z = RADIUS * Math.sin(phi) * Math.cos(yaw);
    camera.lookAt(0, 0, 0);
  }

  window.addEventListener("message", (event) => {
    if (event.origin !== window.location.origin) return;
    const data = event.data;
    if (!data || data.type !== "otochi-perspective") return;
    applyPerspective(data.yaw, data.pitch);
  });

  // Ask parent to sync current scroll perspective once the galaxy is ready
  try {
    window.parent.postMessage(
      { type: "otochi-galaxy-ready" },
      window.location.origin,
    );
  } catch {
    // ignore
  }
})();
