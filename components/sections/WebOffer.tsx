import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { servicesBySlug } from "@/content/services";
import { site } from "@/content/site";

const offer = servicesBySlug["creation-site-web"];

/**
 * Offre de site web.
 *
 * Le prix reçoit le plus grand corps de la page après le titre : c'est
 * le vrai différenciateur face aux agences qui le cachent. Panneau
 * bord à bord au rayon maximal (§2.4).
 */
export function WebOffer() {
  return (
    <Container as="section" id="offre-site-web" className="py-section">
      <div className="relative overflow-hidden rounded-frame border border-line bg-ink-raised">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -right-24 h-[28rem] w-[28rem] rounded-full
                     bg-[radial-gradient(circle,var(--color-violet)_0%,transparent_65%)] opacity-20"
        />

        <div className="relative grid-12 gap-y-shelf p-8 sm:p-12 lg:p-16">
          <div className="col-span-12 lg:col-span-6">
            <p className="text-small text-mute">Service en appui</p>
            <h2 className="mt-5 text-display-2 text-bone">Un site en ligne la semaine prochaine</h2>
            <p className="mt-6 max-w-read text-mist">
              Une publicité qui envoie vers une page d&apos;arrivée molle coûte plus cher, quel que
              soit le ciblage. C&apos;est la raison d&apos;être de cette offre.
            </p>

            <p className="text-gradient mt-shelf font-display text-display-1 leading-[0.9]">
              {site.pricing.website.label}
            </p>
            <p className="mt-4 text-title text-bone">
              forfaitaire, livré en {site.pricing.websiteDeliveryDays} jours ouvrables
            </p>

            <p className="mt-8 max-w-read border-t border-line pt-6 text-small text-mist">
              Puis{" "}
              <strong className="font-semibold text-bone">
                {site.pricing.maintenance.label} par mois
              </strong>{" "}
              pour l&apos;entretien : hébergement, nom de domaine, mises à jour, sauvegardes et les
              petites modifications que vous me demandez en cours d&apos;année. L&apos;entretien est
              facultatif et le site vous appartient.
            </p>

            <div className="mt-shelf flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact" size="lg">
                Réserver ma semaine
              </ButtonLink>
              <ButtonLink href={`/services/${offer.slug}`} size="lg" variant="secondary">
                Le détail complet
              </ButtonLink>
            </div>
          </div>

          <div className="col-span-12 grid gap-shelf sm:grid-cols-2 lg:col-span-5 lg:col-start-8">
            <div>
              <h3 className="text-small font-semibold text-bone">Inclus</h3>
              <ul className="mt-5 space-y-4">
                {offer.deliverables.map((item) => (
                  <li key={item} className="relative pl-6 text-small text-mist">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.6em] left-0 size-1.5 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-small font-semibold text-mute">Pas inclus</h3>
              <ul className="mt-5 space-y-4">
                {offer.excluded.map((item) => (
                  <li key={item} className="relative pl-6 text-small text-mute">
                    <span
                      aria-hidden="true"
                      className="absolute top-[0.75em] left-0 h-px w-3 bg-line-strong"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-micro text-mute">
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
    </Container>
  );
}
