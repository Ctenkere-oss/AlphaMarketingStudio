import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Contact — Alpha Marketing Studio";

export default function Image() {
  return ogImage({
    kicker: "Contact",
    title: "Demandez votre audit gratuit",
  });
}
