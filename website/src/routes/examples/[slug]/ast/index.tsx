import { createResource } from "solid-js";
import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";

async function fetchText(path: string): Promise<string> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return await res.text();
}

export default function ExampleAstView() {
  const params = useParams();
  const slug = () => params.slug;

  const [astJson] = createResource(
    () => (typeof window === "undefined" ? undefined : slug()),
    (s) => fetchText(`/examples/${s}.ast.json`),
  );

  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16">
      <Title>{`AST - CentrMark`}</Title>

      <h1 class="text-4xl font-heading font-bold mb-2 text-foreground">{slug()}</h1>
      <p class="text-muted-foreground mb-8">
        Canonical AST JSON produced by the reference implementation.
      </p>

      {astJson.loading ? (
        <div>Loading...</div>
      ) : astJson() ? (
        <pre class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <code>{astJson()}</code>
        </pre>
      ) : null}

      <div class="mt-6">
        <a href={`/examples/${slug()}`} class="text-primary underline">
          Back to CMK source
        </a>
      </div>
    </main>
  );
}

