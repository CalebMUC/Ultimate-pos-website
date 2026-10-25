/**
 * Trust strip: client logos and headline numbers.
 * Only real data, with permission. The strip is hidden while both lists are empty.
 */

export type ClientLogo = {
  name: string;
  /** Path under /public, e.g. /clients/acme-supermarket.svg */
  src: string;
  width: number;
  height: number;
};

export type Stat = {
  value: string;
  label: string;
};

// [[PLACEHOLDER]] real client logos (with written permission)
export const clientLogos: ClientLogo[] = [];

// [[PLACEHOLDER]] real numbers only, e.g. { value: "120+", label: "businesses" }
export const stats: Stat[] = [];
