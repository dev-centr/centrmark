import { createResource } from "solid-js";
import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";
import { astJsonToRenderIR, renderIRToHtml, type CmkAstDocument } from "@centrmark/cmk-renderer";

async function fetchText(path: string): Promise<string> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return await res.text();
}

export default function ExampleView() {
  const params = useParams();
  const slug = () => params.slug;

  const [cmkSource] = createResource(
    () => (typeof window === "undefined" ? undefined : slug()),
    (s) => fetchText(`/examples/${s}.cmk`),
  );
  const [astJson] = createResource(
    () => (typeof window === "undefined" ? undefined : slug()),
    async (s) => {
      const raw = await fetchText(`/examples/${s}.ast.json`);
      return JSON.parse(raw) as CmkAstDocument;
    },
  );
  const [renderedHtml] = createResource(
    () => astJson(),
    async (doc) => renderIRToHtml(astJsonToRenderIR(doc)),
  );

  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16">
      <Title>{`Example - CentrMark`}</Title>

      <h1 class="text-4xl font-heading font-bold mb-2 text-foreground">{slug()}</h1>
      <p class="text-muted-foreground mb-8">
        This page renders from canonical AST JSON and also shows canonical CMK source. For the AST output, see{" "}
        <a href={`/examples/${slug()}/ast`} class="text-primary underline">the AST JSON page</a>.
      </p>

      {renderedHtml.loading ? (
        <div>Rendering preview...</div>
      ) : renderedHtml() ? (
        <section class="mb-8 rounded-lg border border-border bg-card p-4">
          <h2 class="text-xl font-semibold mb-3">Rendered Preview</h2>
          <div innerHTML={renderedHtml()} />
        </section>
      ) : null}

      {cmkSource.loading ? (
        <div>Loading...</div>
      ) : cmkSource() ? (
        <pre class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-4 text-sm mt-6">
          <code>{cmkSource()}</code>
        </pre>
      ) : null}
    </main>
  );
}

