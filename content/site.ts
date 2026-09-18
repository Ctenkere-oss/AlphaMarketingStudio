/**
 * Configuration de l'entreprise.
 * Un seul endroit à modifier pour les coordonnées, les liens sociaux
 * et le domaine. Tout le site lit ce fichier.
 */

export const site = {
  name: "Alpha Marketing Studio",
  legalName: "Alpha Marketing Studio",
  tagline: "Studio d'acquisition numérique à Montréal",

  founder: {
    name: "Ibrahima Sory Barry",
    firstName: "Ibrahima",
    title: "Fondateur et stratège en acquisition payante",
    photo: "/images/fondateur.webp",
    photoAlt:
      "Ibrahima Sory Barry, fondateur d'Alpha Marketing Studio, en veston et col roulé",
    /** Faits vérifiables, repris dans le balisage Person. */
    foundedYear: 2024,
    school: "HEC Montréal",
    program: "Gestion marketing",
    certification: "Social Media Management et Marketing — Meta",
  },

  email: "alphamarketingstudio@outlook.com",
  /** Laisser vide pour ne pas afficher de téléphone sur le site. */
  phone: "" as string,

  /** Sans barre oblique finale. Sert aux URL canoniques et au sitemap. */
  url: "https://www.alphamarketingstudio.com",

  city: "Montréal",
  region: "QC",
  regionName: "Québec",
  country: "CA",
  areaServed: [
    "Montréal",
    "Laval",
    "Longueuil",
    "Terrebonne",
    "Repentigny",
    "Blainville",
    "Boisbriand",
  ],
  /** Coordonnées du centre-ville, utilisées pour le balisage LocalBusiness. */
  geo: { latitude: 45.5019, longitude: -73.5674 },

  /** Studio sans adresse publique : on affiche la région desservie. */
  address: {
    locality: "Montréal",
    region: "QC",
    country: "CA",
  },

  hours: "Du lundi au vendredi, de 9 h à 18 h (HE)",

  /** Réservation en ligne — Square Appointments. */
  booking: {
    /** Script d'intégration fourni par Square. Un seul endroit à changer. */
    scriptSrc:
      "https://square.site/appointments/buyer/widget/sa2qeqc11tmnqv/LTY36KK1T6QJV.js",
    /**
     * Page de réservation Square, en repli si l'intégration ne charge pas
     * (bloqueur de traceurs, script indisponible). Vide = le repli affiche
     * seulement le courriel. À récupérer dans Square : Rendez-vous →
     * Canaux en ligne → Site de réservation.
     */
    directUrl: "[[À COMPLÉTER : URL publique de votre page de réservation Square]]" as string,
  },
  responseTime: "48 h",

  /**
   * Réseaux sociaux. L'ordre ici est celui des icônes affichées.
   * Un lien dont l'`url` est vide n'apparaît nulle part sur le site.
   */
  social: {
    instagram: {
      label: "Instagram",
      handle: "@alphamarketingstudio",
      url: "https://www.instagram.com/alphamarketingstudio/",
    },
    facebook: {
      label: "Facebook",
      handle: "Alpha Marketing Studio",
      // URL canonique du profil. Les paramètres de suivi qui suivaient
      // l'identifiant ont été retirés : ils n'ajoutent rien et exposent
      // le chemin de navigation d'où le lien a été copié.
      url: "https://www.facebook.com/profile.php?id=61581637425216",
    },
    /** TikTok : mettre l'identifiant exact. Le lien reste masqué tant qu'il est vide. */
    tiktok: {
      label: "TikTok",
      handle: "[[À COMPLÉTER : identifiant TikTok]]",
      url: "",
    },
    linkedin: {
      label: "LinkedIn",
      handle: "[[À COMPLÉTER : URL LinkedIn]]",
      url: "",
    },
  },

  /** Numéro d'entreprise du Québec. Vide = la mention n'apparaît pas. */
  neq: "" as string,
  languages: ["fr-CA", "en-CA"],

  /** Tarifs affichés publiquement. Modifier ici, jamais dans les composants. */
  pricing: {
    website: { amount: 500, currency: "CAD", label: "500 $" },
    maintenance: { amount: 75, currency: "CAD", label: "75 $" },
    websiteDeliveryDays: 5,
  },
} as const;

export type SocialLink = { label: string; handle: string; url: string };

/** Liens sociaux réellement affichables (ceux dont l'URL est remplie). */
export const socialLinks: SocialLink[] = Object.values(site.social)
  .map((s) => ({ label: s.label, handle: s.handle, url: s.url }))
  .filter((s) => s.url.length > 0);

export const absoluteUrl = (path = "/") =>
  `${site.url}${path.startsWith("/") ? path : `/${path}`}`.replace(/\/$/, "") || site.url;
