"use client";

import { readConsent } from "./consent";

/**
 * Analytics events. GA4 loads only after analytics consent and the Meta Pixel only after
 * marketing consent (see components/analytics/analytics.tsx). Events fired before a
 * consented script is ready are queued, so a conversion on page load is not lost.
 * Without consent, events are dropped.
 */

type Command = [string, ...unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean };
  }
}

export type AnalyticsEvent = "generate_lead" | "whatsapp_click" | "phone_click";

/** GA4 event name → Meta standard event */
const metaEvents: Record<AnalyticsEvent, string> = {
  generate_lead: "Lead",
  whatsapp_click: "Contact",
  phone_click: "Contact",
};

const pending: { ga: Command[]; meta: Command[] } = { ga: [], meta: [] };

export function trackEvent(name: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const consent = readConsent();

  if (consent?.analytics) {
    const command: Command = ["event", name, params];
    if (window.gtag) window.gtag(...command);
    else pending.ga.push(command);
  }

  if (consent?.marketing) {
    const command: Command = ["track", metaEvents[name], params];
    if (window.fbq) window.fbq(...command);
    else pending.meta.push(command);
  }
}

/** Called once GA4 / the Meta Pixel are initialised, to send anything queued before. */
export function flushPending(destination: "ga" | "meta") {
  const send = destination === "ga" ? window.gtag : window.fbq;
  if (!send) return;
  for (const command of pending[destination].splice(0)) send(...command);
}
