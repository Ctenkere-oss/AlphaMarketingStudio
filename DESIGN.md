# Système de design — Alpha Marketing Studio

Ce document explique **pourquoi** le site a cette allure. Il sert de référence quand vient le temps d'ajouter une page sans casser la cohérence.

---

## 1. Le problème posé

Ce site est la vitrine d'une agence de marketing numérique. Un prospect qui le visite doit se dire : *« si son site est comme ça, mon site sera comme ça ».* Le site **est** le portfolio.

Ça élimine d'entrée la solution la plus courante : le gabarit SaaS générique — grand titre centré avec un mot en dégradé, trois statistiques, quatre cartes identiques, et une apparition en fondu sur chaque section au défilement. C'est reconnaissable en une seconde, et ce que ça signale, c'est qu'on n'a pas eu de point de vue.

---

## 2. Trois principes

### La preuve avant la promesse
Chaque affirmation est adossée à quelque chose de vérifiable : un prix affiché en clair, une liste de livrables, une liste de ce qui **n'est pas** inclus, une méthode décrite étape par étape. Aucun adjectif sans objet. C'est aussi pourquoi aucun chiffre de résultat n'est inventé : les emplacements sont réservés et marqués en jaune tant que le client n'a pas validé ses données.

### Une seule hardiesse
Le tableau de test de créas du héros est le seul moment animé du site. Après lui, tout est calme : surfaces plates, filets d'un pixel, beaucoup de blanc, aucune chorégraphie au survol. Un site qui bouge partout ne met rien en valeur.

### Le prix est du design
`500 $`, `75 $`, `5 jours`, `48 h`. Ces nombres reçoivent un traitement typographique normalement réservé à un titre, parce que l'affichage du prix est le vrai différenciateur face aux agences montréalaises qui le cachent. Un argument commercial mérite un rang typographique.

---

## 3. Le héros : trois concepts envisagés

**A — Le tableau de bord vivant.** Une console montrant une courbe de coût par acquisition qui descend. *Écarté :* impose des chiffres, et le seul moyen honnête aurait été d'inventer des données.

**B — Le tableau de test de créas.** Six angles en test se posent, cinq s'éteignent, un seul reste et récupère le budget des autres. *Retenu.* C'est le métier en une image : on teste beaucoup, on coupe vite, ce qui survit paie le reste.

Première version : des vignettes tirées du compte Instagram du studio. Le client a demandé de retirer toutes les images, le bloc est donc devenu **entièrement typographique** — et il y a gagné. Les cartes nomment des *types d'angle*, pas des publicités reconstituées : le bloc décrit une méthode, il n'affirme rien sur des résultats. Zéro requête image, zéro décalage de mise en page, et l'idée passe plus vite parce qu'on lit « Retirée » et « Active » au lieu de deviner un traitement visuel.

**C — Le brief qui devient campagne.** Une séquence typographique transformant la phrase d'un propriétaire en structure de campagne. *Écarté :* trop conceptuel, ne montre aucun travail réel.

### La révision critique
Le premier jet du concept B animait aussi le texte du héros — accroche et paragraphe en fondu-remontée. Deux raisons de l'avoir retiré : ça fait attendre le lecteur pour voir la phrase qui décide s'il reste, et ça retarde le plus grand élément affiché (LCP) de près d'une seconde. Le mouvement est maintenant réservé à la grille, qui est le propos. Le texte est là à la première image.

---

## 4. Couleurs

L'ADN de la maquette d'origine est conservé : noir bleuté profond, dégradé indigo → violet, filet clair sur les bordures.

