# Alpha Marketing Studio — site web

Site vitrine d'Alpha Marketing Studio, studio d'acquisition numérique à Montréal, spécialisé en **publicités Meta pour PME**. La création de sites web, la gestion des réseaux sociaux et le SEO local y sont présentés comme des services en appui.

Le site ne contient **aucune image** : les blocs qui en porteraient habituellement une — le héros, l'étude de cas, la page À propos — sont typographiques. Les seuls fichiers image sont générés par le code (cartes de partage Open Graph et favicon) et n'apparaissent pas dans les pages.
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · déploiement Vercel.

- **Conception et raisons des choix** → [`DESIGN.md`](./DESIGN.md)
- **Ce qu'il reste à compléter avant la mise en ligne** → [`A-COMPLETER.md`](./A-COMPLETER.md)

---

## Démarrage

```bash
npm install
cp .env.example .env.local     # puis remplir les clés, voir plus bas
npm run dev                    # http://localhost:3000
```

Le site fonctionne **sans aucune clé** en développement : les inscriptions à l'infolettre sont écrites dans les journaux du serveur, le formulaire de contact signale qu'il n'a pas pu expédier, et le widget anti-robot ne s'affiche pas.

### Commandes

| Commande | Ce qu'elle fait |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (vérifie aussi les types) |
| `npm run start` | Sert le build de production |
| `npm run typecheck` | TypeScript seul |
| `npm run lint` | ESLint |
| `npm run todos` | **Liste tous les `[[À COMPLÉTER]]` restants** — à faire avant chaque mise en ligne |
| `npm run check:seo` | Vérifie titres, descriptions, `h1`, canoniques et JSON-LD sur le serveur local |

---

## Variables d'environnement

Toutes documentées dans [`.env.example`](./.env.example). En production, saisissez-les dans **Vercel → Project → Settings → Environment Variables**.

| Variable | Obligatoire | Pour quoi |
|---|---|---|
| `BREVO_API_KEY` | Infolettre | Clé d'API Brevo |
| `BREVO_LIST_ID` | Infolettre | Identifiant numérique de la liste |
| `BREVO_DOI_TEMPLATE_ID` | Infolettre | Modèle de courriel de double opt-in |
| `BREVO_DOI_REDIRECT_URL` | Infolettre | Page d'arrivée après confirmation |
| `RESEND_API_KEY` | Contact | Clé d'API Resend |
| `CONTACT_FROM_EMAIL` | Contact | Expéditeur, sur un domaine vérifié chez Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Recommandé | Clé publique Cloudflare Turnstile |
| `TURNSTILE_SECRET_KEY` | Recommandé | Clé secrète Turnstile |
| `NEXT_PUBLIC_GA_ID` | Facultatif | Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Facultatif | Pixel Meta |

> Les scripts de mesure ne sont chargés **qu'après** acceptation de la bannière de consentement. Avant ça, aucun témoin non essentiel n'est déposé (Loi 25).

---

## Déploiement sur Vercel

