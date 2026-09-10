import { cn } from "@/lib/cn";

/**
 * Marqueur de donnée manquante.
 *
 * Volontairement criard : rien de ce qui est ici ne doit atteindre la
 * production sans avoir été remplacé par une vraie valeur. `npm run todos`
 * les liste tous, et A-COMPLETER.md tient la liste consolidée.
 *
 * Aucun chiffre n'est inventé sur ce site : un faux résultat sur la
 * vitrine d'une agence est un risque légal autant que réputationnel.
 */
export function APreciser({
  children,
  kind = "chiffre",
  className,
}: {
  children: string;
  kind?: "chiffre" | "texte" | "valider";
  className?: string;
}) {
  const prefix =
    kind === "chiffre" ? "CHIFFRE À CONFIRMER" : kind === "valider" ? "À VALIDER" : "À COMPLÉTER";
  return (
    <mark
      data-a-preciser
      title={`À remplir avant la mise en ligne — ${prefix}`}
      className={cn(
        "inline-block rounded-[5px] border border-dashed border-warn/60 bg-warn/12",
        "px-1.5 py-0.5 align-baseline font-sans text-[0.82em] font-semibold",
        "text-warn not-italic no-underline",
        className,
      )}
    >
      [[{prefix} : {children}]]
    </mark>
  );
}
