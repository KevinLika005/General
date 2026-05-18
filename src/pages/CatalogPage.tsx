import { useTranslation } from 'react-i18next';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { MobileFilterDrawer } from '../components/common/MobileFilterDrawer';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { getCategories, getProducts } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { resolveTaxonomySelection } from '../utils/catalog';
import { routes } from '../utils/routes';

export function CatalogPage() {
  const { t } = useTranslation();
  const sortOptions = t('catalog.sortOptions', { returnObjects: true }) as Array<{
    value: string;
    label: string;
  }>;
  const categories = getCategories();
  const products = getProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const brandParam = searchParams.get('brand') ?? '';
  const categoryParam = searchParams.get('category') ?? '';
  const subcategoryParam = searchParams.get('subcategory') ?? '';
  const productTypeParam = searchParams.get('type') ?? '';
  const conditionParam = searchParams.get('condition') ?? '';
  const availabilityParam = searchParams.get('availability') ?? '';
  const queryParam = searchParams.get('q') ?? '';
  const priceBandParam = searchParams.get('priceBand') ?? '';
  const yearMinParam = searchParams.get('yearMin') ?? '';
  const yearMaxParam = searchParams.get('yearMax') ?? '';
  const hoursMaxParam = searchParams.get('hoursMax') ?? '';
  const mileageMaxParam = searchParams.get('mileageMax') ?? '';
  const locationParam = searchParams.get('location') ?? '';
  const tagParam = searchParams.get('tag') ?? '';
  const sortParam = searchParams.get('sort') ?? '';
  const viewParam = searchParams.get('view') ?? '';

  const taxonomy = resolveTaxonomySelection({
    categorySlug: categoryParam || undefined,
    subcategorySlug: subcategoryParam || undefined,
    productTypeSlug: productTypeParam || undefined,
  });

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

  usePageMetadata({
    title: t('metadata.catalog.title'),
    description: t('metadata.catalog.description'),
  });

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      brand: brandParam || 'all',
      category: taxonomy.categorySlug ?? 'all',
      subcategory: taxonomy.subcategorySlug ?? 'all',
      productType: taxonomy.productTypeSlug ?? 'all',
      condition:
        conditionParam === 'new' || conditionParam === 'used' || conditionParam === 'refurbished'
          ? conditionParam
          : 'all',
      availability:
        availabilityParam === 'available' ||
        availabilityParam === 'incoming' ||
        availabilityParam === 'reserved' ||
        availabilityParam === 'sold'
          ? availabilityParam
          : 'all',
      search: queryParam,
      priceBand:
        priceBandParam === 'under-5000' ||
        priceBandParam === 'under-25000' ||
        priceBandParam === 'under-100000' ||
        priceBandParam === 'price-on-request'
          ? priceBandParam
          : 'all',
      yearMin: yearMinParam,
      yearMax: yearMaxParam,
      hoursMax: hoursMaxParam,
      mileageMax: mileageMaxParam,
      location: locationParam || 'all',
      tag: tagParam || 'all',
      sort:
        sortParam === 'newest' ||
        sortParam === 'price-asc' ||
        sortParam === 'price-desc' ||
        sortParam === 'year-desc' ||
        sortParam === 'hours-asc' ||
        sortParam === 'mileage-asc'
          ? sortParam
          : 'featured',
      viewMode: viewParam === 'list' ? 'list' : 'grid',
    }));
  }, [
    availabilityParam,
    brandParam,
    conditionParam,
    hoursMaxParam,
    locationParam,
    mileageMaxParam,
    priceBandParam,
    queryParam,
    setFilters,
    sortParam,
    tagParam,
    taxonomy.categorySlug,
    taxonomy.productTypeSlug,
    taxonomy.subcategorySlug,
    viewParam,
    yearMaxParam,
    yearMinParam,
  ]);

  useEffect(() => {
    const nextParams = new URLSearchParams();

    if (filters.search) nextParams.set('q', filters.search);
    if (filters.brand !== 'all') nextParams.set('brand', filters.brand);
    if (filters.category !== 'all') nextParams.set('category', filters.category);
    if (filters.subcategory !== 'all') nextParams.set('subcategory', filters.subcategory);
    if (filters.productType !== 'all') nextParams.set('type', filters.productType);
    if (filters.condition !== 'all') nextParams.set('condition', filters.condition);
    if (filters.availability !== 'all') nextParams.set('availability', filters.availability);
    if (filters.priceBand !== 'all') nextParams.set('priceBand', filters.priceBand);
    if (filters.yearMin) nextParams.set('yearMin', filters.yearMin);
    if (filters.yearMax) nextParams.set('yearMax', filters.yearMax);
    if (filters.hoursMax) nextParams.set('hoursMax', filters.hoursMax);
    if (filters.mileageMax) nextParams.set('mileageMax', filters.mileageMax);
    if (filters.location !== 'all') nextParams.set('location', filters.location);
    if (filters.tag !== 'all') nextParams.set('tag', filters.tag);
    if (filters.sort !== 'featured') nextParams.set('sort', filters.sort);
    if (filters.viewMode !== 'grid') nextParams.set('view', filters.viewMode);

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-4 sm:p-5 xl:p-6">
          <p className="kicker">{t('pages.catalog.eyebrow')}</p>
          <h1 className="mt-2 max-w-[20ch] text-[clamp(1.8rem,1.2rem+1.5vw,3rem)] leading-[1.02] text-navy">
            {t('pages.catalog.title')}
          </h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">
            {t('pages.catalog.description')}
          </p>

          <div className="mt-4 grid gap-3 3xl:grid-cols-[minmax(0,1fr)_18rem] 3xl:items-center">
            <SearchBar
              buttonLabel={t('common.actions.searchCatalog')}
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={t('pages.catalog.searchPlaceholder')}
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              {t('pages.catalog.workflowNote')}
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <Link className="chip whitespace-nowrap" key={category.slug} to={routes.category(category.slug)}>
                {category.title}
              </Link>
            ))}
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
                    <p className="text-sm font-semibold text-navy">{t('common.status.results', { count: filteredProducts.length })}</p>
                    <p className="text-xs text-text-muted">
                      {t('pages.catalog.toolbarDescription')}
                    </p>
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
                    {t('common.actions.clearAll')}
                  </button>
                </div>
              ) : null}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="mt-8">
                <EmptyState
                  actionLabel={t('common.actions.clearFilters')}
                  description={t('pages.catalog.noResults.description')}
                  onAction={clearAllFilters}
                  secondaryActionLabel={t('common.actions.browseEquipment')}
                  secondaryActionTo={routes.equipment}
                  title={t('pages.catalog.noResults.title')}
                />
              </div>
            ) : (
              <div className={filters.viewMode === 'list' ? 'mt-6 grid gap-4' : 'catalog-product-grid mt-6'}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} layout={filters.viewMode} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <MobileFilterDrawer
        label={t('pages.catalog.mobileFiltersLabel')}
        onClose={() => setMobileFiltersOpen(false)}
        open={mobileFiltersOpen}
      >
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
