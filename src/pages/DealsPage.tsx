import { Filter } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { products } from '../data/catalog';
import { useCatalogFilters } from '../hooks/useCatalogFilters';

export function DealsPage() {
  const availableOrDealProducts = products.filter(
    (product) => product.deal || product.availability === 'available',
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
      <section className="section-shell py-16 sm:py-20">
        <div className="border border-white/10 bg-rafin-panel px-6 py-8 sm:px-8 sm:py-9">
          <p className="eyebrow">Deals & Available Now</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Useful stock for fast-moving commercial decisions</h1>
          <p className="mt-4 max-w-3xl text-base text-rafin-muted-light sm:text-lg">
            Focus on deal-tagged listings, visible-price items, and available stock suited for buyers who need faster procurement conversations.
          </p>
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
            <div className="flex items-center justify-between border border-white/10 bg-rafin-panel px-5 py-4">
              <p className="text-sm text-white/72">
                <span className="font-semibold text-white">{filteredProducts.length}</span> matching deal or active-stock items
              </p>
              <button
                className="inline-flex items-center gap-2 border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white xl:hidden"
                onClick={() => setMobileFiltersOpen(true)}
                type="button"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>
            </div>

            <div className="mt-6">
              {filteredProducts.length === 0 ? (
                <EmptyState
                  actionLabel="Clear Filters"
                  description="Try a broader price range, stock status, or brand to surface more deal inventory."
                  onAction={clearAllFilters}
                  title="No matching deal inventory"
                />
              ) : (
                <div className="grid gap-5 xl:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-12 border border-white/10 bg-rafin-panel p-7">
              <SectionHeader
                description="If a listing is useful but not yet ready for contract, use the inquiry list and Rafin will respond with the next available commercial step."
                eyebrow="Need more detail?"
                title="Request info before the stock moves"
              />
            </div>
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
