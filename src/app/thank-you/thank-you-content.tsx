"use client";

import { useEffect, useSyncExternalStore } from "react";
import { site } from "@/config/site";
import { trackEvent } from "@/lib/analytics";

type LeadType = "demo" | "quote" | "contact";

const copy: Record<LeadType | "default", { heading: string; body: string }> = {
  demo: {
    heading: "Thank you — your demo request is in",
    body: `We'll call you within ${site.responseTime} to confirm a time that suits you.`,
  },
  quote: {
    heading: "Thank you — your quote request is in",
    body: `We'll prepare your quote and call you within ${site.responseTime} to go through it.`,
  },
  contact: {
    heading: "Thank you — your message is in",
    body: `We'll get back to you within ${site.responseTime}.`,
  },
  default: {
    heading: "Thank you — we've received your request",
    body: `We'll get back to you within ${site.responseTime}.`,
  },
};

function readParams() {
  return window.location.search;
}
const noop = () => () => {};

/**
 * Reads ?type= in the browser so the page itself stays static (no request-time rendering).
 * The prerendered HTML shows the generic message; the specific one replaces it after load.
 */
export function ThankYouContent() {
  const search = useSyncExternalStore(noop, readParams, () => "");
  const params = new URLSearchParams(search);
  const typeParam = params.get("type");
  const type: LeadType | null =
    typeParam === "demo" || typeParam === "quote" || typeParam === "contact" ? typeParam : null;
  const ref = params.get("ref");
  const { heading, body } = copy[type ?? "default"];

  // Fire the conversion once per lead (not again on refresh).
  useEffect(() => {
    if (!type || !ref || ref === "ok") return;
    const key = `lead-tracked-${ref}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Storage unavailable: still record the conversion.
    }
    trackEvent("generate_lead", { form_type: type });
  }, [type, ref]);

  return (
    <>
      <h1 className="mt-6 text-3xl font-extrabold text-fg sm:text-4xl">{heading}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted-fg">{body}</p>
    </>
  );
}
