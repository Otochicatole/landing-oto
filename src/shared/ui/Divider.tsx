import { cn } from "@/shared/lib/cn";

type DividerProps = {
  className?: string;
};

export function Divider({ className }: DividerProps) {
  return (
    <div
      role="presentation"
      className={cn("h-px w-full bg-border", className)}
    />
  );
}
