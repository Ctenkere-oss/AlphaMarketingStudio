import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Marked } from "@/components/ui/Marked";
import { ButtonLink } from "@/components/ui/Button";
import { caseStudy } from "@/content/home";

/**
 * Étude de cas.
 *
 * Les deux vignettes sont des créas réellement publiées pour le client.
 * Elles sont affichées à environ 300 px de large : leur définition
 * native plafonne à 308 px, les agrandir davantage les ramollirait.
 * C'est la contrainte du matériau, pas un choix de composition.
 *
 * Aucun chiffre n'est affiché tant que le client ne les a pas validés.
 */
const visuels = [
  { src: "/images/creas/crea-4.webp", alt: "Créa vidéo produite pour le cabinet, habillage de marque du client" },
  { src: "/images/creas/crea-7.webp", alt: "Publication soulignant un an de collaboration avec le cabinet" },
];

export function CaseStudySection() {
  return (
    <section id="etude-de-cas" className="border-y border-line-faint bg-ink-sunken py-section">
      <Container>
        <div className="grid-12 gap-y-shelf">
          <div className="col-span-12 lg:col-span-5">
            <p className="flex items-center gap-3 text-small text-mute">
              <span aria-hidden="true" className="h-px w-8 bg-accent" />
              {caseStudy.eyebrow}
            </p>
            <h2 className="mt-6 text-display-2 text-bone">{caseStudy.title}</h2>
            <p className="mt-6 font-display text-display-3 text-link">{caseStudy.client}</p>
            <p className="mt-6 max-w-read text-mist">{caseStudy.context}</p>
            <p className="mt-6 max-w-read border-l-2 border-line-strong pl-5 text-small text-mute">
              {caseStudy.adsLink}
            </p>

            <div className="mt-shelf flex gap-gap">
              {visuels.map((v) => (
                <Image
                  key={v.src}
                  src={v.src}
                  alt={v.alt}
                  width={462}
                  height={616}
                  sizes="(min-width: 1024px) 300px, 45vw"
                  className="w-full max-w-[300px] rounded-card border border-line object-cover"
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <h3 className="text-small font-semibold text-bone">Ce qui a été fait</h3>
            <ul className="mt-6 space-y-5 border-t border-line pt-6">
              {caseStudy.work.map((item) => (
                <li key={item} className="relative max-w-read pl-6 text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.65em] left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="mt-shelf text-small font-semibold text-bone">Formats produits</h3>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {caseStudy.formats.map((f) => (
                <li key={f} className="py-3.5 text-small text-mist">
                  {f}
                </li>
              ))}
            </ul>

            <h3 className="mt-shelf text-small font-semibold text-bone">Résultats</h3>
            <p className="mt-4 max-w-read text-small text-mute">{caseStudy.outcomeIntro}</p>
            <dl className="mt-6 grid gap-gap sm:grid-cols-3">
              {caseStudy.results.map((r) => (
                <div key={r.label} className="rounded-card border border-line bg-ink-raised p-5">
                  <dt className="text-micro text-mute">{r.label}</dt>
                  <dd className="mt-3 text-small">
                    <Marked text={r.note} />
                  </dd>
                </div>
              ))}
            </dl>

            <ButtonLink href="/contact" variant="secondary" className="mt-shelf">
              Discuter d&apos;un mandat semblable
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
