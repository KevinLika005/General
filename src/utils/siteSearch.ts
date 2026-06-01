import i18n, { getCurrentLanguage, type AppLanguage } from '../i18n/config';
import {
  getCategories,
  getCompanyProfile,
  getFaqItems,
  getHowItWorksSteps,
  getProducts,
  getSalesContacts,
} from '../data/catalog';
import { getTechnicalLibraryGroups } from '../data/technicalLibrary';
import { getTaxonomyLabelsForProduct } from './catalog';
import { normalizeText, tokenizeSearchText } from './filters';
import { routes } from './routes';

export type SiteSearchResultType = 'product' | 'category' | 'service' | 'solution' | 'page';

export interface SiteSearchResult {
  id: string;
  title: string;
  description: string;
  href: string;
  type: SiteSearchResultType;
  image?: string;
}

interface SiteSearchDocument extends SiteSearchResult {
  normalizedDescription: string;
  normalizedHref: string;
  normalizedKeywords: string[];
  normalizedTitle: string;
}

const indexCache: Partial<Record<AppLanguage, SiteSearchDocument[]>> = {};

const typePriority: Record<SiteSearchResultType, number> = {
  product: 5,
  category: 4,
  service: 3,
  solution: 2,
  page: 1,
};

function uniqueValues(values: Array<string | undefined | null>) {
  return Array.from(
    new Set(
      values
        .map((value) => value?.trim())
        .filter((value): value is string => Boolean(value)),
    ),
  );
}

function createDocument(input: SiteSearchResult & { keywords?: Array<string | undefined | null> }) {
  return {
    ...input,
    normalizedTitle: normalizeText(input.title),
    normalizedDescription: normalizeText(input.description),
    normalizedHref: normalizeText(input.href),
    normalizedKeywords: uniqueValues(input.keywords ?? []).map(normalizeText).filter(Boolean),
  } satisfies SiteSearchDocument;
}