| Jeton | Valeur | Rôle | Contraste sur `--color-ink` |
|---|---|---|---|
| `--color-ink` | `#07070b` | Fond principal | — |
| `--color-ink-sunken` | `#050509` | Pied de page, sections en retrait | — |
| `--color-ink-raised` | `#0d0d15` | Surfaces surélevées | — |
| `--color-ink-panel` | `#12121c` | Panneaux internes, champs | — |
| `--color-bone` | `#e9e9f2` | Texte principal | **15,7:1** — AAA |
| `--color-mist` | `#b9b9cc` | Texte secondaire | **10,1:1** — AAA |
| `--color-mute` | `#8a8aa0` | Légendes, texte tertiaire | **5,9:1** — AA |
| `--color-link` | `#93a4ff` | Liens en ligne | **8,4:1** — AAA |
| `--color-indigo` | `#6366f1` | Accent décoratif | 4,2:1 — **jamais sur du petit texte** |
| `--color-violet` | `#a855f7` | Accent décoratif | 5,0:1 |
| `--color-indigo-deep` | `#4f46e5` | Boutons — blanc dessus | **6,2:1** — AA |
| `--color-violet-deep` | `#7c3aed` | Boutons — blanc dessus | **5,7:1** — AA |

### Correction apportée à la maquette
Le dégradé `#6366f1 → #a855f7` de la maquette est superbe, mais du texte blanc à 16 px posé dessus donne **3,95:1** à l'extrémité violette — sous le seuil AA de 4,5:1 pour du texte courant. Les boutons utilisent donc un second dégradé, assombri (`--color-indigo-deep → --color-violet-deep`), qui passe le AA sur toute sa longueur. Le dégradé d'origine reste employé partout où il ne porte pas de petit texte : filets, halos, puces, chiffres de grande taille.

**Règle à retenir :** `--color-indigo` ne porte jamais de texte sous 30 px. Le texte en dégradé (`text-gradient`) est réservé aux tailles d'affichage.

---

## 5. Typographie

Deux familles, auto-hébergées en `woff2` variable via `next/font/local` — aucune requête vers Google, un aller-retour réseau de moins avant le LCP, et rien à déclarer côté vie privée.

- **Space Grotesk 700** — titres et chiffres. Interlettrage négatif (`-0.02` à `-0.032em`) : à grande taille, l'espacement par défaut paraît lâche.
- **Manrope 400/500/600** — texte courant. Bonne hauteur d'x, lisible à 14 px sur fond noir.

Échelle fluide en `clamp()`, bornée à 1440 px. Chaque palier porte sa propre hauteur de ligne et son interlettrage, pour qu'aucune valeur ne soit décidée dans le JSX.

| Jeton | Min → max | Usage |
|---|---|---|
| `text-display-1` | 40 → 64 px | h1 de l'accueil, un seul par site |
| `text-display-2` | 34 → 52 px | h1 des pages intérieures |
| `text-title` | 28 → 40 px | Titres de section |
| `text-subtitle` | 20 → 24 px | Titres de bloc |
| `text-lead` | 17 → 20 px | Chapô, texte long |
| `text-body` | 16 px | Corps |
| `text-small` | 14 px | Listes, légendes de bloc |
| `text-micro` | 13 px | Métadonnées |

---

## 6. Mise en page

Largeur maximale `76rem` (`--container-shell`). Colonne de lecture `42rem` (`--container-read`) : au-delà de 75 caractères par ligne, l'œil perd le début de la ligne suivante.

**Aucune grille de quatre cartes identiques.** La hiérarchie visuelle suit la hiérarchie commerciale, qui compte deux paliers : un produit vendu, et trois services qui existent pour le rendre moins cher.

Le champ `tier` de `content/services.ts` (`principal` ou `appui`) est la source de cette hiérarchie. Changer un service de palier déplace son traitement visuel sur l'accueil comme sur la page Services.

```
┌──────────────────────────────────────────────────────────┐
│  Publicités Meta            [ Service principal ]        │  ← panneau plein cadre,
│  ────────────────────────────────────────────────────    │    filet en dégradé,
│  Promesse                   ┌ Structure de compte ┐      │    schéma interne
│  • livrable                 │  Campagne           │      │
│  • livrable                 │   └ Audience large  │      │
│  • livrable                 │   └ Reciblage       │      │
│  Lien vers la page          └─────────────────────┘      │
└──────────────────────────────────────────────────────────┘
  Création de site web   Promesse…      500 $, 5 jours       ← rangées séparées
 ───────────────────────────────────────────────────────      par un filet,
  Gestion des réseaux    Promesse…      Instagram, TikTok     pas des cartes
 ───────────────────────────────────────────────────────
  SEO local              Promesse…      Montréal, Laval
```

