# @centrmark/next

Next.js helpers for CentrMark. Re-exports React components and adds server-side `renderCmk` / `renderCmkFile`.

```tsx
// app/blog/[slug]/page.tsx (Server Component)
import { renderCmkFile, CmkHtml } from "@centrmark/next";
import path from "node:path";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { html } = await renderCmkFile(path.join(process.cwd(), "content", `${slug}.cmk`));
  return <CmkHtml html={html} />;
}
```

Requires `centrmark-cli` on PATH (or `CENTRMARK_CLI`) at build/request time.
