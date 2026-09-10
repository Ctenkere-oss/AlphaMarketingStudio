import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqs } from "@/content/faq";
import { Hero } from "@/components/sections/Hero";
import { CredibilityBand } from "@/components/sections/CredibilityBand";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WebOffer } from "@/components/sections/WebOffer";
import { MethodSection } from "@/components/sections/MethodSection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { AboutShort } from "@/components/sections/AboutShort";
import { FaqSection } from "@/components/sections/FaqSection";
import { GuideSection } from "@/components/sections/GuideSection";
import { FinalCta } from "@/components/sections/FinalCta";

export const metadata: Metadata = buildMetadata({
  title: "Publicités Meta pour PME à Montréal | Alpha Marketing",
  description:
    "Gestion de campagnes Facebook et Instagram pour les PME du Grand Montréal. Sites web à 500 $ et réseaux sociaux en appui. Un seul interlocuteur : celui qui exécute.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd
        graph={[
          faqSchema(
            faqs.map((faq) => ({ question: faq.question, plainAnswer: faq.answer.join(" ") })),
          ),
          breadcrumbSchema([{ name: "Accueil", path: "/" }]),
        ]}
      />
      <Hero />
      <CredibilityBand />
      <ProblemSection />
      <ServicesSection />
      <MethodSection />
      <CaseStudySection />
      {/* L'offre de site web reste un aimant à conversion, mais elle
          passe après la méthode et l'étude de cas : c'est un service
          en appui, pas le produit vendu. */}
      <WebOffer />
      <AboutShort />
      <FaqSection />
      <GuideSection />
      <FinalCta />
    </>
  );
}
