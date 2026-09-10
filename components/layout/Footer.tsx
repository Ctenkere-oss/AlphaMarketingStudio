import Link from "next/link";
import { footerNav } from "@/content/nav";
import { site, socialLinks } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { TextLink } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-ink-sunken">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Logo className="h-10 w-10" />
            <p className="mt-5 font-display text-subtitle text-bone">
              Une infolettre courte, deux fois par mois.
            </p>
            <p className="mt-3 text-small text-mist">
              Ce que je vois passer dans les comptes publicitaires que je gère : ce qui coûte cher,
              ce qui fonctionne encore, ce qui a cessé de fonctionner. Rien à vendre dans neuf
              courriels sur dix.
            </p>
            <NewsletterForm
              source="footer"
              cta="Je m'inscris"
              className="mt-6"
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="font-display text-small font-bold text-bone">{group.title}</h2>
                {/* Zones tactiles de 44 px : le pied de page est
                    consulté au pouce, sur un téléphone. */}
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

        <hr className="rule-gradient my-12" />

        <div className="flex flex-col gap-6 text-micro text-mute md:flex-row md:items-end md:justify-between">
          <div className="space-y-1.5">
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
              <ul className="flex flex-wrap gap-x-5">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center text-mist transition-colors
                                 hover:text-bone"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            <p>© {year} {site.legalName}. Tous droits réservés.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
