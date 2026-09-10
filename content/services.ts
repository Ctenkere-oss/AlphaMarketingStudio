import { site } from "./site";

export type ServiceSection = {
  heading: string;
  paragraphs?: string[];
  list?: { term?: string; text: string }[];
};

export type Service = {
  slug: string;
  /**
   * `principal` : le produit vendu, celui qui structure l'offre.
   * `appui` : un service qui existe parce qu'il rend le produit
   * principal moins cher ou plus efficace. La hiérarchie visuelle du
   * site découle directement de ce champ.
   */
  tier: "principal" | "appui";
  /** Nom court pour la navigation. */
  nav: string;
  /** Titre complet, utilisé en h1 sur la page enfant. */
  h1: string;
  /** Titre de l'onglet du navigateur : 50 à 60 caractères. */
  metaTitle: string;
  /** 140 à 160 caractères. */
  metaDescription: string;
  /** Une phrase, sur la page pilier et l'accueil. */
  promise: string;
  forWhom: string;
  deliverables: string[];
  measure: string[];
  excluded: string[];
  price: string;
  /** Contenu long de la page enfant. */
  intro: string[];
  sections: ServiceSection[];
  closing: string;
};

export const services: Service[] = [
  {
    slug: "publicite-meta",
    tier: "principal",
    nav: "Publicités Meta",
    h1: "Gestion de publicités Meta pour les PME de Montréal",
    metaTitle: "Publicité Facebook et Instagram à Montréal pour PME",
    metaDescription:
      "Gestion de campagnes Facebook et Instagram pour PME du Grand Montréal : structure de compte, créas testées en continu, optimisation au coût d'acquisition réel.",
    promise:
      "Structurer le compte, produire les créas, tester sans arrêt, et juger chaque publicité sur le coût réel d'un client — pas sur le coût d'un clic.",
    forWhom:
      "PME qui ont déjà essayé de « booster une publication » et qui veulent savoir ce qu'un client leur coûte vraiment.",
    deliverables: [
      "Montage ou reconstruction complète du compte publicitaire et du gestionnaire d'entreprise",
      "Installation du pixel Meta et de l'API de conversions, avec vérification des événements",
      "Production de 8 à 12 créas par mois : vidéo courte, image, texte",
      "Tests d'audiences et d'accroches en continu, arrêt rapide de ce qui ne performe pas",
      "Rapport mensuel avec le coût par résultat, et non seulement la portée",
    ],
    measure: [
      "Coût par demande de soumission, par appel ou par vente — selon votre objectif",
      "Nombre de résultats livrés par tranche de 1 000 $ investis",
      "Taux de rétention des créas : combien survivent au-delà de dix jours",
    ],
    excluded: [
      "Google Ads et LinkedIn Ads : ce n'est pas mon terrain, je vous dirai vers qui aller",
      "Le budget publicitaire lui-même, qui est payé directement à Meta depuis votre carte",
      "La production d'un tournage de type studio avec équipe, éclairage et comédiens",
    ],
    price: "Sur soumission, selon le budget publicitaire et le volume de créas.",
    intro: [
      "La publicité Meta est la seule ligne de mon offre où je passe du temps tous les jours. Facebook et Instagram restent, pour une PME du Grand Montréal, la façon la moins chère d'atteindre des gens qui n'ont jamais entendu parler de vous et de les amener à poser un geste dans la même semaine.",
      "Le problème n'est presque jamais la plateforme. Il est dans la façon dont le compte est monté et dans ce qu'on lui demande d'optimiser. Un compte qui court après des clics livrera des clics. Un compte configuré pour livrer des demandes de soumission livrera des demandes de soumission, souvent avec le même budget.",
    ],
    sections: [
      {
        heading: "Ce qui ne va pas dans la plupart des comptes que j'ouvre",
        paragraphs: [
          "Quand un propriétaire de PME me donne accès à son gestionnaire d'entreprise, je retrouve presque toujours les mêmes quatre choses. Un objectif de campagne réglé sur l'engagement ou le trafic, parce que c'est ce que la plateforme propose par défaut quand on clique sur « Booster ». Le pixel installé mais aucun événement de conversion configuré, donc l'algorithme n'a aucune idée de ce qui compte comme un succès. Huit ensembles de publicités qui se partagent 600 $ par mois, ce qui empêche chacun d'accumuler assez de données pour sortir de la phase d'apprentissage. Et une seule créa, en ligne depuis quatre mois, qui a épuisé son audience.",
          "Aucun de ces problèmes ne demande plus d'argent pour être réglé. Ils demandent que quelqu'un ouvre le compte et remette les choses dans le bon ordre.",
        ],
      },
      {
        heading: "La structure de compte que je monte",
        paragraphs: [
          "Je travaille avec une structure volontairement simple, parce qu'un budget de PME ne supporte pas la complexité. Une campagne par objectif d'affaires, rarement plus de deux en même temps. À l'intérieur, deux ou trois ensembles de publicités au maximum : une audience large laissée à l'algorithme, une audience de reciblage sur les visiteurs et les gens qui ont regardé plus de la moitié d'une vidéo, et parfois une audience similaire bâtie sur votre liste de clients.",
          "Le budget est géré à l'échelle de la campagne plutôt que réparti à la main entre les ensembles. Meta répartit mieux que nous, à condition qu'on lui laisse assez de volume dans un même contenant. En dessous de 1 000 $ par mois, multiplier les ensembles est le moyen le plus rapide de ne jamais sortir de l'apprentissage.",
        ],
      },
      {
        heading: "Les créas font le gros du travail",
        paragraphs: [
          "À budget égal, l'écart de performance entre deux comptes vient presque entièrement des créas. C'est pour ça que la production fait partie du mandat plutôt que d'être facturée à part : je produis huit à douze créas par mois, majoritairement de la vidéo verticale de quinze à trente secondes, tournée dans votre commerce ou votre bureau.",
          "Chaque créa teste un angle, pas une couleur de bouton. Le prix affiché contre le problème évité. Le témoignage contre la démonstration. La question posée en ouverture contre l'affirmation. Les publicités qui ne trouvent pas leur public sont retirées rapidement, et leur budget va à celles qui tiennent. C'est un travail d'élimination, pas de perfection : on ne devine pas d'avance laquelle va gagner, on la trouve.",
        ],
      },
      {
        heading: "Ce que vous voyez chaque mois",
        paragraphs: [
          "Vous recevez un rapport lisible en cinq minutes. Combien a été dépensé, combien de résultats sont entrés, ce que chaque résultat a coûté, ce que je change le mois suivant et pourquoi. Pas de tableau de bord de vingt onglets que personne n'ouvre.",
          "Le compte publicitaire reste au nom de votre entreprise et vous en gardez la propriété pleine et entière. Je travaille dedans comme partenaire, avec les accès nécessaires et rien de plus. Si on arrête de travailler ensemble, vous ne perdez ni votre historique, ni vos audiences, ni votre pixel.",
        ],
      },
      {
        heading: "Le budget minimum pour que ça vaille la peine",
        paragraphs: [
          "En dessous d'environ 750 $ par mois de budget média au Québec, une campagne met tellement de temps à accumuler des conversions que les décisions se prennent sur du bruit statistique. Ce n'est pas une règle absolue — un panier moyen élevé change tout — mais c'est le seuil en dessous duquel je vous dirai franchement d'investir ailleurs d'abord : dans votre site, ou dans votre fiche Google.",
          "C'est exactement le genre de conclusion que l'audit gratuit sert à établir avant que vous engagiez quoi que ce soit.",
        ],
      },
    ],
    closing:
      "Envoyez-moi les accès en lecture à votre compte publicitaire. Je vous dis ce que j'y trouve, sans engagement.",
  },
  {
    slug: "creation-site-web",
    tier: "appui",
    nav: "Création de site web",
    h1: `Création de site web pour PME à ${site.pricing.website.label}`,
    metaTitle: "Site web pour PME à Montréal : 500 $, livré en 5 jours",
    metaDescription:
      "Site web professionnel pour PME de Montréal : 500 $ forfaitaire, livré en 5 jours ouvrables, entretien à 75 $ par mois. Ce qui est inclus, ce qui ne l'est pas.",
    promise:
      "Un site qui charge vite, se lit au téléphone et donne envie d'appeler. Écrit, monté et mis en ligne dans la même semaine.",
    forWhom:
      "PME sans site, ou avec un site abandonné depuis des années que plus personne ne sait modifier.",
    deliverables: [
      "Site de 3 à 6 pages, écrit et monté à partir de votre information réelle",
      "Rédaction des textes en français, à partir d'un appel d'une heure",
      "Adapté au téléphone en premier, puis à la tablette et à l'ordinateur",
      "Fiche Google Entreprise créée ou nettoyée, reliée au site",
      "Formulaire de contact fonctionnel qui arrive dans votre boîte courriel",
      "Mise en ligne, certificat de sécurité, et remise des accès",
    ],
    measure: [
      "Le site est en ligne au 5e jour ouvrable",
      "Il obtient une note de performance supérieure à 90 sur mobile",
      "Les demandes arrivent dans votre boîte de réception, pas dans un tableau de bord",
    ],
    excluded: [
      "La boutique en ligne avec paiement, panier et gestion d'inventaire",
      "Le système de réservation ou de prise de rendez-vous sur mesure",
      "La séance photo professionnelle et la production vidéo",
      "La rédaction de dizaines de pages de contenu SEO — c'est un mandat distinct",
    ],
    price: `${site.pricing.website.label} forfaitaire, puis ${site.pricing.maintenance.label} par mois pour l'entretien.`,
    intro: [
      `Un site web à ${site.pricing.website.label} pour une entreprise, ça fait lever un sourcil. C'est normal : la même chose se facture couramment entre 3 000 $ et 8 000 $ à Montréal. La page qui suit explique exactement ce que vous obtenez pour ce prix, ce que vous n'obtenez pas, et pourquoi ce prix est possible sans que le résultat soit bâclé.`,
      "L'offre existe parce que je rencontre trop de PME qui n'ont pas de site du tout. Pas parce qu'elles n'en veulent pas : parce que la première soumission reçue était à 5 000 $ et que le projet est mort là. Pendant ce temps, leurs clients cherchent leur nom sur Google et tombent sur une fiche Facebook incomplète.",
    ],
    sections: [
      {
        heading: "Ce que vous obtenez",
        list: [
          { term: "Trois à six pages", text: "Accueil, services, à propos, contact, plus une ou deux pages selon votre métier." },
          { term: "Les textes rédigés", text: "Un appel d'une heure suffit. J'écris, vous corrigez, on ajuste une fois." },
          { term: "Le téléphone d'abord", text: "Plus de la moitié de vos visiteurs seront sur mobile. Le site est conçu à 390 pixels de large, puis élargi." },
          { term: "La fiche Google", text: "Créée ou nettoyée, catégories bonnes, heures à jour, reliée au site. C'est souvent ce qui rapporte le plus vite." },
          { term: "Un formulaire qui marche", text: "Les demandes arrivent dans votre boîte courriel, testées avant la mise en ligne." },
          { term: "Les accès", text: "Le nom de domaine et le site sont à votre nom. Vous partez avec si vous partez." },
        ],
      },
      {
        heading: "Pourquoi cinq jours suffisent",
        paragraphs: [
          "Parce que le calendrier n'est pas rempli par les allers-retours. Le délai habituel d'un projet web ne vient pas du montage : il vient des trois semaines d'attente entre l'envoi d'une maquette et le retour du client, multipliées par quatre rondes de révision.",
          "Ici, le processus est fixe. Jour 1 : appel d'une heure, je récupère vos textes existants, vos photos, vos coordonnées. Jours 2 et 3 : je monte le site en entier. Jour 4 : vous voyez la version complète et vous m'envoyez vos corrections en une seule fois. Jour 5 : j'applique les corrections et je mets en ligne. Une ronde de révision est incluse, et elle suffit dans la grande majorité des cas parce que vous voyez le vrai site, pas un dessin.",
        ],
      },
      {
        heading: `Ce que couvre l'entretien à ${site.pricing.maintenance.label} par mois`,
        list: [
          { text: "Hébergement et certificat de sécurité" },
          { text: "Renouvellement du nom de domaine" },
          { text: "Mises à jour techniques et correctifs de sécurité" },
          { text: "Sauvegardes automatiques, restauration incluse si quelque chose casse" },
          { text: "Petites modifications : heures d'ouverture, prix, coordonnées, ajout d'un service" },
          { text: "Surveillance de la disponibilité du site" },
        ],
        paragraphs: [
          "L'entretien n'est pas obligatoire. Vous pouvez repartir avec le site et l'héberger vous-même : je vous remets les fichiers et les accès. La plupart des clients préfèrent ne pas y penser, et c'est exactement ce que ce montant achète.",
        ],
      },
      {
        heading: "Ce que ce n'est pas",
        paragraphs: [
          "Ce n'est pas une boutique en ligne. Dès qu'il y a un panier, des paiements, de l'inventaire et des taxes à calculer, on change de projet et de budget, et je vous le dirai avant de commencer.",
          "Ce n'est pas un site sur mesure avec une identité visuelle créée de zéro, un système de réservation intégré et quarante pages de contenu. Si c'est ce qu'il vous faut, une agence traditionnelle fera mieux, et je préfère vous le dire plutôt que de livrer un compromis.",
          "C'est un site propre, rapide, à jour et crédible, mis en ligne cette semaine plutôt que l'an prochain. Pour une PME qui n'a rien en ligne, c'est la différence entre exister et ne pas exister.",
        ],
      },
    ],
    closing: `Décrivez-moi votre entreprise en trois lignes. Je vous dis si l'offre à ${site.pricing.website.label} convient à votre cas ou si vous avez besoin d'autre chose.`,
  },
  {
    slug: "gestion-reseaux-sociaux",
    tier: "appui",
    nav: "Gestion des réseaux sociaux",
    h1: "Gestion de contenu Instagram et TikTok à Montréal",
    metaTitle: "Gestion de réseaux sociaux à Montréal : Instagram, TikTok",
    metaDescription:
      "Ligne éditoriale, calendrier et production de vidéos courtes pour Instagram et TikTok. Publication régulière pour les PME et professionnels du Grand Montréal.",
    promise:
      "Une ligne éditoriale tenue dans la durée, des vidéos courtes tournées et montées, et une publication qui ne s'arrête pas au bout de trois semaines.",
    forWhom:
      "Professionnels et commerces dont les clients se renseignent en ligne avant d'appeler : avocats, cliniques, restaurants, services.",
    deliverables: [
      "Ligne éditoriale écrite : à qui on parle, de quoi on parle, sur quel ton",
      "Calendrier mensuel approuvé d'avance, aucune surprise",
      "Tournage et montage de vidéos courtes, sous-titres inclus",
      "Publication et programmation sur Instagram et TikTok",
      "Réponses aux commentaires et tri des messages privés qui sentent le client",
    ],
    measure: [
      "Régularité tenue : le nombre de publications prévues est le nombre de publications faites",
      "Portée auprès des comptes non abonnés, qui indique si le contenu sort de votre bulle",
      "Messages privés et demandes reçues qui viennent des réseaux",
    ],
    excluded: [
      "La croissance achetée : aucun abonné payé, aucun échange de suivis",
      "La gestion de LinkedIn, X ou Pinterest",
      "Les promesses de nombres d'abonnés — personne ne peut les garantir honnêtement",
    ],
    price: "Sur soumission, selon le nombre de publications et de tournages par mois.",
    intro: [
      "Le contenu organique n'est pas là pour faire joli. Il fait deux choses très concrètes : il rassure la personne qui vérifie votre profil avant de vous appeler, et il produit les vidéos que la publicité utilisera ensuite.",
      "C'est aussi le levier le plus souvent abandonné, parce qu'il demande de la constance plutôt que du talent. Trois publications enthousiastes en janvier puis plus rien jusqu'en mai, c'est pire que rien : un visiteur qui tombe sur un profil endormi en tire des conclusions sur l'entreprise.",
    ],
    sections: [
      {
        heading: "On commence par les questions, pas par les idées",
        paragraphs: [
          "La ligne éditoriale ne sort pas d'une séance de remue-méninges. Elle sort de ce que vos clients vous demandent déjà : les questions posées au téléphone, celles répétées en consultation, celles qui reviennent en soumission.",
          "Chacune de ces questions est une vidéo. Elle a l'avantage d'être une vraie question, donc d'intéresser quelqu'un, et elle attire exactement les gens qui ont ce problème — c'est-à-dire vos futurs clients. C'est la méthode utilisée pour le cabinet Ayram Barry Avocat : les vidéos répondent aux questions réellement posées en consultation d'immigration.",
        ],
      },
      {
        heading: "La production, pour vrai",
        paragraphs: [
          "Une séance de tournage couvre plusieurs semaines de publications. On tourne dans votre bureau, votre clinique ou votre commerce, en vertical, avec un micro-cravate et un éclairage simple. Vous n'avez pas de texte à mémoriser : je pose les questions, vous répondez comme vous le feriez à un client.",
          "Le montage suit un format constant : accroche dans les deux premières secondes, sous-titres lisibles sans le son, habillage graphique identique d'une vidéo à l'autre. Cette constance est ce qui rend un compte reconnaissable dans un fil de défilement, bien plus que la qualité de la caméra.",
        ],
      },
      {
        heading: "Instagram et TikTok, pas partout à la fois",
        paragraphs: [
          "Je travaille deux plateformes, et les mêmes vidéos servent aux deux, avec des accroches et des durées ajustées. Être présent sur six réseaux avec un contenu tiède est moins utile qu'être solide sur deux.",
          "La publication est programmée, mais les commentaires et les messages ne sont pas laissés à l'abandon : je réponds aux commentaires et je vous transmets les messages privés qui ressemblent à une demande de service, pour que vous les traitiez vous-même.",
        ],
      },
      {
        heading: "Ce que je ne promettrai pas",
        paragraphs: [
          "Aucun nombre d'abonnés. Aucune vidéo virale garantie. Ceux qui promettent ces chiffres achètent des abonnés ou récitent une moyenne qui ne veut rien dire pour votre secteur.",
          "Ce que je m'engage à tenir, c'est la régularité et la qualité constante du format. C'est ce qui produit des résultats sur six mois, et c'est mesurable dès le premier mois.",
        ],
      },
    ],
    closing:
      "Montrez-moi votre compte actuel. Je vous dis en une page ce que je changerais et à quelle fréquence il faudrait publier dans votre secteur.",
  },
  {
    slug: "seo-local",
    tier: "appui",
    nav: "SEO local",
    h1: "SEO local à Montréal pour PME et professionnels",
    metaTitle: "SEO local à Montréal et Laval pour PME et professionnels",
    metaDescription:
      "Référencement local pour PME de Montréal et Laval : fiche Google Entreprise, fondations techniques et pages de service qui répondent aux recherches réelles.",
    promise:
      "Apparaître quand quelqu'un de votre quartier cherche exactement ce que vous vendez, sans payer pour chaque clic.",
    forWhom:
      "Entreprises avec une clientèle géographique : celles dont les clients écrivent le nom d'une ville ou d'un quartier dans leur recherche.",
    deliverables: [
      "Fiche Google Entreprise complète : catégories, services, zone, photos, questions",
      "Audit technique du site : vitesse, structure des titres, données structurées, mobile",
      "Une page par service et par zone principale, écrite pour la recherche réelle",
      "Cohérence du nom, de l'adresse et du téléphone sur les annuaires qui comptent",
      "Suivi des positions sur les expressions qui amènent des clients",
    ],
    measure: [
      "Appels et demandes d'itinéraire issus de la fiche Google",
      "Positions sur les expressions locales visées, pas sur des mots vides de volume",
      "Trafic de recherche non payé vers les pages de service",
    ],
    excluded: [
      "L'achat de liens entrants, qui finit par coûter une pénalité",
      "Les garanties de première position : personne ne contrôle l'algorithme de Google",
      "Le référencement national ou international, hors de mon terrain",
    ],
    price: "Sur soumission. Souvent inclus dans un mandat plus large.",
    intro: [
      "Le SEO local, c'est le levier qui continue de produire quand vous arrêtez de payer. Il est plus lent que la publicité, il demande des fondations propres, et c'est précisément pour ça qu'il est encore accessible : la plupart de vos concurrents ne s'en occupent pas.",
      "Pour une PME du Grand Montréal, la bataille ne se joue pas sur des expressions générales. Elle se joue sur les recherches faites avec une intention immédiate, souvent depuis un téléphone, avec un nom de quartier ou de ville dedans.",
    ],
    sections: [
      {
        heading: "La fiche Google avant le site",
        paragraphs: [
          "Sur une recherche locale, l'encadré de cartes occupe la première chose que voit un utilisateur mobile. Y figurer dépend d'abord de votre fiche Google Entreprise, pas de votre site.",
          "Une fiche qui travaille est une fiche complète : la bonne catégorie principale, les services listés un par un, la zone desservie, des photos récentes, les heures exactes incluant les congés fériés, et les questions fréquentes remplies. Ça se règle en quelques heures et c'est souvent le geste qui donne le résultat le plus rapide de tout un mandat.",
        ],
      },
      {
        heading: "Les fondations techniques",
        paragraphs: [
          "Google sert en priorité les pages qui s'affichent vite sur un téléphone en réseau cellulaire. Un site lourd, mal découpé ou sans structure de titres cohérente part avec un handicap que le contenu ne rattrape pas complètement.",
          "L'audit technique couvre la vitesse de chargement et la stabilité de l'affichage, la hiérarchie des titres, les données structurées qui décrivent votre entreprise et vos services, les balises de titre et de description propres à chaque page, et l'absence de pages orphelines ou dupliquées.",
        ],
      },
      {
        heading: "Une page par intention",
        paragraphs: [
          "Une page « Services » qui liste sept prestations en un paragraphe chacune ne se positionne sur aucune. La solution est d'écrire une page complète par service, et lorsque le volume le justifie, par zone : le service, les cas concrets, les prix ou les fourchettes, les questions fréquentes, et un moyen évident d'entrer en contact.",
          "Ces pages ont un deuxième effet, souvent sous-estimé : elles font baisser le coût de vos publicités. Une annonce qui envoie vers une page précise convertit mieux qu'une annonce qui envoie vers l'accueil, et Meta comme Google récompensent cette pertinence.",
        ],
      },
      {
        heading: "Le temps que ça prend",
        paragraphs: [
          "La fiche Google peut bouger en deux à quatre semaines. Les pages de service demandent généralement trois à six mois avant de se stabiliser dans les résultats, davantage dans un secteur concurrentiel comme le droit ou la rénovation à Montréal.",
          "C'est pour cette raison que je recommande rarement de commencer par le SEO seul. La combinaison qui fonctionne pour une PME : la publicité Meta amène des clients tout de suite, le SEO local réduit la dépendance à ce budget au fil des mois.",
        ],
      },
    ],
    closing:
      "Donnez-moi le nom de votre entreprise et votre ville. Je regarde votre fiche Google et votre site, et je vous dis ce qui manque.",
  },
];

