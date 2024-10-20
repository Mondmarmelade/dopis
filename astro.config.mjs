import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import icon from "astro-icon";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), icon()],
  adapter: netlify(),
});
