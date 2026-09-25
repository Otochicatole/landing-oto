import { navLinks, siteConfig } from "@/shared/constants/site";
import { Container } from "@/shared/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/30 py-12 sm:py-16">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-display text-sm font-medium tracking-[0.2em] text-foreground uppercase">
              {siteConfig.name}
            </p>
            <p className="mt-3 max-w-sm text-sm text-muted">
              {siteConfig.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col gap-3 lg:col-span-3"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] tracking-[0.18em] text-meta uppercase transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              {siteConfig.email}
            </a>
            <p className="font-mono text-[10px] tracking-[0.18em] text-meta uppercase">
              SYS · {year} · ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
