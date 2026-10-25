import type { SolutionContent } from "./types";

const content: SolutionContent = {
  slug: "liquor-wines-spirits-pos",
  metaTitle: "Wines & Spirits / Liquor Store POS",
  metaDescription:
    "POS for wines and spirits shops in Kenya: tight stock control, shift cash-ups, staff permissions and a full audit log, with M-Pesa at the counter.",
  h1: "Wines and spirits POS with the stock control a liquor store needs",
  intro: [
    "Liquor is high-value stock that is easy to lose: a bottle here, an unrecorded discount there, a till that's short at the end of a late shift. Over a month, small leaks become a serious hole in your profit.",
    "Ultimate POS gives your wines and spirits shop tight stock control, shift cash-ups for every till, permissions that limit what each staff member can do, and a full audit log of who did what — plus a fast counter that takes M-Pesa.",
  ],
  highlights: ["Tight stock control", "Cash-up for every shift", "Full audit log"],
  challengesHeading: "Where liquor stores lose money — and how we close the gaps",
  challenges: [
    {
      problem: "Bottles disappearing between deliveries and stock counts, with no way to tell when or how.",
      solution:
        "Stock updates in real time with every sale and delivery, and every adjustment must carry a reason. Stock movement reports show exactly where the numbers changed.",
      features: ["stock-levels", "stock-adjustments-transfers", "stock-reports"],
    },
    {
      problem: "Late shifts and shift changes where the till never quite balances.",
      solution:
        "Each attendant opens and closes their own shift session. At cash-up, you see what the till should hold for that shift, so shortages are traced to the right person and time.",
      features: ["cash-up"],
    },
    {
      problem: "Unauthorised discounts, voided sales and price changes that nobody admits to.",
      solution:
        "Roles and fine-grained permissions limit each attendant to the actions their job needs. The audit log records who did what, and when.",
      features: ["roles-permissions", "audit-log"],
    },
    {
      problem: "Not knowing which brands actually make money once supplier prices change.",
      solution:
        "Track supplier price trends and see profit by product and margins, so you stock and promote the brands that pay — not just the ones that sell.",
      features: ["supplier-price-trends", "profit-reports"],
    },
  ],
  story: {
    heading: "A night at a wines and spirits shop on Ultimate POS",
    paragraphs: [
      "The evening attendant logs in and opens a shift. Bottles are scanned at the counter, and customers pay by cash or M-Pesa from their phones.",
      "Each attendant works under their own login, with permissions set by the owner. Whatever happens at the counter, the audit log records who did it and when.",
      "When the shift ends, the attendant cashes up. The cash-up shows what the till should hold for that shift, so any shortage is clear before the next attendant starts.",
      "In the morning, the owner checks last night's sales and margins from their phone, and reviews stock movements for the high-value brands.",
    ],
  },
  gettingStarted:
    "Getting a wines and spirits shop live starts with an accurate opening stock. We import your products from Excel or CSV, organised by category and brand, and you do one full stock count so the system starts from the true position. We set up a login and role for every attendant, show you how shift cash-ups work, and train your team before the first night on the new system.",
  featureIds: [
    "stock-levels",
    "stock-adjustments-transfers",
    "stock-reports",
    "cash-up",
    "roles-permissions",
    "audit-log",
    "pos-checkout",
    "mpesa",
    "bundles",
    "supplier-price-trends",
    "profit-reports",
    "multi-branch",
  ],
  faqs: [
    {
      question: "How does Ultimate POS help stop stock losses in a liquor store?",
      answer:
        "Stock updates in real time, adjustments require a reason, and the audit log records who did what. Stock movement reports show where stock changed.",
    },
    {
      question: "Can each attendant cash up their own shift?",
      answer:
        "Yes. Cash-up and shift sessions let each till be opened and closed per shift, so every shift is reconciled separately.",
    },
    {
      question: "Can I limit what staff are allowed to do?",
      answer:
        "Yes. Roles and fine-grained permissions control what each user can do, and the audit log records every action.",
    },
    {
      question: "Can I check sales when I'm not at the shop?",
      answer:
        "Yes. Ultimate POS is cloud-based, so you can see sales, stock and reports from anywhere with an internet connection.",
    },
    {
      question: "Can I sell bundles, like a bottle with mixers?",
      answer:
        "Yes. Product bundles let you sell items together at one price, while each item in the bundle is still deducted from stock.",
    },
  ],
  related: ["supermarket-minimart-pos", "retail-shop-pos", "multi-branch-business-software"],
};

export default content;