function buildPageDocuments() {
  const companyProfile = getCompanyProfile();
  const technicalLibraryGroups = getTechnicalLibraryGroups();
  const faqItems = getFaqItems();
  const salesContacts = getSalesContacts();
  const howItWorksSteps = getHowItWorksSteps();
  const categories = getCategories();
  const products = getProducts();

  return [
    createDocument({
      id: 'page-catalog',
      title: i18n.t('pages.catalog.title'),
      description: i18n.t('pages.catalog.description'),
      href: routes.equipment,
      type: 'page',
      keywords: [
        i18n.t('common.labels.equipment'),
        i18n.t('common.actions.searchCatalog'),
        ...categories.flatMap((category) => [category.title, category.shortDescription]),
        ...products.slice(0, 8).map((product) => product.title),
      ],
    }),
    createDocument({
      id: 'page-brands',
      title: i18n.t('pages.brands.title'),
      description: i18n.t('pages.brands.description'),
      href: routes.brands,
      type: 'page',
      keywords: products.map((product) => product.brand),
    }),
    createDocument({
      id: 'page-deals',
      title: i18n.t('pages.deals.title'),
      description: i18n.t('pages.deals.description'),
      href: routes.deals,
      type: 'page',
      keywords: [
        i18n.t('common.status.availableNow'),
        i18n.t('common.status.incomingStock'),
        i18n.t('common.status.deal'),
      ],
    }),
    createDocument({
      id: 'page-technical-library',
      title: i18n.t('pages.technicalLibrary.title'),
      description: i18n.t('pages.technicalLibrary.description'),
      href: routes.technicalLibrary,
      type: 'service',
      keywords: technicalLibraryGroups.flatMap((group) => [group.title, group.description, ...group.items]),
    }),
    createDocument({
      id: 'page-request-quote',
      title: i18n.t('pages.requestQuote.title'),
      description: i18n.t('pages.requestQuote.description'),
      href: routes.requestQuote,
      type: 'service',
      keywords: [
        i18n.t('common.actions.requestQuote'),
        i18n.t('forms.quote.title'),
        i18n.t('forms.quote.description'),
        i18n.t('common.forms.priceQuotation'),
        i18n.t('common.forms.contractRequest'),
      ],
    }),
    createDocument({
      id: 'page-how-it-works',
      title: i18n.t('pages.howItWorks.title'),
      description: i18n.t('pages.howItWorks.description'),
      href: routes.howItWorks,
      type: 'solution',
      keywords: howItWorksSteps.flatMap((step) => [step.title, step.description]),
    }),
    createDocument({
      id: 'page-financing-contracts',
      title: i18n.t('pages.financingContracts.title'),
      description: i18n.t('pages.financingContracts.description'),
      href: routes.financingContracts,
      type: 'solution',
      keywords: [
        i18n.t('common.forms.contractRequest'),
        i18n.t('common.actions.requestContractDiscussion'),
      ],
    }),
    createDocument({
      id: 'page-delivery-inspection',
      title: i18n.t('pages.deliveryInspection.title'),
      description: i18n.t('pages.deliveryInspection.description'),
      href: routes.deliveryInspection,
      type: 'solution',
      keywords: [
        i18n.t('common.forms.deliveryInspection'),
        i18n.t('common.forms.requestInspection'),
      ],
    }),
    createDocument({
      id: 'page-institutions-cleaning',
      title: i18n.t('pages.institutionsCleaning.hero.title'),
      description: i18n.t('pages.institutionsCleaning.hero.description'),
      href: routes.institutionsCleaning,
      type: 'service',
      keywords: [
        i18n.t('pages.institutionsCleaning.shortLabel'),
        i18n.t('pages.institutionsCleaning.hero.eyebrow'),
      ],
    }),
    createDocument({
      id: 'page-about',
      title: i18n.t('pages.about.title'),
      description: i18n.t('pages.about.description'),
      href: routes.about,
      type: 'page',
      keywords: [
        companyProfile.name,
        companyProfile.parentName,
        companyProfile.shortDescription,
        companyProfile.tagline,
      ],
    }),
    createDocument({
      id: 'page-faq',
      title: i18n.t('pages.faq.title'),
      description: i18n.t('pages.faq.description'),
      href: routes.faq,
      type: 'service',
      keywords: faqItems.flatMap((item) => [item.question, item.answer]),
    }),
    createDocument({
      id: 'page-contact',
      title: i18n.t('pages.contact.title'),
      description: i18n.t('pages.contact.description'),
      href: routes.contact,
      type: 'page',
      keywords: [
        companyProfile.phone,
        companyProfile.email,
        companyProfile.address,
        companyProfile.locationLabel,
        ...salesContacts.flatMap((contact) => [
          contact.name,
          contact.title,
          contact.email,
          contact.phone,
          contact.note,
          ...contact.markets,
        ]),
      ],
    }),
    createDocument({
      id: 'page-inquiry-list',
      title: i18n.t('pages.inquiryList.title'),
      description: i18n.t('pages.inquiryList.description'),
      href: routes.inquiryList,
      type: 'page',
      keywords: [i18n.t('layout.header.inquiryList'), i18n.t('common.actions.reviewInquiryList')],
    }),
    createDocument({
      id: 'page-privacy',
      title: i18n.t('pages.privacy.title'),
      description: i18n.t('pages.privacy.description'),
      href: routes.privacy,
      type: 'page',
    }),
    createDocument({
      id: 'page-terms',
      title: i18n.t('pages.terms.title'),
      description: i18n.t('pages.terms.description'),
      href: routes.terms,
      type: 'page',
    }),
  ];
}

function buildCategoryDocuments() {
  return getCategories().flatMap((category) => {
    const categoryDocument = createDocument({
      id: `category-${category.slug}`,
      title: category.title,
      description: category.shortDescription,
      href: routes.category(category.slug),
      type: 'category',
      image: category.heroImage,
      keywords: [category.description, category.seoIntro],
    });

    const subcategoryDocuments = category.subcategories.map((subcategory) =>
      createDocument({
        id: `subcategory-${category.slug}-${subcategory.slug}`,
        title: subcategory.title,
        description: subcategory.description,
        href: routes.categoryWithTaxonomy(category.slug, subcategory.slug),
        type: 'category',
        image: category.heroImage,
        keywords: [category.title, category.shortDescription],
      }),
    );

    const productTypeDocuments = category.subcategories.flatMap((subcategory) =>
      subcategory.productTypes.map((productType) =>
        createDocument({
          id: `product-type-${category.slug}-${subcategory.slug}-${productType.slug}`,
          title: productType.title,
          description: productType.description,
          href: routes.categoryWithTaxonomy(category.slug, subcategory.slug, productType.slug),
          type: 'category',
          image: category.heroImage,
          keywords: [category.title, subcategory.title, category.shortDescription],
        }),
      ),
    );

    return [categoryDocument, ...subcategoryDocuments, ...productTypeDocuments];
  });
}

