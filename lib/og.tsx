import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const fontDir = path.join(process.cwd(), "lib", "og-fonts");
const display = fs.readFileSync(path.join(fontDir, "space-grotesk-700.ttf"));
const body = fs.readFileSync(path.join(fontDir, "manrope-500.ttf"));

/**
 * Image Open Graph commune à toutes les pages.
 * Reprend les jetons du site — fond, dégradé, marque — pour qu'un
 * partage sur LinkedIn ou dans une conversation ait la même identité
 * que le site lui-même. Les valeurs sont écrites en dur ici parce que
 * Satori ne lit pas les variables CSS.
 */
export function ogImage({
  title,
  kicker,
  footer = "alphamarketingstudio.com",
}: {
  title: string;
  kicker?: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07070b",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            left: -160,
            width: 900,
            height: 700,
            background:
              "radial-gradient(circle at 40% 40%, rgba(99,102,241,0.55), rgba(7,7,11,0) 65%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -220,
            width: 820,
            height: 640,
            background:
              "radial-gradient(circle at 55% 45%, rgba(168,85,247,0.42), rgba(7,7,11,0) 66%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="52" height="52" viewBox="0 0 40 40">
            <defs>
              <linearGradient id="m" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>
            <circle cx="20" cy="20" r="18.25" fill="none" stroke="url(#m)" strokeWidth="1.75" />
            <rect x="12" y="21" width="4" height="8" rx="2" fill="url(#m)" />
            <rect x="18" y="15.5" width="4" height="13.5" rx="2" fill="url(#m)" />
            <rect x="24" y="11" width="4" height="18" rx="2" fill="url(#m)" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontFamily: "Display", fontSize: 26, color: "#e9e9f2" }}>
              Alpha Marketing Studio
            </span>
            <span style={{ fontFamily: "Body", fontSize: 18, color: "#8a8aa0" }}>
              Acquisition numérique — Montréal
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 980 }}>
          {kicker ? (
            <span style={{ fontFamily: "Body", fontSize: 24, color: "#93a4ff", marginBottom: 16 }}>
              {kicker}
            </span>
          ) : null}
          <span
            style={{
              fontFamily: "Display",
              fontSize: title.length > 78 ? 56 : 68,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#e9e9f2",
            }}
          >
            {title}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 96,
              height: 3,
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
              display: "flex",
            }}
          />
          <span style={{ fontFamily: "Body", fontSize: 22, color: "#b9b9cc" }}>{footer}</span>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Display", data: display, weight: 700, style: "normal" },
        { name: "Body", data: body, weight: 500, style: "normal" },
      ],
    },
  );
}
