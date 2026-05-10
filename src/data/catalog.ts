import { brandDefinitions } from './brands';
import { categories } from './categories';
import { salesContacts } from './contact';
import { faqItems } from './faq';
import { productTemplate } from './productTemplate';
import { products } from './products';
import { budgetBands, companyProfile, homeStats, howItWorksSteps, siteMetadata, trustFeatures } from './site';
import type { Brand, Product } from './types';

export * from './types';
export { brandDefinitions, budgetBands, categories, companyProfile, faqItems, homeStats, howItWorksSteps, productTemplate, products, salesContacts, siteMetadata, trustFeatures };

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'year-desc', label: 'Year newest' },
  { value: 'hours-asc', label: 'Hours low to high' },
] as const;

export type CatalogSort = (typeof sortOptions)[number]['value'];

export const brands: Brand[] = brandDefinitions
  .map((definition) => ({
    ...definition,
    productCount: products.filter((product) => product.brand === definition.name).length,
  }))
  .filter((brand) => brand.productCount > 0);

export const availableNowProducts = products.filter(
  (product) => product.availability === 'available' || product.availability === 'incoming',
);

export const featuredProducts = products.filter(
  (product) => product.featured && product.availability !== 'sold',
);

export const dealProducts = products.filter(
  (product) => product.deal && product.availability !== 'sold',
);

export const newestProducts: Product[] = [...products].sort((first, second) =>
  second.createdAt.localeCompare(first.createdAt),
);
