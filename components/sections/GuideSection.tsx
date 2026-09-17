import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { guide } from "@/content/home";

export function GuideSection() {
  return (
    <section id="guide" className="border-y border-line-faint bg-ink-sunken py-section">
      <Container>
        <div className="grid-12 gap-y-shelf">
          <div data-reveal className="col-span-12 lg:col-span-6">
            <h2 className="text-display-2 text-bone">{guide.title}</h2>
            <p className="mt-6 font-display text-display-3 text-mist">{guide.subtitle}</p>
            <p className="mt-8 max-w-read text-mist">{guide.body}</p>
            <ul className="mt-8 space-y-4">
              {guide.bullets.map((item) => (
                <li key={item} className="relative max-w-read pl-6 text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.65em] left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            className="col-span-12 h-fit rounded-frame border border-line bg-ink-raised p-8 lg:col-span-5 lg:col-start-8"
          >
            <p className="font-display text-display-3 text-bone">Le guide arrive dans votre boîte</p>
            <p className="mt-5 text-small text-mist">
              Vous recevez d&apos;abord un courriel de confirmation. Le guide suit immédiatement
              après, puis trois courriels répartis sur huit jours. Ensuite, l&apos;infolettre, deux
              fois par mois.
            </p>
            <NewsletterForm source="guide-accueil" cta={guide.cta} layout="stack" className="mt-8" />
          </div>
        </div>
      </Container>
    </section>
  );
}
