# Phase 1 — Audit

Inventaire de l'existant et cartographie de chaque bloc de copie vers sa nouvelle section.
**Aucun code modifié.** Ce document attend votre confirmation avant la Phase 2.

Référence : `REDESIGN_BRIEF.pdf`. Les renvois `§` pointent vers ses sections.

---

## 1. Ce qui bloque la Phase 2

Six points. Les trois premiers changent la nature du travail, pas seulement son exécution.

### 1.1 Le site contient **une seule image**. Le langage visuel demandé est piloté par l'image.

`public/images/fondateur.webp` est le seul fichier image du dépôt. Les autres visuels ont été retirés à votre demande le 10 septembre, et le héros comme l'étude de cas ont été refaits en typographie pure.

Quatre exigences du brief n'ont donc aucun matériau :

| Exigence | Matériau disponible |
|---|---|
| §2.2 « colonnes d'images décalées » | aucune |
| §2.4 « le média d'une carte grandit de 1.0 à 1.06 au survol » | aucun média dans les cartes |
| §2.5 « parallaxe légère sur les grandes images » | une seule image, dans le bloc À propos |
| §2.5 « révélations de média en clip-path » | idem |

Cuberto, 14islands et obys sont des sites de portfolio : leur mise en page *est* leur imagerie. Ici, il n'y a rien à faire défiler.

**Trois options, à trancher :**

- **A — Assumer le parti typographique.** Les cartes deviennent des panneaux de texte sur les couleurs de marque, et les quatre exigences ci-dessus tombent. C'est cohérent avec le site tel qu'il est, et c'est ce que je recommande.
- **B — Vous fournissez des visuels.** Captures de comptes publicitaires, extraits de créas, photos de tournage. Le langage du brief devient alors intégralement applicable.
- **C — Je génère des panneaux abstraits** dans vos couleurs. Ce sont de **nouveaux assets** : §0.6 gèle ceux qui existent mais ne m'autorise pas à en créer. Il me faut votre accord explicite.

Je n'appliquerai pas ces quatre exigences « à vide » en inventant des visuels de remplissage.

### 1.2 Le bandeau défilant (§2.5) : ni logos, ni statistiques

Le brief propose « logos, noms de services ou statistiques ».

- **Logos clients** : aucun fichier. Un seul client est nommé sur le site (Barry Avocat) et son logo n'est pas dans le dépôt.
- **Statistiques** : les trois chiffres de l'étude de cas sont toujours des emplacements vides (`[[CHIFFRE À CONFIRMER]]` dans `content/home.ts`, lignes 112/116/120). Il n'existe aucun chiffre de résultat publiable sur ce site.
- **Noms de services** : 4 disponibles. **Secteurs** : 6 disponibles.

**Le bandeau ne peut donc afficher que les 4 services et les 6 secteurs**, soit 10 éléments de copie existante. C'est suffisant pour une bande qui défile. Je ne fabriquerai pas de statistiques pour la remplir.

### 1.3 Le curseur (§2.3) veut des étiquettes qui n'existent pas

Le brief donne « View », « Drag » en exemple et autorise « des micro-étiquettes génériques ». Le site est **entièrement en français**. Poser « View » sur un site francophone est une faute ; écrire « Voir » et « Glisser » est de la **copie nouvelle**, que §0.4 m'interdit d'inventer.

**À trancher :** soit le curseur n'affiche que du texte déjà présent (libellés de liens existants), soit vous approuvez explicitement deux mots — je propose **« Voir »** et **« Glisser »**. Dites-le et je les utilise ; sinon le curseur reste muet.

### 1.4 Le tableau de test de créas n'a plus de place dans le héros

