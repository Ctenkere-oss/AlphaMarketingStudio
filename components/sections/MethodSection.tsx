import { Section, SectionHeading } from "@/components/ui/Section";
import { method } from "@/content/home";

/**
 * La numérotation est justifiée ici, et seulement ici : c'est une
 * séquence réelle où l'ordre change le résultat.
 */
export function MethodSection() {
  return (
    <Section id="methode">
      <SectionHeading title={method.title} intro={method.intro} />

      <ol className="mt-14 grid gap-px overflow-hidden rounded-frame border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
        {method.steps.map((step, i) => (
          <li
            key={step.name}
            data-reveal
            data-reveal-delay={i * 80}
            className="bg-ink-raised p-6 lg:p-7"
          >
            <div className="flex items-baseline justify-between gap-3">
              <span
                aria-hidden="true"
                className="text-gradient font-display text-[2.6rem] leading-none font-bold tracking-tight"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-micro text-mute">{step.duration}</span>
            </div>
            <h3 className="mt-5 font-display text-subtitle font-bold text-bone">{step.name}</h3>
            <p className="mt-3 text-small text-mist">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
