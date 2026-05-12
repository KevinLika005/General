import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
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
import { getCategoryBySlug, getFaqsByCategory, getProductsByCategory, getSubcategoryParam, getSubcategoryTitle } from '../utils/catalog';
import { routes } from '../utils/routes';
import { NotFoundPage } from './NotFoundPage';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const products = categorySlug ? getProductsByCategory(categorySlug) : [];
  const faqs = categorySlug ? getFaqsByCategory(categorySlug) : [];
  const subcategoryParam = searchParams.get('subcategory') ?? '';
  const queryParam = searchParams.get('q') ?? '';
  const viewParam = searchParams.get('view') ?? '';
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

  usePageMetadata({
    title: category ? `${category.title} | Rafin Machinery` : 'Category | Rafin Machinery',
    description: category?.seoIntro ?? 'Browse machinery inventory by category in the Rafin Machinery catalog.',
  });

  useEffect(() => {
    if (subcategoryParam && categorySlug) {
      setFilters((current) => ({
        ...current,
        subcategory: getSubcategoryTitle(categorySlug, subcategoryParam),
      }));
    }
  }, [categorySlug, setFilters, subcategoryParam]);

  useEffect(() => {
    setFilters((current) => ({
      ...current,
      search: queryParam,
      viewMode: viewParam === 'list' ? 'list' : 'grid',
    }));
  }, [queryParam, setFilters, viewParam]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (filters.subcategory !== 'all' && categorySlug) {
      nextParams.set('subcategory', getSubcategoryParam(categorySlug, filters.subcategory));
    } else {
      nextParams.delete('subcategory');
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
  }, [categorySlug, filters.search, filters.subcategory, filters.viewMode, searchParams, setSearchParams]);

  if (!categorySlug || !category) {
    return <NotFoundPage />;
  }

  const gridClass =
    filters.viewMode === 'list'
      ? 'grid-cols-1'
      : 'md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4';

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-4 sm:p-5 xl:p-6">
          <Breadcrumbs
            items={[
              { label: 'Home', to: routes.home },
              { label: 'Equipment', to: routes.equipment },
              { label: category.title },
            ]}
          />
          <p className="kicker mt-4">{category.title}</p>
          <h1 className="mt-2 text-[1.8rem] leading-[1.08] text-navy sm:text-[2.2rem] xl:text-[2.8rem]">{category.title}</h1>
          <p className="mt-3 max-w-3xl text-sm text-text-muted sm:text-base">{category.description}</p>

          <div className="mt-4 grid gap-3 xl:grid-cols-[1fr_18rem] xl:items-center">
            <SearchBar
              buttonLabel="Search Category"
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={`Search within ${category.title.toLowerCase()}`}
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              Add products to your Inquiry List, then continue with quote, inspection, documentation, or contract follow-up offline.
            </div>
          </div>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {category.subcategories.map((subcategory) => (
              <button
                className={[
                  'chip whitespace-nowrap',
                  filters.subcategory === subcategory.title
                    ? 'border-primary bg-surface-subtle text-primary-dark'
                    : '',
                ].join(' ')}
                key={subcategory.slug}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    subcategory: current.subcategory === subcategory.title ? 'all' : subcategory.title,
                  }))
                }
                type="button"
              >
                {subcategory.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-12">
        <div className="grid gap-6 xl:grid-cols-[18.5rem_minmax(0,1fr)]">
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
                    <p className="text-sm font-semibold text-navy">{filteredProducts.length} products in view</p>
                    <p className="text-xs text-text-muted">{category.seoIntro}</p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-2 border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-navy xl:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                  type="button"
                >
                  <Filter className="h-4 w-4" />
                  Filters
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
                    Clear category filters
                  </button>
                </div>
              ) : null}
            </div>

            <div className="mt-8">
              {filteredProducts.length === 0 ? (
                <EmptyState
                  actionLabel="Reset Category Filters"
                  description="No products in this category match the current search or filter settings. Reset filters or return to the full catalog."
                  onAction={clearAllFilters}
                  secondaryActionLabel="Browse Equipment"
                  secondaryActionTo={routes.equipment}
                  title="No matching products in this category"
                />
              ) : (
                <div className={`grid gap-4 ${gridClass}`}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-6 xl:grid-cols-[1fr_20rem]">
          <div>
            <SectionHeader
              description="Answers focused on this machinery group and how Rafin handles inspection, availability, documentation, and contract discussion."
              eyebrow="Category FAQ"
              title={`Questions buyers ask about ${category.title.toLowerCase()}`}
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
            <p className="kicker">Support for this category</p>
            <h2 className="mt-2 text-[1.45rem] text-navy">Need documents, inspection details, or a bundled request?</h2>
            <p className="mt-3 text-sm text-text-muted">
              Use the inquiry workflow for product packs, compatibility questions, delivery planning, or contract handling tied to this category.
            </p>
            <div className="mt-5 grid gap-3">
              <Button to={routes.requestQuote}>Request Quote</Button>
              <Button to={routes.technicalLibrary} variant="secondary">
                Technical Library
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <MobileFilterDrawer label={`${category.title} filters`} onClose={() => setMobileFiltersOpen(false)} open={mobileFiltersOpen}>
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
