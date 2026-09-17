import { cn } from "@/lib/cn";

type Props = {
  as?: "div" | "section" | "header" | "footer" | "nav" | "main";
  /**
   * `shell` : largeur maximale du site.
   * `read`  : colonne de lecture, bornée à la mesure du §2.1 (~65ch).
   * `bleed` : pleine largeur, sans marge — pour une section volontairement
   *           bord à bord. La marge reste alors à la charge du contenu.
   */
  width?: "shell" | "read" | "bleed";
  className?: string;
  children: React.ReactNode;
};

/**
 * Marge extérieure unique du site.
 *
 * `--spacing-gutter` vaut clamp(1.25rem, 6vw, 8rem) : une seule valeur
 * fluide couvre du téléphone au grand écran, sans point de rupture.
 * C'est la marge large demandée au §2.2.
 */
export function Container({ as: Tag = "div", width = "shell", className, children }: Props) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full",
        width !== "bleed" && "px-gutter",
        width === "shell" && "max-w-shell",
        width === "read" && "max-w-read",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Grille de 12 colonnes du §2.2. Les enfants s'y placent explicitement
 * (`col-span-7`, `col-start-2`…) plutôt que d'empiler des largeurs
 * arbitraires.
 */
export function Grid({
  as: Tag = "div",
  className,
  children,
}: {
  as?: "div" | "ul" | "ol";
  className?: string;
  children: React.ReactNode;
}) {
  return <Tag className={cn("grid-12", className)}>{children}</Tag>;
}
