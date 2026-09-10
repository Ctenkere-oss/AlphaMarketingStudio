/**
 * Options des menus déroulants.
 *
 * Volontairement séparées de `lib/validation.ts` : ce fichier ne dépend
 * de rien et part dans le paquet initial, tandis que les schémas Zod
 * sont chargés à la demande, au premier envoi du formulaire.
 */

export const budgetOptions = [
  { value: "", label: "Choisir une fourchette" },
  { value: "moins-500", label: "Moins de 500 $ par mois" },
  { value: "500-1000", label: "500 $ à 1 000 $ par mois" },
  { value: "1000-2500", label: "1 000 $ à 2 500 $ par mois" },
  { value: "2500-5000", label: "2 500 $ à 5 000 $ par mois" },
  { value: "plus-5000", label: "Plus de 5 000 $ par mois" },
  { value: "a-determiner", label: "Je ne sais pas encore" },
] as const;

export const serviceOptions = [
  { value: "", label: "Choisir un service" },
  { value: "publicite-meta", label: "Publicités Meta (Facebook et Instagram)" },
  { value: "creation-site-web", label: "Création de site web (500 $)" },
  { value: "gestion-reseaux-sociaux", label: "Gestion des réseaux sociaux" },
  { value: "seo-local", label: "SEO local" },
  { value: "audit", label: "Un audit gratuit, pour commencer" },
  { value: "autre", label: "Autre chose" },
] as const;
