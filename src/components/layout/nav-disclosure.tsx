"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

type NavDisclosureProps = {
  summary: ReactNode;
  summaryClassName?: string;
  className?: string;
  children: ReactNode;
};

/**
 * A menu built on native <details>, so it opens without JavaScript.
 * When JS is available it also closes on route change, outside click, Escape and link click.
 */
export function NavDisclosure({ summary, summaryClassName, className, children }: NavDisclosureProps) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    const details = ref.current;
    if (!details) return;

    const onPointerDown = (event: PointerEvent) => {
      if (details.open && !details.contains(event.target as Node)) details.open = false;
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a")) details.open = false;
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    details.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      details.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className={className}>
      <summary className={summaryClassName}>{summary}</summary>
      {children}
    </details>
  );
}