function buildProductDocuments() {
  return getProducts().map((product) => {
    const taxonomy = getTaxonomyLabelsForProduct(product);

    return createDocument({
      id: product.id,
      title: product.title,
      description: product.excerpt,
      href: routes.product(product.categorySlug, product.slug),
      type: 'product',
      image: product.images[0]?.src,
      keywords: [
        product.brand,
        product.model,
        product.sku,
        product.serialNumber,
        taxonomy.categoryTitle,
        taxonomy.subcategoryTitle,
        taxonomy.productTypeTitle,
        product.description,
        product.location,
        product.fuelType,
        product.enginePower,
        product.weight,
        product.capacity,
        product.transmission,
        ...product.tags,
        ...product.keyFeatures,
        ...product.specs.flatMap((spec) => [spec.label, spec.value]),
      ],
    });
  });
}

function buildSearchIndex() {
  return [...buildProductDocuments(), ...buildCategoryDocuments(), ...buildPageDocuments()];
}

export function getSiteSearchIndex() {
  const language = getCurrentLanguage();

  if (!indexCache[language]) {
    indexCache[language] = buildSearchIndex();
  }

  return indexCache[language] ?? [];
}

function scoreDocument(document: SiteSearchDocument, normalizedQuery: string, tokens: string[]) {
  const title = document.normalizedTitle;
  const description = document.normalizedDescription;
  const href = document.normalizedHref;
  const keywords = document.normalizedKeywords;

  if (!normalizedQuery || tokens.length === 0) {
    return 0;
  }

  let score = 0;
  let matchedTokenCount = 0;

  if (title === normalizedQuery) score += 1200;
  if (keywords.some((keyword) => keyword === normalizedQuery)) score += 900;
  if (title.startsWith(normalizedQuery)) score += 760;
  if (title.includes(normalizedQuery)) score += 620;
  if (keywords.some((keyword) => keyword.startsWith(normalizedQuery))) score += 460;
  if (keywords.some((keyword) => keyword.includes(normalizedQuery))) score += 340;
  if (description.includes(normalizedQuery)) score += 180;
  if (href.includes(normalizedQuery)) score += 70;
  if (tokens.length > 1 && tokens.every((token) => title.includes(token))) score += 220;

  for (const token of tokens) {
    const titleMatch = title.includes(token);
    const keywordMatch = keywords.some((keyword) => keyword.includes(token));
    const descriptionMatch = description.includes(token);
    const hrefMatch = href.includes(token);

    if (!titleMatch && !keywordMatch && !descriptionMatch && !hrefMatch) {
      return -1;
    }

    if (titleMatch) score += 120;
    if (keywordMatch) score += 75;
    if (descriptionMatch) score += 28;
    if (hrefMatch) score += 16;
    matchedTokenCount += 1;
  }

  score += matchedTokenCount * 10;
  score += typePriority[document.type] * 4;

  return score;
}

export function searchSite(query: string, limit?: number): SiteSearchResult[] {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return [];
  }

  const tokens = tokenizeSearchText(query);

  const ranked = getSiteSearchIndex()
    .map((document) => ({
      document,
      score: scoreDocument(document, normalizedQuery, tokens),
    }))
    .filter((entry) => entry.score >= 0)
    .sort((first, second) => {
      if (second.score !== first.score) {
        return second.score - first.score;
      }

      if (typePriority[second.document.type] !== typePriority[first.document.type]) {
        return typePriority[second.document.type] - typePriority[first.document.type];
      }

      return first.document.title.localeCompare(second.document.title);
    })
    .map(({ document }) => ({
      id: document.id,
      title: document.title,
      description: document.description,
      href: document.href,
      type: document.type,
      image: document.image,
    }));

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked;
}

export function getSearchTypeCounts(results: SiteSearchResult[]) {
  return results.reduce<Record<SiteSearchResultType, number>>(
    (counts, result) => ({
      ...counts,
      [result.type]: counts[result.type] + 1,
    }),
    {
      product: 0,
      category: 0,
      service: 0,
      solution: 0,
      page: 0,
    },
  );
}
