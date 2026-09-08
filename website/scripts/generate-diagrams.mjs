import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { prepareThemedMermaidSvgDualOutput } from "@dev-centr/mermaid-svg-css-vars";

const root = fileURLToPath(new URL("../", import.meta.url));
const mermaidCli = join(
  dirname(createRequire(import.meta.url).resolve("@mermaid-js/mermaid-cli")),
  "cli.js",
);
const check = process.argv.includes("--check");
const diagrams = [
  {
    name: "checklist",
    source: "diagrams/checklist.mmd",
    manifest: "diagrams/checklist.theme.json",
  },
  {
    name: "feature-tabs",
    source: "diagrams/feature-tabs.mmd",
    manifest: "diagrams/feature-tabs.theme.json",
  },
];

function absolute(path) {
  return join(root, path);
}

function renderMermaid(source, output) {
  const result = spawnSync(
    process.execPath,
    [
      mermaidCli,
      "-i",
      absolute(source),
      "-o",
      output,
      "-c",
      absolute("diagrams/mermaid-config.json"),
      "-p",
      absolute("diagrams/puppeteer-config.json"),
      "-b",
      "transparent",
    ],
    { encoding: "utf8" },
  );

  if (result.status !== 0) {
    process.stderr.write(result.stdout ?? "");
    process.stderr.write(result.stderr ?? "");
    if (result.error) process.stderr.write(`${result.error.message}\n`);
    throw new Error(`Mermaid rendering failed for ${source}`);
  }
}

function normalizeAccessibility(svg) {
  return svg
    .replace('role="graphics-document document"', 'role="img"')
    .replace(/\saria-roledescription="flowchart-v2"/, "");
}

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4,
    );
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

function verifyPalettes(manifest, name) {
  for (const mode of ["light", "dark"]) {
    const palette = manifest.presets[mode];
    const pairs = [
      ["color.text.primary", "color.surface.primary"],
      ["color.edge", "color.edge.label"],
    ];
    for (const [foreground, background] of pairs) {
      const ratio = contrastRatio(palette[foreground], palette[background]);
      if (ratio < 4.5) {
        throw new Error(
          `${name} ${mode} contrast ${foreground}/${background} is ${ratio.toFixed(2)}:1`,
        );
      }
    }
  }
}

function verifySvg(svg, name, mode) {
  const required = [
    /<svg\b[^>]*xmlns="http:\/\/www\.w3\.org\/2000\/svg"/,
    /<svg\b[^>]*viewBox="[^"]+"/,
    /<svg\b[^>]*preserveAspectRatio="xMidYMid meet"/,
    /<svg\b[^>]*role="img"/,
    /<title\b[^>]*>[^<]+<\/title>/,
    /<desc\b[^>]*>[^<]+<\/desc>/,
  ];
  for (const expression of required) {
    if (!expression.test(svg)) {
      throw new Error(`${name}.${mode}.svg is missing ${expression}`);
    }
  }

  const forbidden = [
    /<!DOCTYPE/i,
    /<script/i,
    /<foreignObject/i,
    /\son[a-z]+\s*=/i,
    /(?:href|src)\s*=\s*["'](?:https?:|data:|javascript:)/i,
    /@import/i,
    /url\(\s*["']?(?:https?:|data:|javascript:)/i,
  ];
  for (const expression of forbidden) {
    if (expression.test(svg)) {
      throw new Error(`${name}.${mode}.svg contains unsafe content: ${expression}`);
    }
  }

  const hasDarkMedia = /prefers-color-scheme:dark/.test(svg);
  if ((mode === "adaptive") !== hasDarkMedia) {
    throw new Error(`${name}.${mode}.svg has the wrong dark-mode delivery contract`);
  }
  for (const reference of svg.matchAll(/var\((--[^,)]+)(?:,\s*([^)]+))?\)/g)) {
    if (!reference[2]?.trim()) {
      throw new Error(`${name}.${mode}.svg has no fallback for ${reference[1]}`);
    }
  }
}

function sourceFingerprint(diagram) {
  const hash = createHash("sha256");
  for (const path of [
    absolute(diagram.source),
    absolute(diagram.manifest),
    absolute("diagrams/mermaid-config.json"),
    absolute("package.json"),
    import.meta.filename,
  ]) {
    hash.update(readFileSync(path));
    hash.update("\0");
  }
  return hash.digest("hex");
}

function stamp(svg, fingerprint) {
  return svg.replace(
    /(<\?xml[^>]+>\s*)?/i,
    (declaration = "") =>
      `${declaration}<!-- themed-svg-source-sha256:${fingerprint} -->\n`,
  );
}

function verifyCommitted(path, name, mode, fingerprint) {
  let current;
  try {
    current = readFileSync(path, "utf8");
  } catch {
    throw new Error(`Missing generated asset: ${path}`);
  }
  if (!current.includes(`themed-svg-source-sha256:${fingerprint}`)) {
    throw new Error(`Stale generated asset: ${path}`);
  }
  verifySvg(current, name, mode);
}

function commitOutput(path, expected) {
  writeFileSync(path, expected, "utf8");
}

const temporaryDirectory = mkdtempSync(join(tmpdir(), "centrmark-diagrams-"));
try {
  for (const diagram of diagrams) {
    const fingerprint = sourceFingerprint(diagram);
    if (check) {
      verifyCommitted(
        absolute(`public/images/${diagram.name}.svg`),
        diagram.name,
        "adaptive",
        fingerprint,
      );
      verifyCommitted(
        absolute(`public/images/${diagram.name}.host.svg`),
        diagram.name,
        "host",
        fingerprint,
      );
      continue;
    }

    const rawPath = join(temporaryDirectory, `${diagram.name}.raw.svg`);
    renderMermaid(diagram.source, rawPath);
    const rawSvg = normalizeAccessibility(readFileSync(rawPath, "utf8"));
    const manifest = JSON.parse(readFileSync(absolute(diagram.manifest), "utf8"));
    verifyPalettes(manifest, diagram.name);
    const result = prepareThemedMermaidSvgDualOutput(rawSvg, manifest);

    for (const diagnostic of result.diagnostics) {
      process.stderr.write(
        `${diagram.name}.${diagnostic.output}: ${diagnostic.severity}: ${diagnostic.code}: ${diagnostic.message}\n`,
      );
    }
    if (!result.standaloneSvg || !result.hostSvg) {
      throw new Error(`Themed SVG generation failed for ${diagram.name}`);
    }

    const standaloneSvg = stamp(result.standaloneSvg, fingerprint);
    const hostSvg = stamp(result.hostSvg, fingerprint);
    verifySvg(standaloneSvg, diagram.name, "adaptive");
    verifySvg(hostSvg, diagram.name, "host");
    commitOutput(absolute(`public/images/${diagram.name}.svg`), standaloneSvg);
    commitOutput(absolute(`public/images/${diagram.name}.host.svg`), hostSvg);
  }
  process.stdout.write(`${check ? "Verified" : "Generated"} ${diagrams.length} themed diagrams.\n`);
} finally {
  rmSync(temporaryDirectory, { force: true, recursive: true });
}
