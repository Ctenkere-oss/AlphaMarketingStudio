/** Premier élément focusable de la page : saute la navigation. */
export function SkipLink() {
  return (
    <a
      href="#contenu"
      className="sr-only z-100 rounded-control bg-accent-deep px-5 text-small font-semibold
                 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3
                 focus:inline-flex focus:min-h-11 focus:items-center"
    >
      Aller au contenu principal
    </a>
  );
}
