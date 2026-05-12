import { ArrowUpRight } from 'lucide-react';
import type { Brand } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from './Button';

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="toolbar-panel p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-hover">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-brand-gold/35 bg-brand-gold/10 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-brand-navy">
        {brand.logoText}
      </div>
      <h3 className="mt-4 text-[1.65rem] text-brand-navy">{brand.name}</h3>
      <p className="mt-2 text-sm text-text-muted">{brand.description}</p>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
        <span className="line-label">
          {brand.productCount} listings
        </span>
        <Button size="sm" to={routes.equipmentWithBrand(brand.name)} variant="secondary">
          Browse
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
