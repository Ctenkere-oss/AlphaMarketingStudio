/**
 * Réglages du mouvement, en un seul endroit.
 *
 * Toutes les durées sont en secondes (unité de GSAP). Les valeurs
 * suivent les fourchettes du §2.5 du brief de refonte.
 */
export const motion = {
  /** Défilement inertiel. `lerp` bas = plus glissant. */
  lenis: { lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.6 },

  /** Révélation d'un bloc : décalage vertical puis opacité. */
  reveal: { y: 28, duration: 0.9, ease: "power3.out" },

  /** Révélation ligne à ligne d'un titre. 40 à 60 ms de décalage. */
  lines: { duration: 1, stagger: 0.05, ease: "power4.out" },

  /** Média : ouverture par découpe plutôt que par opacité. */
  media: { duration: 1.1, ease: "power3.out" },

  /** Parallaxe. Le §2.5 borne le déplacement à ±8 % de la hauteur. */
  parallax: { amount: 0.07 },

  /** Curseur : lissage du suivi. */
  cursor: { lerp: 0.14 },

  /** Voile de transition entre pages. */
  transition: { duration: 0.38 },
} as const;

/** Vrai quand la personne a demandé à réduire les animations. */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Vrai sur un pointeur fin — souris ou pavé tactile, pas un doigt. */
export function hasFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine)").matches;
}
