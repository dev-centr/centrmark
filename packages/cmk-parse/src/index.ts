import { spawn } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  astJsonToRenderIR,
  parseAstFromJsonText,
  renderIRToHtml,
  type CmkAstDocument
} from "@centrmark/cmk-renderer";

export type ParseCmkOptions = {
  /** Absolute path or command name for centrmark-cli. Defaults to CENTRMARK_CLI env or `centrmark-cli`. */
  cliPath?: string;
};

function resolveCliPath(options?: ParseCmkOptions): string {
  return options?.cliPath || process.env.CENTRMARK_CLI || "centrmark-cli";
}

function runCli(cliPath: string, args: string[], stdinText?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(cliPath, args, {
      stdio: ["pipe", "pipe", "pipe"],
      shell: false,
      windowsHide: true
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
    });
    child.stderr.on("data", (chunk: string) => {
      stderr += chunk;
    });
    child.on("error", (err) => {
      reject(
        new Error(
          `Failed to spawn CentrMark CLI (${cliPath}). Set CENTRMARK_CLI or install centrmark-cli on PATH. ${err.message}`
        )
      );
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(`centrmark-cli exited ${code}: ${stderr || stdout}`));
        return;
      }
      resolve(stdout);
    });
    if (stdinText !== undefined) {
      child.stdin.end(stdinText, "utf8");
    } else {
      child.stdin.end();
    }
  });
}

/**
 * Parse CentrMark source text into a canonical AST document via centrmark-cli.
 * Uses a temporary file because the CLI's stdin path is parse --stdin.
 */
export async function parseCmk(
  source: string,
  options?: ParseCmkOptions
): Promise<CmkAstDocument> {
  const cliPath = resolveCliPath(options);
  const dir = await mkdtemp(path.join(tmpdir(), "cmk-parse-"));
  const filePath = path.join(dir, "input.cmk");
  try {
    await writeFile(filePath, source, "utf8");
    const jsonText = await runCli(cliPath, ["parse", filePath]);
    return parseAstFromJsonText(jsonText.replace(/^\uFEFF/, "").trim());
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}

/** Parse a `.cmk` file from disk. */
export async function parseCmkFile(
  filePath: string,
  options?: ParseCmkOptions
): Promise<CmkAstDocument> {
  const cliPath = resolveCliPath(options);
  const jsonText = await runCli(cliPath, ["parse", path.resolve(filePath)]);
  return parseAstFromJsonText(jsonText.replace(/^\uFEFF/, "").trim());
}

/** Parse CentrMark source and render HTML via `@centrmark/cmk-renderer`. */
export async function cmkToHtml(source: string, options?: ParseCmkOptions): Promise<string> {
  const ast = await parseCmk(source, options);
  return renderIRToHtml(astJsonToRenderIR(ast));
}

/** Read a `.cmk` file and render HTML. */
export async function cmkFileToHtml(filePath: string, options?: ParseCmkOptions): Promise<string> {
  const ast = await parseCmkFile(filePath, options);
  return renderIRToHtml(astJsonToRenderIR(ast));
}

export { astJsonToRenderIR, renderIRToHtml, parseAstFromJsonText };
export type { CmkAstDocument };
