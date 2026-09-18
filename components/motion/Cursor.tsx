"use client";

import { useEffect, useRef } from "react";
import { motion, hasFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Curseur personnalisé (§2.3).
 *
 * Un disque qui suit le pointeur avec du retard, animé uniquement par
 * `transform`. Il grossit sur les éléments interactifs et peut afficher
 * une courte étiquette — « Voir » ou « Glisser », les deux seuls mots
 * approuvés pour cet usage.
 *
 * Il ne s'active que sur pointeur fin. Sur écran tactile et sous
 * `prefers-reduced-motion`, la classe `curseur-perso` n'est jamais
 * posée : le disque reste `display: none` et le curseur natif n'est
 * jamais masqué.
 *
 * Le nœud est rendu d'emblée plutôt que conditionné par un état. C'est
 * la classe sur `<html>`, posée par l'effet, qui décide de l'afficher —
 * le disque est donc prêt dès la première image au lieu d'attendre un
 * second rendu, et le `ref` n'est jamais nul dans la boucle.
 */
export function Cursor() {
  const point = useRef<HTMLDivElement>(null);
  const etiquette = useRef<string>("");

  useEffect(() => {
    if (prefersReducedMotion() || !hasFinePointer()) return;
    document.documentElement.classList.add("curseur-perso");

    const cible = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...cible };
    let echelle = 1;
    let echelleCible = 1;
    let frame = 0;

    const bouger = (e: PointerEvent) => {
      cible.x = e.clientX;
      cible.y = e.clientY;
    };

    const survol = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.<HTMLElement>(
        "a[href], button, [data-cursor], input, textarea, select",
      );
      const saisie = el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      const mot = el?.dataset?.cursor ?? "";

      // Sur un champ de saisie, on rend la main au curseur natif.
      echelleCible = saisie ? 0 : el ? (mot ? 3.4 : 2.2) : 1;
      if (mot !== etiquette.current) {
        etiquette.current = mot;
        if (point.current) point.current.dataset.label = mot;
      }
    };

    const boucle = () => {
      pos.x += (cible.x - pos.x) * motion.cursor.lerp;
      pos.y += (cible.y - pos.y) * motion.cursor.lerp;
      echelle += (echelleCible - echelle) * 0.18;
      if (point.current) {
        point.current.style.transform =
          `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${echelle})`;
      }
      frame = requestAnimationFrame(boucle);
    };
    frame = requestAnimationFrame(boucle);

    window.addEventListener("pointermove", bouger, { passive: true });
    window.addEventListener("pointerover", survol, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", bouger);
      window.removeEventListener("pointerover", survol);
      document.documentElement.classList.remove("curseur-perso");
    };
  }, []);

  return <div ref={point} aria-hidden="true" className="curseur" />;
}
