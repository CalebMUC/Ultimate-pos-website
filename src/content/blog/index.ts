import type { ComponentType } from "react";
import { z } from "zod";
import * as choosePos from "./how-to-choose-a-pos-system-in-kenya.mdx";
import * as mpesaReconciliation from "./mpesa-till-reconciliation-guide.mdx";

/**
 * Blog posts. Each post is an .mdx file in this folder that exports `meta`; add new posts
 * to `modules` below. Meta is validated here, so a bad date or an over-long title fails the
 * build rather than reaching Google.
 */
const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const metaSchema = z.object({
  /** ≤ 39 characters: the layout appends " | Ultimate POS Kenya" (≤ 60 total) */
  title: z.string().min(10).max(39),
  /** ≤ 155 characters */
  description: z.string().min(50).max(155),
  publishedAt: isoDate,
  updatedAt: isoDate,
  readingMinutes: z.number().int().positive(),
  /** Drafts are shown in development only. */
  draft: z.boolean().default(false),
});

export type PostMeta = z.infer<typeof metaSchema> & { slug: string };
type PostModule = { default: ComponentType; meta?: unknown };

const modules: Record<string, PostModule> = {
  "how-to-choose-a-pos-system-in-kenya": choosePos,
  "mpesa-till-reconciliation-guide": mpesaReconciliation,
};

const showDrafts = process.env.NODE_ENV !== "production";

const allPosts = Object.entries(modules).map(([slug, mod]) => {
  const parsed = metaSchema.safeParse(mod.meta);
  if (!parsed.success) {
    throw new Error(`Invalid meta in src/content/blog/${slug}.mdx: ${z.prettifyError(parsed.error)}`);
  }
  return { meta: { ...parsed.data, slug }, Content: mod.default };
});

/** Published posts, newest first. */
export const posts = allPosts
  .filter((post) => showDrafts || !post.meta.draft)
  .sort((a, b) => b.meta.publishedAt.localeCompare(a.meta.publishedAt));

export const hasPublishedPosts = posts.length > 0;

export function getPost(slug: string) {
  return posts.find((post) => post.meta.slug === slug);
}
