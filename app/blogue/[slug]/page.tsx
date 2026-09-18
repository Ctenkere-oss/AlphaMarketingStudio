import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { articleSchema, breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ExitIntent } from "@/components/ExitIntent";
import { allArticles, allSlugs, formatDate, getArticle } from "@/lib/blog";
import { site } from "@/content/site";

export function generateStaticParams() {
  return allSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle,
    description: article.description,
    path: `/blogue/${article.slug}`,
    type: "article",
    publishedTime: article.published,
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const others = allArticles().filter((a) => a.slug !== article.slug);

  return (
    <>
      <JsonLd
        graph={[
          articleSchema({
            title: article.title,
            description: article.description,
            path: `/blogue/${article.slug}`,
            published: article.published,
            updated: article.updated,
          }),
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Blogue", path: "/blogue" },
            { name: article.title, path: `/blogue/${article.slug}` },
          ]),
        ]}
      />

      <div className="relative isolate overflow-hidden">
        <div className="backdrop-halo opacity-45" aria-hidden="true" />
        <Container className="relative z-10 pt-12 pb-8">
          <Breadcrumbs
            trail={[
              { name: "Accueil", path: "/" },
              { name: "Blogue", path: "/blogue" },
              { name: article.title, path: `/blogue/${article.slug}` },
            ]}
          />

          <article>
            <h1 className="max-w-4xl text-display-2 text-bone">{article.title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-mist">{article.lead}</p>
            <p className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1 text-micro text-mute">
              <span>{site.founder.name}</span>
              <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
              <time dateTime={article.published}>{formatDate(article.published)}</time>
              <span aria-hidden="true" className="h-3 w-px bg-line-strong" />
              <span>{article.readingMinutes} min de lecture</span>
            </p>
          </article>
        </Container>
      </div>

      <Container className="grid gap-14 pb-16 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <div>
          {/* Le HTML provient de nos propres fichiers Markdown dans
              content/blogue/, jamais d'une saisie utilisateur. */}
          <div
            className="prose-ams max-w-read"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />

          <div className="surface mt-14 max-w-read rounded-frame p-6 sm:p-8">
            <h2 className="font-display text-subtitle font-bold text-bone">
              Ce genre d&apos;analyse, deux fois par mois
            </h2>
            <p className="mt-2 text-small text-mist">
              Vous recevez d&apos;abord le guide sur les sept erreurs qui font brûler un budget
              Meta Ads, puis l&apos;infolettre. Désabonnement en un clic.
            </p>
            <NewsletterForm source={`blogue:${article.slug}`} cta="Recevoir le guide" className="mt-5" />
          </div>

          <div className="mt-10 max-w-read rounded-frame border border-line bg-ink-raised p-6 sm:p-8">
            <p className="text-lead text-bone">
              Vous voulez que je regarde vos chiffres réels plutôt qu&apos;un exemple ?
            </p>
            <p className="mt-2 text-small text-mist">
              L&apos;audit est gratuit et le document vous appartient, même si on ne travaille pas
              ensemble ensuite.
            </p>
            <ButtonLink href="/reservation" size="lg" className="mt-5">
              Prendre un rendez-vous
            </ButtonLink>
          </div>
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          {article.headings.length > 1 ? (
            <nav aria-label="Sommaire de l'article">
              <h2 className="text-small font-semibold text-bone">Dans cet article</h2>
              <ol className="mt-2 border-l border-line pl-4">
                {article.headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="flex min-h-11 items-center text-micro text-mist
                                 transition-colors hover:text-bone"
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          {others.length ? (
            <nav aria-label="Autres articles" className="mt-8 border-t border-line pt-6">
              <h2 className="text-small font-semibold text-bone">À lire ensuite</h2>
              <ul className="mt-2 space-y-1">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/blogue/${other.slug}`}
                      className="flex min-h-11 items-center text-micro text-mist
                                 transition-colors hover:text-bone"
                    >
                      {other.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </aside>
      </Container>

      {/* Intention de sortie : sur les articles seulement, jamais sur l'accueil. */}
      <ExitIntent source={`blogue-sortie:${article.slug}`} />
    </>
  );
}
