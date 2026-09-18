import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
  id?: string;
  /** `sunken` distingue une section sans la transformer en carte. */
  tone?: "default" | "sunken";
  /** `bleed` retire la marge latérale : section volontairement bord à bord. */
  width?: "shell" | "read" | "bleed";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

/**
 * Enveloppe de section unique.
 *
 * Elle porte le rythme vertical du site — `--spacing-section`, soit
 * clamp(4rem, 2rem + 8vw, 12.5rem) : environ 64 px sur téléphone,
 * 150 px à 1440 px, plafonné à 200 px. C'est la respiration demandée au
 * §2.2, et aucune section ne doit la comprimer pour faire tenir plus de
 * contenu.
 */
export function Section({
  id,
  tone = "default",
  width = "shell",
  className,
  containerClassName,
  children,
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-section",
        tone === "sunken" && "bg-ink-sunken border-y border-line-faint",
        className,
      )}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

type HeadingProps = {
  /** Petite ligne d'intention. En casse normale : pas d'étiquette en majuscules espacées. */
  label?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  as?: "h1" | "h2";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  intro,
  as: Tag = "h2",
  align = "left",
  className,
}: HeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {label ? (
        <p data-reveal className="mb-6 flex items-center gap-3 text-small text-mute">
          <span aria-hidden="true" className="h-px w-8 bg-accent" />
          {label}
        </p>
      ) : null}
      {/* Les titres de section prennent le palier display-2 du §2.1. */}
      {/* `data-split` révèle le titre ligne à ligne. Jamais sur un h1
          de héros : c'est l'élément LCP, il doit être peint tout de
          suite (§4). */}
      <Tag
        data-split={Tag === "h2" ? "" : undefined}
        className={cn(Tag === "h1" ? "text-display-1" : "text-display-2", "text-bone")}
      >
        {title}
      </Tag>
      {intro ? (
        <p data-reveal className="mt-6 max-w-read text-lead text-mist">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
