import { Container } from "@/components/ui/Container";
import { credibility } from "@/content/home";

/**
 * Pas de logos clients disponibles, donc pas de faux bandeau de logos —
 * et aucun mandat en cours nommé ici. Le bandeau dit à qui je m'adresse,
 * ce qu'un visiteur vérifie en premier : « est-ce qu'il travaille avec
 * des entreprises comme la mienne ? »
 */
export function CredibilityBand() {
  return (
    <div className="border-y border-line bg-ink-sunken">
      <Container className="flex flex-col gap-5 py-7 md:flex-row md:items-center md:gap-10">
        <div data-reveal className="md:shrink-0">
          <p className="font-display text-subtitle font-bold text-bone">
            {credibility.sectorsLabel}
          </p>
          <p className="mt-1 text-small text-mute">{credibility.note}</p>
        </div>

        <ul
          data-reveal
          data-reveal-delay="80"
          className="flex flex-wrap gap-2 md:border-l md:border-line md:pl-10"
        >
          {credibility.sectors.map((sector) => (
            <li
              key={sector}
              className="rounded-full border border-line px-3 py-1.5 text-small text-mist"
            >
              {sector}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
