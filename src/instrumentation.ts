import type { Instrumentation } from "next";

/**
 * Server-side error monitoring with Sentry. Loaded only when SENTRY_DSN is set, so local
 * development and CI never pull Sentry in. Browser-side Sentry is intentionally not
 * installed: it would add ~30 KB of JavaScript to every page of a mostly static site,
 * and the failures that matter (form submissions, email) happen on the server.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || !process.env.SENTRY_DSN) return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_SITE_ENV ?? process.env.VERCEL_ENV ?? process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    // Lead forms contain personal data: send no request bodies, headers (incl. IP), cookies,
    // query strings or user info. Sentry's defaults collect all of these.
    dataCollection: {
      userInfo: false,
      cookies: false,
      httpHeaders: false,
      httpBodies: [],
      urlQueryParams: false,
    },
  });
}

export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  if (process.env.NEXT_RUNTIME !== "nodejs" || !process.env.SENTRY_DSN) return;
  const Sentry = await import("@sentry/nextjs");
  Sentry.captureRequestError(error, request, context);
};
