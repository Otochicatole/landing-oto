import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/shared/lib/cn";
import type { ButtonSize, ButtonVariant } from "@/shared/types";

const variantClasses: Record<ButtonVariant, string> = {
  solid:
    "border border-foreground/90 bg-foreground text-background hover:bg-foreground/90",
  ghost:
    "border border-border bg-transparent text-foreground hover:border-border-strong hover:bg-surface",
  line: "border-b border-foreground/40 bg-transparent px-0 pb-1 text-foreground hover:border-accent hover:text-accent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs tracking-[0.14em]",
  md: "px-5 py-2.5 text-xs tracking-[0.16em] sm:text-[13px]",
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  children,
  className,
  variant = "solid",
  size = "md",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-mono uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variant !== "line" && sizeClasses[size],
    variant === "line" && "text-xs tracking-[0.16em] uppercase",
    variantClasses[variant],
    className,
  );

  if ("href" in props && props.href) {
    const { href, ...linkProps } = props;
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
