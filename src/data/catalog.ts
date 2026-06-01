import { brandDefinitions } from './brands';
import { getCategories as getLocalizedCategories, legacyCategoryAliases, legacyFilterAliases } from './categories';
import { getSalesContacts as getLocalizedSalesContacts } from './contact';
import { getFaqItems as getLocalizedFaqItems } from './faq';
import { imageAttributions } from './imageAttributions';
import { productTemplate } from './productTemplate';
import { getProducts as getLocalizedProducts } from './products';
import {
  getBudgetBands as getLocalizedBudgetBands,
  getCompanyProfile as getLocalizedCompanyProfile,
  getHomeStats as getLocalizedHomeStats,
  getHowItWorksSteps as getLocalizedHowItWorksSteps,
  siteMetadata,
  getTrustFeatures as getLocalizedTrustFeatures,
} from './site';
import type { Brand, Product } from './types';

export * from './types';
export {
  brandDefinitions,
  imageAttributions,
  legacyCategoryAliases,
  legacyFilterAliases,
  productTemplate,
  siteMetadata,
};

export const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price low to high' },
  { value: 'price-desc', label: 'Price high to low' },
  { value: 'year-desc', label: 'Year newest' },
  { value: 'hours-asc', label: 'Hours low to high' },
  { value: 'mileage-asc', label: 'Mileage low to high' },
] as const;

export type CatalogSort =
  | 'featured'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'year-desc'
  | 'hours-asc'
  | 'mileage-asc';

export function getCategories() {
  return getLocalizedCategories();
}

export function getCompanyProfile() {
  return getLocalizedCompanyProfile();
}

export function getFaqItems() {
  return getLocalizedFaqItems();
}

export function getSalesContacts() {
  return getLocalizedSalesContacts();
}

export function getTrustFeatures() {
  return getLocalizedTrustFeatures();
}

export function getHomeStats() {
  return getLocalizedHomeStats();
}

export function getBudgetBands() {
  return getLocalizedBudgetBands();
}

export function getHowItWorksSteps() {
  return getLocalizedHowItWorksSteps();
}

export function getProducts() {
  return getLocalizedProducts();
}

export function getBrands(): Brand[] {
  const products = getProducts();

  return brandDefinitions
    .map((definition) => ({
      ...definition,
      productCount: products.filter((product) => product.brand === definition.name).length,
    }))
    .filter((brand) => brand.productCount > 0);
}

export function getAvailableNowProducts() {
  return getProducts().filter(
    (product) => product.availability === 'available' || product.availability === 'incoming',
  );
}

export function getFeaturedProducts() {
  return getProducts().filter(
    (product) => product.featured && product.availability !== 'sold',
  );
}

export function getDealProducts() {
  return getProducts().filter(
    (product) => product.deal && product.availability !== 'sold',
  );
}

export function getNewestProducts(): Product[] {
  return [...getProducts()].sort((first, second) =>
    second.createdAt.localeCompare(first.createdAt),
  );
}
