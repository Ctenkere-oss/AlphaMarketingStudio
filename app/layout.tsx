import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { organizationSchema, personSchema, websiteSchema } from "@/lib/jsonld";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Cursor } from "@/components/motion/Cursor";
import { PageTransition } from "@/components/motion/PageTransition";
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

/**
 * Armement du masquage, avant le premier affichage.
 *
 * Les blocs à révéler doivent être masqués AVANT que le navigateur ne
 * peigne le corps de la page, sinon le contenu apparaît puis disparaît
 * — mesuré jusqu'à 1,5 s de scintillement sur 4G lente, parce qu'un
 * effet React ne s'exécute qu'à l'hydratation, donc après le premier
 * affichage.
 *
 * Ce script-ci est synchrone et placé avant le corps : il pose la
 * classe pendant l'analyse du document, et la règle CSS
 * `.mouvement-arme [data-reveal]` masque dès la première image.
 *
 * Trois garde-fous, parce que du contenu masqué qui ne réapparaît pas
 * est une panne bien pire qu'une absence d'animation :
 *
 *   1. sans JavaScript, la classe n'est jamais posée — rien n'est masqué ;
 *   2. sous `prefers-reduced-motion`, elle n'est pas posée non plus ;
 *   3. si le moteur n'a pas pris le relais au bout de 1,6 s, le minuteur
 *      retire la classe et tout redevient visible. Le moteur mesuré met
 *      entre 40 et 530 ms selon l'appareil ; s'il arrive quand même
 *      après le minuteur, il constate le désarmement et renonce à
 *      masquer plutôt que de faire disparaître du texte déjà lu.
 *
 * Le moteur retire lui-même la classe une fois qu'il a inscrit son
 * propre masquage en style inline — qui, lui, prime sur la règle CSS.
 */
const armerMouvement = `(function(){try{
if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
var h=document.documentElement;h.classList.add('mouvement-arme');
window.__desarmerMouvement=function(){h.classList.remove('mouvement-arme')};
setTimeout(window.__desarmerMouvement,1600);
}catch(e){}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr-CA" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: armerMouvement }} />
      </head>
      <body className="min-h-dvh antialiased">
        <JsonLd graph={[organizationSchema(), websiteSchema(), personSchema()]} />
        <SkipLink />
        <Header />
        <main id="contenu" className="pt-17">
          {children}
        </main>
        <Footer />
        <MotionProvider />
        <Cursor />
        <PageTransition />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
