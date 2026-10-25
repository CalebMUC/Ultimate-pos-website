import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "wholesale-distribution-pos",
  updatedAt: "2026-10-25",
  metaTitle: "Wholesale & Distribution Software Kenya",
  metaDescription:
    "Wholesale and distribution software for Kenya: purchase orders, supplier ledgers, customer credit and aging, delivery orders, riders and rider cash-up.",
  h1: "Wholesale and distribution software that keeps stock, credit and deliveries in step",
  intro: [
    "Wholesale margins are thin and volumes are high, so small leaks add up fast: a supplier price rise you missed, a retailer whose credit ran too long, a rider whose collections never quite matched the deliveries.",
    "Ultimate POS brings purchasing, stock, customer credit and deliveries into one system. You buy at the right price, sell on credit with clear limits on risk, and account for every order that leaves the warehouse.",
  ],
  highlights: ["Purchasing and supplier ledgers", "Customer credit and aging", "Deliveries and rider cash-up"],
  challengesHeading: "Where wholesalers lose money — and how Ultimate POS stops it",
  challenges: [
    {
      problem:
        "Buying without knowing what you already owe suppliers or whether their prices have crept up since the last order.",
      solution:
        "Raise purchase orders, keep supplier ledgers and payables up to date, and watch supplier price trends. Open-order and purchase reports show what is coming and what it costs.",
      features: ["purchase-orders", "supplier-price-trends"],
    },
    {
      problem: "Retailers buying on credit with no clear picture of who is overdue, until cash flow is already tight.",
      solution:
        "Each customer has an account. Credit sales flow into receivables, and customer aging shows exactly who owes what and for how long — so collections are planned, not panicked.",
      features: ["customer-credit"],
    },
    {
      problem: "Deliveries that go out without a clear record, and riders whose collections are hard to reconcile.",
      solution:
        "Create delivery orders, assign them to riders, and cash up each rider when they return. Trips and fuel tracking show what each route really costs.",
      features: ["delivery-orders", "rider-cash-up", "trips-fuel"],
    },
    {
      problem: "Large catalogues and changing costs making stock value a guess.",
      solution:
        "Bulk import products, track stock in real time per branch or depot, and see stock valuation at any moment. Record cost revaluations when prices move.",
      features: ["bulk-import", "stock-levels", "stock-valuation"],
    },
  ],
  story: {
    heading: "A wholesale day with Ultimate POS",
    paragraphs: [
      "The morning starts with orders. Retail customers call or walk in, and their orders are captured against their accounts. The sales team can see each customer's outstanding balance before extending more credit.",
      "Orders for delivery become delivery orders, assigned to riders and drivers. Each trip is logged with its fuel, so by the end of the week you know which routes pay and which don't.",
      "In the afternoon, the buyer reviews stock levels and supplier price trends before raising purchase orders. When stock arrives it is received against the order, and the supplier ledger shows what you now owe.",
      "When riders return, each one is cashed up against the deliveries they made. The owner closes the day with sales, receivables, payables and stock value all in one place.",
    ],
  },
  gettingStarted:
    "Wholesalers usually have the biggest catalogues and the most customer accounts, so setup starts with your data. We import your products and categories from Excel or CSV, set up your branches or depots, and switch on the modules you need — deliveries for your riders, for example. Your sales, stores and delivery teams are then trained on the parts of the system they use every day.",
  featureIds: [
    "purchase-orders",
    "supplier-price-trends",
    "customer-credit",
    "customer-insights",
    "delivery-orders",
    "rider-cash-up",
    "trips-fuel",
    "stock-levels",
    "stock-valuation",
    "bulk-import",
    "profit-reports",
    "multi-branch",
  ],
  faqs: [
    {
      question: "Can Ultimate POS manage credit customers for a wholesale business?",
      answer:
        "Yes. Every customer can have an account for credit sales. Receivables and customer aging show who owes you and for how long, and customer buying insights show who buys what and how often.",
    },
    {
      question: "Does it handle deliveries and riders?",
      answer:
        "Yes. The deliveries module covers delivery orders, rider assignment, rider cash-up, and trips and fuel tracking.",
    },
    {
      question: "Can I track what I owe suppliers?",
      answer:
        "Yes. Supplier ledgers and payables track what you owe each supplier, alongside purchase orders, open orders and purchase reports.",
    },
    {
      question: "We have a warehouse and a few outlets. Can they share one system?",
      answer:
        "Yes. All locations sit under one account as branches, each with its own real-time stock. You move stock between them with transfers, which the receiving branch picks up from its transfer inbox.",
    },
    {
      question: "Can I see which customers buy the most?",
      answer:
        "Yes. Customer buying insights show who buys what, and how often, so you can look after your biggest accounts and notice when a regular customer stops ordering.",
    },
  ],
  related: ["supermarket-minimart-pos", "water-refill-delivery-pos", "multi-branch-business-software"],
};

export default content;
