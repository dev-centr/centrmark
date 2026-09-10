import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_ORIGIN = "https://dev-centr.github.io";
export const SITE_BASE = "/centrmark";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");

const DOC_SLUGS = [
  "README",
  "informal",
  "formal_grammar",
  "changelog",
  "certification",
  "licensing",
  "trademark",
  "commercial-license",
];

const STATIC_ROUTES = [
  "/",
  "/docs",
  "/examples",
  "/attributions",
  "/contact",
  "/privacy",
  "/terms",
  ...DOC_SLUGS.map((s) => `/docs/${s}`),
];

function exampleSlugs() {
  const dir = join(rootDir, "public", "examples");
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".cmk"))
    .map((f) => f.replace(/\.cmk$/i, ""));
}

export function getPrerenderRoutes() {
  const examples = exampleSlugs().flatMap((slug) => [
    `/examples/${slug}`,
    `/examples/${slug}/ast`,
  ]);
  return [...new Set([...STATIC_ROUTES, ...examples])];
}

export function absoluteUrl(route) {
  const base = SITE_BASE.replace(/\/$/, "");
  if (route === "/") return `${SITE_ORIGIN}${base}/`;
  return `${SITE_ORIGIN}${base}${route}`;
}
