export const metricsContent = {
  index: "06",
  label: "METRICS",
  title: "Operating envelope.",
  description: "Capacity and constraints we are explicit about.",
  items: [
    { value: "≤ 2", unit: "concurrent builds", note: "Depth over parallel theater" },
    { value: "48h", unit: "response SLA", note: "Business days, written updates" },
    { value: "100%", unit: "source handover", note: "Repos, docs, infra as code" },
    { value: "0", unit: "vendor lock-in tax", note: "Portable architecture by default" },
  ],
} as const;
