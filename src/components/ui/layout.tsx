import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

type SectionProps = ComponentProps<"section"> & { tone?: "default" | "subtle" };

export function Section({ className, tone = "default", ...props }: SectionProps) {
  return (
    <section className={cn("py-16 sm:py-20 lg:py-24", tone === "subtle" && "bg-bg-subtle", className)} {...props} />
  );
}

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  align = "center",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="mb-3 text-sm font-semibold tracking-wider text-primary uppercase">{eyebrow}</p>}
      <Heading id={id} className="text-3xl font-bold text-fg sm:text-4xl">
        {title}
      </Heading>
      {lead && <p className="mt-4 text-lg leading-relaxed text-muted-fg">{lead}</p>}
    </div>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-2xl border border-border bg-surface p-6 shadow-card", className)} {...props} />;
}
