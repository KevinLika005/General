import {
  getBrands,
  getCategories,
  getFaqItems,
  legacyCategoryAliases,
  legacyFilterAliases,
  getProducts,
  type CatalogCategory,
  type CatalogProductType,
  type CatalogSubcategory,
  type Product,
  type ProductAvailability,
} from '../data/catalog';
import i18n from '../i18n/config';
import { formatProductPrice } from './formatPrice';

function normalizeValue(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

function findCategoryDirect(categorySlug: string) {
  const categories = getCategories();
  return categories.find((category) => category.slug === categorySlug);
}

function findSubcategoryDirect(category: CatalogCategory, subcategorySlug: string) {
  return category.subcategories.find(
    (subcategory) =>
      subcategory.slug === subcategorySlug || normalizeValue(subcategory.title) === normalizeValue(subcategorySlug),
  );
}

function findProductTypeDirect(subcategory: CatalogSubcategory, productTypeSlug: string) {
  return subcategory.productTypes.find(
    (productType) =>
      productType.slug === productTypeSlug || normalizeValue(productType.title) === normalizeValue(productTypeSlug),
  );
}

export function resolveCategorySlug(categorySlug?: string) {
  if (!categorySlug) {
    return undefined;
  }

  const normalized = normalizeValue(categorySlug);
  return legacyCategoryAliases[normalized] ?? normalized;
}

export function resolveTaxonomySelection({
  categorySlug,
  subcategorySlug,
  productTypeSlug,
}: {
  categorySlug?: string;
  subcategorySlug?: string;
  productTypeSlug?: string;
}): {
  categorySlug?: string;
  subcategorySlug?: string;
  productTypeSlug?: string;
} {
  const normalizedCategory = resolveCategorySlug(categorySlug);
  const normalizedSubcategory = subcategorySlug ? normalizeValue(subcategorySlug) : undefined;
  const normalizedProductType = productTypeSlug ? normalizeValue(productTypeSlug) : undefined;

  const aliasFromType = normalizedProductType
    ? legacyFilterAliases[normalizedProductType]
    : undefined;
  const aliasFromSubcategory = normalizedSubcategory
    ? legacyFilterAliases[normalizedSubcategory]
    : undefined;

  const resolvedCategorySlug =
    normalizedCategory ?? aliasFromType?.categorySlug ?? aliasFromSubcategory?.categorySlug;

  const category = resolvedCategorySlug ? getCategoryBySlug(resolvedCategorySlug) : undefined;

  let resolvedSubcategorySlug: string | undefined;
  if (category && normalizedSubcategory) {
    const directSubcategory = findSubcategoryDirect(category, normalizedSubcategory);
    resolvedSubcategorySlug = directSubcategory?.slug;
  }

  if (!resolvedSubcategorySlug && category) {
    const aliasedSubcategory = aliasFromType?.subcategorySlug ?? aliasFromSubcategory?.subcategorySlug;
    if (aliasedSubcategory) {
      const directSubcategory = findSubcategoryDirect(category, aliasedSubcategory);
      resolvedSubcategorySlug = directSubcategory?.slug;
    }
  }

  let resolvedProductTypeSlug: string | undefined;
  if (category && resolvedSubcategorySlug && normalizedProductType) {
    const subcategory = getSubcategoryBySlug(category.slug, resolvedSubcategorySlug);
    const directProductType = subcategory
      ? findProductTypeDirect(subcategory, normalizedProductType)
      : undefined;
    resolvedProductTypeSlug = directProductType?.slug;
  }

  if (!resolvedProductTypeSlug && category && resolvedSubcategorySlug) {
    const aliasedProductType = aliasFromType?.productTypeSlug ?? aliasFromSubcategory?.productTypeSlug;
    if (aliasedProductType) {
      const subcategory = getSubcategoryBySlug(category.slug, resolvedSubcategorySlug);
      const directProductType = subcategory
        ? findProductTypeDirect(subcategory, aliasedProductType)
        : undefined;
      resolvedProductTypeSlug = directProductType?.slug;
    }
  }

  return {
    categorySlug: category?.slug,
    subcategorySlug: resolvedSubcategorySlug,
    productTypeSlug: resolvedProductTypeSlug,
  };
}

export function getProductBySlug(productSlug: string) {
  const products = getProducts();
  return products.find((product) => product.slug === productSlug);
}

export function getProductBySlugs(categorySlug: string, productSlug: string) {
  const products = getProducts();
  const resolvedCategorySlug = resolveCategorySlug(categorySlug);

  return products.find(
    (product) =>
      product.slug === productSlug &&
      (!resolvedCategorySlug || product.categorySlug === resolvedCategorySlug),
  );
}

export function getCategoryBySlug(categorySlug: string) {
  const resolvedCategorySlug = resolveCategorySlug(categorySlug);

  if (!resolvedCategorySlug) {
    return undefined;
  }

  return findCategoryDirect(resolvedCategorySlug);
}

export function getSubcategoryBySlug(
  categorySlug: string,
  subcategorySlug: string,
): CatalogSubcategory | undefined {
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return undefined;
  }

  const resolved = resolveTaxonomySelection({
    categorySlug: category.slug,
    subcategorySlug,
  }).subcategorySlug;

  return resolved ? findSubcategoryDirect(category, resolved) : undefined;
}

