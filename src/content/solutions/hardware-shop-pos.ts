import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "hardware-shop-pos",
  updatedAt: "2026-10-25",
  metaTitle: "Hardware Store POS System Kenya",
  metaDescription:
    "POS for Kenyan hardware stores: units of measure, bulk product import from Excel, contractor credit accounts, stock control and M-Pesa payments.",
  h1: "Hardware store POS for thousands of products and the contractors who buy them",
  intro: [
    "A hardware store stocks thousands of items, from cement and iron sheets to screws, paint, pipes and electrical fittings. Many are sold in different units, prices change with every delivery, and your best customers — fundis and contractors — often buy on credit.",
    "Ultimate POS lets you load your whole catalogue from a spreadsheet, set the unit each product is sold in, sell on credit to contractors with clear customer aging, and see exactly what stock you hold and what it is worth.",
  ],
  highlights: ["Units of measure for every product", "Bulk import from Excel or CSV", "Contractor credit accounts"],
  challengesHeading: "Hardware store problems we solve",
  challenges: [
    {
      problem: "A huge, varied catalogue that would take weeks to type into any system.",
      solution:
        "Bulk import products and categories from Excel or CSV. Organise them by category and brand, and set the unit of measure each item is sold in.",
      features: ["bulk-import", "catalogue-setup"],
    },
    {
      problem:
        "Contractors and fundis buying on credit across many visits, with balances that are hard to keep track of.",
      solution:
        "Give each contractor a customer account and sell on credit. Receivables and customer aging show who owes you, how much and since when, and customer buying insights show who your biggest buyers are.",
      features: ["customer-credit", "customer-insights"],
    },
    {
      problem: "Heavy, valuable stock — cement, iron sheets, steel — where shrinkage is expensive and hard to notice.",
      solution:
        "Stock updates in real time with every sale and delivery, and every adjustment needs a reason. Stock movement reports and the audit log show where stock went and who touched it.",
      features: ["stock-levels", "stock-adjustments-transfers", "audit-log"],
    },
    {
      problem: "Supplier prices that change constantly, making it hard to price correctly and protect margins.",
      solution:
        "Track supplier price trends, record cost revaluations when prices move, and use profit by product and margin reports to see which items still earn their keep.",
      features: ["supplier-price-trends", "stock-valuation", "profit-reports"],
    },
  ],
  story: {
    heading: "A day at a hardware store on Ultimate POS",
    paragraphs: [
      "A contractor comes in for a site order: bags of cement, a bundle of iron sheets, nails and paint. The cashier rings everything up and records the sale on the contractor's account, and the contractor's balance updates straight away.",
      "A walk-in customer buying a few fittings pays with M-Pesa via an STK push and leaves with a receipt.",
      "In the back office, the owner checks stock levels and raises purchase orders, comparing current supplier prices with past ones. When a new price comes in, stock is revalued so profit reports stay accurate.",
      "At month-end, the customer aging report shows which contractors are overdue, so follow-up calls go to the right people first.",
    ],
  },
  gettingStarted:
    "The biggest job when a hardware store moves to a new system is the catalogue. Send us your product list in Excel or CSV — with categories, brands and units — and we import it. We then set up customer accounts for the contractors you sell to on credit, create staff logins and roles, and train your counter and store staff before you go live.",
  featureIds: [
    "catalogue-setup",
    "bulk-import",
    "customer-credit",
    "customer-insights",
    "stock-levels",
    "stock-adjustments-transfers",
    "stock-valuation",
    "supplier-price-trends",
    "purchase-orders",
    "pos-checkout",
    "mpesa",
    "profit-reports",
  ],
  faqs: [
    {
      question: "Can I import my hardware catalogue from Excel?",
      answer:
        "Yes. You can bulk import products and categories from Excel or CSV, so even a catalogue of thousands of items can be loaded quickly.",
    },
    {
      question: "Does Ultimate POS support different units of measure?",
      answer:
        "Yes. Each product is set up with the unit of measure your business sells it in, alongside its category and brand.",
    },
    {
      question: "Can contractors buy on credit?",
      answer:
        "Yes. Contractors can have customer accounts for credit sales, and the customer aging report shows who owes what and for how long.",
    },
    {
      question: "How do I stop stock from disappearing?",
      answer:
        "Stock updates in real time, every adjustment must carry a reason, and the audit log records who did what. Stock movement reports show where stock went.",
    },
    {
      question: "Can walk-in customers pay with M-Pesa?",
      answer:
        "Yes. Send an STK push to the customer's phone at checkout. Payments are matched to sales and recorded in the M-Pesa payment log.",
    },
  ],
  related: ["retail-shop-pos", "wholesale-distribution-pos", "agrovet-pos"],
};

export default content;
