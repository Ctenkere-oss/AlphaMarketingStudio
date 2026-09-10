import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { aboutShort } from "@/content/home";
import { site } from "@/content/site";

export function AboutShort() {
  return (
    <Section id="a-propos">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-16">
        {/* Panneau typographique à la place du portrait : la signature
            du fondateur porte la même fonction de présence. */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-frame border border-line bg-ink-raised p-7"
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-accent" />
          <p className="font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] leading-tight font-bold tracking-tight text-bone">
            {site.founder.name}
          </p>
          <p className="mt-2 text-small text-mist">{site.founder.title}</p>
          <p className="mt-6 border-t border-line pt-5 text-micro text-mute">
            {site.city}, {site.regionName} — travaille en français et en anglais
          </p>
        </div>

        <div data-reveal data-reveal-delay="80">
          <h2 className="text-title text-bone">{aboutShort.title}</h2>
          {aboutShort.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[62ch] text-lead text-mist">
              {paragraph}
            </p>
          ))}
          <ButtonLink href={aboutShort.cta.href} variant="secondary" className="mt-7">
            {aboutShort.cta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
