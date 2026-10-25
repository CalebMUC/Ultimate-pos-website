import "server-only";

/**
 * Error reporting for server code. Always logs to the server console; also sends to
 * Sentry when SENTRY_DSN is set (initialised in src/instrumentation.ts).
 * Never put personal data (names, phones, emails, message text) or secrets in `context`.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[ultimatepos] ${message}`, { ...context, stack: error instanceof Error ? error.stack : undefined });

  if (process.env.SENTRY_DSN) {
    void import("@sentry/nextjs").then((Sentry) => Sentry.captureException(error, { extra: context }));
  }
}

export function reportWarning(message: string, context: Record<string, unknown> = {}) {
  console.warn(`[ultimatepos] ${message}`, context);
}
