import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, products } from '../../data/catalog';
import { routes } from '../../utils/routes';

export function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-40 mt-3 w-[78rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-2xl border border-border bg-surface-card p-5 shadow-dropdown backdrop-blur">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <div className="mb-5 flex items-start justify-between gap-6 border-b border-border pb-4">
            <div>
              <p className="kicker">Products</p>
              <h3 className="mt-2 text-[2rem] text-brand-navy">Browse machinery, attachments, tools, parts, and support equipment</h3>
            </div>
            <Link className="inline-flex min-h-11 items-center justify-center rounded-[6px] border border-border px-4 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-brand-navy transition hover:border-brand-gold" to={routes.requestQuote}>
              Request Quote
            </Link>
          </div>
          <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
            {categories.map((category) => {
              const productCount = products.filter((product) => product.categorySlug === category.slug).length;

              return (
                <div className="rounded-xl border border-border bg-surface-alt p-4" key={category.slug}>
                  <Link className="group block" to={routes.category(category.slug)}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="line-label">{productCount} listings</p>
                        <h3 className="mt-1 text-[1.45rem] text-brand-navy transition group-hover:text-brand-ink">
                          {category.title}
                        </h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-brand-gold" />
                    </div>
                    <p className="mt-2 text-sm text-text-muted">
                      {category.shortDescription}
                    </p>
                  </Link>
                  <div className="mt-4 grid gap-1.5">
                    {category.subcategories.slice(0, 4).map((subcategory) => (
                      <Link
                        className="rounded-[6px] px-2.5 py-2 text-sm text-text-muted transition hover:bg-surface-card hover:text-brand-navy"
                        key={subcategory.slug}
                        to={`${routes.category(category.slug)}?subcategory=${encodeURIComponent(subcategory.title)}`}
                      >
                        {subcategory.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-3">
          <div className="rounded-xl border border-brand-navy bg-brand-navy p-4 text-white">
            <p className="kicker text-brand-gold-soft">Featured path</p>
            <h3 className="mt-2 text-[1.7rem] text-white">Available stock and inbound units</h3>
            <p className="mt-2 text-sm text-white/72">
              Go straight to the listings buyers usually need first: available machinery, incoming stock, and deal-tagged equipment.
            </p>
            <Link className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-[6px] border border-brand-gold bg-brand-gold px-4 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-brand-ink" to={routes.deals}>
              View Available Now
            </Link>
          </div>

          <div className="rounded-xl border border-border bg-surface-alt p-4">
            <p className="line-label">Quick links</p>
            <div className="mt-3 grid gap-1">
              <Link className="rounded-[6px] px-2.5 py-2 text-sm text-brand-navy transition hover:bg-surface-card" to={routes.equipment}>All Equipment</Link>
              <Link className="rounded-[6px] px-2.5 py-2 text-sm text-brand-navy transition hover:bg-surface-card" to={routes.brands}>Brands</Link>
              <Link className="rounded-[6px] px-2.5 py-2 text-sm text-brand-navy transition hover:bg-surface-card" to={routes.technicalLibrary}>Technical Library</Link>
              <Link className="rounded-[6px] px-2.5 py-2 text-sm text-brand-navy transition hover:bg-surface-card" to={routes.requestQuote}>Request Quote</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
