import { englishUrlsEnabled, localizePath } from '../i18n/urls';
import { absoluteUrl, getAlternates, getAllRoutes, getPageSeo, siteUrl, type HeadTags } from './pageSeo';

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderHeadHtml(tags: HeadTags) {
  return [
    `<title>${escapeHtml(tags.title)}</title>`,
    ...tags.meta.map((tag) => `<meta ${tag.key}="${tag.value}" content="${escapeHtml(tag.content)}" />`),
    tags.canonical ? `<link rel="canonical" href="${escapeHtml(tags.canonical)}" />` : '',
    ...tags.alternates.map(
      (alternate) => `<link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeHtml(alternate.href)}" />`,
    ),
    tags.jsonLd ? `<script type="application/ld+json" id="seo-jsonld">${tags.jsonLd}</script>` : '',
  ]
    .filter(Boolean)
    .join('\n    ');
}

export function getIndexableRoutes() {
  return getAllRoutes().filter((route) => !getPageSeo(route).noindex);
}

export function renderSitemap() {
  const url = (loc: string, alternates = '') => `  <url><loc>${escapeHtml(loc)}</loc>${alternates}</url>`;
  const entries = getIndexableRoutes().flatMap((route) => {
    if (!englishUrlsEnabled()) {
      return [url(absoluteUrl(route))];
    }

    // Each language version lists every alternate, itself included.
    const links = getAlternates(route)
      .map((alternate) => `<xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeHtml(alternate.href)}" />`)
      .join('');
    return [url(absoluteUrl(localizePath(route, 'sq')), links), url(absoluteUrl(localizePath(route, 'en')), links)];
  });
  const xhtml = englishUrlsEnabled() ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : '';

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${xhtml}>\n${entries.join('\n')}\n</urlset>\n`;
}

export function renderRobots() {
  const lines = ['User-agent: *', 'Allow: /', 'Disallow: /mail/'];

  if (siteUrl()) {
    lines.push('', `Sitemap: ${absoluteUrl('/sitemap.xml')}`);
  }

  return `${lines.join('\n')}\n`;
}
