import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { allSlugs, getArticle } from "@/lib/blog";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Article — Alpha Marketing Studio";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  return ogImage({ kicker: "Blogue", title: article?.title ?? "Blogue" });
}
