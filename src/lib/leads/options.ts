import { solutionCatalog } from "@/content/solutions/catalog";

/** Choices shown in the lead forms. Values are what the server receives; labels are what people see. */

export type Option = { value: string; label: string };

export const businessTypeOptions: Option[] = [
  ...solutionCatalog.map((s) => ({ value: s.slug, label: s.name })),
  { value: "other", label: "Other" },
];

export const branchOptions: Option[] = [
  { value: "1", label: "1 branch" },
  { value: "2-3", label: "2–3 branches" },
  { value: "4-10", label: "4–10 branches" },
  { value: "11+", label: "More than 10" },
];

export const tillOptions: Option[] = [
  { value: "1", label: "1 till / user" },
  { value: "2-5", label: "2–5" },
  { value: "6-10", label: "6–10" },
  { value: "11+", label: "More than 10" },
];

export const demoModeOptions: Option[] = [
  { value: "on-site", label: "At my business (on-site)" },
  { value: "online", label: "Online video call" },
  { value: "phone", label: "Phone call" },
];

export const preferredTimeOptions: Option[] = [
  { value: "morning", label: "Morning (8am–12pm)" },
  { value: "afternoon", label: "Afternoon (12pm–4pm)" },
  { value: "evening", label: "Late afternoon (4pm–6pm)" },
];

/** Modules of interest, from the real feature set (content/features.ts). */
export const moduleOptions: Option[] = [
  { value: "mpesa", label: "M-Pesa payments" },
  { value: "stock", label: "Stock control" },
  { value: "multi-branch", label: "Multi-branch" },
  { value: "purchasing", label: "Purchasing & suppliers" },
  { value: "customer-credit", label: "Customer credit" },
  { value: "cash-up", label: "Cash-up / shifts" },
  { value: "bundles", label: "Bundles & combos" },
  { value: "deliveries", label: "Deliveries & riders" },
  { value: "production", label: "Production / manufacturing" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "reports", label: "Reports & expenses" },
];

export const timelineOptions: Option[] = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-month", label: "Within a month" },
  { value: "1-3-months", label: "In 1–3 months" },
  { value: "researching", label: "Just researching" },
];

export const values = (options: Option[]) => options.map((o) => o.value) as [string, ...string[]];

export const labelFor = (options: Option[], value: string | undefined) =>
  options.find((o) => o.value === value)?.label ?? value ?? "";
