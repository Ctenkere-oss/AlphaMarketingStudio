import { site } from "./site";

export const hero = {
  h1: "Des clients qui vous trouvent avant de trouver votre concurrent.",
  lead:
    "Publicités Meta, contenu Instagram et TikTok, sites web et SEO local pour les PME du Grand Montréal. Un seul interlocuteur, et c'est celui qui exécute.",
  ctaPrimary: { href: "/contact", label: "Obtenir mon audit gratuit" },
  ctaSecondary: { href: "/services", label: "Voir les services" },
  guideLink: { href: "#guide", label: "Ou commencez par le guide gratuit" },
  assurances: [
    "Réponse sous 48 h",
    "Sans engagement",
    "Rapport mensuel transparent",
  ],
  /** Légende de la grille de créas. Aucun chiffre : rien n'est inventé. */
  creasCaption:
    "Des créas réelles, publiées pour de vrais clients. La plupart sont retirées en moins d'une semaine. Celles qui restent paient tout le reste.",
  winnerLabel: "Celle qui reste",
} as const;

export const credibility = {
  title: "Ce que je gère en ce moment",
  client: {
    name: "Ayram Barry Avocat",
    detail: "Cabinet montréalais — droit de l'immigration et droit des affaires",
    role: "Instagram et TikTok, de la ligne éditoriale au tournage",
  },
  sectorsLabel: "Secteurs pour lesquels je travaille",
  sectors: [
    "Cabinets d'avocats",
    "Cliniques et santé",
    "Comptables",
    "Restaurants",
    "Commerces de détail",
    "Entreprises de services",
  ],
} as const;

export const problem = {
  title: "Trois phrases que j'entends chaque semaine",
  intro:
    "Ce ne sont pas des problèmes de marketing. Ce sont des problèmes d'argent qui sort sans revenir.",
  items: [
    {
      quote: "J'ai mis 800 $ sur Facebook le mois passé. Je n'ai rien vu passer.",
      diagnosis:
        "Un compte publicitaire monté à la va-vite dépense la totalité de son budget à trouver des gens qui aiment vos photos. Personne ne lui a jamais dit qu'il devait trouver des acheteurs. La différence tient à la structure du compte et à ce qu'on lui demande d'optimiser.",
    },
    {
      quote: "Le monde clique, mais personne ne m'appelle.",
      diagnosis:
        "Le trafic n'est presque jamais le problème. La page d'arrivée, elle, demande souvent au visiteur de faire un effort : chercher le numéro, deviner le prix, remplir onze champs. Chaque friction retirée est une soumission de plus.",
    },
    {
      quote: "Quand on cherche mon service à Montréal, c'est mon concurrent qui sort.",
      diagnosis:
        "La recherche locale se joue sur trois choses : une fiche d'entreprise complète et vivante, des pages qui répondent à la question exacte que les gens tapent, et un site assez rapide pour être servi en premier. Aucune des trois ne demande de budget publicitaire.",
    },
  ],
} as const;

export const method = {
  title: "Comment ça se passe, concrètement",
  intro:
    "Quatre étapes. La première est gratuite et vous repartez avec le document même si on ne travaille pas ensemble.",
  steps: [
    {
      name: "Audit",
      duration: "Semaine 1",
      body:
        "Je regarde ce qui existe déjà : compte publicitaire, site, fiche Google, réseaux sociaux. Vous recevez un document qui nomme ce qui coûte de l'argent pour rien et ce qui est récupérable. C'est gratuit, et il est à vous.",
    },
    {
      name: "Stratégie",
      duration: "Semaine 1 à 2",
      body:
        "On choisit un objectif mesurable et un seul : appels, soumissions, réservations, ventes. J'en déduis le budget minimum viable, les audiences à tester et les angles de créas. Vous approuvez avant qu'un dollar soit dépensé.",
    },
    {
      name: "Exécution",
      duration: "En continu",
      body:
        "Montage du compte, production des créas, mise en ligne, puis test après test. Les publicités qui ne performent pas sont coupées vite. Celles qui fonctionnent reçoivent le budget des autres.",
    },
    {
      name: "Rapport",
      duration: "Chaque mois",
      body:
        "Un rapport en français, lisible en cinq minutes : ce qui a été dépensé, ce que ça a rapporté, ce que je change le mois prochain et pourquoi. Vos comptes vous appartiennent, vous voyez les mêmes chiffres que moi en tout temps.",
    },
  ],
} as const;

