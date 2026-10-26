import Link from "next/link";
import type { MDXComponents } from "mdx/types";

/**
 * Elements used when rendering MDX (blog posts). Typography comes from the `prose` wrapper;
 * here we only make internal links client-side and external links open safely.
 */
const components: MDXComponents = {
  a: ({ href = "", children, ...props }) =>
    href.startsWith("/") ? (
      <Link href={href} {...props}>
        {children}
      </Link>
    ) : (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
