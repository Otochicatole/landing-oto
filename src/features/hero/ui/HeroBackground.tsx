"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  clamp01,
  easeInCubic,
  heroZoomProgress,
  radiusFromZoom,
} from "@/features/hero/lib/scrollZoom";
import { cn } from "@/shared/lib/cn";

type HeroBackgroundProps = {
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

function getClientMounted(): boolean {
  return true;
}

function getServerMounted(): boolean {
  return false;
}

function postGalaxy(payload: Record<string, number>) {
  const frame = document.getElementById(
    "hero-galaxy-frame",
  ) as HTMLIFrameElement | null;
  frame?.contentWindow?.postMessage(
    { type: "otochi-perspective", ...payload },
    window.location.origin,
  );
}

export function HeroBackground({ className }: HeroBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    subscribeNothing,
    getClientMounted,
    getServerMounted,
  );
  const reduceMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sync = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;

      const progress = heroZoomProgress(hero);
      const zoom = easeInCubic(progress);
      // Hold full opacity until deep inside the black hole, then snap-fade out
      const fade = clamp01((progress - 0.78) / 0.22);
      const opacity = 1 - fade;

      root.style.opacity = String(opacity);
      root.style.visibility = opacity < 0.02 ? "hidden" : "visible";

      postGalaxy({
        yaw: progress * Math.PI * 0.35,
        pitch: 0.28 - progress * 0.12,
        radius: radiusFromZoom(progress),
        zoom,
        progress,
      });
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "otochi-galaxy-ready") sync();
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  const showGalaxy = mounted && !reduceMotion;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 overflow-hidden",
        className,
      )}
    >
      {showGalaxy ? (
        <iframe
          id="hero-galaxy-frame"
          src="/hero-galaxy/index.html"
          title=""
          tabIndex={-1}
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}
    </div>
  );
}
