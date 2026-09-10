import { site } from "./site";

export type LegalBlock = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

export type LegalDoc = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  updated: string;
  intro: string[];
  blocks: LegalBlock[];
};

/** Date de dernière révision affichée sur les deux documents. */
const UPDATED = "2026-03-15";

export const privacy: LegalDoc = {
  h1: "Politique de confidentialité",
  metaTitle: "Politique de confidentialité | Alpha Marketing Studio",
  metaDescription:
    "Quelles données sont recueillies, pourquoi, combien de temps elles sont conservées, et comment exercer vos droits en vertu de la Loi 25 du Québec.",
  updated: UPDATED,
  intro: [
    `${site.legalName} est une entreprise établie à ${site.city}, au ${site.regionName}. Cette politique explique quels renseignements personnels je recueille par l'intermédiaire de ce site, pourquoi je les recueille, combien de temps je les conserve et comment vous pouvez en obtenir la communication, la rectification ou la suppression.`,
    "Elle est rédigée conformément à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec, telle que modifiée par la Loi 25, ainsi qu'à la Loi canadienne anti-pourriel (LCAP).",
  ],
  blocks: [
    {
      heading: "Responsable de la protection des renseignements personnels",
      paragraphs: [
        `La Loi 25 exige qu'une personne soit désignée responsable de la protection des renseignements personnels. Dans une entreprise individuelle, il s'agit du propriétaire : ${site.founder.name}.`,
        `Toute demande relative à vos renseignements personnels peut lui être adressée à ${site.email}. [[À VALIDER : si vous obtenez une adresse postale d'entreprise, ajoutez-la ici — la LCAP exige une adresse postale valide dans chaque courriel commercial.]]`,
      ],
    },
    {
      heading: "Renseignements recueillis",
      paragraphs: [
        "Je ne recueille que ce dont j'ai besoin pour répondre à une demande ou livrer un service. Aucun renseignement n'est acheté auprès de tiers, et aucun profil n'est constitué à partir de sources externes.",
      ],
      list: [
        "Formulaire de contact : votre nom, votre adresse courriel, le nom de votre entreprise (facultatif), la fourchette de budget indiquée, le service qui vous intéresse et le contenu de votre message.",
        "Infolettre : votre adresse courriel, la date de votre inscription, la confirmation de votre consentement et le point du site depuis lequel vous vous êtes inscrit.",
        "Mesure d'audience : uniquement si vous avez accepté les témoins, des données d'utilisation agrégées (pages consultées, provenance, type d'appareil) recueillies par Google Analytics 4 et le pixel Meta.",
        "Journaux techniques : votre adresse IP et l'horodatage de vos requêtes, conservés brièvement pour limiter les envois automatisés et protéger les formulaires.",
      ],
    },
    {
      heading: "Pourquoi ces renseignements sont recueillis",
      list: [
        "Vous répondre lorsque vous m'écrivez, et préparer une proposition adaptée à votre situation.",
        "Vous envoyer le guide et l'infolettre auxquels vous vous êtes inscrit, et uniquement s'il y a eu inscription confirmée.",
        "Comprendre quelles pages du site sont utiles, si et seulement si vous avez consenti à la mesure d'audience.",
        "Protéger les formulaires contre les envois automatisés.",
      ],
    },
    {
      heading: "Consentement",
      paragraphs: [
        "Le consentement à l'infolettre est explicite et distinct : la case n'est jamais cochée d'avance, et l'inscription n'est active qu'après confirmation par un courriel de double consentement. Cette confirmation constitue la preuve de consentement exigée par la LCAP.",
        "Aucun témoin de mesure n'est déposé avant que vous ayez accepté la bannière. Refuser est aussi simple qu'accepter : un bouton, un clic, et le site fonctionne de façon identique.",
        "Le calendrier de réservation de la page Réservation est un service de Square qui dépose ses propres témoins. Il ne se charge qu'après que vous avez cliqué pour l'afficher : ce clic constitue votre consentement, et il porte sur ce service précis. Sans ce clic, aucune donnée n'est transmise à Square.",
        "Vous pouvez retirer votre consentement en tout temps, sans avoir à vous justifier : lien de désabonnement dans chaque courriel, ou demande écrite à l'adresse ci-dessus.",
      ],
    },
    {
      heading: "Durée de conservation",
      list: [
        "Demandes reçues par le formulaire de contact : trois ans après le dernier échange, puis suppression.",
        "Contacts de l'infolettre : jusqu'à votre désabonnement, puis suppression dans les douze mois qui suivent.",
        "Données de mesure d'audience : quatorze mois, la durée maximale configurée dans Google Analytics 4.",
        "Journaux techniques de protection des formulaires : moins de vingt-quatre heures.",
        "Documents liés à un mandat en cours ou terminé : la durée exigée par les obligations fiscales et comptables applicables. [[À VALIDER : faites confirmer ce délai par votre comptable.]]",
      ],
    },
    {
      heading: "Communication à des tiers et hébergement hors Québec",
      paragraphs: [
        "Je ne vends, ne loue et n'échange aucun renseignement personnel. Certains fournisseurs traitent des données pour mon compte, et plusieurs hébergent leurs serveurs hors du Québec. Vous en êtes informé conformément à la Loi 25.",
      ],
      list: [
        "Vercel — hébergement du site (États-Unis et réseau mondial).",
        "Brevo — envoi de l'infolettre et gestion des contacts (Union européenne).",
        "Resend — acheminement des messages du formulaire de contact (États-Unis).",
        "Cloudflare — vérification anti-robot Turnstile, sans témoin de suivi (réseau mondial).",
        "Square (Block, Inc.) — calendrier de prise de rendez-vous sur la page Réservation, chargé uniquement après que vous avez cliqué pour l'afficher (États-Unis).",
        "Google Analytics 4 et Meta (pixel) — mesure d'audience, uniquement après votre consentement (États-Unis).",
      ],
    },
    {
      heading: "Vos droits",
      paragraphs: [
        "La Loi 25 vous reconnaît plusieurs droits, que vous pouvez exercer gratuitement en m'écrivant. Je réponds dans les trente jours, comme la loi l'exige.",
      ],
      list: [
        "Accès : obtenir la liste des renseignements que je détiens à votre sujet.",
        "Rectification : faire corriger un renseignement inexact ou incomplet.",
        "Suppression : demander l'effacement de vos renseignements, sous réserve des obligations légales de conservation.",
        "Portabilité : recevoir vos renseignements dans un format technologique structuré et couramment utilisé.",
        "Retrait du consentement : à la mesure d'audience, à l'infolettre, ou aux deux.",
        "Plainte : si ma réponse ne vous satisfait pas, vous pouvez vous adresser à la Commission d'accès à l'information du Québec.",
      ],
    },
    {
      heading: "Témoins et technologies similaires",
      paragraphs: [
        "Ce site n'utilise aucun témoin nécessitant votre consentement tant que vous ne l'avez pas donné. Votre choix est conservé localement dans votre navigateur pendant un an, puis vous est redemandé.",
        "Un espace de stockage local retient également votre décision sur la bannière. Il ne contient aucun identifiant publicitaire et n'est jamais transmis à un tiers.",
        "Pour modifier votre choix, effacez les données de site de votre navigateur pour ce domaine : la bannière réapparaîtra à votre prochaine visite.",
      ],
    },
    {
      heading: "Sécurité",
      paragraphs: [
        "Le site est servi exclusivement en HTTPS. Les clés d'accès aux services tiers sont conservées côté serveur et ne sont jamais exposées au navigateur. Les formulaires sont protégés par un champ leurre, une limitation du nombre d'envois par adresse IP et une vérification anti-robot.",
        "Aucun système n'est parfaitement inviolable. En cas d'incident de confidentialité présentant un risque de préjudice sérieux, les personnes concernées et la Commission d'accès à l'information seront avisées, comme la Loi 25 l'exige.",
      ],
    },
    {
      heading: "Modifications de cette politique",
      paragraphs: [
        "Cette politique peut être modifiée pour refléter un changement de service ou d'obligation légale. La date de dernière mise à jour figure en haut de la page. Un changement important vous sera signalé par courriel si vous êtes inscrit à l'infolettre.",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  h1: "Conditions d'utilisation",
  metaTitle: "Conditions d'utilisation — Alpha Marketing Studio, Montréal",
  metaDescription:
    "Portée des services, tarifs affichés, propriété du travail livré, responsabilités et droit applicable. Alpha Marketing Studio, Montréal, Québec.",
  updated: UPDATED,
  intro: [
    `Ce site est exploité par ${site.legalName}, entreprise de services établie à ${site.city}, au ${site.regionName}. En le consultant, vous acceptez les conditions ci-dessous.`,
    "Ces conditions encadrent l'utilisation du site. Les mandats font l'objet d'une entente écrite distincte, qui prévaut sur cette page en cas de divergence.",
  ],
  blocks: [
    {
      heading: "Nature des services",
      paragraphs: [
        "Alpha Marketing Studio offre des services de gestion de publicités Meta, de gestion de contenu sur les réseaux sociaux, de création de sites web et de référencement local, principalement auprès de PME du Grand Montréal.",
        "Le contenu du site est informatif. Il ne constitue ni une offre contractuelle, ni un conseil juridique, comptable ou fiscal.",
      ],
    },
    {
      heading: "Tarifs affichés",
      paragraphs: [
        `Le forfait de création de site web est affiché à ${site.pricing.website.label} et l'entretien mensuel à ${site.pricing.maintenance.label}. Ces montants sont en dollars canadiens et s'entendent avant les taxes applicables (TPS et TVQ). [[À VALIDER : indiquez si vous êtes inscrit aux fichiers de la TPS et de la TVQ, et si oui, ajoutez vos numéros d'inscription.]]`,
        "Ces prix couvrent exactement la portée décrite sur la page du service. Tout élément hors de cette portée fait l'objet d'une soumission écrite distincte, acceptée avant le début des travaux.",
        "Les mandats de gestion publicitaire et de contenu social sont établis sur soumission. Le budget publicitaire versé aux plateformes est payé directement par le client et ne fait pas partie des honoraires.",
        "Les tarifs peuvent être modifiés en tout temps pour les nouveaux mandats. Un mandat en cours conserve les conditions acceptées au moment de sa signature.",
      ],
    },
    {
      heading: "Délais",
      paragraphs: [
        `Le délai de ${site.pricing.websiteDeliveryDays} jours ouvrables annoncé pour la création d'un site court à partir du moment où le client a fourni l'ensemble des éléments demandés : textes ou réponses à l'appel initial, photos, logo, coordonnées et accès au nom de domaine.`,
        "Un retard dans la fourniture de ces éléments, ou une demande de révision au-delà de la ronde incluse, décale le délai d'autant.",
      ],
    },
    {
      heading: "Propriété du travail livré",
      paragraphs: [
        "Une fois le mandat entièrement payé, le client détient les droits d'utilisation du site, des textes et des visuels produits spécifiquement pour lui.",
        "Le nom de domaine, l'hébergement, le compte publicitaire, le gestionnaire d'entreprise et la fiche Google Entreprise sont créés au nom du client et lui appartiennent en tout temps, y compris après la fin du mandat.",
        "Les méthodes, gabarits, structures de compte et outils internes utilisés pour produire le travail demeurent la propriété d'Alpha Marketing Studio.",
        "Sauf avis contraire du client, Alpha Marketing Studio peut mentionner le mandat et présenter des extraits du travail réalisé à titre de référence.",
      ],
    },
    {
      heading: "Obligations du client",
      list: [
        "Fournir des renseignements exacts et détenir les droits sur les textes, photos et marques transmis.",
        "Respecter les règles publicitaires des plateformes utilisées, ainsi que les lois applicables à son secteur d'activité.",
        "Conserver ses propres accès administrateurs et ne pas les partager avec des tiers non autorisés.",
        "Régler les factures selon les modalités convenues dans l'entente de mandat.",
      ],
    },
    {
      heading: "Limites de responsabilité",
      paragraphs: [
        "Les résultats d'une campagne publicitaire ou d'une démarche de référencement dépendent de facteurs qui échappent en partie à mon contrôle : offre du client, concurrence, saisonnalité, décisions des plateformes et modifications de leurs algorithmes. Aucun résultat chiffré n'est garanti, et toute affirmation contraire d'un fournisseur devrait être considérée avec méfiance.",
        "Alpha Marketing Studio ne peut être tenue responsable de la suspension ou de la fermeture d'un compte publicitaire décidée par une plateforme tierce, ni de l'interruption d'un service tiers d'hébergement ou d'envoi.",
        "La responsabilité totale d'Alpha Marketing Studio, tous chefs de réclamation confondus, est limitée aux sommes effectivement versées par le client au cours des trois mois précédant l'événement en cause. [[À VALIDER : faites relire cette clause par un avocat — une limitation de responsabilité doit être adaptée à votre situation réelle pour être opposable.]]",
      ],
    },
    {
      heading: "Résiliation",
      paragraphs: [
        "Les mandats de gestion sont conclus au mois, avec un préavis de trente jours de part et d'autre. Le mois entamé est dû en entier.",
        "L'entretien mensuel d'un site peut être résilié en tout temps avec un préavis de trente jours. Les fichiers et les accès sont alors remis au client dans un délai raisonnable, sans frais de sortie.",
      ],
    },
    {
      heading: "Liens externes",
      paragraphs: [
        "Ce site peut renvoyer vers des sites tiers. Ces liens sont fournis par commodité et n'impliquent aucune approbation de leur contenu, sur lequel je n'ai aucun contrôle.",
      ],
    },
    {
      heading: "Droit applicable",
      paragraphs: [
        "Ces conditions sont régies par les lois applicables au Québec. Tout litige relève de la compétence exclusive des tribunaux du district judiciaire de Montréal.",
      ],
    },
  ],
};
