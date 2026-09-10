import { site } from "./site";

export type Faq = { question: string; answer: string[] };

export const faqs: Faq[] = [
  {
    question: "Combien dois-je investir en publicité pour commencer ?",
    answer: [
      "Comptez environ 750 $ à 1 500 $ par mois de budget média pour une PME du Grand Montréal, payés directement à Meta depuis votre carte. En dessous de ce seuil, les campagnes accumulent trop peu de conversions pour que les décisions reposent sur autre chose que du hasard.",
      "Ce montant est distinct de mes honoraires de gestion. Si votre budget ne permet pas encore ce niveau, je vous le dirai lors de l'audit et je vous orienterai plutôt vers votre site ou votre fiche Google, qui coûtent moins cher à corriger.",
    ],
  },
  {
    question: "Est-ce que je garde la propriété de mon compte publicitaire ?",
    answer: [
      "Oui, et c'est non négociable de mon côté aussi. Le compte publicitaire et le gestionnaire d'entreprise sont créés au nom de votre entreprise, avec votre courriel comme administrateur principal. J'y accède comme partenaire.",
      "Concrètement : vous voyez les mêmes chiffres que moi en tout temps, et si on cesse de travailler ensemble, vous conservez votre historique, vos audiences et votre pixel. Un compte publicitaire hébergé chez une agence est un des pièges les plus coûteux du secteur.",
    ],
  },
  {
    question: "Combien de temps avant de voir des résultats ?",
    answer: [
      "Pour la publicité Meta, les premières demandes arrivent généralement dans les deux à trois semaines, le temps que les campagnes sortent de leur phase d'apprentissage. Le premier mois sert autant à apprendre qu'à vendre : c'est là qu'on découvre quelles créas et quelles audiences tiennent.",
      "Pour le SEO local, la fiche Google peut bouger en deux à quatre semaines, tandis que les pages de service demandent trois à six mois. Pour le contenu organique, l'effet se mesure sur six mois de régularité, pas sur trois publications.",
    ],
  },
  {
    question: "Est-ce que le site m'appartient ?",
    answer: [
      `Oui. Le nom de domaine est enregistré au nom de votre entreprise et le site vous appartient dès qu'il est payé. L'entretien à ${site.pricing.maintenance.label} par mois est un service, pas une location.`,
      "Si vous décidez d'arrêter l'entretien, je vous remets les fichiers et les accès, et vous êtes libre de l'héberger où vous voulez ou de le confier à quelqu'un d'autre. Aucune pénalité, aucune clause de sortie.",
    ],
  },
  {
    question: "Y a-t-il un contrat à long terme ?",
    answer: [
      "Non. Les mandats de gestion fonctionnent au mois, avec un préavis de trente jours de part et d'autre. C'est suffisant pour terminer proprement le mois en cours et vous transférer ce qui est en production.",
      "Je demande en revanche un engagement moral de trois mois au départ d'un mandat publicitaire, parce que juger une campagne après trois semaines n'a pas de sens. Si les résultats ne sont pas là au bout de trois mois, la conversation est facile : les chiffres sont dans votre compte, pas dans le mien.",
    ],
  },
  {
    question: "Pourquoi travailler avec une personne plutôt qu'avec une agence ?",
    answer: [
      "Parce que dans une agence, le budget d'une PME arrive rarement sur le bureau du meilleur stratège. Vous parlez à un gestionnaire de compte, qui relaie à un exécutant que vous ne rencontrerez jamais, et une partie de vos honoraires paie cette chaîne.",
      "Ici, la personne qui monte votre compte publicitaire est celle qui écrit vos créas, qui répond à vos courriels et qui vous explique votre rapport. La contrepartie honnête : je prends un nombre limité de mandats à la fois, et il m'arrive de devoir refuser.",
    ],
  },
];

export const faqSection = {
  title: "Les questions qu'on me pose avant de signer",
  intro:
    "Les réponses ci-dessous sont celles que je donne au téléphone. Si la vôtre n'y est pas, écrivez-moi : j'ajouterai la réponse ici.",
} as const;
