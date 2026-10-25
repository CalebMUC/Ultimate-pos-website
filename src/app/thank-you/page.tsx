import Link from "next/link";
import { CircleCheck, Phone } from "lucide-react";
import { site } from "@/config/site";
import { whatsappLink } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo/metadata";
import { LinkButton } from "@/components/ui/button";
import { Container } from "@/components/ui/layout";
import { WhatsAppIcon } from "@/components/icons";
import { ThankYouContent } from "./thank-you-content";

export const metadata = pageMetadata({
  title: "Thank You",
  description: "We've received your request and will be in touch shortly.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="bg-hero">
      <Container className="max-w-2xl py-20 text-center sm:py-28">
        <CircleCheck aria-hidden="true" className="mx-auto size-16 text-primary" strokeWidth={1.75} />
        <ThankYouContent />

        <div className="mt-10 rounded-3xl border border-border bg-surface p-7 text-left shadow-card sm:p-9">
          <h2 className="text-xl font-bold text-fg">Can&apos;t wait? Talk to us now</h2>
          <p className="mt-2 text-muted-fg">
            Chat with us on WhatsApp or give us a call — we&apos;re available {site.hours.display}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <LinkButton href={whatsappLink({ kind: "thank-you" })} external variant="whatsapp" size="lg">
              <WhatsAppIcon />
              Chat on WhatsApp
            </LinkButton>
            <LinkButton href={site.phone.tel} variant="secondary" size="lg">
              <Phone aria-hidden="true" />
              Call {site.phone.display}
            </LinkButton>
          </div>
        </div>

        <p className="mt-10 text-muted-fg">
          While you wait, see{" "}
          <Link href="/features" className="font-semibold text-primary underline-offset-2 hover:underline">
            everything Ultimate POS can do
          </Link>{" "}
          or{" "}
          <Link href="/solutions" className="font-semibold text-primary underline-offset-2 hover:underline">
            how it works in your industry
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
