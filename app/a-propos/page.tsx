import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Marked } from "@/components/ui/Marked";
import { about } from "@/content/about";
import { site, socialLinks } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: about.metaTitle,
  description: about.metaDescription,
  path: "/a-propos",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "À propos", path: "/a-propos" },
          ]),
        ]}
      />

      <div className="relative isolate overflow-hidden">
        <div className="backdrop-halo opacity-60" aria-hidden="true" />
        <div className="backdrop-grid" aria-hidden="true" />

        <Container className="relative z-10 pt-12 pb-16 lg:pb-20">
          <Breadcrumbs
            trail={[
              { name: "Accueil", path: "/" },
              { name: "À propos", path: "/a-propos" },
            ]}
          />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
            <div>
              <h1 className="max-w-2xl text-display-2 text-bone">{about.h1}</h1>
              <p className="mt-6 max-w-xl text-lead text-mist">{about.lead}</p>
              <p className="mt-8 font-display text-subtitle text-bone">{site.founder.name}</p>
              <p className="text-small text-mute">{site.founder.title}</p>

              {socialLinks.length ? (
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                  {socialLinks.map((social) => (
                    <li key={social.label}>
                      <TextLink href={social.url} standalone className="text-small">
                        {social.label} {social.handle}
                      </TextLink>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            {/* Emplacement du portrait, tenu par une carte d'identité
                typographique tant qu'aucune photo n'est fournie. */}
            <div className="relative overflow-hidden rounded-frame border border-line bg-ink-raised p-8 lg:p-10">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />
              <p className="text-gradient font-display text-[clamp(2rem,1.5rem+2vw,2.75rem)] leading-[1.05] font-bold tracking-tight">
                {site.founder.name}
              </p>
              <p className="mt-3 text-lead text-mist">{site.founder.title}</p>
              <dl className="mt-8 space-y-3 border-t border-line pt-6 text-small">
                <div className="flex justify-between gap-4">
                  <dt className="text-mute">Basé à</dt>
                  <dd className="text-bone">
                    {site.city}, {site.regionName}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-mute">Langues</dt>
                  <dd className="text-bone">Français et anglais</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-mute">Réponse</dt>
                  <dd className="text-bone">Sous {site.responseTime} ouvrables</dd>
                </div>
              </dl>
            </div>
          </div>
        </Container>
      </div>

      <Section className="pt-4">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
          <div className="prose-ams max-w-read">
            <h2>{about.story.heading}</h2>
            {about.story.paragraphs.map((paragraph) => (
              <p key={paragraph}><Marked text={paragraph} /></p>
            ))}

            <h2>{about.difference.heading}</h2>
            {about.difference.paragraphs.map((paragraph) => (
              <p key={paragraph}><Marked text={paragraph} /></p>
            ))}
          </div>

          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <dl className="divide-y divide-line rounded-card border border-line bg-ink-raised">
              {about.facts.map((fact) => (
                <div key={fact.label} className="px-5 py-4">
                  <dt className="text-micro text-mute">{fact.label}</dt>
                  <dd className="mt-1 text-small text-bone">
                    <Marked text={fact.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <div className="mt-16 border-t border-line pt-12">
          <h2 className="text-title text-bone">{about.principles.heading}</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-frame border border-line bg-line sm:grid-cols-2">
            {about.principles.items.map((item) => (
              <li key={item.title} data-reveal className="bg-ink-raised p-6 lg:p-8">
                <h3 className="font-display text-subtitle font-bold text-bone">{item.title}</h3>
                <p className="mt-3 text-small text-mist">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 max-w-2xl border-t border-line pt-12">
          <h2 className="text-title text-bone">{about.cta.heading}</h2>
          <p className="mt-4 text-lead text-mist">{about.cta.body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" size="lg">
              Obtenir mon audit gratuit
            </ButtonLink>
            <ButtonLink href={`mailto:${site.email}`} size="lg" variant="secondary">
              M&apos;écrire directement
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
