import { heroContent } from "@/features/hero/constants/content";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { HeroBackground } from "@/features/hero/ui/HeroBackground";
import { HeroMeta } from "@/features/hero/ui/HeroMeta";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative z-[1] flex min-h-[100svh] flex-col justify-end overflow-visible pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24"
    >
      <HeroBackground />

      <Container className="relative z-10 flex flex-col gap-10 lg:gap-14">
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
    </section>
  );
}
