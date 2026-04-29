import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { createResource } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { k } from './index-Dps0aSs2.mjs';
import { D as De } from './routing-DSdRzhF_.mjs';

var p = ["<main", ' class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16"><!--$-->', '<!--/--><h1 class="text-4xl font-heading font-bold mb-2 text-foreground">', '</h1><p class="text-muted-foreground mb-8">Canonical AST JSON produced by the reference implementation.</p><!--$-->', '<!--/--><div class="mt-6"><a href="', '" class="text-primary underline">Back to CMK source</a></div></main>'], n = ["<div", ">Loading...</div>"], u = ["<pre", ' class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-4 text-sm"><code>', "</code></pre>"];
async function f(r) {
  const e = await fetch(r);
  if (!e.ok) throw new Error(`Failed to fetch ${r}: ${e.status}`);
  return await e.text();
}
function g() {
  const r = De(), e = () => r.slug, [o] = createResource(() => void 0 , (i) => f(`/examples/${i}.ast.json`));
  return ssr(p, ssrHydrationKey(), escape(createComponent(k, { children: "AST - CentrMark" })), escape(e()), o.loading ? n[0] + ssrHydrationKey() + n[1] : o() ? ssr(u, ssrHydrationKey(), escape(o())) : escape(null), `/examples/${escape(e(), true)}`);
}

export { g as default };
//# sourceMappingURL=index4.mjs.map
