#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { convertCmkToAdocFile } from "../src/convert.cmk-to.adoc.js";

function getArgValue(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  const next = process.argv[idx + 1];
  if (!next) return undefined;
  return next;
}

function usage() {
  // eslint-disable-next-line no-console
  console.log("Usage: cmk-antora-preprocess --in <inputDir> --out <outputDir>");
}

async function walkFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      out.push(...(await walkFiles(p)));
    } else if (ent.isFile()) {
      out.push(p);
    }
  }
  return out;
}

async function main() {
  const inputDir = getArgValue("--in");
  const outputDir = getArgValue("--out");

  if (!inputDir || !outputDir) {
    usage();
    process.exit(1);
  }

  const absIn = path.resolve(inputDir);
  const absOut = path.resolve(outputDir);

  const files = await walkFiles(absIn);
  const cmkFiles = files.filter((f) => f.toLowerCase().endsWith(".cmk"));

  await fs.mkdir(absOut, { recursive: true });

  for (const cmkPath of cmkFiles) {
    const rel = path.relative(absIn, cmkPath);
    const outRel = rel.replace(/\.cmk$/i, ".adoc");
    const outPath = path.join(absOut, outRel);
    // eslint-disable-next-line no-console
    console.log(`Converting ${rel} -> ${path.relative(absOut, outPath)}`);
    await convertCmkToAdocFile(cmkPath, outPath);
  }
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err);
  process.exit(1);
});

