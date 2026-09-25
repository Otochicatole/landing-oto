"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createStarfieldScene } from "@/features/starfield/lib/createStarfieldScene";
import {
  maxScrollDistance,
  perspectiveFromScroll,
} from "@/features/starfield/lib/perspective";
import { cn } from "@/shared/lib/cn";

type SiteStarfieldProps = {
  className?: string;
};

function subscribeReducedMotion(onStoreChange: () => void): () => void {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return true;
}

function subscribeNothing(): () => void {
  return () => undefined;
}

export function SiteStarfield({ className }: SiteStarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const mounted = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!mounted || reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = createStarfieldScene(canvas);
    let frameId = 0;
    let running = true;
    let targetYaw = 0;
    let targetPitch = 0.2;
    let currentYaw = 0;
    let currentPitch = 0.2;

    const syncPerspective = () => {
      const { yaw, pitch } = perspectiveFromScroll(
        window.scrollY,
        maxScrollDistance(),
      );
      targetYaw = yaw;
      targetPitch = pitch;
    };

    const tick = () => {
      if (!running) return;
      currentYaw += (targetYaw - currentYaw) * 0.08;
      currentPitch += (targetPitch - currentPitch) * 0.08;
      scene.setPerspective(currentYaw, currentPitch);
      scene.render();
      frameId = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frameId);
      } else {
        running = true;
        frameId = requestAnimationFrame(tick);
      }
    };

    syncPerspective();
    scene.resize();
    frameId = requestAnimationFrame(tick);

    window.addEventListener("scroll", syncPerspective, { passive: true });
    window.addEventListener("resize", scene.resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", syncPerspective);
      window.removeEventListener("resize", scene.resize);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.dispose();
    };
  }, [mounted, reduceMotion]);

  if (!mounted || reduceMotion) {
    return (
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_center,#0a0610_0%,#000_70%)]",
          className,
        )}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 h-full w-full",
        className,
      )}
    />
  );
}
