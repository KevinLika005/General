import { Filter } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { ProductCard } from '../components/common/ProductCard';
import { products } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';

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
    clearAllFilters,
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
          <p className="eyebrow">Available now</p>
          <h1 className="mt-3 text-[2.8rem] text-brand-navy sm:text-[4rem]">Fast-moving stock, deal-tagged items, and incoming units</h1>
          <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">
            Focus on listings suitable for shorter procurement cycles. These products still follow the same inquiry-commerce model and move into direct quote or contract handling.
          </p>
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
            <div className="rounded-3xl border border-border bg-surface-card px-5 py-4 shadow-card">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-text-muted">
                  <span className="font-semibold text-brand-navy">{filteredProducts.length}</span> matching available or deal-tagged items
                </p>
                <button
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-brand-navy xl:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                  type="button"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>
              </div>
            </div>

            <div className="mt-6">
              {filteredProducts.length === 0 ? (
                <EmptyState
                  actionLabel="Clear Filters"
                  description="Try a broader price range, stock status, or brand to surface more available inventory."
                  onAction={clearAllFilters}
                  title="No matching available stock"
                />
              ) : (
                <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 rounded-3xl border border-border bg-brand-navy p-7 text-white shadow-card">
              <p className="eyebrow">Need a variant?</p>
              <h2 className="mt-2 text-[2rem] text-white">Available now still leads into offline quote and contract discussion</h2>
              <p className="mt-3 max-w-3xl text-sm text-white/72">
                If a listing looks close but not exact, use the Inquiry List or request sourcing support directly from the Rafin sales team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-50 bg-brand-navy/45 px-4 py-6 xl:hidden">
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
