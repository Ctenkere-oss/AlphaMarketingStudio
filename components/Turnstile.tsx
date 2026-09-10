"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "auto" | "light" | "dark";
          language?: string;
        },
      ) => string;
      reset: (id?: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile. Sans clé publique configurée, le composant ne
 * rend rien du tout : le formulaire reste utilisable, protégé par le
 * pot-de-miel et la limitation de débit côté serveur.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  const render = useCallback(() => {
    if (!SITE_KEY || !container.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(container.current, {
      sitekey: SITE_KEY,
      callback: onToken,
      "expired-callback": () => onToken(""),
      "error-callback": () => onToken(""),
      theme: "dark",
      language: "fr",
    });
  }, [onToken]);

  useEffect(() => {
    if (ready) render();
  }, [ready, render]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="lazyOnload"
        onReady={() => setReady(true)}
      />
      <div ref={container} className="min-h-[65px]" />
    </>
  );
}

export const turnstileEnabled = Boolean(SITE_KEY);
