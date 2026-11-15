import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Official Ultimate POS logo (gold diamond + "UltimatePOS" wordmark). The files are drawn by
 * scripts/build_brand_assets.py — re-run it instead of editing the PNGs.
 * tone="default": navy and gold on light backgrounds, with a white-and-gold copy for dark mode
 * (only the visible one is downloaded; the hidden one stays lazy and display:none).
 * tone="onBrand": white and gold, for the green footer.
 */
const LOGO_WIDTH = 1211;
const LOGO_HEIGHT = 240;

type LogoProps = { className?: string; imageClassName?: string; tone?: "default" | "onBrand" };

export function Logo({ className, imageClassName, tone = "default" }: LogoProps) {
  const imgClass = cn("h-8 w-auto lg:h-9", imageClassName);
  const image = (src: string, extra?: string) => (
    <Image src={src} alt="" width={LOGO_WIDTH} height={LOGO_HEIGHT} sizes="240px" className={cn(imgClass, extra)} />
  );

  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("inline-flex shrink-0 items-center rounded-lg", className)}
    >
      {tone === "onBrand" ? (
        image("/brand/upos-logo-white.png")
      ) : (
        <>
          {image("/brand/upos-logo.png", "dark:hidden")}
          {image("/brand/upos-logo-dark.png", "hidden dark:block")}
        </>
      )}
    </Link>
  );
}
