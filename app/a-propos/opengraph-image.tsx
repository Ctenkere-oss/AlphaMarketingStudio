import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${site.founder.name} — Alpha Marketing Studio`;

export default function Image() {
  return ogImage({ kicker: site.founder.name, title: about.h1 });
}
