import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "cosmetics-beauty-shop-pos",
  metaTitle: "Cosmetics & Beauty Shop POS Kenya",
  metaDescription:
    "POS for cosmetics and beauty shops in Kenya: organise stock by brand, sell gift sets as bundles, reward loyal customers, track expiry and take M-Pesa.",
  h1: "Cosmetics and beauty shop POS that keeps customers coming back",
  intro: [
    "A cosmetics shop sells hundreds of small, similar-looking items across dozens of brands — lotions, hair products, make-up, fragrances — and depends on regular customers who come back every few weeks. Keeping track of all that by memory doesn't scale.",
    "Ultimate POS organises your stock by brand and category, lets you sell gift sets and combos as bundles, rewards your loyal customers, and shows which brands actually make you money.",
  ],
  highlights: ["Organise stock by brand", "Bundles and gift sets", "Rewards for loyal customers"],
  challengesHeading: "Beauty retail challenges Ultimate POS solves",
  challenges: [
    {
      problem: "Hundreds of similar products across many brands, hard to find at the counter and harder to count.",
      solution:
        "Organise products by brand and category, import your catalogue from a spreadsheet, and scan barcodes at checkout. Stock levels update with every sale.",
      features: ["catalogue-setup", "bulk-import", "pos-checkout"],
    },
    {
      problem: "Regular customers who could easily shop elsewhere next time.",
      solution:
        "Reward loyal customers with customer discounts and rewards at the till. Customer buying insights show who buys what and how often, so you know your best customers.",
      features: ["discounts-rewards", "customer-insights"],
    },
    {
      problem: "Gift sets and promotions that are a mess to price and track in stock.",
      solution:
        "Create product bundles — a gift set or a hair-care combo — sold at one price while each item is still deducted from stock.",
      features: ["bundles"],
    },
    {
      problem: "Products with a shelf life that expire before they sell.",
      solution:
        "Track batches and expiry dates where they matter, and use expiry reports to clear stock in time — with a discount or a bundle — instead of writing it off.",
      features: ["batch-expiry"],
    },
  ],
  story: {
    heading: "How a beauty shop runs on Ultimate POS",
    paragraphs: [
      "New stock arrives from distributors and is received into the right brand and category. Prices are set once, and the shelves and the system agree.",
      "At the counter, the attendant scans items, applies the customer's rewards and takes payment by M-Pesa. A customer buying a gift set gets the bundle price, and each item in the set comes out of stock.",
      "Each week, the owner looks at profit by product and customer buying insights to decide which brands to reorder, which to promote, and which to drop.",
      "With more than one shop, each branch keeps its own stock, and slow-moving brands can be transferred to the branch where they sell best.",
      "Before a busy season like Christmas or Valentine's Day, the owner creates gift-set bundles from existing stock and checks stock levels for the best-selling brands, so the shelves are ready before the rush starts.",
    ],
  },
  gettingStarted:
    "Most beauty shops already have a product list somewhere — a spreadsheet from a distributor, or a stock book. We import your products and categories from Excel or CSV and organise them by brand, so the counter can find any item quickly. We then set up rewards for your regular customers, the gift sets you sell as bundles, and logins for your staff, and we train everyone before you go live.",
  featureIds: [
    "catalogue-setup",
    "bulk-import",
    "bundles",
    "discounts-rewards",
    "customer-insights",
    "batch-expiry",
    "pos-checkout",
    "mpesa",
    "stock-levels",
    "profit-reports",
    "cash-up",
    "multi-branch",
  ],
  faqs: [
    {
      question: "Can I organise my products by brand?",
      answer: "Yes. Products can be organised by brand and category, with units of measure set per product.",
    },
    {
      question: "Can I reward my loyal customers?",
      answer:
        "Yes. Customer discounts and rewards can be applied at the till, and customer buying insights show who buys what and how often.",
    },
    {
      question: "Can I sell gift sets and combos?",
      answer:
        "Yes. Product bundles let you sell items together at one price, while each item in the bundle is still deducted from stock.",
    },
    {
      question: "Can I track products that expire?",
      answer: "Yes. Batch and expiry tracking and expiry reports help you sell stock before it expires.",
    },
    {
      question: "Can I see which brands sell best?",
      answer:
        "Yes. Profit by product and margin reports show which products and brands earn the most, and customer buying insights show what your regular customers come back for.",
    },
  ],
  related: ["retail-shop-pos", "pharmacy-chemist-pos", "supermarket-minimart-pos"],
};

export default content;
