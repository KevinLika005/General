import { getCategories, getCompanyProfile, getFaqItems, getProducts } from '../data/catalog';
import { localBusiness } from '../data/site';
import { getTechnicalLibraryDownloads } from '../data/technicalLibrary';
import i18n, { getCurrentLanguage, type AppLanguage } from '../i18n/config';
import { englishUrlsEnabled, localizePath } from '../i18n/urls';
import { getCategoryBySlug, getProductBySlugs, getProductsByCategory } from '../utils/catalog';
import { routes } from '../utils/routes';

// Production origin from VITE_SITE_URL (vite.config.ts refuses production builds with a missing or
// placeholder value). Without it, absolute tags (canonical, og:url, og:image, JSON-LD) are skipped.
export function siteUrl() {
  return (import.meta.env.VITE_SITE_URL ?? '').trim().replace(/\/+$/, '');
}

const SITE_NAME = 'GENERAL TRADING';
const DEFAULT_IMAGE = '/images/categories/heavy-equipment-hero.webp';
const LOGO_PATH = '/general-logo.png';

type JsonLd = Record<string, unknown>;

export interface PageSeo {
  title: string;
  description: string;
  path: string;
  noindex: boolean;
  ogType: 'website' | 'product';
  image: string;
  jsonLd: JsonLd[];
}

const staticPages: Record<string, string> = {
  [routes.home]: 'home',
  [routes.equipment]: 'catalog',
  [routes.brands]: 'brands',
  [routes.deals]: 'deals',
  [routes.technicalLibrary]: 'technicalLibrary',
  [routes.inquiryList]: 'inquiryList',
  [routes.requestQuote]: 'requestQuote',
  [routes.howItWorks]: 'howItWorks',
  [routes.financingContracts]: 'financingContracts',
  [routes.deliveryInspection]: 'deliveryInspection',
  [routes.institutionsCleaning]: 'institutionsCleaning',
  [routes.about]: 'about',
  [routes.faq]: 'faq',
  [routes.contact]: 'contact',
  [routes.privacy]: 'privacy',
  [routes.terms]: 'terms',
};

// Reachable but kept out of the index: visitor-specific pages, internal search, and the technical
// library while it only lists document titles (thin until at least one real PDF is linked).
function isNoindexPath(path: string) {
  return (
    path === routes.inquiryList ||
    path === routes.search ||
    (path === routes.technicalLibrary && getTechnicalLibraryDownloads().length === 0)
  );
}

export function absoluteUrl(path: string) {
  return `${siteUrl()}${path}`;
}

function breadcrumbs(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(localizePath(item.path, getCurrentLanguage())),
    })),
  };
}

function organization(): JsonLd {
  const company = getCompanyProfile();
  const phones = [company.phone, company.secondaryPhone].filter(Boolean);

  return {
    // LocalBusiness is a subtype of Organization; only claimed once the owner confirms the details.
    '@type': localBusiness.confirmed ? 'LocalBusiness' : 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: SITE_NAME,
    url: absoluteUrl('/'),
    logo: absoluteUrl(LOGO_PATH),
    ...(company.email ? { email: company.email } : {}),
    telephone: phones[0],
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.replace(/^Tiran[eë],\s*/i, ''),
      addressLocality: 'Tiranë',
      addressCountry: 'AL',
    },
    contactPoint: phones.map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'sales',
      availableLanguage: ['sq', 'en'],
    })),
    ...(localBusiness.confirmed ? { openingHours: localBusiness.openingHours } : {}),
  };
}

function website(): JsonLd {
  return {
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: SITE_NAME,
    url: absoluteUrl('/'),
    inLanguage: 'sq',
    publisher: { '@id': absoluteUrl('/#organization') },
  };
}

function faqPage(): JsonLd {
  // Mirrors exactly what FAQPage renders: the general (non-category) questions.
  return {
    '@type': 'FAQPage',
    mainEntity: getFaqItems()
      .filter((item) => !item.categorySlug)
      .map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
  };
}

function base(path: string, key: string, overrides: Partial<PageSeo> = {}): PageSeo {
  return {
    title: i18n.t(`metadata.${key}.title`),
    description: i18n.t(`metadata.${key}.description`),
    path,
    noindex: isNoindexPath(path),
    ogType: 'website',
    image: DEFAULT_IMAGE,
    jsonLd: [],
    ...overrides,
  };
}

function notFound(path: string): PageSeo {
  return base(path, 'notFound', { noindex: true });
}

