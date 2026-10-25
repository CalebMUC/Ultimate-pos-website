"use client";

import {
  branchOptions,
  businessTypeOptions,
  moduleOptions,
  tillOptions,
  timelineOptions,
  values,
} from "@/lib/leads/options";
import { quoteSchema, type QuoteInput } from "@/lib/leads/schemas";
import { CheckboxField, ChoiceGroup, SelectField, TextareaField, TextField } from "./fields";
import { ConsentLabel, ErrorSummary, FallbackNotice, Honeypot, SubmitButton, TimingField } from "./form-parts";
import { TurnstileWidget } from "./turnstile-widget";
import { useLeadForm, useQueryPreset } from "./use-lead-form";

const fieldOrder: (keyof QuoteInput)[] = [
  "fullName",
  "businessName",
  "phone",
  "email",
  "businessType",
  "branches",
  "tills",
  "modules",
  "hardwareNeeded",
  "hardwareList",
  "timeline",
  "notes",
  "consent",
];

export function QuoteForm() {
  const f = useLeadForm<QuoteInput, unknown>("quote", quoteSchema, fieldOrder, { modules: [] });
  const { register, setValue, watch } = f.form;
  const needsHardware = watch("hardwareNeeded") === "yes" || f.defaultText("hardwareNeeded") === "yes";

  useQueryPreset("industry", values(businessTypeOptions), (value) =>
    setValue("businessType", value as QuoteInput["businessType"]),
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
        <SelectField
          id={f.fieldId("tills")}
          label="Number of tills / users"
          required
          options={tillOptions}
          defaultValue={f.defaultText("tills")}
          error={f.errorFor("tills")}
          {...register("tills")}
        />
        <SelectField
          id={f.fieldId("timeline")}
          label="When would you like to start?"
          required
          options={timelineOptions}
          defaultValue={f.defaultText("timeline")}
          error={f.errorFor("timeline")}
          {...register("timeline")}
        />
      </div>

      <ChoiceGroup
        id={f.fieldId("modules")}
        label="Modules you're interested in"
        hint="Tick all that apply — we'll price only what you need"
        type="checkbox"
        columns={3}
        options={moduleOptions}
        defaultChecked={f.defaultList("modules")}
        error={f.errorFor("modules")}
        inputProps={register("modules")}
      />

      <ChoiceGroup
        id={f.fieldId("hardwareNeeded")}
        label="Do you need hardware (receipt printer, barcode scanner, cash drawer)?"
        required
        type="radio"
        columns={2}
        options={[
          { value: "yes", label: "Yes, include hardware" },
          { value: "no", label: "No, I have my own" },
        ]}
        defaultChecked={f.defaultList("hardwareNeeded")}
        error={f.errorFor("hardwareNeeded")}
        inputProps={register("hardwareNeeded")}
      />

      {/* Always rendered without JavaScript; with JavaScript it appears once "Yes" is chosen. */}
      <TextField
        id={f.fieldId("hardwareList")}
        label="Which hardware do you need?"
        hint="E.g. 2 receipt printers, 2 barcode scanners, 1 cash drawer"
        className={needsHardware ? undefined : "js:hidden"}
        defaultValue={f.defaultText("hardwareList")}
        error={f.errorFor("hardwareList")}
        {...register("hardwareList")}
      />

      <TextareaField
        id={f.fieldId("notes")}
        label="Notes"
        hint="Anything else that affects your quote"
        defaultValue={f.defaultText("notes")}
        error={f.errorFor("notes")}
        {...register("notes")}
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

      <SubmitButton pending={f.pending}>Get my quote</SubmitButton>
    </form>
  );
}
