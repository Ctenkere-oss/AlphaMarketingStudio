import { ButtonLink, TextLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { finalCta } from "@/content/home";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-section">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10
                   bg-[radial-gradient(42rem_22rem_at_50%_100%,var(--color-indigo)_0%,transparent_65%)]
                   opacity-22"
      />
      <Container className="max-w-3xl text-center">
        <h2 data-reveal className="text-display-2 text-bone">
          {finalCta.title}
        </h2>
        <p data-reveal data-reveal-delay="70" className="mx-auto mt-6 max-w-xl text-lead text-mist">
          {finalCta.body}
        </p>
        <div
          data-reveal
          data-reveal-delay="140"
          className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <ButtonLink href={finalCta.cta.href} size="lg">
            {finalCta.cta.label}
          </ButtonLink>
          <TextLink href={finalCta.secondary.href} standalone className="text-small">
            {finalCta.secondary.label}
          </TextLink>
        </div>
      </Container>
    </section>
  );
}
