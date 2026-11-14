import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { plans } from "@/content/pricing";
import { whatsappLink } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/icons";

export function PricingTeaser() {
  return (
    <Section tone="subtle" aria-labelledby="pricing-heading">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-surface p-8 shadow-card sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">Pricing</p>
            <h2 id="pricing-heading" className="mt-3 text-3xl font-bold text-fg sm:text-4xl">
              Three plans that grow with your business
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-fg">
              Start on the plan that fits today and move up as you add branches, deliveries or production. Every plan
              includes M-Pesa built in, and Enterprise adds KRA eTIMS.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/pricing" size="lg">
                Compare plans
                <ArrowRight aria-hidden="true" />
              </LinkButton>
              <LinkButton href={whatsappLink({ kind: "pricing" })} external variant="secondary" size="lg">
                <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
                Ask on WhatsApp
              </LinkButton>
            </div>
          </div>
          <ul className="space-y-3">
            {plans.map((plan) => (
              <li key={plan.id}>
                <Link
                  href="/pricing#plans-heading"
                  className="group flex items-center gap-4 rounded-2xl bg-bg-subtle p-5 transition hover:bg-primary-soft"
                >
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-display text-lg font-bold text-fg">
                      {plan.name}
                      {plan.popular && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-bold tracking-wide text-primary-fg uppercase">
                          Most popular
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-fg">{plan.audience}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-primary transition group-hover:translate-x-0.5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
