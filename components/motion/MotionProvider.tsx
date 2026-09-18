"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type LenisType from "lenis";
import type SplitTypeType from "split-type";
import { motion, prefersReducedMotion } from "@/lib/motion";

/**
 * Moteur de mouvement du site.
 *
 * Un seul endroit initialise Lenis et enregistre ScrollTrigger, et un
 * seul endroit les détruit. Pas d'instance empilée au changement de
 * page, pas de déclencheur orphelin (§2.8, §3).
 *
 * ---- Pourquoi le chargement est différé ----
 *
 * GSAP, ScrollTrigger, Lenis et SplitType pèsent ensemble plus que tout
 * le reste du site réuni. Importés statiquement, ils entrent dans le
 * paquet initial et retardent le LCP — mesuré : la performance mobile
 * descendait à 93 sur les mauvaises passes, sous le seuil de 95.
 *
 * Or aucun d'eux n'est nécessaire avant le premier affichage. Ce qui
 * l'est, c'est de masquer les blocs à révéler — et c'est le script
 * synchrone du <head> qui s'en charge, en posant la classe
 * `mouvement-arme` (voir `app/layout.tsx`). Ce composant ne fait donc
 * que charger le moteur en arrière-plan et lui passer le relais.
 *
 * ---- Ce qui garantit que le contenu reste lisible ----
 *
 *   1. le moteur arrive  → il reprend le masquage en style inline, qui
 *      prime sur la règle CSS, puis retire la classe ;
 *   2. le moteur n'arrive pas (réseau coupé, import en échec, délai
 *      dépassé) → la classe est retirée et la page redevient lisible
 *      telle que le serveur l'a rendue ;
 *   3. le moteur arrive APRÈS le filet → il le constate et renonce aux
 *      révélations, plutôt que de remasquer du contenu déjà lu ;
 *   4. pas de JavaScript du tout → la classe n'a jamais été posée.
 *
 * Il n'existe pas de cinquième issue où le contenu resterait invisible.
 *
 * Sous `prefers-reduced-motion`, rien de tout cela ne démarre : ni
 * défilement inertiel, ni révélation, ni parallaxe, ni épinglage — et
 * rien n'est masqué, pas même provisoirement.
 */

/** Au-delà, on considère que le moteur ne viendra pas et on révèle tout. */
const delaiFilet = 2500;