export const servicesBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

export const mainService = services.find((s) => s.tier === "principal")!;
export const supportServices = services.filter((s) => s.tier === "appui");

export const servicesPage = {
  h1: "Un produit principal, trois services en appui",
  metaTitle: "Publicité Meta à Montréal — services d'Alpha Marketing",
  metaDescription:
    "La gestion de publicités Meta pour PME du Grand Montréal, et les trois services qui la rendent moins chère : site web à 500 $, réseaux sociaux, SEO local.",
  intro:
    "Je vends une chose : la gestion de campagnes de publicité Meta. C'est là que je passe mes journées et c'est ce qui produit des résultats en semaines plutôt qu'en mois. Les trois autres services existent parce qu'ils rendent cette publicité moins chère — pas parce qu'il fallait remplir un catalogue.",
  mainLabel: "Le produit",
  supportLabel: "Les services en appui",
  supportIntro:
    "Chacun règle un problème qui fait monter votre coût par client : une page d'arrivée qui ne convertit pas, un profil social endormi que le prospect consulte avant d'appeler, une absence en recherche locale qui vous rend dépendant du budget média.",
  pricingNote:
    "L'offre de site web est affichée en clair parce qu'elle est standardisée. Les mandats de publicité et de contenu ne le sont pas : le budget média, le nombre de tournages et le secteur changent tout. Vous recevez une soumission écrite avant de vous engager à quoi que ce soit.",
} as const;
