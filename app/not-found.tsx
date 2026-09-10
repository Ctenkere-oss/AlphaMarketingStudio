import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Page introuvable | Alpha Marketing Studio",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="backdrop-halo opacity-60" aria-hidden="true" />
      <div className="backdrop-grid" aria-hidden="true" />

      <Container className="relative z-10 max-w-2xl py-24 lg:py-32">
        <p className="text-gradient font-display text-[clamp(4rem,2.5rem+6vw,7rem)] leading-none font-bold tracking-tight">
          404
        </p>
        <h1 className="mt-6 text-display-2 text-bone">Cette page n&apos;existe pas</h1>
        <p className="mt-5 text-lead text-mist">
          Un lien brisé, une adresse mal recopiée, ou une page que j&apos;ai retirée. Dans tous les
          cas, ce n&apos;est pas de votre faute — et ça se répare en un clic.
        </p>

        <nav aria-label="Pages principales" className="mt-10">
          <h2 className="text-small font-semibold text-bone">Ce que vous cherchiez, peut-être</h2>
          <ul className="mt-4 border-t border-line">
            {services.map((service) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={`/services/${service.slug}`}
                  className="block py-3.5 text-small text-mist transition-colors hover:text-bone"
                >
                  {service.nav}
                </Link>
              </li>
            ))}
            <li className="border-b border-line">
              <Link
                href="/blogue"
                className="block py-3.5 text-small text-mist transition-colors hover:text-bone"
              >
                Le blogue
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Retour à l&apos;accueil
          </ButtonLink>
          <ButtonLink href="/contact" size="lg" variant="secondary">
            M&apos;écrire
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
