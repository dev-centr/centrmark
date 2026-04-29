import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { createResource } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { k } from './index-Dps0aSs2.mjs';
import { D as De } from './routing-DSdRzhF_.mjs';

var p = ["<main", ' class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16"><!--$-->', '<!--/--><h1 class="text-4xl font-heading font-bold mb-3 text-foreground">', "</h1><!--$-->", "<!--/--></main>"], s = ["<div", ">Loading...</div>"], w = ["<pre", ' class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/20 p-4 text-sm"><code>', "</code></pre>"];
const m = { README: { file: "README.adoc", title: "Spec Overview" }, informal: { file: "informal.adoc", title: "Informal Specification" }, formal_grammar: { file: "formal_grammar.ebnf", title: "Formal Grammar (EBNF)" }, changelog: { file: "changelog.adoc", title: "Changelog" }, certification: { file: "CERTIFICATION.adoc", title: "Conformance & Certification" }, licensing: { file: "LICENSING.adoc", title: "Licensing Intent" }, trademark: { file: "TRADEMARK.adoc", title: "Trademark Guidelines" }, "commercial-license": { file: "COMMERCIAL-LICENSE.adoc", title: "Commercial Licensing Lane" } };
async function h(t) {
  const e = await fetch(t);
  if (!e.ok) throw new Error(`Failed to fetch ${t}: ${e.status}`);
  return await e.text();
}
function I() {
  var _a;
  const t = De(), e = () => t.slug, [r] = createResource(() => void 0 , async (n) => {
    const c = m[n];
    if (!c) throw new Error(`Unknown doc slug: ${n}`);
    return await h(`/docs/${c.file}`);
  }), i = () => m[e()];
  return ssr(p, ssrHydrationKey(), escape(createComponent(k, { get children() {
    var _a2, _b;
    return (_b = (_a2 = i()) == null ? void 0 : _a2.title) != null ? _b : "Doc";
  } })), escape((_a = i()) == null ? void 0 : _a.title), r.loading ? s[0] + ssrHydrationKey() + s[1] : r() ? ssr(w, ssrHydrationKey(), escape(r())) : escape(null));
}

export { I as default };
//# sourceMappingURL=index2.mjs.map
