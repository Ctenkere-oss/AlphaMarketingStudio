# À compléter avant la mise en ligne

Liste consolidée de tout ce que je ne pouvais pas inventer. Chaque ligne indique le fichier et le numéro de ligne.

Pour régénérer cette liste à tout moment :

```bash
npm run todos
```

**Ne mettez pas le site en production tant que la section « Bloquant » n'est pas vide.** Les marqueurs apparaissent en jaune vif sur les pages : ils sont impossibles à manquer, et c'est voulu.

---

## Bloquant — visible sur le site public

### 1. Chiffres de l'étude de cas — Barry Avocat

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

---

## Réglé le 16 septembre

Quatre points de cette liste sont tombés grâce aux informations que vous avez fournies.

| Point | Ce qui a été fait |
|---|---|
| **Photo du fondateur** | Votre portrait est recadré en 4:5 (960 × 1200 px) et affiché en grand sur la page À propos, plus en médaillon sur l'accueil. `public/images/fondateur.webp`. |
| **Année de fondation** | 2024, affichée dans la fiche latérale de la page À propos et écrite dans le premier paragraphe. |
| **Parcours** | Certification Meta en gestion de médias sociaux et marketing, études en gestion marketing à HEC Montréal, et votre rôle de responsable marketing chez Barry Avocat depuis la fondation du cabinet. Le tout est dans `content/about.ts` et repris en données structurées `Person` (`alumniOf`, `hasCredential`). |
| **Nom du client** | Corrigé partout : **Barry Avocat**, et non « Ayram Barry Avocat ». Vos propres publications signent `@barry.avocat` et le logo de vos créas affiche « BARRY AVOCAT ». Dites-le-moi si la raison sociale complète diffère. |

Il reste une chose que je ne peux pas écrire à votre place : **l'anecdote fondatrice**. Le premier paragraphe de la page À propos dit aujourd'hui que vous avez vu le même scénario se répéter chez des PME. C'est vrai mais générique. Si vous avez un mandat, une conversation ou un constat précis qui vous a décidé à lancer le studio en 2024, deux phrases à cet endroit valent mieux que tout le reste de la page. Modifiez le premier paragraphe de `story.paragraphs` dans `content/about.ts`.

## Important — pas encore visible, mais attendu

### 2. URL de repli de votre page de réservation Square

`content/site.ts` → `booking.directUrl`

Le calendrier Square est intégré sur `/reservation`. S'il ne se charge pas — un bloqueur de publicités suffit — la page bascule sur un repli. Il lui manque une valeur : l'adresse publique de votre page de réservation Square.

Où la trouver : dans Square, **Rendez-vous → Canaux en ligne → Site de réservation**. Copiez l'adresse publique et collez-la dans `booking.directUrl`.

Tant que le champ contient le marqueur, le repli n'affiche que votre courriel — ce qui fonctionne, mais fait perdre les gens qui voulaient simplement cliquer.

> **À vérifier après le déploiement.** Je n'ai pas pu tester l'intégration : le réseau de cet environnement de développement bloque `square.site`. Le code est écrit pour les deux comportements possibles du script d'intégration, mais ouvrez `/reservation` sur le site en ligne, cliquez « Afficher le calendrier », et confirmez que le calendrier apparaît. S'il ne s'affiche pas au bout de huit secondes, la page bascule d'elle-même sur le repli — dites-le-moi et j'ajusterai.

### 3. Le guide en PDF

Le tunnel complet est en place : formulaire → double opt-in → courriel de livraison. Il ne manque que le fichier.

1. Rédigez **« Les 7 erreurs qui font brûler un budget Meta Ads »**.
2. Téléversez-le dans Brevo (**Contenu → Médias**).
3. Collez l'URL dans `content/emails/01-livraison-guide.md`, à la place de `LIEN_VERS_LE_PDF`.

### 4. Identifiant TikTok et URL LinkedIn

`content/site.ts` lignes **63** et **68**

Les liens sont **automatiquement masqués** tant que le champ `url` est vide — le site ne montre donc aucun lien mort aujourd'hui. Remplissez-les pour les faire apparaître dans le pied de page, sur la page À propos, sur la page Contact et dans le balisage `sameAs` des données structurées.

Votre profil Instagram a une story à la une « TIKTOK » : l'identifiant est probablement déjà actif.

### 5. Nom de domaine

`content/site.ts` → `url`

J'ai supposé `https://www.alphamarketingstudio.com`. **Cette valeur alimente les URL canoniques, le sitemap et les images Open Graph** — corrigez-la avant le déploiement si le domaine réel diffère. C'est le seul endroit à modifier.

