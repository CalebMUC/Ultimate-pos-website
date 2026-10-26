/**
 * Business facts — the single source of truth.
 * Header, footer, JSON-LD, emails and WhatsApp links all import from here.
 * Never hard-code any of these values anywhere else.
 */

export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "tiktok" | "youtube" | "x";

export const site = {
  name: "Ultimate POS",
  legalName: "Ultimate POS",
  // [[PLACEHOLDER]] confirm final tagline
  tagline: "Run every branch, every sale, every shilling — from one system.",
  description:
    "Cloud POS and business management software built in Kenya: M-Pesa payments, stock control, multi-branch management and real-time reports.",

  url: "https://ultimatepos.co.ke",

  /** Service-area business: no walk-in office, never show a street number. */
  location: {
    area: "Kiambu Road",
    locality: "Kiambu",
    region: "Kiambu County",
    country: "Kenya",
    countryCode: "KE",
    display: "Based on Kiambu Road, Kiambu · Serving businesses across Kenya",
  },

  phone: {
    display: "0720 463 710",
    e164: "+254720463710",
    tel: "tel:+254720463710",
  },

  whatsapp: {
    number: "254720463710",
    url: "https://wa.me/254720463710",
  },

  email: {
    sales: "sales@ultimatepos.co.ke",
    // Must be on a domain verified with the email provider (SPF, DKIM, DMARC).
    from: "no-reply@ultimatepos.co.ke",
  },

  // [[PLACEHOLDER]] confirm business hours
  hours: {
    display: "Mon–Sat, 8:00am–6:00pm",
    // schema.org openingHoursSpecification
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "18:00",
  },

  // [[PLACEHOLDER]] how quickly sales replies to a lead (used in auto-reply + thank-you page)
  responseTime: "1 business day",

  // [[PLACEHOLDER]] add profile URLs. Only networks with a URL are rendered.
  social: {} as Partial<Record<SocialNetwork, string>>,

  /** Square brand mark used for structured data and icons. [[PLACEHOLDER]] replace with the official logo. */
  logo: "/logo.svg",

  // [[PLACEHOLDER]] "From KES x/month". While null, no price appears anywhere (pages or structured data).
  pricing: { fromKesPerMonth: null as number | null },

  // [[PLACEHOLDER]] app login URL. The header "Log in" link is hidden while this is null.
  appLoginUrl: null as string | null,

  /** Facts used by /privacy-policy and /terms. Have a lawyer review both pages before launch. */
  legal: {
    // [[PLACEHOLDER]] registered business / company name, if different from the brand
    entityName: "Ultimate POS",
    // [[PLACEHOLDER]] Office of the Data Protection Commissioner (ODPC) registration number, once registered
    odpcRegistrationNumber: null as string | null,
    // [[PLACEHOLDER]] confirm how long enquiries from people who don't become customers are kept
    leadRetentionMonths: 24,
    privacyPolicyUpdated: "2026-10-26",
    termsUpdated: "2026-10-26",
  },

  locale: "en-KE",
  ogLocale: "en_KE",
  currency: "KES",
} as const;

export type Site = typeof site;

export function activeSocials() {
  return Object.entries(site.social).filter(
    (entry): entry is [SocialNetwork, string] => typeof entry[1] === "string" && entry[1].length > 0,
  );
}
