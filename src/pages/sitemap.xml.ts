import type { APIRoute } from 'astro';
import { blogPosts } from '../data/blogPosts';
import { countryPages } from '../data/countryPages';

const SITE_URL = 'https://exyukanali.tv';
const STATIC_PAGES = [
  '/',
  '/blog/',
  '/instalacija/',
  '/kolacici/',
  '/kontakt/',
  '/narudzba/',
  '/povrat-novca/',
  '/privatnost/',
  '/uvjeti-koristenja/'
];

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function normalizeUrl(pathname: string) {
  return `${SITE_URL}${pathname}`;
}

function urlEntry({
  loc,
  lastmod,
  image,
  imageTitle
}: {
  loc: string;
  lastmod: string;
  image?: string;
  imageTitle?: string;
}) {
  const imageXml = image
    ? `<image:image><image:loc>${escapeXml(image)}</image:loc><image:title>${escapeXml(imageTitle ?? '')}</image:title></image:image>`
    : '';

  return `<url><loc>${escapeXml(loc)}</loc><lastmod>${escapeXml(lastmod)}</lastmod><changefreq>weekly</changefreq><priority>0.7</priority>${imageXml}</url>`;
}

export const GET: APIRoute = () => {
  const now = new Date().toISOString();
  const staticEntries = STATIC_PAGES.map((pathname) =>
    urlEntry({
      loc: normalizeUrl(pathname),
      lastmod: now
    })
  );

  const blogEntries = blogPosts.map((post) =>
    urlEntry({
      loc: normalizeUrl(`/blog/${post.slug}/`),
      lastmod: new Date(post.date).toISOString(),
      image: normalizeUrl(`/images/blog/${post.slug}.webp`),
      imageTitle: post.title
    })
  );

  const countryEntries = countryPages.map((country) =>
    urlEntry({
      loc: normalizeUrl(`/iptv/${country.slug}/`),
      lastmod: now
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">` +
    `${[...staticEntries, ...countryEntries, ...blogEntries].join('')}` +
    `</urlset>`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  });
};
