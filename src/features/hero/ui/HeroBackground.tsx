"use client";

import { useSyncExternalStore } from "react";
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

  const showGalaxy = mounted && !reduceMotion;

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden bg-black",
        className,
      )}
    >
      {showGalaxy ? (
        <iframe
          src="/hero-galaxy/index.html"
          title=""
          tabIndex={-1}
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#1a1028_0%,#050505_55%,#000_100%)]" />
      )}

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(5_5_5/0.35)_0%,rgb(5_5_5/0.15)_40%,rgb(5_5_5/0.55)_70%,var(--background)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgb(5_5_5/0.45)_100%)]" />
    </div>
  );
}
