import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { LegalPage } from "@/components/sections/LegalPage";
import { privacy } from "@/content/legal";

const PATH = "/politique-de-confidentialite";

export const metadata: Metadata = buildMetadata({
  title: privacy.metaTitle,
  description: privacy.metaDescription,
  path: PATH,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        graph={[
          breadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: privacy.h1, path: PATH },
          ]),
        ]}
      />
      <LegalPage doc={privacy} path={PATH} />
    </>
  );
}