export const caseStudy = {
  eyebrow: "Étude de cas",
  client: "Ayram Barry Avocat",
  title: "Un cabinet d'avocats qui publie comme un média",
  context:
    "Cabinet montréalais en droit de l'immigration et en droit des affaires. Une clientèle qui cherche des réponses avant de chercher un avocat, et qui pose ses questions sur Instagram et TikTok bien avant de décrocher le téléphone.",
  work: [
    "Ligne éditoriale bâtie sur les questions réellement posées en consultation : parrainage, permis de travail, refus, délais.",
    "Calendrier de publication récurrent sur Instagram et TikTok, tenu sans interruption.",
    "Tournage et montage des vidéos courtes : cadrage, éclairage, sous-titres, accroche dans les deux premières secondes.",
    "Format signature reconnaissable — décor, habillage graphique et typographie constants d'une vidéo à l'autre.",
    "Reprise des meilleures publications organiques en publicités, plutôt que de produire des créas à part.",
  ],
  outcomeIntro:
    "Les résultats chiffrés de ce mandat appartiennent au client. Ils seront affichés ici une fois qu'il aura donné son accord et que j'aurai extrait les données exactes des comptes.",
  results: [
    {
      label: "Croissance de l'audience",
      note: "[[CHIFFRE À CONFIRMER : abonnés gagnés sur la période, Instagram et TikTok]]",
    },
    {
      label: "Portée des publications",
      note: "[[CHIFFRE À CONFIRMER : comptes atteints par mois, moyenne sur 3 mois]]",
    },
    {
      label: "Demandes de consultation",
      note: "[[CHIFFRE À CONFIRMER : demandes attribuées aux réseaux sociaux]]",
    },
  ],
  images: [
    { src: "/images/creas/crea-4.webp", alt: "Vidéo courte produite pour Ayram Barry Avocat, habillage de marque du cabinet" },
    { src: "/images/creas/crea-7.webp", alt: "Publication soulignant un an de collaboration avec Ayram Barry Avocat" },
  ],
} as const;

export const aboutShort = {
  title: `Vous parlez à ${site.founder.firstName}. Toujours.`,
  body: [
    "Alpha Marketing Studio, c'est une personne. Celle qui monte votre compte publicitaire est celle qui écrit vos créas, qui répond à vos courriels et qui vous explique votre rapport mensuel.",
    "Pas de gestionnaire de compte qui relaie vos questions à quelqu'un d'autre. Pas de junior à qui on refile votre budget parce que vous êtes un petit client.",
  ],
  cta: { href: "/a-propos", label: "Lire la suite" },
} as const;

export const guide = {
  title: "Les 7 erreurs qui font brûler un budget Meta Ads",
  subtitle: "Et comment les corriger cette semaine.",
  body:
    "Un guide court, écrit à partir des comptes publicitaires que j'ouvre chaque mois. Les mêmes sept erreurs reviennent presque toujours, et six d'entre elles se corrigent en moins d'une heure sans budget supplémentaire.",
  bullets: [
    "Pourquoi votre objectif de campagne travaille probablement contre vous",
    "Le nombre d'ensembles de publicités à ne pas dépasser sous 1 000 $ par mois",
    "Ce qu'il faut regarder à la place du coût par clic",
  ],
  cta: "Recevoir le guide",
} as const;

export const finalCta = {
  title: "L'audit est gratuit et vous le gardez",
  body:
    "Envoyez-moi l'adresse de votre site et le nom de votre entreprise. Je regarde votre compte publicitaire, votre fiche Google et vos réseaux, puis je vous renvoie ce que je trouve. Si vous décidez de tout faire vous-même avec ce document, il est à vous.",
  cta: { href: "/contact", label: "Demander mon audit" },
  secondary: { href: `mailto:${site.email}`, label: "Ou écrivez-moi directement" },
} as const;
