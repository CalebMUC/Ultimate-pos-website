/**
 * Product capabilities. Only real, shipped features belong here.
 * [[PLACEHOLDER]] Confirm before adding: KRA eTIMS, offline mode, hardware bundles, mobile app.
 */

export type FeatureIcon =
  "checkout" | "stock" | "purchasing" | "customers" | "deliveries" | "production" | "pharmacy" | "reports" | "branches";

export type FeatureId =
  | "pos-checkout"
  | "mpesa"
  | "bundles"
  | "discounts-rewards"
  | "cash-up"
  | "stock-levels"
  | "stock-adjustments-transfers"
  | "batch-expiry"
  | "stock-valuation"
  | "bulk-import"
  | "catalogue-setup"
  | "purchase-orders"
  | "supplier-price-trends"
  | "customer-credit"
  | "customer-insights"
  | "delivery-orders"
  | "rider-cash-up"
  | "trips-fuel"
  | "production-formulas"
  | "production-runs"
  | "production-costing"
  | "prescription-register"
  | "dashboard"
  | "profit-reports"
  | "stock-reports"
  | "expenses"
  | "multi-branch"
  | "roles-permissions"
  | "audit-log"
  | "cloud"
  | "modular-licensing";

export type Feature = {
  id: FeatureId;
  title: string;
  description: string;
};

export type FeatureGroup = {
  /** Used as the anchor on /features, e.g. /features#stock */
  id: string;
  title: string;
  summary: string;
  icon: FeatureIcon;
  features: Feature[];
};

