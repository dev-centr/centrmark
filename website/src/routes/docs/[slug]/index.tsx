import { createResource } from "solid-js";
import { Title } from "@solidjs/meta";
import { useParams } from "@solidjs/router";

const DOC_MAP: Record<string, { file: string; title: string }> = {
  README: { file: "README.adoc", title: "Spec Overview" },
  informal: { file: "informal.adoc", title: "Informal Specification" },
  formal_grammar: { file: "formal_grammar.ebnf", title: "Formal Grammar (EBNF)" },
  changelog: { file: "changelog.adoc", title: "Changelog" },
  certification: { file: "CERTIFICATION.adoc", title: "Conformance & Certification" },
  licensing: { file: "LICENSING.adoc", title: "Licensing Intent" },
  trademark: { file: "TRADEMARK.adoc", title: "Trademark Guidelines" },
  "commercial-license": { file: "COMMERCIAL-LICENSE.adoc", title: "Commercial Licensing Lane" },
};

async function fetchText(path: string): Promise<string> {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return await res.text();
}

export default function DocView() {
  const params = useParams();
  const slug = () => params.slug;

  const [docText] = createResource(
    () => (typeof window === "undefined" ? undefined : slug()),
    async (s) => {
      const m = DOC_MAP[s];
      if (!m) throw new Error(`Unknown doc slug: ${s}`);
      return await fetchText(`/docs/${m.file}`);
    },
  );

  const docMeta = () => DOC_MAP[slug()];

  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16">
      <Title>{docMeta()?.title ?? "Doc"}</Title>

      <h1 class="text-4xl font-heading font-bold mb-3 text-foreground">{docMeta()?.title}</h1>

      {docText.loading ? (
        <div>Loading...</div>
      ) : docText() ? (
        <pre class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/20 p-4 text-sm">
          <code>{docText()}</code>
        </pre>
      ) : null}
    </main>
  );
}

