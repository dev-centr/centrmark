import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { k, A } from '../_/nitro.mjs';
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
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/storage/dist/storage.js';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval/dist/esm/production/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/seroval-plugins/dist/esm/production/web.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/dist/index.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/unstorage/drivers/fs-lite.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/ohash/dist/index.mjs';

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
//# sourceMappingURL=index32.mjs.map
