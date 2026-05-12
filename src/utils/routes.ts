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
  about: '/about',
  faq: '/faq',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  category: (categorySlug: string) => `/equipment/${categorySlug}`,
  product: (categorySlug: string, productSlug: string) =>
    `/equipment/${categorySlug}/${productSlug}`,
  equipmentWithBrand: (brand: string) =>
    `/equipment?brand=${encodeURIComponent(brand)}`,
  equipmentSearch: (query: string) => `/equipment?q=${encodeURIComponent(query)}`,
  equipmentWithSubcategory: (categorySlug: string, subcategory: string) =>
    `/equipment/${categorySlug}?subcategory=${encodeURIComponent(subcategory)}`,
};
