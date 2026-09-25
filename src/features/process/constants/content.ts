export const processContent = {
  index: "05",
  label: "PROCESS",
  title: "How engagements run.",
  description:
    "A short path from signal to system. No theater. Every phase produces artifacts you keep.",
  phases: [
    {
      id: "P01",
      name: "Discovery",
      detail:
        "Constraints, success metrics, and system boundaries. We leave with a written problem definition.",
    },
    {
      id: "P02",
      name: "Architecture",
      detail:
        "Data model, service map, threat surface, and delivery plan. Decisions are documented, not implied.",
    },
    {
      id: "P03",
      name: "Build",
      detail:
        "Incremental delivery with reviewable PRs, tests at the right altitude, and continuous demoability.",
    },
    {
      id: "P04",
      name: "Launch",
      detail:
        "Hardening, observability, runbooks, and a cutover plan. Production is the acceptance criteria.",
    },
    {
      id: "P05",
      name: "Handover",
      detail:
        "Ownership transfer: docs, access, backlog hygiene, and optional retainer for evolution.",
    },
  ],
} as const;
