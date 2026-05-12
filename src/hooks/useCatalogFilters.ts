import { useMemo, useState } from 'react';
import type {
  CatalogSort,
  Product,
  ProductAvailability,
  ProductCondition,
} from '../data/catalog';
import { getComparablePrice, matchesPriceBand, matchesSearch, type PriceBand } from '../utils/filters';

export type CatalogViewMode = 'grid' | 'list';

export interface CatalogFilterState {
  search: string;
  category: string;
  subcategory: string;
  brand: string;
  condition: ProductCondition | 'all';
  availability: ProductAvailability | 'all';
  priceBand: PriceBand;
  yearMin: string;
  yearMax: string;
  hoursMax: string;
  location: string;
  tag: string;
  sort: CatalogSort;
  viewMode: CatalogViewMode;
}

interface UseCatalogFiltersOptions {
  fixedCategory?: string;
  initialSearch?: string;
  initialBrand?: string;
  dealsOnly?: boolean;
  availableOnly?: boolean;
}

export function useCatalogFilters(
  products: Product[],
  options: UseCatalogFiltersOptions = {},
) {
  const [filters, setFilters] = useState<CatalogFilterState>({
    search: options.initialSearch ?? '',
    category: options.fixedCategory ?? 'all',
    subcategory: 'all',
    brand: options.initialBrand ?? 'all',
    condition: 'all',
    availability: 'all',
    priceBand: 'all',
    yearMin: '',
    yearMax: '',
    hoursMax: '',
    location: 'all',
    tag: 'all',
    sort: 'featured',
    viewMode: 'grid',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const optionSets = useMemo(() => {
    const sourceProducts = options.fixedCategory
      ? products.filter((product) => product.categorySlug === options.fixedCategory)
      : products;

    return {
      categories: Array.from(new Set(products.map((product) => product.categorySlug))),
      subcategories: Array.from(new Set(sourceProducts.map((product) => product.subcategory))),
      brands: Array.from(new Set(sourceProducts.map((product) => product.brand))),
      locations: Array.from(new Set(sourceProducts.map((product) => product.location))),
      tags: Array.from(new Set(sourceProducts.flatMap((product) => product.tags))).sort(),
    };
  }, [options.fixedCategory, products]);

  const filteredProducts = useMemo(() => {
    const baseProducts = products.filter((product) => {
      if (options.fixedCategory && product.categorySlug !== options.fixedCategory) {
        return false;
      }

      if (options.dealsOnly && !product.deal) {
        return false;
      }

      if (options.availableOnly && product.availability !== 'available') {
        return false;
      }

      if (filters.category !== 'all' && product.categorySlug !== filters.category) {
        return false;
      }

      if (filters.subcategory !== 'all' && product.subcategory !== filters.subcategory) {
        return false;
      }

      if (filters.brand !== 'all' && product.brand !== filters.brand) {
        return false;
      }

      if (filters.condition !== 'all' && product.condition !== filters.condition) {
        return false;
      }

      if (filters.availability !== 'all' && product.availability !== filters.availability) {
        return false;
      }

      if (filters.location !== 'all' && product.location !== filters.location) {
        return false;
      }

      if (filters.tag !== 'all' && !product.tags.includes(filters.tag)) {
        return false;
      }

      if (!matchesSearch(product, filters.search)) {
        return false;
      }

      if (!matchesPriceBand(product, filters.priceBand)) {
        return false;
      }

      if (filters.yearMin && product.year < Number(filters.yearMin)) {
        return false;
      }

      if (filters.yearMax && product.year > Number(filters.yearMax)) {
        return false;
      }

      if (
        filters.hoursMax &&
        product.operatingHours !== undefined &&
        product.operatingHours > Number(filters.hoursMax)
      ) {
        return false;
      }

      return true;
    });

    const sortedProducts = [...baseProducts];

    sortedProducts.sort((first, second) => {
      const firstPrice = getComparablePrice(first);
      const secondPrice = getComparablePrice(second);

      switch (filters.sort) {
        case 'newest':
        case 'year-desc':
          if (second.createdAt !== first.createdAt) {
            return second.createdAt.localeCompare(first.createdAt);
          }
          return second.year - first.year;
        case 'price-asc':
          if (firstPrice === null && secondPrice === null) return 0;
          if (firstPrice === null) return 1;
          if (secondPrice === null) return -1;
          return firstPrice - secondPrice;
        case 'price-desc':
          if (firstPrice === null && secondPrice === null) return 0;
          if (firstPrice === null) return 1;
          if (secondPrice === null) return -1;
          return secondPrice - firstPrice;
        case 'hours-asc':
          return (first.operatingHours ?? Number.MAX_SAFE_INTEGER) - (second.operatingHours ?? Number.MAX_SAFE_INTEGER);
        case 'featured':
        default:
          return (
            Number(second.featured === true) - Number(first.featured === true) ||
            second.createdAt.localeCompare(first.createdAt)
          );
      }
    });

    return sortedProducts;
  }, [filters, options.availableOnly, options.dealsOnly, options.fixedCategory, products]);

  const appliedFilters = useMemo(() => {
    const chips: { key: keyof CatalogFilterState; label: string }[] = [];

    if (filters.search) chips.push({ key: 'search', label: `Search: ${filters.search}` });
    if (filters.category !== 'all') chips.push({ key: 'category', label: filters.category.replace(/-/g, ' ') });
    if (filters.subcategory !== 'all') chips.push({ key: 'subcategory', label: filters.subcategory });
    if (filters.brand !== 'all') chips.push({ key: 'brand', label: filters.brand });
    if (filters.condition !== 'all') chips.push({ key: 'condition', label: filters.condition });
    if (filters.availability !== 'all') chips.push({ key: 'availability', label: filters.availability });
    if (filters.priceBand !== 'all') chips.push({ key: 'priceBand', label: filters.priceBand.replace(/-/g, ' ') });
    if (filters.yearMin) chips.push({ key: 'yearMin', label: `From ${filters.yearMin}` });
    if (filters.yearMax) chips.push({ key: 'yearMax', label: `To ${filters.yearMax}` });
    if (filters.hoursMax) chips.push({ key: 'hoursMax', label: `Hours under ${filters.hoursMax}` });
    if (filters.location !== 'all') chips.push({ key: 'location', label: filters.location });
    if (filters.tag !== 'all') chips.push({ key: 'tag', label: filters.tag });

    return chips;
  }, [filters]);

  const clearFilter = (key: keyof CatalogFilterState) => {
    setFilters((current) => ({
      ...current,
      [key]:
        key === 'condition' || key === 'availability'
          ? 'all'
          : key === 'sort'
            ? 'featured'
            : key === 'viewMode'
              ? 'grid'
            : key === 'priceBand'
              ? 'all'
              : key === 'category'
                ? options.fixedCategory ?? 'all'
                : key === 'brand'
                  ? options.initialBrand ?? 'all'
                  : key === 'location' || key === 'subcategory' || key === 'tag'
                    ? 'all'
                    : '',
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: options.fixedCategory ?? 'all',
      subcategory: 'all',
      brand: options.initialBrand ?? 'all',
      condition: 'all',
      availability: 'all',
      priceBand: 'all',
      yearMin: '',
      yearMax: '',
      hoursMax: '',
      location: 'all',
      tag: 'all',
      sort: 'featured',
      viewMode: 'grid',
    });
  };

  return {
    filters,
    setFilters,
    filteredProducts,
    optionSets,
    appliedFilters,
    clearFilter,
    clearAllFilters,
    mobileFiltersOpen,
    setMobileFiltersOpen,
  };
}
