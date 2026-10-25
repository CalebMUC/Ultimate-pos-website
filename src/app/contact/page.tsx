import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/ui/layout";
import { PageHero } from "@/components/ui/page-hero";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { LeadAside } from "@/components/forms/lead-aside";

export const metadata = pageMetadata({
  title: "Contact Us – Call or WhatsApp",
  description: `Contact Ultimate POS: call or WhatsApp ${site.phone.display}, email ${site.email.sales}, or send a message. Based on Kiambu Road, serving all of Kenya.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        top={<Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />}
        eyebrow="Contact"
        title="Talk to the Ultimate POS team"
        lead="Questions about features, pricing or switching from your current system? Send us a message, or reach us directly on WhatsApp or by phone. We're based on Kiambu Road and work with businesses across Kenya — we don't have a walk-in office, but we'll come to you."
      />
      <Container className="grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-12">
        <div className="rounded-3xl border border-border bg-surface p-6 shadow-card sm:p-10">
          <h2 className="text-2xl font-bold text-fg">Send us a message</h2>
          <p className="mt-2 mb-8 text-muted-fg">
            Fields marked <span className="text-danger">*</span> are required.
          </p>
          <ContactForm />
        </div>
        <LeadAside whatsappContext={{ kind: "contact" }} />
      </Container>
    </>
  );
}
