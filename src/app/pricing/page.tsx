import { ArrowRight, Building2, LayoutGrid, Users } from "lucide-react";
import { site } from "@/config/site";
import { pricingFaqs } from "@/content/faqs";
import { whatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo/metadata";
import { LinkButton } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaBand } from "@/components/sections/cta-band";
import { PlanComparison, PricingPlans } from "@/components/sections/pricing-plans";
import { WhatsAppIcon } from "@/components/icons";

export const metadata = pageMetadata({
  title: "POS Pricing in Kenya: Compare Plans",
  description:
    "Compare Ultimate POS plans: Starter, Business and Enterprise, with KRA eTIMS on Enterprise. See the modules and features in each, and get a quote in KES.",
  path: "/pricing",
});

const priceFactors = [
  {
    icon: LayoutGrid,
    title: "Your plan",
    text: "Starter, Business or Enterprise, depending on the modules and features your business needs.",
  },
  {
    icon: Building2,
    title: "How many branches you run",
    text: "Plans are priced per branch. Every branch sits under the same account, with its own stock and sales.",
  },
  {
    icon: Users,
    title: "Add-ons and extra users",
    text: "On Business, add Deliveries, Production or Pharmacy only if you need them. Enterprise includes them all.",
  },
];

export default function PricingPage() {
  const fromPrice = site.pricing.fromKesPerMonth;

  return (
    <>
      <PageHero
        top={<Breadcrumbs items={[{ name: "Pricing", path: "/pricing" }]} />}
        eyebrow="Pricing"
        title="Simple plans that grow with your business"
        lead="Choose Starter, Business or Enterprise. Each plan switches on more modules and features, so a single minimart and a ten-branch wholesaler don't pay the same. Tell us how your business works and we'll send you a price in shillings."
      >
        {fromPrice !== null && (
          <p className="mt-6 font-display text-2xl font-bold text-fg">
            From KES {fromPrice.toLocaleString("en-KE")}
            <span className="text-base font-medium text-muted-fg"> / month</span>
          </p>
        )}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/request-quote" size="lg">
            Get a tailored quote
            <ArrowRight aria-hidden="true" />
          </LinkButton>
          <LinkButton href={whatsappLink({ kind: "pricing" })} external variant="secondary" size="lg">
            <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
            Ask about pricing on WhatsApp
          </LinkButton>
        </div>
      </PageHero>

      <PricingPlans />
      <PlanComparison />

      <Section aria-labelledby="factors-heading">
        <Container>
          <SectionHeading
            id="factors-heading"
            title="What your price depends on"
            lead="Your quote is built around three things, so you only pay for what your business uses."
          />
          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {priceFactors.map(({ icon: Icon, title, text }) => (
              <li key={title} className="rounded-2xl border border-border bg-surface p-7 shadow-card">
                <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary-soft-fg">
                  <Icon aria-hidden="true" className="size-6" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-fg">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-fg">{text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="quote-steps-heading">
        <Container>
          <SectionHeading id="quote-steps-heading" title="How getting a quote works" />
          <ol className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              "Tell us about your business on the quote form: your branches, users and the modules you want.",
              `We call you within ${site.responseTime} to go through your needs and your quote.`,
              "If it fits, we set up your account, import your products and train your staff.",
            ].map((step, i) => (
              <li key={step} className="rounded-2xl border border-border bg-surface p-6">
                <span className="grid size-8 place-items-center rounded-full bg-accent text-sm font-bold text-accent-fg">
                  {i + 1}
                </span>
                <p className="mt-4 leading-relaxed text-muted-fg">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <FaqSection faqs={pricingFaqs} title="Pricing questions" tone="subtle" />
      <CtaBand
        title="Get a price for your business"
        lead="It takes two minutes to tell us what you need. No obligation."
        whatsappContext={{ kind: "pricing" }}
      />
    </>
  );
}
