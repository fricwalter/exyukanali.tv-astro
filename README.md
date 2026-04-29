# EXYU Kanali TV

Astro-basierte Website fuer `https://exyukanali.tv`.

## Entwicklung

```bash
npm install
npm run build
npm run indexnow
```

## Deployment

- Produktion laeuft auf Cloudflare Pages als Projekt `exyukanali-tv`.
- GitHub Actions deployed bei Push auf `main`.
- Fuer sofortige Auslieferung lokal: `npx wrangler pages deploy dist --project-name=exyukanali-tv`

## IndexNow

- Der bestehende Key liegt unter `https://exyukanali.tv/7750fb3a6ac840b8b47216584df9d1f2.txt`.
- Nach jedem Deploy werden die URLs aus `dist/sitemap-index.xml` automatisch an `api.indexnow.org` gesendet.
