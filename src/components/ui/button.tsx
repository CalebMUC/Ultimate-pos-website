import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "accent" | "secondary" | "ghost" | "whatsapp" | "inverse";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-colors duration-150 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-[1.15em] [&_svg]:shrink-0";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-fg shadow-sm hover:bg-primary-hover",
  accent: "bg-accent text-accent-fg shadow-sm hover:bg-accent-hover",
  secondary: "border border-border-strong bg-surface text-fg hover:border-primary hover:text-primary",
  ghost: "text-fg hover:bg-bg-subtle",
  whatsapp: "bg-whatsapp text-whatsapp-fg shadow-sm hover:brightness-95",
  inverse: "bg-white text-[#075c33] shadow-sm hover:bg-[#e6f6ed]",
};

// Every size keeps a tap target of at least 44px tall, except sm (40px) which is for dense desktop UI.
const sizes: Record<ButtonSize, string> = {
  sm: "min-h-10 px-3.5 text-sm",
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-13 px-6 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Opens in a new tab with rel="noopener noreferrer" */
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

/** A link styled as a button. Internal links use next/link; external and tel: links use <a>. */
export function LinkButton({ href, children, variant, size, className, external, ...props }: LinkButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const isInternal = href.startsWith("/") && !external;

  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
