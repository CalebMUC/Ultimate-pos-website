"use client";

import { openConsentSettings } from "@/lib/consent";

/** Footer link that re-opens the cookie consent settings. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentSettings} className={className}>
      Cookie settings
    </button>
  );
}
