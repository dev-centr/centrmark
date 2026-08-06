# @centrmark/parse

Parse CentrMark (`.cmk`) into canonical AST JSON using the D `centrmark-cli`, then optionally render HTML with `@centrmark/cmk-renderer`.

## Requirements

- Node.js 18+
- `centrmark-cli` on `PATH`, or set `CENTRMARK_CLI` to the binary path

Build the CLI from this monorepo:

```powershell
cd dlang/centrmark-cli
dub build
$env:CENTRMARK_CLI = (Resolve-Path .\bin\centrmark-cli.exe).Path
```

## API

```ts
import { parseCmk, parseCmkFile, cmkToHtml, cmkFileToHtml } from "@centrmark/parse";

const ast = await parseCmk("# Hello\n");
const html = await cmkToHtml("# Hello\n");
```

FFI (`DFfiParserAdapter`) remains unwired; this package is CLI-first.

## Vanilla JS (Node)

```js
import { cmkToHtml } from "@centrmark/parse";
import { writeFile } from "node:fs/promises";

const html = await cmkToHtml(await Bun.file("post.cmk").text());
await writeFile("out.html", html);
```

Browser bundles should consume pre-parsed AST JSON or HTML from a build step; do not ship the CLI to the browser.
