import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { servicesBySlug } from "@/content/services";
import { site } from "@/content/site";

const offer = servicesBySlug["creation-site-web"];

/**
 * Le prix est le différenciateur : il reçoit donc le traitement
 * typographique d'un titre, pas d'une ligne de tableau. La plupart
 * des agences montréalaises cachent leurs tarifs ; l'afficher en
 * gros est un argument avant d'être une décoration.
 */
export function WebOffer() {
  return (
    <Section id="offre-site-web">
      <div className="relative overflow-hidden rounded-frame border border-line bg-ink-raised">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full
                     bg-[radial-gradient(circle,var(--color-violet)_0%,transparent_65%)] opacity-22"
        />

        <div className="relative p-6 sm:p-10 lg:p-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
            <div data-reveal>
              <p className="mb-4 text-small text-mute">Service en appui</p>
              <h2 className="text-title text-bone">Un site en ligne la semaine prochaine</h2>
              <p className="mt-4 max-w-md text-small text-mist">
                Une publicité qui envoie vers une page d&apos;arrivée molle coûte plus cher, quel
                que soit le ciblage. C&apos;est la raison d&apos;être de cette offre.
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-x-5 gap-y-2">
                <p className="text-gradient font-display text-[clamp(3.5rem,2.2rem+5.6vw,6rem)] leading-[0.92] font-bold tracking-[-0.04em]">
                  {site.pricing.website.label}
                </p>
                <div className="pb-2">
                  <p className="text-subtitle text-bone">forfaitaire</p>
                  <p className="text-small text-mist">
                    livré en {site.pricing.websiteDeliveryDays} jours ouvrables
                  </p>
                </div>
              </div>

              <p className="mt-6 max-w-md border-t border-line pt-5 text-small text-mist">
                Puis <strong className="font-semibold text-bone">{site.pricing.maintenance.label} par mois</strong>{" "}
                pour l&apos;entretien : hébergement, nom de domaine, mises à jour, sauvegardes et
                les petites modifications que vous me demandez en cours d&apos;année.
                L&apos;entretien est facultatif et le site vous appartient.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Réserver ma semaine
                </ButtonLink>
                <ButtonLink href={`/services/${offer.slug}`} size="lg" variant="secondary">
                  Le détail complet
                </ButtonLink>
              </div>
            </div>

            <div data-reveal data-reveal-delay="90" className="grid gap-8 sm:grid-cols-2 lg:gap-10">
              <div>
                <h3 className="text-small font-semibold text-bone">Inclus</h3>
                <ul className="mt-4 space-y-3">
                  {offer.deliverables.map((item) => (
                    <li key={item} className="relative pl-5 text-small text-mist">
                      <span
                        aria-hidden="true"
                        className="absolute top-2 left-0 size-1.5 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-small font-semibold text-mute">Pas inclus</h3>
                <ul className="mt-4 space-y-3">
                  {offer.excluded.map((item) => (
                    <li key={item} className="relative pl-5 text-small text-mute">
                      <span
                        aria-hidden="true"
                        className="absolute top-[0.72em] left-0 h-px w-2.5 bg-line-strong"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-micro text-mute">
                  Si votre projet tombe dans cette colonne, je vous le dis avant de commencer.{" "}
                  <TextLink href="/contact" className="text-mute hover:text-mist">
                    Écrivez-moi
                  </TextLink>
                  , je vous oriente même si ce n&apos;est pas vers moi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
