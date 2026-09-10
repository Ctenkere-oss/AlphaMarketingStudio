import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { allArticles, formatDate } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blogue — marketing numérique pour PME du Grand Montréal",
  description:
    "Ce que je vois passer dans les comptes publicitaires et les sites que je gère : budgets, coûts réels, erreurs fréquentes. Écrit pour les propriétaires de PME.",
  path: "/blogue",
});

export default function BlogIndexPage() {
  const articles = allArticles();

  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Blogue", path: "/blogue" },
          ]),
        ]}
      />

      <div className="relative isolate overflow-hidden">
        <div className="backdrop-halo opacity-55" aria-hidden="true" />
        <Container className="relative z-10 pt-12 pb-8">
          <Breadcrumbs
            trail={[
              { name: "Accueil", path: "/" },
              { name: "Blogue", path: "/blogue" },
            ]}
          />
          <h1 className="max-w-3xl text-display-2 text-bone">
            Ce que je vois passer dans les comptes que j&apos;ouvre
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-mist">
            Des textes longs, écrits pour des propriétaires d&apos;entreprise, pas pour des
            marketeux. Chiffres expliqués, calculs refaisables, et aucune conclusion que je ne
            donnerais pas au téléphone.
          </p>
        </Container>
      </div>

      <Section className="pt-6">
        {articles.length === 0 ? (
          <p className="text-mist">Le premier article arrive bientôt.</p>
        ) : (
          <ul className="border-t border-line">
            {articles.map((article, i) => (
              <li
                key={article.slug}
                data-reveal
                data-reveal-delay={i * 70}
                className="group relative grid gap-4 border-b border-line py-9 transition-colors
                           hover:bg-white/3 lg:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]
                           lg:gap-10 lg:px-3"
              >
                  <div className="text-micro text-mute">
                    <time dateTime={article.published}>{formatDate(article.published)}</time>
                    <span className="mt-1 block">{article.readingMinutes} min de lecture</span>
                  </div>

                  <div>
                    {/* Lien étendu : le nom accessible reste le titre seul. */}
                    <h2 className="max-w-[34ch] font-display text-[clamp(1.35rem,1.1rem+1vw,1.8rem)] leading-[1.18] font-bold tracking-tight text-bone transition-colors group-hover:text-link">
                      <Link
                        href={`/blogue/${article.slug}`}
                        className="after:absolute after:inset-0 after:content-['']"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-[64ch] text-mist">{article.lead}</p>
                    {article.tags.length ? (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-line px-2.5 py-1 text-micro text-mute"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
              </li>
            ))}
          </ul>
        )}

        <div className="surface mt-14 max-w-2xl rounded-frame p-6 sm:p-8">
          <h2 className="font-display text-subtitle font-bold text-bone">
            Recevoir les prochains articles
          </h2>
          <p className="mt-2 text-small text-mist">
            Deux courriels par mois. Le nouvel article, et une observation tirée des comptes que je
            gère. Désabonnement en un clic.
          </p>
          <NewsletterForm source="blogue-index" cta="Je m'inscris" className="mt-5" />
        </div>
      </Section>
    </>
  );
}
