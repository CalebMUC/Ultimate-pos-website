import { ArrowLeftRight, Building2, Check, History, ShieldCheck, Smartphone } from "lucide-react";
import type { ReactNode } from "react";
import { LinkButton } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/layout";

function Point({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" strokeWidth={3} />
      <span className="leading-relaxed text-muted-fg">{children}</span>
    </li>
  );
}

/** Our two differentiators: M-Pesa built in, and safe multi-branch control. */
export function Spotlight() {
  return (
    <Section tone="subtle" aria-labelledby="spotlight-heading">
      <Container>
        <h2 id="spotlight-heading" className="sr-only">
          Why businesses choose Ultimate POS
        </h2>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-wider text-primary uppercase">M-Pesa built in</p>
            <h3 className="mt-3 text-3xl font-bold text-fg sm:text-4xl">Your till and your M-Pesa finally agree</h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-fg">
              No more scrolling through SMS messages at closing time. Ultimate POS sends the payment request and matches
              the money to the sale.
            </p>
            <ul className="mt-6 space-y-3">
              <Point>STK push straight to the customer&apos;s phone at checkout</Point>
              <Point>Incoming payments matched to the right sale</Point>
              <Point>An M-Pesa payment log of every transaction</Point>
              <Point>Shift and rider cash-ups, so every till and every route is reconciled</Point>
            </ul>
          </div>

          <div aria-hidden="true" className="relative mx-auto w-full max-w-sm">
            <div className="rounded-[2rem] border-8 border-fg/90 bg-surface p-5 shadow-lift">
              <div className="flex items-center gap-2 text-sm font-semibold text-fg">
                <Smartphone className="size-4 text-primary" /> M-Pesa
              </div>
              <div className="mt-4 rounded-2xl bg-primary-soft p-4">
                <p className="text-xs text-primary-soft-fg">Payment request</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-primary-soft-fg">KES 2,350</p>
                <p className="mt-1 text-xs text-primary-soft-fg/80">Ultimate POS · Kiambu Road</p>
              </div>
              <div className="mt-4 space-y-2">
                {["Sale #10482 · KES 2,350", "Sale #10481 · KES 780", "Sale #10480 · KES 4,120"].map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-xs text-fg"
                  >
                    {row}
                    <span className="rounded-md bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-fg">
                      Matched
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <p className="text-sm font-semibold tracking-wider text-accent uppercase">Multi-branch</p>
            <h3 className="mt-3 text-3xl font-bold text-fg sm:text-4xl">
              Every branch under control, even when you are not there
            </h3>
            <p className="mt-4 text-lg leading-relaxed text-muted-fg">
              Open a second shop, a third, a tenth. Ultimate POS keeps each branch&apos;s stock and sales separate, and
              gives you the controls to trust what happens in every one of them.
            </p>
            <ul className="mt-6 space-y-3">
              <Point>All branches under one account, with a branch switcher</Point>
              <Point>Stock transfers between branches, with an inbox for incoming stock</Point>
              <Point>Roles and fine-grained permissions for every user</Point>
              <Point>A full audit log of who did what, and when</Point>
            </ul>
            <LinkButton href="/solutions/multi-branch-business-software" variant="secondary" className="mt-8">
              Multi-branch business software
            </LinkButton>
          </div>

          <div aria-hidden="true" className="grid gap-3 lg:order-1">
            {[
              {
                icon: Building2,
                title: "Kiambu Road",
                meta: "Main branch · 4 users",
                tone: "bg-primary text-primary-fg",
              },
              {
                icon: ArrowLeftRight,
                title: "Transfer to Thika",
                meta: "24 items · in transit",
                tone: "bg-accent text-accent-fg",
              },
              {
                icon: ShieldCheck,
                title: "Cashier role",
                meta: "Only the permissions a cashier needs",
                tone: "bg-primary-soft text-primary-soft-fg",
              },
              {
                icon: History,
                title: "Audit log",
                meta: "Price changed by Manager · 09:42",
                tone: "bg-accent-soft text-accent-soft-fg",
              },
            ].map(({ icon: Icon, title, meta, tone }, i) => (
              <div
                key={title}
                style={{ marginInlineStart: `${(i % 2) * 2.5}rem` }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-4 shadow-card"
              >
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone}`}>
                  <Icon className="size-5" />
                </span>
                <span>
                  <span className="block font-semibold text-fg">{title}</span>
                  <span className="block text-sm text-muted-fg">{meta}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
