export const faqContent = {
  index: "07",
  label: "FAQ",
  title: "Practical questions.",
  items: [
    {
      question: "What kinds of projects do you take?",
      answer:
        "Production software with clear ownership: platforms, APIs, product rebuilds, and infrastructure that teams will run for years. We decline speculative MVPs without a path to operation.",
    },
    {
      question: "How do engagements start?",
      answer:
        "A short discovery sprint. You leave with a written problem definition, scope options, and a fixed or capped proposal — before any long commitment.",
    },
    {
      question: "Do you work with existing codebases?",
      answer:
        "Yes. Many engagements begin as architecture reviews or targeted modernization. We stabilize critical paths before expanding surface area.",
    },
    {
      question: "Who owns the IP?",
      answer:
        "You do. Source, infrastructure definitions, and documentation transfer fully at handover. No hostage tooling.",
    },
    {
      question: "What is your typical timeline?",
      answer:
        "Discovery is days to two weeks. Builds range from several weeks to multiple quarters depending on system complexity. We publish milestones up front.",
    },
  ],
} as const;
