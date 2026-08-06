# @centrmark/solid

Solid components for CentrMark HTML/AST rendering.

```tsx
import { Cmk, CmkHtml } from "@centrmark/solid";

<CmkHtml html={preRenderedHtml} />
<Cmk ast={astDocument} />
```

Parse `.cmk` on the server with `@centrmark/parse` (or at build time with `@centrmark/astro`), then pass `html` or `ast` into these components.