export function MotionProvider() {
  const pathname = usePathname();
  const lenis = useRef<LenisType | null>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    // ---- 1. Le masquage est déjà en place -----------------------------
    // Il a été posé en CSS par le script synchrone du <head>, avant le
    // premier affichage. Ici on ne fait que le désarmer au bon moment.
    const desarmer = () =>
      document.documentElement.classList.remove("mouvement-arme");

    let annule = false;
    let demonter: (() => void) | null = null;
    // Double du minuteur posé dans le <head> : celui-ci couvre le cas où
    // le moteur met plus longtemps que prévu alors que React a déjà
    // hydraté la page.
    const filet = window.setTimeout(desarmer, delaiFilet);

    // ---- 2. Le moteur, chargé hors du chemin critique ----------------
    void (async () => {
      let mods;
      try {
        mods = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
          import("split-type"),
        ]);
      } catch {
        // Import en échec : le site reste entièrement utilisable, sans
        // mouvement — c'est la dégradation voulue. On découvre tout de
        // suite plutôt que d'attendre l'expiration du minuteur.
        window.clearTimeout(filet);
        desarmer();
        return;
      }

      const [{ gsap }, { ScrollTrigger }, { default: Lenis }, { default: SplitType }] = mods;
      window.clearTimeout(filet);
      if (annule) {
        desarmer();
        return;
      }

      // Le filet a-t-il déjà tranché ? Si oui, le contenu est visible
      // depuis un moment et le remasquer produirait exactement le
      // scintillement qu'on cherche à éviter. Dans ce cas le moteur
      // renonce aux révélations et ne garde que les effets qui ne
      // cachent rien : défilement inertiel, bande, parallaxe.
      const armee = document.documentElement.classList.contains("mouvement-arme");

      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        // ---- Défilement inertiel -----------------------------------
        const instance = new Lenis({
          lerp: motion.lenis.lerp,
          wheelMultiplier: motion.lenis.wheelMultiplier,
          touchMultiplier: motion.lenis.touchMultiplier,
        });
        lenis.current = instance;

        // Lenis pilote ScrollTrigger, et GSAP pilote Lenis : une seule
        // boucle d'animation pour les deux.
        instance.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // ---- Titres révélés ligne à ligne --------------------------
        const splits: SplitTypeType[] = [];
        for (const el of armee ? gsap.utils.toArray<HTMLElement>("[data-split]") : []) {
          const split = new SplitType(el, { types: "lines", lineClass: "ligne" });
          splits.push(split);
          // Chaque ligne est masquée par son parent : l'effet monte
          // depuis le bas plutôt que d'apparaître en fondu.
          for (const line of split.lines ?? []) {
            const wrap = document.createElement("span");
            wrap.className = "ligne-masque";
            line.parentNode?.insertBefore(wrap, line);
            wrap.appendChild(line);
          }
          // Les lignes sont désormais masquées par leurs conteneurs ;
          // le titre lui-même n'a plus besoin de l'être.
          gsap.set(split.lines, { yPercent: 110 });
          gsap.set(el, { opacity: 1 });
          gsap.to(split.lines, {
            yPercent: 0,
            duration: motion.lines.duration,
            stagger: motion.lines.stagger,
            ease: motion.lines.ease,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        }

        // ---- Blocs révélés au défilement ---------------------------
        for (const el of armee ? gsap.utils.toArray<HTMLElement>("[data-reveal]") : []) {
          // `gsap.set` réécrit l'opacité à la même valeur : la reprise
          // se fait sans que le bloc réapparaisse entre les deux.
          gsap.set(el, { opacity: 0, y: motion.reveal.y });
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: motion.reveal.duration,
            ease: motion.reveal.ease,
            delay: Number(el.dataset.revealDelay ?? 0) / 1000,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        }

        // ---- Médias : ouverture par découpe ------------------------
        for (const el of armee ? gsap.utils.toArray<HTMLElement>("[data-media]") : []) {
          // Ici le masquage passe de l'opacité à la découpe.
          gsap.set(el, { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08, opacity: 1 });
          gsap.to(el, {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            duration: motion.media.duration,
            ease: motion.media.ease,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        }

        // ---- Parallaxe légère --------------------------------------
        for (const el of gsap.utils.toArray<HTMLElement>("[data-parallax]")) {
          const amplitude = el.offsetHeight * motion.parallax.amount;
          gsap.fromTo(
            el,
            { y: -amplitude },
            {
              y: amplitude,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }

        // ---- Bande horizontale -------------------------------------
        const track = document.querySelector<HTMLElement>("[data-marquee-track]");
        if (track) {
          // La piste contient la liste en double : la translater d'une
          // demi-largeur boucle sans raccord visible.
          gsap.to(track, {
            xPercent: -50,
            duration: 32,
            ease: "none",
            repeat: -1,
          });
        }

        // ---- La seule section épinglée de la page ------------------
        const pinned = document.querySelector<HTMLElement>("[data-pin]");
        if (pinned && window.matchMedia("(min-width: 1024px)").matches) {
          const steps = gsap.utils.toArray<HTMLElement>("[data-pin-step]", pinned);
          if (steps.length > 1) {
            gsap.set(steps.slice(1), { opacity: 0.25 });
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: pinned,
                start: "top top",
                end: () => `+=${steps.length * 320}`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
              },
            });
            steps.forEach((step, i) => {
              if (i === 0) return;
              tl.to(steps[i - 1], { opacity: 0.25, duration: 0.4 }, i - 1).to(
                step,
                { opacity: 1, duration: 0.4 },
                i - 1,
              );
            });
          }
        }

        // GSAP a inscrit son propre masquage en style inline sur chaque
        // bloc concerné. La règle CSS n'a plus rien à tenir : on la
        // retire, sinon elle masquerait à jamais les blocs ajoutés plus
        // tard par une navigation cliente.
        desarmer();

        ScrollTrigger.refresh();

        return () => {
          gsap.ticker.remove(tick);
          instance.destroy();
          lenis.current = null;
          for (const split of splits) split.revert();
        };
      });

      demonter = () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    })();

    return () => {
      annule = true;
      window.clearTimeout(filet);
      desarmer();
      demonter?.();
    };
  }, [pathname]);

  return null;
}
