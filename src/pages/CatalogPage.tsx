import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { MobileFilterDrawer } from '../components/common/MobileFilterDrawer';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { categories, products, sortOptions } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { routes } from '../utils/routes';

export function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = searchParams.get('brand') ?? '';
  const categoryParam = searchParams.get('category') ?? '';
  const subcategoryParam = searchParams.get('subcategory') ?? '';
  const conditionParam = searchParams.get('condition') ?? '';
  const availabilityParam = searchParams.get('availability') ?? '';
  const queryParam = searchParams.get('q') ?? '';
  const priceBandParam = searchParams.get('priceBand') ?? '';
  const yearMinParam = searchParams.get('yearMin') ?? '';
  const yearMaxParam = searchParams.get('yearMax') ?? '';
  const hoursMaxParam = searchParams.get('hoursMax') ?? '';
  const locationParam = searchParams.get('location') ?? '';
  const tagParam = searchParams.get('tag') ?? '';
  const sortParam = searchParams.get('sort') ?? '';
  const viewParam = searchParams.get('view') ?? '';
  const {
    appliedFilters,
    clearAllFilters,
    clearFilter,
    filteredProducts,
    filters,
    mobileFiltersOpen,
    optionSets,
    setFilters,
    setMobileFiltersOpen,
  } = useCatalogFilters(products, {
    initialBrand: brandParam || undefined,
    initialSearch: queryParam || undefined,
  });

  usePageMetadata({
    title: 'Catalog | Rafin Machinery',
    description: 'Search the Rafin Machinery catalog by product, brand, category, SKU, availability, and price mode through a compact B2B inquiry-focused interface.',
  });

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      brand: brandParam || 'all',
      category: categoryParam || 'all',
      subcategory: subcategoryParam || 'all',
      condition:
        conditionParam === 'new' || conditionParam === 'used' || conditionParam === 'refurbished'
          ? conditionParam
          : 'all',
      availability:
        availabilityParam === 'available' ||
        availabilityParam === 'incoming' ||
        availabilityParam === 'reserved' ||
        availabilityParam === 'sold'
          ? availabilityParam
          : 'all',
      search: queryParam,
      priceBand:
        priceBandParam === 'under-5000' ||
        priceBandParam === 'under-25000' ||
        priceBandParam === 'under-100000' ||
        priceBandParam === 'price-on-request'
          ? priceBandParam
          : 'all',
      yearMin: yearMinParam,
      yearMax: yearMaxParam,
      hoursMax: hoursMaxParam,
      location: locationParam || 'all',
      tag: tagParam || 'all',
      sort:
        sortParam === 'newest' ||
        sortParam === 'price-asc' ||
        sortParam === 'price-desc' ||
        sortParam === 'year-desc' ||
        sortParam === 'hours-asc'
          ? sortParam
          : 'featured',
      viewMode: viewParam === 'list' ? 'list' : 'grid',
    }));
  }, [
    availabilityParam,
    brandParam,
    categoryParam,
    conditionParam,
    hoursMaxParam,
    locationParam,
    priceBandParam,
    queryParam,
    setFilters,
    sortParam,
    subcategoryParam,
    tagParam,
    viewParam,
    yearMaxParam,
    yearMinParam,
  ]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (filters.search) nextParams.set('q', filters.search);
    if (filters.brand !== 'all') nextParams.set('brand', filters.brand);
    if (filters.category !== 'all') nextParams.set('category', filters.category);
    if (filters.subcategory !== 'all') nextParams.set('subcategory', filters.subcategory);
    if (filters.condition !== 'all') nextParams.set('condition', filters.condition);
    if (filters.availability !== 'all') nextParams.set('availability', filters.availability);
    if (filters.priceBand !== 'all') nextParams.set('priceBand', filters.priceBand);
    if (filters.yearMin) nextParams.set('yearMin', filters.yearMin);
    if (filters.yearMax) nextParams.set('yearMax', filters.yearMax);
    if (filters.hoursMax) nextParams.set('hoursMax', filters.hoursMax);
    if (filters.location !== 'all') nextParams.set('location', filters.location);
    if (filters.tag !== 'all') nextParams.set('tag', filters.tag);
    if (filters.sort !== 'featured') nextParams.set('sort', filters.sort);
    if (filters.viewMode !== 'grid') nextParams.set('view', filters.viewMode);

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  const gridClass =
    filters.viewMode === 'list'
      ? 'grid-cols-1'
      : 'md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4';

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-4 sm:p-5 xl:p-6">
          <p className="kicker">Products</p>
          <h1 className="mt-2 text-[1.8rem] leading-[1.08] text-navy sm:text-[2.2rem] xl:text-[2.8rem]">
            Browse machinery, parts, attachments, trucks, and support equipment
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-text-muted sm:text-base">
            Search inventory, narrow by brand or stock status, and add products to your Inquiry List before requesting pricing, inspection, information, or contract follow-up.
          </p>

          <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_18rem] xl:items-center">
            <SearchBar
              buttonLabel="Search Catalog"
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder="Search by product, machine, brand, model, SKU, location, or technical keyword"
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              Inquiry-only workflow. Final pricing, inspection, delivery, and contract handling stay offline.
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Link
                className="chip whitespace-nowrap"
                key={category.slug}
                to={routes.category(category.slug)}
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 xl:grid-cols-[18.5rem_minmax(0,1fr)]">
          <div className="hidden xl:block xl:sticky xl:top-[9rem] xl:self-start">
            <FilterSidebar
              clearAllFilters={clearAllFilters}
              filters={filters}
              optionSets={optionSets}
              setFilters={setFilters}
            />
          </div>

          <div>
            <div className="toolbar-panel sticky top-[7rem] z-20 px-4 py-4 shadow-card xl:top-[8.65rem]">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-navy">{filteredProducts.length} results</p>
                    <p className="text-xs text-text-muted">
                      Product-first listing view with technical metadata and direct inquiry actions
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="inline-flex items-center gap-2 border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-navy xl:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                    type="button"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  <label className="text-sm text-text-muted">
                    Sort
                    <select
                      className="ml-3 h-10 border border-border bg-surface-card px-3 py-2 text-sm text-text"
                      onChange={(event) =>
                        setFilters((current) => ({
                          ...current,
                          sort: event.target.value as typeof current.sort,
                        }))
                      }
                      value={filters.sort}
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              {appliedFilters.length > 0 ? (
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  {appliedFilters.map((filter) => (
                    <button
                      className="chip min-h-0 whitespace-nowrap px-3 py-1.5 text-sm"
                      key={`${filter.key}-${filter.label}`}
                      onClick={() => clearFilter(filter.key)}
                      type="button"
                    >
                      {filter.label} x
                    </button>
                  ))}
                  <button
                    className="text-sm font-semibold text-primary underline decoration-primary underline-offset-4"
                    onClick={clearAllFilters}
                    type="button"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : null}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  actionLabel="Clear Filters"
                  description="No products match the current search and filter combination. Reset the filters or return to the broader catalog view."
                  onAction={clearAllFilters}
                  secondaryActionLabel="Browse Equipment"
                  secondaryActionTo={routes.equipment}
                  title="No matching products"
                />
              </div>
            ) : (
              <div className={`mt-6 grid gap-4 ${gridClass}`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <MobileFilterDrawer label="Catalog filters" onClose={() => setMobileFiltersOpen(false)} open={mobileFiltersOpen}>
        <FilterSidebar
          clearAllFilters={clearAllFilters}
          filters={filters}
          onClose={() => setMobileFiltersOpen(false)}
          optionSets={optionSets}
          setFilters={setFilters}
        />
      </MobileFilterDrawer>
    </>
  );
}
