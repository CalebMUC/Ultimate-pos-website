import "server-only";
import { isProduction, serverEnv } from "@/env";
import { reportError, reportWarning } from "@/lib/monitoring";

export type TurnstileResult = "passed" | "failed" | "missing-token" | "not-configured";

/**
 * Verify a Cloudflare Turnstile token server-side.
 * A missing token is not automatically spam: visitors without JavaScript cannot run
 * the widget. The caller decides how to treat "missing-token" (we flag the lead as unverified).
 */
export async function verifyTurnstile(token: string | null, ip: string | null): Promise<TurnstileResult> {
  const secret = serverEnv().TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (isProduction) reportWarning("TURNSTILE_SECRET_KEY is not set: leads cannot be verified");
    return "not-configured";
  }
  if (!token) return "missing-token";

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip) body.set("remoteip", ip);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(5000),
    });
    const result = (await response.json()) as { success?: boolean; "error-codes"?: string[] };
    if (!result.success) reportWarning("Turnstile verification failed", { codes: result["error-codes"] });
    return result.success ? "passed" : "failed";
  } catch (error) {
    // If Cloudflare is unreachable, don't lose the lead: treat it like a missing token.
    reportError(error, { where: "verifyTurnstile" });
    return "missing-token";
  }
}
