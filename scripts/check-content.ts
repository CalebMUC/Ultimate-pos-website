/**
 * Content checks run in CI (npm run check:content):
 * - every solution has a page, unique title/description/H1
 * - titles ≤ 60 chars with the site suffix, descriptions ≤ 155 chars
 * - each solution page carries 600–1,000 words of copy
 */
import { solutionCatalog } from "../src/content/solutions/catalog";
import { solutionContent, solutionWordCount } from "../src/content/solutions/index";

const SUFFIX = " | Ultimate POS Kenya";
const errors: string[] = [];
const seen = { title: new Set<string>(), description: new Set<string>(), h1: new Set<string>() };

for (const { slug } of solutionCatalog) {
  const page = solutionContent[slug];
  const fullTitle = page.metaTitle + SUFFIX;
  const words = solutionWordCount(page);

  if (page.slug !== slug) errors.push(`${slug}: content.slug is "${page.slug}"`);
  if (fullTitle.length > 60) errors.push(`${slug}: title is ${fullTitle.length} chars (max 60)`);
  if (page.metaDescription.length > 155)
    errors.push(`${slug}: description is ${page.metaDescription.length} chars (max 155)`);
  if (words < 600 || words > 1000) errors.push(`${slug}: ${words} words (want 600–1,000)`);
  if (page.faqs.length < 3 || page.faqs.length > 5) errors.push(`${slug}: ${page.faqs.length} FAQs (want 3–5)`);

  for (const key of ["title", "description", "h1"] as const) {
    const value = key === "title" ? page.metaTitle : key === "description" ? page.metaDescription : page.h1;
    if (seen[key].has(value)) errors.push(`${slug}: duplicate ${key}`);
    seen[key].add(value);
  }

  console.log(
    `${slug.padEnd(36)} title ${String(fullTitle.length).padStart(2)}  desc ${String(page.metaDescription.length).padStart(3)}  words ${words}`,
  );
}

if (errors.length) {
  console.error(`\n${errors.length} problem(s):\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("\nAll solution pages pass.");
