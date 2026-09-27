import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { brandIntros } from '../src/data/content/brandIntros';
import { categoryIntros } from '../src/data/content/categoryIntros';
import { getBrands, getCategories } from '../src/data/catalog';
import { getTechnicalLibraryDownloads } from '../src/data/technicalLibrary';
import { renderPage } from '../src/entry-server';
import i18n from '../src/i18n/config';
import { englishUrlsEnabled, getLanguageFromPath, localizePath, stripLanguagePrefix } from '../src/i18n/urls';
import { getAllRoutes, getHeadTags, getPageSeo } from '../src/seo/pageSeo';
import { getIndexableRoutes, renderRobots, renderSitemap } from '../src/seo/siteFiles';
import { getSiteUrlProblem } from '../src/seo/siteUrl';

// Reserved TLD: can never be a real domain. Keeps tests independent of .env.local.
const ORIGIN = 'https://seo-test.invalid';
const NOINDEX = ['/search', '/inquiry-list', '/technical-library', '/equipment/safety-workwear'];
const h1s = (html: string) => [...html.matchAll(/<h1[^>]*>([^<]*)<\/h1>/g)].map((match) => match[1]);

beforeAll(() => {
  vi.stubEnv('VITE_SITE_URL', ORIGIN);
});

afterAll(() => {
  vi.unstubAllEnvs();
});

