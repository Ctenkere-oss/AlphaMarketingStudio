# À compléter avant la mise en ligne

Liste consolidée de tout ce que je ne pouvais pas inventer. Chaque ligne indique le fichier et le numéro de ligne.

Pour régénérer cette liste à tout moment :

```bash
npm run todos
```

**Ne mettez pas le site en production tant que la section « Bloquant » n'est pas vide.** Les marqueurs apparaissent en jaune vif sur les pages : ils sont impossibles à manquer, et c'est voulu.

---

## Bloquant — visible sur le site public

### 1. Chiffres de l'étude de cas — Ayram Barry Avocat

`content/home.ts` lignes **112**, **116**, **120**

| Emplacement | Ce qu'il faut |
|---|---|
| Croissance de l'audience | Abonnés gagnés sur la période, Instagram et TikTok |
| Portée des publications | Comptes atteints par mois, moyenne sur trois mois |
| Demandes de consultation | Demandes attribuées aux réseaux sociaux |

**Deux conditions avant de publier ces chiffres :**

1. **L'accord écrit du client.** Un courriel suffit, mais il en faut un.
2. **Les données exactes**, extraites des comptes — pas une estimation de mémoire.

Si le client refuse ou si les données ne sont pas extractibles, **supprimez simplement le bloc `results`** dans `content/home.ts` : la section fonctionne très bien sans, parce que le reste de l'étude de cas est qualitatif et vérifiable. Un tableau de résultats vide vaut mieux qu'un tableau de résultats inventé.

> Ne remplacez jamais ces marqueurs par une approximation flatteuse. Un faux résultat sur la vitrine d'une agence est un risque légal autant que réputationnel — et c'est exactement le genre de chose qu'un prospect vérifie.

### 2. Votre parcours et l'anecdote fondatrice

`content/about.ts` lignes **15** et **16**

C'est la partie de la page À propos que les prospects lisent en entier. Deux paragraphes :

- **Ligne 15** — votre parcours avant le studio : formation, emplois, premiers mandats. Deux ou trois phrases concrètes, pas un CV.
- **Ligne 16** — l'anecdote fondatrice : le mandat, la conversation ou le constat précis qui vous a décidé à vous lancer. Une histoire vraie vaut dix arguments.

### 3. Année de fondation du studio

`content/about.ts` ligne **57**

### 4. Photo du fondateur — retirée à votre demande

Il n'y a plus **aucune image** sur le site. La page À propos et l'encart de l'accueil affichent à la place une carte typographique portant votre nom, votre titre et vos coordonnées de travail.

Si vous voulez rétablir le portrait plus tard : redonnez un champ `photo` et `photoAlt` à `founder` dans `content/site.ts`, puis remettez un `<Image>` dans `app/a-propos/page.tsx` et `components/sections/AboutShort.tsx`. Format visé : portrait 4:5, au moins 640 × 800 px, en `.webp`.

> Les seules images restantes sont **générées par le code** : les cartes de partage Open Graph (`app/**/opengraph-image.tsx`) et le favicon. Elles n'apparaissent pas sur le site — elles servent quand un lien est partagé sur LinkedIn, Facebook ou en messagerie. Dites-le-moi si vous voulez les retirer aussi, mais ça coûterait cher en taux de clic.

### 5. Nom exact du client de l'étude de cas

`content/home.ts` → `credibility.client.name` et `caseStudy.client`

J'ai utilisé **« Ayram Barry Avocat »**, tel qu'indiqué dans le brief. Les créas visibles sur votre Instagram affichent **« BARRY AVOCAT »**. Vérifiez la forme exacte à employer publiquement et corrigez aux deux endroits.

---

## Important — pas encore visible, mais attendu

### 6. Le guide en PDF

Le tunnel complet est en place : formulaire → double opt-in → courriel de livraison. Il ne manque que le fichier.

1. Rédigez **« Les 7 erreurs qui font brûler un budget Meta Ads »**.
2. Téléversez-le dans Brevo (**Contenu → Médias**).
3. Collez l'URL dans `content/emails/01-livraison-guide.md`, à la place de `LIEN_VERS_LE_PDF`.

### 7. Identifiant TikTok et URL LinkedIn

`content/site.ts` lignes **63** et **68**

Les liens sont **automatiquement masqués** tant que le champ `url` est vide — le site ne montre donc aucun lien mort aujourd'hui. Remplissez-les pour les faire apparaître dans le pied de page, sur la page À propos, sur la page Contact et dans le balisage `sameAs` des données structurées.

Votre profil Instagram a une story à la une « TIKTOK » : l'identifiant est probablement déjà actif.

### 8. Nom de domaine

`content/site.ts` → `url`

J'ai supposé `https://www.alphamarketingstudio.com`. **Cette valeur alimente les URL canoniques, le sitemap et les images Open Graph** — corrigez-la avant le déploiement si le domaine réel diffère. C'est le seul endroit à modifier.

### 9. Téléphone

`content/site.ts` → `phone`

Vide, donc **aucun numéro n'est affiché** et aucun lien `tel:` n'est généré. Remplissez le champ pour l'activer partout d'un coup. Pour une PME locale, un numéro cliquable sur mobile augmente sensiblement les appels — à considérer.

### 10. Clés d'environnement

Voir `.env.example`. Sans elles, le site fonctionne mais **l'infolettre et le formulaire de contact n'expédient rien**.

