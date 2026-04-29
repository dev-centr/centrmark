import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { k } from './index-Dps0aSs2.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';

var n = ["<main", ' class="layout-reserved max-w-4xl mx-auto min-h-screen pt-24 pb-16"><!--$-->', '<!--/--><h1 class="text-4xl font-heading font-bold mb-8 text-foreground">Privacy Policy</h1><section class="prose dark:prose-invert max-w-none font-body text-muted-foreground"><h2>Geolocation Data</h2><p>Food Truck Nerdz requests IP-based and mobile geolocation to provide distance-based truck routing. This information is processed transiently unless explicitly saved.</p><h2>Authentication</h2><p>We use industry-standard bearer token mechanisms. Your passwords are hashed and never stored in plain text.</p><h2>Third Party Vendors</h2><p>Telemetry metrics and geographic data routing are securely passed through to Vercel and map rendering providers without identifying personal markers.</p></section></main>'];
function c() {
  return ssr(n, ssrHydrationKey(), escape(createComponent(k, { children: "Privacy Policy - Food Truck Nerdz" })));
}

export { c as default };
//# sourceMappingURL=privacy.mjs.map
