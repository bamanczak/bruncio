import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import icon from "astro-icon";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: 'https://brunc.io',
  integrations: [mdx(), sitemap(), react(), tailwind(), icon({
    include: {
      mdi: ["*"],
      // (Default) Loads entire Material Design Icon set
      "material-symbols": ["*"],
      // (Default) Loads entire Material Design Icon set
      "pixelarticons": ["*"]
    }
  }), svelte()],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true }
  })
});