import Link from "next/link";
import { footerNav } from "@/content/nav";
import { finalCta } from "@/content/home";
import { site, socialLinks } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink, TextLink } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

/**
 * Pied de page traité comme la déclaration finale du site (§2.9).
 *
 * Le bloc d'appel à l'action qui vivait en section séparée est remonté
 * ici : son titre prend le plus grand corps de la page. Aucun mot ne
 * change, et la section autonome disparaît des pages qui l'affichaient
 * pour éviter de le dire deux fois.
 *
 * Un seul lien social est affiché parce qu'un seul est renseigné —
 * TikTok et LinkedIn restent vides dans content/site.ts.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-line bg-ink-sunken">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem]
                   bg-[radial-gradient(60rem_26rem_at_50%_100%,var(--color-indigo)_0%,transparent_68%)]
                   opacity-20"
      />

      <Container className="py-section">
        {/* La déclaration finale. */}
        <div className="grid-12">
          <h2 data-reveal className="col-span-12 text-display-1 text-bone lg:col-span-10">
            {finalCta.title}
          </h2>
          <p
            data-reveal
            className="col-span-12 mt-shelf max-w-read text-lead text-mist lg:col-span-6 lg:col-start-2"
          >
            {finalCta.body}
          </p>
          <div
            data-reveal
            className="col-span-12 mt-10 flex flex-col gap-4 sm:flex-row sm:items-center lg:col-start-2"
          >
            <ButtonLink href={finalCta.cta.href} size="lg">
              {finalCta.cta.label}
            </ButtonLink>
            <TextLink href={finalCta.secondary.href} standalone>
              {finalCta.secondary.label}
            </TextLink>
          </div>
        </div>

        <hr className="rule-gradient mt-shelf mb-shelf" />

        <div className="grid-12 gap-y-shelf">
          <div className="col-span-12 max-w-read lg:col-span-4">
            <p className="font-display text-display-3 text-bone">
              Une infolettre courte, deux fois par mois.
            </p>
            <p className="mt-5 text-small text-mist">
              Ce que je vois passer dans les comptes publicitaires que je gère : ce qui coûte cher,
              ce qui fonctionne encore, ce qui a cessé de fonctionner. Rien à vendre dans neuf
              courriels sur dix.
            </p>
            <NewsletterForm source="footer" cta="Je m'inscris" className="mt-8" />
          </div>

          <div className="col-span-12 grid gap-shelf sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h3 className="text-small font-semibold text-bone">{group.title}</h3>
                <ul className="mt-2">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="inline-flex min-h-11 items-center text-small text-mist
                                   transition-colors hover:text-bone"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-shelf flex flex-col gap-6 border-t border-line pt-8 text-micro text-mute md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-mist">
              {site.name} — {site.tagline}.
            </p>
            <p>
              {site.city}, {site.regionName}. Dessert {site.areaServed.slice(0, 3).join(", ")} et la
              Rive-Nord.
            </p>
            <p>
              <TextLink href={`mailto:${site.email}`} standalone className="text-mute hover:text-mist">
                {site.email}
              </TextLink>
              {site.phone ? (
                <>
                  {" — "}
                  <TextLink
                    href={`tel:${site.phone.replace(/\s/g, "")}`}
                    standalone
                    className="text-mute hover:text-mist"
                  >
                    {site.phone}
                  </TextLink>
                </>
              ) : null}
            </p>
            {site.neq ? <p>NEQ {site.neq}</p> : null}
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            {socialLinks.length ? (
              <ul className="flex flex-wrap gap-x-6">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-mist transition-colors hover:text-bone"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <p>
              © {year} {site.legalName}. Tous droits réservés.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
