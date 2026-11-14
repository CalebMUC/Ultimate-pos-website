import { ArrowRight, Check, Minus, Plus } from "lucide-react";
import {
  addOnsFor,
  featureRows,
  limitRows,
  moduleRows,
  newInPlan,
  plans,
  previousPlan,
  type Availability,
  type Plan,
  type PlanRow,
} from "@/content/pricing";
import { LinkButton } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { cn } from "@/lib/cn";

function Price({ plan }: { plan: Plan }) {
  if (plan.priceKesPerMonth === null) {
    return <p className="font-display text-2xl font-extrabold text-fg">Price on request</p>;
  }
  return (
    <p className="font-display text-fg">
      {plan.pricePrefix && <span className="mr-1 text-base font-semibold text-muted-fg">{plan.pricePrefix}</span>}
      <span className="text-3xl font-extrabold">KES {plan.priceKesPerMonth.toLocaleString("en-KE")}</span>
      <span className="text-base font-medium text-muted-fg"> / branch / month</span>
    </p>
  );
}

function CheckList({ rows }: { rows: PlanRow[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {rows.map((row) => (
        <li key={row.label} className="flex gap-2.5 text-fg">
          <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={3} />
          <span>{row.label}</span>
        </li>
      ))}
    </ul>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const previous = previousPlan(plan.id);
  const modules = newInPlan(moduleRows, plan.id);
  const features = newInPlan(featureRows, plan.id);
  const addOns = addOnsFor(moduleRows, plan.id);

  return (
    <li
      className={cn(
        "relative flex flex-col rounded-3xl border bg-surface p-7 shadow-card sm:p-8",
        plan.popular ? "border-primary ring-2 ring-primary" : "border-border",
      )}
    >
      {plan.popular && (
        <p className="absolute -top-3.5 left-7 rounded-full bg-primary px-3 py-1 text-xs font-bold tracking-wide text-primary-fg uppercase">
          Most popular
        </p>
      )}
      <h3 className="font-display text-2xl font-extrabold text-fg">{plan.name}</h3>
      <p className="mt-2 min-h-12 text-muted-fg">{plan.audience}</p>
      <div className="mt-5">
        <Price plan={plan} />
      </div>
      <p className="mt-2 text-sm font-medium text-muted-fg">
        {limitRows.map((row) => row.availability[plan.id]).join(" · ")}
      </p>
      <LinkButton
        href="/request-quote"
        variant={plan.popular ? "primary" : "secondary"}
        className="mt-6 w-full"
        aria-label={`Get a quote for the ${plan.name} plan`}
      >
        Get a quote
        <ArrowRight aria-hidden="true" />
      </LinkButton>

      <div className="mt-8 border-t border-border pt-6">
        <h4 className="text-sm font-bold tracking-wider text-primary uppercase">Modules</h4>
        {previous && <p className="mt-2 text-sm text-muted-fg">Everything in {previous.name}, plus:</p>}
        <CheckList rows={modules} />
        {addOns.length > 0 && (
          <p className="mt-4 flex gap-2.5 text-sm text-muted-fg">
            <Plus aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={3} />
            <span>Add-ons available: {addOns.map((row) => row.label).join(", ")}</span>
          </p>
        )}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-bold tracking-wider text-primary uppercase">Features</h4>
        {previous && <p className="mt-2 text-sm text-muted-fg">Everything in {previous.name}, plus:</p>}
        <CheckList rows={features} />
      </div>
    </li>
  );
}

export function PricingPlans() {
  return (
    <Section aria-labelledby="plans-heading">
      <Container>
        <SectionHeading
          id="plans-heading"
          title="Three plans, one system"
          lead="Every plan includes M-Pesa built in, cloud access from anywhere and support by WhatsApp, phone and email. Move up a plan whenever your business grows."
        />
        <ul className="mt-14 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function Cell({ value, plan }: { value: Availability; plan: string }) {
  if (value === true) {
    return (
      <>
        <Check aria-hidden="true" className="mx-auto size-5 text-primary" strokeWidth={3} />
        <span className="sr-only">Included in {plan}</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus aria-hidden="true" className="mx-auto size-5 text-border-strong" />
        <span className="sr-only">Not in {plan}</span>
      </>
    );
  }
  if (value === "add-on") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-accent-soft-fg">
        <Plus aria-hidden="true" className="size-3" strokeWidth={3} />
        Add-on
      </span>
    );
  }
  return <span className="text-sm font-semibold text-fg">{value}</span>;
}

function RowGroup({ title, rows }: { title: string; rows: PlanRow[] }) {
  return (
    <tbody>
      <tr>
        <th
          scope="colgroup"
          colSpan={4}
          className="bg-bg-subtle px-4 py-3 text-left text-sm font-bold tracking-wider text-primary uppercase"
        >
          {title}
        </th>
      </tr>
      {rows.map((row) => (
        <tr key={row.label} className="border-t border-border">
          <th scope="row" className="px-4 py-3.5 text-left font-medium text-fg">
            {row.label}
            {row.note && <span className="mt-0.5 block text-sm font-normal text-muted-fg">{row.note}</span>}
          </th>
          {plans.map((plan) => (
            <td key={plan.id} className="px-4 py-3.5 text-center">
              <Cell value={row.availability[plan.id]} plan={plan.name} />
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export function PlanComparison() {
  return (
    <Section tone="subtle" aria-labelledby="compare-heading">
      <Container>
        <SectionHeading
          id="compare-heading"
          title="Compare plans"
          lead="Modules are the parts of the system you switch on. Features are what comes with every module in that plan."
        />
        {/* Scrolls sideways on small phones instead of squashing the columns. Focusable so keyboard
            users can scroll it too (WCAG scrollable-region-focusable). */}
        <div
          role="region"
          aria-label="Plan comparison (scrolls sideways on small screens)"
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- a scrollable region must be keyboard-focusable
          tabIndex={0}
          className="mt-12 overflow-x-auto rounded-2xl border border-border bg-surface shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <table className="w-full min-w-[40rem] border-collapse">
            <caption className="sr-only">Modules and features in each Ultimate POS plan</caption>
            <thead>
              <tr>
                <td className="w-2/5 px-4 py-4" />
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    scope="col"
                    className="px-4 py-4 text-center font-display text-lg font-extrabold text-fg"
                  >
                    {plan.name}
                    {plan.popular && (
                      <span className="mt-1 block text-xs font-semibold tracking-wide text-primary uppercase">
                        Most popular
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <RowGroup title="Plan limits" rows={limitRows} />
            <RowGroup title="Modules" rows={moduleRows} />
            <RowGroup title="Features" rows={featureRows} />
          </table>
        </div>
      </Container>
    </Section>
  );
}
