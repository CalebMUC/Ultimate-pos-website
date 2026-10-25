import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "retail-shop-pos",
  metaTitle: "Retail Shop POS System Kenya",
  metaDescription:
    "A simple POS for Kenyan retail shops: quick checkout with M-Pesa, accurate stock, customer credit you can track, and daily sales and profit reports.",
  h1: "A simple, reliable POS system for retail shops in Kenya",
  intro: [
    "Running a shop means doing everything at once: serving customers, watching stock, chasing customers who bought on credit, and somehow working out at the end of the month whether you actually made money. An exercise book can only take you so far.",
    "Ultimate POS gives your shop a till that is quick to learn, takes cash and M-Pesa, keeps your stock accurate and tracks every credit sale — with reports that tell you plainly what you sold and what you earned.",
  ],
  highlights: ["Easy for any cashier to learn", "Customer credit under control", "Know your profit every day"],
  challengesHeading: "Common retail shop headaches — and how we solve them",
  challenges: [
    {
      problem: "Credit customers who owe you money, recorded in a book that only one person understands.",
      solution:
        "Open a customer account and sell on credit from the till. Receivables and customer aging show who owes what and for how long, so you know exactly who to follow up — and who not to give more credit.",
      features: ["customer-credit"],
    },
    {
      problem: "Not knowing what is in stock until a customer asks for it and it isn't there.",
      solution:
        "Every sale reduces stock immediately, and stock status reports show what is running low. Raise a purchase order before the shelf is empty, not after.",
      features: ["stock-levels", "stock-reports", "purchase-orders"],
    },
    {
      problem: "Money going missing when you are not in the shop, with no way to prove what happened.",
      solution:
        "Give each staff member their own login with only the permissions their job needs. Shift cash-ups show what the till should hold, and the audit log records who sold, refunded or changed what.",
      features: ["roles-permissions", "cash-up", "audit-log"],
    },
    {
      problem: "Working hard all month but not knowing which products actually make you money.",
      solution:
        "The dashboard shows today's sales the moment you log in, and profit by product and margin reports show which lines earn their shelf space. Record expenses too, so profit means real profit.",
      features: ["dashboard", "profit-reports", "expenses"],
    },
  ],
  story: {
    heading: "How a retail shop uses Ultimate POS",
    paragraphs: [
      "Setting up is the first relief: instead of typing every item, you import your product list from a spreadsheet, group items into categories and brands, and you are ready to sell.",
      "Behind the counter, the cashier scans or searches for items, takes payment by cash or M-Pesa, and prints a receipt. A regular customer who pays at month-end is served on their account, and the sale is added to what they owe. If something is returned, the refund goes through the system, not out of the drawer.",
      "Because Ultimate POS is cloud-based, you can check the day's sales from home or from the supplier's warehouse. At closing, the shift is cashed up, and any difference is visible immediately.",
      "At month-end, you open the customer aging report to follow up overdue accounts, and the profit and loss report to see how the shop really performed after expenses.",
    ],
  },
  gettingStarted:
    "Getting your shop onto Ultimate POS starts with a free demo, where we show you the system using the kind of products you sell. If you keep your products in a spreadsheet, we import them; if you don't, we help you build the list. We create logins for you and your staff, switch on only the modules your shop needs, and train everyone on the till before you start selling.",
  featureIds: [
    "pos-checkout",
    "mpesa",
    "customer-credit",
    "discounts-rewards",
    "cash-up",
    "stock-levels",
    "bulk-import",
    "catalogue-setup",
    "dashboard",
    "profit-reports",
    "expenses",
    "roles-permissions",
  ],
  faqs: [
    {
      question: "Is Ultimate POS too complicated for a small shop?",
      answer:
        "No. You switch on only the modules you need, so a small shop sees a simple till, stock and reports. We also train your staff as part of setup.",
    },
    {
      question: "Can I track customers who buy on credit?",
      answer:
        "Yes. Sell on account to named customers and track receivables. The customer aging report shows who owes you, how much, and how long it has been outstanding.",
    },
    {
      question: "Can I see my sales when I'm not at the shop?",
      answer:
        "Yes. Ultimate POS is cloud-based, so you can log in from anywhere with an internet connection and see sales, stock and reports as they happen.",
    },
    {
      question: "Can I control what my staff can do in the system?",
      answer:
        "Yes. Roles and fine-grained permissions control what each user can do, and the audit log records who did what, and when.",
    },
    {
      question: "Can I record my shop's expenses?",
      answer:
        "Yes. Record expenses such as rent, electricity and transport, and review them in the expense summary alongside your sales and profit reports.",
    },
  ],
  related: ["supermarket-minimart-pos", "cosmetics-beauty-shop-pos", "hardware-shop-pos"],
};

export default content;
