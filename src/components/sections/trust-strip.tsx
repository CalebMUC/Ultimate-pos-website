import Image from "next/image";
import { clientLogos, stats } from "@/content/trust";
import { Container } from "@/components/ui/layout";

/** Hidden until real client logos or real numbers are added to content/trust.ts. */
export function TrustStrip() {
  if (clientLogos.length === 0 && stats.length === 0) return null;

  return (
    <section aria-label="Trusted by Kenyan businesses" className="border-y border-border bg-surface py-10">
      <Container className="space-y-8">
        {stats.length > 0 && (
          <dl className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="text-sm text-muted-fg">{stat.label}</dt>
                <dd className="order-first font-display text-3xl font-extrabold text-primary">{stat.value}</dd>
              </div>
            ))}
          </dl>
        )}
        {clientLogos.length > 0 && (
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {clientLogos.map((logo) => (
              <li key={logo.name}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="h-10 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0"
                />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
