import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { services, servicesBySlug } from "@/content/services";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Service — Alpha Marketing Studio";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  return ogImage({
    kicker: "Services",
    title: service?.h1 ?? "Services",
  });
}
