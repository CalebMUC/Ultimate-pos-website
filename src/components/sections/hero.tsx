import { ArrowRight, Check } from "lucide-react";
import { whatsappLink } from "@/lib/whatsapp";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/icons";
import { ProductMockup } from "./product-mockup";

const highlights = ["M-Pesa built in", "Every branch in one account", "Cloud-based, no server to buy"];

export function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden" aria-labelledby="hero-heading">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <Container className="relative grid items-center gap-14 pt-12 pb-20 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pt-20 lg:pb-28">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-soft px-3 py-1 text-sm font-semibold text-primary-soft-fg">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            Built in Kenya, for Kenyan businesses
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-4xl leading-[1.08] font-extrabold text-fg sm:text-5xl lg:text-[3.6rem]"
          >
            The POS system that runs your <span className="text-primary">whole business</span>,{" "}
            <span className="text-accent">every branch</span>.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-fg sm:text-xl">
            Sell faster with M-Pesa at the till, know your stock in every branch in real time, and see exactly where
            every shilling goes — all from one cloud system.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/request-demo" size="lg">
              Request a Free Demo
              <ArrowRight aria-hidden="true" />
            </LinkButton>
            <LinkButton href={whatsappLink({ kind: "demo" })} external variant="secondary" size="lg">
              <WhatsAppIcon className="text-[#128c4b] dark:text-whatsapp" />
              Chat on WhatsApp
            </LinkButton>
          </div>

          <ul className="mt-8 flex flex-col gap-x-6 gap-y-2 text-sm font-medium text-fg/80 sm:flex-row sm:flex-wrap">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-primary" strokeWidth={3} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ProductMockup />
      </Container>
    </section>
  );
}