describe('route metadata', () => {
  const pages = () => getAllRoutes().map((route) => ({ route, seo: getPageSeo(route) }));
  const indexable = () => pages().filter(({ seo }) => !seo.noindex);

  it('gives every indexable route a self-referencing absolute canonical', () => {
    for (const { route, seo } of indexable()) {
      expect(seo.path, route).toBe(route);
      expect(getHeadTags(seo, 'sq').canonical, route).toBe(`${ORIGIN}${route}`);
    }
  });

  it('keeps titles and descriptions unique across indexable routes', () => {
    const titles = indexable().map(({ seo }) => seo.title);
    const descriptions = indexable().map(({ seo }) => seo.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it('marks internal search, the inquiry list, the technical library, empty categories and unknown URLs noindex without a canonical', () => {
    const noindexUrls = [
      ...NOINDEX,
      '/nope',
      '/equipment/heavy-equipment/nope',
      '/equipment/tools-workshop/caterpillar-320d-tracked-excavator',
    ];

    for (const url of noindexUrls) {
      const tags = getHeadTags(getPageSeo(url), 'sq');
      expect(tags.meta.find((tag) => tag.value === 'robots')?.content, url).toBe('noindex, follow');
      expect(tags.canonical, url).toBeUndefined();
    }
  });

  it('canonicalizes filtered, trailing-slash and legacy category URLs', () => {
    expect(getPageSeo('/equipment/heavy-equipment/', '?subcategory=excavation').path).toBe('/equipment/heavy-equipment');
    expect(getPageSeo('/equipment/earthmoving-machinery').path).toBe('/equipment/heavy-equipment');
  });

  it('emits only Organization/WebSite, Breadcrumb and FAQ structured data (no Product, Offer or LocalBusiness yet)', () => {
    const types = new Set(pages().flatMap(({ seo }) => seo.jsonLd.map((node) => node['@type'])));
    expect([...types].sort()).toEqual(['BreadcrumbList', 'FAQPage', 'Organization', 'WebSite']);
  });
});

describe('static HTML content', () => {
  it.each([
    ['/equipment', 'Katalogu i pajisjeve'],
    ['/deals', 'Pajisje të disponueshme tani'],
    ['/brands', 'Markat'],
    ['/technical-library', 'Biblioteka teknike'],
    ['/request-quote', 'Kërko ofertë'],
    ['/equipment/heavy-equipment', 'Pajisje të rënda'],
    ['/equipment/heavy-equipment/bomag-bw213d-roller', 'Bomag BW213D Roller'],
  ])('renders exactly one H1 for %s', async (route, heading) => {
    expect(h1s(await renderPage(route))).toEqual([heading]);
  });

  it('puts category links, product names and FAQ answers into the HTML', async () => {
    const home = await renderPage('/');
    expect(home).toContain('href="/equipment/heavy-equipment"');

    const category = await renderPage('/equipment/heavy-equipment');
    expect(category).toContain('Bomag BW213D Roller');
    expect(category).toContain('href="/equipment/heavy-equipment/bomag-bw213d-roller"');

    const faqNode = getPageSeo('/faq').jsonLd[0] as { mainEntity: Array<{ name: string }> };
    expect(await renderPage('/faq')).toContain(faqNode.mainEntity[0].name);
  });
});

describe('sitemap and robots', () => {
  it('lists exactly the indexable routes', () => {
    const locs = [...renderSitemap().matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
    expect(locs).toEqual(getIndexableRoutes().map((route) => `${ORIGIN}${route}`));
    for (const excluded of [...NOINDEX, '/mail/']) {
      expect(locs).not.toContain(`${ORIGIN}${excluded}`);
    }
  });

  it('blocks /mail/ and points at the sitemap', () => {
    expect(renderRobots()).toContain('Disallow: /mail/');
    expect(renderRobots()).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  });
});

describe('production domain guard', () => {
  const placeholder = ['general-trading', 'local'].join('.');

  it.each([undefined, '', 'https://localhost:5173', 'http://127.0.0.1', `https://${placeholder}`, 'https://x.test', 'https://example.com'])(
    'rejects %s',
    (value) => {
      expect(getSiteUrlProblem(value)).not.toBeNull();
    },
  );

  it('rejects non-https and non-origin values', () => {
    expect(getSiteUrlProblem('http://real-domain.al')).not.toBeNull();
    expect(getSiteUrlProblem('https://real-domain.al/shop')).not.toBeNull();
  });

  // Shape-only fixture, not the site's domain.
  it('accepts a real-looking https origin', () => {
    expect(getSiteUrlProblem('https://real-domain.al')).toBeNull();
  });

  it('keeps the local placeholder domain out of committed files', () => {
    // Tracked plus untracked-but-not-ignored: everything a commit could pick up.
    const files = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { encoding: 'utf8' })
      .split('\0')
      .filter((file) => file && !/\.(png|jpe?g|webp|gif|ico|woff2?|pdf)$/i.test(file));
    const leaks = files.filter((file) => existsSync(file) && readFileSync(file, 'utf8').includes(placeholder));

    expect(leaks).toEqual([]);
    expect(execFileSync('git', ['check-ignore', '.env.local'], { encoding: 'utf8' }).trim()).toBe('.env.local');
  });
});

describe('owner content slots', () => {
  it('has an intro slot for exactly the real categories and brands', () => {
    expect(Object.keys(categoryIntros).sort()).toEqual(getCategories().map((category) => category.slug).sort());
    expect(Object.keys(brandIntros).sort()).toEqual(getBrands().map((brand) => brand.slug).sort());
  });

  it('renders a filled category intro in the static HTML and keeps the fallback otherwise', async () => {
    const fallback = getCategories().find((category) => category.slug === 'heavy-equipment')?.description ?? '';
    expect(await renderPage('/equipment/heavy-equipment')).toContain(fallback);

    const original = categoryIntros['heavy-equipment'];
    categoryIntros['heavy-equipment'] = { sq: ['  Paragraf pronari.  ', ''], en: [] };

    try {
      const html = await renderPage('/equipment/heavy-equipment');
      expect(html).toContain('<p>Paragraf pronari.</p>');
      expect(html).not.toContain(fallback);
      // Albanian text never leaks into the English page.
      expect(await renderPage('/equipment/heavy-equipment', 'en')).not.toContain('Paragraf pronari.');
    } finally {
      categoryIntros['heavy-equipment'] = original;
      await i18n.changeLanguage('sq');
    }
  });

  it('renders a filled brand intro on the brand card', async () => {
    const original = brandIntros.caterpillar;
    brandIntros.caterpillar = { sq: ['Tekst pronari për Caterpillar.'], en: [] };

    try {
      expect(await renderPage('/brands')).toContain('Tekst pronari për Caterpillar.');
    } finally {
      brandIntros.caterpillar = original;
    }
  });

  it('only links technical library files that exist under public/docs/', () => {
    for (const item of getTechnicalLibraryDownloads()) {
      expect(item.fileUrl, item.title).toMatch(/^\/docs\/[a-z0-9-]+\.pdf$/);
      expect(existsSync(`public${item.fileUrl}`), item.fileUrl).toBe(true);
    }
  });

  it('keeps the technical library noindex until a real file is linked', () => {
    expect(getPageSeo('/technical-library').noindex).toBe(getTechnicalLibraryDownloads().length === 0);
  });
});

describe('English URLs (prepared, off by default)', () => {
  it('change nothing while VITE_ENGLISH_URLS is unset', () => {
    expect(englishUrlsEnabled()).toBe(false);
    expect(localizePath('/faq', 'en')).toBe('/faq');
    expect(getLanguageFromPath('/en/faq')).toBeNull();
    expect(stripLanguagePrefix('/en/faq')).toBe('/en/faq');
    expect(getHeadTags(getPageSeo('/faq'), 'sq').alternates).toEqual([]);
    expect(renderSitemap()).not.toContain('hreflang');
  });

  describe('when enabled', () => {
    beforeAll(() => {
      vi.stubEnv('VITE_ENGLISH_URLS', 'true');
    });

    afterAll(async () => {
      vi.stubEnv('VITE_ENGLISH_URLS', '');
      await i18n.changeLanguage('sq');
    });

    it('maps between app paths and public URLs', () => {
      expect(localizePath('/', 'en')).toBe('/en');
      expect(localizePath('/faq', 'en')).toBe('/en/faq');
      expect(localizePath('/faq', 'sq')).toBe('/faq');
      expect(stripLanguagePrefix('/en')).toBe('/');
      expect(stripLanguagePrefix('/en/equipment/heavy-equipment')).toBe('/equipment/heavy-equipment');
      expect(stripLanguagePrefix('/entry')).toBe('/entry');
      expect(getLanguageFromPath('/en')).toBe('en');
      expect(getLanguageFromPath('/english')).toBe('sq');
      expect(getLanguageFromPath('/faq')).toBe('sq');
    });

    it('gives each language a self-referencing canonical and the same hreflang set', async () => {
      const alternates = [
        { hreflang: 'sq', href: `${ORIGIN}/faq` },
        { hreflang: 'en', href: `${ORIGIN}/en/faq` },
        { hreflang: 'x-default', href: `${ORIGIN}/faq` },
      ];

      await i18n.changeLanguage('en');
      const english = getHeadTags(getPageSeo('/faq'), 'en');
      expect(english.canonical).toBe(`${ORIGIN}/en/faq`);
      expect(english.alternates).toEqual(alternates);
      expect(english.meta.find((tag) => tag.value === 'og:locale')?.content).toBe('en_US');

      await i18n.changeLanguage('sq');
      expect(getHeadTags(getPageSeo('/faq'), 'sq').canonical).toBe(`${ORIGIN}/faq`);
      expect(getHeadTags(getPageSeo('/faq'), 'sq').alternates).toEqual(alternates);
      expect(getHeadTags(getPageSeo('/search'), 'en').alternates).toEqual([]);
    });

    it('renders English static HTML whose internal links and breadcrumbs stay under /en', async () => {
      const html = await renderPage('/equipment', 'en');
      expect(h1s(html)).toEqual(['Equipment catalog']);
      expect(html).toContain('href="/en/equipment/heavy-equipment"');

      const breadcrumbs = JSON.stringify(getPageSeo('/equipment/heavy-equipment').jsonLd);
      expect(breadcrumbs).toContain(`${ORIGIN}/en/equipment/heavy-equipment`);
    });

    it('lists both language versions in the sitemap with alternates', () => {
      const sitemap = renderSitemap();
      expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"');
      expect(sitemap.match(/<url>/g)).toHaveLength(getIndexableRoutes().length * 2);
      expect(sitemap).toContain(`<loc>${ORIGIN}/en/faq</loc>`);
      expect(sitemap).toContain(`<xhtml:link rel="alternate" hreflang="en" href="${ORIGIN}/en/faq" />`);
    });
  });
});
