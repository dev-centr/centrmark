import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, "..");
const repoRoot = path.resolve(packageRoot, "..", "..");

const { astJsonToRenderIR, renderIRToHtml } = await import("../dist/index.js");

async function loadExampleAst(name) {
  const fullPath = path.join(repoRoot, "website", "public", "examples", `${name}.ast.json`);
  const rawBuffer = await fs.readFile(fullPath);
  const utf8Text = rawBuffer.toString("utf8").replace(/^\uFEFF/, "");
  try {
    return JSON.parse(utf8Text);
  } catch {
    const utf16Text = rawBuffer.toString("utf16le").replace(/^\uFEFF/, "");
    return JSON.parse(utf16Text);
  }
}

test("builds IR from markdown-basics AST fixture", async () => {
  const ast = await loadExampleAst("markdown-basics");
  const ir = astJsonToRenderIR(ast);
  assert.ok(ir.nodes.length > 0);
  assert.equal(typeof ir.frontmatterRaw, "string");
});

test("renders HTML from literate-programming AST fixture", async () => {
  const ast = await loadExampleAst("literate-programming");
  const html = renderIRToHtml(astJsonToRenderIR(ast));
  assert.ok(html.includes("<article class=\"cmk-render\">"));
  assert.ok(html.includes("<p>") || html.includes("<h1>"));
});

test("renders specialized checklist, diagram, and animation directives", () => {
  const ast = {
    frontmatter: { raw: "" },
    blocks: [
      {
        kind: "BlockDirective",
        name: "checklist",
        propsRaw: "type=\"default\"",
        body: [{ kind: "Paragraph", inlines: [{ kind: "Text", text: "[-] Deferred item" }] }]
      },
      {
        kind: "BlockDirective",
        name: "diagram",
        propsRaw: "format=\"mermaid\"",
        body: [{ kind: "Paragraph", inlines: [{ kind: "Text", text: "flowchart TD\nA --> B" }] }]
      },
      {
        kind: "BlockDirective",
        name: "animation",
        propsRaw: "format=\"lottie\" src=\"/animations/demo.json\" autoplay=true loop=true controls=true",
        body: []
      }
    ]
  };

  const html = renderIRToHtml(astJsonToRenderIR(ast));
  assert.ok(html.includes("data-cmk-checklist-type=\"default\""));
  assert.ok(html.includes("text-decoration: line-through"));
  assert.ok(html.includes("class=\"mermaid\""));
  assert.ok(html.includes("<lottie-player"));
});
