"use server";

import { siteConfig } from "@/shared/constants/site";

export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  message: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function submitContact(
  payload: ContactPayload,
): Promise<ContactResult> {
  const name = payload.name.trim();
  const email = payload.email.trim();
  const company = payload.company.trim();
  const message = payload.message.trim();

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and brief are required." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (message.length < 20) {
    return {
      ok: false,
      error: "Brief should be at least a few sentences.",
    };
  }

  // v1: structured log for ops; wire to email provider when ready
  console.info("[contact]", {
    to: siteConfig.email,
    name,
    email,
    company: company || null,
    message,
    at: new Date().toISOString(),
  });

  return { ok: true };
}
