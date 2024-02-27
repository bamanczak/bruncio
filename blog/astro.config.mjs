import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), react(), tailwind(), icon({
    include: {
      mdi: ["*"], // (Default) Loads entire Material Design Icon set
      "material-symbols": ["*"], // (Default) Loads entire Material Design Icon set
    },
  })]

});