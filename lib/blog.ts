import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { slugify } from "./slug";

const DIR = path.join(process.cwd(), "content", "blogue");

export type Article = {
  slug: string;
  title: string;
  /** Titre de l'onglet : 50 à 60 caractères. */
  metaTitle: string;
  description: string;
  published: string;
  updated?: string;
  tags: string[];
  /** Chapô affiché en haut de l'article et dans l'index. */
  lead: string;
  wordCount: number;
  readingMinutes: number;
  html: string;
  headings: { id: string; text: string }[];
};

type FrontMatter = {
  title: string;
  metaTitle?: string;
  description: string;
  published: string;
  updated?: string;
  tags?: string[];
  lead: string;
};

/** Ajoute un identifiant stable à chaque `h2` pour la table des matières. */
function renderMarkdown(markdown: string) {
  const headings: { id: string; text: string }[] = [];

  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ("raw" in t ? t.raw : "")).join("");
    const id = slugify(text);
    if (depth === 2) headings.push({ id, text });
    return `<h${depth} id="${id}">${marked.parseInline(text)}</h${depth}>\n`;
  };

  const html = marked.parse(markdown, { renderer, async: false, gfm: true }) as string;
  return { html, headings };
}

function read(slug: string): Article {
  const raw = fs.readFileSync(path.join(DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const front = data as FrontMatter;
  const { html, headings } = renderMarkdown(content);

  const wordCount = content.split(/\s+/).filter(Boolean).length;

  return {
    slug,
    title: front.title,
    metaTitle: front.metaTitle ?? front.title,
    description: front.description,
    published: front.published,
    updated: front.updated,
    tags: front.tags ?? [],
    lead: front.lead,
    wordCount,
    // 200 mots par minute : la moyenne en lecture d'écran en français.
    readingMinutes: Math.max(1, Math.round(wordCount / 200)),
    html,
    headings,
  };
}

export function allSlugs(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/** Articles triés du plus récent au plus ancien. */
export function allArticles(): Article[] {
  return allSlugs()
    .map(read)
    .sort((a, b) => b.published.localeCompare(a.published));
}

export function getArticle(slug: string): Article | null {
  if (!allSlugs().includes(slug)) return null;
  return read(slug);
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("fr-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}
