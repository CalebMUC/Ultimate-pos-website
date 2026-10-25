import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { DemoForm } from "@/components/forms/demo-form";
import { LeadAside } from "@/components/forms/lead-aside";

export const metadata = pageMetadata({
  title: "Request a Free POS Demo",
  description:
    "Book a free Ultimate POS demo on-site, online or by phone. See M-Pesa checkout, stock control and reports working for your type of business.",
  path: "/request-demo",
});

export default function RequestDemoPage() {
  return (
    <>
      <PageHero
        top={<Breadcrumbs items={[{ name: "Request a demo", path: "/request-demo" }]} />}
        eyebrow="Free demo"
        title="Book your free Ultimate POS demo"
        lead="See Ultimate POS working with examples from your type of business — at your premises, on a video call or over the phone. No obligation."
      />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-10">
          <h2 className="text-2xl font-bold text-fg">Your details</h2>
          <p className="mt-2 mb-8 text-muted-fg">
            Fields marked <span className="text-danger">*</span> are required.
          </p>
          <DemoForm />
        </div>
        <LeadAside
          whatsappContext={{ kind: "demo" }}
          steps={[
            `We call you within ${site.responseTime} to confirm a time that suits you.`,
            "We show you Ultimate POS using examples from your type of business.",
            "You get a quote for the modules you need — no obligation.",
          ]}
        />
      </Container>
    </>
  );
}
