import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { createResource } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import { D as De, k } from '../_/nitro.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/destr/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/h3/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/hookable/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ofetch/dist/node.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/node-mock-http/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ufo/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/klona/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/defu/dist/defu.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/scule/dist/index.mjs';
import 'node:async_hooks';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unctx/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/radix3/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/vinxi/lib/app-fetch.js';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/vinxi/lib/app-manifest.js';
import 'node:fs';
import 'node:url';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/pathe/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/cookie-es/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval/dist/esm/production/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval-plugins/dist/esm/production/web.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ohash/dist/index.mjs';

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
//# sourceMappingURL=index22.mjs.map
