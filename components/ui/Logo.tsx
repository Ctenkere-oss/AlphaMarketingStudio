import { cn } from "@/lib/cn";

/**
 * Trois barres verticales inscrites dans un cercle : la marque telle
 * qu'elle existe déjà sur les réseaux. Dessinée en SVG plutôt
 * qu'importée en image — nette à toute taille, aucune requête réseau.
 */
export function Logo({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("h-9 w-9", className)}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : "true"}
      aria-label={title}
    >
      <defs>
        <linearGradient id="ams-mark" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-indigo)" />
          <stop offset="100%" stopColor="var(--color-violet)" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18.25" fill="none" stroke="url(#ams-mark)" strokeWidth="1.75" />
      <g fill="url(#ams-mark)">
        <rect x="12" y="21" width="4" height="8" rx="2" />
        <rect x="18" y="15.5" width="4" height="13.5" rx="2" />
        <rect x="24" y="11" width="4" height="18" rx="2" />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Logo />
      <span className="font-display text-[0.98rem] leading-none font-bold tracking-tight text-bone">
        Alpha Marketing
        <span className="block text-micro leading-tight font-medium tracking-normal text-mute">
          Studio
        </span>
      </span>
    </span>
  );
}
