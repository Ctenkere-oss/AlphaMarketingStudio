#!/usr/bin/env node
/**
 * Vérifie les longueurs de `title` et `description` sur les pages
 * construites, en interrogeant le serveur de production local.
 *
 *   npm run build && npm run start
 *   npm run check:seo
 *
 * Cibles : titre de 50 à 60 caractères, description de 140 à 160.
 * Un dépassement n'est pas une erreur bloquante — Google tronque,
 * il ne pénalise pas — mais c'est un signe que le texte mérite d'être
 * resserré.
 */
const BASE = process.env.SEO_BASE_URL ?? "http://localhost:3000";

const paths = [
  "/",
  "/services",
  "/services/publicite-meta",
  "/services/creation-site-web",
  "/services/gestion-reseaux-sociaux",
  "/services/seo-local",
  "/a-propos",
  "/contact",
  "/blogue",
  "/blogue/cout-campagne-meta-ads-pme-quebec",
  "/blogue/site-web-500-dollars-ce-qui-est-inclus",
  "/politique-de-confidentialite",
  "/conditions-utilisation",
];

const pick = (html, re) => (html.match(re)?.[1] ?? "").replace(/&#x27;|&#39;/g, "'").trim();
const flag = (value, min, max) => (value >= min && value <= max ? "  " : "→ ");

let issues = 0;
console.log(`\nVérification SEO sur ${BASE}\n`);

for (const path of paths) {
  const response = await fetch(`${BASE}${path}`);
  if (!response.ok) {
    console.log(`✗ ${path} — HTTP ${response.status}`);
    issues++;
    continue;
  }
  const html = await response.text();
  const title = pick(html, /<title>([^<]*)<\/title>/);
  const description = pick(html, /<meta name="description" content="([^"]*)"/);
  const h1Count = (html.match(/<h1[\s>]/g) ?? []).length;
  const canonical = pick(html, /<link rel="canonical" href="([^"]*)"/);
  const jsonLd = (html.match(/application\/ld\+json/g) ?? []).length;

  const titleOk = flag(title.length, 50, 60);
  const descOk = flag(description.length, 140, 160);
  if (titleOk.trim() || descOk.trim() || h1Count !== 1 || !canonical || jsonLd === 0) issues++;

  console.log(path);
  console.log(`  ${titleOk}titre        ${String(title.length).padStart(3)} — ${title}`);
  console.log(`  ${descOk}description  ${String(description.length).padStart(3)} — ${description.slice(0, 96)}…`);
  console.log(
    `    h1 : ${h1Count}${h1Count === 1 ? "" : "  ← il en faut exactement un"}` +
      `   canonique : ${canonical ? "oui" : "MANQUANTE"}` +
      `   blocs JSON-LD : ${jsonLd}`,
  );
  console.log("");
}

console.log(issues === 0 ? "Tout est dans les cibles.\n" : `${issues} page(s) à revoir.\n`);
