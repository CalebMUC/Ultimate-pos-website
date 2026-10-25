"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { clientEnv } from "@/lib/public-env";
import { readConsent, subscribeConsent } from "@/lib/consent";
import { flushPending, trackEvent } from "@/lib/analytics";

const { gaId, metaPixelId: pixelId, onVercel } = clientEnv;

/**
 * Loads analytics only after consent:
 * - analytics consent → GA4, Vercel Analytics, Vercel Speed Insights (real-user Web Vitals)
 * - marketing consent → Meta Pixel
 * Also tracks clicks on any WhatsApp or phone link anywhere on the site.
 */
export function Analytics() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const analytics = Boolean(consent?.analytics);
  const marketing = Boolean(consent?.marketing);
  const pathname = usePathname();

  // GA4: set up the gtag queue ourselves (no inline script), then load gtag.js.
  useEffect(() => {
    if (!analytics || !gaId || window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // gtag.js expects the arguments object itself.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaId, { anonymize_ip: true });
    flushPending("ga");
  }, [analytics]);

  // Meta Pixel: the standard fbq queue stub, then load fbevents.js.
  const pixelReady = useRef(false);
  useEffect(() => {
    if (!marketing || !pixelId || window.fbq) return;
    // Same structure as Meta's official snippet: calls are queued until fbevents.js loads
    // and installs callMethod.
    type FbqStub = ((...args: unknown[]) => void) & {
      callMethod?: (...args: unknown[]) => void;
      queue: unknown[];
      push: unknown;
      loaded: boolean;
      version: string;
    };
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    } as FbqStub;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    (window as unknown as { _fbq: FbqStub })._fbq = fbq;
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    pixelReady.current = true;
    flushPending("meta");
  }, [marketing]);

  // Meta Pixel page views on client-side navigation (GA4 tracks history changes itself).
  const firstPath = useRef(pathname);
  useEffect(() => {
    if (pathname === firstPath.current) return;
    firstPath.current = pathname;
    if (pixelReady.current) window.fbq?.("track", "PageView");
  }, [pathname]);

  // WhatsApp and phone clicks, from any link on the site.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (href.startsWith("https://wa.me/")) trackEvent("whatsapp_click", { page: location.pathname });
      else if (href.startsWith("tel:")) trackEvent("phone_click", { page: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {analytics && gaId && (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      )}
      {marketing && pixelId && (
        <Script src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
      )}
      {analytics && onVercel && (
        <>
          <VercelAnalytics />
          <SpeedInsights />
        </>
      )}
    </>
  );
}
