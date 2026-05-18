import { SlidersHorizontal, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  CatalogFilterOptionSets,
  CatalogFilterState,
  CatalogViewMode,
} from '../../hooks/useCatalogFilters';
import type { PriceBand } from '../../utils/filters';
import { Button } from './Button';

interface FilterSidebarProps {
  filters: CatalogFilterState;
  setFilters: Dispatch<SetStateAction<CatalogFilterState>>;
  clearAllFilters: () => void;
  optionSets: CatalogFilterOptionSets;
  onClose?: () => void;
}

function inputClasses() {
  return 'mt-2 h-10 w-full rounded-none border border-border bg-surface-card px-3 py-2 text-sm text-text placeholder:text-text-muted/70 shadow-none';
}

function filterChip(active: boolean) {
  return [
    'border px-3 py-2 text-left text-[0.78rem] font-medium transition',
    active
      ? 'border-primary bg-surface-subtle text-primary-dark'
      : 'border-border bg-surface-card text-text-muted hover:border-primary',
  ].join(' ');
}

function setModeValue(
  setFilters: Dispatch<SetStateAction<CatalogFilterState>>,
  key: 'availability' | 'condition' | 'viewMode',
  value: string,
) {
  setFilters((current) => ({
    ...current,
    [key]: value,
  }));
}

export function FilterSidebar({
  clearAllFilters,
  filters,
  onClose,
  optionSets,
  setFilters,
}: FilterSidebarProps) {
  const { t } = useTranslation();
  const budgetBands = t('catalog.budgetBands', { returnObjects: true }) as Array<{
    slug: PriceBand;
    label: string;
  }>;
  const sortOptions = t('catalog.sortOptions', { returnObjects: true }) as Array<{
    value: CatalogFilterState['sort'];
    label: string;
  }>;
  return (
    <div className="border border-border bg-surface-card shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
          <h2 className="text-base font-semibold text-navy">{t('common.labels.filterResults')}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-xs font-semibold uppercase tracking-[0.12em] text-primary"
            onClick={clearAllFilters}
            type="button"
          >
            {t('common.actions.clearAll')}
          </button>
          {onClose ? (
            <button
              aria-label={t('common.accessibility.closeFilters')}
              className="inline-flex h-10 w-10 items-center justify-center rounded-none border border-border text-text lg:hidden"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="space-y-5 px-4 py-4">
        <div>
          <p className="line-label">{t('common.labels.view')}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(['grid', 'list'] as CatalogViewMode[]).map((mode) => (
              <button
                className={filterChip(filters.viewMode === mode)}
                key={mode}
                onClick={() => setModeValue(setFilters, 'viewMode', mode)}
                type="button"
              >
                {mode === 'grid' ? t('common.status.gridView') : t('common.status.listView')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="line-label">{t('common.labels.availability')}</p>
          <div className="mt-2 grid gap-2">
            {[
              ['all', t('common.status.allStatus')],
              ['available', t('common.status.available')],
              ['incoming', t('common.status.incoming')],
              ['reserved', t('common.status.reserved')],
              ['sold', t('common.status.sold')],
            ].map(([value, label]) => (
              <button
                className={filterChip(filters.availability === value)}
                key={value}
                onClick={() => setModeValue(setFilters, 'availability', value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="line-label">{t('common.labels.condition')}</p>
          <div className="mt-2 grid gap-2">
            {[
              ['all', t('common.status.allConditions')],
              ['new', t('common.status.new')],
              ['used', t('common.status.used')],
              ['refurbished', t('common.status.refurbished')],
            ].map(([value, label]) => (
              <button
                className={filterChip(filters.condition === value)}
                key={value}
                onClick={() => setModeValue(setFilters, 'condition', value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <label className="block text-sm text-text-muted">
          {t('common.labels.category')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                category: event.target.value,
                subcategory: 'all',
                productType: 'all',
              }))
            }
            value={filters.category}
          >
            <option value="all">{t('common.status.allCategories')}</option>
            {optionSets.categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.subcategory')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                subcategory: event.target.value,
                productType: 'all',
              }))
            }
            value={filters.subcategory}
          >
            <option value="all">{t('common.status.allSubcategories')}</option>
            {optionSets.subcategories.map((subcategory) => (
              <option key={subcategory.slug} value={subcategory.slug}>
                {subcategory.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.productType')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, productType: event.target.value }))
            }
            value={filters.productType}
          >
            <option value="all">{t('common.status.allProductTypes')}</option>
            {optionSets.productTypes.map((productType) => (
              <option key={productType.slug} value={productType.slug}>
                {productType.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.brand')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, brand: event.target.value }))
            }
            value={filters.brand}
          >
            <option value="all">{t('common.status.allBrands')}</option>
            {optionSets.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.priceRange')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                priceBand: event.target.value as PriceBand,
              }))
            }
            value={filters.priceBand}
          >
            <option value="all">{t('common.status.allPriceBands')}</option>
            {budgetBands.map((band) => (
              <option key={band.slug} value={band.slug}>
                {band.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-text-muted">
            {t('common.labels.yearFrom')}
            <input
              className={inputClasses()}
              inputMode="numeric"
              onChange={(event) =>
                setFilters((current) => ({ ...current, yearMin: event.target.value }))
              }
              placeholder="2018"
              value={filters.yearMin}
            />
          </label>
          <label className="block text-sm text-text-muted">
            {t('common.labels.yearTo')}
            <input
              className={inputClasses()}
              inputMode="numeric"
              onChange={(event) =>
                setFilters((current) => ({ ...current, yearMax: event.target.value }))
              }
              placeholder="2025"
              value={filters.yearMax}
            />
          </label>
        </div>

        <label className="block text-sm text-text-muted">
          {t('common.labels.operatingHoursUnder')}
          <input
            className={inputClasses()}
            inputMode="numeric"
            onChange={(event) =>
              setFilters((current) => ({ ...current, hoursMax: event.target.value }))
            }
            placeholder="5000"
            value={filters.hoursMax}
          />
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.mileageUnder')}
          <input
            className={inputClasses()}
            inputMode="numeric"
            onChange={(event) =>
              setFilters((current) => ({ ...current, mileageMax: event.target.value }))
            }
            placeholder="200000"
            value={filters.mileageMax}
          />
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.location')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, location: event.target.value }))
            }
            value={filters.location}
          >
            <option value="all">{t('common.status.allLocations')}</option>
            {optionSets.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.tags')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, tag: event.target.value }))
            }
            value={filters.tag}
          >
            <option value="all">{t('common.status.allTags')}</option>
            {optionSets.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          {t('common.labels.sort')}
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
              sort: event.target.value as CatalogFilterState['sort'],
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

      {onClose ? (
        <div className="sticky bottom-0 border-t border-border bg-surface-card px-4 py-4 lg:hidden">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={clearAllFilters} variant="secondary">
              {t('common.actions.clearAll')}
            </Button>
            <Button className="w-full" onClick={onClose} variant="primary">
              {t('common.actions.applyFilters')}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
