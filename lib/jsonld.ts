import { absoluteUrl, site, socialLinks } from "@/content/site";

const ORG_ID = `${site.url}/#organization`;
const PERSON_ID = `${site.url}/#fondateur`;

/**
 * `Organization` et `LocalBusiness` fusionnés en une seule entité :
 * un studio d'une personne n'a pas deux identités. Le `@id` stable
 * permet aux autres blocs d'y faire référence sans se répéter.
 */
export function organizationSchema() {
  return {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    email: site.email,
    ...(site.phone ? { telephone: site.phone } : {}),
    description:
      "Studio d'acquisition numérique à Montréal spécialisé en publicités Meta pour PME. Gestion de contenu social, création de sites web et SEO local en appui.",
    founder: { "@id": PERSON_ID },
    knowsLanguage: site.languages,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    areaServed: site.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.url) } : {}),
  };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.founder.name,
    jobTitle: site.founder.title,
    worksFor: { "@id": ORG_ID },
    url: absoluteUrl("/a-propos"),
    ...(socialLinks.length ? { sameAs: socialLinks.map((s) => s.url) } : {}),
  };
}

export function serviceSchema(input: {
  name: string;
  description: string;
  path: string;
  offer?: { price: number; currency: string; description?: string };
}) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(input.path)}/#service`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: { "@id": ORG_ID },
    areaServed: site.areaServed.map((name) => ({ "@type": "City", name })),
    ...(input.offer
      ? {
          offers: {
            "@type": "Offer",
            price: input.offer.price,
            priceCurrency: input.offer.currency,
            ...(input.offer.description ? { description: input.offer.description } : {}),
            availability: "https://schema.org/InStock",
          },
        }
      : {}),
  };
}

export function faqSchema(items: { question: string; plainAnswer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.plainAnswer },
    })),
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((step, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  published: string;
  updated?: string;
  image?: string;
}) {
  return {
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.published,
    dateModified: input.updated ?? input.published,
    inLanguage: "fr-CA",
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORG_ID },
    image: input.image ? absoluteUrl(input.image) : `${absoluteUrl(input.path)}/opengraph-image`,
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "fr-CA",
    publisher: { "@id": ORG_ID },
  };
}
