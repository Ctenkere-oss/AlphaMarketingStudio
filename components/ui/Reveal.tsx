"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Un seul IntersectionObserver pour tout le document, monté une fois
 * dans le layout. Les sections se contentent de porter `data-reveal`.
 * Aucune bibliothèque d'animation : le gain ne justifierait pas le poids.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Signale au script en ligne que la révélation est prise en charge :
    // son minuteur de secours n'a plus à démasquer le contenu.
    document.documentElement.classList.add("reveal-ready");

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          window.setTimeout(() => el.setAttribute("data-shown", "true"), delay);
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    for (const el of targets) {
      // Déjà visible au chargement : on affiche sans attendre le défilement.
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
        el.setAttribute("data-shown", "true");
      } else {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
