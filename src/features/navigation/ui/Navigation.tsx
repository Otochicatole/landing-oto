"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { navLinks, siteConfig } from "@/shared/constants/site";
import { cn } from "@/shared/lib/cn";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

function subscribeScroll(onStoreChange: () => void): () => void {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrolledSnapshot(): boolean {
  return window.scrollY > 12;
}

function getScrolledServerSnapshot(): boolean {
  return false;
}

export function Navigation() {
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolledSnapshot,
    getScrolledServerSnapshot,
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open
          ? "border-border bg-background/80 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-14 items-center justify-between sm:h-16">
        <Link
          href="#hero"
          className="font-display text-sm font-medium tracking-[0.18em] text-foreground uppercase transition-colors hover:text-accent"
          onClick={() => setOpen(false)}
        >
          {siteConfig.shortName}
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <Button href="#contact" size="sm" variant="ghost">
            Start a project
          </Button>
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center border border-border text-foreground transition-colors hover:border-border-strong md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span
              className={cn(
                "block h-px w-4 bg-foreground transition-transform duration-200",
                open && "translate-y-[3.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-4 bg-foreground transition-opacity duration-200",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-px w-4 bg-foreground transition-transform duration-200",
                open && "translate-y-[-3.5px] -rotate-45",
              )}
            />
          </span>
        </button>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <Container className="flex flex-col gap-1 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b border-border py-3 font-mono text-xs tracking-[0.18em] text-muted uppercase transition-colors hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button
            href="#contact"
            className="mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            Start a project
          </Button>
        </Container>
      </div>
    </header>
  );
}