Le héros actuel contient un bloc de copie réel : 6 cartes d'angles (`Le prix affiché`, `Le problème d'abord`, `Arrêter de booster`, `La démonstration`, `La question à l'écran`, `L'offre datée`), leurs formats, leurs états, un titre et une légende — une soixantaine de mots.

§2.6 veut une scène WebGL dans le héros, avec seulement le titre et les boutons en DOM par-dessus. Le tableau n'y tient plus.

**Ma proposition :** il devient **sa propre section, juste après le héros**. Rien n'est perdu, et il donne un deuxième moment typographique fort. L'alternative — le supprimer — reviendrait à effacer de la copie, ce que §0.4 interdit. Confirmez le déplacement.

### 1.5 La police plafonne à 700

`app/fonts/space-grotesk-latin.woff2` — axe `wght` **300 → 700**. Manrope : 200 → 800.

§2.1 : « Si la police actuelle n'a pas de graisse lourde disponible, dites-le-moi avant de substituer quoi que ce soit. » **C'est le cas.** Space Grotesk plafonne à Bold ; les références citées utilisent couramment du 800–900.

À 8 rem, du 700 reste imposant — mais un peu moins dense que Cuberto. **Trois options :** garder 700 (aucun risque, aucune approbation nécessaire) ; ajouter une graisse supérieure de la même famille si elle existe en statique ; changer de police d'affichage (interdit sans votre accord, §7).

Je pars sur **700** sauf avis contraire.

### 1.6 Le budget JS est atteignable, mais sans marge

Mesuré sur le build de production, page d'accueil :

| | Actuel | Budget §4 | Marge |
|---|---|---|---|
| JS transféré (desktop) | **163 Ko** | ~250 Ko | ~87 Ko |
| JS transféré (mobile) | **157 Ko** | ~250 Ko | ~93 Ko |

Estimation gzippée des ajouts demandés en §3 : gsap + ScrollTrigger ≈ 36 Ko, framer-motion ≈ 35–50 Ko, lenis ≈ 3 Ko, split-type ≈ 2 Ko → **76 à 91 Ko**.

On atterrit entre **233 et 248 Ko**, c'est-à-dire sur la ligne, avant d'avoir écrit un seul de mes propres composants d'animation.

**Observation :** gsap et framer-motion se recouvrent largement — entrées/sorties, menu, transitions de page. Tout faire en gsap libérerait 35 à 50 Ko de marge. §7 m'interdit de troquer une bibliothèque en silence, donc je demande : **puis-je abandonner framer-motion et tout piloter avec gsap ?** Si vous tenez aux deux, le budget tient quand même, mais il faudra surveiller chaque kilo-octet.

---

## 2. Ligne de base mesurée — le « avant » de la Phase 6

Lighthouse sur build de production, `next start`, page d'accueil. Ces chiffres sont la référence contre laquelle la Phase 6 sera jugée.

| | Perf | A11y | Bonnes pratiques | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| **Desktop** | **100** | 100 | 100 | 100 | 0,6 s | 0 | 0 ms |
| **Mobile** | **98** | 100 | 100 | 100 | 2,5 s | 0 | 50 ms |

Budgets §4 : LCP < 2,5 s desktop et < 3,5 s mobile ✓ · CLS < 0,05 ✓ · TBT < 300 ms desktop ✓

**Ce qu'il faut en retenir :** le site part de 100 en desktop. Tout ce que la refonte ajoute se soustrait de là. Le vrai risque de ce projet n'est pas d'échouer aux budgets, c'est de dégrader un site actuellement parfait.

---

## 3. Inventaire

### 3.1 Routes — gelées par §0.3, aucune ne change

11 pages : `/` · `/services` · `/services/[slug]` (4) · `/a-propos` · `/contact` · `/reservation` · `/merci` · `/blogue` · `/blogue/[slug]` (2) · `/politique-de-confidentialite` · `/conditions-utilisation` · plus `not-found`.

Routes techniques : `/api/contact`, `/api/subscribe`, `sitemap.ts`, `robots.ts`, `icon.tsx`, 6 × `opengraph-image.tsx`.

### 3.2 Jetons de couleur — gelés par §0.1

Tous dans `app/tokens.css`. **Aucune teinte nouvelle ne sera introduite.**

| Rôle | Jeton | Valeur |
|---|---|---|
| Fonds | `ink` / `ink-sunken` / `ink-raised` / `ink-panel` | `#07070b` · `#050509` · `#0d0d15` · `#12121c` |
| Textes | `bone` / `mist` / `mute` | `#e9e9f2` · `#b9b9cc` · `#8a8aa0` |
| Lien | `link` | `#93a4ff` |
| Accents décoratifs | `indigo` / `violet` | `#6366f1` · `#a855f7` |
| Accents porteurs de texte | `indigo-deep` / `violet-deep` | `#4f46e5` · `#7c3aed` |
| Filets | `line` / `line-strong` / `line-faint` | blancs à 9 % · 16 % · 5,5 % |
| États | `warn` / `danger` / `ok` | `#f0b429` · `#ff8b8b` · `#6ee7b7` |

