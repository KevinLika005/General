import { getCategories, getProducts, type CatalogCategory, type Product } from './catalog';

const HOMEPAGE_CATEGORY_ORDER = [
  'heavy-equipment',
  'lifting-access',
  'trucks-transport',
  'site-power-support',
  'attachments-spare-parts',
  'tools-workshop',
] as const;

export interface HomepageCategoryPreview {
  category: CatalogCategory;
  productCount: number;
  productTypeTitles: string[];
}

function homepageRank(slug: string) {
  const index = HOMEPAGE_CATEGORY_ORDER.indexOf(slug as (typeof HOMEPAGE_CATEGORY_ORDER)[number]);
  return index === -1 ? HOMEPAGE_CATEGORY_ORDER.length : index;
}

export function getHomepageCategoryPreviews(): HomepageCategoryPreview[] {
  const products = getProducts();

  return [...getCategories()]
    .map((category, originalIndex) => ({ category, originalIndex }))
    .sort(
      (first, second) =>
        homepageRank(first.category.slug) - homepageRank(second.category.slug) ||
        first.originalIndex - second.originalIndex,
    )
    .map(({ category }) => ({
      category,
      productCount: products.filter((product) => product.categorySlug === category.slug).length,
      productTypeTitles: category.subcategories
        .flatMap((subcategory) => subcategory.productTypes.map((productType) => productType.title))
        .slice(0, 3),
    }));
}

export function getHomepageStockPreviewProducts(): Product[] {
  return getProducts()
    .filter(
      (product) =>
        product.availability === 'available' || product.availability === 'incoming',
    )
    .sort((first, second) => {
      if (Boolean(first.featured) !== Boolean(second.featured)) {
        return first.featured ? -1 : 1;
      }

      if (first.availability !== second.availability) {
        return first.availability === 'available' ? -1 : 1;
      }

      return second.createdAt.localeCompare(first.createdAt);
    })
    .slice(0, 4);
}
