// Runs after `vite build` and `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
// For every route the app serves, writes dist/<route>.html containing the route's metadata
// (title, description, robots, canonical, Open Graph, JSON-LD) and its default Albanian page
// content, so crawlers and link previews get the page without running JavaScript.
// Also writes 404.html, sitemap.xml and robots.txt. The domain guard lives in vite.config.ts.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');
const template = readFileSync(path.join(distDir, 'index.html'), 'utf8');
const SEO_BLOCK = /<!-- seo:start[\s\S]*?<!-- seo:end -->/;
const ROOT = '<div id="root"></div>';

if (!SEO_BLOCK.test(template) || !template.includes(ROOT)) {
  throw new Error('dist/index.html is missing the seo:start/seo:end block or an empty <div id="root"></div>.');
}

const ssr = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);

// Renders first (which switches i18n to the language), then resolves metadata in that language.
async function writePage(file, route, language = 'sq') {
  const body = await ssr.renderPage(route, language);
  const seo = ssr.getPageSeo(route);
  const html = template
    .replace('<html lang="sq">', `<html lang="${language}">`)
    .replace(SEO_BLOCK, ssr.renderHeadHtml(ssr.getHeadTags(seo, language)))
    .replace(ROOT, `<div id="root">${body}</div>`);
  const target = path.join(distDir, file);

  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, html);
  return seo;
}

const toFile = (publicPath) => (publicPath === '/' ? 'index.html' : `${publicPath.slice(1)}.html`);
const languages = ssr.englishUrlsEnabled() ? ['sq', 'en'] : ['sq'];
const routes = ssr.getAllRoutes();
let indexable = 0;

for (const language of languages) {
  for (const route of routes) {
    const seo = await writePage(toFile(ssr.localizePath(route, language)), route, language);

    if (!seo.noindex && seo.path !== route) {
      throw new Error(`Route ${route} canonicalizes to ${seo.path}; prerender the canonical URL instead.`);
    }

    indexable += seo.noindex ? 0 : 1;
  }
}

await writePage('404.html', '/404');
writeFileSync(path.join(distDir, 'robots.txt'), ssr.renderRobots());

if (ssr.siteUrl()) {
  writeFileSync(path.join(distDir, 'sitemap.xml'), ssr.renderSitemap());
}

rmSync(ssrDir, { recursive: true, force: true });
console.log(`[prerender] ${routes.length} routes × ${languages.join('+')}, ${indexable} indexable${ssr.siteUrl() ? ` (${ssr.siteUrl()})` : ', no sitemap'}`);
