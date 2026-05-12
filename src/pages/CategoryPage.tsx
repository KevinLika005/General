import { Filter, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/common/FilterSidebar';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { routes } from '../utils/routes';
import { getCategoryBySlug, getFaqsByCategory, getProductsByCategory } from '../utils/catalog';
import { NotFoundPage } from './NotFoundPage';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = categorySlug ? getCategoryBySlug(categorySlug) : undefined;
  const products = categorySlug ? getProductsByCategory(categorySlug) : [];
  const faqs = categorySlug ? getFaqsByCategory(categorySlug) : [];
  const subcategoryParam = searchParams.get('subcategory') ?? '';
  const queryParam = searchParams.get('q') ?? '';
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
    if (subcategoryParam) {
      setFilters((current) => ({ ...current, subcategory: subcategoryParam }));
    }
  }, [setFilters, subcategoryParam]);

  useEffect(() => {
    setFilters((current) => ({ ...current, search: queryParam }));
  }, [queryParam, setFilters]);

  useEffect(() => {
    const nextParams = new URLSearchParams(searchParams);

    if (filters.subcategory !== 'all') {
      nextParams.set('subcategory', filters.subcategory);
    } else {
      nextParams.delete('subcategory');
    }

    if (filters.search) {
      nextParams.set('q', filters.search);
    } else {
      nextParams.delete('q');
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [filters.search, filters.subcategory, searchParams, setSearchParams]);

  if (!categorySlug || !category) {
    return <NotFoundPage />;
  }

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
            <Link to={routes.home}>Home</Link>
            <span>/</span>
            <Link to={routes.equipment}>Equipment</Link>
            <span>/</span>
            <span className="text-brand-navy">{category.title}</span>
          </div>
          <p className="kicker mt-5">{category.title}</p>
          <h1 className="mt-3 text-[2.45rem] text-brand-navy sm:text-[3.2rem]">{category.title}</h1>
          <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">{category.description}</p>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
            <SearchBar
              buttonLabel="Search Category"
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={`Search within ${category.title.toLowerCase()}`}
              value={filters.search}
            />
            <div className="subtle-panel px-4 py-3 text-sm text-text-muted">
              Add products to your Inquiry List, then continue with inspection, pricing, or contract discussion offline.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {category.subcategories.map((subcategory) => (
              <button
                className={[
                  'rounded-[4px] border px-4 py-2 text-sm transition',
                  filters.subcategory === subcategory.title
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-navy'
                    : 'border-border bg-surface-subtle text-text-muted hover:border-brand-gold hover:text-brand-navy',
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
        <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
          <div className="hidden xl:block">
            <FilterSidebar
              clearAllFilters={clearAllFilters}
              filters={filters}
              optionSets={optionSets}
              setFilters={setFilters}
            />
          </div>

          <div>
            <div className="toolbar-panel px-5 py-4 shadow-card">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <SlidersHorizontal className="h-5 w-5 text-brand-gold" />
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{filteredProducts.length} products in view</p>
                    <p className="text-xs text-text-muted">{category.seoIntro}</p>
                  </div>
                </div>
                <button
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-subtle px-4 py-3 text-sm font-semibold text-brand-navy xl:hidden"
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
                      className="rounded-[4px] border border-border bg-surface-subtle px-4 py-2 text-sm text-text-muted transition hover:border-brand-gold hover:text-brand-navy"
                      key={`${filter.key}-${filter.label}`}
                      onClick={() => clearFilter(filter.key)}
                      type="button"
                    >
                      {filter.label} x
                    </button>
                  ))}
                  <button
                    className="text-sm font-semibold text-brand-navy underline decoration-brand-gold underline-offset-4"
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
                <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
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
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div>
            <SectionHeader
              description="Answers focused on this machinery group and how Rafin handles inspection, availability, and contract discussion."
              eyebrow="Category FAQ"
              title={`Questions buyers ask about ${category.title.toLowerCase()}`}
            />
            <div className="mt-8 grid gap-4">
              {faqs.map((faq) => (
                <article className="toolbar-panel p-5 shadow-card" key={faq.question}>
                  <h3 className="text-xl text-brand-navy">{faq.question}</h3>
                  <p className="mt-3 text-text-muted">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
          <aside className="surface-panel p-6 xl:sticky xl:top-28 xl:self-start">
            <p className="kicker">Support for this category</p>
            <h2 className="mt-2 text-[1.8rem] text-brand-navy">Need documents, inspection details, or a bundled request?</h2>
            <p className="mt-3 text-sm text-text-muted">
              Use the inquiry workflow for product packs, compatibility questions, delivery planning, or contract handling tied to this category.
            </p>
            <div className="mt-5 grid gap-3">
              <Link className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-brand-navy bg-brand-navy px-4 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-white" to={routes.requestQuote}>
                Request Quote
              </Link>
              <Link className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border px-4 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-brand-navy" to={routes.technicalLibrary}>
                Technical Library
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div
          aria-label={`${category.title} filters`}
          aria-modal="true"
          className="fixed inset-0 z-50 bg-brand-navy/45 px-4 py-6 xl:hidden"
          role="dialog"
        >
          <div className="mx-auto max-w-lg">
            <FilterSidebar
              clearAllFilters={clearAllFilters}
              filters={filters}
              onClose={() => setMobileFiltersOpen(false)}
              optionSets={optionSets}
              setFilters={setFilters}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
