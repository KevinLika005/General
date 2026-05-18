import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Brand } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from './Button';

export function BrandCard({ brand }: { brand: Brand }) {
  const { t } = useTranslation();
  return (
    <article className="toolbar-panel mx-auto h-full w-full max-w-[18rem] p-4 transition duration-150 hover:border-primary hover:shadow-hover">
      <div className="inline-flex h-10 w-10 items-center justify-center border border-primary/25 bg-surface-subtle text-[0.68rem] font-bold uppercase tracking-[0.14em] text-navy">
        {brand.logoText}
      </div>
      <h3 className="mt-4 text-[1.2rem] text-navy">{brand.name}</h3>
      <p className="mt-2 text-sm text-text-muted">{brand.description}</p>
      <div className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-3">
        <span className="line-label">
          {t('common.status.listings', { count: brand.productCount })}
        </span>
        <Button size="sm" to={routes.equipmentWithBrand(brand.name)} variant="secondary">
          {t('common.actions.browse')}
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
