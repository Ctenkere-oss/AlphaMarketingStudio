import { Container } from "@/components/ui/Container";
import { credibility } from "@/content/home";

/**
 * Pas de logos clients disponibles, donc pas de faux bandeau de logos.
 * On nomme le mandat réel, puis les secteurs. Une ligne honnête vaut
 * mieux que six logotypes gris empruntés.
 */
export function CredibilityBand() {
  return (
    <div className="border-y border-line bg-ink-sunken">
      <Container className="grid gap-8 py-8 md:grid-cols-[auto_1fr] md:items-center md:gap-12">
        <div data-reveal>
          <p className="text-micro text-mute">{credibility.title}</p>
          <p className="mt-2 font-display text-subtitle text-bone">{credibility.client.name}</p>
          <p className="mt-1 max-w-sm text-small text-mist">{credibility.client.detail}</p>
          <p className="mt-1 max-w-sm text-small text-mute">{credibility.client.role}</p>
        </div>

        <div data-reveal data-reveal-delay="80" className="md:border-l md:border-line md:pl-12">
          <p className="text-micro text-mute">{credibility.sectorsLabel}</p>
          <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
            {credibility.sectors.map((sector) => (
              <li
                key={sector}
                className="rounded-full border border-line px-3 py-1.5 text-small text-mist"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  );
}
