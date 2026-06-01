import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  CatalogCategory,
  CatalogProductType,
  CatalogSort,
  CatalogSubcategory,
  Product,
  ProductAvailability,
  ProductCondition,
} from '../data/catalog';
import { getCategories } from '../data/catalog';
import {
  getCategoryBySlug,
  getSubcategoryBySlug,
  getTaxonomyLabelsForProduct,
} from '../utils/catalog';
import {
  getComparablePrice,
  matchesPriceBand,
  matchesSearch,
  type PriceBand,
} from '../utils/filters';

export type CatalogViewMode = 'grid' | 'list';

export interface CatalogFilterState {
  search: string;
  category: string;
  subcategory: string;
  productType: string;
  brand: string;
  condition: ProductCondition | 'all';
  availability: ProductAvailability | 'all';
  priceBand: PriceBand;
  yearMin: string;
  yearMax: string;
  hoursMax: string;
  mileageMax: string;
  location: string;
  tag: string;
  sort: CatalogSort;
  viewMode: CatalogViewMode;
}

export interface CatalogFilterOptionSets {
  categories: CatalogCategory[];
  subcategories: CatalogSubcategory[];
  productTypes: CatalogProductType[];
  brands: string[];
  locations: string[];
  tags: string[];
}

interface UseCatalogFiltersOptions {
  fixedCategory?: string;
  initialSearch?: string;
  initialBrand?: string;
  dealsOnly?: boolean;
  availableOnly?: boolean;
}

function uniqueBySlug<T extends { slug: string }>(items: T[]) {
  return Array.from(new Map(items.map((item) => [item.slug, item])).values());
}

