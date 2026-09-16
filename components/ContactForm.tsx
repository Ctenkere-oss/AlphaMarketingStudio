"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckboxField, Honeypot, TextArea, TextField } from "@/components/ui/Field";
import { Turnstile } from "@/components/Turnstile";

type Status = "idle" | "sending" | "error";

/**
 * Formulaire de contact volontairement court : nom, courriel, téléphone,
 * message. Chaque champ retiré est une demande de plus qui arrive —
 * un formulaire qui demande un budget avant de dire bonjour fait fuir
 * exactement les gens qu'on veut rencontrer.
 */
export function ContactForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string>("");
  const [token, setToken] = useState<string>("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      nom: String(data.get("nom") ?? ""),
      courriel: String(data.get("courriel") ?? ""),
      telephone: String(data.get("telephone") ?? ""),
      message: String(data.get("message") ?? ""),
      infolettre: data.get("infolettre") === "on",
      site_web_secondaire: String(data.get("site_web_secondaire") ?? ""),
      turnstileToken: token,
    };

    // Validation côté client : le même schéma que le serveur, mais
    // chargé seulement maintenant. Zod pèse une cinquantaine de kilo-
    // octets ; le sortir du paquet initial fait gagner autant sur le
    // premier rendu de la page, où personne n'a encore rien à valider.
    const { contactSchema, fieldErrors } = await import("@/lib/validation");
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const errorsByField = fieldErrors(parsed.error);
      setErrors(errorsByField);
      setFormError("");
      setStatus("idle");
      const firstKey = Object.keys(errorsByField)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as {
        ok: boolean;
        message: string;
        errors?: Record<string, string>;
      };

      if (!response.ok || !body.ok) {
        setStatus("error");
        if (body.errors) setErrors(body.errors);
        setFormError(body.message);
        return;
      }

      // Redirection vers /merci : c'est ce qui rend la conversion
      // mesurable côté GA4 et Pixel Meta.
      router.push("/merci");
    } catch {
      setStatus("error");
      setFormError(
        "La connexion au serveur a échoué. Vérifiez votre réseau et réessayez, ou écrivez-moi directement à l'adresse affichée à côté du formulaire.",
      );
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-6">
      <Honeypot />

      <TextField
        label="Nom complet"
        name="nom"
        required
        autoComplete="name"
        error={errors.nom}
        placeholder="Marie Tremblay"
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          label="Courriel"
          name="courriel"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          error={errors.courriel}
          placeholder="vous@entreprise.com"
        />
        <TextField
          label="Téléphone"
          name="telephone"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          error={errors.telephone}
          placeholder="514 555 0199"
        />
      </div>

      <TextArea
        label="Votre demande"
        name="message"
        required
        rows={7}
        error={errors.message}
        placeholder="Ce que vous vendez, à qui, et ce que vous cherchez à régler. Quelques lignes suffisent."
        hint="Ajoutez l'adresse de votre site si vous en avez un : je le regarde avant de répondre."
      />

      <CheckboxField
        label="Envoyez-moi aussi l'infolettre : deux courriels par mois sur ce qui fonctionne en publicité Meta."
        name="infolettre"
        hint="Case volontairement non cochée. Vous recevrez un courriel de confirmation, et le désabonnement est en un clic."
      />

      <Turnstile onToken={setToken} />

      {formError ? (
        <p
          role="alert"
          className="rounded-card border border-danger/35 bg-danger/8 px-4 py-3.5 text-small text-bone"
        >
          {formError}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status === "sending"}>
          {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande"}
        </Button>
        <p aria-live="polite" className="text-micro text-mute">
          {status === "sending" ? "Un instant, je transmets votre message." : "Réponse sous 48 h."}
        </p>
      </div>
    </form>
  );
}
