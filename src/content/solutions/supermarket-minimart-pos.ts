import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "supermarket-minimart-pos",
  updatedAt: "2026-10-25",
  metaTitle: "Supermarket & Minimart POS in Kenya",
  metaDescription:
    "Supermarket POS for Kenya: fast barcode checkout, M-Pesa STK push, shift cash-ups, real-time stock per branch and supplier price trends. Book a free demo.",
  h1: "Supermarket and minimart POS built for Kenyan shoppers",
  intro: [
    "A supermarket lives and dies by two things: how fast the queue moves, and whether the shelves hold what the system says they hold. On a busy month-end Saturday, every slow scan and every M-Pesa payment that has to be checked on the cashier's phone costs you customers.",
    "Ultimate POS gives your tills a fast barcode checkout with M-Pesa built in, and gives you real-time stock, supplier price trends and shift cash-ups for every branch — so you can grow from one minimart to several supermarkets without losing control.",
  ],
  highlights: ["Fast barcode checkout", "M-Pesa STK push at the till", "Stock you can trust in every branch"],
  challengesHeading: "Supermarket problems Ultimate POS was built to fix",
  challenges: [
    {
      problem:
        "Long queues at peak hours, made worse when cashiers have to confirm M-Pesa messages on their phones before releasing the goods.",
      solution:
        "Cashiers scan barcodes and send an STK push straight to the shopper's phone. The payment is matched to the sale and recorded in the M-Pesa payment log, so nobody has to read SMS messages at the counter.",
      features: ["pos-checkout", "mpesa"],
    },
    {
      problem:
        "Tills that never quite balance at close of day, and no clear way to tell which shift a shortage came from.",
      solution:
        "Every cashier opens and closes a shift session on their till. At cash-up you see exactly what each till should hold, so differences are caught the same evening — not at the end of the month.",
      features: ["cash-up", "audit-log"],
    },
    {
      problem:
        "Stock counts that don't match the system, fast-moving lines running out without warning, and slow-moving stock tying up cash.",
      solution:
        "Each sale, delivery and adjustment updates stock in real time, and adjustments must carry a reason. Stock status and movement reports show what is selling, what is stuck, and where losses are happening.",
      features: ["stock-levels", "stock-adjustments-transfers", "stock-reports"],
    },
    {
      problem: "Suppliers quietly raising prices, eating into thin supermarket margins before anyone notices.",
      solution:
        "Raise purchase orders from Ultimate POS and track what each supplier charges over time. Supplier price trends show who is getting more expensive, and profit-by-product reports show the effect on your margins.",
      features: ["purchase-orders", "supplier-price-trends", "profit-reports"],
    },
  ],
  story: {
    heading: "A day in a supermarket running Ultimate POS",
    paragraphs: [
      "At opening, each cashier starts a shift on their till. The manager checks the dashboard for yesterday's sales and the stock status report for anything running low, then raises a purchase order for the suppliers due that week.",
      "During the lunchtime rush the queue keeps moving: items are scanned, combo deals like a breakfast bundle are priced automatically, and shoppers pay by M-Pesa from their own phones. Loyal customers get their discounts and rewards at the till without anyone looking up a notebook.",
      "When a delivery arrives, it is received against the purchase order and stock goes up immediately. If the Thika branch is short of cooking oil, the Kiambu branch sends a stock transfer and Thika receives it from its transfer inbox.",
      "At closing, every till is cashed up against its shift, and the owner — wherever they are — opens Ultimate POS to see the day's sales, margins and expenses for each branch.",
    ],
  },
  gettingStarted:
    "Moving a supermarket onto a new system sounds daunting, but most of the work is your product list. Export it from your current system or spreadsheet — with barcodes, prices and categories — and we import it for you. We then set up your branches, tills and staff roles, switch on the modules you need, such as bundles and cash-up, and train your cashiers and supervisors before your first day live.",
  featureIds: [
    "pos-checkout",
    "mpesa",
    "bundles",
    "discounts-rewards",
    "cash-up",
    "stock-levels",
    "stock-adjustments-transfers",
    "purchase-orders",
    "supplier-price-trends",
    "profit-reports",
    "multi-branch",
    "roles-permissions",
  ],
  faqs: [
    {
      question: "Can Ultimate POS handle several tills in one supermarket?",
      answer:
        "Yes. Each till runs its own shift session with its own cash-up, while stock and sales are shared across the branch, so you see both the per-till and the whole-shop picture.",
    },
    {
      question: "How do M-Pesa payments work at the till?",
      answer:
        "At checkout the cashier sends an STK push to the shopper's phone. Payments are matched to sales and recorded in the M-Pesa payment log, so reconciling M-Pesa against your sales no longer means going through SMS messages.",
    },
    {
      question: "We have thousands of products. Do we have to enter them one by one?",
      answer:
        "No. You can bulk import products and categories from an Excel or CSV file, then organise them by category, brand and unit of measure.",
    },
    {
      question: "Can I run combo offers and promotions?",
      answer:
        "Yes. Product bundles let you sell items together at a combo price while each item is still deducted from stock, and customer discounts and rewards can be applied at the till.",
    },
    {
      question: "Can I see which products sell best?",
      answer:
        "Yes. Sales reports and profit by product show your best sellers and their margins, and stock movement reports show how quickly each product moves through each branch.",
    },
  ],
  related: ["retail-shop-pos", "wholesale-distribution-pos", "multi-branch-business-software"],
};

export default content;
