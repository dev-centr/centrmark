import type { Loader } from "astro/loaders";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  astJsonToRenderIR,
  renderIRToHtml,
  type CmkAstDocument
} from "@centrmark/cmk-renderer";
import { parseCmk } from "@centrmark/parse";

export type CentrmarkLoaderOptions = {
  /** Directory containing `.cmk` files (relative to project root). Default: `src/content/blog` */
  base?: string;
  /** Path to centrmark-cli */
  cliPath?: string;
};

type SdlFrontmatter = {
  title?: string;
  description?: string;
  pubDate?: string;
  draft?: boolean;
};

/** Minimal SDL frontmatter extractor for blog schemas. */
export function parseSdlFrontmatter(raw: string): SdlFrontmatter {
  const out: SdlFrontmatter = {};
  const title = /(?:^|\n)title\s+"((?:[^"\\]|\\.)*)"/.exec(raw);
  const description = /(?:^|\n)description\s+"((?:[^"\\]|\\.)*)"/.exec(raw);
  const pubDate = /(?:^|\n)pubDate\s+"((?:[^"\\]|\\.)*)"/.exec(raw);
  const draft = /(?:^|\n)draft\s+(true|false)/.exec(raw);
  if (title) out.title = title[1];
  if (description) out.description = description[1];
  if (pubDate) out.pubDate = pubDate[1];
  if (draft) out.draft = draft[1] === "true";
  return out;
}

async function listCmkFiles(dir: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(current: string): Promise<void> {
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith(".cmk")) {
        out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

function resolveProjectRoot(root: URL | string): string {
  if (typeof root === "string") return root;
  return fileURLToPath(root);
}

/**
 * Astro content collection loader for `.cmk` files.
 * Each entry exposes `html`, frontmatter fields, and `cmkSource`.
 */
export function centrmarkLoader(options: CentrmarkLoaderOptions = {}): Loader {
  const base = options.base ?? "./src/content/blog";
  const cliPath = options.cliPath;

  return {
    name: "centrmark-loader",
    load: async ({ store, config, logger, parseData, generateDigest }) => {
      const rootPath = resolveProjectRoot(config.root);
      const contentDir = path.resolve(rootPath, base);
      const files = await listCmkFiles(contentDir);
      store.clear();
      logger.info(`CentrMark loader: ${files.length} file(s) in ${contentDir}`);

      for (const filePath of files) {
        const source = await readFile(filePath, "utf8");
        const id = path.basename(filePath, ".cmk");
        const ast: CmkAstDocument = await parseCmk(source, cliPath ? { cliPath } : undefined);
        const fm = parseSdlFrontmatter(ast.frontmatter?.raw ?? "");
        const html = renderIRToHtml(astJsonToRenderIR(ast));
        const data = await parseData({
          id,
          data: {
            title: fm.title ?? id,
            description: fm.description,
            pubDate: fm.pubDate
              ? new Date(fm.pubDate)
              : new Date((await stat(filePath)).mtimeMs),
            draft: fm.draft ?? false,
            html,
            cmkSource: source
          }
        });
        store.set({
          id,
          data,
          body: source,
          digest: generateDigest(source)
        });
      }
    }
  };
}
