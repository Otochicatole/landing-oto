import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  ariaLabelledBy?: string;
};

export function Section({
  id,
  children,
  className,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "relative scroll-mt-24 border-t border-border bg-background/15 py-20 sm:py-28 lg:py-32",
        className,
      )}
    >
      {children}
    </section>
  );
}
