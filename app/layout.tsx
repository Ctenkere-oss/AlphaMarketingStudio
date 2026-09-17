import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { organizationSchema, personSchema, websiteSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { RevealObserver } from "@/components/ui/Reveal";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

/* Polices auto-hébergées : aucune requête vers Google, un aller-retour
   réseau de moins avant le LCP, et rien à déclarer côté vie privée. */
const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin.woff2",
  variable: "--font-space-grotesk",
  weight: "300 700",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Pas de `template` : chaque page écrit son titre en entier, calibré
  // entre 50 et 60 caractères. Un gabarit qui ajoute la marque produit
  // des titres tronqués par Google dès que la page en contient déjà une.
  title: "Publicités Meta pour PME à Montréal | Alpha Marketing",
  description:
    "Studio d'acquisition numérique à Montréal, spécialisé en publicités Meta pour PME. Sites web, réseaux sociaux et SEO local en appui. Un seul interlocuteur.",
  applicationName: site.name,
  authors: [{ name: site.founder.name }],
  creator: site.founder.name,
  publisher: site.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  category: "Marketing",
};

export const viewport: Viewport = {
  themeColor: "#07070b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="min-h-dvh antialiased">
        {/* Posé avant que le navigateur ne peigne la suite du body : les
            blocs à révéler peuvent donc partir cachés sans risque. Si
            React ne monte pas, le minuteur rend tout visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "setTimeout(function(){" +
              "if(!document.documentElement.classList.contains('reveal-ready'))" +
              "document.documentElement.classList.remove('js');},3000);",
          }}
        />
        <JsonLd graph={[organizationSchema(), websiteSchema(), personSchema()]} />
        <SkipLink />
        <Header />
        <main id="contenu" className="pt-17">
          {children}
        </main>
        <Footer />
        <RevealObserver />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
