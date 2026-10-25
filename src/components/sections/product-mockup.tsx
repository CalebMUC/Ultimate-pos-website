import { ArrowLeftRight, BarChart3, Boxes, Building2, ChevronDown, ScanBarcode, Users } from "lucide-react";

/**
 * Illustrative product UI built in HTML/CSS (no image request, so it never delays LCP).
 * [[PLACEHOLDER]] Replace with real Ultimate POS screenshots in device frames (next/image, priority).
 * Figures shown are illustrative, not customer data.
 */
const bars = [38, 52, 44, 66, 58, 74, 90];

export function ProductMockup() {
  return (
    <figure className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <figcaption className="sr-only">
        Illustration of the Ultimate POS dashboard showing daily sales, M-Pesa takings, a branch switcher and stock
        alerts.
      </figcaption>

      <div aria-hidden="true" className="select-none">
        {/* Browser frame */}
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
          <div className="flex items-center gap-2 border-b border-border bg-bg-subtle px-4 py-3">
            <span className="size-2.5 rounded-full bg-[#f87171]" />
            <span className="size-2.5 rounded-full bg-[#fbbf24]" />
            <span className="size-2.5 rounded-full bg-[#34d399]" />
            <span className="ml-3 hidden h-6 flex-1 rounded-md bg-surface px-3 text-[11px] leading-6 text-muted-fg sm:block">
              Ultimate POS · Dashboard
            </span>
          </div>

          <div className="grid grid-cols-[3.25rem_1fr]">
            {/* Sidebar */}
            <div className="flex flex-col items-center gap-3 border-r border-border bg-bg-subtle py-4">
              {[BarChart3, ScanBarcode, Boxes, ArrowLeftRight, Users].map((Icon, i) => (
                <span
                  key={i}
                  className={`grid size-9 place-items-center rounded-lg ${i === 0 ? "bg-primary text-primary-fg" : "text-muted-fg"}`}
                >
                  <Icon className="size-4" />
                </span>
              ))}
            </div>

            <div className="space-y-4 p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-medium text-muted-fg">Good morning</p>
                  <p className="font-display text-sm font-bold text-fg sm:text-base">Today at a glance</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[11px] font-medium text-fg">
                  <Building2 className="size-3.5 text-accent" />
                  Kiambu Road branch
                  <ChevronDown className="size-3.5 text-muted-fg" />
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { label: "Sales today", value: "KES 148,250", tone: "text-fg" },
                  { label: "M-Pesa", value: "KES 96,400", tone: "text-primary" },
                  { label: "Gross margin", value: "27.4%", tone: "text-accent" },
                ].map((kpi) => (
                  <div key={kpi.label} className="rounded-xl border border-border bg-surface p-2.5 sm:p-3">
                    <p className="text-[10px] text-muted-fg sm:text-[11px]">{kpi.label}</p>
                    <p className={`mt-1 font-display text-xs font-bold sm:text-sm ${kpi.tone}`}>{kpi.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-surface p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold text-fg">Sales this week</p>
                  <p className="text-[10px] text-muted-fg">Mon – Sun</p>
                </div>
                <div className="mt-3 flex h-24 items-end gap-2 sm:h-28">
                  {bars.map((height, i) => (
                    <div
                      key={i}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-md ${i === bars.length - 1 ? "bg-primary" : "bg-primary/25"}`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-xl border border-border bg-surface p-3">
                  <p className="text-[11px] font-semibold text-fg">Low stock</p>
                  <ul className="mt-2 space-y-1.5 text-[10px] text-muted-fg sm:text-[11px]">
                    <li className="flex justify-between">
                      <span>Cooking oil 1L</span>
                      <span className="font-semibold text-[#b45309] dark:text-[#fbbf24]">6 left</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Maize flour 2kg</span>
                      <span className="font-semibold text-[#b45309] dark:text-[#fbbf24]">11 left</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3">
                  <p className="text-[11px] font-semibold text-fg">Incoming transfer</p>
                  <p className="mt-2 text-[10px] text-muted-fg sm:text-[11px]">From Thika branch · 24 items</p>
                  <span className="mt-2 inline-block rounded-md bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent-soft-fg">
                    Awaiting receipt
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating M-Pesa confirmation */}
        <div className="absolute -bottom-6 -left-2 w-56 rounded-2xl border border-border bg-surface-raised p-3.5 shadow-lift sm:-left-8 sm:w-64">
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
      </div>
    </figure>
  );
}
