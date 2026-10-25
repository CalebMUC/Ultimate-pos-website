import "server-only";
import { render } from "@react-email/render";
import { site } from "@/config/site";
import { serverEnv } from "@/env";
import { sendEmail, type SendResult } from "@/lib/email/send-email";
import { formatKenyanPhone } from "@/lib/phone";
import { whatsappLink, whatsappLinkTo } from "@/lib/whatsapp";
import { LeadAutoReply } from "@/emails/lead-auto-reply";
import { LeadNotification } from "@/emails/lead-notification";
import { formTypeLabels, leadRows, leadSubject } from "./format";
import type { StoredLead } from "./save-lead";

/**
 * Tell the sales team about a new lead. Email today; a WhatsApp Business Cloud API
 * message to the sales phone can be added here later without touching the form code.
 */
export async function notifyLead(lead: StoredLead): Promise<SendResult> {
  const heading = `New ${formTypeLabels[lead.type].toLowerCase()} from ${lead.data.fullName}`;
  const rows = leadRows(lead);
  const submittedAt = new Date(lead.submittedAt).toLocaleString("en-KE", { timeZone: "Africa/Nairobi" });
  const element = LeadNotification({
    heading,
    rows,
    phoneE164: lead.data.phone,
    phoneDisplay: formatKenyanPhone(lead.data.phone),
    whatsappUrl: whatsappLinkTo(lead.data.phone),
    email: lead.data.email,
    unverified: !lead.verified,
    submittedAt,
    page: lead.page,
  });

  // Plain-text part written by hand: automatic HTML-to-text conversion squashes the table.
  const text = [
    heading,
    `Received ${submittedAt} from ${lead.page}`,
    ...(lead.verified
      ? []
      : ["", "UNVERIFIED: did not pass the anti-spam check. Check it looks genuine before calling."]),
    "",
    `Call: ${formatKenyanPhone(lead.data.phone)} (tel:${lead.data.phone})`,
    `WhatsApp: ${whatsappLinkTo(lead.data.phone)}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Reply to this email to answer ${lead.data.email} directly.`,
  ].join("\n");

  return sendEmail({
    to: serverEnv().SALES_EMAIL,
    subject: leadSubject(lead, !lead.verified),
    html: await render(element),
    text,
    replyTo: lead.data.email,
  });
}

const nextSteps = {
  demo: `We'll call you within ${site.responseTime} to arrange your free demo.`,
  quote: `We'll prepare your quote and call you within ${site.responseTime} to go through it.`,
  contact: `We'll get back to you within ${site.responseTime}.`,
} as const;

const requestLabels = { demo: "demo request", quote: "quote request", contact: "message" } as const;

/** Branded confirmation to the customer. */
export async function sendAutoReply(lead: StoredLead): Promise<SendResult> {
  const firstName = lead.data.fullName.split(/\s+/)[0] ?? lead.data.fullName;
  const element = LeadAutoReply({
    firstName,
    requestLabel: requestLabels[lead.type],
    nextStep: nextSteps[lead.type],
    phoneDisplay: site.phone.display,
    phoneTel: site.phone.tel,
    whatsappUrl: whatsappLink({ kind: "thank-you" }),
    siteUrl: site.url,
    serviceArea: site.location.display,
  });

  const text = [
    `Thanks ${firstName}, we've received your ${requestLabels[lead.type]}.`,
    "",
    nextSteps[lead.type],
    "",
    `Can't wait? WhatsApp us: ${whatsappLink({ kind: "thank-you" })}`,
    `Or call: ${site.phone.display}`,
    "",
    `Ultimate POS · ${site.location.display}`,
    site.url,
  ].join("\n");

  return sendEmail({
    to: lead.data.email,
    subject: `Thanks ${firstName} — we've received your ${requestLabels[lead.type]}`,
    html: await render(element),
    text,
    replyTo: serverEnv().SALES_EMAIL,
  });
}
