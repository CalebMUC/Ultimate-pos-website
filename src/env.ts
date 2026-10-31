import { z } from "zod";
import { site } from "@/config/site";

/**
 * Environment variables, validated with Zod.
 *
 * Public values (NEXT_PUBLIC_*) are inlined at build time and may reach the browser.
 * Server values are read lazily through `serverEnv()` so a static build in CI does not
 * need production secrets. Secrets are optional at parse time; the code that needs one
 * decides what a missing value means (e.g. lib/email falls back to the console mailer
 * only outside production, and reports an error in production).
 */

const deploymentEnv = z.enum(["production", "preview", "development"]);

const publicSchema = z.object({
  /** production = indexable. Anything else is served with noindex. */
  NEXT_PUBLIC_SITE_ENV: deploymentEnv,
  NEXT_PUBLIC_GA_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/)
    .optional(),
  NEXT_PUBLIC_META_PIXEL_ID: z.string().regex(/^\d+$/).optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().min(1).optional(),
});

const serverSchema = z.object({
  /** "resend" sends real email; "console" logs it (local testing only). Defaults to resend when a key is set. */
  EMAIL_TRANSPORT: z.enum(["resend", "console"]).optional(),
  /** Lets EMAIL_TRANSPORT=console work in a production build. Set only by the end-to-end tests. */
  ALLOW_CONSOLE_EMAIL: z.enum(["true"]).optional(),
  RESEND_API_KEY: z.string().min(1).optional(),
  SALES_EMAIL: z.email().default(site.email.sales),
  FROM_EMAIL: z.email().default(site.email.from),
  TURNSTILE_SECRET_KEY: z.string().min(1).optional(),
  UPSTASH_REDIS_REST_URL: z.url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
  LEAD_WEBHOOK_URL: z.url().optional(),
  /** Lead submissions allowed per hour per IP and per email. Raised only for end-to-end tests. */
  LEAD_RATE_LIMIT_PER_HOUR: z.coerce.number().int().positive().default(5),
  SENTRY_DSN: z.url().optional(),
});

const emptyToUndefined = (value: string | undefined) => (value === "" ? undefined : value);

function resolveSiteEnv() {
  const explicit = emptyToUndefined(process.env.NEXT_PUBLIC_SITE_ENV);
  if (explicit) return explicit;
  // Vercel sets VERCEL_ENV for production / preview deployments.
  const vercel = emptyToUndefined(process.env.VERCEL_ENV);
  if (vercel) return vercel;
  return process.env.NODE_ENV === "production" ? "production" : "development";
}

export const publicEnv = publicSchema.parse({
  NEXT_PUBLIC_SITE_ENV: resolveSiteEnv(),
  NEXT_PUBLIC_GA_ID: emptyToUndefined(process.env.NEXT_PUBLIC_GA_ID),
  NEXT_PUBLIC_META_PIXEL_ID: emptyToUndefined(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: emptyToUndefined(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
});

export const isProduction = publicEnv.NEXT_PUBLIC_SITE_ENV === "production";

/** Search-engine / social verification codes (not secret; read at build time for <meta> tags). */
export const seoEnv = z
  .object({
    GOOGLE_SITE_VERIFICATION: z.string().min(1).optional(),
    BING_SITE_VERIFICATION: z.string().min(1).optional(),
    META_DOMAIN_VERIFICATION: z.string().min(1).optional(),
    FACEBOOK_APP_ID: z.string().regex(/^\d+$/).optional(),
  })
  .parse({
    GOOGLE_SITE_VERIFICATION: emptyToUndefined(process.env.GOOGLE_SITE_VERIFICATION),
    BING_SITE_VERIFICATION: emptyToUndefined(process.env.BING_SITE_VERIFICATION),
    META_DOMAIN_VERIFICATION: emptyToUndefined(process.env.META_DOMAIN_VERIFICATION),
    FACEBOOK_APP_ID: emptyToUndefined(process.env.FACEBOOK_APP_ID),
  });

export type ServerEnv = z.infer<typeof serverSchema>;

let cachedServerEnv: ServerEnv | undefined;

export function serverEnv(): ServerEnv {
  if (typeof window !== "undefined") {
    throw new Error("serverEnv() must never be called in the browser");
  }
  cachedServerEnv ??= serverSchema.parse(
    Object.fromEntries(Object.keys(serverSchema.shape).map((key) => [key, emptyToUndefined(process.env[key])])),
  );
  return cachedServerEnv;
}
