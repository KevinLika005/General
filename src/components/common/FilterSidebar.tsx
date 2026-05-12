import { SlidersHorizontal, X } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { categories } from '../../data/catalog';
import type { CatalogFilterState } from '../../hooks/useCatalogFilters';
import type { PriceBand } from '../../utils/filters';
import { budgetBands, sortOptions } from '../../data/catalog';
import { Button } from './Button';

interface FilterSidebarProps {
  filters: CatalogFilterState;
  setFilters: Dispatch<SetStateAction<CatalogFilterState>>;
  clearAllFilters: () => void;
  optionSets: {
    categories: string[];
    subcategories: string[];
    brands: string[];
    locations: string[];
    tags: string[];
  };
  onClose?: () => void;
}

function inputClasses() {
  return 'mt-2 h-11 w-full rounded-[6px] border border-border bg-surface-card px-3 py-2 text-sm text-text placeholder:text-text-muted/70 shadow-card';
}

export function FilterSidebar({
  clearAllFilters,
  filters,
  onClose,
  optionSets,
  setFilters,
}: FilterSidebarProps) {
  return (
    <div className="rounded-xl border border-border bg-surface-card shadow-card">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 px-5 pt-5">
          <SlidersHorizontal className="h-5 w-5 text-brand-gold" />
          <h2 className="text-lg font-semibold text-brand-navy">Filter Results</h2>
        </div>
        <div className="flex items-center gap-2 px-5 pt-5">
          <button
            className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-gold"
            onClick={clearAllFilters}
            type="button"
          >
            Clear All
          </button>
          {onClose ? (
            <button
              aria-label="Close filters"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-border text-text lg:hidden"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-5 space-y-5 px-5 pb-5">
        <label className="block text-sm text-text-muted">
          Category
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                category: event.target.value,
                subcategory: 'all',
              }))
            }
            value={filters.category}
          >
            <option value="all">All categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.title}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          Subcategory
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, subcategory: event.target.value }))
            }
            value={filters.subcategory}
          >
            <option value="all">All subcategories</option>
            {optionSets.subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          Brand
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, brand: event.target.value }))
            }
            value={filters.brand}
          >
            <option value="all">All brands</option>
            {optionSets.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          Condition
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                condition: event.target.value as CatalogFilterState['condition'],
              }))
            }
            value={filters.condition}
          >
            <option value="all">All conditions</option>
            <option value="new">New</option>
            <option value="used">Used</option>
            <option value="refurbished">Refurbished</option>
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          Availability
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                availability: event.target.value as CatalogFilterState['availability'],
              }))
            }
            value={filters.availability}
          >
            <option value="all">All status</option>
            <option value="available">Available</option>
            <option value="incoming">Incoming</option>
            <option value="reserved">Reserved</option>
            <option value="sold">Sold</option>
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          Price range
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
            <option value="all">All price bands</option>
            {budgetBands.map((band) => (
              <option key={band.slug} value={band.slug}>
                {band.label}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-text-muted">
            Year from
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
            Year to
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
          Operating hours under
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
          Location
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, location: event.target.value }))
            }
            value={filters.location}
          >
            <option value="all">All locations</option>
            {optionSets.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          Tags
          <select
            className={inputClasses()}
            onChange={(event) =>
              setFilters((current) => ({ ...current, tag: event.target.value }))
            }
            value={filters.tag}
          >
            <option value="all">All tags</option>
            {optionSets.tags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm text-text-muted">
          Sort
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
        <div className="sticky bottom-0 border-t border-border bg-surface-card px-5 py-4 lg:hidden">
          <div className="grid gap-3 sm:grid-cols-2">
            <Button onClick={clearAllFilters} variant="secondary">
              Clear All
            </Button>
            <Button className="w-full" onClick={onClose} variant="primary">
              Apply Filters
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