**Conséquence pour §2.4** (« chaque carte sur une couleur de marque ») : la palette ne compte que **deux teintes non neutres**. Les cartes seront majoritairement des neutres sombres avec de l'indigo et du violet en ponctuation. Ce sera plus sobre que les références colorées de Cuberto — c'est la conséquence directe du gel de la palette, pas un renoncement.

### 3.3 Assets

| Fichier | Usage actuel |
|---|---|
| `public/images/fondateur.webp` (960 × 1200) | Page À propos, encart de l'accueil |
| `app/fonts/space-grotesk-latin.woff2` | Titres, axe 300–700 |
| `app/fonts/manrope-latin.woff2` | Texte courant, axe 200–800 |
| `lib/og-fonts/*.ttf` | Génération des cartes Open Graph, serveur seulement |

Le logo est un composant SVG (`components/ui/Logo.tsx`), pas un fichier. §0.2 le gèle : je peux changer sa place et sa taille, pas son dessin.

### 3.4 Copie

~9 900 mots, tous dans `content/`. Aucune chaîne visible n'est codée en dur dans un composant — la refonte peut donc déplacer les blocs sans les retoucher.

| Fichier | Volume |
|---|---|
| `services.ts` | ~3 381 mots |
| `blogue/*.md` (2 articles) | ~2 626 mots |
| `legal.ts` | ~1 455 mots |
| `home.ts` | ~778 mots |
| `about.ts` | ~632 mots |
| `faq.ts` | ~514 mots |
| `site.ts` · `booking.ts` · `nav.ts` | ~530 mots |

---

## 4. Cartographie — chaque bloc vers sa nouvelle section

### 4.1 Accueil

Ordre actuel : Héros · Crédibilité · Problème · Services · Méthode · Étude de cas · Offre 500 $ · À propos · FAQ · Guide · CTA final.

| # | Nouvelle section | Traitement | Blocs de copie repris — **verbatim** |
|---|---|---|---|
| 1 | **Héros 3D** §2.6 | Canvas WebGL derrière, texte en DOM devant | `hero.h1` · `hero.lead` · `hero.ctaPrimary` · `hero.ctaSecondary` · `hero.guideLink` · `hero.assurances` (3) |
| 2 | **Tableau de test** *(à confirmer, cf. 1.4)* | Grille typographique, la séquence actuelle conservée | `hero.creasTitle` · `hero.creas` (6 × angle/format/état) · `hero.creasCaption` · `hero.winnerNote` |
| 3 | **Bandeau défilant** §2.5 | Marquee horizontal | 4 noms de services + `credibility.sectors` (6) |
| 4 | **Le problème** | Blocs décalés, révélation ligne à ligne | `problem.title` · `problem.intro` · `problem.items` (3 × citation + diagnostic) |
| 5 | **Services** §2.4 | Cartes à grand rayon, le service principal dominant | `servicesPage.h1` · `mainLabel` · `supportLabel` · `supportIntro` · `mainService.*` · `supportServices.*` |
| 6 | **Méthode — section épinglée** §2.5 | **L'unique section épinglée de la page** | `method.title` · `method.intro` · `method.steps` (4 × nom/durée/corps) |
| 7 | **Étude de cas** | Pleine largeur | `caseStudy.*` — les 3 `results` restent des emplacements vides tant que les chiffres ne sont pas fournis |
| 8 | **Offre 500 $** | Pleine largeur, typographie du prix conservée | `creation-site-web.deliverables` / `.excluded` · `site.pricing.*` |
| 9 | **À propos** | **La seule image du site** — candidate unique à la parallaxe §2.5 | `aboutShort.title` · `aboutShort.body` (2) · `aboutShort.cta` · `fondateur.webp` |
| 10 | **FAQ** | Accordéon conservé | `faqSection.title` · `faqSection.intro` · `faqs` (6 × question/réponse) |
| 11 | **Guide** | Capture d'infolettre | `guide.title` · `guide.subtitle` · `guide.body` · `guide.bullets` (3) · `guide.cta` |
| 12 | **Pied de page comme conclusion** §2.9 | `finalCta.title` en très grand | `finalCta.*` · `footerNav` · `site.email` · liens sociaux |

**Sur §2.9 :** le brief demande que le pied de page devienne la déclaration finale, avec « le texte de CTA existant en très grand ». `finalCta.title` — « L'audit est gratuit et vous le gardez » — est exactement ce texte. La section CTA actuelle fusionne donc avec le pied de page, sans qu'un mot change.

