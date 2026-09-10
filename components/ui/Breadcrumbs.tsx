import Link from "next/link";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const last = trail.length - 1;
  return (
    <nav aria-label="Fil d'Ariane" className="mb-5">
      <ol className="flex flex-wrap items-center gap-x-2 text-micro text-mute">
        {trail.map((crumb, i) => (
          <li key={crumb.path} className="flex min-h-11 items-center gap-2">
            {i === last ? (
              <span aria-current="page" className="text-mist">
                {crumb.name}
              </span>
            ) : (
              <Link
                href={crumb.path}
                className="inline-flex min-h-11 min-w-11 items-center justify-center
                           transition-colors hover:text-bone"
              >
                {crumb.name}
              </Link>
            )}
            {i < last ? (
              <span aria-hidden="true" className="text-line-strong">
                /
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
