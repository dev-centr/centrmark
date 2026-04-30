import { createResource, For } from "solid-js";
import { Title } from "@solidjs/meta";

async function fetchText(path: string): Promise<string> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return await res.text();
}

export default function Home() {
  const [cmkSource] = createResource(
    () => (typeof window === "undefined" ? undefined : "/examples/toc.cmk"),
    (p) => fetchText(p as string),
  );
  const [cmkAstJson] = createResource(
    () => (typeof window === "undefined" ? undefined : "/examples/toc.ast.json"),
    (p) => fetchText(p as string),
  );

  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16">
      <Title>CentrMark (CMK)</Title>

      <section class="mb-10">
        <h1 class="text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground">
          CentrMark
          <span class="text-primary"> (.cmk)</span>
        </h1>
        <p class="mt-4 text-muted-foreground text-lg leading-relaxed">
          A declarative markup format for modern technical writing and developer documentation.
        </p>

        <div class="mt-8 flex flex-wrap gap-3">
          <a href="/examples" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            See Examples
          </a>
          <a href="/docs/README" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-border bg-background hover:bg-accent/50 transition-colors">
            Read the Spec
          </a>
        </div>
      </section>

      <section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 class="text-xl font-heading font-semibold mb-3">Home Example (CMK)</h2>
          {cmkSource.loading ? (
            <div>Loading...</div>
          ) : cmkSource() ? (
            <pre class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-4 text-sm">
              <code>{cmkSource()}</code>
            </pre>
          ) : null}

          <div class="mt-3 text-sm text-muted-foreground">
            Output: <a href="/examples/toc/ast" class="text-primary underline">AST JSON</a>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-heading font-semibold mb-3">Canonical Output</h2>
          {cmkAstJson.loading ? (
            <div>Loading...</div>
          ) : cmkAstJson() ? (
            <pre class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-4 text-sm">
              <code>{cmkAstJson()}</code>
            </pre>
          ) : null}
        </div>
      </section>

      <section class="mt-10">
        <h2 class="text-xl font-heading font-semibold mb-3">Quick Links</h2>
        <ul class="list-disc pl-6 text-muted-foreground space-y-2">
          <For each={["informal", "formal_grammar", "changelog", "CERTIFICATION", "LICENSING", "TRADEMARK"]}>
            {(slug) => (
              <li>
                <a href={`/docs/${slug}`} class="text-primary hover:underline">
                  {slug}
                </a>
              </li>
            )}
          </For>
        </ul>
      </section>
    </main>
  );
}