export function getProductTypeBySlug(
  categorySlug: string,
  subcategorySlug: string,
  productTypeSlug: string,
): CatalogProductType | undefined {
  const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);

  if (!subcategory) {
    return undefined;
  }

  const resolved = resolveTaxonomySelection({
    categorySlug,
    subcategorySlug: subcategory.slug,
    productTypeSlug,
  }).productTypeSlug;

  return resolved ? findProductTypeDirect(subcategory, resolved) : undefined;
}

export function getTaxonomyLabelsForProduct(product: Product) {
  const category = getCategoryBySlug(product.categorySlug);
  const subcategory = getSubcategoryBySlug(product.categorySlug, product.subcategorySlug);
  const productType = getProductTypeBySlug(
    product.categorySlug,
    product.subcategorySlug,
    product.productTypeSlug,
  );

  return {
    categorySlug: category?.slug ?? product.categorySlug,
    categoryTitle: category?.title ?? product.categorySlug,
    subcategorySlug: subcategory?.slug ?? product.subcategorySlug,
    subcategoryTitle: subcategory?.title ?? product.subcategorySlug,
    productTypeSlug: productType?.slug ?? product.productTypeSlug,
    productTypeTitle: productType?.title ?? product.productTypeSlug,
  };
}

export function getProductsByCategory(categorySlug: string) {
  const products = getProducts();
  const resolvedCategorySlug = resolveCategorySlug(categorySlug);

  if (!resolvedCategorySlug) {
    return [];
  }

  return products.filter((product) => product.categorySlug === resolvedCategorySlug);
}

export function getProductsByBrand(brandQuery: string) {
  const brands = getBrands();
  const products = getProducts();
  const normalized = normalizeValue(brandQuery);

  if (!normalized) {
    return [];
  }

  const brand = brands.find(
    (candidate) =>
      candidate.slug.toLowerCase() === normalized ||
      normalizeValue(candidate.name) === normalized,
  );

  if (!brand) {
    return [];
  }

  return products.filter((product) => product.brand === brand.name);
}

export function getBrandBySlug(brandSlug: string) {
  const brands = getBrands();
  return brands.find((brand) => brand.slug === normalizeValue(brandSlug));
}

export function getFeaturedProducts(limit?: number) {
  const products = getProducts();
  const items = products.filter(
    (product) => product.featured && product.availability !== 'sold',
  );

  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

export function getDealProducts(limit?: number) {
  const products = getProducts();
  const items = products.filter(
    (product) => product.deal && product.availability !== 'sold',
  );

  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

export function getAvailableProducts(limit?: number) {
  const products = getProducts();
  const items = products.filter(
    (product) =>
      product.availability === 'available' || product.availability === 'incoming',
  );

  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

export function getAllProductTypes(categorySlug?: string, subcategorySlug?: string) {
  const categories = getCategories();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const subcategory = category && subcategorySlug
    ? getSubcategoryBySlug(category.slug, subcategorySlug)
    : undefined;

  if (subcategory) {
    return subcategory.productTypes;
  }

  if (category) {
    return category.subcategories.flatMap((item) => item.productTypes);
  }

  return categories.flatMap((item) => item.subcategories.flatMap((subcategoryItem) => subcategoryItem.productTypes));
}

export function getSimilarProducts(product: Product, limit = 3) {
  const products = getProducts();
  return products
    .filter((candidate) => candidate.id !== product.id)
    .sort((first, second) => {
      const firstScore =
        Number(first.categorySlug === product.categorySlug) * 3 +
        Number(first.subcategorySlug === product.subcategorySlug) * 2 +
        Number(first.productTypeSlug === product.productTypeSlug) * 2 +
        Number(first.brand === product.brand);
      const secondScore =
        Number(second.categorySlug === product.categorySlug) * 3 +
        Number(second.subcategorySlug === product.subcategorySlug) * 2 +
        Number(second.productTypeSlug === product.productTypeSlug) * 2 +
        Number(second.brand === product.brand);

      return secondScore - firstScore;
    })
    .slice(0, limit);
}

export function getProductsByIds(productIds: string[]) {
  const products = getProducts();
  return productIds
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product): product is Product => Boolean(product));
}

export function getFaqsByCategory(categorySlug: string) {
  const faqItems = getFaqItems();
  const resolvedCategorySlug = resolveCategorySlug(categorySlug);

  return faqItems.filter((item) => item.categorySlug === resolvedCategorySlug);
}

export function getAdjacentProductsInCategory(categorySlug: string, productId: string) {
  const categoryProducts = getProductsByCategory(categorySlug);
  const index = categoryProducts.findIndex((product) => product.id === productId);

  return {
    previous: index > 0 ? categoryProducts[index - 1] : undefined,
    next:
      index >= 0 && index < categoryProducts.length - 1
        ? categoryProducts[index + 1]
        : undefined,
  };
}

export function getProductPriceLabel(product: Pick<Product, 'priceMode' | 'price' | 'priceCurrency'>) {
  return formatProductPrice(product);
}

export function getProductAvailabilityLabel(availability: ProductAvailability) {
  return i18n.t(`common.status.${availability === 'available' ? 'availableNow' : availability === 'incoming' ? 'incomingStock' : availability === 'reserved' ? 'reservedPendingContract' : 'soldReference'}`);
}
