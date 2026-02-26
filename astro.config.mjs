// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://exyukanali.tv';
const WWW_PREFIX = 'https://www.exyukanali.tv';

const normalizeSitemapURL = (rawURL) => {
  const normalizedProtocol = rawURL.replace(/^http:\/\//i, 'https://');
  const normalizedHost = normalizedProtocol.replace(WWW_PREFIX, SITE_URL);
  const url = new URL(normalizedHost);

  if (url.pathname !== '/' && url.pathname.endsWith('/')) {
    url.pathname = url.pathname.slice(0, -1);
  }

  return url.toString();
};

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) =>
        !page.includes('www.exyukanali.tv') &&
        !page.includes('/cdn-cgi/'),
      serialize: (item) => ({
        ...item,
        url: normalizeSitemapURL(item.url)
      })
    })
  ]
});
