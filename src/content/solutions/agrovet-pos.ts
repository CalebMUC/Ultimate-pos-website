import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "agrovet-pos",
  metaTitle: "Agrovet POS System Kenya",
  metaDescription:
    "Agrovet POS for Kenya: batch and expiry tracking for seeds, sprays and vet medicines, accurate stock, farmer credit and M-Pesa payments at the counter.",
  h1: "Agrovet POS for seeds, feeds, sprays and vet medicines",
  intro: [
    "An agrovet sells products with very different needs: seeds and fertiliser with planting-season peaks, animal feeds in bulk, and agrochemicals and veterinary medicines that expire. Getting expiry wrong means losses; running out at planting time means lost farmers.",
    "Ultimate POS tracks batches and expiry dates, keeps your stock accurate through the busy seasons, and lets farmers pay by M-Pesa or on credit — with reports that show what each season really earned.",
  ],
  highlights: ["Batch and expiry tracking", "Stock ready for the planting season", "M-Pesa and farmer credit"],
  challengesHeading: "Agrovet challenges — and how Ultimate POS handles them",
  challenges: [
    {
      problem: "Veterinary medicines and agrochemicals expiring on the shelf before they sell.",
      solution:
        "Record batches and expiry dates as stock arrives. Expiry reports show what is approaching its date, so you can act before it becomes a write-off.",
      features: ["batch-expiry"],
    },
    {
      problem: "Running out of seed or fertiliser just as the rains start, while other lines sit unsold.",
      solution:
        "Real-time stock levels and stock status reports show what is running low and what is moving slowly. Purchase reports and customer buying insights help you plan stock for the season ahead.",
      features: ["stock-levels", "stock-reports", "customer-insights"],
    },
    {
      problem: "Farmers who pay after harvest, tracked on loose paper.",
      solution:
        "Give regular farmers and groups customer accounts for credit sales. Customer aging shows who owes you and for how long, so collection after harvest is organised.",
      features: ["customer-credit"],
    },
    {
      problem: "Cash and M-Pesa payments that are hard to reconcile on busy market days.",
      solution:
        "Send an STK push at the counter and match M-Pesa payments to sales. Shift cash-ups show what each till should hold at close of day.",
      features: ["mpesa", "cash-up"],
    },
  ],
  story: {
    heading: "How an agrovet uses Ultimate POS",
    paragraphs: [
      "Before the season, the owner reviews last season's sales and stock, then raises purchase orders for seed, fertiliser and sprays. Deliveries are received with batch and expiry details where they matter.",
      "On a busy market day, farmers buy at the counter and pay by M-Pesa from their phones. A dairy farmer who buys feed every week takes it on account and settles monthly.",
      "Every week, the expiry report flags vet medicines and chemicals that need to sell soon. Slow movers can be moved to a branch where they sell better using a stock transfer.",
      "After the season, profit by product reports show which lines made money, and which should be stocked differently next time.",
    ],
  },
  gettingStarted:
    "We usually recommend getting set up before a busy season. We import your products — seeds, fertilisers, feeds, sprays and vet medicines — from Excel or CSV and organise them into categories and brands. You then record batch and expiry details for the products that need them, we set up logins for your staff, and we train them on the counter, receiving stock and reading the expiry report.",
  featureIds: [
    "batch-expiry",
    "stock-levels",
    "stock-reports",
    "purchase-orders",
    "pos-checkout",
    "mpesa",
    "cash-up",
    "customer-credit",
    "customer-insights",
    "stock-adjustments-transfers",
    "profit-reports",
    "catalogue-setup",
  ],
  faqs: [
    {
      question: "Can Ultimate POS track expiry dates for vet medicines and chemicals?",
      answer:
        "Yes. Batch and expiry tracking records the batch and expiry date of your stock, and expiry reports show what is approaching its date.",
    },
    {
      question: "Can farmers pay with M-Pesa?",
      answer:
        "Yes. M-Pesa is built in: send an STK push at the counter, match payments to sales, and see every transaction in the M-Pesa payment log.",
    },
    {
      question: "Can I sell to farmers on credit?",
      answer:
        "Yes. Farmers can have customer accounts for credit sales, and customer aging shows who owes you and for how long.",
    },
    {
      question: "I have agrovets in two towns. Can I manage both?",
      answer:
        "Yes. Each shop is a branch under one account, with its own real-time stock, and you can transfer stock between them.",
    },
    {
      question: "Can I see which products made money this season?",
      answer:
        "Yes. Profit by product and margin reports show which lines earned money, and sales reports show when they sold, so you can plan stock for the next season.",
    },
  ],
  related: ["pharmacy-chemist-pos", "hardware-shop-pos", "retail-shop-pos"],
};

export default content;
