import { site } from "./site";

export const about = {
  metaTitle: "À propos — Ibrahima Sory Barry, fondateur du studio",
  metaDescription:
    "Ibrahima Sory Barry, fondateur d'Alpha Marketing Studio à Montréal. Pourquoi un studio d'une seule personne, et comment je travaille avec les PME.",
  h1: "Je monte vos campagnes moi-même",
  lead:
    "Alpha Marketing Studio est un studio d'une seule personne, à Montréal. Vous parlez à celui qui exécute, du premier appel jusqu'au rapport mensuel.",

  story: {
    heading: "Pourquoi ce studio existe",
    paragraphs: [
      "J'ai lancé Alpha Marketing Studio après avoir vu le même scénario se répéter : un propriétaire de PME qui dépense chaque mois en publicité sans savoir ce que ça lui rapporte, et qui n'ose pas poser la question parce qu'on lui répond avec des mots qu'il ne connaît pas.",
      "[[À COMPLÉTER : votre parcours avant le studio — formation, emplois, premiers mandats. Deux ou trois phrases concrètes. C'est la partie que les prospects lisent en entier.]]",
      "[[À COMPLÉTER : l'anecdote fondatrice — le mandat, la conversation ou le constat précis qui vous a décidé à vous lancer. Une histoire vraie vaut dix arguments.]]",
      "Aujourd'hui, je travaille avec des cabinets professionnels, des commerces et des entreprises de services du Grand Montréal. Toujours en français et en anglais, toujours avec un nombre limité de mandats à la fois.",
    ],
  },

  difference: {
    heading: "Ce qu'une grosse agence fait autrement",
    paragraphs: [
      "Dans une agence, le budget d'une PME de 1 500 $ par mois n'arrive pas sur le bureau du meilleur stratège. Il arrive chez un gestionnaire de compte, qui relaie vos questions à un exécutant que vous ne rencontrerez jamais. Une partie de ce que vous payez sert à faire tourner cette chaîne.",
      "Ici, il n'y a pas de chaîne. La personne qui monte votre compte publicitaire est celle qui écrit vos créas, qui tourne vos vidéos, qui répond à vos courriels et qui vous explique votre rapport. Quand quelque chose ne fonctionne pas, vous le savez le jour où je le vois.",
      "La contrepartie honnête : je prends un nombre limité de mandats à la fois, et il m'arrive de refuser du travail. Une agence de trente personnes ne vous dira jamais non.",
    ],
  },

  principles: {
    heading: "Ma façon de travailler",
    items: [
      {
        title: "Vos comptes vous appartiennent",
        body:
          "Compte publicitaire, gestionnaire d'entreprise, nom de domaine, fiche Google : tout est créé au nom de votre entreprise, avec votre courriel comme administrateur. J'y accède comme partenaire. Si on cesse de travailler ensemble, vous ne perdez rien.",
      },
      {
        title: "Un rapport que vous pouvez lire",
        body:
          "Chaque mois, en français : ce qui a été dépensé, ce que ça a rapporté, ce que je change et pourquoi. Vous avez accès aux mêmes tableaux de bord que moi, en tout temps, sans avoir à les demander.",
      },
      {
        title: "Aucun contrat à long terme",
        body:
          "Les mandats fonctionnent au mois, avec trente jours de préavis de part et d'autre. Si les résultats ne suivent pas, vous n'avez pas besoin de ma permission pour arrêter.",
      },
      {
        title: "Je vous dis quand ce n'est pas pour moi",
        body:
          "Boutique en ligne complexe, campagnes Google Ads, refonte de marque : ce n'est pas mon terrain. Je préfère vous orienter vers quelqu'un de mieux placé plutôt que de livrer un compromis que vous paierez quand même.",
      },
    ],
  },

  facts: [
    { label: "Studio fondé en", value: "[[À COMPLÉTER : année de fondation]]" },
    { label: "Basé à", value: `${site.city}, ${site.regionName}` },
    { label: "Langues de travail", value: "Français et anglais" },
    { label: "Mandats simultanés", value: "Volontairement limités" },
  ],

  cta: {
    heading: "On se parle ?",
    body:
      "L'audit gratuit est la façon la plus simple de voir si on travaille bien ensemble. Vous m'envoyez vos accès en lecture, je vous renvoie ce que je trouve, et vous décidez ensuite.",
  },
} as const;
