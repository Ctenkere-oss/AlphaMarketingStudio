import type { Metadata } from "next";
import { absoluteUrl, site } from "@/content/site";

type Input = {
  title: string;
  description: string;
  path: string;
  /** Image Open Graph propre à la page. Par défaut : celle générée pour la route. */
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

/**
 * Fabrique les métadonnées d'une page.
 * `title` : 50–60 caractères, `description` : 140–160. Le script
 * `npm run check:seo` vérifie ces bornes sur tout le site.
 */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex,
}: Input): Metadata {
  const url = absoluteUrl(path);
  // Sans image explicite, on laisse la convention de fichier de Next
  // (`opengraph-image.tsx`) remplir `openGraph.images` et `twitter.images` :
  // chaque segment hérite de l'image du segment parent le plus proche.
  const images = image ? [{ url: image, width: 1200, height: 630, alt: title }] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        // La version anglaise n'existe pas encore : on déclare seulement
        // ce qui est en ligne, et la structure est prête à l'accueillir.
        "fr-CA": url,
      },
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      siteName: site.name,
      title,
      description,
      locale: "fr_CA",
      ...(images ? { images } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(images ? { images: images.map((i) => i.url) } : {}),
    },
  };
}
