import { readFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_SITE = "https://exyukanali.tv";
const DEFAULT_SITEMAP = "dist/sitemap-index.xml";
const DEFAULT_KEY = "e4j5ph76haz3qymvsemhhhbmhzx1mvjp";
const DEFAULT_KEY_FILE = `${DEFAULT_KEY}.txt`;
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

function extractLocs(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/gsi)].map((match) => match[1].trim());
}

async function collectUrlsFromSitemap(sitemapPath, seen = new Set()) {
  const absolutePath = path.resolve(sitemapPath);
  if (seen.has(absolutePath)) {
    return [];
  }

  seen.add(absolutePath);

  const xml = await readFile(absolutePath, "utf8");
  const locs = extractLocs(xml);

  if (xml.includes("<sitemapindex")) {
    const nested = await Promise.all(
      locs.map((loc) => {
        const pathname = new URL(loc).pathname.replace(/^\/+/, "");
        return collectUrlsFromSitemap(path.join(path.dirname(absolutePath), pathname), seen);
      }),
    );

    return nested.flat();
  }

  return locs;
}

async function main() {
  const site = (process.env.INDEXNOW_SITE ?? DEFAULT_SITE).replace(/\/+$/, "");
  const key = process.env.INDEXNOW_KEY ?? DEFAULT_KEY;
  const keyFile = process.env.INDEXNOW_KEY_FILE ?? DEFAULT_KEY_FILE;
  const sitemapPath = process.env.INDEXNOW_SITEMAP ?? DEFAULT_SITEMAP;
  const keyLocation = `${site}/${keyFile}`;

  const urls = [...new Set(await collectUrlsFromSitemap(sitemapPath))];

  if (urls.length === 0) {
    console.log("IndexNow: keine URLs in der Sitemap gefunden, Submission uebersprungen.");
    return;
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: new URL(site).host,
      key,
      keyLocation,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow: Submission fehlgeschlagen (${response.status} ${response.statusText})${body ? ` - ${body}` : ""}`);
  }

  console.log(`IndexNow: ${urls.length} URLs erfolgreich eingereicht.`);
  console.log(`IndexNow-Key: ${keyLocation}`);
}

await main();
