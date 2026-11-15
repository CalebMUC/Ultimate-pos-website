import Image from "next/image";
import { posSetupImage } from "@/content/pos-setup-image";

/**
 * Hero visual: Ultimate POS on a complete counter setup, with a floating M-Pesa confirmation.
 * The photo is the hero's largest element, so it is preloaded to keep LCP fast.
 */
export function ProductMockup() {
  return (
    <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div className="overflow-hidden rounded-3xl border border-border bg-white p-3 shadow-lift sm:p-5">
        <Image
          src={posSetupImage.src}
          alt={posSetupImage.alt}
          preload
          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, (min-width: 640px) 576px, 100vw"
          className="h-auto w-full"
        />
      </div>

      {/* Floating M-Pesa confirmation */}
      <div
        aria-hidden="true"
        className="absolute -bottom-6 -left-2 w-56 rounded-2xl border border-border bg-surface-raised p-3.5 shadow-lift select-none sm:-left-8 sm:w-64"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-primary-soft-fg">
            <svg viewBox="0 0 20 20" fill="currentColor" className="size-4.5">
              <path
                fillRule="evenodd"
                d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <p className="text-xs font-semibold text-fg">M-Pesa payment received</p>
            <p className="text-[11px] text-muted-fg">KES 2,350 · matched to sale</p>
          </div>
        </div>
      </div>
    </figure>
  );
}
