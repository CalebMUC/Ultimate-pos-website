import { formatKenyanPhone } from "@/lib/phone";
import {
  branchOptions,
  businessTypeOptions,
  demoModeOptions,
  labelFor,
  moduleOptions,
  preferredTimeOptions,
  tillOptions,
  timelineOptions,
} from "./options";
import type { LeadData } from "./schemas";

export const formTypeLabels = {
  demo: "Demo Request",
  quote: "Quote Request",
  contact: "Contact Message",
} as const;

/** Human-readable label → value rows for the internal notification email. */
export function leadRows(lead: LeadData): [string, string][] {
  const d = lead.data;
  const common: [string, string][] = [
    ["Name", d.fullName],
    ["Phone", formatKenyanPhone(d.phone)],
    ["Email", d.email],
  ];

  switch (lead.type) {
    case "demo":
      return [
        ...common,
        ["Business", lead.data.businessName],
        ["Business type", labelFor(businessTypeOptions, lead.data.businessType)],
        ["Branches", labelFor(branchOptions, lead.data.branches)],
        ["Demo mode", labelFor(demoModeOptions, lead.data.mode)],
        ["Preferred date", lead.data.preferredDate ?? "Any"],
        ["Preferred time", lead.data.preferredTime ? labelFor(preferredTimeOptions, lead.data.preferredTime) : "Any"],
        ["Message", lead.data.message || "—"],
      ];
    case "quote":
      return [
        ...common,
        ["Business", lead.data.businessName],
        ["Business type", labelFor(businessTypeOptions, lead.data.businessType)],
        ["Branches", labelFor(branchOptions, lead.data.branches)],
        ["Tills / users", labelFor(tillOptions, lead.data.tills)],
        ["Modules", lead.data.modules.map((m) => labelFor(moduleOptions, m)).join(", ") || "Not specified"],
        ["Hardware needed", lead.data.hardwareNeeded === "yes" ? "Yes" : "No"],
        ...(lead.data.hardwareList ? [["Hardware list", lead.data.hardwareList] as [string, string]] : []),
        ["Timeline", labelFor(timelineOptions, lead.data.timeline)],
        ["Notes", lead.data.notes || "—"],
      ];
    case "contact":
      return [...common, ["Subject", lead.data.subject], ["Message", lead.data.message]];
  }
}

/** e.g. "[Demo Request] Mama Mboga Supermarket – Supermarkets & minimarts" */
export function leadSubject(lead: LeadData, unverified: boolean): string {
  const prefix = `${unverified ? "[Unverified] " : ""}[${formTypeLabels[lead.type]}]`;
  if (lead.type === "contact") return `${prefix} ${lead.data.fullName} – ${lead.data.subject}`;
  return `${prefix} ${lead.data.businessName} – ${labelFor(businessTypeOptions, lead.data.businessType)}`;
}
