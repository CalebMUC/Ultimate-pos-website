/**
 * Error reporting. Logs to the server console today; Sentry is wired in here in step 7
 * so call sites never change. Never include secrets in `context`.
 */
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[ultimatepos] ${message}`, { ...context, stack: error instanceof Error ? error.stack : undefined });
}

export function reportWarning(message: string, context: Record<string, unknown> = {}) {
  console.warn(`[ultimatepos] ${message}`, context);
}
