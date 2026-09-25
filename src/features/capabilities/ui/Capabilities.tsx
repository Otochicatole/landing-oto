import { capabilitiesContent } from "@/features/capabilities/constants/content";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function Capabilities() {
  return (
    <Section id="capabilities" ariaLabelledBy="capabilities-heading">
      <Container>
        <Reveal>
          <SectionLabel
            index={capabilitiesContent.index}
            label={capabilitiesContent.label}
            className="mb-8"
          />
          <div className="mb-14 max-w-2xl">
            <h2
              id="capabilities-heading"
              className="font-display text-3xl tracking-[-0.02em] text-foreground sm:text-4xl"
            >
              {capabilitiesContent.title}
            </h2>
            <p className="mt-4 text-muted">{capabilitiesContent.description}</p>
          </div>
        </Reveal>

        <ul className="divide-y divide-border border-y border-border">
          {capabilitiesContent.items.map((item, i) => (
            <Reveal key={item.id} delayMs={i * 40}>
              <li className="group grid gap-3 py-7 transition-colors sm:grid-cols-12 sm:gap-6 sm:py-8">
                <span className="font-mono text-[11px] tracking-[0.2em] text-accent sm:col-span-2">
                  {item.id}
                </span>
                <h3 className="font-display text-lg tracking-[-0.01em] text-foreground transition-colors group-hover:text-accent sm:col-span-3">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted sm:col-span-7 sm:text-base">
                  {item.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
