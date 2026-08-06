# Vanilla JS with CentrMark

There is no separate `@centrmark/vanilla` package. Use the shared renderer (and optionally `@centrmark/parse` in Node).

## Browser (pre-parsed AST)

```html
<script type="module">
  import {
    astJsonToRenderIR,
    renderIRToHtml
  } from "https://esm.sh/@centrmark/cmk-renderer@0.3.0";

  const ast = await fetch("/posts/hello.ast.json").then((r) => r.json());
  document.getElementById("out").innerHTML = renderIRToHtml(astJsonToRenderIR(ast));
</script>
<div id="out"></div>
```

## Node (parse + render)

```js
import { cmkToHtml } from "@centrmark/parse";
import { writeFile } from "node:fs/promises";

const html = await cmkToHtml("# Hello\n\nBody.\n");
await writeFile("out.html", `<!doctype html><html><body>${html}</body></html>`);
```

Set `CENTRMARK_CLI` to your `centrmark-cli` binary when it is not on `PATH`.
