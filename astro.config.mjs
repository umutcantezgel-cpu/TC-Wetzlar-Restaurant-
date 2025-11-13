import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/503') &&
        !page.includes('/offline'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  site: 'https://tc-wetzlar-restaurant.de',
  base: '/',
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'never',
    assets: 'assets',
  },
  output: 'static',
  compressHTML: true,
  vite: {
    build: {
      cssCodeSplit: false,
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          entryFileNames: 'assets/js/[name].[hash].js',
          chunkFileNames: 'assets/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'assets/css/[name].[hash][extname]';
            }
            if (assetInfo.name.match(/\.(woff2?|ttf|otf|eot)$/)) {
              return 'assets/font/[name].[hash][extname]';
            }
            if (assetInfo.name.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/)) {
              return 'assets/img/[name].[hash][extname]';
            }
            return 'assets/[name].[hash][extname]';
          },
        },
      },
    },
  },
});
