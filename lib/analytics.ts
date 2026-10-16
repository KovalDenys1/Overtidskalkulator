"use client";

import { track } from "@vercel/analytics";

export function trackEvent(eventName: string, payload?: Record<string, string | number | boolean | null>) {
  try {
    track(eventName, payload);
  } catch {
    // Analytics must never break the calculator.
  }
}
