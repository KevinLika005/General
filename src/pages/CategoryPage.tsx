import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { CatalogResults } from '../components/common/CatalogResults';
import { SearchBar } from '../components/common/SearchBar';
import { SectionHeader } from '../components/common/SectionHeader';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import type { CatalogProductType } from '../data/catalog';
import { categoryIntros } from '../data/content/categoryIntros';
import { pickParagraphs } from '../data/content/paragraphs';
import {
  getCategoryBySlug,
  getFaqsByCategory,
  getProductsByCategory,
  getSubcategoryBySlug,
  resolveTaxonomySelection,
} from '../utils/catalog';
import { getSrcSet } from '../utils/images';
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
  const ownerIntro = category ? pickParagraphs(categoryIntros[category.slug]) : [];
  const products = categorySlug ? getProductsByCategory(categorySlug) : [];
  const faqs = categorySlug ? getFaqsByCategory(categorySlug) : [];

  const taxonomy = resolveTaxonomySelection({
    categorySlug: categorySlug || undefined,
    subcategorySlug: subcategoryParam || undefined,
    productTypeSlug: productTypeParam || undefined,
  });

  const catalog = useCatalogFilters(products, {
    fixedCategory: category?.slug,
    initialSearch: queryParam || undefined,
  });
  const { clearAllFilters, filteredProducts, filters, setFilters } = catalog;

  const activeSubcategory =
    category && filters.subcategory !== 'all'
      ? getSubcategoryBySlug(category.slug, filters.subcategory)
      : undefined;
  const visibleProductTypes: CatalogProductType[] = activeSubcategory
    ? activeSubcategory.productTypes
    : category?.subcategories.flatMap((subcategory) => subcategory.productTypes) ?? [];

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
      <section className="wide-shell pb-4 pt-5">
        <Breadcrumbs
          items={[
            { label: t('common.labels.home'), to: routes.home },
            { label: t('common.labels.equipment'), to: routes.equipment },
            { label: category.title },
          ]}
        />
        <div className="relative mt-3 overflow-hidden rounded-lg bg-surface-dark">
          {/* Decorative and dimmed to 35%, so phones get the thumbnail; wider screens the full image. */}
          <img
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            sizes="(min-width: 768px) 100vw, 320px"
            src={category.heroImage}
            srcSet={getSrcSet(category.heroImage)}
          />
          <div className="relative px-5 py-6 md:px-7 md:py-8">
            <h1 className="text-[clamp(1.875rem,1.4rem+1.3vw,2.75rem)] text-text-on-dark">{category.title}</h1>
            <p className="mt-2 max-w-[60ch] text-[0.9375rem] text-text-on-dark/80">{category.shortDescription}</p>
          </div>
        </div>
        <div className="mt-4 w-full xl:max-w-md">
          <SearchBar
            buttonLabel={t('common.actions.searchCategory')}
            compact
            onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
            onSubmit={() => undefined}
            placeholder={t('pages.category.searchWithin', { category: category.title.toLowerCase() })}
            value={filters.search}
          />
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {category.subcategories.map((subcategory) => (
            <button
              className={[
                'chip whitespace-nowrap',
                filters.subcategory === subcategory.slug
                  ? 'border-primary bg-brand-gold-soft text-navy'
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
                  ? 'border-primary bg-brand-gold-soft text-navy'
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
      </section>

      <section className="wide-shell pb-12">
        <CatalogResults
          catalog={catalog}
          clearLabel={t('pages.category.clearCategoryFilters')}
          emptyState={
            products.length === 0 ? (
              <EmptyState
                actionLabel={t('common.actions.requestQuote')}
                actionTo={routes.requestQuote}
                description={t('pages.category.emptyCategory.description')}
                secondaryActionLabel={t('common.labels.technicalLibrary')}
                secondaryActionTo={routes.technicalLibrary}
                title={t('pages.category.emptyCategory.title')}
              />
            ) : (
              <EmptyState
                actionLabel={t('common.actions.resetCategoryFilters')}
                description={t('pages.category.noMatches.description')}
                onAction={clearAllFilters}
                secondaryActionLabel={t('common.actions.browseEquipment')}
                secondaryActionTo={routes.equipment}
                title={t('pages.category.noMatches.title')}
              />
            )
          }
          mobileFiltersLabel={t('pages.category.mobileFiltersLabel', { category: category.title })}
          resultLabel={t('common.status.productsInView', { count: filteredProducts.length })}
        />
      </section>

      <section className="wide-shell pb-24">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <div className="text-measure mb-6 space-y-3 text-[0.9375rem] text-text-muted">
              {(ownerIntro.length > 0 ? ownerIntro : [category.description]).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <SectionHeader
              description={t('pages.category.faq.description')}
              title={t('pages.category.faq.title', { category: category.title.toLowerCase() })}
            />
            <div className="mt-6 grid gap-4">
              {faqs.map((faq) => (
                <article className="toolbar-panel p-4" key={faq.question}>
                  <h3 className="text-[1.05rem] text-navy">{faq.question}</h3>
                  <p className="mt-2 text-sm text-text-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="surface-panel p-5 xl:sticky xl:top-[calc(var(--header-offset)+1rem)] xl:self-start">
            <h2 className="text-[clamp(1.3rem,1rem+0.8vw,1.6rem)] text-navy">
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
    </>
  );
}
