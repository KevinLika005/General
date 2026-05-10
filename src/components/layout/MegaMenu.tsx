import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/catalog';
import { routes } from '../../utils/routes';

export function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full z-40 mt-3 w-[72rem] max-w-[calc(100vw-2rem)] -translate-x-1/2 border border-white/10 bg-rafin-ink p-5 shadow-2xl backdrop-blur">
      <div className="grid gap-3 lg:grid-cols-3">
        {categories.map((category) => (
          <div className="border border-white/10 bg-white/[0.03] p-4" key={category.slug}>
            <Link className="group block" to={routes.category(category.slug)}>
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[1.45rem] text-white transition group-hover:text-rafin-gold-soft">
                  {category.title}
                </h3>
                <ChevronRight className="h-4 w-4 text-rafin-gold-soft" />
              </div>
              <p className="mt-2 text-sm text-rafin-muted-light">
                {category.shortDescription}
              </p>
            </Link>
            <div className="mt-4 grid gap-1">
              {category.subcategories.slice(0, 5).map((subcategory) => (
                <Link
                  className="px-2 py-2 text-sm text-white/72 transition hover:bg-white/6 hover:text-white"
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
