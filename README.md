# Ultimate POS — marketing website

Marketing site for **Ultimate POS**, cloud POS and business management software built in Kenya.
Production URL: **https://ultimatepos.co.ke**

- Next.js 16.4 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS v4
- Every page is **fully prerendered**: complete HTML, metadata and JSON-LD in the first response
  (`ensureStatic = "navigation"` in `src/app/layout.tsx` fails the build otherwise)
- Lead forms (demo, quote, contact) via Server Actions — work **with and without JavaScript**
- Email via Resend + React Email · spam protection via honeypot, timing check, Cloudflare Turnstile, Upstash rate limit
- GA4, Meta Pixel and Vercel Analytics load **only after cookie consent**
- Server-side error monitoring via Sentry (optional)

Before going live, work through [`LAUNCH_CHECKLIST.md`](LAUNCH_CHECKLIST.md).

---

## Requirements

- **Node.js 24 LTS** (see `.nvmrc`). Node 20 is end-of-life; Vitest, Sentry and some build tooling need ≥ 22.
- npm 10+

## Getting started

```bash
npm install
cp .env.example .env.local   # optional for local work; every variable has a safe default
npm run dev                  # http://localhost:3000
```

Without any keys the site runs fully: emails are printed to the terminal instead of being sent,
Turnstile is skipped, and rate limiting uses memory.

## Scripts

| Command                 | What it does                                                           |
| ----------------------- | ---------------------------------------------------------------------- |
| `npm run dev`           | Development server                                                     |
| `npm run build`         | Production build (fails if any page stops being fully static)          |
| `npm start`             | Serve the production build                                             |
| `npm run typecheck`     | TypeScript                                                             |
| `npm run lint`          | ESLint (Next.js core-web-vitals + full jsx-a11y recommended)           |
| `npm run format`        | Prettier (with Tailwind class sorting); `format:check` in CI           |
| `npm test`              | Vitest unit + component tests                                          |
| `npm run test:e2e`      | Playwright end-to-end + axe accessibility tests (run `build` first)    |
| `npm run check:content` | Industry pages: title/description length, 600–1,000 words, unique copy |
| `npm run check:bundle`  | First-load JS budget per page (run `build` first)                      |

A pre-commit hook (Husky + lint-staged) runs ESLint and Prettier on staged files.

## Environment variables

All are optional locally. Set them in the hosting dashboard for production. See `.env.example`.

| Variable                                                                                            | Purpose                                                                                                         |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_ENV`                                                                              | `production` = indexable. Anything else serves `noindex` and a blocking robots.txt. Falls back to `VERCEL_ENV`. |
| `RESEND_API_KEY`                                                                                    | Sends lead emails. **Required in production** — without it, forms show the WhatsApp/phone fallback.             |
| `SALES_EMAIL` / `FROM_EMAIL`                                                                        | Defaults: `sales@ultimatepos.co.ke` / `no-reply@ultimatepos.co.ke`                                              |
| `EMAIL_TRANSPORT`                                                                                   | `console` prints emails instead of sending (local testing of a production build)                                |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY`                                           | Cloudflare Turnstile. Without them, leads arrive tagged `[Unverified]`.                                         |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`                                               | Rate limiting across server instances (5 leads/hour per IP and per email)                                       |
| `LEAD_WEBHOOK_URL`                                                                                  | Also POST every lead as JSON to a CRM / Zapier / Google Sheets Apps Script                                      |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_META_PIXEL_ID`                                                   | Analytics, loaded only after consent                                                                            |
| `SENTRY_DSN`                                                                                        | Server-side error monitoring                                                                                    |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `META_DOMAIN_VERIFICATION`, `FACEBOOK_APP_ID` | Verification `<meta>` tags                                                                                      |

## Editing content

| What                                                     | Where                                       |
| -------------------------------------------------------- | ------------------------------------------- |
| Business facts (phone, email, location, hours, socials…) | `src/config/site.ts` — the single source    |
| Features (only real, shipped capabilities)               | `src/content/features.ts`                   |
| Industry pages                                           | `src/content/solutions/<slug>.ts`           |
| FAQs                                                     | `src/content/faqs.ts`                       |
| Testimonials (consent required; samples never ship)      | `src/content/testimonials.ts`               |
| Client logos and headline numbers                        | `src/content/trust.ts`                      |
| Indexable pages (sitemap + which nav links appear)       | `src/config/routes.ts`                      |
| Colours, fonts, dark theme                               | `src/app/globals.css`, `src/app/layout.tsx` |

