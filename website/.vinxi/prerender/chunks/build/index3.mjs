import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { k } from './index-Dps0aSs2.mjs';
import { A } from './components-DYk6YKKa.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import './routing-DSdRzhF_.mjs';

var n = ["<main", ' class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16"><!--$-->', '<!--/--><h1 class="text-4xl font-heading font-bold mb-6 text-foreground">Examples</h1><p class="text-muted-foreground mb-8">Each example has both its <span class="text-foreground">CMK source</span> and the canonical <span class="text-foreground">AST JSON</span> output page.</p><ul class="space-y-4">', "</ul></main>"], i = ["<li", ' class="rounded-lg border border-border bg-card/30 p-5"><div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3"><div><div class="text-lg font-semibold text-foreground">', '</div><div class="text-sm text-muted-foreground">/examples/<!--$-->', '<!--/--></div></div><div class="flex gap-3 flex-wrap"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div></li>"];
const d = [{ slug: "showcase", title: "Feature Showcase" }, { slug: "literate-programming", title: "Literate Programming (SLP)" }];
function g() {
  return ssr(n, ssrHydrationKey(), escape(createComponent(k, { children: "Examples - CentrMark" })), escape(d.map((t) => ssr(i, ssrHydrationKey(), escape(t.title), escape(t.slug), escape(createComponent(A, { get href() {
    return `/examples/${t.slug}`;
  }, class: "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-border bg-background hover:bg-accent/50 transition-colors", children: "View CMK" })), escape(createComponent(A, { get href() {
    return `/examples/${t.slug}/ast`;
  }, class: "inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors", children: "View AST JSON" }))))));
}

export { g as default };
//# sourceMappingURL=index3.mjs.map
