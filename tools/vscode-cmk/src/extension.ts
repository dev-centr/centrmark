import * as vscode from "vscode";

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
}

export function deactivate(): void {
  // No-op.
}
