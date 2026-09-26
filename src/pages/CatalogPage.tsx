import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CatalogResults } from '../components/common/CatalogResults';
import { SearchBar } from '../components/common/SearchBar';
import { getCategories, getProducts } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { resolveTaxonomySelection } from '../utils/catalog';
import { routes } from '../utils/routes';

export function CatalogPage() {
  const { t } = useTranslation();
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

  const catalog = useCatalogFilters(products, {
    initialBrand: brandParam || undefined,
    initialSearch: queryParam || undefined,
  });
  const { clearAllFilters, filteredProducts, filters, setFilters } = catalog;

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
      <section className="catalog-shell pb-4 pt-5">
        <Breadcrumbs items={[{ label: t('common.labels.home'), to: routes.home }, { label: t('common.labels.equipment') }]} />
        <div className="mt-3 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <h1 className="text-[clamp(1.875rem,1.4rem+1.3vw,2.75rem)]">{t('pages.catalog.eyebrow')}</h1>
          <div className="w-full xl:max-w-md">
            <SearchBar
              buttonLabel={t('common.actions.searchCatalog')}
              compact
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={t('pages.catalog.searchPlaceholder')}
              value={filters.search}
            />
          </div>
        </div>
        <nav aria-label={t('common.labels.productGroups')} className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <Link className="chip whitespace-nowrap" key={category.slug} to={routes.category(category.slug)}>
              {category.title}
            </Link>
          ))}
        </nav>
      </section>

      <section className="catalog-shell pb-20">
        <CatalogResults
          catalog={catalog}
          clearLabel={t('common.actions.clearAll')}
          emptyState={
            <EmptyState
              actionLabel={t('common.actions.clearFilters')}
              description={t('pages.catalog.noResults.description')}
              onAction={clearAllFilters}
              secondaryActionLabel={t('common.actions.browseEquipment')}
              secondaryActionTo={routes.equipment}
              title={t('pages.catalog.noResults.title')}
            />
          }
          mobileFiltersLabel={t('pages.catalog.mobileFiltersLabel')}
          resultLabel={t('common.status.results', { count: filteredProducts.length })}
        />
      </section>
    </>
  );
}
