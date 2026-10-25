"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Loader2, Phone } from "lucide-react";
import { site } from "@/config/site";
import { HONEYPOT_FIELD, TIMING_FIELD } from "@/lib/leads/state";
import { whatsappLink } from "@/lib/whatsapp";
import { Button, LinkButton } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";

/** Hidden from people and assistive tech; bots that fill every field reveal themselves. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
      <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

/** Stamps the time the form became interactive (absent without JavaScript). */
export function TimingField() {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.value = String(Date.now());
  }, []);
  // No value/defaultValue prop: on a hidden input those are the same attribute, and React
  // would reset the timestamp back to "" on every re-render.
  return <input ref={ref} type="hidden" name={TIMING_FIELD} />;
}

export function ConsentLabel() {
  return (
    <>
      I agree that Ultimate POS may contact me about this request and store my details as described in the{" "}
      <Link href="/privacy-policy" className="font-medium text-primary underline underline-offset-2">
        privacy policy
      </Link>
      .
    </>
  );
}

export type ErrorItem = { id: string; message: string };

/** Lists every error with a link to its field. Announced to screen readers when it appears. */
export function ErrorSummary({ errors, message }: { errors: ErrorItem[]; message?: string }) {
  if (errors.length === 0 && !message) return null;
  return (
    <div role="alert" className="rounded-xl border border-danger bg-danger-soft p-5 text-danger">
      <p className="font-semibold">
        {errors.length > 0
          ? `There ${errors.length === 1 ? "is 1 problem" : `are ${errors.length} problems`} with your form`
          : message}
      </p>
      {errors.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 pl-5">
          {errors.map((error) => (
            <li key={error.id}>
              <a href={`#${error.id}`} className="underline underline-offset-2">
                {error.message}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Shown when the email could not be sent, or the visitor hit the rate limit. */
export function FallbackNotice({ message }: { message: string }) {
  return (
    <div role="alert" className="rounded-xl border border-danger bg-danger-soft p-5">
      <p className="font-semibold text-danger">{message}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <LinkButton href={whatsappLink({ kind: "general" })} external variant="whatsapp">
          <WhatsAppIcon />
          WhatsApp {site.phone.display}
        </LinkButton>
        <LinkButton href={site.phone.tel} variant="secondary">
          <Phone aria-hidden="true" />
          Call {site.phone.display}
        </LinkButton>
      </div>
    </div>
  );
}

export function SubmitButton({ children, pending: pendingProp }: { children: string; pending?: boolean }) {
  const { pending: formPending } = useFormStatus();
  const pending = pendingProp || formPending;
  return (
    <Button type="submit" size="lg" disabled={pending} aria-disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 aria-hidden="true" className="animate-spin motion-reduce:animate-none" />
          Sending…
        </>
      ) : (
        <>
          {children}
          <ArrowRight aria-hidden="true" />
        </>
      )}
    </Button>
  );
}
