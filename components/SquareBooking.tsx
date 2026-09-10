"use client";

import { useEffect, useRef, useState } from "react";
import { Button, TextLink } from "@/components/ui/Button";
import { site } from "@/content/site";

type State = "repos" | "chargement" | "pret" | "echec";

/**
 * Intégration du calendrier Square Appointments.
 *
 * Le script n'est chargé qu'après un clic explicite du visiteur.
 * Deux raisons :
 *
 * 1. Loi 25 — c'est un script tiers qui dépose ses propres témoins.
 *    Le reste du site n'en charge aucun avant consentement ; ce
 *    calendrier ne fait pas exception. Le clic EST le consentement, et
 *    il porte sur ce service précis, demandé par la personne elle-même.
 * 2. Performance — un script tiers dans le chemin critique coûte le
 *    LCP de la page. Ici il ne coûte rien tant qu'on ne le demande pas.
 *
 * Le script est inséré DANS le conteneur : les intégrations Square se
 * placent à l'endroit de leur propre balise via `document.currentScript`,
 * qui est bien renseigné pour un script créé avec `createElement`.
 */
export function SquareBooking() {
  const [state, setState] = useState<State>("repos");
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state !== "chargement" || !container.current) return;
    const cible = container.current;

    // Certaines intégrations tierces écrivent encore avec `document.write`.
    // Appelé après le chargement de la page, il effacerait tout le
    // document. On le détourne vers le conteneur le temps du chargement.
    const ecrireOrigine = document.write;
    const ecrireLnOrigine = document.writeln;
    const rediriger = (...morceaux: string[]) => {
      cible.insertAdjacentHTML("beforeend", morceaux.join(""));
    };
    document.write = rediriger as typeof document.write;
    document.writeln = rediriger as typeof document.writeln;

    const restaurer = () => {
      document.write = ecrireOrigine;
      document.writeln = ecrireLnOrigine;
    };

    const script = document.createElement("script");
    script.src = site.booking.scriptSrc;
    script.async = true;
    script.onload = () => {
      restaurer();
      setState("pret");
    };
    script.onerror = () => {
      restaurer();
      setState("echec");
    };
    cible.appendChild(script);

    // Filet de sécurité : script chargé mais rien d'affiché (bloqueur de
    // traceurs, changement d'API côté Square). On propose le repli.
    const verification = window.setTimeout(() => {
      const rendu = cible.querySelector("iframe, [class*='square'], [id*='square']");
      if (!rendu) setState("echec");
    }, 8000);

    return () => {
      window.clearTimeout(verification);
      restaurer();
    };
  }, [state]);

  const urlDirecte = site.booking.directUrl.startsWith("http")
    ? site.booking.directUrl
    : "";

  return (
    <div className="surface rounded-frame p-6 sm:p-8">
      {state === "repos" ? (
        <div className="max-w-md">
          <h2 className="font-display text-subtitle font-bold text-bone">
            Choisir un moment
          </h2>
          <p className="mt-3 text-small text-mist">
            Le calendrier est fourni par Square. L&apos;afficher charge un service externe qui
            dépose ses propres témoins — c&apos;est pourquoi il ne se charge pas tout seul.
          </p>
          <Button size="lg" className="mt-6" onClick={() => setState("chargement")}>
            Afficher le calendrier
          </Button>
          <p className="mt-4 text-micro text-mute">
            Vous préférez éviter ? Écrivez-moi à{" "}
            <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink> et je vous propose deux
            ou trois créneaux.
          </p>
        </div>
      ) : null}

      {state === "chargement" ? (
        <p role="status" className="text-small text-mist">
          Chargement du calendrier…
        </p>
      ) : null}

      {state === "echec" ? (
        <div className="max-w-md">
          <h2 className="font-display text-subtitle font-bold text-bone">
            Le calendrier ne s&apos;affiche pas
          </h2>
          <p className="mt-3 text-small text-mist">
            Un bloqueur de publicités empêche souvent ce type de service de se charger. Deux
            solutions, aussi rapides l&apos;une que l&apos;autre :
          </p>
          <ul className="mt-4 space-y-2.5 text-small text-mist">
            {urlDirecte ? (
              <li className="relative pl-5">
                <span
                  aria-hidden="true"
                  className="absolute top-[0.62em] left-0 size-1.5 rounded-full bg-accent"
                />
                Ouvrir la page de réservation directement :{" "}
                <TextLink href={urlDirecte}>réserver sur Square</TextLink>
              </li>
            ) : null}
            <li className="relative pl-5">
              <span
                aria-hidden="true"
                className="absolute top-[0.62em] left-0 size-1.5 rounded-full bg-accent"
              />
              M&apos;écrire à <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink> — je
              réponds sous {site.responseTime} avec deux ou trois créneaux.
            </li>
          </ul>
        </div>
      ) : null}

      {/* Le script s'insère ici, jamais ailleurs. */}
      <div ref={container} className={state === "pret" ? "min-h-[520px]" : ""} />
    </div>
  );
}