export function useCatalogFilters(
  products: Product[],
  options: UseCatalogFiltersOptions = {},
) {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<CatalogFilterState>({
    search: options.initialSearch ?? '',
    category: options.fixedCategory ?? 'all',
    subcategory: 'all',
    productType: 'all',
    brand: options.initialBrand ?? 'all',
    condition: 'all',
    availability: 'all',
    priceBand: 'all',
    yearMin: '',
    yearMax: '',
    hoursMax: '',
    mileageMax: '',
    location: 'all',
    tag: 'all',
    sort: 'featured',
    viewMode: 'grid',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const effectiveCategorySlug =
    filters.category !== 'all' ? filters.category : options.fixedCategory;
  const effectiveSubcategorySlug = filters.subcategory !== 'all' ? filters.subcategory : undefined;
  const effectiveCategory = effectiveCategorySlug
    ? getCategoryBySlug(effectiveCategorySlug)
    : undefined;
  const effectiveSubcategory =
    effectiveCategory && effectiveSubcategorySlug
      ? getSubcategoryBySlug(effectiveCategory.slug, effectiveSubcategorySlug)
      : undefined;

  const optionSets = useMemo<CatalogFilterOptionSets>(() => {
    const sourceProducts = options.fixedCategory
      ? products.filter((product) => product.categorySlug === options.fixedCategory)
      : products;

    const availableCategories = getCategories();

    const availableSubcategories = effectiveCategory
      ? effectiveCategory.subcategories
      : uniqueBySlug(
          sourceProducts
            .map((product) => getSubcategoryBySlug(product.categorySlug, product.subcategorySlug))
            .filter((subcategory): subcategory is CatalogSubcategory => Boolean(subcategory)),
        );

    const availableProductTypes = effectiveSubcategory
      ? effectiveSubcategory.productTypes
      : effectiveCategory
        ? uniqueBySlug(
            effectiveCategory.subcategories.flatMap((subcategory) => subcategory.productTypes),
          )
        : uniqueBySlug(
            sourceProducts
              .map((product) => {
                const taxonomy = getTaxonomyLabelsForProduct(product);
                return effectiveCategorySlug
                  ? undefined
                  : getSubcategoryBySlug(taxonomy.categorySlug, taxonomy.subcategorySlug)
                      ?.productTypes.find(
                        (productType: CatalogProductType) =>
                          productType.slug === product.productTypeSlug,
                      );
              })
              .filter((productType): productType is CatalogProductType => Boolean(productType)),
          );

    return {
      categories: availableCategories,
      subcategories: availableSubcategories,
      productTypes: availableProductTypes,
      brands: Array.from(new Set(sourceProducts.map((product) => product.brand))).sort(),
      locations: Array.from(new Set(sourceProducts.map((product) => product.location))).sort(),
      tags: Array.from(new Set(sourceProducts.flatMap((product) => product.tags))).sort(),
    };
  }, [effectiveCategory, effectiveCategorySlug, effectiveSubcategory, options.fixedCategory, products]);

  const filteredProducts = useMemo(() => {
    const baseProducts = products.filter((product) => {
      if (options.fixedCategory && product.categorySlug !== options.fixedCategory) {
        return false;
      }

      if (options.dealsOnly && !product.deal) {
        return false;
      }

      if (
        options.availableOnly &&
        product.availability !== 'available' &&
        product.availability !== 'incoming'
      ) {
        return false;
      }

      if (filters.category !== 'all' && product.categorySlug !== filters.category) {
        return false;
      }

      if (filters.subcategory !== 'all' && product.subcategorySlug !== filters.subcategory) {
        return false;
      }

      if (filters.productType !== 'all' && product.productTypeSlug !== filters.productType) {
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

      if (
        filters.mileageMax &&
        product.mileageKm !== undefined &&
        product.mileageKm > Number(filters.mileageMax)
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
          return (
            (first.operatingHours ?? Number.MAX_SAFE_INTEGER) -
            (second.operatingHours ?? Number.MAX_SAFE_INTEGER)
          );
        case 'mileage-asc':
          return (
            (first.mileageKm ?? Number.MAX_SAFE_INTEGER) -
            (second.mileageKm ?? Number.MAX_SAFE_INTEGER)
          );
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
    const selectedCategory = filters.category !== 'all'
      ? getCategoryBySlug(filters.category)
      : undefined;
    const selectedSubcategory =
      selectedCategory && filters.subcategory !== 'all'
        ? getSubcategoryBySlug(selectedCategory.slug, filters.subcategory)
        : undefined;
    const selectedProductType =
      selectedCategory &&
      selectedSubcategory &&
      filters.productType !== 'all'
        ? selectedSubcategory.productTypes.find(
            (productType: CatalogProductType) => productType.slug === filters.productType,
          )
        : undefined;

    if (filters.search) chips.push({ key: 'search', label: `Search: ${filters.search}` });
    if (filters.category !== 'all') {
      chips.push({ key: 'category', label: selectedCategory?.title ?? filters.category });
    }
    if (filters.subcategory !== 'all') {
      chips.push({
        key: 'subcategory',
        label: selectedSubcategory?.title ?? filters.subcategory,
      });
    }
    if (filters.productType !== 'all') {
      chips.push({
        key: 'productType',
        label: selectedProductType?.title ?? filters.productType,
      });
    }
    if (filters.brand !== 'all') chips.push({ key: 'brand', label: filters.brand });
    if (filters.condition !== 'all') {
      chips.push({ key: 'condition', label: t(`common.status.${filters.condition}`) });
    }
    if (filters.availability !== 'all') {
      chips.push({ key: 'availability', label: t(`common.status.${filters.availability}`) });
    }
    if (filters.priceBand !== 'all') {
      chips.push({ key: 'priceBand', label: filters.priceBand.replace(/-/g, ' ') });
    }
    if (filters.yearMin) chips.push({ key: 'yearMin', label: `From ${filters.yearMin}` });
    if (filters.yearMax) chips.push({ key: 'yearMax', label: `To ${filters.yearMax}` });
    if (filters.hoursMax) chips.push({ key: 'hoursMax', label: `Hours under ${filters.hoursMax}` });
    if (filters.mileageMax) {
      chips.push({ key: 'mileageMax', label: `Mileage under ${filters.mileageMax}` });
    }
    if (filters.location !== 'all') chips.push({ key: 'location', label: filters.location });
    if (filters.tag !== 'all') chips.push({ key: 'tag', label: filters.tag });

    return chips;
  }, [filters, t]);

  const clearFilter = (key: keyof CatalogFilterState) => {
    setFilters((current) => {
      if (key === 'category') {
        return {
          ...current,
          category: options.fixedCategory ?? 'all',
          subcategory: 'all',
          productType: 'all',
        };
      }

      if (key === 'subcategory') {
        return {
          ...current,
          subcategory: 'all',
          productType: 'all',
        };
      }

      if (key === 'productType') {
        return {
          ...current,
          productType: 'all',
        };
      }

      return {
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
                  : key === 'brand'
                    ? options.initialBrand ?? 'all'
                    : key === 'location' || key === 'tag'
                      ? 'all'
                      : '',
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: options.fixedCategory ?? 'all',
      subcategory: 'all',
      productType: 'all',
      brand: options.initialBrand ?? 'all',
      condition: 'all',
      availability: 'all',
      priceBand: 'all',
      yearMin: '',
      yearMax: '',
      hoursMax: '',
      mileageMax: '',
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
