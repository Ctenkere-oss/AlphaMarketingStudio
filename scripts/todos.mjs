#!/usr/bin/env node
/**
 * Liste tous les marqueurs [[CHIFFRE À CONFIRMER]], [[À COMPLÉTER]]
 * et [[À VALIDER]] du projet, avec fichier et numéro de ligne.
 *
 *   npm run todos
 *
 * À exécuter avant chaque mise en ligne : aucun de ces marqueurs ne
 * doit rester sur le site en production.
 */
import fs from "node:fs";
import path from "node:path";

const ROOTS = ["app", "components", "content", "lib"];
const EXTS = new Set([".ts", ".tsx", ".md", ".mdx"]);
const PATTERN = /\[\[(CHIFFRE À CONFIRMER|À COMPLÉTER|À VALIDER)\s*:?\s*([^\]]*)\]\]/g;

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXTS.has(path.extname(entry.name))) yield full;
  }
}

const found = [];
for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    const lines = fs.readFileSync(file, "utf8").split("\n");
    lines.forEach((line, i) => {
      const trimmed = line.trimStart();
      // Un marqueur cité dans un commentaire ou dans l'expression
      // régulière qui sert à les détecter n'est pas un marqueur.
      if (line.includes("\\[\\[")) return;
      if (trimmed.startsWith("*") || trimmed.startsWith("//") || trimmed.startsWith("/*")) return;
      for (const match of line.matchAll(PATTERN)) {
        found.push({ file, line: i + 1, kind: match[1], text: match[2].trim() });
      }
    });
  }
}

if (found.length === 0) {
  console.log("Aucun marqueur restant. Le site peut être mis en ligne.");
  process.exit(0);
}

const byKind = new Map();
for (const item of found) {
  if (!byKind.has(item.kind)) byKind.set(item.kind, []);
  byKind.get(item.kind).push(item);
}

console.log(`\n${found.length} élément(s) à compléter avant la mise en ligne :\n`);
for (const [kind, items] of byKind) {
  console.log(`── ${kind} (${items.length})`);
  for (const item of items) {
    console.log(`   ${item.file}:${item.line}`);
    if (item.text) console.log(`      ${item.text}`);
  }
  console.log("");
}
process.exitCode = 1;
