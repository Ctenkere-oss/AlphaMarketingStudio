import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Alpha Marketing Studio — acquisition numérique à Montréal";

export default function Image() {
  return ogImage({
    title: "Des clients qui vous trouvent avant de trouver votre concurrent.",
  });
}
