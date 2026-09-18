import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/content/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

export const metadata: Metadata = buildMetadata({
  title: "Contact — demandez votre audit gratuit, Montréal QC",
  description:
    "Demandez votre audit gratuit. Publicités Meta, sites web à 500 $ et SEO local pour les PME du Grand Montréal. Réponse sous 48 h, sans engagement.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <div className="relative isolate overflow-hidden">
        <div className="backdrop-halo opacity-55" aria-hidden="true" />
        <Container className="relative z-10 pt-12 pb-6">
          <Breadcrumbs
            trail={[
              { name: "Accueil", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
          />
          <h1 className="max-w-2xl text-display-2 text-bone">Demandez votre audit gratuit</h1>
          <p className="mt-6 max-w-2xl text-lead text-mist">
            Décrivez votre entreprise en quelques lignes. Je regarde votre compte publicitaire,
            votre site et votre fiche Google, puis je vous renvoie ce que j&apos;y trouve. Vous
            gardez le document, que l&apos;on travaille ensemble ou non.
          </p>
          <p className="mt-3 max-w-2xl text-small text-mute">
            Une autre question, une demande de soumission, ou simplement envie de savoir si je peux
            aider ? Le même formulaire fait l&apos;affaire — il arrive directement dans ma boîte de
            réception.
          </p>
        </Container>
      </div>

      <Container className="grid gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-16 lg:py-16">
        <ContactForm />

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="mb-5 rounded-frame border border-line bg-ink-raised p-6">
            <h2 className="font-display text-subtitle font-bold text-bone">
              Vous préférez parler ?
            </h2>
            <p className="mt-2 text-small text-mist">
              Choisissez un créneau dans le calendrier et on regarde votre situation en direct.
            </p>
            <ButtonLink href="/reservation" className="mt-5 w-full">
              Réserver un appel
            </ButtonLink>
          </div>

          <div className="rounded-frame border border-line bg-ink-raised p-6">
            <h2 className="font-display text-subtitle font-bold text-bone">
              Ou sans passer par le formulaire
            </h2>

            <dl className="mt-5 space-y-4 text-small">
              <div>
                <dt className="text-micro text-mute">Courriel</dt>
                <dd className="mt-1">
                  <TextLink href={`mailto:${site.email}`} standalone>
                    {site.email}
                  </TextLink>
                </dd>
              </div>

              {site.phone ? (
                <div>
                  <dt className="text-micro text-mute">Téléphone</dt>
                  <dd className="mt-1">
                    <TextLink href={`tel:${site.phone.replace(/\s/g, "")}`} standalone>
                      {site.phone}
                    </TextLink>
                  </dd>
                </div>
              ) : null}

              <div>
                <dt className="text-micro text-mute">Où je suis</dt>
                <dd className="mt-1 text-mist">
                  {site.city}, {site.regionName}
                  <span className="mt-0.5 block text-micro text-mute">
                    Dessert {site.areaServed.slice(0, 3).join(", ")} et la Rive-Nord. Rencontres sur
                    place ou en visioconférence.
                  </span>
                </dd>
              </div>

              <div>
                <dt className="text-micro text-mute">Délai de réponse</dt>
                <dd className="mt-1 text-mist">
                  {site.responseTime} ouvrables
                  <span className="mt-0.5 block text-micro text-mute">{site.hours}</span>
                </dd>
              </div>

              <div>
                <dt className="text-micro text-mute">Langues</dt>
                <dd className="mt-1 text-mist">Français et anglais</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-line pt-5">
              <p className="text-micro text-mute">Sur les réseaux</p>
              <SocialLinks className="mt-3" />
            </div>
          </div>

          <p className="mt-5 text-micro text-mute">
            Vos coordonnées servent uniquement à répondre à cette demande. Elles ne sont ni vendues,
            ni utilisées pour vous inscrire à quoi que ce soit sans votre accord.{" "}
            <TextLink href="/politique-de-confidentialite" className="text-mute hover:text-mist">
              Politique de confidentialité
            </TextLink>
            .
          </p>
        </aside>
      </Container>
    </>
  );
}
