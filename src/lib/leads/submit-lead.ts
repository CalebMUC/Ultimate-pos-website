"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod/mini";
import { site } from "@/config/site";
import { checkLeadRateLimit } from "@/lib/ratelimit";
import { reportError, reportWarning } from "@/lib/monitoring";
import { verifyTurnstile } from "@/lib/turnstile";
import { notifyLead, sendAutoReply } from "./notify-lead";
import { saveLead, type StoredLead } from "./save-lead";
import { formDataToInput, leadSchemas, submittedValues, type LeadData, type LeadFormType } from "./schemas";
import { HONEYPOT_FIELD, TIMING_FIELD, TURNSTILE_FIELD, type LeadFormState } from "./state";

/** Real people take more than a few seconds to fill in a form. */
const MIN_FILL_MS = 3000;

function clientIp(h: Headers): string | null {
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip") || null;
}

function pagePath(h: Headers, fallback: string): string {
  try {
    const referer = h.get("referer");
    return referer ? new URL(referer).pathname : fallback;
  } catch {
    return fallback;
  }
}

const thankYou = (type: LeadFormType, ref: string) => `/thank-you?type=${type}&ref=${ref}`;

const fallbackMessage = `Sorry — we couldn't send your request just now. Please WhatsApp or call us on ${site.phone.display} and we'll help you straight away.`;

/*
 * One exported action per form. They are deliberately not created with .bind(): in Next.js 16.4
 * a bound action used with useActionState loops forever when a no-JavaScript submission
 * returns state (found while testing; unbound actions work).
 */
export async function submitDemo(previous: LeadFormState, formData: FormData) {
  return submitLead("demo", previous, formData);
}

export async function submitQuote(previous: LeadFormState, formData: FormData) {
  return submitLead("quote", previous, formData);
}

export async function submitContact(previous: LeadFormState, formData: FormData) {
  return submitLead("contact", previous, formData);
}

/**
 * Handles the demo, quote and contact forms. Works with and without JavaScript:
 * on success it redirects to /thank-you; on failure it returns errors and the submitted values.
 */
async function submitLead(
  formType: LeadFormType,
  _previous: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // 1. Honeypot: pretend it worked so bots learn nothing.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    reportWarning("Lead rejected by honeypot", { formType });
    redirect(thankYou(formType, "ok"));
  }

  // 2. Validate with the same schema the browser uses.
  const parsed = leadSchemas[formType].safeParse(formDataToInput(formType, formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const [field, messages] of Object.entries(z.flattenError(parsed.error as z.core.$ZodError).fieldErrors)) {
      if (Array.isArray(messages) && messages[0]) fieldErrors[field] = messages[0];
    }
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
      values: submittedValues(formType, formData),
    };
  }
  const lead = { type: formType, data: parsed.data } as LeadData;

  const h = await headers();
  const ip = clientIp(h);

  // 3. Rate limit by IP and by email.
  if (!(await checkLeadRateLimit({ ip, email: lead.data.email }))) {
    return {
      status: "error",
      message: `You've sent several requests in the last hour. Please WhatsApp or call us on ${site.phone.display} instead.`,
      values: submittedValues(formType, formData),
    };
  }

  // 4. Timing: the browser stamps the form when it loads. Too fast = bot. Missing = no JavaScript.
  const startedAt = Number(formData.get(TIMING_FIELD));
  const hasTiming = Number.isFinite(startedAt) && startedAt > 0;
  if (hasTiming && Date.now() - startedAt < MIN_FILL_MS) {
    reportWarning("Lead rejected: submitted too quickly", { formType });
    redirect(thankYou(formType, "ok"));
  }

  // 5. Turnstile. A failed check is rejected; a missing token (no JavaScript) is accepted but flagged.
  const turnstile = await verifyTurnstile(formData.get(TURNSTILE_FIELD) as string | null, ip);
  if (turnstile === "failed") {
    return {
      status: "error",
      message: "We couldn't confirm you're not a robot. Please try again, or WhatsApp us instead.",
      values: submittedValues(formType, formData),
    };
  }
  const verified = turnstile === "passed" || (turnstile === "not-configured" && hasTiming);

  const stored: StoredLead = {
    ...lead,
    id: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    page: pagePath(h, `/${formType === "contact" ? "contact" : `request-${formType}`}`),
    verified,
  };

  // 6. Notify sales and keep a copy. Email is required; the webhook copy is best effort.
  const [notified, saved] = await Promise.all([notifyLead(stored), saveLead(stored)]);
  if (!saved.ok) reportError(new Error(`saveLead failed: ${saved.error}`), { leadId: stored.id });

  if (!notified.ok) {
    reportError(new Error(`Lead notification email failed: ${notified.error}`), {
      leadId: stored.id,
      formType,
      savedToWebhook: saved.ok && !saved.skipped,
    });
    return { status: "error", message: fallbackMessage, values: submittedValues(formType, formData), fallback: true };
  }

  // 7. Confirmation to the customer — only for verified leads, so bots can't use us to email strangers.
  if (verified) {
    const reply = await sendAutoReply(stored);
    if (!reply.ok) reportError(new Error(`Auto-reply failed: ${reply.error}`), { leadId: stored.id });
  }

  redirect(thankYou(formType, stored.id));
}
