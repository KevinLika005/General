import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { MobileFilterDrawer } from '../components/common/MobileFilterDrawer';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import type { CatalogProductType } from '../data/catalog';
import {
  getCategoryBySlug,
  getFaqsByCategory,
  getProductsByCategory,
  getSubcategoryBySlug,
  resolveTaxonomySelection,
} from '../utils/catalog';
import { routes } from '../utils/routes';
import { NotFoundPage } from './NotFoundPage';

export function CategoryPage() {
  const { t } = useTranslation();
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory') ?? '';
  const productTypeParam = searchParams.get('type') ?? '';
  const queryParam = searchParams.get('q') ?? '';
  const viewParam = searchParams.get('view') ?? '';

  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const products = categorySlug ? getProductsByCategory(categorySlug) : [];
  const faqs = categorySlug ? getFaqsByCategory(categorySlug) : [];

  const taxonomy = resolveTaxonomySelection({
    categorySlug: categorySlug || undefined,
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
    fixedCategory: category?.slug,
    initialSearch: queryParam || undefined,
  });

  const activeSubcategory =
    category && filters.subcategory !== 'all'
      ? getSubcategoryBySlug(category.slug, filters.subcategory)
      : undefined;
  const visibleProductTypes: CatalogProductType[] = activeSubcategory
    ? activeSubcategory.productTypes
    : category?.subcategories.flatMap((subcategory) => subcategory.productTypes) ?? [];

  usePageMetadata({
    title: category ? `${category.title} | Rafin Machinery` : t('metadata.category.fallbackTitle'),
    description: category?.seoIntro ?? t('metadata.category.fallbackDescription'),
  });

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      search: queryParam,
      subcategory: taxonomy.subcategorySlug ?? 'all',
      productType: taxonomy.productTypeSlug ?? 'all',
      viewMode: viewParam === 'list' ? 'list' : 'grid',
    }));
  }, [queryParam, setFilters, taxonomy.productTypeSlug, taxonomy.subcategorySlug, viewParam]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (filters.subcategory !== 'all') {
      nextParams.set('subcategory', filters.subcategory);
    } else {
      nextParams.delete('subcategory');
    }

    if (filters.productType !== 'all') {
      nextParams.set('type', filters.productType);
    } else {
      nextParams.delete('type');
    }

    if (filters.search) {
      nextParams.set('q', filters.search);
    } else {
      nextParams.delete('q');
    }

    if (filters.viewMode !== 'grid') {
      nextParams.set('view', filters.viewMode);
    } else {
      nextParams.delete('view');
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [
    filters.productType,
    filters.search,
    filters.subcategory,
    filters.viewMode,
    searchParams,
    setSearchParams,
  ]);

  if (!categorySlug || !category) {
    return <NotFoundPage />;
  }

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-4 sm:p-5 xl:p-6">
          <Breadcrumbs
            items={[
              { label: t('common.labels.home'), to: routes.home },
              { label: t('common.labels.equipment'), to: routes.equipment },
              { label: category.title },
            ]}
          />
          <p className="kicker mt-4">{category.title}</p>
          <h1 className="mt-2 max-w-[20ch] text-[clamp(1.8rem,1.2rem+1.5vw,3rem)] leading-[1.02] text-navy">
            {category.title}
          </h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">{category.description}</p>

          <div className="mt-4 grid gap-3 3xl:grid-cols-[minmax(0,1fr)_18rem] 3xl:items-center">
            <SearchBar
              buttonLabel={t('common.actions.searchCategory')}
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={t('pages.category.searchWithin', { category: category.title.toLowerCase() })}
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              {t('pages.category.workflowNote')}
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {category.subcategories.map((subcategory) => (
              <button
                className={[
                  'chip whitespace-nowrap',
                  filters.subcategory === subcategory.slug
                    ? 'border-primary bg-surface-subtle text-primary-dark'
                    : '',
                ].join(' ')}
                key={subcategory.slug}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    subcategory: current.subcategory === subcategory.slug ? 'all' : subcategory.slug,
                    productType: 'all',
                  }))
                }
                type="button"
              >
                {subcategory.title}
              </button>
            ))}
          </div>

          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {visibleProductTypes.map((productType) => (
              <button
                className={[
                  'chip whitespace-nowrap',
                  filters.productType === productType.slug
                    ? 'border-primary bg-surface-subtle text-primary-dark'
                    : '',
                ].join(' ')}
                key={productType.slug}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    productType: current.productType === productType.slug ? 'all' : productType.slug,
                  }))
                }
                type="button"
              >
                {productType.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog-shell pb-12">
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
                    <p className="text-sm font-semibold text-navy">{t('common.status.productsInView', { count: filteredProducts.length })}</p>
                    <p className="text-xs text-text-muted">{category.seoIntro}</p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-2 border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-navy xl:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                  type="button"
                  >
                    <Filter className="h-4 w-4" />
                    {t('common.labels.filters')}
                  </button>
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
                    {t('pages.category.clearCategoryFilters')}
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              {products.length === 0 ? (
                <EmptyState
                  actionLabel={t('common.actions.requestQuote')}
                  actionTo={routes.requestQuote}
                  description={t('pages.category.emptyCategory.description')}
                  secondaryActionLabel={t('common.labels.technicalLibrary')}
                  secondaryActionTo={routes.technicalLibrary}
                  title={t('pages.category.emptyCategory.title')}
                />
              ) : filteredProducts.length === 0 ? (
                <EmptyState
                  actionLabel={t('common.actions.resetCategoryFilters')}
                  description={t('pages.category.noMatches.description')}
                  onAction={clearAllFilters}
                  secondaryActionLabel={t('common.actions.browseEquipment')}
                  secondaryActionTo={routes.equipment}
                  title={t('pages.category.noMatches.title')}
                />
              ) : (
                <div className={filters.viewMode === 'list' ? 'grid gap-4' : 'catalog-product-grid'}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} layout={filters.viewMode} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="wide-shell pb-24">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <SectionHeader
              description={t('pages.category.faq.description')}
              eyebrow={t('pages.category.faq.eyebrow')}
              title={t('pages.category.faq.title', { category: category.title.toLowerCase() })}
            />
            <div className="mt-6 grid gap-4">
              {faqs.map((faq) => (
                <article className="toolbar-panel p-4 shadow-card" key={faq.question}>
                  <h3 className="text-[1.05rem] text-navy">{faq.question}</h3>
                  <p className="mt-2 text-sm text-text-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="surface-panel p-5 xl:sticky xl:top-28 xl:self-start">
            <p className="kicker">{t('pages.category.support.eyebrow')}</p>
            <h2 className="mt-2 text-[clamp(1.3rem,1rem+0.8vw,1.6rem)] text-navy">
              {t('pages.category.support.title')}
            </h2>
            <p className="text-measure mt-3 text-sm text-text-muted">
              {t('pages.category.support.description')}
            </p>
            <div className="mt-5 grid gap-3">
              <Button to={routes.requestQuote}>{t('common.actions.requestQuote')}</Button>
              <Button to={routes.technicalLibrary} variant="secondary">
                {t('common.labels.technicalLibrary')}
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <MobileFilterDrawer
        label={t('pages.category.mobileFiltersLabel', { category: category.title })}
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
