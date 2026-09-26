import { Filter, LayoutGrid, List, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { CatalogFilterState, useCatalogFilters } from '../../hooks/useCatalogFilters';
import { FilterSidebar } from './FilterSidebar';
import { MobileFilterDrawer } from './MobileFilterDrawer';
import { ProductCard } from './ProductCard';

interface CatalogResultsProps {
  catalog: ReturnType<typeof useCatalogFilters>;
  resultLabel: string;
  clearLabel: string;
  mobileFiltersLabel: string;
  emptyState: ReactNode;
  footer?: ReactNode;
}

export function CatalogResults({ catalog, clearLabel, emptyState, footer, mobileFiltersLabel, resultLabel }: CatalogResultsProps) {
  const { t } = useTranslation();
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
  } = catalog;
  const sortOptions = t('catalog.sortOptions', { returnObjects: true }) as Array<{
    value: CatalogFilterState['sort'];
    label: string;
  }>;
  const viewButton = (mode: CatalogFilterState['viewMode']) =>
    [
      'inline-flex h-9 w-9 items-center justify-center transition-colors',
      filters.viewMode === mode ? 'bg-surface-subtle text-navy' : 'text-text-muted hover:text-navy',
    ].join(' ');

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-[16.5rem_minmax(0,1fr)]">
        <aside className="hidden xl:sticky xl:top-[calc(var(--header-offset)+1rem)] xl:block xl:max-h-[calc(100vh-var(--header-offset)-2rem)] xl:self-start xl:overflow-y-auto">
          <FilterSidebar clearAllFilters={clearAllFilters} filters={filters} optionSets={optionSets} setFilters={setFilters} />
        </aside>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
            <p aria-live="polite" className="text-sm font-semibold text-navy">
              {resultLabel}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="inline-flex h-9 items-center gap-2 rounded border border-border bg-surface-card px-3 text-sm font-semibold text-navy xl:hidden"
                onClick={() => setMobileFiltersOpen(true)}
                type="button"
              >
                <Filter aria-hidden="true" className="h-4 w-4" />
                {t('common.labels.filters')}
                {appliedFilters.length > 0 ? ` (${appliedFilters.length})` : ''}
              </button>
              <label className="flex items-center gap-2 text-sm text-text-muted">
                <span className="hidden md:inline">{t('common.labels.sort')}</span>
                <select
                  aria-label={t('common.labels.sort')}
                  className="h-9 max-w-[11rem] rounded border border-border bg-surface-card px-2 text-sm text-text md:max-w-none"
                  onChange={(event) =>
                    setFilters((current) => ({ ...current, sort: event.target.value as CatalogFilterState['sort'] }))
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
              <div aria-label={t('common.labels.view')} className="hidden overflow-hidden rounded border border-border md:flex" role="group">
                <button
                  aria-label={t('common.status.gridView')}
                  aria-pressed={filters.viewMode === 'grid'}
                  className={viewButton('grid')}
                  onClick={() => setFilters((current) => ({ ...current, viewMode: 'grid' }))}
                  type="button"
                >
                  <LayoutGrid aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  aria-label={t('common.status.listView')}
                  aria-pressed={filters.viewMode === 'list'}
                  className={viewButton('list')}
                  onClick={() => setFilters((current) => ({ ...current, viewMode: 'list' }))}
                  type="button"
                >
                  <List aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {appliedFilters.length > 0 ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {appliedFilters.map((filter) => (
                <button
                  className="chip min-h-8 gap-1.5 py-1"
                  key={`${filter.key}-${filter.label}`}
                  onClick={() => clearFilter(filter.key)}
                  type="button"
                >
                  {filter.label}
                  <X aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              ))}
              <button className="text-[0.8125rem] font-semibold text-navy underline underline-offset-4" onClick={clearAllFilters} type="button">
                {clearLabel}
              </button>
            </div>
          ) : null}

          {filteredProducts.length === 0 ? (
            <div className="mt-6">{emptyState}</div>
          ) : (
            <div className={filters.viewMode === 'list' ? 'mt-4 grid gap-3' : 'catalog-product-grid mt-4'}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} layout={filters.viewMode} product={product} />
              ))}
            </div>
          )}

          {footer}
        </div>
      </div>

      <MobileFilterDrawer label={mobileFiltersLabel} onClose={() => setMobileFiltersOpen(false)} open={mobileFiltersOpen}>
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
