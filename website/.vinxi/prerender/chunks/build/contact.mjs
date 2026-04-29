import { ssr, ssrHydrationKey, escape, createComponent } from 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/web/dist/server.js';
import { k } from './index-Dps0aSs2.mjs';
import 'file://Z:/code/github.com/dev-centr/centrmark/website/node_modules/solid-js/dist/server.js';

var a = ["<main", ' class="layout-reserved max-w-2xl mx-auto min-h-screen pt-24 pb-16"><!--$-->', '<!--/--><h1 class="text-4xl font-heading font-bold mb-8 text-foreground">Contact Us</h1><p class="text-muted-foreground font-body mb-8">Have questions about the platform, or interested in claiming your food truck? Reach out below.</p><form class="flex flex-col gap-4 max-w-sm"><div class="flex flex-col gap-1"><label class="font-body text-sm text-foreground">Email</label><input type="email" class="h-10 px-3 rounded-md border border-border bg-input/20 focus:outline-none focus:ring-2 focus:ring-ring"></div><div class="flex flex-col gap-1"><label class="font-body text-sm text-foreground">Message</label><textarea rows="5" class="p-3 rounded-md border border-border bg-input/20 focus:outline-none focus:ring-2 focus:ring-ring"></textarea></div><button class="h-10 px-4 rounded-md bg-primary text-primary-foreground font-medium mt-4 hover:bg-primary/90 transition-colors">Send Message</button></form></main>'];
function i() {
  return ssr(a, ssrHydrationKey(), escape(createComponent(k, { children: "Contact - Food Truck Nerdz" })));
}

export { i as default };
//# sourceMappingURL=contact.mjs.map
