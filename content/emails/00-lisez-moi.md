# Séquence de bienvenue — mode d'emploi

Quatre courriels, à coller dans Brevo sous **Automatisations → Nouveau scénario → Un contact rejoint une liste**.

| Fichier | Envoi | Objet |
|---|---|---|
| `01-livraison-guide.md` | Immédiat, après confirmation du double opt-in | Votre guide est en pièce jointe |
| `02-erreur-la-plus-couteuse.md` | J+2 | L'erreur qui coûte le plus cher en publicité Meta |
| `03-etude-de-cas.md` | J+5 | Comment un cabinet d'avocats publie comme un média |
| `04-audit-gratuit.md` | J+8 | Je regarde votre compte, gratuitement |

## Règles à respecter dans Brevo

1. **Le scénario démarre après la confirmation**, jamais à l'inscription. Le double opt-in est la preuve de consentement exigée par la LCAP.
2. **Le pied de page de chaque courriel doit contenir** : le nom de l'entreprise, une adresse postale valide, et un lien de désabonnement fonctionnel en un clic. Brevo l'ajoute automatiquement — vérifiez-le sur un envoi test avant d'activer le scénario.
3. **Le guide en PDF** doit être téléversé dans Brevo (Contenu → Médias) et lié depuis le courriel 1. Ne l'envoyez pas en pièce jointe : les pièces jointes nuisent à la délivrabilité.
4. **Personnalisation** : `{{ contact.PRENOM }}` si vous collectez le prénom. La séquence ci-dessous est écrite pour fonctionner **sans** prénom, parce que le formulaire ne le demande pas.
5. **L'attribut `SOURCE`** est rempli automatiquement par le site (`hero`, `footer`, `guide-accueil`, `blogue:slug`, `formulaire-contact`). Utilisez-le pour segmenter : quelqu'un venu d'un article de blogue n'a pas la même maturité qu'une personne venue du formulaire de contact.

## Ton

Court. Utile avant d'être promotionnel. Trois courriels sur quatre n'ont rien à vendre. C'est ce qui fait que le quatrième est lu.
