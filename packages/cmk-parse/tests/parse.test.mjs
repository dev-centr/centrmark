import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..", "..", "..");
const winCli = path.join(repoRoot, "dlang", "centrmark-cli", "bin", "centrmark-cli.exe");
const unixCli = path.join(repoRoot, "dlang", "centrmark-cli", "bin", "centrmark-cli");
const cliPath = existsSync(winCli) ? winCli : existsSync(unixCli) ? unixCli : process.env.CENTRMARK_CLI;

const { parseCmk, cmkToHtml } = await import("../dist/index.js");

test("parseCmk returns AST when CLI is available", async (t) => {
  if (!cliPath) {
    t.skip("centrmark-cli not built");
    return;
  }
  const ast = await parseCmk("# Hello CentrMark\n\nParagraph.\n", { cliPath });
  assert.ok(Array.isArray(ast.blocks));
  assert.ok(ast.blocks.length > 0);
});

test("cmkToHtml renders article wrapper when CLI is available", async (t) => {
  if (!cliPath) {
    t.skip("centrmark-cli not built");
    return;
  }
  const html = await cmkToHtml("# Title\n", { cliPath });
  assert.ok(html.includes("cmk-render"));
});
