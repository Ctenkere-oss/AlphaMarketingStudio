import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-control font-sans font-semibold " +
  "transition-[background-color,border-color,color,box-shadow] duration-200 " +
  "disabled:cursor-not-allowed disabled:opacity-55";

const variants: Record<Variant, string> = {
  /* Dégradé assombri : le blanc dessus tient le AA sur toute la longueur. */
  primary:
    "bg-accent-deep text-white " +
    "shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset] hover:brightness-115",
  secondary:
    "border border-line-strong bg-white/4 text-bone hover:bg-white/8 hover:border-white/25",
  quiet: "text-mist hover:text-bone",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-small",
  lg: "min-h-12 px-6 text-body",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const classes = cn(base, variants[variant], sizes[size], className);

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

/**
 * Lien textuel. Souligné : l'affordance ne dépend jamais de la couleur seule.
 *
 * `standalone` pour un lien qui n'est pas au fil d'une phrase — coordonnées,
 * lien social, action secondaire. Il reçoit alors une hauteur de 44 px,
 * la cible minimale au doigt. Un lien au milieu d'un paragraphe ne doit
 * PAS l'utiliser : il casserait l'interligne du texte.
 */
export function TextLink({
  href,
  className,
  standalone,
  children,
}: {
  href: string;
  className?: string;
  standalone?: boolean;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const classes = cn(
    "text-link underline decoration-link/45 underline-offset-4 decoration-1 " +
      "transition-colors hover:decoration-link",
    standalone && "inline-flex min-h-11 items-center",
    className,
  );
  return external ? (
    <a
      href={href}
      className={classes}
      {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
