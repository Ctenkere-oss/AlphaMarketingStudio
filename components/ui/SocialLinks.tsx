import { socialLinks, type SocialLink } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Liens vers les réseaux, en icônes.
 *
 * Les logos de marque ont été retirés de Lucide ; ils sont donc dessinés
 * à la main ici plutôt que d'ajouter une dépendance d'icônes entière
 * pour quatre glyphes. Même grille de 24, même graisse de trait que le
 * reste du jeu d'icônes.
 *
 * Chaque icône est décorative : c'est le texte masqué qui porte le nom
 * accessible du lien. Zone tactile de 44 px.
 */

type IconeProps = { size?: number };

const traits = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function Instagram({ size = 20 }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...traits}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Facebook({ size = 20 }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...traits}>
      <path d="M17.5 2.5h-2.6a4.4 4.4 0 0 0-4.4 4.4v3.1H7.5v4h3v7.5h4V14h3l.9-4h-3.9V7.4a1 1 0 0 1 1-1h2.5Z" />
    </svg>
  );
}

function LinkedIn({ size = 20 }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...traits}>
      <path d="M15.5 8.5a5.5 5.5 0 0 1 5.5 5.5v6.5h-4V14a1.5 1.5 0 0 0-3 0v6.5h-4V14a5.5 5.5 0 0 1 5.5-5.5Z" />
      <rect x="2.5" y="9" width="4" height="11.5" rx="0.5" />
      <circle cx="4.5" cy="4.5" r="2" />
    </svg>
  );
}

function TikTok({ size = 20 }: IconeProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false" {...traits}>
      <path d="M15.2 3v11.6a4 4 0 1 1-3.4-3.96" />
      <path d="M15.2 3a5 5 0 0 0 4.6 4.3" />
    </svg>
  );
}

const icones: Record<string, (p: IconeProps) => React.ReactNode> = {
  Instagram,
  Facebook,
  LinkedIn,
  TikTok,
};

export function SocialLinks({
  className,
  size = 20,
  links = socialLinks,
}: {
  className?: string;
  size?: number;
  links?: SocialLink[];
}) {
  if (links.length === 0) return null;

  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {links.map((social) => {
        const Icone = icones[social.label];
        return (
          <li key={social.label}>
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Voir"
              className="grid size-11 place-items-center rounded-pill border border-line
                         text-mist transition-colors hover:border-line-strong hover:bg-white/6
                         hover:text-bone"
            >
              {Icone ? <Icone size={size} /> : null}
              <span className="sr-only">
                {social.label} — {social.handle}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
