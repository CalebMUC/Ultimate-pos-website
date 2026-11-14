/**
 * Trust strip: client logos and headline numbers.
 * Only real data, with permission. The strip is hidden while both lists are empty.
 */

export type ClientLogo = {
  name: string;
  /** Path under /public, e.g. /clients/acme-supermarket.png (built by scripts/build_client_logos.py) */
  src: string;
  width: number;
  height: number;
};

export type Stat = {
  value: string;
  label: string;
};

// Real clients only, with their permission to show the logo.
export const clientLogos: ClientLogo[] = [
  { name: "Aqua Hub", src: "/clients/aqua-hub.png", width: 180, height: 160 },
  { name: "Alvet Nutrition", src: "/clients/alvet.png", width: 618, height: 160 },
];

// [[PLACEHOLDER]] real numbers only, e.g. { value: "120+", label: "businesses" }
export const stats: Stat[] = [];
