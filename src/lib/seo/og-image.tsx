import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * Branded 1200×630 Open Graph image shared by every opengraph-image.tsx file.
 * Facebook, Instagram, WhatsApp, LinkedIn and X all read these previews.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = join(process.cwd(), "node_modules/@fontsource");

/**
 * Brand fonts from @fontsource (ImageResponse needs ttf/otf/woff, not woff2).
 * Cached with "use cache": with Cache Components, uncached file reads would stop the
 * per-industry images from being prerendered (they would 500 at request time).
 * Returned as base64 strings, which the cache serialises reliably (raw buffers don't survive).
 */
async function loadFontsBase64() {
  "use cache";
  const files = [
    "plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff",
    "inter/files/inter-latin-500-normal.woff",
    "inter/files/inter-latin-600-normal.woff",
  ];
  return Promise.all(files.map(async (file) => (await readFile(join(fontDir, file))).toString("base64")));
}

const toArrayBuffer = (base64: string) => {
  const bytes = Buffer.from(base64, "base64");
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
};

type OgImageProps = {
  /** Small green label above the title, e.g. "Pharmacy POS" */
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export async function renderOgImage({ eyebrow, title, subtitle }: OgImageProps) {
  const [jakarta800, inter500, inter600] = (await loadFontsBase64()).map(toArrayBuffer);
  const titleSize = title.length > 70 ? 52 : title.length > 45 ? 60 : 68;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#ffffff",
        backgroundImage:
          "radial-gradient(circle at 92% 0%, rgba(29,78,216,0.16), transparent 45%), radial-gradient(circle at 0% 0%, rgba(10,122,67,0.18), transparent 50%)",
        fontFamily: "Inter",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "64px 72px 40px" }}>
        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="11" fill="#0a7a43" />
            <path d="M12 11v10.5a8 8 0 0 0 16 0V11" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
            <circle cx="29.5" cy="29.5" r="4" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
          </svg>
          <div style={{ display: "flex", fontFamily: "Jakarta", fontSize: 38, color: "#0e1c16" }}>
            Ultimate<span style={{ color: "#0a7a43", marginLeft: 10 }}>POS</span>
          </div>
        </div>

        {/* Copy */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto", marginBottom: "auto" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 26,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#0a7a43",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 18,
              fontFamily: "Jakarta",
              fontSize: titleSize,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              color: "#0e1c16",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 28,
                lineHeight: 1.35,
                color: "#4a5a53",
                maxWidth: 960,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Footer band */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "26px 72px",
          backgroundImage: "linear-gradient(90deg, #075c33, #0a7a43 55%, #0d5a9c)",
          color: "#ffffff",
          fontSize: 26,
          fontWeight: 600,
        }}
      >
        <div style={{ display: "flex" }}>M-Pesa built in · Multi-branch · Cloud-based</div>
        <div style={{ display: "flex" }}>
          {site.url.replace(/^https?:\/\//, "")} · {site.phone.display}
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Jakarta", data: jakarta800, weight: 800, style: "normal" },
        { name: "Inter", data: inter500, weight: 500, style: "normal" },
        { name: "Inter", data: inter600, weight: 600, style: "normal" },
      ],
    },
  );
}
