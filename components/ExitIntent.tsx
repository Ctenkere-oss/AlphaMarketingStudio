"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { guide } from "@/content/home";

const SEEN_KEY = "ams-sortie-vue";

/**
 * Encart d'intention de sortie — sur les pages de blogue uniquement,
 * jamais sur l'accueil, et jamais à l'arrivée sur le site.
 *
 * Conditions cumulées avant de s'afficher : le pointeur quitte la
 * fenêtre par le haut, le lecteur a parcouru au moins 45 % de la page,
 * il est resté plus de 20 secondes, et l'encart ne lui a pas déjà été
 * montré. Sur écran tactile, il n'y a pas d'intention de sortie
 * détectable : on n'affiche rien du tout.
 */
export function ExitIntent({ source }: { source: string }) {
  const [open, setOpen] = useState(false);
  const armed = useRef(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }

    const armTimer = window.setTimeout(() => {
      armed.current = true;
    }, 20_000);

    const scrolledEnough = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      return max <= 0 || window.scrollY / max > 0.45;
    };

    const onLeave = (event: MouseEvent) => {
      if (!armed.current || event.clientY > 0 || !scrolledEnough()) return;
      try {
        window.sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* stockage indisponible : on affiche quand même, une fois */
      }
      setOpen(true);
    };

    document.addEventListener("mouseout", onLeave);
    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sortie-titre"
      className="fixed inset-0 z-100 grid place-items-center bg-ink/80 p-4
                 supports-[backdrop-filter]:backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        style={{ animation: "badge-in 380ms var(--ease-out-soft) both" }}
        className="relative w-full max-w-lg rounded-frame border border-line-strong bg-ink-raised p-7 sm:p-9"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 grid size-11 place-items-center rounded-control
                     text-mist transition-colors hover:bg-white/6 hover:text-bone"
        >
          <span className="sr-only">Fermer</span>
          <X size={18} aria-hidden="true" />
        </button>

        <h2 id="sortie-titre" className="max-w-sm font-display text-title font-bold text-bone">
          {guide.title}
        </h2>
        <p className="mt-3 text-small text-mist">
          {guide.subtitle} Le guide part par courriel dès que vous confirmez votre inscription.
        </p>
        <NewsletterForm source={source} cta={guide.cta} layout="stack" className="mt-6" />
      </div>
    </div>
  );
}
