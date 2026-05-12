import { brands, categories, faqItems, products, type Product, type ProductAvailability } from '../data/catalog';
import { formatProductPrice } from './formatPrice';

const availabilityLabels: Record<ProductAvailability, string> = {
  available: 'Available now',
  reserved: 'Reserved pending contract',
  incoming: 'Incoming stock',
  sold: 'Sold reference',
};

export function getProductBySlug(productSlug: string) {
  return products.find((product) => product.slug === productSlug);
}

export function getProductBySlugs(categorySlug: string, productSlug: string) {
  return products.find(
    (product) => product.categorySlug === categorySlug && product.slug === productSlug,
  );
}

export function getCategoryBySlug(categorySlug: string) {
  return categories.find((category) => category.slug === categorySlug);
}

export function getSubcategoryTitle(categorySlug: string, subcategoryValue: string) {
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return subcategoryValue;
  }

  const normalized = subcategoryValue.trim().toLowerCase();
  const match = category.subcategories.find(
    (subcategory) =>
      subcategory.slug.toLowerCase() === normalized ||
      subcategory.title.toLowerCase() === normalized,
  );

  return match?.title ?? subcategoryValue;
}

export function getSubcategoryParam(categorySlug: string, subcategoryTitle: string) {
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return subcategoryTitle;
  }

  const match = category.subcategories.find(
    (subcategory) => subcategory.title.toLowerCase() === subcategoryTitle.toLowerCase(),
  );

  return match?.slug ?? subcategoryTitle;
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.categorySlug === categorySlug);
}

export function getProductsByBrand(brandQuery: string) {
  const normalized = brandQuery.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  const brand = brands.find(
    (candidate) =>
      candidate.slug.toLowerCase() === normalized ||
      candidate.name.toLowerCase() === normalized,
  );

  if (!brand) {
    return [];
  }

  return products.filter((product) => product.brand === brand.name);
}

export function getBrandBySlug(brandSlug: string) {
  return brands.find((brand) => brand.slug === brandSlug);
}

export function getFeaturedProducts(limit?: number) {
  const items = products.filter(
    (product) => product.featured && product.availability !== 'sold',
  );

  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

export function getDealProducts(limit?: number) {
  const items = products.filter(
    (product) => product.deal && product.availability !== 'sold',
  );

  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

export function getAvailableProducts(limit?: number) {
  const items = products.filter(
    (product) =>
      product.availability === 'available' || product.availability === 'incoming',
  );

  return typeof limit === 'number' ? items.slice(0, limit) : items;
}

export function getSimilarProducts(product: Product, limit = 3) {
  return products
    .filter((candidate) => candidate.id !== product.id)
    .sort((first, second) => {
      const firstScore =
        Number(first.categorySlug === product.categorySlug) * 3 +
        Number(first.subcategory === product.subcategory) * 2 +
        Number(first.brand === product.brand);
      const secondScore =
        Number(second.categorySlug === product.categorySlug) * 3 +
        Number(second.subcategory === product.subcategory) * 2 +
        Number(second.brand === product.brand);

      return secondScore - firstScore;
    })
    .slice(0, limit);
}

export function getProductsByIds(productIds: string[]) {
  return productIds
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product): product is Product => Boolean(product));
}

export function getFaqsByCategory(categorySlug: string) {
  return faqItems.filter((item) => item.categorySlug === categorySlug);
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
  return availabilityLabels[availability];
}
