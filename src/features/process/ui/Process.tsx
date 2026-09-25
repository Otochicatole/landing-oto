import { processContent } from "@/features/process/constants/content";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function Process() {
  return (
    <Section id="process" ariaLabelledBy="process-heading">
      <Container>
        <Reveal>
          <SectionLabel
            index={processContent.index}
            label={processContent.label}
            className="mb-8"
          />
          <div className="mb-14 max-w-2xl">
            <h2
              id="process-heading"
              className="font-display text-3xl tracking-[-0.02em] text-foreground sm:text-4xl"
            >
              {processContent.title}
            </h2>
            <p className="mt-4 text-muted">{processContent.description}</p>
          </div>
        </Reveal>

        <ol className="relative grid gap-0 border-l border-border sm:border-l-0 sm:border-t">
          {processContent.phases.map((phase, i) => (
            <Reveal key={phase.id} delayMs={i * 50}>
              <li className="relative grid gap-3 border-border py-8 pl-6 sm:grid-cols-12 sm:gap-6 sm:border-b sm:py-10 sm:pl-0">
                <span
                  aria-hidden
                  className="absolute top-9 -left-[5px] size-2.5 rounded-full border border-accent bg-background sm:hidden"
                />
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent sm:col-span-2">
                  {phase.id}
                </span>
                <h3 className="font-display text-xl tracking-[-0.01em] text-foreground sm:col-span-3">
                  {phase.name}
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:col-span-7 sm:text-base">
                  {phase.detail}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
