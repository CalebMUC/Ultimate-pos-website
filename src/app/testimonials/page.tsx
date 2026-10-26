import { notFound } from "next/navigation";
import { testimonials } from "@/content/testimonials";
import { pageMetadata } from "@/lib/seo/metadata";
import { softwareApplicationSchema } from "@/lib/seo/schema";
import { Container } from "@/components/ui/layout";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBand } from "@/components/sections/cta-band";

export const metadata = pageMetadata({
  title: "Client Stories – Ultimate POS Reviews",
  description:
    "What Kenyan businesses say about running their tills, stock and branches on Ultimate POS. Real client stories, shared with their permission.",
  path: "/testimonials",
});

/**
 * Real, consented testimonials only (see content/testimonials.ts). Until the first one is
 * added this page returns a 404, and it stays out of the sitemap and the menus.
 */
export default function TestimonialsPage() {
  if (testimonials.length === 0) notFound();

  return (
    <>
      <JsonLd data={softwareApplicationSchema(testimonials)} />
      <Container className="pt-8">
        <Breadcrumbs items={[{ name: "Client stories", path: "/testimonials" }]} />
      </Container>
      <Testimonials items={testimonials} headingLevel="h1" title="What our clients say about Ultimate POS" />
      <CtaBand />
    </>
  );
}
