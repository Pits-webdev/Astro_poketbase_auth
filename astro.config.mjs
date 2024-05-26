import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: "server",
  experimental: {
    actions: true,
    rewriting: true,
  },
  adapter: node({
    mode: "standalone",
  }),
  integrations: [tailwind()],
});
