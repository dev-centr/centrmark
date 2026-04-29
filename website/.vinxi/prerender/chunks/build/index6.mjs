import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { createResource, For } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { k } from './index-Dps0aSs2.mjs';

var f = ["<main", ' class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16"><!--$-->', '<!--/--><section class="mb-10"><h1 class="text-4xl md:text-6xl font-heading font-bold tracking-tight text-foreground">CentrMark<span class="text-primary"> (.cmk)</span></h1><p class="mt-4 text-muted-foreground text-lg leading-relaxed">A declarative markup format for modern technical writing and developer documentation.</p><div class="mt-8 flex flex-wrap gap-3"><a href="/examples" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">See Examples</a><a href="/docs/README" class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium border border-border bg-background hover:bg-accent/50 transition-colors">Read the Spec</a></div></section><section class="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"><div><h2 class="text-xl font-heading font-semibold mb-3">Home Example (CMK)</h2><!--$-->', '<!--/--><div class="mt-3 text-sm text-muted-foreground">Output: <a href="/examples/showcase/ast" class="text-primary underline">AST JSON</a></div></div><div><h2 class="text-xl font-heading font-semibold mb-3">Canonical Output</h2><!--$-->', '<!--/--></div></section><section class="mt-10"><h2 class="text-xl font-heading font-semibold mb-3">Quick Links</h2><ul class="list-disc pl-6 text-muted-foreground space-y-2">', "</ul></section></main>"], n = ["<div", ">Loading...</div>"], l = ["<pre", ' class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-4 text-sm"><code>', "</code></pre>"], u = ["<li", '><a href="', '" class="text-primary hover:underline">', "</a></li>"];
async function c(r) {
  const t = await fetch(r);
  if (!t.ok) throw new Error(`Failed to fetch ${r}: ${t.status}`);
  return await t.text();
}
function b() {
  const [r] = createResource(() => void 0 , (o) => c(o)), [t] = createResource(() => void 0 , (o) => c(o));
  return ssr(f, ssrHydrationKey(), escape(createComponent(k, { children: "CentrMark (CMK)" })), r.loading ? n[0] + ssrHydrationKey() + n[1] : r() ? ssr(l, ssrHydrationKey(), escape(r())) : escape(null), t.loading ? n[0] + ssrHydrationKey() + n[1] : t() ? ssr(l, ssrHydrationKey(), escape(t())) : escape(null), escape(createComponent(For, { each: ["informal", "formal_grammar", "changelog", "CERTIFICATION", "LICENSING", "TRADEMARK"], children: (o) => ssr(u, ssrHydrationKey(), `/docs/${escape(o, true)}`, escape(o)) })));
}

export { b as default };
//# sourceMappingURL=index6.mjs.map
