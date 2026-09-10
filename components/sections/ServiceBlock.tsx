import Link from "next/link";
import type { Service } from "@/content/services";

/**
 * Bloc de la page pilier. Le service phare reçoit un panneau plein
 * cadre ; les autres, une composition plus sobre sur la même grille.
 * Même information, poids visuel différent — c'est le classement
 * commercial qui décide, pas une envie de symétrie.
 */
export function ServiceBlock({ service, featured }: { service: Service; featured?: boolean }) {
  return (
    <article
      id={service.slug}
      data-reveal
      className={
        featured
          ? "surface relative scroll-mt-28 overflow-hidden rounded-frame p-6 sm:p-9 lg:p-11"
          : "scroll-mt-28 border-t border-line pt-10"
      }
    >
      {featured ? <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" /> : null}

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14">
        <div className={featured ? "" : "lg:sticky lg:top-28 lg:self-start"}>
          <div className="flex flex-wrap items-center gap-3">
            <h2
              className={
                featured
                  ? "font-display text-[clamp(1.6rem,1.25rem+1.4vw,2.2rem)] leading-tight font-bold tracking-tight text-bone"
                  : "font-display text-title font-bold text-bone"
              }
            >
              {service.nav}
            </h2>
            {featured ? (
              <span className="rounded-full border border-indigo/45 bg-indigo/12 px-2.5 py-1 text-micro font-semibold text-link">
                Service principal
              </span>
            ) : null}
          </div>

          <p className="mt-4 max-w-md text-lead text-mist">{service.promise}</p>

          <dl className="mt-7 space-y-4 border-t border-line pt-6">
            <div>
              <dt className="text-micro text-mute">Pour qui</dt>
              <dd className="mt-1 max-w-md text-small text-mist">{service.forWhom}</dd>
            </div>
            <div>
              <dt className="text-micro text-mute">Prix</dt>
              <dd className="mt-1 text-small text-bone">{service.price}</dd>
            </div>
          </dl>

          <Link
            href={`/services/${service.slug}`}
            className="mt-5 inline-flex min-h-11 items-center text-small font-semibold text-link
                       underline decoration-link/40 underline-offset-4 transition-colors
                       hover:decoration-link"
          >
            Page complète : {service.nav}
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <h3 className="text-small font-semibold text-bone">Ce que je livre</h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-8">
              {service.deliverables.map((item) => (
                <li key={item} className="relative pl-5 text-small text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.62em] left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-small font-semibold text-bone">Comment on mesure</h3>
            <ul className="mt-4 space-y-2.5">
              {service.measure.map((item) => (
                <li key={item} className="relative pl-5 text-small text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.62em] left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-small font-semibold text-mute">Ce que ça ne couvre pas</h3>
            <ul className="mt-4 space-y-2.5">
              {service.excluded.map((item) => (
                <li key={item} className="relative pl-5 text-small text-mute">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.72em] left-0 h-px w-2.5 bg-line-strong"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
