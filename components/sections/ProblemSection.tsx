import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { problem } from "@/content/home";

/**
 * Trois phrases entendues.
 *
 * Chaque bloc démarre à une colonne différente : le décalage suit la
 * lecture au lieu d'aligner trois rectangles (§2.2). La citation prend
 * le palier display-3, le diagnostic reste en corps sur une mesure de
 * lecture.
 */
const decalages = [
  "lg:col-start-1 lg:col-span-9",
  "lg:col-start-3 lg:col-span-9",
  "lg:col-start-2 lg:col-span-9",
];

export function ProblemSection() {
  return (
    <Container as="section" id="probleme" className="py-section">
      <SectionHeading title={problem.title} intro={problem.intro} />

      <ol className="mt-shelf grid-12 gap-y-shelf">
        {problem.items.map((item, i) => (
          <li key={item.quote} data-reveal className={`col-span-12 ${decalages[i]}`}>
            <div className="grid-12 items-start border-t border-line pt-8">
              <blockquote className="col-span-12 font-display text-display-3 text-bone lg:col-span-5">
                <span aria-hidden="true" className="text-gradient">
                  «&nbsp;
                </span>
                {item.quote}
                <span aria-hidden="true" className="text-gradient">
                  &nbsp;»
                </span>
              </blockquote>
              <p className="col-span-12 mt-6 max-w-read text-mist lg:col-span-6 lg:col-start-7 lg:mt-0">
                {item.diagnosis}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
