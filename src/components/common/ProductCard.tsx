import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/catalog';
import { useLanguage } from '../../hooks/useLanguage';
import { getProductAvailabilityLabel } from '../../utils/catalog';
import { getDataPlateCells } from '../../utils/dataPlate';
import { formatProductPrice } from '../../utils/formatPrice';
import { routes } from '../../utils/routes';
import { Badge } from './Badge';
import { DataPlate } from './DataPlate';
import { ImageWithFallback } from './ImageWithFallback';
import { InquiryButton } from './InquiryButton';

function getAvailabilityTone(availability: Product['availability']) {
  switch (availability) {
    case 'available':
      return 'green';
    case 'incoming':
      return 'amber';
    case 'reserved':
      return 'slate';
    case 'sold':
    default:
      return 'red';
  }
}

export function ProductCard({
  layout = 'grid',
  product,
}: {
  product: Product;
  layout?: 'grid' | 'list';
}) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isList = layout === 'list';
  const isSold = product.availability === 'sold';
  const cells = getDataPlateCells(product, 'card', language);

  return (
    <article
      className={[
        'group relative flex h-full overflow-hidden rounded-md border border-border bg-surface-card transition-shadow duration-150 hover:shadow-hover has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-focus',
        isList ? 'flex-row' : 'flex-row md:flex-col',
      ].join(' ')}
    >
      <div className={['relative shrink-0 self-start', isList ? 'w-[40%] md:w-64' : 'w-[40%] md:w-full'].join(' ')}>
        <ImageWithFallback
          alt={product.images[0]?.alt ?? product.title}
          aspectRatio="video"
          className="border-0"
          src={product.images[0]?.src}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          <Badge tone={getAvailabilityTone(product.availability)}>
            {getProductAvailabilityLabel(product.availability)}
          </Badge>
          {product.deal && !isSold ? <Badge tone="primary">{t('common.status.deal')}</Badge> : null}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2 p-3">
        <p className="truncate text-[0.8125rem] text-text-muted">
          {product.brand} {product.model}
        </p>
        <h3 className="line-clamp-2 font-sans text-[0.9375rem] font-semibold leading-snug text-navy">
          <Link
            className="after:absolute after:inset-0 after:content-[''] focus-visible:shadow-none"
            to={routes.product(product.categorySlug, product.slug)}
          >
            {product.title}
          </Link>
        </h3>
        <DataPlate cells={cells} variant="card" />
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="min-w-0 text-[0.9375rem] font-semibold leading-tight tabular-nums text-navy">
            {formatProductPrice(product)}
          </p>
          {isSold ? (
            <span className="text-[0.8125rem] font-medium text-status-sold">{t('common.status.sold')}</span>
          ) : (
            <InquiryButton className="relative z-10 shrink-0" compact productId={product.id} />
          )}
        </div>
      </div>
    </article>
  );
}
