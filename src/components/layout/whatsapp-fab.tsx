"use client";

import { usePathname } from "next/navigation";
import { whatsappContextFromPath, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons";

/**
 * Floating WhatsApp button on every page, with a prefilled message for the current page.
 * The pathname is known at prerender time, so the correct href is in the server HTML.
 * It sits above the cookie banner via --consent-offset (set by the banner while it is open).
 */
export function WhatsAppFab() {
  const pathname = usePathname();

  return (
    <a
      href={whatsappLink(whatsappContextFromPath(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-[calc(1rem+var(--consent-offset,0px))] z-40 inline-flex min-h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-whatsapp px-4 font-semibold text-whatsapp-fg shadow-lift transition-[transform,bottom] hover:scale-105 motion-reduce:hover:scale-100 sm:right-6 sm:bottom-[calc(1.5rem+var(--consent-offset,0px))] lg:px-5"
    >
      <WhatsAppIcon className="size-6" />
      {/* Visible text is part of the accessible name (WCAG 2.5.3) */}
      <span className="hidden lg:inline">Chat with us</span>
    </a>
  );
}
