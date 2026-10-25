"use client";

import { branchOptions, businessTypeOptions, demoModeOptions, preferredTimeOptions, values } from "@/lib/leads/options";
import { demoSchema, type DemoInput } from "@/lib/leads/schemas";
import { CheckboxField, ChoiceGroup, SelectField, TextareaField, TextField } from "./fields";
import { ConsentLabel, ErrorSummary, FallbackNotice, Honeypot, SubmitButton, TimingField } from "./form-parts";
import { TurnstileWidget } from "./turnstile-widget";
import { useLeadForm, useQueryPreset } from "./use-lead-form";

const fieldOrder: (keyof DemoInput)[] = [
  "fullName",
  "businessName",
  "phone",
  "email",
  "businessType",
  "branches",
  "preferredDate",
  "preferredTime",
  "mode",
  "message",
  "consent",
];

export function DemoForm() {
  const f = useLeadForm<DemoInput, unknown>("demo", demoSchema, fieldOrder);
  const { register, setValue } = f.form;

  useQueryPreset("industry", values(businessTypeOptions), (value) =>
    setValue("businessType", value as DemoInput["businessType"]),
  );

  return (
    <form action={f.formAction} onSubmit={f.onSubmit} noValidate className="relative space-y-6">
      {f.state.status === "error" && (f.state.fallback || !f.state.fieldErrors) ? (
        <FallbackNotice message={f.state.message} />
      ) : (
        <ErrorSummary errors={f.summaryErrors} />
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id={f.fieldId("fullName")}
          label="Full name"
          required
          autoComplete="name"
          defaultValue={f.defaultText("fullName")}
          error={f.errorFor("fullName")}
          {...register("fullName")}
        />
        <TextField
          id={f.fieldId("businessName")}
          label="Business name"
          required
          autoComplete="organization"
          defaultValue={f.defaultText("businessName")}
          error={f.errorFor("businessName")}
          {...register("businessName")}
        />
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
          required
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          defaultValue={f.defaultText("email")}
          error={f.errorFor("email")}
          {...register("email")}
        />
        <SelectField
          id={f.fieldId("businessType")}
          label="Type of business"
          required
          options={businessTypeOptions}
          defaultValue={f.defaultText("businessType")}
          error={f.errorFor("businessType")}
          {...register("businessType")}
        />
        <SelectField
          id={f.fieldId("branches")}
          label="Number of branches"
          required
          options={branchOptions}
          defaultValue={f.defaultText("branches")}
          error={f.errorFor("branches")}
          {...register("branches")}
        />
        <TextField
          id={f.fieldId("preferredDate")}
          label="Preferred date"
          type="date"
          defaultValue={f.defaultText("preferredDate")}
          error={f.errorFor("preferredDate")}
          {...register("preferredDate")}
        />
        <SelectField
          id={f.fieldId("preferredTime")}
          label="Preferred time"
          options={preferredTimeOptions}
          placeholder="Any time"
          defaultValue={f.defaultText("preferredTime")}
          error={f.errorFor("preferredTime")}
          {...register("preferredTime")}
        />
      </div>

      <ChoiceGroup
        id={f.fieldId("mode")}
        label="How would you like the demo?"
        required
        type="radio"
        columns={3}
        options={demoModeOptions}
        defaultChecked={f.defaultList("mode")}
        error={f.errorFor("mode")}
        inputProps={register("mode")}
      />

      <TextareaField
        id={f.fieldId("message")}
        label="Anything we should know?"
        hint="E.g. what you sell, how you work today, or what you'd like to see"
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

      <SubmitButton pending={f.pending}>Request my free demo</SubmitButton>
    </form>
  );
}