export function getPageSeo(pathname: string, search = ''): PageSeo {
  const t = i18n.t.bind(i18n);
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const home = { name: t('common.labels.home'), path: routes.home };
  const equipment = { name: t('common.labels.equipment'), path: routes.equipment };

  if (path === routes.search) {
    const query = new URLSearchParams(search).get('q')?.trim();

    return {
      ...base(path, 'catalog'),
      title: query ? t('pages.search.metadataTitleWithQuery', { query }) : t('pages.search.metadataTitle'),
      description: t('pages.search.metadataDescription'),
    };
  }

  const staticKey = staticPages[path];

  if (staticKey) {
    const jsonLd: Record<string, JsonLd[]> = {
      [routes.home]: [organization(), website()],
      [routes.faq]: [faqPage()],
    };

    return base(path, staticKey, { jsonLd: jsonLd[path] ?? [] });
  }

  // /equipment/:categorySlug[/:productSlug]
  const [, section, categorySlug, productSlug, ...rest] = path.split('/');

  if (section !== 'equipment' || !categorySlug || rest.length > 0) {
    return notFound(path);
  }

  if (productSlug) {
    const product = getProductBySlugs(categorySlug, productSlug);
    const category = product ? getCategoryBySlug(product.categorySlug) : undefined;

    if (!product || !category) {
      return notFound(path);
    }

    const canonicalPath = routes.product(product.categorySlug, product.slug);

    return {
      title: t('metadata.productDetail.title', { product: product.title }),
      description: `${product.excerpt} ${t('metadata.productDetail.descriptionSuffix', {
        brand: product.brand,
        condition: t(`common.status.${product.condition}`),
      })}`,
      path: canonicalPath,
      noindex: false,
      ogType: 'product',
      image: product.images[0]?.src ?? category.heroImage,
      jsonLd: [
        breadcrumbs([
          home,
          equipment,
          { name: category.title, path: routes.category(category.slug) },
          { name: product.title, path: canonicalPath },
        ]),
      ],
    };
  }

  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return notFound(path);
  }

  const canonicalPath = routes.category(category.slug);

  return {
    title: t('metadata.category.title', { category: category.title }),
    description: category.seoIntro,
    path: canonicalPath,
    // An empty category is a thin page; it becomes indexable as soon as it has products.
    noindex: getProductsByCategory(category.slug).length === 0,
    ogType: 'website',
    image: category.heroImage,
    jsonLd: [breadcrumbs([home, equipment, { name: category.title, path: canonicalPath }])],
  };
}

/** Every URL the app serves with a 200. Used by the build to write one HTML file per route. */
export function getAllRoutes(): string[] {
  return [
    ...Object.keys(staticPages),
    routes.search,
    ...getCategories().map((category) => routes.category(category.slug)),
    ...getProducts().map((product) => routes.product(product.categorySlug, product.slug)),
  ];
}

export interface HeadTags {
  title: string;
  meta: Array<{ key: 'name' | 'property'; value: string; content: string }>;
  canonical?: string;
  /** hreflang alternates; only while English URLs are enabled, and only on indexable pages. */
  alternates: Array<{ hreflang: string; href: string }>;
  jsonLd?: string;
}

/** Albanian, English and x-default (Albanian) URLs for one page. */
export function getAlternates(path: string) {
  return [
    { hreflang: 'sq', href: absoluteUrl(localizePath(path, 'sq')) },
    { hreflang: 'en', href: absoluteUrl(localizePath(path, 'en')) },
    { hreflang: 'x-default', href: absoluteUrl(localizePath(path, 'sq')) },
  ];
}

/** Shared by the runtime hook and the build-time prerender so both emit identical tags. */
export function getHeadTags(seo: PageSeo, language: AppLanguage): HeadTags {
  const pageUrl = absoluteUrl(localizePath(seo.path, language));

  const meta: HeadTags['meta'] = [
    { key: 'name', value: 'description', content: seo.description },
    { key: 'name', value: 'robots', content: seo.noindex ? 'noindex, follow' : 'index, follow' },
    { key: 'property', value: 'og:type', content: seo.ogType },
    { key: 'property', value: 'og:site_name', content: SITE_NAME },
    { key: 'property', value: 'og:title', content: seo.title },
    { key: 'property', value: 'og:description', content: seo.description },
    { key: 'property', value: 'og:locale', content: language === 'en' ? 'en_US' : 'sq_AL' },
    { key: 'name', value: 'twitter:card', content: 'summary_large_image' },
    { key: 'name', value: 'twitter:title', content: seo.title },
    { key: 'name', value: 'twitter:description', content: seo.description },
  ];

  if (siteUrl()) {
    meta.push(
      { key: 'property', value: 'og:url', content: pageUrl },
      { key: 'property', value: 'og:image', content: absoluteUrl(seo.image) },
      { key: 'name', value: 'twitter:image', content: absoluteUrl(seo.image) },
    );
  }

  return {
    title: seo.title,
    meta,
    // A canonical on a noindex page sends mixed signals, so only indexable pages get one.
    canonical: siteUrl() && !seo.noindex ? pageUrl : undefined,
    alternates: siteUrl() && !seo.noindex && englishUrlsEnabled() ? getAlternates(seo.path) : [],
    jsonLd:
      siteUrl() && seo.jsonLd.length > 0
        ? JSON.stringify({ '@context': 'https://schema.org', '@graph': seo.jsonLd }).replace(/</g, '\\u003c')
        : undefined,
  };
}
