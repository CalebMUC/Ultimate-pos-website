/**
 * The three plans on /pricing. Plan cards and the comparison table are both built from the
 * rows below, so a module or feature only has to be moved between plans in one place.
 * Only list real, shipped features (see content/features.ts).
 */

export type PlanId = "starter" | "business" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  /** Who the plan is for */
  audience: string;
  /**
   * Price per branch per month in KES. While null, the plan shows "Price on request".
   * Set all three together, and keep site.pricing.fromKesPerMonth in step with Starter.
   */
  priceKesPerMonth: number | null;
  /** Shown before the price, e.g. "From" for Enterprise volume pricing */
  pricePrefix?: string;
  popular?: boolean;
};

/** true = included, false = not available, "add-on" = can be added for an extra fee, string = a specific value */
export type Availability = boolean | "add-on" | string;

export type PlanRow = {
  label: string;
  /** One line under the label in the comparison table */
  note?: string;
  availability: Record<PlanId, Availability>;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "For a single shop moving off the exercise book.",
    priceKesPerMonth: null,
  },
  {
    id: "business",
    name: "Business",
    audience: "For growing shops, supermarkets, pharmacies and branches.",
    priceKesPerMonth: null,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience: "For 5+ branches, distributors and manufacturers.",
    priceKesPerMonth: null,
    pricePrefix: "From",
  },
];

const all = { starter: true, business: true, enterprise: true } as const;
const fromBusiness = { starter: false, business: true, enterprise: true } as const;
const enterpriseOnly = { starter: false, business: false, enterprise: true } as const;
const addOnForBusiness = { starter: false, business: "add-on", enterprise: true } as const;

export const limitRows: PlanRow[] = [
  { label: "Branches", availability: { starter: "1 branch", business: "1 or more", enterprise: "5 or more" } },
  { label: "Users", availability: { starter: "Up to 3", business: "Up to 6 per branch", enterprise: "Unlimited" } },
];

export const moduleRows: PlanRow[] = [
  { label: "M-Pesa payments", note: "STK push, payment matching and log", availability: all },
  { label: "Stock control", note: "Real-time stock, adjustments and stock reports", availability: all },
  { label: "Customer credit", note: "Customer accounts and credit sales", availability: all },
  { label: "Cash-up & shifts", note: "Shift sessions and end-of-day cash-up", availability: all },
  { label: "Multi-branch", note: "Branch switcher and stock transfers", availability: fromBusiness },
  { label: "Purchasing & suppliers", note: "Purchase orders, suppliers and ledgers", availability: fromBusiness },
  { label: "Bundles & combos", note: "Bundle and combo deals at the till", availability: fromBusiness },
  { label: "Profit reports & expenses", note: "Profit and loss, margins, expenses", availability: fromBusiness },
  {
    label: "Deliveries & riders",
    note: "Delivery orders, rider cash-up, trips and fuel",
    availability: addOnForBusiness,
  },
  { label: "Production", note: "Formulas, production runs and costing", availability: addOnForBusiness },
  { label: "Pharmacy", note: "Prescription register", availability: addOnForBusiness },
  { label: "KRA eTIMS", note: "Send sales invoices to KRA's eTIMS", availability: enterpriseOnly },
];

export const featureRows: PlanRow[] = [
  { label: "Fast checkout, receipts, returns and refunds", availability: all },
  { label: "Categories, brands and units", availability: all },
  { label: "Bulk product import from Excel or CSV", availability: all },
  { label: "Dashboard and sales reports", availability: all },
  { label: "Roles and permissions", availability: all },
  { label: "Cloud access and automatic updates", availability: all },
  { label: "Support by WhatsApp, phone and email", availability: all },
  { label: "Batch and expiry tracking", availability: fromBusiness },
  { label: "Stock valuation and revaluation", availability: fromBusiness },
  { label: "Customer discounts and rewards", availability: fromBusiness },
  { label: "Customer buying insights", availability: fromBusiness },
  { label: "Supplier price trends", availability: fromBusiness },
  { label: "Full audit log", availability: fromBusiness },
  { label: "Named account contact", availability: enterpriseOnly },
  { label: "Priority on-site support visits", availability: enterpriseOnly },
  { label: "Phased roll-out across branches", availability: enterpriseOnly },
];

const order: PlanId[] = ["starter", "business", "enterprise"];

/** Rows a plan includes that the plan below it does not (for "Everything in X, plus"). */
export function newInPlan(rows: PlanRow[], plan: PlanId) {
  const previous = order[order.indexOf(plan) - 1];
  return rows.filter((row) => row.availability[plan] === true && (!previous || row.availability[previous] !== true));
}

export function addOnsFor(rows: PlanRow[], plan: PlanId) {
  return rows.filter((row) => row.availability[plan] === "add-on");
}

export function previousPlan(plan: PlanId) {
  const previous = order[order.indexOf(plan) - 1];
  return previous ? plans.find((p) => p.id === previous) : undefined;
}