Quatre rectangles au même rayon et à la même ombre auraient dit au visiteur que les quatre services se valent. Ils ne se valent pas.

---

## 7. Mouvement

Une seule séquence orchestrée, au chargement du héros, en CSS pur :

```
0 ms ─────────── 1,2 s ──────── 1,45 s ─── 1,55 s ── 1,75 s
   les cartes se posent  │  les écartées  │  la gagnante  │  sa
   (décalage de 95 ms)   │  s'éteignent   │  remonte      │  mention
```

Les cartes écartées s'éteignent par leur **surface** — bordure, fond, échelle — jamais par l'opacité de leur texte. Un `opacity: 0.28` sur une carte typographique ferait tomber le libellé sous le seuil AA, alors que ce libellé porte du sens. Les angles écartés restent lisibles à 5,9:1.

Partout ailleurs : une révélation discrète au défilement, pilotée par **un seul** `IntersectionObserver` monté dans le layout — pas un par composant. Aucune bibliothèque d'animation : le gain ne justifiait pas le poids.

`prefers-reduced-motion: reduce` désactive tout, durées **et délais**. La composition finale reste lisible : les perdantes sont grises, la gagnante est en avant, simplement sans transition.

---

## 8. Accessibilité

- Contrastes vérifiés, pas supposés (tableau § 4).
- Focus clavier visible partout : contour `--color-link` de 2 px, décalé de 3 px. Jamais supprimé.
- Menu mobile : `aria-expanded`, `aria-controls`, fermeture à `Échap`, piège à focus, verrou du défilement.
- Accordéon de la FAQ en boutons ARIA (`aria-expanded` + `aria-controls`), pas en `<details>` stylé.
- Champs de formulaire : `aria-invalid` et `aria-describedby` câblés sur les messages d'erreur et les indications.
- Zones tactiles ≥ 44 px, y compris pour les petits contrôles (utilitaire `tap-safe`).
- Lien d'évitement en premier élément focusable.
- Un seul `<h1>` par page, hiérarchie de titres sans saut.

Lighthouse mobile : **100 en accessibilité** sur toutes les pages testées.

---

## 9. Ce qui a été volontairement évité

| Marqueur de site généré | Ce qui a été fait à la place |
|---|---|
| Étiquette en MAJUSCULES ESPACÉES au-dessus de chaque titre | Une ligne en casse normale, précédée d'un filet en dégradé, et seulement sur trois sections |
| Un mot du titre coloré « pour faire du style » | Le dégradé sert aux nombres et aux grandes surfaces, jamais à un mot isolé |
| Une flèche `→` à la fin de chaque lien | Soulignement au décalage contrôlé ; les rangées cliquables s'éclairent au survol |
| Chaînes de méta jointes par des points médians | Virgules, ou colonnes séparées dans la grille |
| Fondu-remontée sur chaque section | Une seule séquence, dans le héros |
| Ombre grise molle sous tous les blocs | Filets d'un pixel et surfaces surélevées de quelques points de luminosité |
| Emojis en guise d'icônes | Lucide, et du SVG dessiné à la main pour la marque |
| Faux témoignages, logos clients empruntés | Le seul mandat réel est nommé ; sinon, les secteurs desservis |
| Photo d'illustration achetée en banque d'images | Une seule image sur tout le site : le portrait du fondateur. Les autres blocs sont typographiques |

---

## 10. Où modifier quoi

| Ce que vous voulez changer | Fichier |
|---|---|
| Couleurs, tailles de texte, espacements, rayons | `app/tokens.css` |
| Coordonnées, liens sociaux, prix, ville | `content/site.ts` |
| Textes de l'accueil | `content/home.ts` |
| Services, livrables, pages enfants | `content/services.ts` |
| Questions de la FAQ | `content/faq.ts` |
| Page À propos | `content/about.ts` |
| Pages légales | `content/legal.ts` |
| Articles de blogue | `content/blogue/*.md` |
| Courriels de bienvenue | `content/emails/*.md` |
| Palier d'un service (principal / appui) | `content/services.ts`, champ `tier` |

Aucun texte visible n'est codé en dur dans un composant. Vous devez pouvoir changer un titre sans lire une ligne de JSX.
