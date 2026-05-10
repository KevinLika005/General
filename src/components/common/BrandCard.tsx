import { ArrowUpRight } from 'lucide-react';
import type { Brand } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from './Button';

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="rounded-3xl border border-border bg-surface-card p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-hover">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-gold/35 bg-brand-gold/10 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-navy">
        {brand.logoText}
      </div>
      <h3 className="mt-4 text-[1.65rem] text-brand-navy">{brand.name}</h3>
      <p className="mt-2 text-sm text-text-muted">{brand.description}</p>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-4">
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-text-muted">
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