1. Poussez le dépôt sur GitHub.
2. Sur [vercel.com](https://vercel.com) → **Add New → Project** → importez le dépôt.
   Vercel détecte Next.js tout seul : ne changez ni la commande de build, ni le dossier de sortie.
3. **Settings → Environment Variables** : collez les clés du tableau ci-dessus, pour *Production* et *Preview*.
4. **Deploy.**

### Brancher le nom de domaine

1. Achetez le domaine (Namecheap, OVH, Google Domains — peu importe).
2. Vercel → **Settings → Domains → Add** → saisissez `alphamarketingstudio.com`.
3. Chez votre registraire, créez les enregistrements que Vercel affiche :

   | Type | Nom | Valeur |
   |---|---|---|
   | `A` | `@` | `76.76.21.21` |
   | `CNAME` | `www` | `cname.vercel-dns.com` |

   *(Vercel affiche les valeurs exactes à jour dans l'écran Domains — utilisez celles-là.)*
4. La propagation DNS prend de quelques minutes à 48 h. Le certificat HTTPS est émis automatiquement ensuite.
5. **Dès que le domaine est en ligne**, changez `url` dans [`content/site.ts`](./content/site.ts) : ce champ alimente les URL canoniques, le sitemap et les images Open Graph. C'est la seule valeur à modifier.
6. Choisissez le domaine principal dans Vercel (avec ou sans `www`) et laissez l'autre rediriger vers lui.

---

## Où modifier chaque texte

Aucun texte visible n'est codé en dur dans un composant.

| Ce que vous voulez changer | Fichier |
|---|---|
| Courriel, téléphone, ville, liens sociaux, **prix** | `content/site.ts` |
| **Palier d'un service** (produit principal ou service en appui) | `content/services.ts`, champ `tier` |
| Menu de navigation, pied de page | `content/nav.ts` |
| Accueil : accroche, problème, méthode, étude de cas, guide | `content/home.ts` |
| Services : promesses, livrables, exclusions, pages complètes | `content/services.ts` |
| Questions de la FAQ | `content/faq.ts` |
| Page À propos | `content/about.ts` |
| Politique de confidentialité, conditions d'utilisation | `content/legal.ts` |
| Articles de blogue | `content/blogue/*.md` |
| Couleurs, tailles, espacements | `app/tokens.css` |

### Ajouter un article de blogue

Créez `content/blogue/mon-article.md` :

```markdown
---
title: "Le titre complet de l'article"
metaTitle: "Titre pour l'onglet — 50 à 60 caractères"
description: "Description pour Google — 140 à 160 caractères."
published: "2026-05-12"
tags: ["Publicité Meta"]
lead: "La phrase d'accroche affichée sous le titre et dans l'index."
---

Le contenu en Markdown. Les `##` deviennent la table des matières.
```

Le sommaire, la page, l'entrée dans l'index, le sitemap et l'image Open Graph sont générés automatiquement. Le nom du fichier devient l'URL — en minuscules, sans accents, avec des traits d'union.

---

## Changer d'outil d'infolettre

Tout le site appelle `subscribe(email, source)` et rien d'autre. Pour passer de Brevo à MailerLite, ConvertKit ou Mailchimp :

1. Ouvrez [`lib/newsletter.ts`](./lib/newsletter.ts).
2. Écrivez un nouvel objet qui implémente `NewsletterProvider` (trois méthodes : `name`, `isConfigured()`, `subscribe()`), en vous inspirant de l'objet `brevo` juste au-dessus.
3. Changez la ligne `const provider: NewsletterProvider = brevo;` pour votre nouvel objet.
4. Mettez à jour `.env.example`.

**Aucun composant ni aucune route à toucher.** Le double opt-in doit rester activé : c'est ce qui constitue la preuve de consentement exigée par la LCAP.

### Configurer Brevo la première fois

1. **Contacts → Listes** → créez « Infolettre — Alpha Marketing Studio », notez l'identifiant → `BREVO_LIST_ID`.
2. **Contacts → Attributs** → ajoutez `SOURCE` (texte) et `LANGUE` (texte). Le site remplit `SOURCE` automatiquement avec le point de capture (`hero`, `footer`, `guide-accueil`, `blogue:slug`, `formulaire-contact`).
3. **Campagnes → Modèles** → créez un modèle de confirmation de double opt-in, notez son identifiant → `BREVO_DOI_TEMPLATE_ID`.
4. **Automatisations** → créez le scénario de bienvenue avec les quatre courriels de [`content/emails/`](./content/emails/). Le mode d'emploi est dans `content/emails/00-lisez-moi.md`.
5. Vérifiez sur un envoi test que le pied de page contient bien le nom de l'entreprise, une **adresse postale valide** et un lien de désabonnement fonctionnel.

---

## Le guide en PDF (aimant principal)

Le tunnel est complet et fonctionnel — il ne manque que le fichier.

1. Rédigez le PDF « Les 7 erreurs qui font brûler un budget Meta Ads ».
2. Téléversez-le dans Brevo (**Contenu → Médias**), pas dans ce dépôt : un PDF hébergé chez Brevo permet de suivre les téléchargements et évite d'alourdir le site.
3. Collez son URL dans `content/emails/01-livraison-guide.md`, à la place de `LIEN_VERS_LE_PDF`.

---

## Structure du projet

```
app/                    Routes (App Router)
  api/contact/          Envoi du formulaire — Resend, Turnstile, limitation de débit
  api/subscribe/        Inscription à l'infolettre
  services/[slug]/      Quatre pages enfants, générées depuis content/services.ts
  blogue/[slug]/        Articles, générés depuis content/blogue/*.md
  fonts/                Polices auto-hébergées (woff2 variable)
  tokens.css            Jetons de design — source unique de vérité
  globals.css           Base, motifs récurrents, animations
components/
  ui/                   Bouton, Conteneur, Section, Champ, Accordéon, Logo…
  sections/             Sections de page
  layout/               En-tête, pied de page, lien d'évitement
content/                Tout le texte du site
lib/                    SEO, JSON-LD, infolettre, courriel, validation, blogue
scripts/                todos.mjs, check-seo.mjs
```

---

## Sécurité et conformité — ce qui est déjà en place

- Aucune clé d'API dans le navigateur : tout passe par des Route Handlers.
- Formulaires protégés par un champ pot-de-miel, une limitation de débit par adresse IP et Cloudflare Turnstile.
- Validation Zod côté serveur **et** côté client, avec le même schéma.
- Bannière de consentement Loi 25 : refuser est aussi simple qu'accepter, et rien n'est déposé avant le choix.
- Double opt-in obligatoire pour l'infolettre (LCAP).
- Case d'inscription à l'infolettre jamais cochée d'avance.
- En-têtes de sécurité HTTP configurés dans `next.config.ts`.
- `/merci` et `/api/` exclus de l'indexation.

> Les textes légaux sont des **gabarits sérieux, pas des avis juridiques**. Faites-les relire par un professionnel du droit avant la mise en ligne, en particulier les passages surlignés en jaune sur les pages.

---

## Performance

Mesuré avec Lighthouse en mode mobile sur le build de production :

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Accueil | 96 | 100 | 100 | 100 |
| Services | 97 | 100 | 100 | 100 |
| Publicités Meta | 97 | 100 | 100 | 100 |
| À propos | 98 | 100 | 100 | 100 |
| Contact | 98 | 100 | 100 | 100 |
| Blogue | 99 | 100 | 100 | 100 |
| Article de blogue | 98 | 100 | 100 | 100 |

`CLS = 0` sur les sept pages. Le LCP réellement observé en local est d'environ 110 ms ; la valeur *simulée* par Lighthouse (2,3 à 2,8 s) vient de son modèle de 4G lente appliqué à un serveur local sans HTTP/2, sans Brotli et sans CDN. **Refaites la mesure sur le domaine réel après le déploiement** : ces trois éléments changent significativement le chiffre.

### Autres vérifications passées

- **Clavier** : lien d'évitement en premier arrêt, contour de focus visible partout, 60 arrêts de tabulation parcourus sans blocage, menu mobile avec piège à focus et fermeture à `Échap` qui rend le focus au bouton.
- **Zones tactiles** : toutes ≥ 44 px sur six pages vérifiées à 390 px.
- **Débordement horizontal** : aucun, sur dix pages à 390 px.
- **`prefers-reduced-motion`** : la composition finale du héros est en place dès le premier rendu, aucun contenu n'est masqué.
- **Formulaires** : validation en français y compris sur valeur trafiquée, pot-de-miel silencieux (le robot reçoit « merci », pas une erreur qui nomme le champ), limitation de débit fonctionnelle.
- **JSON-LD** : valide sur toutes les pages, entités liées par `@id`.
