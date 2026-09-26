import { describe, expect, it } from 'vitest';
import { getCategories } from '../src/data/catalog';
import { getHomepageCategoryPreviews, getHomepageStockPreviewProducts } from '../src/data/homepage';

describe('homepage data', () => {
  it('shows every top-level category, led by the six priority ones', () => {
    const previews = getHomepageCategoryPreviews();
    expect(previews).toHaveLength(getCategories().length);
    expect(previews.slice(0, 6).map((preview) => preview.category.slug)).toEqual([
      'heavy-equipment',
      'lifting-access',
      'trucks-transport',
      'site-power-support',
      'attachments-spare-parts',
      'tools-workshop',
    ]);
  });

  it('previews up to four in-stock or incoming products', () => {
    const products = getHomepageStockPreviewProducts();
    expect(products.length).toBeLessThanOrEqual(4);
    expect(products.every((product) => product.availability === 'available' || product.availability === 'incoming')).toBe(true);
  });

  it('returns exactly four when enough stock exists', () => {
    expect(getHomepageStockPreviewProducts()).toHaveLength(4);
  });
});
