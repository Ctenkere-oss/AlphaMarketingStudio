import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { aboutShort } from "@/content/home";
import { site } from "@/content/site";

export function AboutShort() {
  return (
    <Section id="a-propos">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] lg:gap-16">
        <div data-reveal className="relative">
          <span
            aria-hidden="true"
            className="absolute -inset-2 -z-10 rounded-frame bg-accent opacity-20"
          />
          <Image
            src={site.founder.photo}
            alt={site.founder.photoAlt}
            width={960}
            height={1200}
            sizes="(min-width: 1024px) 340px, 80vw"
            className="w-full rounded-frame border border-line object-cover"
          />
        </div>

        <div data-reveal data-reveal-delay="80">
          <h2 className="text-title text-bone">{aboutShort.title}</h2>
          {aboutShort.body.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-[62ch] text-lead text-mist">
              {paragraph}
            </p>
          ))}
          <p className="mt-6 text-small text-mute">
            {site.founder.name} — {site.founder.title}
          </p>
          <ButtonLink href={aboutShort.cta.href} variant="secondary" className="mt-7">
            {aboutShort.cta.label}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