export const featureGroups: FeatureGroup[] = [
  {
    id: "sell",
    title: "Sell faster",
    summary: "A quick, simple till that takes cash, M-Pesa and credit, and balances itself at close of day.",
    icon: "checkout",
    features: [
      {
        id: "pos-checkout",
        title: "Fast POS checkout",
        description: "Scan barcodes, print receipts and handle returns and refunds without slowing the queue.",
      },
      {
        id: "mpesa",
        title: "M-Pesa payments built in",
        description:
          "Send an STK push to the customer's phone, match incoming payments to sales, and review every transaction in the M-Pesa payment log.",
      },
      {
        id: "bundles",
        title: "Bundles and combo deals",
        description: "Sell products together at a combo price while stock is still deducted item by item.",
      },
      {
        id: "discounts-rewards",
        title: "Customer discounts and rewards",
        description: "Reward loyal customers and apply approved discounts at the till.",
      },
      {
        id: "cash-up",
        title: "Cash-up and shift sessions",
        description: "Open and close shifts per till so every shilling is reconciled at the end of the day.",
      },
    ],
  },
  {
    id: "stock",
    title: "Control your stock",
    summary: "Know exactly what you have, where it is and what it is worth — in every branch, in real time.",
    icon: "stock",
    features: [
      {
        id: "stock-levels",
        title: "Real-time stock per branch",
        description: "Every sale, purchase and transfer updates stock levels for that branch immediately.",
      },
      {
        id: "stock-adjustments-transfers",
        title: "Adjustments and branch transfers",
        description:
          "Record stock adjustments with a reason, move stock between branches, and receive incoming transfers through a transfer inbox.",
      },
      {
        id: "batch-expiry",
        title: "Batch and expiry tracking",
        description: "Track batches and expiry dates, and run expiry reports before stock goes to waste.",
      },
      {
        id: "stock-valuation",
        title: "Stock valuation and revaluation",
        description: "See the value of the stock you hold and record cost revaluations when prices change.",
      },
      {
        id: "bulk-import",
        title: "Bulk import from Excel or CSV",
        description: "Load your products and categories from a spreadsheet instead of typing them one by one.",
      },
      {
        id: "catalogue-setup",
        title: "Categories, brands and units",
        description: "Organise products by category and brand, and sell in the units of measure your business uses.",
      },
    ],
  },
  {
    id: "buy",
    title: "Buy smarter",
    summary: "Order the right stock from the right supplier, and see what you owe at a glance.",
    icon: "purchasing",
    features: [
      {
        id: "purchase-orders",
        title: "Purchase orders and suppliers",
        description: "Raise purchase orders, manage suppliers, and keep supplier ledgers and payables up to date.",
      },
      {
        id: "supplier-price-trends",
        title: "Purchase reports and supplier price trends",
        description: "Follow open orders, review purchases, and spot suppliers whose prices are creeping up.",
      },
    ],
  },
  {
    id: "customers",
    title: "Know your customers",
    summary: "Sell on credit with confidence and understand who buys what.",
    icon: "customers",
    features: [
      {
        id: "customer-credit",
        title: "Customer accounts and credit sales",
        description: "Sell on account, track receivables and see who is overdue with customer aging.",
      },
      {
        id: "customer-insights",
        title: "Customer buying insights",
        description: "See who buys what, and how often, so you can stock and promote the right products.",
      },
    ],
  },
  {
    id: "deliveries",
    title: "Deliveries and riders",
    summary: "Dispatch orders, assign riders and account for every delivery and every litre of fuel.",
    icon: "deliveries",
    features: [
      {
        id: "delivery-orders",
        title: "Delivery orders and rider assignment",
        description: "Create delivery orders and assign them to riders.",
      },
      {
        id: "rider-cash-up",
        title: "Rider cash-up",
        description: "Reconcile the money each rider collects on their route.",
      },
      {
        id: "trips-fuel",
        title: "Trips and fuel tracking",
        description: "Record trips and fuel so you know what each delivery really costs.",
      },
    ],
  },
  {
    id: "production",
    title: "Manufacturing and production",
    summary: "Turn raw materials into finished goods and know exactly what each batch cost to make.",
    icon: "production",
    features: [
      {
        id: "production-formulas",
        title: "Production formulas",
        description: "Define recipes or bills of materials for the products you make.",
      },
      {
        id: "production-runs",
        title: "Production runs",
        description: "Record production runs that consume raw materials and add finished goods to stock.",
      },
      {
        id: "production-costing",
        title: "Production cost reports",
        description: "See the cost of each production run and of every unit you produce.",
      },
    ],
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    summary: "Keep the records a chemist needs and never sell expired stock.",
    icon: "pharmacy",
    features: [
      {
        id: "prescription-register",
        title: "Prescription register",
        description: "Record prescriptions as you dispense them.",
      },
    ],
  },
  {
    id: "reports",
    title: "Know your numbers",
    summary: "From today's sales to profit by product — the reports you need to make decisions.",
    icon: "reports",
    features: [
      {
        id: "dashboard",
        title: "Dashboard and sales reports",
        description: "See today's sales and trends the moment you log in.",
      },
      {
        id: "profit-reports",
        title: "Profit and loss, and margins",
        description: "Profit and loss, profit by product and margins, so you know what actually makes money.",
      },
      {
        id: "stock-reports",
        title: "Stock status and movements",
        description: "Report on stock status and every stock movement across branches.",
      },
      {
        id: "expenses",
        title: "Expense tracking",
        description: "Record expenses and review an expense summary alongside your sales.",
      },
    ],
  },
  {
    id: "multi-branch",
    title: "Run a multi-branch business safely",
    summary: "One account for every branch, with the controls to trust what happens when you are not there.",
    icon: "branches",
    features: [
      {
        id: "multi-branch",
        title: "Multiple branches, one account",
        description: "Manage all your branches under one account and switch between them in a click.",
      },
      {
        id: "roles-permissions",
        title: "Roles and fine-grained permissions",
        description: "Give each user only the access their job needs.",
      },
      {
        id: "audit-log",
        title: "Full audit log",
        description: "See who did what, and when, across the whole business.",
      },
      {
        id: "cloud",
        title: "Cloud-based",
        // [[PLACEHOLDER]] confirm backup policy before stating frequency or retention
        description: "Access your business from anywhere, with automatic updates and backups.",
      },
      {
        id: "modular-licensing",
        title: "Modular licensing",
        description:
          "Switch on only the modules you need — deliveries, production, pharmacy, bundles, cash-up and more.",
      },
    ],
  },
];

const featureIndex = new Map(featureGroups.flatMap((group) => group.features.map((f) => [f.id, { ...f, group }])));

export function getFeature(id: FeatureId) {
  const feature = featureIndex.get(id);
  if (!feature) throw new Error(`Unknown feature id: ${id}`);
  return feature;
}
