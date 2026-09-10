import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { booking } from "@/content/booking";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Réserver un appel — Alpha Marketing Studio";

export default function Image() {
  return ogImage({ kicker: "Réservation", title: booking.h1 });
}
