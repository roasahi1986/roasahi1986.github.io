import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://roasahi1986.github.io',
  integrations: [mdx(), tailwind()],
  output: 'static',
});