Adding a page: create it under `src/app/`, export `metadata` with `pageMetadata()` from
`src/lib/seo/metadata.ts`, and add it to `staticRoutes` in `src/config/routes.ts`. That puts it in
the sitemap and makes any nav/footer links to it appear (links to unregistered pages are hidden so
the site never links to a 404).

## Lead forms and email

`src/lib/leads/submit-lead.ts` handles all three forms: honeypot → validation (same Zod schema as
the browser) → rate limit → timing check → Turnstile → notification email to sales (Reply-To the
customer, one-tap Call/WhatsApp) → branded auto-reply → redirect to `/thank-you`.
If the notification email fails, the visitor sees a WhatsApp/phone fallback and the error is
reported; `saveLead()` keeps a webhook copy when configured.

**Resend setup:** add `ultimatepos.co.ke` in Resend → Domains, create the DNS records it shows
(SPF/DKIM `TXT`/`CNAME`, plus a DMARC `TXT` record such as `v=DMARC1; p=none; rua=mailto:sales@ultimatepos.co.ke`),
wait for "Verified", then create an API key with "Sending access" only.

**Turnstile setup:** Cloudflare dashboard → Turnstile → add site `ultimatepos.co.ke` (managed mode).

> Each form has its own exported Server Action (`submitDemo`, `submitQuote`, `submitContact`).
> Don't switch to `submitLead.bind(...)`: in Next.js 16.4 a bound action used with
> `useActionState` loops forever when a no-JavaScript submission returns errors.

## SEO

- Metadata API only: per-page title (≤ 60), description (≤ 155), self-referencing canonical,
  Open Graph + Twitter tags with generated 1200×630 images (`opengraph-image.tsx` files)
- JSON-LD: Organization, ProfessionalService (service-area business, no street number),
  WebSite, SoftwareApplication, FAQPage, BreadcrumbList. No self-serving ratings.
  SoftwareApplication gets `offers` only once `site.pricing.fromKesPerMonth` is set.
- `src/app/sitemap.ts`, `src/app/robots.ts` (preview/staging block all crawlers)
- `www.ultimatepos.co.ke` 301-redirects to the apex domain (`next.config.ts`)

## Security and privacy

- Security headers and a static Content-Security-Policy in `next.config.ts` (static so pages stay
  prerendered; `'unsafe-inline'` for scripts covers Next.js's inline bootstrap). Allow-listed: GA4,
  Meta Pixel, Turnstile, Vercel Analytics.
- Cookie consent (`src/lib/consent.ts`, `src/components/analytics/`): essential always on; analytics
  and marketing off until the visitor opts in. "Cookie settings" in the footer reopens the choice.
- Sentry sends no request bodies, headers, cookies or IPs (`src/instrumentation.ts`).

## Deploying (Vercel)

1. Import the GitHub repo in Vercel (framework: Next.js, Node 24).
2. Add the environment variables above for **Production** (and Preview, with test keys).
3. Add `ultimatepos.co.ke` and `www.ultimatepos.co.ke` under Domains; set the apex as primary.
4. Every pull request gets a preview deployment, which is automatically `noindex`
   (`VERCEL_ENV=preview`).

Self-hosting works too (`npm run build && npm start` behind a reverse proxy); Next.js gzips
responses by default.

## CI

`.github/workflows/ci.yml`: typecheck → lint → format → content check → unit tests → `npm audit`
→ build → JS budget → Playwright (desktop + mobile, with axe) → Lighthouse CI.
Lighthouse fails the build below 95 for Accessibility, Best Practices and SEO, and for CLS > 0.1.
Performance is reported as a warning there because CI measures a local `next start` (no CDN);
check Performance against the Vercel preview URL, e.g.
`npx @lhci/cli autorun --collect.url=https://<preview-url>/`.
Dependabot opens weekly update PRs.
