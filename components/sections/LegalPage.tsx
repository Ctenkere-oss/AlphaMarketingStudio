import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { TextLink } from "@/components/ui/Button";
import { Marked } from "@/components/ui/Marked";
import { formatDate } from "@/lib/blog";
import { slugify } from "@/lib/slug";
import type { LegalDoc } from "@/content/legal";
import { site } from "@/content/site";

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs
        trail={[
          { name: "Accueil", path: "/" },
          { name: doc.h1, path },
        ]}
      />

      <h1 className="max-w-3xl text-display-2 text-bone">{doc.h1}</h1>
      <p className="mt-4 text-small text-mute">
        Dernière mise à jour : <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
      </p>

      <div className="prose-ams mt-10 max-w-read">
        {doc.intro.map((paragraph) => (
          <p key={paragraph}>
            <Marked text={paragraph} />
          </p>
        ))}

        {doc.blocks.map((block) => (
          <section key={block.heading}>
            <h2 id={slugify(block.heading)}>{block.heading}</h2>
            {block.paragraphs?.map((paragraph) => (
              <p key={paragraph}>
                <Marked text={paragraph} />
              </p>
            ))}
            {block.list ? (
              <ul>
                {block.list.map((item) => (
                  <li key={item}>
                    <Marked text={item} />
                  </li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}

        <hr />

        <p className="text-small">
          Une question sur ce document ? Écrivez-moi à{" "}
          <TextLink href={`mailto:${site.email}`}>{site.email}</TextLink>.
        </p>
      </div>

      <p className="mt-10 max-w-read rounded-card border border-warn/30 bg-warn/8 p-5 text-small text-mist">
        <strong className="font-semibold text-bone">Ce texte n&apos;est pas un avis juridique.</strong>{" "}
        Il a été rédigé comme un gabarit sérieux et personnalisé pour une entreprise de services
        québécoise, mais il doit être relu par un professionnel du droit avant d&apos;être considéré
        comme définitif — en particulier les passages surlignés ci-dessus.
      </p>
    </Container>
  );
}
