import { ArrowRight, Check } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/icons";

const modules = ["Deliveries & riders", "Production", "Pharmacy", "Bundles", "Cash-up", "Multi-branch"];

// [[PLACEHOLDER]] If you publish a "From KES x/month" price, add it here and to /pricing.
export function PricingTeaser() {
  return (
    <Section tone="subtle" aria-labelledby="pricing-heading">
      <Container>
        <div className="grid items-center gap-10 rounded-3xl border border-border bg-surface p-8 shadow-card sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">Pricing</p>
            <h2 id="pricing-heading" className="mt-3 text-3xl font-bold text-fg sm:text-4xl">
              Pay only for the modules you use
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-fg">
              Ultimate POS is licensed by module. Tell us about your business — branches, tills and the modules you need
              — and we will send you a price in shillings that fits.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/request-quote" size="lg">
                Get a tailored quote
                <ArrowRight aria-hidden="true" />
              </LinkButton>
              <LinkButton href={whatsappLink({ kind: "pricing" })} external variant="secondary" size="lg">
                <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
                Ask on WhatsApp
              </LinkButton>
            </div>
          </div>
          <div className="rounded-2xl bg-bg-subtle p-6">
            <p className="font-semibold text-fg">Switch on what you need:</p>
            <ul className="mt-4 grid grid-cols-2 gap-3">
              {modules.map((m) => (
                <li key={m} className="flex items-center gap-2 text-muted-fg">
                  <Check aria-hidden="true" className="size-4 shrink-0 text-primary" strokeWidth={3} />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
