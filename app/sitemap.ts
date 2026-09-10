import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/content/site";
import { services } from "@/content/services";
import { allArticles } from "@/lib/blog";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = ([
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/a-propos"), changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/blogue"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/politique-de-confidentialite"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/conditions-utilisation"), changeFrequency: "yearly", priority: 0.2 },
  ] as const).map((page) => ({ ...page, lastModified: now }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: absoluteUrl(`/services/${service.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = allArticles().map((article) => ({
    url: absoluteUrl(`/blogue/${article.slug}`),
    lastModified: new Date(article.updated ?? article.published),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  // `/merci` est volontairement absente : page de conversion, non indexée.
  return [...staticPages, ...servicePages, ...articlePages];
}
