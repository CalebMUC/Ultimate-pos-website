import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "pharmacy-chemist-pos",
  updatedAt: "2026-10-25",
  metaTitle: "Pharmacy POS System Kenya",
  metaDescription:
    "Pharmacy POS for Kenyan chemists: prescription register, batch and expiry tracking, expiry reports, stock valuation and M-Pesa payments at the counter.",
  h1: "Pharmacy POS for Kenyan chemists: prescriptions, batches and expiry under control",
  intro: [
    "A pharmacy carries risks a normal shop doesn't. Selling an expired product damages trust and costs money; losing track of a batch makes a recall a nightmare; and stock that sits past its expiry date is cash written off.",
    "Ultimate POS gives your chemist a prescription register, batch and expiry tracking with expiry reports, and a clear view of what your stock is worth — together with a fast counter that takes M-Pesa and keeps every till reconciled.",
  ],
  highlights: ["Prescription register", "Batch and expiry tracking", "Expiry reports before stock goes to waste"],
  challengesHeading: "Pharmacy challenges Ultimate POS helps you manage",
  challenges: [
    {
      problem: "Expired stock discovered on the shelf, or worse, at the counter — and written off as a loss.",
      solution:
        "Record batches and expiry dates when stock is received. Expiry reports show what is approaching its date, so you can move it, return it or stop reordering it in time.",
      features: ["batch-expiry", "stock-reports"],
    },
    {
      problem: "Prescriptions recorded on paper that is hard to search and easy to lose.",
      solution:
        "Record prescriptions in the prescription register as you dispense, so your records live in the same system as your sales and stock.",
      features: ["prescription-register"],
    },
    {
      problem: "Not knowing the true value of the stock on your shelves when suppliers change prices.",
      solution:
        "Stock valuation shows what your inventory is worth at any time, and cost revaluations keep that value accurate when supplier prices move. Purchase orders and supplier ledgers keep buying organised.",
      features: ["stock-valuation", "purchase-orders"],
    },
    {
      problem: "Several staff serving at the counter, with no clear record of who dispensed or sold what.",
      solution:
        "Each pharmacist and attendant logs in as themselves with a role that fits their job. The audit log records who did what, and shift cash-ups keep each till accountable.",
      features: ["roles-permissions", "audit-log", "cash-up"],
    },
  ],
  story: {
    heading: "How a chemist works with Ultimate POS",
    paragraphs: [
      "When a supplier delivery arrives, each product is received with its batch number and expiry date, and stock goes up immediately. The pharmacist can see the value of what has just come in.",
      "At the counter, over-the-counter items are scanned and paid for by cash or M-Pesa. When a prescription is dispensed, the pharmacist records it in the prescription register.",
      "Each week, the expiry report highlights products approaching their date. Slow-moving batches can be moved forward on the shelf or returned, instead of being discovered too late.",
      "If you run more than one outlet, each branch has its own stock, and you can transfer stock between branches — moving short-dated stock to where it will sell faster.",
    ],
  },
  gettingStarted:
    "Setting up a pharmacy starts with your product list. We import your products and categories from Excel or CSV, then you record batch numbers and expiry dates for the stock on your shelves, so expiry reports are accurate from day one. We switch on the pharmacy module, create logins for your pharmacists and attendants with the right roles, and train them on the counter, the prescription register and receiving stock.",
  featureIds: [
    "prescription-register",
    "batch-expiry",
    "stock-valuation",
    "stock-levels",
    "stock-adjustments-transfers",
    "purchase-orders",
    "pos-checkout",
    "mpesa",
    "cash-up",
    "roles-permissions",
    "audit-log",
    "stock-reports",
  ],
  faqs: [
    {
      question: "Does Ultimate POS have a prescription register?",
      answer:
        "Yes. The pharmacy module includes a prescription register, so you can record prescriptions as you dispense them.",
    },
    {
      question: "Can I track batch numbers and expiry dates?",
      answer:
        "Yes. Batch and expiry tracking records the batch and expiry date of your stock, and expiry reports show what is approaching its date.",
    },
    {
      question: "Can I see the value of my pharmacy stock?",
      answer:
        "Yes. Stock valuation shows what your inventory is worth, and you can record cost revaluations when supplier prices change.",
    },
    {
      question: "Do I pay for features I don't need?",
      answer:
        "No. Ultimate POS uses modular licensing, so a pharmacy switches on the pharmacy module alongside the core POS and stock, and leaves out modules like production or deliveries unless it needs them.",
    },
    {
      question: "Can customers pay with M-Pesa at the pharmacy counter?",
      answer:
        "Yes. M-Pesa is built in: send an STK push to the customer's phone, match the payment to the sale, and review every transaction in the M-Pesa payment log.",
    },
  ],
  related: ["agrovet-pos", "cosmetics-beauty-shop-pos", "retail-shop-pos"],
};

export default content;
