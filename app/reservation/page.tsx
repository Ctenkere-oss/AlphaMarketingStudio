import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SquareBooking } from "@/components/SquareBooking";
import { booking } from "@/content/booking";
import { site } from "@/content/site";

const PATH = "/reservation";

export const metadata: Metadata = buildMetadata({
  title: booking.metaTitle,
  description: booking.metaDescription,
  path: PATH,
});

export default function ReservationPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Réservation", path: PATH },
          ]),
        ]}
      />

      <div className="relative isolate overflow-hidden">
        <div className="backdrop-halo opacity-55" aria-hidden="true" />
        <Container className="relative z-10 pt-12 pb-6">
          <Breadcrumbs
            trail={[
              { name: "Accueil", path: "/" },
              { name: "Réservation", path: PATH },
            ]}
          />
          <h1 className="max-w-2xl text-display-2 text-bone">{booking.h1}</h1>
          <p className="mt-6 max-w-2xl text-lead text-mist">{booking.lead}</p>
        </Container>
      </div>

      <Container className="grid items-start gap-12 py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:py-16">
        <SquareBooking />

        <aside className="space-y-10">
          <section>
            <h2 className="text-small font-semibold text-bone">{booking.during.title}</h2>
            <ul className="mt-4 space-y-3">
              {booking.during.items.map((item) => (
                <li key={item} className="relative pl-5 text-small text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.62em] left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-small font-semibold text-bone">{booking.prepare.title}</h2>
            <ul className="mt-4 space-y-3">
              {booking.prepare.items.map((item) => (
                <li key={item} className="relative pl-5 text-small text-mist">
                  <span
                    aria-hidden="true"
                    className="absolute top-[0.62em] left-0 size-1.5 rounded-full bg-accent"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="border-t border-line pt-8">
            <h2 className="text-small font-semibold text-mute">{booking.notThis.title}</h2>
            <p className="mt-3 text-small text-mute">{booking.notThis.body}</p>
          </section>

          <section className="rounded-card border border-line bg-ink-raised p-5">
            <h2 className="font-display text-subtitle font-bold text-bone">{booking.altTitle}</h2>
            <p className="mt-2 text-small text-mist">{booking.altBody}</p>
            <ButtonLink href="/contact" variant="secondary" className="mt-5">
              Passer par le formulaire
            </ButtonLink>
            <p className="mt-4 text-micro text-mute">
              {site.hours}. Français et anglais.
            </p>
          </section>
        </aside>
      </Container>
    </>
  );
}
