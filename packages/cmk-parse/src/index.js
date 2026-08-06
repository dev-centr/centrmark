"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAstFromJsonText = exports.renderIRToHtml = exports.astJsonToRenderIR = void 0;
exports.parseCmk = parseCmk;
exports.parseCmkFile = parseCmkFile;
exports.cmkToHtml = cmkToHtml;
exports.cmkFileToHtml = cmkFileToHtml;
const node_child_process_1 = require("node:child_process");
const promises_1 = require("node:fs/promises");
const node_os_1 = require("node:os");
const node_path_1 = require("node:path");
const cmk_renderer_1 = require("@centrmark/cmk-renderer");
Object.defineProperty(exports, "astJsonToRenderIR", { enumerable: true, get: function () { return cmk_renderer_1.astJsonToRenderIR; } });
Object.defineProperty(exports, "parseAstFromJsonText", { enumerable: true, get: function () { return cmk_renderer_1.parseAstFromJsonText; } });
Object.defineProperty(exports, "renderIRToHtml", { enumerable: true, get: function () { return cmk_renderer_1.renderIRToHtml; } });
function resolveCliPath(options) {
    return options?.cliPath || process.env.CENTRMARK_CLI || "centrmark-cli";
}
function runCli(cliPath, args, stdinText) {
    return new Promise((resolve, reject) => {
        const child = (0, node_child_process_1.spawn)(cliPath, args, {
            stdio: ["pipe", "pipe", "pipe"],
            shell: false,
            windowsHide: true
        });
        let stdout = "";
        let stderr = "";
        child.stdout.setEncoding("utf8");
        child.stderr.setEncoding("utf8");
        child.stdout.on("data", (chunk) => {
            stdout += chunk;
        });
        child.stderr.on("data", (chunk) => {
            stderr += chunk;
        });
        child.on("error", (err) => {
            reject(new Error(`Failed to spawn CentrMark CLI (${cliPath}). Set CENTRMARK_CLI or install centrmark-cli on PATH. ${err.message}`));
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
        }
        else {
            child.stdin.end();
        }
    });
}
/**
 * Parse CentrMark source text into a canonical AST document via centrmark-cli.
 * Uses a temporary file because the CLI's stdin path is parse --stdin.
 */
async function parseCmk(source, options) {
    const cliPath = resolveCliPath(options);
    const dir = await (0, promises_1.mkdtemp)(node_path_1.default.join((0, node_os_1.tmpdir)(), "cmk-parse-"));
    const filePath = node_path_1.default.join(dir, "input.cmk");
    try {
        await (0, promises_1.writeFile)(filePath, source, "utf8");
        const jsonText = await runCli(cliPath, ["parse", filePath]);
        return (0, cmk_renderer_1.parseAstFromJsonText)(jsonText.replace(/^\uFEFF/, "").trim());
    }
    finally {
        await (0, promises_1.rm)(dir, { recursive: true, force: true });
    }
}
/** Parse a `.cmk` file from disk. */
async function parseCmkFile(filePath, options) {
    const cliPath = resolveCliPath(options);
    const jsonText = await runCli(cliPath, ["parse", node_path_1.default.resolve(filePath)]);
    return (0, cmk_renderer_1.parseAstFromJsonText)(jsonText.replace(/^\uFEFF/, "").trim());
}
/** Parse CentrMark source and render HTML via `@centrmark/cmk-renderer`. */
async function cmkToHtml(source, options) {
    const ast = await parseCmk(source, options);
    return (0, cmk_renderer_1.renderIRToHtml)((0, cmk_renderer_1.astJsonToRenderIR)(ast));
}
/** Read a `.cmk` file and render HTML. */
async function cmkFileToHtml(filePath, options) {
    const ast = await parseCmkFile(filePath, options);
    return (0, cmk_renderer_1.renderIRToHtml)((0, cmk_renderer_1.astJsonToRenderIR)(ast));
}
