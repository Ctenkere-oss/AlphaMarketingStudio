import Image from "next/image";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";

/**
 * Grille de test de créas.
 *
 * L'ouverture ne raconte pas ce que fait le studio, elle le montre :
 * des créas réelles se posent, la plupart s'éteignent, une seule reste.
 * C'est le métier en une image, et c'est le SEUL moment animé du site.
 *
 * Les six images viennent du compte Instagram du studio. La séquence est
 * en CSS pur, sans JavaScript : elle démarre avec la page, pas après
 * l'hydratation, et coûte zéro octet de bibliothèque.
 *
 * Le texte du héros, lui, ne s'anime pas. Une accroche qui apparaît en
 * fondu fait attendre le lecteur pour rien, et retarde le plus grand
 * élément affiché (LCP) d'autant. Le mouvement est réservé à la grille,
 * qui est le propos.
 */

type Tile = { src: string; alt: string; winner?: boolean };

const tiles: Tile[] = [
  {
    src: "/images/creas/crea-3.webp",
    alt: "Créa vidéo : présentation face caméra, chemise violette",
  },
  {
    src: "/images/creas/crea-4.webp",
    alt: "Créa vidéo produite pour un cabinet d'avocats montréalais, habillage de marque du client",
    winner: true,
  },
  {
    src: "/images/creas/crea-5.webp",
    alt: "Créa vidéo : format questions-réponses en intérieur",
  },
  {
    src: "/images/creas/crea-8.webp",
    alt: "Créa vidéo : présentation face caméra en veston",
  },
  {
    src: "/images/creas/crea-1.webp",
    alt: "Coulisses d'un tournage vertical avec anneau lumineux",
  },
  {
    src: "/images/creas/crea-2.webp",
    alt: "Créa vidéo tournée dans un logement en location courte durée",
  },
];

const DEAL_STEP = 95;
const FADE_AT = 1450;
const WIN_AT = 1550;

function CreaGrid() {
  return (
    <figure className="relative">
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {tiles.map((tile, i) => {
          const dealDelay = i * DEAL_STEP;
          const animation = tile.winner
            ? `crea-deal 720ms var(--ease-out-soft) ${dealDelay}ms both,` +
              ` crea-win 700ms var(--ease-out-soft) ${WIN_AT}ms forwards`
            : `crea-deal 720ms var(--ease-out-soft) ${dealDelay}ms both,` +
              ` crea-fade-out 800ms ease-out ${FADE_AT}ms forwards`;

          return (
            <div
              key={tile.src}
              style={{ animation }}
              className={[
                "relative overflow-hidden rounded-[11px] border",
                // La colonne du milieu remonte : la grille cesse d'être un tableau.
                i % 3 === 1 ? "lg:-translate-y-7" : "",
                tile.winner
                  ? "border-indigo/70 ring-1 ring-indigo/35 shadow-[0_16px_40px_-16px] shadow-violet/50"
                  : "border-line",
              ].join(" ")}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                width={462}
                height={616}
                priority={tile.winner}
                sizes="(min-width: 1024px) 165px, 30vw"
                className="h-full w-full object-cover"
              />
              {tile.winner ? (
                <span
                  style={{
                    animation: `badge-in 500ms var(--ease-out-soft) ${WIN_AT + 200}ms both`,
                  }}
                  className="absolute inset-x-1.5 bottom-1.5 rounded-md bg-ink/85 px-2 py-1
                             text-center text-[0.68rem] leading-tight font-semibold text-bone
                             supports-[backdrop-filter]:backdrop-blur-sm"
                >
                  {hero.winnerLabel}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <figcaption className="mt-5 max-w-sm text-small text-mute">
        {hero.creasCaption}
      </figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="backdrop-halo" aria-hidden="true" />
      <div className="backdrop-grid" aria-hidden="true" />

      <Container className="relative z-10 grid gap-12 pt-14 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16 lg:pt-20 lg:pb-24">
        <div>
          <h1 className="text-display-1 text-bone">{hero.h1}</h1>

          <p className="mt-6 max-w-xl text-lead text-mist">{hero.lead}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href={hero.ctaPrimary.href} size="lg">
              {hero.ctaPrimary.label}
            </ButtonLink>
            <ButtonLink
              href={hero.ctaSecondary.href}
              size="lg"
              variant="secondary"
            >
              {hero.ctaSecondary.label}
            </ButtonLink>
          </div>

          <p className="mt-4 text-small text-mute">
            <TextLink
              href={hero.guideLink.href}
              standalone
              className="text-mute hover:text-mist"
            >
              {hero.guideLink.label}
            </TextLink>
          </p>

          <ul
            className="mt-10 grid max-w-lg grid-cols-1 divide-y divide-line border-y border-line
                         sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          >
            {hero.assurances.map((item) => (
              <li
                key={item}
                className="px-0 py-3 text-small text-mist sm:px-4 sm:first:pl-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <CreaGrid />
      </Container>
    </section>
  );
}
