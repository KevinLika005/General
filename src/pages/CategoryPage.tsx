import { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';
import { ProductCard } from '../components/common/ProductCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { getCategoryBySlug, getFaqsByCategory, getProductsByCategory } from '../data/catalog';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { NotFoundPage } from './NotFoundPage';

export function CategoryPage() {
  const { categorySlug } = useParams();
  const [searchParams] = useSearchParams();

  if (!categorySlug) {
    return <NotFoundPage />;
  }

  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return <NotFoundPage />;
  }

  const products = getProductsByCategory(categorySlug);
  const faqs = getFaqsByCategory(categorySlug);
  const subcategoryParam = searchParams.get('subcategory') ?? '';
  const { clearAllFilters, filteredProducts, filters, setFilters } = useCatalogFilters(products, {
    fixedCategory: category.slug,
  });

  useEffect(() => {
    if (subcategoryParam) {
      setFilters((current) => ({ ...current, subcategory: subcategoryParam }));
    }
  }, [setFilters, subcategoryParam]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(202,163,64,0.18),transparent_30%),linear-gradient(180deg,rgba(17,29,74,0.92),rgba(20,33,61,1))]" />
        <div className="section-shell relative py-16 sm:py-20">
          <p className="eyebrow">{category.title}</p>
          <h1 className="mt-4 max-w-4xl text-4xl text-white sm:text-5xl">{category.title}</h1>
          <p className="mt-5 max-w-3xl text-base text-rafin-muted-light sm:text-lg">{category.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {category.subcategories.map((subcategory) => (
              <button
                className={[
                  'border px-4 py-2 text-sm transition',
                  filters.subcategory === subcategory.title
                    ? 'border-rafin-gold bg-rafin-gold/12 text-rafin-gold-soft'
                    : 'border-white/10 bg-white/5 text-white/72',
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

      <section className="section-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Category Overview</p>
            <h2 className="mt-4 text-4xl text-white sm:text-5xl">Built for procurement, not for impulse buying</h2>
          </div>
          <p className="text-lg text-rafin-muted-light">{category.seoIntro}</p>
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
          <div className="grid gap-5 xl:grid-cols-2">
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
            <article className="border border-white/10 bg-rafin-panel p-5" key={faq.question}>
              <h3 className="text-xl text-white">{faq.question}</h3>
              <p className="mt-3 text-rafin-muted-light">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
