import { APreciser } from "./APreciser";

const MARKER = /(\[\[(?:CHIFFRE À CONFIRMER|À COMPLÉTER|À VALIDER)\s*:\s*[^\]]+\]\])/g;
const PARSE = /^\[\[(CHIFFRE À CONFIRMER|À COMPLÉTER|À VALIDER)\s*:\s*([\s\S]+)\]\]$/;

/**
 * Rend un texte issu de `content/` en transformant les marqueurs
 * `[[CHIFFRE À CONFIRMER : … ]]`, `[[À COMPLÉTER : … ]]` et
 * `[[À VALIDER : … ]]` en surlignage visible.
 *
 * Grâce à ce composant, les marqueurs vivent dans les fichiers de
 * contenu et nulle part ailleurs : `npm run todos` les trouve tous,
 * et A-COMPLETER.md reste exact.
 */
export function Marked({ text }: { text: string }) {
  const parts = text.split(MARKER).filter((part) => part !== "");

  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(PARSE);
        if (!match) return <span key={i}>{part}</span>;
        return (
          <APreciser
            key={i}
            kind={
              match[1] === "CHIFFRE À CONFIRMER"
                ? "chiffre"
                : match[1] === "À VALIDER"
                  ? "valider"
                  : "texte"
            }
          >
            {match[2].trim()}
          </APreciser>
        );
      })}
    </>
  );
}
