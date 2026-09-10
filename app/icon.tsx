import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Favicon généré à partir de la marque, sans fichier .ico à maintenir. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07070b",
          borderRadius: 7,
        }}
      >
        <svg width="26" height="26" viewBox="0 0 40 40">
          <defs>
            <linearGradient id="i" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
          </defs>
          <rect x="10" y="21" width="5" height="9" rx="2.5" fill="url(#i)" />
          <rect x="17.5" y="14" width="5" height="16" rx="2.5" fill="url(#i)" />
          <rect x="25" y="8" width="5" height="22" rx="2.5" fill="url(#i)" />
        </svg>
      </div>
    ),
    size,
  );
}
