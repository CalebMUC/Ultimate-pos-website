import type { StaticImageData } from "next/image";
import supermarketMinimartPosPhoto from "@/assets/industries/supermarket-minimart-pos.jpg";
import retailShopPosPhoto from "@/assets/industries/retail-shop-pos.jpg";
import wholesaleDistributionPosPhoto from "@/assets/industries/wholesale-distribution-pos.jpg";
import pharmacyChemistPosPhoto from "@/assets/industries/pharmacy-chemist-pos.jpg";
import waterRefillDeliveryPosPhoto from "@/assets/industries/water-refill-delivery-pos.jpg";
import manufacturingProductionSoftwarePhoto from "@/assets/industries/manufacturing-production-software.jpg";
import hardwareShopPosPhoto from "@/assets/industries/hardware-shop-pos.jpg";
import agrovetPosPhoto from "@/assets/industries/agrovet-pos.jpg";
import liquorWinesSpiritsPosPhoto from "@/assets/industries/liquor-wines-spirits-pos.jpg";
import cosmeticsBeautyShopPosPhoto from "@/assets/industries/cosmetics-beauty-shop-pos.jpg";
import multiBranchBusinessSoftwarePhoto from "@/assets/industries/multi-branch-business-software.jpg";
import type { SolutionSlug } from "./catalog";

/**
 * One photo per industry, shown on the industry cards and at the top of each industry page.
 * Photos live in src/assets/industries/ and are imported, so Next.js gives each one a
 * content-hashed URL: replacing a file always shows the new photo (no stale caches).
 * Wikimedia Commons photos are 1280px wide.
 * Their licences require the credit below, which is shown on each industry page and listed
 * on /solutions. Replace a photo with your own (e.g. a client's shop, with permission) by
 * swapping the file and updating its entry; your own photos need no credit.
 */
export type SolutionImage = {
  src: StaticImageData;
  /** Describes the photo for screen readers */
  alt: string;
  /** CSS object-position, to keep the subject in view when the photo is cropped */
  position?: string;
  /** Required for Wikimedia Commons photos; leave out for Ultimate POS's own photos. */
  credit?: { author: string; license: string; licenseUrl?: string; sourceUrl: string };
};

export const solutionImages: Record<SolutionSlug, SolutionImage> = {
  "supermarket-minimart-pos": {
    src: supermarketMinimartPosPhoto,
    alt: "Supermarket aisles with stocked shelves and sale signs",
    position: "center 60%",
    // Supplied by Ultimate POS: no credit needed. Only 515px wide; replace with a larger copy when available.
  },
  "retail-shop-pos": {
    src: retailShopPosPhoto,
    alt: "A shop assistant arranging products on the shelves of a busy shop",
    position: "center 35%",
    credit: {
      author: "Muzungupeter",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Supermarket_worker.jpg",
    },
  },
  "wholesale-distribution-pos": {
    src: wholesaleDistributionPosPhoto,
    alt: "A warehouse worker checking stock on a tablet among shelves of rice, flour and cartons",
    position: "40% center",
    // Supplied by Ultimate POS: no credit needed.
  },
  "pharmacy-chemist-pos": {
    src: pharmacyChemistPosPhoto,
    alt: "Medicine shelves behind the counter of a pharmacy in Lamu, Kenya",
    position: "center 45%",
    credit: {
      author: "Alimoha2021",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Lamu_Pharmacy2021.jpg",
    },
  },
  "water-refill-delivery-pos": {
    src: waterRefillDeliveryPosPhoto,
    alt: "The water vending machine and refill station at Aqua Hub, an Ultimate POS client",
    position: "center 30%",
    // Client photo (Aqua Hub), cropped from portrait to landscape: no credit needed.
  },
  "manufacturing-production-software": {
    src: manufacturingProductionSoftwarePhoto,
    alt: "Two factory engineers in hard hats reviewing production data on a laptop and tablet",
    position: "center 30%",
    // Supplied by Ultimate POS: no credit needed.
  },
  "hardware-shop-pos": {
    src: hardwareShopPosPhoto,
    alt: "Shelves of plumbing fittings, paint and hardware supplies in a hardware shop",
    // Ultimate POS's own photo: no credit needed.
  },
  "agrovet-pos": {
    src: agrovetPosPhoto,
    alt: "An agrovet shop attendant in Kenya checking stock on a tablet",
    position: "center 30%",
    credit: {
      author: "James Karuga",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Agrovet_Shop_Management.jpg",
    },
  },
  "liquor-wines-spirits-pos": {
    src: liquorWinesSpiritsPosPhoto,
    alt: "Shelves of spirits and soft drinks in a liquor store",
    position: "center",
    credit: {
      author: "Zivya",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Wine_and_etc.JPG",
    },
  },
  "cosmetics-beauty-shop-pos": {
    src: cosmeticsBeautyShopPosPhoto,
    alt: "A shop owner restocking beauty and body-care products",
    position: "center",
    credit: {
      author: "Minette Lontsie",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:G%C3%A9rante_de_parfumerie.jpg",
    },
  },
  "multi-branch-business-software": {
    src: multiBranchBusinessSoftwarePhoto,
    alt: "A busy Nairobi street lined with shops",
    position: "center 60%",
    credit: {
      author: "Bahnfrend",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Digital_Shopping_Mall_(Nairobi),_2025_(01).jpg",
    },
  },
};
