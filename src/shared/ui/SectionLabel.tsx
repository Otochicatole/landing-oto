import { cn } from "@/shared/lib/cn";

type SectionLabelProps = {
  index: string;
  label: string;
  className?: string;
  id?: string;
};

export function SectionLabel({
  index,
  label,
  className,
  id,
}: SectionLabelProps) {
  return (
    <p
      id={id}
      className={cn(
        "font-mono text-[11px] tracking-[0.22em] text-meta uppercase",
        className,
      )}
    >
      <span className="text-accent">{index}</span>
      <span className="mx-2 text-border-strong">/</span>
      <span>{label}</span>
    </p>
  );
}
