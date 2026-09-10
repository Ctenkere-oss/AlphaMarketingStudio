import { Section, SectionHeading } from "@/components/ui/Section";
import { problem } from "@/content/home";

/**
 * Trois phrases entendues, pas trois « pain points ». Le guillemet
 * fait le travail que ferait une icône, sans ajouter de pictogramme.
 */
export function ProblemSection() {
  return (
    <Section id="probleme">
      <SectionHeading title={problem.title} intro={problem.intro} />

      <ol className="mt-14 space-y-12 lg:space-y-14">
        {problem.items.map((item, i) => (
          <li
            key={item.quote}
            data-reveal
            data-reveal-delay={i * 90}
            className="grid gap-5 border-t border-line pt-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-14"
          >
            <blockquote className="font-display text-[clamp(1.35rem,1.05rem+1.1vw,1.9rem)] leading-[1.2] font-bold tracking-tight text-bone">
              <span aria-hidden="true" className="text-gradient">
                «&nbsp;
              </span>
              {item.quote}
              <span aria-hidden="true" className="text-gradient">
                &nbsp;»
              </span>
            </blockquote>
            <p className="max-w-[62ch] text-mist">{item.diagnosis}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
