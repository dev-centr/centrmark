import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

const DOCS: Array<{ slug: string; title: string }> = [
  { slug: "README", title: "Spec Overview" },
  { slug: "informal", title: "Informal Specification" },
  { slug: "formal_grammar", title: "Formal Grammar (EBNF)" },
  { slug: "changelog", title: "Changelog" },
  { slug: "certification", title: "Conformance & Certification" },
  { slug: "licensing", title: "Licensing Intent (AGPL + lanes)" },
  { slug: "trademark", title: "Trademark Guidelines" },
  { slug: "commercial-license", title: "Commercial Licensing Lane" },
];

export default function DocsIndex() {
  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16">
      <Title>Docs - CentrMark</Title>

      <h1 class="text-4xl font-heading font-bold mb-6 text-foreground">Documentation</h1>
      <p class="text-muted-foreground mb-8">
        This site renders the CentrMark documentation and provides links to example inputs and their canonical AST outputs.
      </p>

      <ul class="space-y-4">
        {DOCS.map((d) => (
          <li class="rounded-lg border border-border bg-card/30 p-5">
            <A href={`/docs/${d.slug}`} class="text-lg font-semibold text-foreground hover:underline">
              {d.title}
            </A>
            <div class="text-sm text-muted-foreground mt-1">{`/docs/${d.slug}`}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}

