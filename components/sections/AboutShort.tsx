import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { aboutShort } from "@/content/home";
import { site } from "@/content/site";

/**
 * À propos, version courte.
 *
 * Le portrait est la seule image de définition confortable du site :
 * c'est donc ici qu'une grande surface photographique est justifiée, et
 * la seule candidate à la parallaxe du §2.5 en Phase 4.
 */
export function AboutShort() {
  return (
    <Container as="section" id="a-propos" className="py-section">
      <div className="grid-12 items-center gap-y-shelf">
        <div data-reveal className="col-span-12 sm:col-span-8 lg:col-span-5">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute -inset-3 -z-10 rounded-frame bg-accent opacity-20"
            />
            <Image
              src={site.founder.photo}
              alt={site.founder.photoAlt}
              width={960}
              height={1200}
              sizes="(min-width: 1024px) 460px, 80vw"
              className="w-full rounded-frame border border-line object-cover"
            />
          </div>
        </div>

        <div data-reveal className="col-span-12 lg:col-span-6 lg:col-start-7">
          <h2 className="text-display-2 text-bone">{aboutShort.title}</h2>
          {aboutShort.body.map((p) => (
            <p key={p} className="mt-6 max-w-read text-lead text-mist">
              {p}
            </p>
          ))}
          <p className="mt-8 text-small text-mute">
            {site.founder.name} — {site.founder.title}
          </p>
          <ButtonLink href={aboutShort.cta.href} variant="secondary" className="mt-shelf">
            {aboutShort.cta.label}
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
