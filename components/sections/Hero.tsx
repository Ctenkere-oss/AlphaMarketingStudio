import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";

/**
 * Tableau de test de créas.
 *
 * L'ouverture ne décrit pas le métier, elle le montre : six angles en
 * test, cinq retirés, un seul qui reste et récupère le budget des
 * autres. C'est le fonctionnement réel d'un compte publicitaire, et
 * c'est la SEULE séquence animée du site.
 *
 * Entièrement typographique — aucune image, donc aucune requête et
 * aucun décalage de mise en page. Les cartes nomment des TYPES D'ANGLE,
 * pas des publicités inventées : le bloc décrit une méthode, il
 * n'affirme rien sur des résultats.
 *
 * La séquence est en CSS pur : elle démarre avec la page plutôt qu'après
 * l'hydratation, et coûte zéro octet de bibliothèque. Le texte du héros,
 * lui, ne s'anime pas — une accroche en fondu fait attendre le lecteur
 * pour rien et retarde le plus grand élément affiché.
 */

const DEAL_STEP = 95;
const FADE_AT = 1450;
const WIN_AT = 1550;

function TestBoard() {
  return (
    <figure className="relative">
      <figcaption className="mb-4 flex items-center gap-3 text-micro text-mute">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        {hero.creasTitle}
      </figcaption>

      <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
        {hero.creas.map((crea, i) => {
          const winner = crea.state === "Active";
          const dealDelay = i * DEAL_STEP;
          const animation = winner
            ? `crea-deal 720ms var(--ease-out-soft) ${dealDelay}ms both,` +
              ` crea-win 700ms var(--ease-out-soft) ${WIN_AT}ms forwards`
            : `crea-deal 720ms var(--ease-out-soft) ${dealDelay}ms both,` +
              ` crea-settle 800ms ease-out ${FADE_AT}ms forwards`;

          return (
            <li
              key={crea.angle}
              style={{ animation }}
              className={[
                "flex aspect-4/5 flex-col justify-between rounded-[11px] border p-3.5",
                // La colonne du milieu remonte : la grille cesse d'être un tableau.
                i % 3 === 1 ? "lg:-translate-y-7" : "",
                winner
                  ? "border-indigo/70 bg-ink-panel ring-1 ring-indigo/35 shadow-[0_16px_40px_-16px] shadow-violet/50"
                  : "border-line bg-ink-raised",
              ].join(" ")}
            >
              <span className="text-micro text-mute">{crea.format}</span>

              <span
                className={[
                  "font-display text-[0.95rem] leading-[1.2] font-bold tracking-tight",
                  // `mute` tient 5,9:1 sur le fond : les angles écartés
                  // restent lisibles, ils ne sont pas décoratifs.
                  winner ? "text-bone" : "text-mute",
                ].join(" ")}
              >
                {crea.angle}
              </span>

              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className={[
                    "size-1.5 rounded-full",
                    winner ? "bg-accent" : "bg-line-strong",
                  ].join(" ")}
                />
                <span
                  className={[
                    "text-micro",
                    winner ? "font-semibold text-link" : "text-mute",
                  ].join(" ")}
                >
                  {crea.state}
                </span>
              </span>

              {winner ? (
                <span
                  style={{ animation: `badge-in 500ms var(--ease-out-soft) ${WIN_AT + 200}ms both` }}
                  className="text-micro leading-tight text-mute"
                >
                  {hero.winnerNote}
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="mt-5 max-w-md text-small text-mute">{hero.creasCaption}</p>
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
            <ButtonLink href={hero.ctaSecondary.href} size="lg" variant="secondary">
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
              <li key={item} className="px-0 py-3 text-small text-mist sm:px-4 sm:first:pl-0">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <TestBoard />
      </Container>
    </section>
  );
}
