import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, type BreadcrumbItem } from "@/lib/seo/schema";
import { cn } from "@/lib/cn";
import { JsonLd } from "./json-ld";

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. Home is added automatically. */
export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-muted-fg">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-1.5">
                {isLast ? (
                  <span aria-current="page" className="font-medium text-fg">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link href={item.path} className="rounded hover:text-primary">
                      {item.name}
                    </Link>
                    <ChevronRight aria-hidden="true" className="size-3.5" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(trail)} />
    </>
  );
}
