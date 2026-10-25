import "server-only";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { isProduction, serverEnv } from "@/env";
import { reportError, reportWarning } from "@/lib/monitoring";

/** Lead submissions per hour (default 5), counted separately per IP address and per email address. */
const limit = () => serverEnv().LEAD_RATE_LIMIT_PER_HOUR;
const WINDOW_MS = 60 * 60 * 1000;

let upstash: Ratelimit | null | undefined;

function getUpstash(): Ratelimit | null {
  if (upstash !== undefined) return upstash;
  const { UPSTASH_REDIS_REST_URL: url, UPSTASH_REDIS_REST_TOKEN: token } = serverEnv();
  if (!url || !token) {
    if (isProduction) reportWarning("Upstash is not configured: falling back to in-memory rate limiting");
    upstash = null;
    return upstash;
  }
  upstash = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(limit(), "1 h"),
    prefix: "ultimatepos:leads",
  });
  return upstash;
}

// Fallback for local development (per server instance only).
const memory = new Map<string, number[]>();

function memoryLimit(key: string): boolean {
  const now = Date.now();
  const hits = (memory.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= limit()) {
    memory.set(key, hits);
    return false;
  }
  hits.push(now);
  memory.set(key, hits);
  return true;
}

async function allow(key: string): Promise<boolean> {
  const limiter = getUpstash();
  if (!limiter) return memoryLimit(key);
  try {
    return (await limiter.limit(key)).success;
  } catch (error) {
    // Fail open: a Redis outage must not block real customers.
    reportError(error, { where: "rateLimit" });
    return true;
  }
}

/** Returns true when the submission is within the limits for both the IP and the email. */
export async function checkLeadRateLimit({ ip, email }: { ip: string | null; email: string }) {
  const [ipOk, emailOk] = await Promise.all([
    ip ? allow(`ip:${ip}`) : Promise.resolve(true),
    allow(`email:${email.toLowerCase()}`),
  ]);
  return ipOk && emailOk;
}
