import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { method } from "@/content/home";

/**
 * Méthode en quatre étapes.
 *
 * C'est la section qui sera épinglée en Phase 4 — la seule de la page,
 * comme l'exige le §2.5. Le balisage est déjà prévu pour ça : un
 * conteneur, une liste d'étapes numérotées, rien qui dépende de la
 * hauteur naturelle du flux.
 *
 * La numérotation est justifiée ici et nulle part ailleurs : c'est une
 * séquence réelle où l'ordre change le résultat.
 */
export function MethodSection() {
  return (
    <Container as="section" id="methode" className="py-section">
      <div className="grid-12">
        <SectionHeading
          title={method.title}
          intro={method.intro}
          className="col-span-12 lg:col-span-6"
        />
      </div>

      <ol data-method-steps className="mt-shelf grid-12 gap-y-shelf">
        {method.steps.map((step, i) => (
          <li
            key={step.name}
            data-reveal
            className="col-span-12 border-t border-line pt-8 md:col-span-6 lg:col-span-3"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span
                aria-hidden="true"
                className="text-gradient font-display text-display-2 leading-none"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-micro text-mute">{step.duration}</span>
            </div>
            <h3 className="mt-8 font-display text-display-3 text-bone">{step.name}</h3>
            <p className="mt-5 text-mist">{step.body}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}
