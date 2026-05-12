import { Filter, SlidersHorizontal } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { MobileFilterDrawer } from '../components/common/MobileFilterDrawer';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { products, sortOptions } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { routes } from '../utils/routes';

export function DealsPage() {
  usePageMetadata({
    title: 'Available Stock and Deals | Rafin Machinery',
    description: 'Review fast-moving available stock, incoming units, and deal-tagged machinery or parts through a compact inquiry-focused listing view.',
  });

  const availableOrDealProducts = products.filter(
    (product) =>
      product.availability !== 'sold' &&
      (product.deal || product.availability === 'available' || product.availability === 'incoming'),
  );
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
  } = useCatalogFilters(availableOrDealProducts);

  const gridClass =
    filters.viewMode === 'list'
      ? 'grid-cols-1'
      : 'md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4';

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-4 sm:p-5 xl:p-6">
          <p className="kicker">Available now</p>
          <h1 className="mt-2 text-[1.8rem] leading-[1.08] text-navy sm:text-[2.2rem] xl:text-[2.8rem]">
            Fast-moving stock, incoming units, and deal-tagged listings
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-text-muted sm:text-base">
            Focus on products suited to shorter procurement cycles. These listings still move through direct inquiry, inspection review, and offline company-to-company agreement.
          </p>
          <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_18rem] xl:items-center">
            <SearchBar
              buttonLabel="Search Available Stock"
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder="Search current stock by product, machine, brand, model, SKU, or technical keyword"
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              Use this view when your team needs stock visibility before requesting pricing or inspection.
            </div>
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
                    <p className="text-sm font-semibold text-navy">{filteredProducts.length} matching items</p>
                    <p className="text-xs text-text-muted">Available, incoming, or deal-tagged inventory ready for direct inquiry</p>
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
                    Clear filters
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              {filteredProducts.length === 0 ? (
                <EmptyState
                  actionLabel="Clear Filters"
                  description="Try a broader stock status, price band, or brand to surface more current inventory."
                  onAction={clearAllFilters}
                  secondaryActionLabel="Browse Equipment"
                  secondaryActionTo={routes.equipment}
                  title="No matching available stock"
                />
              ) : (
                <div className={`grid gap-4 ${gridClass}`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 hero-band border border-surface-dark p-6 text-white shadow-card">
              <p className="kicker text-white/80">Need confirmation?</p>
              <h2 className="mt-2 text-[1.6rem] text-white">Current stock still follows the same offline inquiry process</h2>
              <p className="mt-3 max-w-3xl text-sm text-white/72">
                If a listing looks close but not exact, use the Inquiry List or request sourcing support directly from the sales team.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MobileFilterDrawer label="Available stock filters" onClose={() => setMobileFiltersOpen(false)} open={mobileFiltersOpen}>
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
