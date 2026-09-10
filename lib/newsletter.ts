/**
 * Couche d'abstraction de l'infolettre.
 *
 * Tout le site appelle `subscribe(email, source)` et rien d'autre.
 * Pour passer de Brevo à MailerLite, ConvertKit ou Mailchimp, il
 * suffit d'écrire un nouvel objet `NewsletterProvider` et de le
 * brancher dans `provider` en bas de ce fichier. Aucun composant,
 * aucune route à toucher. Voir README.md § Changer d'outil d'infolettre.
 */

export type SubscribeResult =
  | { status: "ok"; message: string }
  | { status: "deja-inscrit"; message: string }
  | { status: "erreur"; message: string };

export interface NewsletterProvider {
  readonly name: string;
  /** `true` quand les variables d'environnement nécessaires sont présentes. */
  isConfigured(): boolean;
  subscribe(email: string, source: string): Promise<SubscribeResult>;
}

const CONFIRMATION =
  "Presque terminé. Ouvrez le courriel de confirmation que je viens de vous envoyer — le guide part dès que vous aurez cliqué.";

const DEJA_INSCRIT =
  "Vous êtes déjà sur la liste. Le guide vous a été envoyé lors de votre inscription ; écrivez-moi si vous ne le trouvez plus.";

/**
 * Brevo. Double opt-in obligatoire : le contact reste inactif tant
 * que la personne n'a pas cliqué dans le courriel de confirmation,
 * ce qui constitue aussi la preuve de consentement exigée par la LCAP.
 */
const brevo: NewsletterProvider = {
  name: "brevo",

  isConfigured() {
    return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_LIST_ID);
  },

  async subscribe(email, source) {
    const apiKey = process.env.BREVO_API_KEY as string;
    const listId = Number(process.env.BREVO_LIST_ID);
    const templateId = Number(process.env.BREVO_DOI_TEMPLATE_ID ?? 0);
    const redirectionUrl = process.env.BREVO_DOI_REDIRECT_URL;

    // `doubleOptinConfirmation` exige un gabarit de confirmation et une
    // URL de redirection. Sans eux, on retombe sur la création simple
    // de contact — et le README explique comment finir la configuration.
    const useDoi = templateId > 0 && Boolean(redirectionUrl);

    const endpoint = useDoi
      ? "https://api.brevo.com/v3/contacts/doubleOptinConfirmation"
      : "https://api.brevo.com/v3/contacts";

    const payload = useDoi
      ? {
          email,
          includeListIds: [listId],
          templateId,
          redirectionUrl,
          attributes: { SOURCE: source, LANGUE: "fr" },
        }
      : {
          email,
          listIds: [listId],
          updateEnabled: true,
          attributes: { SOURCE: source, LANGUE: "fr" },
        };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok || response.status === 201 || response.status === 204) {
      return { status: "ok", message: CONFIRMATION };
    }

    const body = (await response.json().catch(() => ({}))) as { code?: string; message?: string };

    // Un contact déjà inscrit n'est pas une erreur pour la personne
    // en face : on lui répond quelque chose d'utile, pas un message rouge.
    if (body.code === "duplicate_parameter" || response.status === 400) {
      if ((body.message ?? "").toLowerCase().includes("already")) {
        return { status: "deja-inscrit", message: DEJA_INSCRIT };
      }
    }

    console.error("[infolettre] Brevo a refusé l'inscription", response.status, body);
    return {
      status: "erreur",
      message:
        "L'inscription n'a pas pu être enregistrée. Réessayez dans quelques minutes, ou écrivez-moi et je vous ajoute à la main.",
    };
  },
};

/** Utilisé en développement quand aucune clé n'est configurée. */
const journal: NewsletterProvider = {
  name: "journal",
  isConfigured() {
    return true;
  },
  async subscribe(email, source) {
    console.info(`[infolettre] (aucun fournisseur configuré) ${email} — source : ${source}`);
    return { status: "ok", message: CONFIRMATION };
  },
};

const provider: NewsletterProvider = brevo;

export async function subscribe(email: string, source: string): Promise<SubscribeResult> {
  const active = provider.isConfigured() ? provider : journal;
  try {
    return await active.subscribe(email, source);
  } catch (error) {
    console.error(`[infolettre] échec du fournisseur « ${active.name} »`, error);
    return {
      status: "erreur",
      message:
        "Le service d'infolettre ne répond pas. Réessayez dans quelques minutes, ou écrivez-moi directement.",
    };
  }
}
