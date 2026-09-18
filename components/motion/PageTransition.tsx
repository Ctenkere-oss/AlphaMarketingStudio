"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, prefersReducedMotion } from "@/lib/motion";

/**
 * Voile de transition entre les pages (§2.8).
 *
 * Il balaie l'écran dans une couleur de la marque au changement de
 * route, puis se retire. Le défilement repart du haut.
 *
 * Le voile est piloté directement sur le nœud, sans état React : c'est
 * un effet purement visuel, rien dans l'arbre React n'en dépend. Le
 * faire passer par `useState` forcerait un rendu par navigation pour un
 * résultat identique.
 *
 * La navigation ne dépend jamais de ce composant : si quoi que ce soit
 * échoue ici, la page suivante est déjà rendue par le routeur. Le voile
 * ne fait que la couvrir un instant.
 */
export function PageTransition() {
  const pathname = usePathname();
  const premier = useRef(true);
  const voile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    window.scrollTo(0, 0);
    if (prefersReducedMotion()) return;

    const el = voile.current;
    if (!el) return;

    // Relancer l'animation quand deux navigations s'enchaînent : reposer
    // l'attribut ne suffit pas, il faut le retirer et forcer un reflow.
    el.removeAttribute("data-balaie");
    void el.offsetWidth;
    el.dataset.balaie = "true";

    const t = window.setTimeout(
      () => el.removeAttribute("data-balaie"),
      motion.transition.duration * 1000,
    );
    return () => window.clearTimeout(t);
  }, [pathname]);

  return <div ref={voile} aria-hidden="true" className="voile-transition" />;
}
