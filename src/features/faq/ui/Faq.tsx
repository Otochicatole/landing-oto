"use client";

import { useId, useState } from "react";
import { faqContent } from "@/features/faq/constants/content";
import { cn } from "@/shared/lib/cn";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonId = useId();

  return (
    <div className="border-b border-border">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-accent sm:py-7"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex gap-4 sm:gap-6">
            <span className="font-mono text-[11px] tracking-[0.18em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-base tracking-[-0.01em] text-foreground sm:text-lg">
              {question}
            </span>
          </span>
          <span
            aria-hidden
            className={cn(
              "mt-1 font-mono text-sm text-meta transition-transform duration-200",
              open && "rotate-45",
            )}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="pb-6 pl-10 sm:pl-14"
      >
        <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function Faq() {
  return (
    <Section id="faq" ariaLabelledBy="faq-heading">
      <Container>
        <Reveal>
          <SectionLabel
            index={faqContent.index}
            label={faqContent.label}
            className="mb-8"
          />
          <h2
            id="faq-heading"
            className="mb-12 font-display text-3xl tracking-[-0.02em] text-foreground sm:mb-14 sm:text-4xl"
          >
            {faqContent.title}
          </h2>
        </Reveal>

        <div className="border-t border-border">
          {faqContent.items.map((item, i) => (
            <Reveal key={item.question} delayMs={i * 30}>
              <FaqItem
                question={item.question}
                answer={item.answer}
                index={i}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
