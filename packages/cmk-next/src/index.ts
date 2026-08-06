import { cmkFileToHtml, cmkToHtml, parseCmk, parseCmkFile } from "@centrmark/parse";
import type { CmkAstDocument } from "@centrmark/parse";

export { Cmk, CmkHtml } from "@centrmark/react";
export type { CmkProps, CmkHtmlProps } from "@centrmark/react";

export type RenderCmkResult = {
  html: string;
  ast: CmkAstDocument;
};

/** Server/SSG helper: parse CentrMark source and return HTML + AST for RSC pages. */
export async function renderCmk(
  source: string,
  options?: { cliPath?: string }
): Promise<RenderCmkResult> {
  const ast = await parseCmk(source, options);
  const html = await cmkToHtml(source, options);
  return { html, ast };
}

/** Server/SSG helper: parse a `.cmk` file from disk. */
export async function renderCmkFile(
  filePath: string,
  options?: { cliPath?: string }
): Promise<RenderCmkResult> {
  const ast = await parseCmkFile(filePath, options);
  const html = await cmkFileToHtml(filePath, options);
  return { html, ast };
}
