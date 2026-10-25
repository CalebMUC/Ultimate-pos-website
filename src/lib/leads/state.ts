import type { SubmittedValues } from "./schemas";

/** What the lead server action returns to the form (it redirects on success). */
export type LeadFormState =
  | { status: "idle" }
  | {
      status: "error";
      message: string;
      fieldErrors?: Record<string, string>;
      /** Echoed back so a no-JavaScript visitor doesn't lose what they typed */
      values?: SubmittedValues;
      /** Email could not be sent: show the WhatsApp / phone fallback prominently */
      fallback?: boolean;
    };

export const initialLeadState: LeadFormState = { status: "idle" };

/** Hidden honeypot field. Humans never see it; bots fill it in. */
export const HONEYPOT_FIELD = "company_website";
/** Hidden field stamped with the time the form loaded (set by JavaScript). */
export const TIMING_FIELD = "_t";
/** Field the Turnstile widget adds to the form. */
export const TURNSTILE_FIELD = "cf-turnstile-response";
