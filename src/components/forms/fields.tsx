import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import type { Option } from "@/lib/leads/options";
import { cn } from "@/lib/cn";

/*
 * Accessible form fields: a visible <label> for every control, hints and errors linked with
 * aria-describedby, aria-invalid on errors, and tap targets of at least 48px.
 * Errors use an icon and text as well as colour.
 */

const controlBase =
  "block w-full rounded-xl border bg-surface px-4 text-base text-fg shadow-sm outline-none transition-colors placeholder:text-muted-fg/70 focus:border-primary focus:ring-3 focus:ring-primary/25";

const controlState = (error?: string) => (error ? "border-danger" : "border-border-strong");

const describedBy = (id: string, hint?: string, error?: string) =>
  [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-danger">
      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-0.5 size-4 shrink-0">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
          clipRule="evenodd"
        />
      </svg>
      <span>
        <span className="sr-only">Error: </span>
        {error}
      </span>
    </p>
  );
}

function Label({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-medium text-fg">
      {children}
      {required ? (
        <span className="text-danger" aria-hidden="true">
          {" "}
          *
        </span>
      ) : (
        <span className="text-sm font-normal text-muted-fg"> (optional)</span>
      )}
    </label>
  );
}

function Hint({ id, hint }: { id: string; hint?: string }) {
  if (!hint) return null;
  return (
    <p id={`${id}-hint`} className="-mt-1 mb-2 text-sm text-muted-fg">
      {hint}
    </p>
  );
}

type BaseProps = {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function TextField({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...input
}: BaseProps & Omit<ComponentProps<"input">, "id" | "className">) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Hint id={id} hint={hint} />
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={required || undefined}
        className={cn(controlBase, controlState(error), "min-h-12")}
        {...input}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function TextareaField({
  id,
  label,
  hint,
  error,
  required,
  className,
  ...textarea
}: BaseProps & Omit<ComponentProps<"textarea">, "id" | "className">) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Hint id={id} hint={hint} />
      <textarea
        id={id}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        aria-required={required || undefined}
        className={cn(controlBase, controlState(error), "min-h-28 py-3")}
        {...textarea}
      />
      <FieldError id={id} error={error} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  hint,
  error,
  required,
  className,
  options,
  placeholder = "Choose one",
  ...select
}: BaseProps & { options: Option[]; placeholder?: string } & Omit<ComponentProps<"select">, "id" | "className">) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <Hint id={id} hint={hint} />
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(id, hint, error)}
          aria-required={required || undefined}
          className={cn(controlBase, controlState(error), "min-h-12 appearance-none pr-10")}
          {...select}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-muted-fg"
        />
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}

type ChoiceGroupProps = BaseProps & {
  type: "radio" | "checkbox";
  options: Option[];
  columns?: 1 | 2 | 3;
  /** Props applied to every input (e.g. from react-hook-form's register()) */
  inputProps: ComponentProps<"input">;
  /** Values checked on first render (no-JS re-render after a server error) */
  defaultChecked?: string[];
};

/** Radio buttons or checkboxes grouped in a fieldset with a legend. */
export function ChoiceGroup({
  id,
  label,
  hint,
  error,
  required,
  className,
  type,
  options,
  columns = 1,
  inputProps,
  defaultChecked = [],
}: ChoiceGroupProps) {
  return (
    <fieldset
      id={id}
      className={className}
      aria-describedby={describedBy(id, hint, error)}
      aria-invalid={error ? true : undefined}
      tabIndex={-1}
    >
      <legend className="mb-2 font-medium text-fg">
        {label}
        {required ? (
          <span className="text-danger" aria-hidden="true">
            {" "}
            *
          </span>
        ) : (
          <span className="text-sm font-normal text-muted-fg"> (optional)</span>
        )}
      </legend>
      <Hint id={id} hint={hint} />
      <div
        className={cn(
          "grid gap-2",
          columns === 2 && "sm:grid-cols-2",
          columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {options.map((option) => {
          const optionId = `${id}-${option.value}`;
          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cn(
                "flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border bg-surface px-4 py-2 text-fg transition-colors hover:border-primary has-checked:border-primary has-checked:bg-primary-soft",
                error ? "border-danger" : "border-border-strong",
              )}
            >
              <input
                id={optionId}
                type={type}
                value={option.value}
                defaultChecked={defaultChecked.includes(option.value)}
                className="size-5 shrink-0 accent-(--primary)"
                {...inputProps}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
      <FieldError id={id} error={error} />
    </fieldset>
  );
}

export function CheckboxField({
  id,
  label,
  error,
  className,
  ...input
}: { id: string; label: ReactNode; error?: string; className?: string } & Omit<
  ComponentProps<"input">,
  "id" | "className" | "type"
>) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-6 shrink-0 accent-(--primary)"
          {...input}
        />
        <label htmlFor={id} className="leading-relaxed text-fg">
          {label}
        </label>
      </div>
      <FieldError id={id} error={error} />
    </div>
  );
}
