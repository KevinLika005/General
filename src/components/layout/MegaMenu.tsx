import { ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories, products } from '../../data/catalog';
import { getSubcategoryParam } from '../../utils/catalog';
import { routes } from '../../utils/routes';

export function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-40 mt-3 w-[72rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 border border-border bg-surface-card p-5 shadow-dropdown backdrop-blur">
      <div className="grid gap-5 wide:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <div className="mb-5 flex items-start justify-between gap-6 border-b border-border pb-4">
            <div>
              <p className="kicker">Products</p>
              <h3 className="mt-2 max-w-3xl text-[1.55rem] text-navy">Browse machinery, attachments, tools, parts, and support equipment</h3>
            </div>
            <Link className="inline-flex min-h-11 items-center justify-center border border-border px-4 text-[0.82rem] font-semibold text-navy transition hover:border-primary" to={routes.requestQuote}>
              Request Quote
            </Link>
          </div>
          <div className="grid gap-3 lg:grid-cols-2 wide:grid-cols-3">
            {categories.map((category) => {
              const productCount = products.filter((product) => product.categorySlug === category.slug).length;

              return (
                <div className="border border-border bg-surface-card p-4" key={category.slug}>
                  <Link className="group block" to={routes.category(category.slug)}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="line-label">{productCount} listings</p>
                        <h3 className="mt-1 text-[1.1rem] text-navy transition group-hover:text-brand-ink">
                          {category.title}
                        </h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-sm text-text-muted">
                      {category.shortDescription}
                    </p>
                  </Link>
                  <div className="mt-4 grid gap-1.5">
                    {category.subcategories.slice(0, 4).map((subcategory) => (
                      <Link
                        className="border border-transparent px-2.5 py-2 text-sm text-text-muted transition hover:border-border hover:bg-surface-subtle hover:text-navy"
                        key={subcategory.slug}
                        to={`${routes.category(category.slug)}?subcategory=${encodeURIComponent(getSubcategoryParam(category.slug, subcategory.title))}`}
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
          <div className="border border-surface-blue bg-surface-blue p-4 text-text-on-dark">
            <p className="kicker text-white/80">Featured path</p>
            <h3 className="mt-2 text-[1.4rem] text-white">Available stock and inbound units</h3>
            <p className="mt-2 text-sm text-white/72">
              Go straight to the listings buyers usually need first: available machinery, incoming stock, and deal-tagged equipment.
            </p>
            <Link className="mt-4 inline-flex min-h-11 w-full items-center justify-center border border-primary/25 bg-white px-4 text-[0.82rem] font-semibold text-navy transition hover:border-white hover:bg-surface-subtle" to={routes.deals}>
              View Available Now
            </Link>
          </div>

          <div className="border border-border bg-surface-subtle p-4">
            <p className="line-label">Quick links</p>
            <div className="mt-3 grid gap-1">
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.equipment}>All Equipment</Link>
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.brands}>Brands</Link>
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.technicalLibrary}>Technical Library</Link>
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.requestQuote}>Request Quote</Link>
            </div>
          </div>

          <div className="border border-border bg-surface-card p-4">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="line-label">Support CTA</p>
                <p className="mt-2 text-sm font-semibold text-navy">Need manuals, spec sheets, or inspection references?</p>
                <p className="mt-1 text-xs text-text-muted">
                  Use the Technical Library or request documents tied to a specific model or SKU.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
