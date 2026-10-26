# Launch checklist

Everything that must be confirmed or supplied before the site goes live.
Search the code for `[[PLACEHOLDER]]` to find each one.

## Pages (all built — these need review; launch blockers marked ⚠)

- [ ] ⚠ **Lawyer review** of `/privacy-policy` and `/terms` (Kenya Data Protection Act 2019). Confirm in `src/config/site.ts` → `legal`:
  - [ ] Registered business name (`entityName`)
  - [ ] ODPC data-controller registration number (`odpcRegistrationNumber` — shown on the page once set)
  - [ ] How long enquiries are kept (`leadRetentionMonths`, currently 24)
  - [ ] The service-provider list in `src/app/(legal)/privacy-policy/page.tsx` matches what you actually use (e.g. if you don't host on Vercel)
- [ ] `/about`: add the real story — when and why Ultimate POS started, who is behind it, team photos (with permission)
- [ ] `/blog`: review both articles in `src/content/blog/`. The buyer's guide tells readers to ask vendors about KRA eTIMS, so make sure sales can answer that for Ultimate POS
- [ ] `/testimonials`: returns 404 until the first real, consented testimonial is added, then appears in the sitemap and footer automatically
- [ ] `/pricing`: shows "From KES …" automatically once `site.pricing.fromKesPerMonth` is set

New pages appear in the nav, footer and sitemap once added to `staticRoutes` in `src/config/routes.ts`.

## Business facts — `src/config/site.ts`

- [x] Domain: `https://ultimatepos.co.ke` (decide whether `www.` redirects to the apex at the DNS/host level)
- [x] Sales email: `sales@ultimatepos.co.ke`
- [x] Phone / WhatsApp: 0720 463 710
- [ ] From address `no-reply@ultimatepos.co.ke` — verify the domain in Resend (SPF, DKIM, DMARC records)
- [ ] Tagline — currently "Run every branch, every sale, every shilling — from one system."
- [ ] Business hours — currently Mon–Sat, 8:00am–6:00pm
- [ ] Lead response time promise — currently "1 business day"
- [ ] Social profile URLs (Facebook, Instagram, LinkedIn, TikTok, YouTube) — only filled ones render
- [ ] App login URL — the header "Log in" link is hidden until set

## Brand

- [x] Colours: green and white with blue accents (tokens in `src/app/globals.css`)
- [x] Fonts: Plus Jakarta Sans (headings), Inter (body)
- [ ] Official logo — replace the placeholder mark in `src/components/layout/logo.tsx`, `public/logo.svg` (used in structured data and as the favicon), `src/app/apple-icon.tsx` and `src/lib/seo/og-image.tsx`
- [ ] Real product screenshots (dashboard, POS screen, M-Pesa, stock, reports) to replace the illustration in `src/components/sections/product-mockup.tsx`

## Product claims — `src/content/features.ts`

- [ ] Confirm backup policy before stating frequency or retention
- [ ] KRA eTIMS integration? (not mentioned anywhere until confirmed)
- [ ] Offline mode? (not mentioned)
- [ ] Hardware bundles — printers, scanners, cash drawers? (not mentioned)
- [ ] Android / mobile app? (not mentioned)
- [ ] Which specific permissions exist (discounts, refunds, price edits, approvals)? Copy currently says only "roles and fine-grained permissions"

## Copy review

- [ ] Someone in the business reads all 11 industry pages (`src/content/solutions/*.ts`) and the features page, and corrects anything that doesn't match how Ultimate POS actually works. Run `npm run check:content` after editing.

## Social proof

- [ ] Real testimonials with written consent — `src/content/testimonials.ts` (section is hidden until one exists)
- [ ] Client logos with permission — `src/content/trust.ts`
- [ ] Real headline numbers (businesses, branches, transactions) — `src/content/trust.ts`

## Pricing

- [ ] Publish a "From KES x/month" price (`site.pricing.fromKesPerMonth`), or keep "Get a tailored quote" only. Google only shows SoftwareApplication rich results when a price (and reviews/ratings) exist, so without a price that schema stays valid but not rich-result eligible.

## Accounts and keys (set in the hosting dashboard, see `.env.example`)

- [ ] Resend API key
- [ ] Cloudflare Turnstile site key + secret key
- [ ] Upstash Redis (rate limiting)
- [ ] GA4 measurement ID
- [ ] Meta Pixel ID (optional)
- [ ] Verification codes: `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `META_DOMAIN_VERIFICATION`, `FACEBOOK_APP_ID` (optional)
- [ ] Sentry DSN

## After launch

- [ ] Submit `https://ultimatepos.co.ke/sitemap.xml` in Google Search Console and Bing Webmaster Tools
- [ ] Run the Rich Results Test on `/`, `/features` and a solution page
- [ ] Make sure `www.ultimatepos.co.ke` 301-redirects to `https://ultimatepos.co.ke` (canonical host)
- [ ] Scrape every key URL in the Meta Sharing Debugger
- [ ] Create and verify a Google Business Profile as a service-area business (address hidden, same name and phone)
- [ ] Confirm the host/WAF does not block `Googlebot` or `facebookexternalhit`
