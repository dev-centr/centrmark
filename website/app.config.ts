import { defineConfig } from "@solidjs/start/config";
import { getPrerenderRoutes, SITE_BASE } from "./scripts/site-routes.mjs";

const base = `${SITE_BASE}/`;

export default defineConfig({
  server: {
    preset: "static",
    baseURL: SITE_BASE,
    prerender: {
      crawlLinks: true,
      routes: getPrerenderRoutes(),
    },
  },
  vite: {
    base,
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
