"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/cn";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or blocked storage: the choice still applies for this page view.
  }
  listeners.forEach((listener) => listener());
}

type ThemeToggleProps = {
  className?: string;
  /** Show a text label next to the icon (used in the mobile menu). */
  withLabel?: boolean;
};

export function ThemeToggle({ className, withLabel }: ThemeToggleProps) {
  // The server always renders the default (light) state; the real state is read after hydration.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "light" as const);
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-pressed={isDark}
      onClick={() => applyTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-3 font-medium text-fg transition-colors hover:bg-bg-subtle [&_svg]:size-[1.15em]",
        className,
      )}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span className={withLabel ? undefined : "sr-only"}>Dark theme</span>
    </button>
  );
}
