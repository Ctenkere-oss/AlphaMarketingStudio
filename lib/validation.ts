import { z } from "zod";
import { budgetOptions, serviceOptions } from "./form-options";

export { budgetOptions, serviceOptions };

/**
 * Schémas partagés par le navigateur et le serveur.
 * Le client valide pour éviter un aller-retour inutile ; le serveur
 * valide parce que c'est le seul endroit où la validation compte.
 */

const nonEmptyValues = (options: readonly { value: string }[]) =>
  options.map((o) => o.value).filter((v) => v !== "");

const budgetValues = nonEmptyValues(budgetOptions);
const serviceValues = nonEmptyValues(serviceOptions);

export const contactSchema = z.object({
  nom: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom, même juste le prénom.")
    .max(80, "Ce nom dépasse 80 caractères."),
  courriel: z
    .string()
    .trim()
    .min(1, "J'ai besoin d'une adresse courriel pour vous répondre.")
    .email("Cette adresse ne semble pas valide. Vérifiez le @ et le point.")
    .max(160)
    .transform((value) => value.toLowerCase()),
  entreprise: z.string().trim().max(120).optional().or(z.literal("")),
  // Validé par `refine` plutôt que par `z.enum` : sur une valeur
  // inattendue, `z.enum` renvoie son message anglais par défaut, qui
  // finirait par s'afficher sous le champ.
  budget: z
    .string()
    .refine((v) => budgetValues.includes(v), "Choisissez une fourchette, même approximative."),
  service: z
    .string()
    .refine((v) => serviceValues.includes(v), "Dites-moi ce qui vous intéresse."),
  message: z
    .string()
    .trim()
    .min(10, "Quelques mots de plus m'aideraient à préparer ma réponse.")
    .max(4000, "Ce message dépasse 4 000 caractères."),
  infolettre: z.boolean().default(false),
  /**
   * Pot-de-miel : rempli seulement par un robot.
   *
   * Le champ est accepté par le schéma, volontairement. S'il était
   * rejeté ici, le robot recevrait une erreur de validation nommant le
   * champ à laisser vide — c'est-à-dire le mode d'emploi du piège. La
   * route vérifie sa valeur après coup et répond « merci » sans rien
   * envoyer.
   */
  site_web_secondaire: z.string().max(500).optional().default(""),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const subscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Entrez votre adresse courriel.")
    .email("Cette adresse ne semble pas valide.")
    .max(160)
    .transform((value) => value.toLowerCase()),
  source: z.string().trim().max(60).default("inconnu"),
  /** Pot-de-miel — accepté par le schéma, vérifié par la route. */
  site_web_secondaire: z.string().max(500).optional().default(""),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;

/** Messages d'erreur par champ, prêts à passer aux composants de formulaire. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
