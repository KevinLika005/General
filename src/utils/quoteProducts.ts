import type { InquiryItem } from '../data/catalog';
import { getProductsByIds, getTaxonomyLabelsForProduct } from './catalog';
import { formatProductPrice } from './formatPrice';
import { routes } from './routes';

interface QuoteProductPayload {
  inquiryItemId: string;
  productId: string;
  slug: string;
  category: {
    slug: string;
    title: string;
  };
  subcategory: {
    slug: string;
    title: string;
  } | null;
  productType: {
    slug: string;
    title: string;
  };
  brand: string;
  model: string;
  title: string;
  sku: string;
  quantity: number;
  formattedPrice: string;
  priceMode: string;
  priceAmount: number | null;
  priceCurrency: string;
  availability: string;
  condition: string;
  location: string;
  year: number | null;
  operatingHours: number | null;
  mileageKm: number | null;
  notes: string;
  excerpt: string;
  productPath: string;
  productUrl: string;
}

function buildAbsoluteUrl(path: string) {
  if (typeof window === 'undefined') {
    return path;
  }

  return new URL(path, window.location.origin).toString();
}

export function buildQuoteProductsPayload(inquiryItems: InquiryItem[]): QuoteProductPayload[] {
  const productsById = new Map(
    getProductsByIds(inquiryItems.map((item) => item.productId)).map((product) => [product.id, product]),
  );

  return inquiryItems.flatMap((item, index) => {
    const product = productsById.get(item.productId);

    if (!product) {
      return [];
    }

    const taxonomy = getTaxonomyLabelsForProduct(product);
    const productPath = routes.product(product.categorySlug, product.slug);

    return [
      {
        inquiryItemId: `${item.productId}-${index + 1}`,
        productId: product.id,
        slug: product.slug,
        category: {
          slug: taxonomy.categorySlug,
          title: taxonomy.categoryTitle,
        },
        subcategory: taxonomy.subcategorySlug
          ? {
              slug: taxonomy.subcategorySlug,
              title: taxonomy.subcategoryTitle,
            }
          : null,
        productType: {
          slug: taxonomy.productTypeSlug,
          title: taxonomy.productTypeTitle,
        },
        brand: product.brand,
        model: product.model,
        title: product.title,
        sku: product.sku,
        quantity: item.quantity,
        formattedPrice: formatProductPrice(product),
        priceMode: product.priceMode,
        priceAmount: product.price ?? null,
        priceCurrency: product.priceCurrency,
        availability: product.availability,
        condition: product.condition,
        location: product.location,
        year: product.year ?? null,
        operatingHours: product.operatingHours ?? null,
        mileageKm: product.mileageKm ?? null,
        notes: item.notes,
        excerpt: product.excerpt,
        productPath,
        productUrl: buildAbsoluteUrl(productPath),
      },
    ];
  });
}
