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

function sortCategoriesByHomepageOrder(categories: CatalogCategory[]) {
  return [...categories].sort(
    (first, second) =>
      HOMEPAGE_CATEGORY_ORDER.indexOf(first.slug as (typeof HOMEPAGE_CATEGORY_ORDER)[number]) -
      HOMEPAGE_CATEGORY_ORDER.indexOf(second.slug as (typeof HOMEPAGE_CATEGORY_ORDER)[number]),
  );
}

export function getHomepageCategoryPreviews(): HomepageCategoryPreview[] {
  const categories = getCategories().filter((category) =>
    HOMEPAGE_CATEGORY_ORDER.includes(category.slug as (typeof HOMEPAGE_CATEGORY_ORDER)[number]),
  );
  const products = getProducts();

  return sortCategoriesByHomepageOrder(categories).map((category) => ({
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
    .slice(0, 3);
}
