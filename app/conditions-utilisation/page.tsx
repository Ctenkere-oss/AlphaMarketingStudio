import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/sections/LegalPage";
import { terms } from "@/content/legal";

const PATH = "/conditions-utilisation";

export const metadata: Metadata = buildMetadata({
  title: terms.metaTitle,
  description: terms.metaDescription,
  path: PATH,
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: terms.h1, path: PATH },
          ]),
        ]}
      />
      <LegalPage doc={terms} path={PATH} />
    </>
  );
}
