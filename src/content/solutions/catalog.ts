/**
 * The industries we serve. Each entry gets a landing page at /solutions/[slug].
 * Full page copy lives in one file per slug in this folder (added in step 3).
 */

export type SolutionSlug =
  | "supermarket-minimart-pos"
  | "retail-shop-pos"
  | "wholesale-distribution-pos"
  | "pharmacy-chemist-pos"
  | "water-refill-delivery-pos"
  | "manufacturing-production-software"
  | "hardware-shop-pos"
  | "agrovet-pos"
  | "liquor-wines-spirits-pos"
  | "cosmetics-beauty-shop-pos"
  | "multi-branch-business-software";

export type SolutionIcon =
  | "supermarket"
  | "retail"
  | "wholesale"
  | "pharmacy"
  | "water"
  | "manufacturing"
  | "hardware"
  | "agrovet"
  | "liquor"
  | "cosmetics"
  | "branches";

export type SolutionSummary = {
  slug: SolutionSlug;
  /** Short name for menus and cards */
  name: string;
  /** Card description */
  summary: string;
  icon: SolutionIcon;
  /** Completes "Hi Ultimate POS, I run ___ and I'd like to know more about your POS." */
  whatsappIntro: string;
};

export const solutionCatalog: SolutionSummary[] = [
  {
    slug: "supermarket-minimart-pos",
    name: "Supermarkets & minimarts",
    summary: "Fast checkout, M-Pesa at the till and stock you can trust across every branch.",
    icon: "supermarket",
    whatsappIntro: "a supermarket",
  },
  {
    slug: "retail-shop-pos",
    name: "Retail shops",
    summary: "A simple till, accurate stock and credit customers under control.",
    icon: "retail",
    whatsappIntro: "a retail shop",
  },
  {
    slug: "wholesale-distribution-pos",
    name: "Wholesale & distribution",
    summary: "Purchasing, receivables, deliveries and riders in one system.",
    icon: "wholesale",
    whatsappIntro: "a wholesale business",
  },
  {
    slug: "pharmacy-chemist-pos",
    name: "Pharmacies & chemists",
    summary: "Prescription register, batch and expiry control and stock valuation.",
    icon: "pharmacy",
    whatsappIntro: "a pharmacy",
  },
  {
    slug: "water-refill-delivery-pos",
    name: "Water refilling & delivery",
    summary: "Refills, bundles, deliveries, rider cash-up and fuel tracking.",
    icon: "water",
    whatsappIntro: "a water refilling business",
  },
  {
    slug: "manufacturing-production-software",
    name: "Manufacturing & production",
    summary: "Production formulas, production runs and true cost per unit.",
    icon: "manufacturing",
    whatsappIntro: "a manufacturing business",
  },
  {
    slug: "hardware-shop-pos",
    name: "Hardware stores",
    summary: "Units of measure, bulk product import and credit customers.",
    icon: "hardware",
    whatsappIntro: "a hardware store",
  },
  {
    slug: "agrovet-pos",
    name: "Agrovets",
    summary: "Batch and expiry tracking, stock control and M-Pesa payments.",
    icon: "agrovet",
    whatsappIntro: "an agrovet",
  },
  {
    slug: "liquor-wines-spirits-pos",
    name: "Wines & spirits",
    summary: "Tight stock control, shift cash-ups and a full audit log.",
    icon: "liquor",
    whatsappIntro: "a wines and spirits shop",
  },
  {
    slug: "cosmetics-beauty-shop-pos",
    name: "Cosmetics & beauty shops",
    summary: "Brands, bundles and rewards that bring customers back.",
    icon: "cosmetics",
    whatsappIntro: "a cosmetics shop",
  },
  {
    slug: "multi-branch-business-software",
    name: "Multi-branch businesses",
    summary: "Branches, stock transfers, roles and an audit log under one account.",
    icon: "branches",
    whatsappIntro: "a business with several branches",
  },
];

const bySlug = new Map(solutionCatalog.map((s) => [s.slug, s]));

export function getSolutionSummary(slug: string) {
  return bySlug.get(slug as SolutionSlug);
}
