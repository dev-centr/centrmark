# CentrMark (CMK) VS Code Extension

Baseline Visual Studio Code language support for CentrMark (`.cmk`) using the pure block model.

## Scope

- Registers `cmk` language for `.cmk` files.
- Adds TextMate grammar for `:::` block directives.
- Adds TextMate grammar support for CMK void directives: `::: include ...` and `::: set ...`.
- Adds semantic token provider that colors `:::` block markers by computed nesting depth.
- Includes split showcase samples under `showcase/` (one file per major feature axis).

## Pure block nesting model

CMK nesting is expressed only through normal block containers:

```cmk
::: table
::: row
::: col
Cell content
:::
::: col

::: quote
Nested quote in a cell
:::

:::
:::
:::
```

No dedicated nest token (`<<` / `>>`) is required.

### Void directives (non-nesting)

CMK supports void directives for reusable document composition:

```cmk
::: include file="./partials/intro.cmk"
::: set name="project" value="FoodTruckNerdz Site"
```

These directives are treated as single-line directives and do not change nesting depth.

In official examples, surround nested blocks with an empty line before and after the nested block to improve visual parsing.

## Showcase files

Use focused showcase samples instead of one large mixed document:

- `showcase/01-blocks.cmk`
- `showcase/02-tables.cmk`
- `showcase/03-quotes-and-lists.cmk`
- `showcase/04-mixed-nesting.cmk`
- `showcase/05-edge-cases.cmk`
- `showcase/06-includes-and-reuse.cmk`

These are extension-focused fixture files for syntax/highlighting behavior.
Canonical project examples live in `examples/*.cmk` at the repository root (one file per major topic; see `examples/README.md`). The `tools/vscode-cmk/showcase/` tree holds smaller slices for the VS Code extension.

## Color customization by depth

The extension emits semantic token types:

- `cmkNest0`
- `cmkNest1`
- `cmkNest2`
- `cmkNest3`
- `cmkNest4`
- `cmkNest5` (depth 5+)

You can style these in your theme, for example:

```json
"editor.semanticTokenColorCustomizations": {
  "rules": {
    "cmkNest0": "#7aa2f7",
    "cmkNest1": "#9ece6a",
    "cmkNest2": "#e0af68",
    "cmkNest3": "#f7768e",
    "cmkNest4": "#bb9af7",
    "cmkNest5": "#7dcfff"
  }
}
```

## Development

```bash
pnpm install
pnpm build
```

## Packaging

- Microsoft Marketplace: `pnpm package`
- Open VSX: `pnpm publish:ovsx`

Before publishing, update `publisher`, `name`, and credentials in `package.json`.
