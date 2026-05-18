function buildTaxonomyQuery(params: {
  brand?: string;
  categorySlug?: string;
  productTypeSlug?: string;
  q?: string;
  subcategorySlug?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set('q', params.q);
  if (params.brand) searchParams.set('brand', params.brand);
  if (params.categorySlug) searchParams.set('category', params.categorySlug);
  if (params.subcategorySlug) searchParams.set('subcategory', params.subcategorySlug);
  if (params.productTypeSlug) searchParams.set('type', params.productTypeSlug);

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export const routes = {
  home: '/',
  equipment: '/equipment',
  brands: '/brands',
  deals: '/deals',
  technicalLibrary: '/technical-library',
  inquiryList: '/inquiry-list',
  requestQuote: '/request-quote',
  howItWorks: '/how-it-works',
  financingContracts: '/financing-contracts',
  deliveryInspection: '/delivery-inspection',
  institutionsCleaning: '/services/institutions-cleaning',
  about: '/about',
  faq: '/faq',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  category: (categorySlug: string) => `/equipment/${categorySlug}`,
  categoryWithTaxonomy: (
    categorySlug: string,
    subcategorySlug?: string,
    productTypeSlug?: string,
  ) =>
    `/equipment/${categorySlug}${buildTaxonomyQuery({
      subcategorySlug,
      productTypeSlug,
    })}`,
  product: (categorySlug: string, productSlug: string) =>
    `/equipment/${categorySlug}/${productSlug}`,
  equipmentWithBrand: (brand: string) =>
    `/equipment${buildTaxonomyQuery({ brand })}`,
  equipmentSearch: (query: string) => `/equipment${buildTaxonomyQuery({ q: query })}`,
  equipmentWithSubcategory: (categorySlug: string, subcategorySlug: string) =>
    `/equipment/${categorySlug}${buildTaxonomyQuery({ subcategorySlug })}`,
  equipmentWithTaxonomy: (params: {
    brand?: string;
    categorySlug?: string;
    productTypeSlug?: string;
    q?: string;
    subcategorySlug?: string;
  }) => `/equipment${buildTaxonomyQuery(params)}`,
};
