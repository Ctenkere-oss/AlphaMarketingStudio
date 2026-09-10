export type NavItem = { href: string; label: string };

export const primaryNav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/a-propos", label: "À propos" },
  { href: "/blogue", label: "Blogue" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Services",
    items: [
      { href: "/services/publicite-meta", label: "Publicités Meta" },
      { href: "/services/creation-site-web", label: "Création de site web" },
      { href: "/services/gestion-reseaux-sociaux", label: "Gestion des réseaux sociaux" },
      { href: "/services/seo-local", label: "SEO local" },
    ],
  },
  {
    title: "Studio",
    items: [
      { href: "/a-propos", label: "À propos" },
      { href: "/blogue", label: "Blogue" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Légal",
    items: [
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
      { href: "/conditions-utilisation", label: "Conditions d'utilisation" },
    ],
  },
];

export const primaryCta = { href: "/contact", label: "Obtenir mon audit gratuit" };
