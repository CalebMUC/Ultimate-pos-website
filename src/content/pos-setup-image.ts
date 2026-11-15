import completeSetupPhoto from "@/assets/pos/ultimate-pos-complete-setup.jpg";
import { site } from "@/config/site";

/**
 * Ultimate POS on a complete counter setup (till screen, receipt printer, barcode scanner,
 * cash drawer). Used in the homepage hero, the "Complete POS setup" section, the lead-form
 * sidebars, share images and structured data. The dashboard figures shown are illustrative.
 *
 * Two copies of the same file, keep them identical when replacing the photo:
 * - src/assets/pos/ultimate-pos-complete-setup.jpg: imported for next/image (content-hashed URL)
 * - public/images/ultimate-pos-complete-setup.jpg: a stable URL for structured data and share images
 */
export const posSetupImage = {
  src: completeSetupPhoto,
  publicPath: site.productPhoto,
  alt: "Ultimate POS on a complete point of sale setup: a till screen showing the sales dashboard, a receipt printer, a barcode scanner and a cash drawer",
} as const;
