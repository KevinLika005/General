import { ArrowUpRight } from 'lucide-react';
import type { Brand } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from './Button';

export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <article className="border border-white/10 bg-rafin-panel p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center border border-rafin-gold/35 bg-rafin-gold/12 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-rafin-gold-soft">
        {brand.logoText}
      </div>
      <h3 className="mt-4 text-[1.65rem] text-white">{brand.name}</h3>
      <p className="mt-2 text-sm text-rafin-muted-light">{brand.description}</p>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white/55">
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
