"use client";

import { useEffect, useRef } from "react";
import { heroContent } from "@/features/hero/constants/content";
import { clamp01, heroZoomProgress } from "@/features/hero/lib/scrollZoom";
import { HeroBackground } from "@/features/hero/ui/HeroBackground";
import { HeroMeta } from "@/features/hero/ui/HeroMeta";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const sync = () => {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const progress = heroZoomProgress(hero);
      // Copy leaves early so the dive into the black hole is clear
      const opacity = 1 - clamp01(progress / 0.28);
      const scale = 1 + progress * 0.35;
      content.style.opacity = String(opacity);
      content.style.transform = `scale(${scale})`;
      content.style.visibility = opacity < 0.02 ? "hidden" : "visible";
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-[1] h-[240vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-end overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24">
        <HeroBackground />

        <div
          ref={contentRef}
          className="relative z-10 origin-center will-change-[opacity,transform]"
        >
          <Container className="flex flex-col gap-10 lg:gap-14">
            <div className="max-w-4xl">
              <p className="mb-6 font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
                {heroContent.brandMark}
              </p>
              <h1
                id="hero-heading"
                className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] font-medium tracking-[-0.03em] text-balance text-foreground"
              >
                {heroContent.headline}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {heroContent.subheadline}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button href={heroContent.primaryCta.href}>
                  {heroContent.primaryCta.label}
                </Button>
                <Button href={heroContent.secondaryCta.href} variant="line">
                  {heroContent.secondaryCta.label}
                </Button>
              </div>
            </div>

            <HeroMeta />
          </Container>
        </div>
      </div>
    </section>
  );
}
