import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { ProductCard } from '../components/common/ProductCard';
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
  const { clearAllFilters, filteredProducts, filters, setFilters } = useCatalogFilters(products, {
    fixedCategory: category?.slug,
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
    const nextParams = new URLSearchParams(searchParams);

    if (filters.subcategory !== 'all') {
      nextParams.set('subcategory', filters.subcategory);
    } else {
      nextParams.delete('subcategory');
    }

    if (nextParams.toString() !== searchParams.toString()) {
      setSearchParams(nextParams, { replace: true });
    }
  }, [filters.subcategory, searchParams, setSearchParams]);

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
            <Link to={routes.equipment}>Catalog</Link>
            <span>/</span>
            <span className="text-brand-navy">{category.title}</span>
          </div>
          <p className="eyebrow mt-5">{category.title}</p>
          <h1 className="mt-3 text-[2.8rem] text-brand-navy sm:text-[4rem]">{category.title}</h1>
          <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">{category.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {category.subcategories.map((subcategory) => (
              <button
                className={[
                  'rounded-full border px-4 py-2 text-sm transition',
                  filters.subcategory === subcategory.title
                    ? 'border-brand-gold bg-brand-gold/10 text-brand-navy'
                    : 'border-border bg-surface-subtle text-text-muted hover:border-brand-gold hover:text-brand-navy',
                ].join(' ')}
                key={subcategory.slug}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    subcategory:
                      current.subcategory === subcategory.title ? 'all' : subcategory.title,
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
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            description={category.seoIntro}
            eyebrow="Category overview"
            title="Listing-first browsing with inquiry-driven next steps"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-surface-card p-5 shadow-card">
              <p className="eyebrow">Products shown</p>
              <p className="mt-3 text-4xl font-extrabold text-brand-navy">{filteredProducts.length}</p>
              <p className="mt-2 text-sm text-text-muted">Filter by subcategory, condition, availability, and budget before sending an Inquiry List.</p>
            </div>
            <div className="rounded-3xl border border-border bg-surface-card p-5 shadow-card">
              <p className="eyebrow">Commercial basis</p>
              <p className="mt-3 text-2xl text-brand-navy">Inquiry-first commercial process</p>
              <p className="mt-2 text-sm text-text-muted">Products move into quote, information, inspection, and contract handling directly with Rafin.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        {filteredProducts.length === 0 ? (
          <EmptyState
            actionLabel="Reset Category Filters"
            description="No products in this category match the current subcategory or filter settings."
            onAction={clearAllFilters}
            title="No matching products"
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="section-shell pb-24">
        <SectionHeader
          description="Answers focused on this machinery group and how Rafin handles inspection, availability, and contract discussion."
          eyebrow="Category FAQ"
          title={`Questions buyers ask about ${category.title.toLowerCase()}`}
        />
        <div className="mt-8 grid gap-4">
          {faqs.map((faq) => (
            <article className="rounded-3xl border border-border bg-surface-card p-5 shadow-card" key={faq.question}>
              <h3 className="text-xl text-brand-navy">{faq.question}</h3>
              <p className="mt-3 text-text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
