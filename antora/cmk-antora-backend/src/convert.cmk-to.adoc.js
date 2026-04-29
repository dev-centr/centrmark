/**
 * MVP CMK -> AsciiDoc converter for Antora authoring.
 *
 * This is intentionally conservative:
 * - It aims to produce compilable AsciiDoc for typical docs.
 * - Unsupported constructs are either stripped (directive fences) or treated
 *   as plain text.
 */

import fs from "node:fs/promises";
import path from "node:path";

function normalizeNewlines(s) {
  return s.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function stripFrontmatterLines(lines) {
  if (lines.length === 0) return lines;
  if (lines[0].trim() !== "---") return lines;

  let i = 1;
  for (; i < lines.length; i++) {
    if (lines[i].trim() === "---") {
      return lines.slice(i + 1);
    }
  }
  return [];
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function convertInlineLinks(line) {
  // [[url | text]] and [text](url)
  // Order matters: handle semantic link first.
  let out = line;

  // semantic link
  out = out.replace(/\[\[([^\|\]]+)\s*\|\s*([^\]]+)\]\]/g, (_m, url, text) => {
    return `link:${url.trim()}[${text.trim()}]`;
  });

  // regular link
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text, url) => {
    return `link:${url.trim()}[${text.trim()}]`;
  });

  return out;
}

function convertCodeFences(lines) {
  // Converts triple-backtick fenced code blocks into AsciiDoc source blocks.
  const out = [];
  let inCode = false;
  let codeLang = "";
  let codeAccum = [];

  for (const raw of lines) {
    const line = raw;
    const trimmed = line.trimStart();

    if (!inCode && trimmed.startsWith("```")) {
      inCode = true;
      codeLang = trimmed.slice(3).trim();
      codeAccum = [];
      continue;
    }

    if (inCode && trimmed === "```") {
      inCode = false;
      out.push(`[source,${codeLang || "text"}]`);
      out.push("----");
      out.push(...codeAccum);
      out.push("----");
      codeAccum = [];
      codeLang = "";
      continue;
    }

    if (inCode) {
      codeAccum.push(line);
    } else {
      out.push(line);
    }
  }

  // Unterminated fence: dump as plain text.
  if (inCode) {
    out.push("----");
    out.push(...codeAccum);
    out.push("----");
  }

  return out;
}

function convertHeadings(line) {
  const m = line.match(/^(\s*)(#{1,6})\s+(.*)$/);
  if (!m) return null;
  const hashes = m[2].length;
  const text = m[3].trimEnd();
  // Antora pages tend to use a top-level title; AsciiDoc levels use '=' repeated.
  const adocLevel = hashes; // MVP: map # -> =, ## -> ==, etc.
  return `${"=".repeat(adocLevel)} ${text}`;
}

function isVoidToc(line) {
  const t = line.trim();
  // MVP: accept both ::toc and ::: toc (seen in examples)
  return /^:{2,3}\s*toc\b/.test(t);
}

function isVoidDirective(line) {
  // ::name [props]
  const t = line.trim();
  return t.startsWith("::") && !t.startsWith(":::") && /^::[A-Za-z0-9_-]+/.test(t);
}

function convertVoidDirective(line) {
  const t = line.trim();
  const m = t.match(/^::([A-Za-z0-9_-]+)\s*(\[[^\]]*\])?\s*$/);
  if (!m) return null;
  const name = m[1];
  if (name === "toc") return "toc::[]";

  // MVP: strip unknown void directives.
  return null;
}

function convertQuoteFences(lines) {
  // (( ... )) => [quote] ____ ... ____
  const out = [];
  let quoteDepth = 0;
  for (const raw of lines) {
    const trimmed = raw.trim();
    if (trimmed === "((") {
      quoteDepth++;
      // Only open once per depth 1
      if (quoteDepth === 1) {
        out.push("[quote]");
        out.push("____");
      } else {
        out.push("__" /* keep nesting lightweight */);
      }
      continue;
    }
    if (trimmed === "))") {
      if (quoteDepth > 0) quoteDepth--;
      out.push("____");
      continue;
    }
    out.push(raw);
  }
  return out;
}

export async function convertCmkToAdocFile(inputPath, outputPath) {
  const input = await fs.readFile(inputPath, "utf8");
  const normalized = normalizeNewlines(input);
  let lines = normalized.split("\n");

  lines = stripFrontmatterLines(lines);
  lines = convertCodeFences(lines);
  lines = convertQuoteFences(lines);

  const out = [];

  for (const raw of lines) {
    const line = raw;
    const trimmed = line.trim();

    if (isVoidToc(line)) {
      out.push("toc::[]");
      continue;
    }

    if (isVoidDirective(line)) {
      const converted = convertVoidDirective(line);
      if (converted) out.push(converted);
      continue;
    }

    // MVP: strip block directive wrapper fences after handling void directives.
    // In examples, block directive fences commonly use 3+ colons for both open and close.
    // Closing fences are typically a line made only of colons (e.g. `:::`).
    // Opening fences look like `:::{name} ...` (e.g. `::: warning ...`).
    if (/^:{2,}\s*$/.test(trimmed)) continue; // closing markers: only colons
    if (/^:{3,}\s*[A-Za-z0-9_-]+/.test(trimmed)) continue; // opening markers: 3+ colons + directive name

    const heading = convertHeadings(line);
    if (heading) {
      out.push(heading);
      continue;
    }

    out.push(convertInlineLinks(line));
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, out.join("\n"), "utf8");
}

