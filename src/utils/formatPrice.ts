import type { Product } from '../data/catalog';

function numberFormatter(value: number) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceValue(value: number, currency: Product['priceCurrency']) {
  return `${currency} ${numberFormatter(value)}`;
}

export function formatProductPrice(product: Pick<Product, 'priceMode' | 'price' | 'priceCurrency'>) {
  if (product.priceMode === 'price-on-request' || !product.price) {
    return 'Price on request';
  }

  if (product.priceMode === 'starting-from') {
    return `Starting from ${formatPriceValue(product.price, product.priceCurrency)}`;
  }

  return formatPriceValue(product.price, product.priceCurrency);
}
