# @centrmark/astro

Astro **integration** + **content loader** for CentrMark (`.cmk`) static site generation.

## Setup

```ts
// astro.config.mjs
import { defineConfig } from "astro/config";
import centrmark from "@centrmark/astro";

export default defineConfig({
  integrations: [
    centrmark({
      // optional: cliPath: "C:/code/Dev-Centr/centrmark/dlang/centrmark-cli/bin/centrmark-cli.exe"
    })
  ]
});
```

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { centrmarkLoader } from "@centrmark/astro";

const blogMd = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().optional().default(false)
  })
});

const blogCmk = defineCollection({
  loader: centrmarkLoader({ base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    draft: z.boolean().default(false),
    html: z.string(),
    cmkSource: z.string().optional()
  })
});

export const collections = { blog: blogMd, blogCmk };
```

In a page:

```astro
---
const { entry } = Astro.props;
---
<article class="prose" set:html={entry.data.html} />
```

Requires `centrmark-cli` on `PATH` or `CENTRMARK_CLI`.
