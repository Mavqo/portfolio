// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
// https://astro.build/config
export default defineConfig({
  site: 'https://mavqo.dev',
  output: 'static',
  integrations: [tailwind()],
  vite: {
    ssr: {
      noExternal: ['framer-motion']
    }
  }
});
