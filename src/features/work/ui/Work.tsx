import { workContent } from "@/features/work/constants/content";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

export function Work() {
  return (
    <Section id="work" ariaLabelledBy="work-heading">
      <Container>
        <Reveal>
          <SectionLabel
            index={workContent.index}
            label={workContent.label}
            className="mb-8"
          />
          <div className="mb-14 max-w-2xl">
            <h2
              id="work-heading"
              className="font-display text-3xl tracking-[-0.02em] text-foreground sm:text-4xl"
            >
              {workContent.title}
            </h2>
            <p className="mt-4 text-muted">{workContent.description}</p>
          </div>
        </Reveal>

        <ul className="flex flex-col">
          {workContent.projects.map((project, i) => (
            <Reveal key={project.id} delayMs={i * 60}>
              <li className="group border-t border-border py-10 last:border-b sm:py-12">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                  <div className="flex items-baseline justify-between gap-4 lg:col-span-3 lg:flex-col lg:justify-start">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-accent">
                      {project.id}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-meta">
                      {project.year}
                    </span>
                  </div>

                  <div className="lg:col-span-4">
                    <h3 className="font-display text-2xl tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent">
                      {project.name}
                    </h3>
                    <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-meta uppercase">
                      {project.sector}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    <p className="text-sm leading-relaxed text-muted sm:text-base">
                      {project.summary}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
                      {project.stack.map((tech) => (
                        <li
                          key={tech}
                          className="font-mono text-[10px] tracking-[0.16em] text-meta uppercase"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
