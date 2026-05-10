import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { products } from '../data/catalog';
import { useCatalogFilters } from '../hooks/useCatalogFilters';

export function CatalogPage() {
  const [searchParams] = useSearchParams();
  const brandParam = searchParams.get('brand') ?? '';
  const queryParam = searchParams.get('q') ?? '';
  const priceBandParam = searchParams.get('priceBand') ?? '';
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

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      brand: brandParam || 'all',
      search: queryParam,
      priceBand:
        priceBandParam === 'under-5000' ||
        priceBandParam === 'under-25000' ||
        priceBandParam === 'under-100000' ||
        priceBandParam === 'price-on-request'
          ? priceBandParam
          : current.priceBand,
    }));
  }, [brandParam, priceBandParam, queryParam, setFilters]);

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <div className="border border-white/10 bg-rafin-panel px-6 py-8 sm:px-8 sm:py-9">
          <p className="eyebrow">Equipment Catalog</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Search the full machinery inventory</h1>
          <p className="mt-4 max-w-3xl text-base text-rafin-muted-light sm:text-lg">
            Explore construction machinery, transport equipment, attachments, parts, and site support inventory with filters designed for B2B buyers.
          </p>
          <div className="mt-6 max-w-3xl">
            <SearchBar
              onChange={(value) =>
                setFilters((current) => ({ ...current, search: value }))
              }
              placeholder="Search by machine, brand, model, SKU, category or tag"
              value={filters.search}
            />
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
          <div className="hidden xl:block">
            <FilterSidebar
              clearAllFilters={clearAllFilters}
              filters={filters}
              optionSets={optionSets}
              setFilters={setFilters}
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-rafin-panel px-5 py-4">
              <div className="flex items-center gap-3">
                <SlidersHorizontal className="h-5 w-5 text-rafin-gold-soft" />
                <p className="text-sm text-white/72">
                  <span className="font-semibold text-white">{filteredProducts.length}</span> products found
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white xl:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                  type="button"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
                <label className="text-sm text-white/72">
                  Sort
                  <select
                    className="ml-3 h-10 border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
                    onChange={(event) =>
                      setFilters((current) => ({
                        ...current,
                        sort: event.target.value as typeof current.sort,
                      }))
                    }
                    value={filters.sort}
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-asc">Price low to high</option>
                    <option value="price-desc">Price high to low</option>
                    <option value="year-desc">Year newest</option>
                    <option value="hours-asc">Hours low to high</option>
                  </select>
                </label>
              </div>
            </div>

            {appliedFilters.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-3">
                {appliedFilters.map((filter) => (
                  <button
                    className="border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/72 transition hover:border-rafin-gold hover:text-rafin-gold-soft"
                    key={`${filter.key}-${filter.label}`}
                    onClick={() => clearFilter(filter.key)}
                    type="button"
                  >
                    {filter.label} x
                  </button>
                ))}
              </div>
            ) : null}

            {filteredProducts.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  actionLabel="Clear Filters"
                  description="No equipment matches the current search and filter combination. Reset filters and try a broader machinery or brand query."
                  onAction={clearAllFilters}
                  title="No matching equipment"
                />
              </div>
            ) : (
              <div className="mt-8 grid gap-5 xl:grid-cols-2">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 bg-black/60 px-4 py-6 xl:hidden">
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
