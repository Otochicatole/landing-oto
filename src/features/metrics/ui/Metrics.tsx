import { metricsContent } from "@/features/metrics/constants/content";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function Metrics() {
  return (
    <Section id="metrics" ariaLabelledBy="metrics-heading">
      <Container>
        <Reveal>
          <SectionLabel
            index={metricsContent.index}
            label={metricsContent.label}
            className="mb-8"
          />
          <div className="mb-14 max-w-2xl">
            <h2
              id="metrics-heading"
              className="font-display text-3xl tracking-[-0.02em] text-foreground sm:text-4xl"
            >
              {metricsContent.title}
            </h2>
            <p className="mt-4 text-muted">{metricsContent.description}</p>
          </div>
        </Reveal>

        <dl className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {metricsContent.items.map((item, i) => (
            <Reveal key={item.unit} delayMs={i * 40} className="bg-background/70 backdrop-blur-[2px]">
              <div className="flex h-full flex-col gap-3 p-6 sm:p-7">
                <dt className="font-mono text-[10px] tracking-[0.2em] text-meta uppercase">
                  {item.unit}
                </dt>
                <dd className="font-display text-4xl tracking-[-0.03em] text-foreground sm:text-5xl">
                  {item.value}
                </dd>
                <p className="mt-auto text-sm text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
