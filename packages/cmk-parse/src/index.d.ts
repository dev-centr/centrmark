import { astJsonToRenderIR, parseAstFromJsonText, renderIRToHtml, type CmkAstDocument } from "@centrmark/cmk-renderer";
export type ParseCmkOptions = {
    /** Absolute path or command name for centrmark-cli. Defaults to CENTRMARK_CLI env or `centrmark-cli`. */
    cliPath?: string;
};
/**
 * Parse CentrMark source text into a canonical AST document via centrmark-cli.
 * Uses a temporary file because the CLI's stdin path is parse --stdin.
 */
export declare function parseCmk(source: string, options?: ParseCmkOptions): Promise<CmkAstDocument>;
/** Parse a `.cmk` file from disk. */
export declare function parseCmkFile(filePath: string, options?: ParseCmkOptions): Promise<CmkAstDocument>;
/** Parse CentrMark source and render HTML via `@centrmark/cmk-renderer`. */
export declare function cmkToHtml(source: string, options?: ParseCmkOptions): Promise<string>;
/** Read a `.cmk` file and render HTML. */
export declare function cmkFileToHtml(filePath: string, options?: ParseCmkOptions): Promise<string>;
export { astJsonToRenderIR, renderIRToHtml, parseAstFromJsonText };
export type { CmkAstDocument };
