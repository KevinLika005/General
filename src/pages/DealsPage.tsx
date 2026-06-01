import { useTranslation } from 'react-i18next';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { MobileFilterDrawer } from '../components/common/MobileFilterDrawer';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { getProducts } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { routes } from '../utils/routes';

export function DealsPage() {
  const { t } = useTranslation();
  const sortOptions = t('catalog.sortOptions', { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;
  const products = getProducts();
  usePageMetadata({
    title: t('metadata.deals.title'),
    description: t('metadata.deals.description'),
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
        <div className="surface-panel p-4 sm:p-5 xl:p-6">
          <p className="kicker">{t('pages.deals.eyebrow')}</p>
          <h1 className="mt-2 max-w-[20ch] text-[clamp(1.8rem,1.2rem+1.5vw,3rem)] leading-[1.02] text-navy">
            {t('pages.deals.title')}
          </h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">
            {t('pages.deals.description')}
          </p>
          <div className="mt-4 grid gap-3 3xl:grid-cols-[minmax(0,1fr)_18rem] 3xl:items-center">
            <SearchBar
              buttonLabel={t('common.actions.searchAvailableStock')}
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={t('pages.deals.searchPlaceholder')}
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              {t('pages.deals.note')}
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-shell pb-24">
        <div className="grid gap-6 xl:grid-cols-[clamp(17rem,18vw,19rem)_minmax(0,1fr)]">
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
                    <p className="text-sm font-semibold text-navy">{t('common.status.matchingItems', { count: filteredProducts.length })}</p>
                    <p className="text-xs text-text-muted">{t('pages.deals.toolbarDescription')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="inline-flex items-center gap-2 border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-navy xl:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                    type="button"
                  >
                    <Filter className="h-4 w-4" />
                    {t('common.labels.filters')}
                  </button>
                  <label className="text-sm text-text-muted">
                    {t('common.labels.sort')}
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
                    {t('common.actions.clearFilters')}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-6">
              {filteredProducts.length === 0 ? (
                <EmptyState
                  actionLabel={t('common.actions.clearFilters')}
                  description={t('pages.deals.noResults.description')}
                  onAction={clearAllFilters}
                  secondaryActionLabel={t('common.actions.browseEquipment')}
                  secondaryActionTo={routes.equipment}
                  title={t('pages.deals.noResults.title')}
                />
              ) : (
                <div className={filters.viewMode === 'list' ? 'grid gap-4' : 'catalog-product-grid'}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} layout={filters.viewMode} product={product} />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-10 hero-band border border-surface-dark p-6 text-white shadow-card">
              <p className="kicker text-white/80">{t('pages.deals.cta.eyebrow')}</p>
              <h2 className="mt-2 max-w-[22ch] text-[clamp(1.35rem,1rem+0.8vw,1.8rem)] text-white">{t('pages.deals.cta.title')}</h2>
              <p className="text-measure mt-3 text-sm text-white/72">
                {t('pages.deals.cta.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <MobileFilterDrawer label={t('pages.deals.mobileFiltersLabel')} onClose={() => setMobileFiltersOpen(false)} open={mobileFiltersOpen}>
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
