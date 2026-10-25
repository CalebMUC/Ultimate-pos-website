"use client";

import { contactSchema, type ContactInput } from "@/lib/leads/schemas";
import { CheckboxField, TextareaField, TextField } from "./fields";
import { ConsentLabel, ErrorSummary, FallbackNotice, Honeypot, SubmitButton, TimingField } from "./form-parts";
import { TurnstileWidget } from "./turnstile-widget";
import { useLeadForm } from "./use-lead-form";

const fieldOrder: (keyof ContactInput)[] = ["fullName", "phone", "email", "subject", "message", "consent"];

export function ContactForm() {
  const f = useLeadForm<ContactInput, unknown>("contact", contactSchema, fieldOrder);
  const { register } = f.form;

  return (
    <form action={f.formAction} onSubmit={f.onSubmit} noValidate className="relative space-y-6">
      {f.state.status === "error" && (f.state.fallback || !f.state.fieldErrors) ? (
        <FallbackNotice message={f.state.message} />
      ) : (
        <ErrorSummary errors={f.summaryErrors} />
      )}

      <TextField
        id={f.fieldId("fullName")}
        label="Full name"
        required
        autoComplete="name"
        defaultValue={f.defaultText("fullName")}
        error={f.errorFor("fullName")}
        {...register("fullName")}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={f.fieldId("phone")}
          label="Phone number"
          hint="Kenyan mobile, e.g. 0712 345 678"
          required
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          defaultValue={f.defaultText("phone")}
          error={f.errorFor("phone")}
          {...register("phone")}
        />
        <TextField
          id={f.fieldId("email")}
          label="Email address"
          hint="So we can reply in writing"
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          defaultValue={f.defaultText("email")}
          error={f.errorFor("email")}
          {...register("email")}
        />
      </div>
      <TextField
        id={f.fieldId("subject")}
        label="Subject"
        required
        defaultValue={f.defaultText("subject")}
        error={f.errorFor("subject")}
        {...register("subject")}
      />
      <TextareaField
        id={f.fieldId("message")}
        label="Message"
        required
        rows={6}
        defaultValue={f.defaultText("message")}
        error={f.errorFor("message")}
        {...register("message")}
      />
      <CheckboxField
        id={f.fieldId("consent")}
        label={<ConsentLabel />}
        defaultChecked={f.defaultBool("consent")}
        error={f.errorFor("consent")}
        {...register("consent")}
      />

      <Honeypot />
      <TimingField />
      <TurnstileWidget resetKey={f.state} />

      <SubmitButton pending={f.pending}>Send message</SubmitButton>
    </form>
  );
}
