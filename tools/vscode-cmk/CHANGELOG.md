# Changelog

## Unreleased

- Replaced the deprecated `vsce` dev dependency with its renamed successor `@vscode/vsce` (3.x, already used by `ovsx`), dropping glob 7 and inflight from the tree.

## 0.0.2

- Added CMK void directive support for `include` and `set` in syntax highlighting.
- Updated semantic nesting tokens so void directives do not affect block depth.
- Added include/reuse showcase sample (`showcase/06-includes-and-reuse.cmk`) and README docs.

## 0.0.1

- Initial baseline extension scaffold.
- Added CMK language registration and grammar for `:::` blocks.
- Added semantic token depth coloring for block markers.
