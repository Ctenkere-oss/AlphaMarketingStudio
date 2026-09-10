import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
  id?: string;
  /** `sunken` distingue une section sans la transformer en carte. */
  tone?: "default" | "sunken";
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
};

export function Section({ id, tone = "default", className, containerClassName, children }: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-section",
        tone === "sunken" && "bg-ink-sunken border-y border-line-faint",
        className,
      )}
    >
      <Container className={containerClassName}>{children}</Container>
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
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      data-reveal
    >
      {label ? (
        <p className="mb-4 flex items-center gap-3 text-small text-mute">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-accent"
          />
          {label}
        </p>
      ) : null}
      <Tag className={Tag === "h1" ? "text-display-2 text-bone" : "text-title text-bone"}>
        {title}
      </Tag>
      {intro ? <div className="mt-5 text-lead text-mist">{intro}</div> : null}
    </div>
  );
}
