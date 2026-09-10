import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { mainService, servicesPage, supportServices } from "@/content/services";
import { site } from "@/content/site";

/**
 * La hiérarchie visuelle suit la hiérarchie commerciale.
 *
 * La publicité Meta occupe un panneau plein cadre avec sa structure de
 * compte dessinée dedans ; les trois autres services sont des rangées
 * séparées par un filet. Quatre cartes identiques auraient dit au
 * visiteur que les quatre services se valent — ce qui est faux.
 */

const accountStructure = [
  { level: 0, label: "Campagne", detail: "un objectif d'affaires, budget géré ici" },
  { level: 1, label: "Audience large", detail: "l'algorithme cherche" },
  { level: 1, label: "Reciblage", detail: "visiteurs et vues de vidéo" },
  { level: 2, label: "8 à 12 créas par mois", detail: "on garde celles qui tiennent" },
];

const rowMeta: Record<string, string> = {
  "gestion-reseaux-sociaux": "Instagram et TikTok",
  "creation-site-web": `${site.pricing.website.label} forfaitaire, livré en ${site.pricing.websiteDeliveryDays} jours`,
  "seo-local": "Montréal, Laval et la Rive-Nord",
};

export function ServicesSection() {
  return (
    <Section id="services" tone="sunken">
      <SectionHeading
        title={servicesPage.h1}
        intro="Un seul de ces services est ce que je vends. Les trois autres existent parce qu'ils le rendent moins cher — et ils sont présentés comme tels."
      />

      <p className="mt-12 flex items-center gap-3 text-small text-mute">
        <span aria-hidden="true" className="h-px w-8 bg-accent" />
        {servicesPage.mainLabel}
      </p>

      {/* ---- Service phare ---- */}
      <article
        data-reveal
        className="surface relative mt-4 overflow-hidden rounded-frame p-6 sm:p-9 lg:p-11"
      >
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-[clamp(1.6rem,1.25rem+1.4vw,2.2rem)] leading-tight font-bold tracking-tight text-bone">
                {mainService.nav}
              </h3>
              <span className="rounded-full border border-indigo/45 bg-indigo/12 px-2.5 py-1 text-micro font-semibold text-link">
                Produit principal
              </span>
            </div>

            <p className="mt-4 max-w-lg text-lead text-mist">{mainService.promise}</p>

            <h4 className="mt-9 text-small font-semibold text-bone">Ce que je livre</h4>
            <ul className="mt-3 space-y-2.5">
              {mainService.deliverables.map((item) => (
                <li key={item} className="relative pl-5 text-small text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={`/services/${mainService.slug}`}
              className="mt-6 inline-flex min-h-11 items-center text-small font-semibold text-link
                         underline decoration-link/40 underline-offset-4 transition-colors
                         hover:decoration-link"
            >
              Comment je monte un compte publicitaire
            </Link>
          </div>

          {/* Structure de compte : un artefact du travail, pas une illustration. */}
          <div className="rounded-card border border-line bg-ink-panel/70 p-5 sm:p-6">
            <p className="text-micro text-mute">La structure que je monte</p>
            <ul className="mt-4 space-y-2">
              {accountStructure.map((node) => (
                <li
                  key={node.label}
                  style={{ marginLeft: `${node.level * 14}px` }}
                  className="relative rounded-[9px] border border-line bg-ink-raised px-3.5 py-2.5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-0.5 rounded-l-[9px] bg-accent"
                    style={{ opacity: 1 - node.level * 0.28 }}
                  />
                  <span className="block text-small font-semibold text-bone">{node.label}</span>
                  <span className="block text-micro text-mute">{node.detail}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-micro text-mute">
              Simple par choix : sous 1 000 $ par mois, chaque ensemble de publicités
              supplémentaire retarde la sortie de la phase d&apos;apprentissage.
            </p>
          </div>
        </div>
      </article>

      <p className="mt-16 flex items-center gap-3 text-small text-mute">
        <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
        {servicesPage.supportLabel}
      </p>
      <p className="mt-3 max-w-2xl text-small text-mist">{servicesPage.supportIntro}</p>

      {/* ---- Les trois autres : des rangées, pas des cartes ----
           Seul le titre est un lien ; son pseudo-élément couvre la
           rangée entière. La zone cliquable reste grande, mais le nom
           accessible du lien est « Gestion des réseaux sociaux » et non
           le titre suivi de la promesse et du prix collés ensemble. */}
      <ul className="mt-7 border-t border-line">
        {supportServices.map((service, i) => (
          <li
            key={service.slug}
            data-reveal
            data-reveal-delay={i * 70}
            className="group relative grid gap-2 border-b border-line py-7 transition-colors
                       hover:bg-white/3 md:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_auto]
                       md:items-baseline md:gap-8 md:px-3"
          >
            <h3 className="font-display text-subtitle font-bold text-bone transition-colors group-hover:text-link">
              <Link
                href={`/services/${service.slug}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {service.nav}
              </Link>
            </h3>
            <p className="max-w-[58ch] text-small text-mist">{service.promise}</p>
            <span className="text-micro whitespace-nowrap text-mute">{rowMeta[service.slug]}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
