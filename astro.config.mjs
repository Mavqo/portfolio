// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://mavqo.dev',
  output: 'static',
  integrations: [tailwind()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it', 'de', 'fr'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    ssr: {
      noExternal: ['framer-motion']
    }
  }
});
