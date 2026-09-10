"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Honeypot } from "@/components/ui/Field";
import { TextLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type State = "idle" | "sending" | "done" | "error";

/**
 * `source` indique quel point de capture a converti : `hero`, `footer`,
 * `blogue:slug`. La valeur remonte jusqu'à Brevo en attribut de contact.
 */
export function NewsletterForm({
  source,
  cta = "Recevoir le guide",
  placeholder = "votre@courriel.com",
  className,
  layout = "row",
}: {
  source: string;
  cta?: string;
  placeholder?: string;
  className?: string;
  layout?: "row" | "stack";
}) {
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          source,
          site_web_secondaire: String(data.get("site_web_secondaire") ?? ""),
        }),
      });
      const body = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !body.ok) {
        setState("error");
        setMessage(body.message || "L'inscription n'a pas fonctionné. Réessayez dans un instant.");
        return;
      }
      setState("done");
      setMessage(body.message);
      form.reset();
    } catch {
      setState("error");
      setMessage(
        "La connexion a échoué. Vérifiez votre réseau, ou écrivez-moi directement — je vous envoie le guide à la main.",
      );
    }
  }

  if (state === "done") {
    return (
      <p
        role="status"
        className={cn(
          "rounded-card border border-ok/30 bg-ok/8 px-4 py-3.5 text-small text-bone",
          className,
        )}
      >
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("relative", className)}>
      <Honeypot />
      <div
        className={cn(
          "flex gap-2.5",
          layout === "row" ? "flex-col sm:flex-row" : "flex-col",
        )}
      >
        <label htmlFor={`courriel-${source}`} className="sr-only">
          Votre adresse courriel
        </label>
        <input
          id={`courriel-${source}`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          aria-invalid={state === "error" ? true : undefined}
          aria-describedby={state === "error" ? `erreur-${source}` : undefined}
          className="min-h-11 w-full rounded-control border border-line-strong bg-ink-panel px-3.5
                     text-body text-bone placeholder:text-mute/80 transition-colors
                     hover:border-white/22 focus:border-link focus:outline-none
                     aria-[invalid=true]:border-danger"
        />
        <Button type="submit" disabled={state === "sending"} className="shrink-0">
          {state === "sending" ? "Un instant…" : cta}
        </Button>
      </div>
      {state === "error" ? (
        <p id={`erreur-${source}`} role="alert" className="mt-2.5 text-micro text-danger">
          {message}
        </p>
      ) : null}
      <p className="mt-3 text-micro text-mute">
        Vous recevrez un courriel de confirmation avant toute inscription. Désabonnement en un clic.{" "}
        <TextLink href="/politique-de-confidentialite" className="text-mute hover:text-mist">
          Politique de confidentialité
        </TextLink>
        .
      </p>
    </form>
  );
}
