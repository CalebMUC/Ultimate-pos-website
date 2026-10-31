"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { readConsent, saveConsent, subscribeConsent, subscribeConsentOpen, type ConsentChoices } from "@/lib/consent";
import { Button } from "@/components/ui/button";

/**
 * Cookie consent banner. Non-modal (the page stays usable), Accept and Reject are equally
 * prominent, and nothing non-essential loads until the visitor opts in.
 * While open it publishes its height as --consent-offset so the floating WhatsApp button
 * and focused elements are never hidden behind it.
 */
export function ConsentBanner() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => undefined);
  const [reopened, setReopened] = useState(false);
  const [customising, setCustomising] = useState(false);
  const banner = useRef<HTMLElement>(null);
  const headingId = useId();

  // undefined = server render / before hydration: render nothing.
  const open = consent === null || reopened;

  useEffect(
    () =>
      subscribeConsentOpen(() => {
        setReopened(true);
        setCustomising(true);
      }),
    [],
  );

  // Publish the banner height so fixed elements and scroll targets stay clear of it.
  useEffect(() => {
    const root = document.documentElement;
    const element = banner.current;
    if (!open || !element) {
      root.style.removeProperty("--consent-offset");
      return;
    }
    const update = () => root.style.setProperty("--consent-offset", `${element.offsetHeight + 16}px`);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      observer.disconnect();
      root.style.removeProperty("--consent-offset");
    };
  }, [open, customising]);

  // Move focus into the settings when they are opened from the footer link.
  useEffect(() => {
    if (reopened) banner.current?.querySelector<HTMLElement>("input:not([disabled]), button")?.focus();
  }, [reopened]);

  if (!open) return null;

  const choose = (choices: ConsentChoices) => {
    saveConsent(choices);
    setReopened(false);
    setCustomising(false);
  };

  return (
    <section
      ref={banner}
      aria-labelledby={headingId}
      className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 lg:right-auto lg:max-w-xl"
    >
      <div className="rounded-2xl border border-border bg-surface-raised p-5 shadow-lift sm:p-6">
        <h2 id={headingId} className="flex items-center gap-2 text-lg font-bold text-fg">
          <Cookie aria-hidden="true" className="size-5 text-primary" />
          Cookies on this site
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-fg">
          We use essential cookies to make the site work. With your permission we&apos;d also like to use analytics
          cookies to understand how the site is used, and marketing cookies to measure our adverts. See our{" "}
          <Link
            href="/privacy-policy"
            prefetch={false}
            className="font-medium text-primary underline underline-offset-2"
          >
            privacy policy
          </Link>
          .
        </p>

        {customising ? (
          <ConsentForm initial={consent ?? { analytics: false, marketing: false }} onSave={choose} />
        ) : (
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Button variant="primary" size="sm" onClick={() => choose({ analytics: true, marketing: true })}>
              Accept all
            </Button>
            <Button variant="primary" size="sm" onClick={() => choose({ analytics: false, marketing: false })}>
              Reject all
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setCustomising(true)}>
              Choose
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function ConsentForm({ initial, onSave }: { initial: ConsentChoices; onSave: (choices: ConsentChoices) => void }) {
  const [choices, setChoices] = useState(initial);
  const options: { key: keyof ConsentChoices; label: string; description: string }[] = [
    {
      key: "analytics",
      label: "Analytics",
      description: "Google Analytics, to see which pages help visitors.",
    },
    { key: "marketing", label: "Marketing", description: "Meta Pixel, to measure Facebook and Instagram adverts." },
  ];

  return (
    <form
      className="mt-4 space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSave(choices);
      }}
    >
      <div className="flex items-start gap-3 rounded-xl bg-bg-subtle p-3">
        <input id="consent-essential" type="checkbox" checked disabled className="mt-0.5 size-5 accent-(--primary)" />
        <label htmlFor="consent-essential" className="text-sm">
          <span className="block font-semibold text-fg">Essential (always on)</span>
          <span className="block text-muted-fg">Security, spam protection and remembering your choices.</span>
        </label>
      </div>
      {options.map((option) => (
        <div key={option.key} className="flex items-start gap-3 rounded-xl bg-bg-subtle p-3">
          <input
            id={`consent-${option.key}`}
            type="checkbox"
            checked={choices[option.key]}
            onChange={(event) => setChoices({ ...choices, [option.key]: event.target.checked })}
            className="mt-0.5 size-5 accent-(--primary)"
          />
          <label htmlFor={`consent-${option.key}`} className="text-sm">
            <span className="block font-semibold text-fg">{option.label}</span>
            <span className="block text-muted-fg">{option.description}</span>
          </label>
        </div>
      ))}
      <div className="grid gap-2 sm:grid-cols-2">
        <Button type="submit" size="sm">
          Save my choices
        </Button>
        <Button variant="secondary" size="sm" onClick={() => onSave({ analytics: true, marketing: true })}>
          Accept all
        </Button>
      </div>
    </form>
  );
}
