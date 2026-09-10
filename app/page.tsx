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
  title: "Alpha Marketing Studio | Marketing numérique à Montréal",
  description:
    "Publicités Meta, contenu Instagram et TikTok, sites web pour PME à 500 $ et SEO local à Montréal. Un seul interlocuteur, et c'est celui qui exécute.",
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
      <WebOffer />
      <MethodSection />
      <CaseStudySection />
      <AboutShort />
      <FaqSection />
      <GuideSection />
      <FinalCta />
    </>
  );
}