| Clé | Où l'obtenir |
|---|---|
| `BREVO_API_KEY`, `BREVO_LIST_ID` | app.brevo.com → Settings → API keys |
| `BREVO_DOI_TEMPLATE_ID`, `BREVO_DOI_REDIRECT_URL` | Brevo → Campagnes → Modèles |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | resend.com → API keys, après vérification du domaine |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | dash.cloudflare.com → Turnstile |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Facultatif — chargés seulement après consentement |

### 11. Séquence de bienvenue dans Brevo

Les quatre courriels sont rédigés dans `content/emails/`. Ils doivent être **collés dans Brevo** et branchés sur un scénario. Mode d'emploi : `content/emails/00-lisez-moi.md`.

---

## Juridique — à faire relire

> **Les textes légaux du site sont des gabarits sérieux, pas des avis juridiques.** Ils ont été rédigés pour une entreprise de services québécoise soumise à la Loi 25 et à la LCAP, mais ils doivent être relus par un professionnel du droit avant d'être considérés comme définitifs. Les quatre passages ci-dessous sont ceux où seul vous — ou votre avocat, ou votre comptable — pouvez trancher.

### 12. Adresse postale d'entreprise
`content/legal.ts` ligne **36**

**La LCAP exige une adresse postale valide dans chaque courriel commercial.** Une case postale convient. Sans elle, votre infolettre n'est pas conforme, même avec le double opt-in.

### 13. Durée de conservation des documents de mandat
`content/legal.ts` ligne **75** — à faire confirmer par votre comptable.

### 14. Inscription à la TPS et à la TVQ
`content/legal.ts` ligne **150** — indiquez si vous êtes inscrit, et si oui, ajoutez vos numéros.

### 15. Clause de limitation de responsabilité
`content/legal.ts` ligne **186** — **à faire relire par un avocat.** Une limitation de responsabilité mal rédigée n'est pas opposable, et c'est précisément la clause qui sert le jour où vous en avez besoin.

### 16. NEQ
`content/site.ts` → `neq`

Vide, donc non affiché. Si vous êtes immatriculé au registre des entreprises du Québec, ajoutez le numéro : il apparaîtra dans le pied de page et renforce la crédibilité auprès des PME.

---

## Décisions commerciales à trancher

### 17. Prix de la gestion publicitaire et du contenu social

Affichés « sur soumission » sur la page Services (`content/services.ts` → champ `price` de chaque service). **Je n'ai fabriqué aucun montant.**

Si vous voulez afficher un « à partir de », c'est un avantage réel face aux agences qui cachent tout — mais c'est votre décision, et elle doit être tenable.

### 18. Seuil de budget publicitaire

Le site indique à plusieurs endroits un plancher d'environ **750 $ par mois** de budget média, et une fourchette de **750 $ à 1 500 $** dans la FAQ. Ce sont des repères de marché défendables, mais ce sont **vos** repères qui doivent y figurer.

Vérifiez et ajustez dans : `content/faq.ts`, `content/services.ts` (page Publicités Meta), `content/blogue/cout-campagne-meta-ads-pme-quebec.md`.

### 19. Engagement de trois mois

La FAQ mentionne un « engagement moral de trois mois » au début d'un mandat publicitaire. Confirmez que ça correspond à votre pratique — c'est le genre de phrase qu'un client vous citera.

---

## Vérification finale avant la mise en ligne

```bash
npm run todos        # doit afficher : aucun marqueur restant
npm run typecheck    # aucune erreur
npm run lint         # aucune erreur
npm run build        # doit passer
npm run start        # puis, dans un autre terminal :
npm run check:seo    # titres, descriptions, h1, canoniques, JSON-LD
```

Puis, une fois le site déployé :

- [ ] Testez le formulaire de contact de bout en bout — vous devez **recevoir le courriel** et atterrir sur `/merci`.
- [ ] Testez l'inscription à l'infolettre — vous devez **recevoir le courriel de confirmation**, puis le guide.
- [ ] Vérifiez que le lien de désabonnement fonctionne en un clic.
- [ ] Passez le site au [validateur de résultats enrichis de Google](https://search.google.com/test/rich-results).
- [ ] Soumettez `sitemap.xml` dans la Google Search Console.
- [ ] Refaites une mesure Lighthouse **sur le domaine réel** : les chiffres seront meilleurs qu'en local.
- [ ] Vérifiez le site sur un vrai téléphone, pas seulement dans le simulateur du navigateur.

---

## Question ouverte sur la nouvelle hiérarchie

### 20. Le SEO local reste-t-il dans l'offre ?

Vous avez nommé la publicité Meta comme produit principal, et le site web et la gestion des réseaux sociaux comme services secondaires. Le **SEO local** n'était pas dans votre liste.

Je l'ai laissé parmi les services en appui plutôt que de le supprimer de mon propre chef — retirer un service est une décision commerciale, pas une décision de mise en page. Deux options :

- **Le garder** : rien à faire, c'est l'état actuel.
- **Le retirer** : supprimez son entrée dans `content/services.ts` et son lien dans `content/nav.ts`. La page enfant, l'entrée du sitemap, l'image Open Graph et les blocs de la page Services disparaissent automatiquement.

Le champ `tier` de chaque service (`principal` ou `appui`) pilote toute la hiérarchie visuelle du site. Changer un service de palier suffit à déplacer son traitement, sur l'accueil comme sur la page Services.
