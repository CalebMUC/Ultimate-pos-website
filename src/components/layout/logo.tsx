import Link from "next/link";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

// [[PLACEHOLDER]] replace with the official logo (public/logo.svg) when available.
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" focusable="false" className={cn("size-9", className)}>
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#12a05a" />
          <stop offset="1" stopColor="#0a6e3c" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#logo-gradient)" />
      <path d="M12 11v10.5a8 8 0 0 0 16 0V11" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="29.5" cy="29.5" r="4" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("inline-flex items-center gap-2.5 rounded-lg", className)}
    >
      <LogoMark />
      <span className="font-display text-lg font-extrabold tracking-tight text-fg">
        Ultimate<span className="text-primary"> POS</span>
      </span>
    </Link>
  );
}
