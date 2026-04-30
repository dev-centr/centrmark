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
