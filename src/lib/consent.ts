"use client";

/**
 * Cookie consent (Kenya Data Protection Act, 2019). Essential cookies are always on;
 * analytics (GA4, Vercel Analytics/Speed Insights) and marketing (Meta Pixel) are off
 * until the visitor opts in. The choice is stored in a first-party cookie for 180 days.
 */

export type ConsentChoices = { analytics: boolean; marketing: boolean };

const COOKIE = "up_consent";
const VERSION = "1"; // bump to ask everyone again after a material policy change
const MAX_AGE = 60 * 60 * 24 * 180;
const CHANGE_EVENT = "up:consent-change";
const OPEN_EVENT = "up:consent-open";

let cachedRaw: string | undefined;
let cachedValue: ConsentChoices | null = null;

function parse(raw: string | undefined): ConsentChoices | null {
  // Format: v1:a1m0
  const match = raw?.match(/^v(\d+):a([01])m([01])$/);
  if (!match || match[1] !== VERSION) return null;
  return { analytics: match[2] === "1", marketing: match[3] === "1" };
}

/** The visitor's saved choice, or null if they haven't chosen yet. Stable between calls. */
export function readConsent(): ConsentChoices | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${COOKIE}=`))
    ?.slice(COOKIE.length + 1);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedValue = parse(raw);
  }
  return cachedValue;
}

export function saveConsent(choices: ConsentChoices) {
  const value = `v${VERSION}:a${choices.analytics ? 1 : 0}m${choices.marketing ? 1 : 0}`;
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeConsent(listener: () => void) {
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

/** Re-open the banner (e.g. from the footer's "Cookie settings" link). */
export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function subscribeConsentOpen(listener: () => void) {
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
