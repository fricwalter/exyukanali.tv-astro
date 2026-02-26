import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.argv[2] ?? 'dist';
const source = join(outDir, 'sitemap-0.xml');
const target = join(outDir, 'sitemap.xml');

if (!existsSync(source)) {
  console.warn(`[postbuild-sitemap] Skipped: ${source} not found.`);
  process.exit(0);
}

copyFileSync(source, target);
console.log(`[postbuild-sitemap] Created ${target} from sitemap-0.xml.`);
