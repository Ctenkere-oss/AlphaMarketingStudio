import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blogue — Alpha Marketing Studio";

export default function Image() {
  return ogImage({
    kicker: "Blogue",
    title: "Ce que je vois passer dans les comptes que j'ouvre",
  });
}
