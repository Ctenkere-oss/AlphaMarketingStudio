import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, serviceSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { services, servicesBySlug } from "@/content/services";
import { site } from "@/content/site";
import { slugify } from "@/lib/slug";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  if (!service) return {};
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceChildPage({ params }: Props) {
  const { slug } = await params;
  const service = servicesBySlug[slug];
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        graph={[
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
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
            { name: service.nav, path: `/services/${service.slug}` },
          ]),
        ]}
      />

      <div className="relative isolate overflow-hidden">
        <div className="backdrop-halo opacity-55" aria-hidden="true" />
        <Container className="relative z-10 pt-12 pb-6">
          <Breadcrumbs
            trail={[
              { name: "Accueil", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.nav, path: `/services/${service.slug}` },
            ]}
          />
          <h1 className="max-w-3xl text-display-2 text-bone">{service.h1}</h1>
          <p className="mt-6 max-w-2xl text-lead text-mist">{service.promise}</p>
        </Container>
      </div>

      <Container className="grid gap-14 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16 lg:py-20">
        <div>
          <div className="prose-ams max-w-read">
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {service.sections.map((section) => (
              <section key={section.heading}>
                <h2 id={slugify(section.heading)}>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item.text}>
                        {item.term ? <strong>{item.term} — </strong> : null}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-frame border border-line bg-ink-raised p-6 sm:p-8">
            <p className="max-w-xl text-lead text-bone">{service.closing}</p>
            <ButtonLink href="/reservation" size="lg" className="mt-6">
              Prendre un rendez-vous
            </ButtonLink>
          </div>
        </div>

        {/* Colonne d'appui : ce que couvre le mandat, en un coup d'œil. */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-card border border-line bg-ink-raised p-5">
            <h2 className="text-small font-semibold text-bone">Livrables</h2>
            <ul className="mt-3.5 space-y-2.5">
              {service.deliverables.map((item) => (
                <li key={item} className="relative pl-4 text-micro text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.55em] left-0 size-1 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-line pt-4 text-micro text-mute">
              <span className="block text-bone">Prix</span>
              {service.price}
            </p>
          </div>

          <nav aria-label="Autres services" className="mt-6">
            <h2 className="text-small font-semibold text-bone">Autres services</h2>
            <ul className="mt-1">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/services/${other.slug}`}
                    className="flex min-h-11 items-center text-small text-mist
                               transition-colors hover:text-bone"
                  >
                    {other.nav}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </Container>
    </>
  );
}
