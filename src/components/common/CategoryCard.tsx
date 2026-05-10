import { ArrowRight } from 'lucide-react';
import type { EquipmentCategory } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from './Button';
import { ImageWithFallback } from './ImageWithFallback';

export function CategoryCard({ category }: { category: EquipmentCategory }) {
  return (
    <article className="group relative overflow-hidden border border-white/10 bg-rafin-panel">
      <ImageWithFallback
        alt={category.title}
        className="absolute inset-0 h-full w-full"
        imageClassName="transition duration-500 group-hover:scale-105"
        src={category.heroImage}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-rafin-black via-rafin-black/70 to-rafin-black/10" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(227,198,99,0.14),transparent_36%)]" />
      <div className="relative flex min-h-[250px] flex-col justify-end p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-rafin-gold-soft">
            {category.subcategories.length} subcategories
          </p>
          <ArrowRight className="h-4 w-4 text-rafin-gold-soft" />
        </div>
        <h3 className="mt-3 text-[2rem] text-white">{category.title}</h3>
        <p className="mt-2 max-w-md text-sm text-white/72">{category.shortDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {category.subcategories.slice(0, 3).map((subcategory) => (
            <span
              className="border border-white/10 bg-black/20 px-2.5 py-1 text-[0.65rem] text-white/70"
              key={subcategory.slug}
            >
              {subcategory.title}
            </span>
          ))}
        </div>
        <Button className="mt-4 self-start" size="sm" to={routes.category(category.slug)} variant="secondary">
          View Category
        </Button>
      </div>
    </article>
  );
}
