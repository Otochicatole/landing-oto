import { signalContent } from "@/features/signal/constants/content";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function Signal() {
  return (
    <Section id="signal" ariaLabelledBy="signal-heading" className="border-t-0 pt-8 sm:pt-12">
      <Container>
        <Reveal>
          <SectionLabel
            index={signalContent.index}
            label={signalContent.label}
            className="mb-8"
          />
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
            <h2
              id="signal-heading"
              className="font-display text-3xl leading-tight tracking-[-0.02em] text-balance text-foreground sm:text-4xl lg:col-span-6"
            >
              {signalContent.title}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-muted lg:col-span-6 lg:pt-2">
              {signalContent.body}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
