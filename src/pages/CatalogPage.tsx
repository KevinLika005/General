import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
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
    description: 'Search the Rafin Machinery catalog by brand, category, SKU, model, availability, and price mode. All listings are handled through B2B inquiry, inspection, and contract discussion.',
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

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-6 sm:p-8">
          <p className="kicker">Products</p>
          <h1 className="mt-3 text-[2.45rem] text-brand-navy sm:text-[3.2rem]">
            Browse machinery, parts, attachments, trucks, and site equipment
          </h1>
          <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">
            Search inventory, narrow by brand or stock status, and add products to your Inquiry
            List before requesting information, pricing, inspection, or contract follow-up.
          </p>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
            <SearchBar
              buttonLabel="Search Catalog"
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder="Search by machine, brand, model, SKU, category, location, or technical keyword"
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              Inquiry-only workflow. Final pricing, inspection, delivery, and contract handling stay offline.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                className="rounded-[4px] border border-border bg-surface-subtle px-3 py-2 text-sm text-text-muted transition hover:border-brand-gold hover:text-brand-navy"
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
        <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
          <div className="hidden xl:block">
            <FilterSidebar
              clearAllFilters={clearAllFilters}
              filters={filters}
              optionSets={optionSets}
              setFilters={setFilters}
            />
          </div>

          <div>
            <div className="toolbar-panel px-5 py-4 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5 text-brand-gold" />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{filteredProducts.length} results</p>
                    <p className="text-xs text-text-muted">
                      Ready for direct inquiry, quote preparation, inspection review, or contract discussion
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-brand-navy xl:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                    type="button"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                  </button>
                  <label className="text-sm text-text-muted">
                    Sort
                    <select
                      className="ml-3 h-10 rounded-[6px] border border-border bg-surface-card px-3 py-2 text-sm text-text"
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
                      className="rounded-[4px] border border-border bg-surface-subtle px-4 py-2 text-sm text-text-muted transition hover:border-brand-gold hover:text-brand-navy"
                      key={`${filter.key}-${filter.label}`}
                      onClick={() => clearFilter(filter.key)}
                      type="button"
                    >
                      {filter.label} x
                    </button>
                  ))}
                  <button
                    className="text-sm font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4"
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
              <div className="mt-8 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div
          aria-label="Catalog filters"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-brand-navy/45 px-4 py-6 xl:hidden"
          role="dialog"
        >
          <div className="mx-auto max-w-lg">
            <FilterSidebar
              clearAllFilters={clearAllFilters}
              filters={filters}
              onClose={() => setMobileFiltersOpen(false)}
              optionSets={optionSets}
              setFilters={setFilters}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
