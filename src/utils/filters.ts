import type { Product } from '../data/catalog';
import { getTaxonomyLabelsForProduct } from './catalog';

export type PriceBand =
  | 'all'
  | 'under-5000'
  | 'under-25000'
  | 'under-100000'
  | 'price-on-request';

export function normalizeText(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

export function matchesSearch(product: Product, search: string) {
  const query = normalizeText(search);

  if (!query) {
    return true;
  }

  const taxonomy = getTaxonomyLabelsForProduct(product);

  const haystack = [
    product.title,
    product.brand,
    product.model,
    product.categorySlug,
    product.subcategorySlug,
    product.productTypeSlug,
    taxonomy.categoryTitle,
    taxonomy.subcategoryTitle,
    taxonomy.productTypeTitle,
    product.sku,
    product.serialNumber ?? '',
    product.excerpt,
    product.description,
    product.location,
    product.unitOfMeasure ?? '',
    product.fuelType ?? '',
    product.enginePower ?? '',
    product.weight ?? '',
    product.capacity ?? '',
    product.transmission ?? '',
    ...product.tags,
    ...product.specs.flatMap((spec) => [spec.label, spec.value]),
  ]
    .map(normalizeText)
    .join(' ');

  return query
    .split(/\s+/)
    .every((token) => haystack.includes(token));
}

export function matchesPriceBand(product: Product, priceBand: PriceBand) {
  if (priceBand === 'all') {
    return true;
  }

  if (priceBand === 'price-on-request') {
    return product.priceMode === 'price-on-request';
  }

  if (!product.price) {
    return false;
  }

  if (priceBand === 'under-5000') {
    return product.price <= 5000;
  }

  if (priceBand === 'under-25000') {
    return product.price <= 25000;
  }

  return product.price <= 100000;
}

export function getComparablePrice(product: Product) {
  if (product.priceMode === 'price-on-request' || product.price === undefined) {
    return null;
  }

  return product.price;
}
