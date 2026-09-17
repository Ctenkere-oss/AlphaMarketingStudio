import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { mainService, servicesPage, supportServices } from "@/content/services";
import { site } from "@/content/site";

/**
 * Services.
 *
 * Deux paliers, deux traitements : le produit occupe un panneau plein
 * cadre au rayon maximal, les services en appui trois cartes plus
 * petites. La hiérarchie visuelle vient du champ `tier` du contenu.
 *
 * §2.4 : rayons de 24 à 40 px, chaque panneau posé sur une couleur
 * existante de la palette. Pas de survol ici — c'est la Phase 4.
 */

const structure = [
  { level: 0, label: "Campagne", detail: "un objectif d'affaires, budget géré ici" },
  { level: 1, label: "Audience large", detail: "l'algorithme cherche" },
  { level: 1, label: "Reciblage", detail: "visiteurs et vues de vidéo" },
  { level: 2, label: "8 à 12 créas par mois", detail: "on garde celles qui tiennent" },
];

const meta: Record<string, string> = {
  "gestion-reseaux-sociaux": "Instagram et TikTok",
  "creation-site-web": `${site.pricing.website.label} forfaitaire, livré en ${site.pricing.websiteDeliveryDays} jours`,
  "seo-local": "Montréal, Laval et la Rive-Nord",
};

export function ServicesSection() {
  return (
    <Container as="section" id="services" className="py-section">
      <SectionHeading
        title={servicesPage.h1}
        intro="Un seul de ces services est ce que je vends. Les trois autres existent parce qu'ils le rendent moins cher — et ils sont présentés comme tels."
      />

      <p className="mt-shelf flex items-center gap-3 text-small text-mute">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {servicesPage.mainLabel}
      </p>

      {/* Produit principal : panneau plein cadre, rayon maximal. */}
      <article
        data-reveal
        className="mt-6 overflow-hidden rounded-frame border border-line bg-ink-raised"
      >
        <span aria-hidden="true" className="block h-px w-full bg-accent" />
        <div className="grid-12 gap-y-shelf p-8 sm:p-12 lg:p-16">
          <div className="col-span-12 lg:col-span-6">
            <div className="flex flex-wrap items-center gap-4">
              <h3 className="font-display text-display-2 text-bone">{mainService.nav}</h3>
              <span className="rounded-pill border border-indigo/45 bg-indigo/12 px-3 py-1.5 text-micro font-semibold text-link">
                Produit principal
              </span>
            </div>
            <p className="mt-8 max-w-read text-lead text-mist">{mainService.promise}</p>

            <h4 className="mt-shelf text-small font-semibold text-bone">Ce que je livre</h4>
            <ul className="mt-5 space-y-3">
              {mainService.deliverables.map((item) => (
                <li key={item} className="relative max-w-read pl-6 text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.65em] left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={`/services/${mainService.slug}`}
              className="mt-shelf inline-flex min-h-11 items-center text-title font-semibold text-link
                         underline decoration-link/40 underline-offset-8"
            >
              Comment je monte un compte publicitaire
            </Link>
          </div>

          {/* Artefact du travail, pas une illustration. */}
          <div className="col-span-12 rounded-card border border-line bg-ink-panel/70 p-6 lg:col-span-5 lg:col-start-8">
            <p className="text-micro text-mute">La structure que je monte</p>
            <ul className="mt-5 space-y-2.5">
              {structure.map((node) => (
                <li
                  key={node.label}
                  style={{ marginLeft: `${node.level * 18}px` }}
                  className="relative overflow-hidden rounded-[14px] border border-line bg-ink-raised px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 bg-accent"
                    style={{ opacity: 1 - node.level * 0.28 }}
                  />
                  <span className="block text-small font-semibold text-bone">{node.label}</span>
                  <span className="block text-micro text-mute">{node.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-micro text-mute">
              Simple par choix : sous 1 000 $ par mois, chaque ensemble de publicités
              supplémentaire retarde la sortie de la phase d&apos;apprentissage.
            </p>
          </div>
        </div>
      </article>

      <p className="mt-shelf flex items-center gap-3 text-small text-mute">
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {servicesPage.supportLabel}
      </p>
      <p className="mt-4 max-w-read text-mist">{servicesPage.supportIntro}</p>

      {/* Services en appui : trois cartes, décalées verticalement. */}
      <ul className="mt-shelf grid-12 gap-y-gap">
        {supportServices.map((service, i) => (
          <li
            key={service.slug}
            data-reveal
            className={`col-span-12 md:col-span-6 lg:col-span-4 ${i === 1 ? "lg:translate-y-10" : ""}`}
          >
            <Link
              href={`/services/${service.slug}`}
              className="group flex h-full flex-col justify-between rounded-card border border-line
                         bg-ink-raised p-8"
            >
              <div>
                <h3 className="font-display text-display-3 text-bone">{service.nav}</h3>
                <p className="mt-5 text-mist">{service.promise}</p>
              </div>
              <p className="mt-shelf border-t border-line pt-5 text-micro text-mute">
                {meta[service.slug]}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
