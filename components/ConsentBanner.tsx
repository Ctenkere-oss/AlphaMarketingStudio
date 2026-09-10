"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { readConsent, writeConsent, type ConsentValue } from "@/lib/consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Monté après l'hydratation : la bannière ne bloque pas le rendu
    // initial et ne provoque aucun décalage de mise en page mesuré (CLS),
    // puisqu'elle est en position fixe hors du flux.
    if (readConsent() !== null) return;
    // On laisse la séquence d'ouverture du héros se terminer avant
    // d'afficher la bannière : elle ne recouvre pas la première image
    // du site, et aucun témoin n'est déposé pendant ce délai.
    const timer = window.setTimeout(() => setVisible(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const choose = (value: ConsentValue) => {
    writeConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consentement-titre"
      className="fixed inset-x-3 bottom-3 z-90 rounded-frame border border-line-strong
                 bg-ink-raised/96 p-5 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.8)]
                 supports-[backdrop-filter]:backdrop-blur-[14px] sm:inset-x-auto sm:bottom-4
                 sm:left-4 sm:max-w-sm"
      style={{ animation: "badge-in 420ms var(--ease-out-soft) both" }}
    >
      <h2 id="consentement-titre" className="font-display text-body font-bold text-bone">
        Témoins de mesure
      </h2>
      <p className="mt-2 text-small text-mist">
        Je mesure quelles pages sont lues et lesquelles mènent à une demande de soumission. Rien
        n&apos;est déposé sans votre accord, et le site fonctionne pareil si vous refusez.{" "}
        <Link
          href="/politique-de-confidentialite"
          className="text-link underline underline-offset-4"
        >
          Détails
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
        <Button onClick={() => choose("accepte")} className="flex-1">
          Accepter
        </Button>
        <Button variant="secondary" onClick={() => choose("refuse")} className="flex-1">
          Refuser
        </Button>
      </div>
    </div>
  );
}
