import { stackContent } from "@/features/stack/constants/content";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function Stack() {
  return (
    <Section id="stack" ariaLabelledBy="stack-heading">
      <Container>
        <Reveal>
          <SectionLabel
            index={stackContent.index}
            label={stackContent.label}
            className="mb-8"
          />
          <div className="mb-14 max-w-2xl">
            <h2
              id="stack-heading"
              className="font-display text-3xl tracking-[-0.02em] text-foreground sm:text-4xl"
            >
              {stackContent.title}
            </h2>
            <p className="mt-4 text-muted">{stackContent.description}</p>
          </div>
        </Reveal>

        <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {stackContent.groups.map((group, i) => (
            <Reveal key={group.name} delayMs={i * 50} className="bg-background/70 backdrop-blur-[2px]">
              <div className="flex h-full flex-col gap-5 p-5 sm:p-6">
                <p className="font-mono text-[10px] tracking-[0.22em] text-meta uppercase">
                  {group.name}
                </p>
                <ul className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-sm tracking-wide text-foreground/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
