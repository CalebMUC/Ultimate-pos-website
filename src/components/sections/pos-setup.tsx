import Image from "next/image";
import { ArrowRight, Banknote, Monitor, Printer, ScanBarcode, Smartphone } from "lucide-react";
import { posSetupImage } from "@/content/pos-setup-image";
import { LinkButton } from "@/components/ui/button";
import { Container, Section, SectionHeading } from "@/components/ui/layout";

/**
 * A complete point of sale counter setup: photo + the hardware that goes with Ultimate POS.
 * [[PLACEHOLDER]] Confirm before promising to sell or install hardware (see content/features.ts).
 */

const parts = [
  {
    icon: Monitor,
    title: "Screen and POS computer",
    text: "A computer or touchscreen at the till, logged in to Ultimate POS over the internet. No server to buy.",
  },
  {
    icon: ScanBarcode,
    title: "Barcode scanner",
    text: "Scan items at checkout instead of typing them in, so the queue keeps moving.",
  },
  {
    icon: Printer,
    title: "Receipt printer",
    text: "A printed receipt for every sale, return and refund.",
  },
  {
    icon: Banknote,
    title: "Cash drawer",
    text: "Keeps the cash safe, and shift cash-ups balance the drawer to the shilling.",
  },
  {
    icon: Smartphone,
    title: "M-Pesa at the till",
    text: "STK push sends the payment request straight to the customer's phone and matches it to the sale.",
  },
];

export function PosSetup({ tone = "subtle" }: { tone?: "default" | "subtle" }) {
  return (
    <Section tone={tone} aria-labelledby="pos-setup-heading">
      <Container>
        <SectionHeading
          id="pos-setup-heading"
          eyebrow="Complete POS setup"
          title="Everything you need at the counter"
          lead="Ultimate POS works with a standard point of sale setup. Tell us what you already have and what you still need, and we'll include it in your quote."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="overflow-hidden rounded-3xl border border-border bg-white p-3 shadow-card sm:p-5">
            <Image
              src={posSetupImage.src}
              alt={posSetupImage.alt}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full"
            />
          </div>

          <div>
            <ul className="space-y-5">
              {parts.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary-soft-fg">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-fg">{title}</h3>
                    <p className="mt-1 leading-relaxed text-muted-fg">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <LinkButton href="/request-quote" size="lg">
                Get a quote for your setup
                <ArrowRight aria-hidden="true" />
              </LinkButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
