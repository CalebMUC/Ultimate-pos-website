/**
 * Public settings for browser code. Deliberately has no dependencies: importing the
 * Zod-validated src/env.ts from a client component would ship Zod (~150 KB) to every page.
 * The same variables are validated by src/env.ts at build time, so bad values still fail the build.
 */
const value = (v: string | undefined) => (v ? v : undefined);

export const clientEnv = {
  gaId: value(process.env.NEXT_PUBLIC_GA_ID),
  metaPixelId: value(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  turnstileSiteKey: value(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  /** Set automatically on Vercel deployments. */
  onVercel: Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV),
} as const;
