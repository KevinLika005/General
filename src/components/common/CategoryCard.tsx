import { ArrowRight } from 'lucide-react';
import { products, type EquipmentCategory } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from './Button';
import { ImageWithFallback } from './ImageWithFallback';

export function CategoryCard({ category }: { category: EquipmentCategory }) {
  const productCount = products.filter((product) => product.categorySlug === category.slug).length;

  return (
    <article className="group mx-auto w-full max-w-[23rem] overflow-hidden border border-border bg-surface-card shadow-card transition duration-150 hover:border-primary hover:shadow-hover">
      <ImageWithFallback
        alt={category.title}
        aspectRatio="wide"
        className="rounded-none border-x-0 border-t-0"
        imageClassName="transition duration-300 group-hover:scale-[1.02]"
        src={category.heroImage}
      />
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="line-label">
            {productCount} listings
          </p>
          <ArrowRight className="h-4 w-4 text-primary" />
        </div>
        <h3 className="mt-2 text-[1.05rem] text-navy md:text-[1.12rem]">{category.title}</h3>
        <p className="text-measure mt-1.5 text-sm text-text-muted">{category.shortDescription}</p>
        <div className="mt-3 grid gap-1">
          {category.subcategories.slice(0, 4).map((subcategory) => (
            <span
              className="border border-border bg-surface-subtle px-2.5 py-1.5 text-[0.74rem] text-text-muted"
              key={subcategory.slug}
            >
              {subcategory.title}
            </span>
          ))}
        </div>
        <Button className="mt-3 self-start" size="xs" to={routes.category(category.slug)} variant="secondary">
          View Category
        </Button>
      </div>
    </article>
  );
}
