import { ArrowRight } from 'lucide-react';
import { products, type EquipmentCategory } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from './Button';
import { ImageWithFallback } from './ImageWithFallback';

export function CategoryCard({ category }: { category: EquipmentCategory }) {
  const productCount = products.filter((product) => product.categorySlug === category.slug).length;

  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-surface-card shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-hover">
      <ImageWithFallback
        alt={category.title}
        aspectRatio="wide"
        className="rounded-none"
        imageClassName="transition duration-500 group-hover:scale-105"
        src={category.heroImage}
      />
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="line-label">
            {productCount} listings
          </p>
          <ArrowRight className="h-4 w-4 text-brand-gold" />
        </div>
        <h3 className="mt-3 text-[1.55rem] text-brand-navy">{category.title}</h3>
        <p className="mt-2 max-w-md text-sm text-text-muted">{category.shortDescription}</p>
        <div className="mt-4 grid gap-1">
          {category.subcategories.slice(0, 4).map((subcategory) => (
            <span
              className="rounded-[4px] border border-border bg-surface-subtle px-2.5 py-1.5 text-[0.76rem] text-text-muted"
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
