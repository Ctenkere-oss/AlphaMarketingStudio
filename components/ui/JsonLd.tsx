/**
 * Un seul bloc `@graph` par page : les entités s'y référencent par `@id`
 * au lieu d'être dupliquées dans plusieurs balises script.
 */
export function JsonLd({ graph }: { graph: Record<string, unknown>[] }) {
  const payload = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      // Le contenu est construit par nous, jamais par l'utilisateur.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
