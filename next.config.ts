import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content Security Policy. Static (no nonces) so every page can stay prerendered.
 * 'unsafe-inline' for scripts covers Next.js's inline bootstrap scripts and the tiny theme
 * script in <head>; everything else is an explicit allow-list:
 *   GA4 (googletagmanager / google-analytics), Meta Pixel (connect.facebook.net / facebook.com),
 *   Cloudflare Turnstile (challenges.cloudflare.com).
 * Sentry runs on the server only, so it needs no entry.
 * Development skips the CSP because React's dev tooling needs eval.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://*.google-analytics.com https://www.facebook.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net https://challenges.cloudflare.com",
  "frame-src https://challenges.cloudflare.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  ...(isDev ? [] : [{ key: "Content-Security-Policy", value: csp }]),
  // One week to start: browsers can't be told to forget this early. Raise it, and add
  // "; includeSubDomains", once every subdomain (pos, mail, ...) is confirmed on HTTPS.
  { key: "Strict-Transport-Security", value: "max-age=604800" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [
      // One canonical host. (Caddy redirects www first in production; this covers any other proxy.)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.ultimatepos.co.ke" }],
        destination: "https://ultimatepos.co.ke/:path*",
        permanent: true,
      },
      // Moved pages go here as 301s, e.g.:
      // { source: "/pos-kenya", destination: "/", permanent: true },
    ];
  },
};

// Blog posts are .mdx files imported from src/content/blog (not routed as pages).
// Plugins are named as strings so they work with Turbopack.
const withMDX = createMDX({
  options: { remarkPlugins: ["remark-gfm"] },
});

export default withMDX(nextConfig);
