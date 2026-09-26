import { ChevronDown } from 'lucide-react';
import { useId, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import type { CatalogFilterOptionSets, CatalogFilterState } from '../../hooks/useCatalogFilters';
import type { PriceBand } from '../../utils/filters';
import { Button } from './Button';

interface FilterSidebarProps {
  filters: CatalogFilterState;
  setFilters: Dispatch<SetStateAction<CatalogFilterState>>;
  clearAllFilters: () => void;
  optionSets: CatalogFilterOptionSets;
  onClose?: () => void;
}

const inputClass =
  'mt-1.5 h-10 w-full rounded border border-border bg-surface-card px-3 text-sm text-text placeholder:text-text-muted/70';

function FilterGroup({ title, defaultOpen, children }: { title: string; defaultOpen: boolean; children: ReactNode }) {
  return (
    <details className="group border-b border-border px-4 py-3 last:border-b-0" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown aria-hidden="true" className="h-4 w-4 text-text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="mt-3 grid gap-2">{children}</div>
    </details>
  );
}

function RadioOption({
  checked,
  label,
  name,
  onSelect,
}: {
  checked: boolean;
  label: string;
  name: string;
  onSelect: () => void;
}) {
  return (
    <label className="flex min-h-8 cursor-pointer items-center gap-2.5 text-sm text-text">
      <input checked={checked} className="h-4 w-4 accent-primary" name={name} onChange={onSelect} type="radio" />
      {label}
    </label>
  );
}

export function FilterSidebar({ clearAllFilters, filters, onClose, optionSets, setFilters }: FilterSidebarProps) {
  const { t } = useTranslation();
  const idPrefix = useId();
  const budgetBands = t('catalog.budgetBands', { returnObjects: true }) as Array<{ slug: PriceBand; label: string }>;
  const update = (patch: Partial<CatalogFilterState>) => setFilters((current) => ({ ...current, ...patch }));

  const availabilityOptions = [
    ['all', t('common.status.allStatus')],
    ['available', t('common.status.available')],
    ['incoming', t('common.status.incoming')],
    ['reserved', t('common.status.reserved')],
    ['sold', t('common.status.sold')],
  ] as const;
  const conditionOptions = [
    ['all', t('common.status.allConditions')],
    ['new', t('common.status.new')],
    ['used', t('common.status.used')],
    ['refurbished', t('common.status.refurbished')],
  ] as const;

  return (
    <div className="rounded-lg border border-border bg-surface-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
        <h2 className="font-sans text-[0.9375rem] font-semibold text-navy">{t('common.labels.filterResults')}</h2>
        <button className="text-[0.8125rem] font-semibold text-navy underline underline-offset-4" onClick={clearAllFilters} type="button">
          {t('common.actions.clearAll')}
        </button>
      </div>

      <FilterGroup defaultOpen title={t('common.labels.availability')}>
        {availabilityOptions.map(([value, label]) => (
          <RadioOption
            checked={filters.availability === value}
            key={value}
            label={label}
            name={`${idPrefix}-availability`}
            onSelect={() => update({ availability: value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup defaultOpen title={t('common.labels.condition')}>
        {conditionOptions.map(([value, label]) => (
          <RadioOption
            checked={filters.condition === value}
            key={value}
            label={label}
            name={`${idPrefix}-condition`}
            onSelect={() => update({ condition: value })}
          />
        ))}
      </FilterGroup>

      <FilterGroup defaultOpen title={t('common.labels.category')}>
        <select
          aria-label={t('common.labels.category')}
          className={inputClass}
          onChange={(event) => update({ category: event.target.value, subcategory: 'all', productType: 'all' })}
          value={filters.category}
        >
          <option value="all">{t('common.status.allCategories')}</option>
          {optionSets.categories.map((category) => (
            <option key={category.slug} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
        <select
          aria-label={t('common.labels.subcategory')}
          className={inputClass}
          onChange={(event) => update({ subcategory: event.target.value, productType: 'all' })}
          value={filters.subcategory}
        >
          <option value="all">{t('common.status.allSubcategories')}</option>
          {optionSets.subcategories.map((subcategory) => (
            <option key={subcategory.slug} value={subcategory.slug}>
              {subcategory.title}
            </option>
          ))}
        </select>
        <select
          aria-label={t('common.labels.productType')}
          className={inputClass}
          onChange={(event) => update({ productType: event.target.value })}
          value={filters.productType}
        >
          <option value="all">{t('common.status.allProductTypes')}</option>
          {optionSets.productTypes.map((productType) => (
            <option key={productType.slug} value={productType.slug}>
              {productType.title}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup defaultOpen title={t('common.labels.brand')}>
        <select
          aria-label={t('common.labels.brand')}
          className={inputClass}
          onChange={(event) => update({ brand: event.target.value })}
          value={filters.brand}
        >
          <option value="all">{t('common.status.allBrands')}</option>
          {optionSets.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup defaultOpen={filters.priceBand !== 'all'} title={t('common.labels.priceRange')}>
        <select
          aria-label={t('common.labels.priceRange')}
          className={inputClass}
          onChange={(event) => update({ priceBand: event.target.value as PriceBand })}
          value={filters.priceBand}
        >
          <option value="all">{t('common.status.allPriceBands')}</option>
          {budgetBands.map((band) => (
            <option key={band.slug} value={band.slug}>
              {band.label}
            </option>
          ))}
        </select>
      </FilterGroup>

      <FilterGroup defaultOpen={Boolean(filters.yearMin || filters.yearMax)} title={t('common.labels.year')}>
        <div className="grid grid-cols-2 gap-2">
          <label className="text-[0.8125rem] text-text-muted">
            {t('common.labels.yearFrom')}
            <input className={inputClass} inputMode="numeric" onChange={(event) => update({ yearMin: event.target.value })} placeholder="2018" value={filters.yearMin} />
          </label>
          <label className="text-[0.8125rem] text-text-muted">
            {t('common.labels.yearTo')}
            <input className={inputClass} inputMode="numeric" onChange={(event) => update({ yearMax: event.target.value })} placeholder="2025" value={filters.yearMax} />
          </label>
        </div>
      </FilterGroup>

      <FilterGroup defaultOpen={Boolean(filters.hoursMax || filters.mileageMax)} title={t('common.labels.operatingHoursUnder')}>
        <input
          aria-label={t('common.labels.operatingHoursUnder')}
          className={inputClass}
          inputMode="numeric"
          onChange={(event) => update({ hoursMax: event.target.value })}
          placeholder="5000"
          value={filters.hoursMax}
        />
        <label className="text-[0.8125rem] text-text-muted">
          {t('common.labels.mileageUnder')}
          <input className={inputClass} inputMode="numeric" onChange={(event) => update({ mileageMax: event.target.value })} placeholder="200000" value={filters.mileageMax} />
        </label>
      </FilterGroup>

      <FilterGroup defaultOpen={filters.location !== 'all' || filters.tag !== 'all'} title={t('common.labels.location')}>
        <select
          aria-label={t('common.labels.location')}
          className={inputClass}
          onChange={(event) => update({ location: event.target.value })}
          value={filters.location}
        >
          <option value="all">{t('common.status.allLocations')}</option>
          {optionSets.locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
        <select
          aria-label={t('common.labels.tags')}
          className={inputClass}
          onChange={(event) => update({ tag: event.target.value })}
          value={filters.tag}
        >
          <option value="all">{t('common.status.allTags')}</option>
          {optionSets.tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </FilterGroup>

      {onClose ? (
        <div className="sticky bottom-0 grid gap-3 border-t border-border bg-surface-card px-4 py-4 md:grid-cols-2 xl:hidden">
          <Button onClick={clearAllFilters} variant="secondary">
            {t('common.actions.clearAll')}
          </Button>
          <Button className="w-full" onClick={onClose}>
            {t('common.actions.applyFilters')}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
