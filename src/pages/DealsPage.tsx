import { Filter, SlidersHorizontal } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { products } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { routes } from '../utils/routes';

export function DealsPage() {
  usePageMetadata({
    title: 'Available Stock and Deals | Rafin Machinery',
    description: 'Review fast-moving available stock, incoming units, and deal-tagged machinery or parts. All commercial handling remains inquiry-only and company-to-company.',
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

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-6 sm:p-8">
          <p className="kicker">Available now</p>
          <h1 className="mt-3 text-[2.45rem] text-brand-navy sm:text-[3.2rem]">
            Fast-moving stock, incoming units, and deal-tagged listings
          </h1>
          <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">
            Focus on products suited to shorter procurement cycles. These listings still move
            through direct inquiry, inspection review, and offline company-to-company agreement.
          </p>
          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
            <SearchBar
              buttonLabel="Search Available Stock"
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder="Search current stock by machine, brand, model, SKU, or technical keyword"
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              Use this view when your team needs stock visibility before requesting pricing or inspection.
            </div>
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
                    <p className="text-sm font-semibold text-brand-navy">{filteredProducts.length} matching items</p>
                    <p className="text-xs text-text-muted">Available, incoming, or deal-tagged inventory ready for direct inquiry</p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-brand-navy xl:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                  type="button"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
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
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 hero-band rounded-2xl border border-border p-7 text-white shadow-card">
              <p className="kicker text-brand-gold-soft">Need confirmation?</p>
              <h2 className="mt-2 text-[2rem] text-white">Current stock still follows the same offline inquiry process</h2>
              <p className="mt-3 max-w-3xl text-sm text-white/72">
                If a listing looks close but not exact, use the Inquiry List or request sourcing
                support directly from the Rafin sales team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div
          aria-label="Available stock filters"
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
