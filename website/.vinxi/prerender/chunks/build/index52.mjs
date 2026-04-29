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

var d = ["<main", ' class="layout-reserved max-w-4xl mx-auto min-h-screen pt-10 pb-16"><!--$-->', '<!--/--><h1 class="text-4xl font-heading font-bold mb-2 text-foreground">', '</h1><p class="text-muted-foreground mb-8">This page shows the canonical CMK source. For the canonical AST output, see <a href="', '" class="text-primary underline">the AST JSON page</a>.</p><!--$-->', "<!--/--></main>"], n = ["<div", ">Loading...</div>"], u = ["<pre", ' class="whitespace-pre-wrap break-words rounded-lg border border-border bg-muted/30 p-4 text-sm"><code>', "</code></pre>"];
async function f(r) {
  const e = await fetch(r);
  if (!e.ok) throw new Error(`Failed to fetch ${r}: ${e.status}`);
  return await e.text();
}
function b() {
  const r = De(), e = () => r.slug, [o] = createResource(() => void 0 , (c) => f(`/examples/${c}.cmk`));
  return ssr(d, ssrHydrationKey(), escape(createComponent(k, { children: "Example - CentrMark" })), escape(e()), `/examples/${escape(e(), true)}/ast`, o.loading ? n[0] + ssrHydrationKey() + n[1] : o() ? ssr(u, ssrHydrationKey(), escape(o())) : escape(null));
}

export { b as default };
//# sourceMappingURL=index52.mjs.map
