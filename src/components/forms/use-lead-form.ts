"use client";

import { useActionState, useEffect, useTransition, type FormEvent } from "react";
import { useForm, type DefaultValues, type FieldValues, type Path } from "react-hook-form";
import type { z } from "zod";
import { submitContact, submitDemo, submitQuote } from "@/lib/leads/submit-lead";
import { initialLeadState } from "@/lib/leads/state";
import type { LeadFormType } from "@/lib/leads/schemas";
import { zodResolver } from "@/lib/leads/zod-resolver";
import type { ErrorItem } from "./form-parts";

const actions = { demo: submitDemo, quote: submitQuote, contact: submitContact } as const;

/**
 * Connects a lead form to React Hook Form (instant validation in the browser) and to the
 * lead server action (which re-validates and sends). Without JavaScript the <form>
 * posts straight to the server action, and the returned state re-renders the form.
 */
export function useLeadForm<TInput extends FieldValues, TOutput>(
  formType: LeadFormType,
  schema: z.ZodType<TOutput, TInput>,
  fieldOrder: Path<TInput>[],
  defaultValues?: DefaultValues<TInput>,
) {
  const [state, formAction, actionPending] = useActionState(actions[formType], initialLeadState);
  const [transitionPending, startTransition] = useTransition();

  const form = useForm<TInput, unknown, TOutput>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues,
    shouldFocusError: true,
  });

  const serverErrors = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const clientErrors = form.formState.errors as Record<string, { message?: string } | undefined>;

  /** Client error first (it's current), then any error the server returned. */
  const errorFor = (name: Path<TInput>): string | undefined => clientErrors[name]?.message ?? serverErrors[name];

  /** Value echoed back by the server after a failed no-JS submission. */
  const submitted = (name: Path<TInput>) => (state.status === "error" ? state.values?.[name] : undefined);
  const defaultText = (name: Path<TInput>) => {
    const value = submitted(name);
    return typeof value === "string" ? value : undefined;
  };
  const defaultList = (name: Path<TInput>) => {
    const value = submitted(name);
    return Array.isArray(value) ? value : typeof value === "string" ? [value] : [];
  };
  const defaultBool = (name: Path<TInput>) => submitted(name) === true;

  const fieldId = (name: Path<TInput>) => `${formType}-${name}`;

  const showSummary = form.formState.submitCount > 0 || Object.keys(serverErrors).length > 0;
  const summaryErrors: ErrorItem[] = showSummary
    ? fieldOrder.flatMap((name) => {
        const message = errorFor(name);
        return message ? [{ id: fieldId(name), message }] : [];
      })
    : [];

  // After a server-side validation error, move focus to the first field it rejected.
  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const first = fieldOrder.find((name) => state.fieldErrors?.[name]);
    if (first) form.setFocus(first);
  }, [state, fieldOrder, form]);

  // With JavaScript: validate in the browser first, then call the server action with the form's data.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const formElement = event.currentTarget;
    return form.handleSubmit(() => {
      const data = new FormData(formElement);
      startTransition(() => formAction(data));
    })(event);
  };

  return {
    form,
    state,
    formAction,
    onSubmit,
    pending: actionPending || transitionPending,
    errorFor,
    fieldId,
    defaultText,
    defaultList,
    defaultBool,
    summaryErrors,
  };
}

/** Pre-select a value from the URL (e.g. /request-demo?industry=pharmacy-chemist-pos) after load. */
export function useQueryPreset(param: string, allowed: string[], apply: (value: string) => void) {
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get(param);
    if (value && allowed.includes(value)) apply(value);
    // Run once on mount only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
