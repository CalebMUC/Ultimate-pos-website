import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the theme's custom shadow tokens (see globals.css @theme).
const twMerge = extendTailwindMerge({
  extend: { classGroups: { shadow: [{ shadow: ["card", "lift"] }] } },
});

type ClassValue = string | false | null | undefined;

/** Join class names, letting later Tailwind classes override conflicting earlier ones. */
export function cn(...classes: ClassValue[]): string {
  return twMerge(classes.filter(Boolean).join(" "));
}
