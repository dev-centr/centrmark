# Canonical CentrMark examples

This directory holds **one `.cmk` file per major topic** so parsers, renderers, and docs can point at a small, focused sample instead of a single mixed “kitchen sink” file.

| File | Topic |
|------|--------|
| `toc.cmk` | Void directive `:: toc` and the `depth` property |
| `markdown-basics.cmk` | Paragraphs, emphasis, fenced blockquotes |
| `lists.cmk` | Bullets, ordered lists, continuations (`+`) |
| `directives.cmk` | Inline directives and block admonitions |
| `tabs.cmk` | `::: tabs` / `::: tab` for multi-language or multi-tool snippets |
| `checklists.cmk` | Typed checklists (`::: checklist [type=...]`) |
| `diagrams.cmk` | Diagram blocks (`::: diagram`) with Mermaid / PlantUML / Graphviz |
| `animations.cmk` | Animation blocks (`::: animation`) with Lottie/GIF/video metadata |
| `images.cmk` | `@image[...](...)` |
| `semantic-links.cmk` | Semantic links (`[[` … `]]`) and definition lists (`~`) |
| `structural-tables.cmk` | `::: table` layout |
| `literate_programming.cmk` | Literate / SLP-oriented directives |

Smaller **editor** slices (syntax highlighting, nesting edge cases) live under `tools/vscode-cmk/showcase/`, not here.

## Regenerating AST fixtures

The site and renderer tests consume JSON from `centrmark-cli parse`:

```bash
# from repository root; adjust path to your built binary
dlang/centrmark-cli/bin/centrmark-cli parse examples/<name>.cmk > website/public/examples/<slug>.ast.json
```

Use the same **slug** as the website: underscores in filenames become hyphens (e.g. `literate_programming.cmk` → `literate-programming.ast.json`). Then run `pnpm run sync:examples` from `website/` so `.cmk` sources are copied into `website/public/examples/`.