**Sur les liens sociaux (§2.9) :** un seul est réellement rempli — Instagram. TikTok et LinkedIn sont des emplacements vides dans `content/site.ts`. Le pied de page « grand, calme, assuré » n'aura donc qu'un lien social tant que vous ne fournissez pas les deux autres.

### 4.2 Autres pages

| Page | Traitement | Source de copie |
|---|---|---|
| `/services` | Deux paliers conservés, cartes §2.4 | `services.ts` intégral |
| `/services/[slug]` (4) | Article long, révélation ligne à ligne sur les `h2` | `services.ts` → `intro` · `sections` · `closing` |
| `/a-propos` | Portrait en grand, parallaxe légère | `about.ts` intégral |
| `/contact` | Formulaire intact — §0.5 | `contact/page.tsx` + `validation.ts` |
| `/reservation` | Calendrier Square intact, verrou de consentement conservé | `booking.ts` |
| `/blogue` + 2 articles | Typographie de lecture, mesure ~65ch §2.1 | `blogue/*.md` |
| `/merci`, légales, 404 | Mise à l'échelle typographique seulement | `legal.ts` |

---

## 5. Ce qui est déjà conforme au brief

Bonne nouvelle pour le calendrier :

- **§2.7 Navigation** — l'en-tête fait déjà logo à gauche, menu à droite, fond qui se solidifie au défilement, menu plein écran, piège à focus, `Échap`, `aria-expanded`, verrou de défilement. Tout est testé. Restent l'animation décalée des liens et la présentation.
- **§5 Accessibilité** — 100/100 Lighthouse sur toutes les pages, contrastes documentés et vérifiés, zones tactiles ≥ 44 px, un seul `h1` par page, `prefers-reduced-motion` respecté.
- **§4** — CLS déjà à 0, polices auto-hébergées avec `font-display: swap`, images en WebP avec dimensions explicites.
- **§7** — aucun préchargeur, aucun défilement par saut de section, aucune section épinglée aujourd'hui.

## 6. Un défaut existant que le brief fait ressortir

§2.5 : « Ne jamais livrer `opacity: 0` comme état CSS par défaut que seul le JS peut annuler. »

**Le site viole cette règle aujourd'hui.** `app/globals.css` met `[data-reveal] { opacity: 0 }` sous `prefers-reduced-motion: no-preference`, et c'est un `IntersectionObserver` qui révèle. Si le JS ne s'exécute pas, une bonne partie du contenu reste invisible.

C'est un défaut que j'ai introduit. Il sera corrigé en Phase 2 : états initiaux posés depuis le JS, ou derrière une classe `js-enabled` ajoutée au montage.

## 7. Suivi et mesure — ce qui ne peut pas être vérifié aujourd'hui

§0.5 demande de vérifier que chaque script de suivi fonctionne toujours après la refonte. État réel :

| Système | Aujourd'hui |
|---|---|
| Pixel Meta | Code en place, **`NEXT_PUBLIC_META_PIXEL_ID` vide** — ne se déclenche jamais |
| GA4 | Idem, `NEXT_PUBLIC_GA_ID` vide |
| Formulaire de contact | Code en place, **`RESEND_API_KEY` absente** — répond 502 |
| Infolettre | Code en place, **clés Brevo absentes** — écrit dans les journaux |
| Turnstile | Code en place, clés absentes — vérification ignorée |

Je peux garantir que la **logique** reste intacte et que les appels réseau partent quand les identifiants existent. Je **ne peux pas** vérifier qu'un pixel se déclenche sans identifiant. Si vous voulez cette vérification en Phase 6, fournissez les clés d'ici là.

---

## 8. Ce que j'attends de vous pour démarrer la Phase 2

1. **Imagerie** — option A (typographique), B (vous fournissez) ou C (je génère, avec votre accord) ? *cf. 1.1*
2. **Tableau de test de créas** — devient sa propre section après le héros ? *cf. 1.4*
3. **Étiquettes du curseur** — « Voir » et « Glisser » approuvés, ou curseur muet ? *cf. 1.3*
4. **framer-motion** — puis-je l'abandonner au profit de gsap seul ? *cf. 1.6*
5. **Police** — je reste sur Space Grotesk 700, confirmez. *cf. 1.5*

Les points 1 et 2 changent la structure de la page. Les trois autres se tranchent en une phrase.

Rien ne sera codé avant votre réponse.
