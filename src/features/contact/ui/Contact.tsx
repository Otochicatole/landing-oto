"use client";

import { useState, useTransition, type FormEvent } from "react";
import { contactContent } from "@/features/contact/constants/content";
import {
  submitContact,
  type ContactResult,
} from "@/features/contact/helpers/submitContact";
import { siteConfig } from "@/shared/constants/site";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Reveal } from "@/shared/ui/Reveal";
import { Section } from "@/shared/ui/Section";
import { SectionLabel } from "@/shared/ui/SectionLabel";

const fieldClass =
  "w-full border border-border bg-transparent px-3 py-3 font-sans text-sm text-foreground placeholder:text-meta transition-colors focus:border-border-strong focus:outline-none focus-visible:ring-1 focus-visible:ring-accent";

export function Contact() {
  const [result, setResult] = useState<ContactResult | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const response = await submitContact({
        name: String(data.get("name") ?? ""),
        email: String(data.get("email") ?? ""),
        company: String(data.get("company") ?? ""),
        message: String(data.get("message") ?? ""),
      });
      setResult(response);
      if (response.ok) form.reset();
    });
  };

  return (
    <Section id="contact" ariaLabelledBy="contact-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <SectionLabel
              index={contactContent.index}
              label={contactContent.label}
              className="mb-8"
            />
            <h2
              id="contact-heading"
              className="font-display text-3xl tracking-[-0.02em] text-foreground sm:text-4xl"
            >
              {contactContent.title}
            </h2>
            <p className="mt-4 max-w-md text-muted">
              {contactContent.description}
            </p>
            <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-meta uppercase">
              {contactContent.emailLabel}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-2 inline-block font-mono text-sm text-accent transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
          </Reveal>

          <Reveal delayMs={80} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="grid gap-4 border border-border p-5 sm:p-8"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
                    {contactContent.fields.name}
                  </span>
                  <input
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={fieldClass}
                    placeholder="Alex Rivera"
                  />
                </label>
                <label className="grid gap-2">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
                    {contactContent.fields.email}
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClass}
                    placeholder="alex@company.com"
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
                  {contactContent.fields.company}
                </span>
                <input
                  name="company"
                  type="text"
                  autoComplete="organization"
                  className={fieldClass}
                  placeholder="Optional"
                />
              </label>

              <label className="grid gap-2">
                <span className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
                  {contactContent.fields.message}
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className={cn(fieldClass, "resize-y")}
                  placeholder="What you are building, constraints, timeline."
                />
              </label>

              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Button type="submit" disabled={pending}>
                  {pending ? "Sending…" : contactContent.cta}
                </Button>
                {result?.ok === true && (
                  <p className="text-sm text-accent" role="status">
                    {contactContent.success}
                  </p>
                )}
                {result?.ok === false && (
                  <p className="text-sm text-red-400" role="alert">
                    {result.error || contactContent.error}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
