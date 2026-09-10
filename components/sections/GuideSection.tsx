import { Section } from "@/components/ui/Section";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { guide } from "@/content/home";

/**
 * Aimant principal. Le guide est offert ici et rappelé discrètement
 * dans le héros — deux points de contact, aucune fenêtre surgissante.
 */
export function GuideSection() {
  return (
    <Section id="guide" tone="sunken">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div data-reveal>
          <h2 className="text-title text-bone">{guide.title}</h2>
          <p className="mt-3 font-display text-subtitle text-mist">{guide.subtitle}</p>
          <p className="mt-6 max-w-lg text-mist">{guide.body}</p>

          <ul className="mt-7 space-y-3">
            {guide.bullets.map((item) => (
              <li key={item} className="relative max-w-lg pl-5 text-small text-mist">
                <span
                  aria-hidden="true"
                  className="absolute top-[0.62em] left-0 size-1.5 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-reveal
          data-reveal-delay="90"
          className="surface h-fit rounded-frame p-6 sm:p-8 lg:sticky lg:top-28"
        >
          <p className="font-display text-subtitle font-bold text-bone">
            Le guide arrive dans votre boîte
          </p>
          <p className="mt-2 text-small text-mist">
            Vous recevez d&apos;abord un courriel de confirmation. Le guide suit immédiatement
            après, puis trois courriels répartis sur huit jours. Ensuite, l&apos;infolettre,
            deux fois par mois.
          </p>
          <NewsletterForm source="guide-accueil" cta={guide.cta} layout="stack" className="mt-6" />
        </div>
      </div>
    </Section>
  );
}
