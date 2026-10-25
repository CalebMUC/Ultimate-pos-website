"use client";

/**
 * Analytics events. GA4 and the Meta Pixel are only loaded after the visitor accepts
 * analytics / marketing cookies (step 6), so until then these calls are no-ops.
 */

type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;
type FbqFn = (command: "track" | "trackCustom", name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    fbq?: FbqFn;
  }
}

export type AnalyticsEvent = "generate_lead" | "whatsapp_click" | "phone_click";

/** GA4 event name → Meta standard event */
const metaEvents: Record<AnalyticsEvent, string> = {
  generate_lead: "Lead",
  whatsapp_click: "Contact",
  phone_click: "Contact",
};

export function trackEvent(name: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
  window.fbq?.("track", metaEvents[name], params);
}
