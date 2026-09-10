import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { servicesPage } from "@/content/services";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Services d'Alpha Marketing Studio";

export default function Image() {
  return ogImage({ kicker: "Services", title: servicesPage.h1 });
}
