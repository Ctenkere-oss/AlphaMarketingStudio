import { credibility } from "@/content/home";
import { services } from "@/content/services";

/**
 * Bande horizontale du §2.5.
 *
 * Elle ne peut afficher que ce qui existe : les quatre services et les
 * six secteurs. Pas de logos clients — aucun n'est dans le dépôt — et
 * pas de statistiques, les chiffres de l'étude de cas étant toujours
 * vides. C'était relevé en Phase 1.
 *
 * Statique ici. Le défilement continu arrive en Phase 4, avec une
 * translation sur `transform` uniquement.
 */
export function Marquee() {
  const items = [...services.map((s) => s.nav), ...credibility.sectors];

  return (
    <section
      aria-label={credibility.sectorsLabel}
      className="overflow-hidden border-y border-line bg-ink-sunken py-shelf"
    >
      {/* Une seule ligne, débordement masqué : la Phase 4 n'aura qu'à
          translater cette piste sur `transform`. La liste est doublée
          pour que la bande reste pleine pendant la boucle. */}
      <ul data-marquee-track className="flex w-max items-center gap-10">
        {[...items, ...items].map((item, i) => (
          <li key={`${item}-${i}`} className="flex items-center gap-10" aria-hidden={i >= items.length}>
            <span className="font-display text-display-3 whitespace-nowrap text-mute">{item}</span>
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent opacity-60" />
          </li>
        ))}
      </ul>
    </section>
  );
}
