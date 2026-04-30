import { Title } from "@solidjs/meta";
import { A } from "@solidjs/router";

const EXAMPLES: Array<{ slug: string; title: string }> = [
  { slug: "toc", title: "Table of contents (`:: toc`)" },
  { slug: "markdown-basics", title: "Markdown basics" },
  { slug: "lists", title: "Lists and continuations" },
  { slug: "directives", title: "Directives (inline + admonitions)" },
  { slug: "tabs", title: "Tabs (multi-language / multi-tool)" },
  { slug: "checklists", title: "Checklists" },
  { slug: "diagrams", title: "Diagrams (Mermaid / PlantUML / Graphviz)" },
  { slug: "animations", title: "Animations (Lottie / GIF / video)" },
  { slug: "images", title: "Images (inline directive)" },
  { slug: "semantic-links", title: "Semantic links + definition lists" },
  { slug: "structural-tables", title: "Structural tables" },
  { slug: "literate-programming", title: "Literate programming (SLP)" },
];

export default function ExamplesIndex() {
  return (
    <main class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16">
      <Title>Examples - CentrMark</Title>

      <h1 class="text-4xl font-heading font-bold mb-6 text-foreground">Examples</h1>

      <p class="text-muted-foreground mb-8">
        Each example has both its <span class="text-foreground">CMK source</span> and the canonical{" "}
        <span class="text-foreground">AST JSON</span> output page.
      </p>

      <ul class="space-y-4">
        {EXAMPLES.map((ex) => (
          <li class="rounded-lg border border-border bg-card/30 p-5">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <div class="text-lg font-semibold text-foreground">{ex.title}</div>
                <div class="text-sm text-muted-foreground">/examples/{ex.slug}</div>
              </div>

              <div class="flex gap-3 flex-wrap">
                <A href={`/examples/${ex.slug}`} class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-border bg-background hover:bg-accent/50 transition-colors">
                  View CMK
                </A>
                <A href={`/examples/${ex.slug}/ast`} class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                  View AST JSON
                </A>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