### 6. Téléphone

`content/site.ts` → `phone`

Vide, donc **aucun numéro n'est affiché** et aucun lien `tel:` n'est généré. Remplissez le champ pour l'activer partout d'un coup. Pour une PME locale, un numéro cliquable sur mobile augmente sensiblement les appels — à considérer.

### 7. Clés d'environnement

Voir `.env.example`. Sans elles, le site fonctionne mais **l'infolettre et le formulaire de contact n'expédient rien**.

| Clé | Où l'obtenir |
|---|---|
| `BREVO_API_KEY`, `BREVO_LIST_ID` | app.brevo.com → Settings → API keys |
| `BREVO_DOI_TEMPLATE_ID`, `BREVO_DOI_REDIRECT_URL` | Brevo → Campagnes → Modèles |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | resend.com → API keys, après vérification du domaine |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | dash.cloudflare.com → Turnstile |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_META_PIXEL_ID` | Facultatif — chargés seulement après consentement |

### 8. Séquence de bienvenue dans Brevo

Les quatre courriels sont rédigés dans `content/emails/`. Ils doivent être **collés dans Brevo** et branchés sur un scénario. Mode d'emploi : `content/emails/00-lisez-moi.md`.

---

## Juridique — à faire relire

> **Les textes légaux du site sont des gabarits sérieux, pas des avis juridiques.** Ils ont été rédigés pour une entreprise de services québécoise soumise à la Loi 25 et à la LCAP, mais ils doivent être relus par un professionnel du droit avant d'être considérés comme définitifs. Les quatre passages ci-dessous sont ceux où seul vous — ou votre avocat, ou votre comptable — pouvez trancher.

### 9. Adresse postale d'entreprise
`content/legal.ts` ligne **36**

**La LCAP exige une adresse postale valide dans chaque courriel commercial.** Une case postale convient. Sans elle, votre infolettre n'est pas conforme, même avec le double opt-in.

### 10. Durée de conservation des documents de mandat
`content/legal.ts` ligne **75** — à faire confirmer par votre comptable.

### 11. Inscription à la TPS et à la TVQ
`content/legal.ts` ligne **150** — indiquez si vous êtes inscrit, et si oui, ajoutez vos numéros.

### 12. Clause de limitation de responsabilité
`content/legal.ts` ligne **186** — **à faire relire par un avocat.** Une limitation de responsabilité mal rédigée n'est pas opposable, et c'est précisément la clause qui sert le jour où vous en avez besoin.

### 13. NEQ
`content/site.ts` → `neq`

Vide, donc non affiché. Si vous êtes immatriculé au registre des entreprises du Québec, ajoutez le numéro : il apparaîtra dans le pied de page et renforce la crédibilité auprès des PME.

---

## Décisions commerciales à trancher

### 14. Prix de la gestion publicitaire et du contenu social

Affichés « sur soumission » sur la page Services (`content/services.ts` → champ `price` de chaque service). **Je n'ai fabriqué aucun montant.**

Si vous voulez afficher un « à partir de », c'est un avantage réel face aux agences qui cachent tout — mais c'est votre décision, et elle doit être tenable.

### 15. Seuil de budget publicitaire

Le site indique à plusieurs endroits un plancher d'environ **750 $ par mois** de budget média, et une fourchette de **750 $ à 1 500 $** dans la FAQ. Ce sont des repères de marché défendables, mais ce sont **vos** repères qui doivent y figurer.

Vérifiez et ajustez dans : `content/faq.ts`, `content/services.ts` (page Publicités Meta), `content/blogue/cout-campagne-meta-ads-pme-quebec.md`.

### 16. Engagement de trois mois

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

### 17. Le SEO local reste-t-il dans l'offre ?

Vous avez nommé la publicité Meta comme produit principal, et le site web et la gestion des réseaux sociaux comme services secondaires. Le **SEO local** n'était pas dans votre liste.

Je l'ai laissé parmi les services en appui plutôt que de le supprimer de mon propre chef — retirer un service est une décision commerciale, pas une décision de mise en page. Deux options :

- **Le garder** : rien à faire, c'est l'état actuel.
- **Le retirer** : supprimez son entrée dans `content/services.ts` et son lien dans `content/nav.ts`. La page enfant, l'entrée du sitemap, l'image Open Graph et les blocs de la page Services disparaissent automatiquement.

Le champ `tier` de chaque service (`principal` ou `appui`) pilote toute la hiérarchie visuelle du site. Changer un service de palier suffit à déplacer son traitement, sur l'accueil comme sur la page Services.
