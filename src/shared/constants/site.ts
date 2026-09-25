export const siteConfig = {
  name: "Otochi Software",
  shortName: "Otochi",
  tagline: "Software systems built with mission-grade precision.",
  description:
    "Otochi Software designs and builds production-grade software systems — web platforms, APIs, and product infrastructure — with measurable architecture, clean delivery, and long-term ownership.",
  url: "https://otochi.software",
  email: "hello@otochi.software",
  locale: "en_US",
  twitterHandle: "@otochisoftware",
} as const;

export const navLinks = [
  { label: "Capabilities", href: "#capabilities" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
] as const;

export type NavLink = (typeof navLinks)[number];
