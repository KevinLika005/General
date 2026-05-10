import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/catalog';
import { routes } from '../../utils/routes';

export function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-40 mt-3 w-[72rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-3xl border border-border bg-surface-card p-5 shadow-dropdown backdrop-blur">
      <div className="mb-5 flex items-start justify-between gap-6">
        <div>
          <p className="eyebrow">Browse by category</p>
          <h3 className="mt-2 text-[1.9rem] text-brand-navy">Machinery, trucks, parts, and support equipment</h3>
        </div>
        <Link className="rounded-xl border border-border px-4 py-2 text-sm font-semibold text-brand-navy transition hover:border-brand-gold" to={routes.requestQuote}>
          Request sourcing
        </Link>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {categories.map((category) => (
          <div className="rounded-2xl border border-border bg-surface-subtle p-4" key={category.slug}>
            <Link className="group block" to={routes.category(category.slug)}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.45rem] text-brand-navy transition group-hover:text-brand-ink">
                  {category.title}
                </h3>
                <ChevronRight className="h-4 w-4 text-brand-gold" />
              </div>
              <p className="mt-2 text-sm text-text-muted">
                {category.shortDescription}
              </p>
            </Link>
            <div className="mt-4 grid gap-1">
              {category.subcategories.slice(0, 5).map((subcategory) => (
                <Link
                  className="rounded-lg px-2 py-2 text-sm text-text-muted transition hover:bg-white hover:text-brand-navy"
                  key={subcategory.slug}
                  to={`${routes.category(category.slug)}?subcategory=${encodeURIComponent(subcategory.title)}`}
                >
                  {subcategory.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
