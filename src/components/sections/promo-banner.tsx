import Image from "next/image";
import Link from "next/link";
import bannerImage from "@/assets/banners/ultimate-pos-banner.jpg";
import { Container } from "@/components/ui/layout";

/**
 * Marketing banner (src/assets/banners/ultimate-pos-banner.jpg). Its text is part of the
 * image, so the alt text repeats all of it; the whole banner links to the demo form,
 * matching its "Get Started Today" button. Replace the file to change the banner, and
 * update the alt text to match.
 */
const alt =
  "UltimatePOS, the ultimate solution for Kenyan business. Run your business smarter, faster and easier: " +
  "sales management, inventory control, powerful reports, multi-user support, secure and reliable. " +
  "Boost productivity, serve customers better and grow your business. Get started today.";

export function PromoBanner() {
  return (
    <section aria-label="Get started with Ultimate POS" className="py-12 sm:py-16">
      <Container>
        <Link
          href="/request-demo"
          className="group block overflow-hidden rounded-2xl border border-border shadow-card transition-shadow hover:shadow-lift sm:rounded-3xl"
        >
          <Image
            src={bannerImage}
            alt={alt}
            sizes="(min-width: 1280px) 1216px, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
            className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.01] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </Link>
      </Container>
    </section>
  );
}
