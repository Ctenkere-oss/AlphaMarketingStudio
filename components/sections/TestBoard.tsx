import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";

/**
 * Tableau de test de créas.
 *
 * Il occupait la colonne droite du héros ; la scène WebGL du §2.6 prend
 * cette place en Phase 5, donc il devient sa propre section — validé
 * avant d'être déplacé. Aucun mot ne change.
 *
 * Disposition en escalier : la deuxième colonne descend, la troisième
 * remonte. C'est l'asymétrie du §2.2, et ça évite la grille de cartes
 * identiques.
 */
export function TestBoard() {
  return (
    <Container as="section" className="py-section">
      <div className="grid-12">
        <div className="col-span-12 lg:col-span-3">
          <p className="flex items-center gap-3 text-small text-mute">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {hero.creasTitle}
          </p>
          <p className="mt-6 max-w-read text-lead text-mist">{hero.creasCaption}</p>
        </div>

        <ul className="col-span-12 mt-shelf grid grid-cols-2 gap-gap lg:col-span-8 lg:col-start-5 lg:mt-0 lg:grid-cols-3">
          {hero.creas.map((crea, i) => {
            const active = crea.state === "Active";
            return (
              <li
                key={crea.angle}
                className={[
                  "flex aspect-4/5 flex-col justify-between rounded-card border p-5",
                  // Escalier : une colonne sur trois descend, une remonte.
                  i % 3 === 1 ? "lg:translate-y-10" : "",
                  i % 3 === 2 ? "lg:-translate-y-6" : "",
                  active
                    ? "border-indigo/70 bg-ink-panel ring-1 ring-indigo/30"
                    : "border-line bg-ink-raised",
                ].join(" ")}
              >
                <span className="text-micro text-mute">{crea.format}</span>
                <span
                  className={[
                    "font-display text-title leading-tight tracking-tight",
                    active ? "text-bone" : "text-mute",
                  ].join(" ")}
                >
                  {crea.angle}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={["size-1.5 rounded-full", active ? "bg-accent" : "bg-line-strong"].join(" ")}
                  />
                  <span className={active ? "text-micro font-semibold text-link" : "text-micro text-mute"}>
                    {crea.state}
                  </span>
                </span>
                {active ? (
                  <span className="text-micro leading-tight text-mute">{hero.winnerNote}</span>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
}
