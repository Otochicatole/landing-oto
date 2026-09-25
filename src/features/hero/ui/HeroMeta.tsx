import { heroContent } from "@/features/hero/constants/content";
import { cn } from "@/shared/lib/cn";

type HeroMetaProps = {
  className?: string;
};

export function HeroMeta({ className }: HeroMetaProps) {
  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-6 gap-y-2 border-t border-border pt-4 font-mono text-[10px] tracking-[0.18em] text-meta uppercase sm:gap-x-8",
        className,
      )}
    >
      {heroContent.meta.map((item) => (
        <li key={item.key} className="flex items-center gap-2">
          <span className="text-accent">{item.key}</span>
          <span className="text-border-strong">·</span>
          <span className="text-muted">{item.value}</span>
        </li>
      ))}
    </ul>
  );
}
