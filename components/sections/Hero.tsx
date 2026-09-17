import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { hero } from "@/content/home";

/**
 * Héros.
 *
 * Le titre occupe neuf des douze colonnes : à l'échelle display-1, une
 * demi-colonne le faisait tomber sur six lignes. Sur toute la largeur
 * il en prend trois ou quatre, ce qui est le rapport recherché.
 *
 * Le fond reste l'ambiance CSS du site. Le poster statique et la scène
 * WebGL du §2.6 arrivent en Phase 5 ; les poser ici reviendrait à
 * décider du rendu 3D avant d'avoir validé la mise en page.
 *
 * Aucune animation : la Phase 3 est statique par construction.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-shelf pb-section">
      <div className="backdrop-halo" aria-hidden="true" />
      <div className="backdrop-grid" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="grid-12">
          <h1 className="col-span-12 text-display-1 text-bone lg:col-span-11">{hero.h1}</h1>

          {/* Décrochage volontaire : le chapô ne commence pas au même
              bord que le titre (§2.2, mises en page asymétriques). */}
          <p className="col-span-12 mt-shelf text-lead text-mist md:col-span-8 lg:col-span-5 lg:col-start-2">
            {hero.lead}
          </p>

          <div className="col-span-12 mt-10 flex flex-col gap-5 sm:flex-row sm:items-center lg:col-span-10 lg:col-start-2">
            <ButtonLink href={hero.ctaPrimary.href} size="lg">
              {hero.ctaPrimary.label}
            </ButtonLink>
            <ButtonLink href={hero.ctaSecondary.href} size="lg" variant="secondary">
              {hero.ctaSecondary.label}
            </ButtonLink>
            <TextLink href={hero.guideLink.href} standalone className="text-mute hover:text-mist">
              {hero.guideLink.label}
            </TextLink>
          </div>
        </div>
      </Container>

      {/* Bande de réassurance, bord à bord : elle ferme le héros. */}
      <Container className="relative z-10 mt-shelf">
        <ul className="grid-12 border-t border-line pt-6">
          {hero.assurances.map((item) => (
            <li key={item} className="col-span-12 py-2 text-title text-mist sm:col-span-4">
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
