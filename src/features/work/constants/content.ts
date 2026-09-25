export const workContent = {
  index: "04",
  label: "WORK",
  title: "Selected systems.",
  description:
    "Representative engagements. Details anonymized where required.",
  projects: [
    {
      id: "01",
      name: "Ledger Mesh",
      sector: "Fintech infrastructure",
      year: "2025",
      summary:
        "Multi-tenant transaction platform with idempotent APIs, audit trails, and sub-second settlement reporting.",
      stack: ["TypeScript", "PostgreSQL", "Next.js", "AWS"],
    },
    {
      id: "02",
      name: "Orbital Ops",
      sector: "Industrial IoT",
      year: "2024",
      summary:
        "Telemetry ingestion and control plane for distributed sensors — real-time dashboards with offline-tolerant edge sync.",
      stack: ["Go", "ClickHouse", "React", "Docker"],
    },
    {
      id: "03",
      name: "Signal Desk",
      sector: "B2B SaaS",
      year: "2024",
      summary:
        "Rebuild of a legacy CRM surface into a typed product platform with role-based access and zero-downtime migrations.",
      stack: ["TypeScript", "Prisma", "Redis", "Vercel"],
    },
  ],
} as const;
