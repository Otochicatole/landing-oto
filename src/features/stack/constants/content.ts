export const stackContent = {
  index: "03",
  label: "STACK",
  title: "Technology with intent.",
  description:
    "We choose tools for operability and longevity — not trends. The stack flexes to the system, never the other way around.",
  groups: [
    {
      name: "Languages",
      items: ["TypeScript", "Go", "Python", "SQL"],
    },
    {
      name: "Runtime",
      items: ["Node.js", "Next.js", "React", "Bun"],
    },
    {
      name: "Data",
      items: ["PostgreSQL", "Redis", "Prisma", "ClickHouse"],
    },
    {
      name: "Cloud",
      items: ["Vercel", "AWS", "Docker", "Terraform"],
    },
    {
      name: "Quality",
      items: ["Vitest", "Playwright", "OpenTelemetry", "GitHub Actions"],
    },
  ],
} as const;
