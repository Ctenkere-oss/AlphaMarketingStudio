import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Page de remerciement et routes d'API : aucun intérêt en recherche.
        disallow: ["/merci", "/api/"],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
