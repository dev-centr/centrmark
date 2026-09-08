# @centrmark/cmk-renderer

Shared CentrMark rendering pipeline for web and editor integrations.

## API

- `astJsonToRenderIR(document)`
- `renderIRToHtml(ir)`
- `DFfiParserAdapter`
- `StaticAstParserAdapter`

## Built-in block directive rendering

`renderIRToHtml` includes first-party HTML mappings for:

- `::: checklist [type="..."]` (supports `[ ]`, `[x]`, `[-]`, `[/]`)
- `::: diagram [format="mermaid|plantuml|graphviz|dot" ...]`
- `::: animation [format="lottie|gif|mp4|webm|..." src="..."]`
- `@image[src="..." alt="..." themed=true]` — accessible images; `themed=true` adds `data-themed-svg` for adaptive SVG host upgrade
- Literary sources: `@cite[key="..."]` / `@cite[keys="a,b"]`, `::: sources` + nested `::: source`, and void `:: bibliography`
