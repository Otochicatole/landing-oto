"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
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

    const update = () => {
      const hero = document.getElementById("hero");
      const height = hero?.offsetHeight ?? window.innerHeight;
      const fadeStart = height * 0.35;
      const fadeEnd = height * 0.95;
      const y = window.scrollY;
      let next = 1;
      if (y >= fadeEnd) next = 0;
      else if (y > fadeStart) next = 1 - (y - fadeStart) / (fadeEnd - fadeStart);
      root.style.opacity = String(next);
      root.style.visibility = next < 0.01 ? "hidden" : "visible";
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const showGalaxy = mounted && !reduceMotion;

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn(
        "pointer-events-none fixed inset-0 z-0 h-[100svh] w-full overflow-hidden",
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
      ) : null}

      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_bottom,transparent_0%,rgb(0_0_0/0.25)_40%,rgb(0_0_0/0.75)_75%,#000_100%)]" />
    </div>
  );
}
