import { Section } from "@/components/ui/Section";
import { Marked } from "@/components/ui/Marked";
import { ButtonLink } from "@/components/ui/Button";
import { caseStudy } from "@/content/home";

/**
 * Étude de cas volontairement qualitative.
 *
 * Aucun chiffre n'est affiché tant que le client ne les a pas validés :
 * un « ×4,2 de ROI » inventé sur la vitrine d'une agence est un risque
 * légal autant que réputationnel. Les emplacements sont réservés et
 * marqués — voir A-COMPLETER.md.
 */
export function CaseStudySection() {
  return (
    <Section id="etude-de-cas" tone="sunken">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-4 flex items-center gap-3 text-small text-mute">
            <span aria-hidden="true" className="h-px w-8 bg-accent" />
            {caseStudy.eyebrow}
          </p>
          <h2 className="text-title text-bone">{caseStudy.title}</h2>
          <p className="mt-3 font-display text-subtitle text-link">{caseStudy.client}</p>
          <p className="mt-5 max-w-md text-mist">{caseStudy.context}</p>
          <p className="mt-4 max-w-md border-l-2 border-line-strong pl-4 text-small text-mute">
            {caseStudy.adsLink}
          </p>

          <ul className="mt-8 max-w-sm divide-y divide-line border-y border-line">
            {caseStudy.formats.map((format) => (
              <li key={format} className="py-3 text-small text-mist">
                {format}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal data-reveal-delay="90">
          <h3 className="text-small font-semibold text-bone">Ce qui a été fait</h3>
          <ul className="mt-5 space-y-4 border-t border-line pt-5">
            {caseStudy.work.map((item) => (
              <li key={item} className="relative pl-5 text-mist">
                <span
                  aria-hidden="true"
                  className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 text-small font-semibold text-bone">Résultats</h3>
          <p className="mt-3 max-w-lg text-small text-mute">{caseStudy.outcomeIntro}</p>

          <dl className="mt-6 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
            {caseStudy.results.map((result) => (
              <div key={result.label} className="bg-ink-raised p-4">
                <dt className="text-micro text-mute">{result.label}</dt>
                <dd className="mt-2 text-small">
                  <Marked text={result.note} />
                </dd>
              </div>
            ))}
          </dl>

          <ButtonLink href="/contact" variant="secondary" className="mt-10">
            Discuter d&apos;un mandat semblable
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
