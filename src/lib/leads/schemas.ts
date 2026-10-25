import { z } from "zod";
import { normalizeKenyanPhone } from "@/lib/phone";
import {
  branchOptions,
  businessTypeOptions,
  demoModeOptions,
  moduleOptions,
  preferredTimeOptions,
  tillOptions,
  timelineOptions,
  values,
} from "./options";

/**
 * Lead form schemas, shared by the browser (React Hook Form) and the server action.
 * The server always re-validates: never trust what the browser sends.
 */

export type LeadFormType = "demo" | "quote" | "contact";

// Strip control characters (including CR/LF, which could inject email headers) and trim.
const clean = (value: string) => value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim();

const text = (label: string, max = 120) =>
  z
    .string()
    .transform(clean)
    .pipe(z.string().min(1, `Enter your ${label}`).max(max, `Keep this under ${max} characters`));

const optionalText = (max: number) =>
  z
    .string()
    .optional()
    .transform((v) => (v ? clean(v) : ""))
    .pipe(z.string().max(max, `Keep this under ${max} characters`));

// Messages keep their line breaks; only other control characters are removed.
const message = (max: number) =>
  z
    .string()
    .optional()
    .transform((v) => (v ?? "").replace(/[\u0000-\u0009\u000b-\u001f\u007f]+/g, " ").trim())
    .pipe(z.string().max(max, `Keep this under ${max} characters`));

const choice = (options: Parameters<typeof values>[0], error: string) => z.enum(values(options), error);

const optionalChoice = (options: Parameters<typeof values>[0]) =>
  z
    .union([z.literal(""), z.enum(values(options))])
    .optional()
    .transform((v) => v || undefined);

const phone = z
  .string()
  .trim()
  .refine((v) => normalizeKenyanPhone(v) !== null, "Enter a valid Kenyan mobile number, e.g. 0712 345 678")
  .transform((v) => normalizeKenyanPhone(v) as string);

const email = z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address, e.g. name@business.co.ke"));

const consent = z.literal(true, "Please agree so we can contact you about your request");

const isoDate = z
  .string()
  .optional()
  .transform((v) => v || undefined)
  .refine((v) => v === undefined || /^\d{4}-\d{2}-\d{2}$/.test(v), "Choose a valid date");

export const demoSchema = z.object({
  fullName: text("full name", 80),
  businessName: text("business name", 120),
  phone,
  email,
  businessType: choice(businessTypeOptions, "Choose your type of business"),
  branches: choice(branchOptions, "Choose how many branches you have"),
  preferredDate: isoDate,
  preferredTime: optionalChoice(preferredTimeOptions),
  mode: choice(demoModeOptions, "Choose how you'd like the demo"),
  message: message(2000),
  consent,
});

export const quoteSchema = z.object({
  fullName: text("full name", 80),
  businessName: text("business name", 120),
  phone,
  email,
  businessType: choice(businessTypeOptions, "Choose your type of business"),
  branches: choice(branchOptions, "Choose how many branches you have"),
  tills: choice(tillOptions, "Choose how many tills or users you need"),
  modules: z.array(z.enum(values(moduleOptions))).default([]),
  hardwareNeeded: z.enum(["yes", "no"], "Tell us whether you need hardware"),
  hardwareList: optionalText(500),
  timeline: choice(timelineOptions, "Choose when you'd like to start"),
  notes: message(2000),
  consent,
});

export const contactSchema = z.object({
  fullName: text("full name", 80),
  phone,
  email,
  subject: text("subject", 150),
  message: message(3000).pipe(z.string().min(1, "Enter your message")),
  consent,
});

export const leadSchemas = {
  demo: demoSchema,
  quote: quoteSchema,
  contact: contactSchema,
} as const;

export type DemoInput = z.input<typeof demoSchema>;
export type QuoteInput = z.input<typeof quoteSchema>;
export type ContactInput = z.input<typeof contactSchema>;

export type LeadData =
  | { type: "demo"; data: z.output<typeof demoSchema> }
  | { type: "quote"; data: z.output<typeof quoteSchema> }
  | { type: "contact"; data: z.output<typeof contactSchema> };

/** Fields that hold several values (checkbox groups). */
const multiValueFields = new Set(["modules"]);
/** Fields that are single checkboxes (sent as "on" when ticked, absent otherwise). */
const checkboxFields = new Set(["consent"]);

/** Convert submitted FormData into the plain object shape the schemas expect. */
export function formDataToInput(formType: LeadFormType, formData: FormData): Record<string, unknown> {
  const shape = leadSchemas[formType].shape as Record<string, unknown>;
  const input: Record<string, unknown> = {};
  for (const key of Object.keys(shape)) {
    if (multiValueFields.has(key)) input[key] = formData.getAll(key).map(String);
    else if (checkboxFields.has(key)) input[key] = formData.get(key) === "on" || formData.get(key) === "true";
    else {
      const value = formData.get(key);
      input[key] = typeof value === "string" ? value : "";
    }
  }
  return input;
}

/** Values echoed back to the form after a failed submission (no JavaScript), so nothing is lost. */
export type SubmittedValues = Record<string, string | string[] | boolean>;

export function submittedValues(formType: LeadFormType, formData: FormData): SubmittedValues {
  return formDataToInput(formType, formData) as SubmittedValues;
}
