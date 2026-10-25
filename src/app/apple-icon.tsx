import { ImageResponse } from "next/og";

// Home-screen icon for iOS (PNG; iOS does not accept SVG here).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a7a43",
      }}
    >
      <svg width="140" height="140" viewBox="0 0 40 40">
        <path d="M12 11v10.5a8 8 0 0 0 16 0V11" fill="none" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" />
        <circle cx="29.5" cy="29.5" r="4" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
      </svg>
    </div>,
    size,
  );
}
