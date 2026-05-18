import type { Product } from '../data/catalog';
import i18n, { getCurrentLanguage } from '../i18n/config';

function numberFormatter(value: number) {
  return new Intl.NumberFormat(getCurrentLanguage() === 'sq' ? 'sq-AL' : 'en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPriceValue(value: number, currency: Product['priceCurrency']) {
  return `${currency} ${numberFormatter(value)}`;
}

export function formatProductPrice(product: Pick<Product, 'priceMode' | 'price' | 'priceCurrency'>) {
  if (product.priceMode === 'price-on-request' || !product.price) {
    return i18n.t('common.status.priceOnRequest');
  }

  if (product.priceMode === 'starting-from') {
    return i18n.t('common.status.startingFrom', {
      value: formatPriceValue(product.price, product.priceCurrency),
    });
  }

  return formatPriceValue(product.price, product.priceCurrency);
}
