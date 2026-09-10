import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ServiceBlock } from "@/components/sections/ServiceBlock";
import { WebOffer } from "@/components/sections/WebOffer";
import { FinalCta } from "@/components/sections/FinalCta";
import { services, servicesPage } from "@/content/services";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  const [featured, ...others] = services;

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          ...services.map((service) =>
            serviceSchema({
              name: service.nav,
              description: service.promise,
              path: `/services/${service.slug}`,
              ...(service.slug === "creation-site-web"
                ? {
                    offer: {
                      price: site.pricing.website.amount,
                      currency: site.pricing.website.currency,
                      description: `Site web de 3 à 6 pages livré en ${site.pricing.websiteDeliveryDays} jours ouvrables`,
                    },
                  }
                : {}),
            }),
          ),
        ]}
      />

      <div className="relative isolate overflow-hidden">
        <div className="backdrop-halo opacity-60" aria-hidden="true" />
        <Container className="relative z-10 pt-12 pb-4">
          <Breadcrumbs
            trail={[
              { name: "Accueil", path: "/" },
              { name: "Services", path: "/services" },
            ]}
          />
          <h1 className="max-w-3xl text-display-2 text-bone">{servicesPage.h1}</h1>
          <p className="mt-6 max-w-2xl text-lead text-mist">{servicesPage.intro}</p>
        </Container>
      </div>

      <Section className="pt-10">
        <div className="space-y-16 lg:space-y-20">
          <ServiceBlock service={featured} featured />
          {others.map((service) => (
            <ServiceBlock key={service.slug} service={service} />
          ))}
        </div>

        <p className="mt-16 max-w-2xl border-t border-line pt-8 text-small text-mute">
          {servicesPage.pricingNote}
        </p>
      </Section>

      <WebOffer />
      <FinalCta />
    </>
  );
}
