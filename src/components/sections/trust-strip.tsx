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
          <div>
            <h2 className="text-center text-sm font-semibold tracking-wider text-muted-fg uppercase">
              Trusted by Kenyan businesses
            </h2>
            {/* White tiles keep every client's brand colours readable in light and dark mode. */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {clientLogos.map((logo) => (
                <li
                  key={logo.name}
                  className="flex h-20 w-40 items-center justify-center rounded-2xl border border-border bg-white px-5 py-3 sm:w-48"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    sizes="160px"
                    className="max-h-full w-auto max-w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
