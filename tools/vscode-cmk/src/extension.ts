import * as vscode from "vscode";
import { astJsonToRenderIR, renderIRToHtml, type CmkAstDocument } from "@centrmark/cmk-renderer";

const legend = new vscode.SemanticTokensLegend([
  "cmkNest0",
  "cmkNest1",
  "cmkNest2",
  "cmkNest3",
  "cmkNest4",
  "cmkNest5"
]);

const blockOpenPattern = /^\s*:::\s*([A-Za-z][\w-]*)\b.*$/;
const blockClosePattern = /^\s*:::\s*$/;
const voidDirectivePattern = /^\s*:::\s*(include|set)\b.*$/;

function tokenTypeForDepth(depth: number): number {
  if (depth <= 0) {
    return 0;
  }
  if (depth === 1) {
    return 1;
  }
  if (depth === 2) {
    return 2;
  }
  if (depth === 3) {
    return 3;
  }
  if (depth === 4) {
    return 4;
  }
  return 5;
}

function buildTokens(document: vscode.TextDocument): vscode.SemanticTokens {
  const builder = new vscode.SemanticTokensBuilder(legend);
  let depth = 0;

  for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber += 1) {
    const line = document.lineAt(lineNumber).text;
    const markerIndex = line.indexOf(":::");

    if (markerIndex < 0) {
      continue;
    }

    if (blockClosePattern.test(line)) {
      depth = Math.max(0, depth - 1);
      builder.push(lineNumber, markerIndex, 3, tokenTypeForDepth(depth), 0);
      continue;
    }

    if (voidDirectivePattern.test(line)) {
      builder.push(lineNumber, markerIndex, 3, tokenTypeForDepth(depth), 0);
      continue;
    }

    if (blockOpenPattern.test(line)) {
      builder.push(lineNumber, markerIndex, 3, tokenTypeForDepth(depth), 0);
      depth += 1;
    }
  }

  return builder.build();
}

function sourceToFallbackAst(source: string): CmkAstDocument {
  const lines = source.split(/\r?\n/);
  const blocks: CmkAstDocument["blocks"] = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith("### ")) {
      blocks?.push({ kind: "Heading", level: 3, inlines: [{ kind: "Text", text: trimmed.slice(4) }] });
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks?.push({ kind: "Heading", level: 2, inlines: [{ kind: "Text", text: trimmed.slice(3) }] });
      continue;
    }
    if (trimmed.startsWith("# ")) {
      blocks?.push({ kind: "Heading", level: 1, inlines: [{ kind: "Text", text: trimmed.slice(2) }] });
      continue;
    }
    blocks?.push({ kind: "Paragraph", inlines: [{ kind: "Text", text: trimmed }] });
  }
  return { blocks: blocks ?? [] };
}

function renderPreviewHtml(document: vscode.TextDocument): string {
  const ast = sourceToFallbackAst(document.getText());
  const rendered = renderIRToHtml(astJsonToRenderIR(ast));
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CentrMark Preview</title>
    <style>
      body { font-family: system-ui, sans-serif; margin: 1.25rem; line-height: 1.5; }
      .cmk-render h1, .cmk-render h2, .cmk-render h3, .cmk-render h4 { margin-top: 1.25rem; }
      .cmk-render pre { background: #f3f4f6; padding: 0.75rem; border-radius: 6px; overflow-x: auto; }
      .cmk-render code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      .hint { margin-top: 1rem; color: #5b6470; font-size: 0.9rem; }
    </style>
  </head>
  <body>
    ${rendered}
    <p class="hint">Preview uses shared renderer IR/HTML pipeline. Full D parser adapter integration is planned next.</p>
  </body>
</html>`;
}

export function activate(context: vscode.ExtensionContext): void {
  const selector: vscode.DocumentSelector = { language: "cmk" };
  const provider: vscode.DocumentSemanticTokensProvider = {
    provideDocumentSemanticTokens(document: vscode.TextDocument): vscode.ProviderResult<vscode.SemanticTokens> {
      return buildTokens(document);
    }
  };

  context.subscriptions.push(
    vscode.languages.registerDocumentSemanticTokensProvider(selector, provider, legend)
  );

  let panel: vscode.WebviewPanel | undefined;
  const renderPanel = (document: vscode.TextDocument): void => {
    if (document.languageId !== "cmk") return;
    if (!panel) {
      panel = vscode.window.createWebviewPanel(
        "centrmarkPreview",
        "CentrMark Preview",
        vscode.ViewColumn.Beside,
        { enableScripts: false }
      );
      panel.onDidDispose(() => {
        panel = undefined;
      });
    }
    panel.title = `CentrMark Preview - ${vscode.workspace.asRelativePath(document.uri)}`;
    panel.webview.html = renderPreviewHtml(document);
  };

  context.subscriptions.push(
    vscode.commands.registerCommand("centrmark.preview", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor || editor.document.languageId !== "cmk") {
        void vscode.window.showInformationMessage("Open a .cmk file to preview CentrMark output.");
        return;
      }
      renderPanel(editor.document);
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      if (panel && event.document.languageId === "cmk") {
        renderPanel(event.document);
      }
    })
  );

  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (panel && editor?.document.languageId === "cmk") {
        renderPanel(editor.document);
      }
    })
  );
}

export function deactivate(): void {
  // No-op.
}
