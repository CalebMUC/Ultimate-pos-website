import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { QuoteForm } from "@/components/forms/quote-form";
import { LeadAside } from "@/components/forms/lead-aside";

export const metadata = pageMetadata({
  title: "Request a POS Quote in Kenya",
  description:
    "Get a tailored Ultimate POS quote in KES for your branches, tills and modules — M-Pesa, stock, deliveries, production, pharmacy and more.",
  path: "/request-quote",
});

export default function RequestQuotePage() {
  return (
    <>
      <PageHero
        top={<Breadcrumbs items={[{ name: "Request a quote", path: "/request-quote" }]} />}
        eyebrow="Pricing"
        title="Get a quote for your business"
        lead="Ultimate POS is licensed by module, so you only pay for what you use. Tell us about your business and we'll send you a price in shillings."
      />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-10">
          <h2 className="text-2xl font-bold text-fg">About your business</h2>
          <p className="mt-2 mb-8 text-muted-fg">
            Fields marked <span className="text-danger">*</span> are required.
          </p>
          <QuoteForm />
        </div>
        <LeadAside
          whatsappContext={{ kind: "pricing" }}
          steps={[
            "We look at your branches, tills and the modules you need.",
            `We call you within ${site.responseTime} to go through your quote.`,
            "If it fits, we book your setup, import your products and train your staff.",
          ]}
        />
      </Container>
    </>
  );
}
