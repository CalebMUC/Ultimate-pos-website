"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { clientEnv } from "@/lib/public-env";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

/**
 * Cloudflare Turnstile challenge (strictly necessary for spam protection, so it does not
 * wait for cookie consent). It adds a hidden "cf-turnstile-response" field to the form.
 * Renders nothing when no site key is configured (local development).
 * Pass a changing `resetKey` to get a fresh token after a failed submission.
 */
export function TurnstileWidget({ resetKey }: { resetKey?: unknown }) {
  const siteKey = clientEnv.turnstileSiteKey;
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);

  const renderWidget = useCallback(() => {
    if (!siteKey || !container.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: siteKey,
      theme: document.documentElement.dataset.theme === "dark" ? "dark" : "light",
      size: "flexible",
    });
  }, [siteKey]);

  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [renderWidget]);

  useEffect(() => {
    if (resetKey && widgetId.current) window.turnstile?.reset(widgetId.current);
  }, [resetKey]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={container} className="min-h-[65px]" />
    </>
  );
}
