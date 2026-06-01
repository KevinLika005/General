import { ArrowUpRight, MapPin, Timer, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Product } from '../../../data/catalog';
import {
  getProductAvailabilityLabel,
  getTaxonomyLabelsForProduct,
} from '../../../utils/catalog';
import { formatProductPrice } from '../../../utils/formatPrice';
import { routes } from '../../../utils/routes';
import { Badge } from '../../common/Badge';
import { ImageWithFallback } from '../../common/ImageWithFallback';

function getAvailabilityTone(availability: Product['availability']) {
  return availability === 'available' ? 'green' : 'amber';
}

export function HomepageStockPreviewCard({ product }: { product: Product }) {
  const { t } = useTranslation();
  const taxonomy = getTaxonomyLabelsForProduct(product);
  const productRoute = routes.product(product.categorySlug, product.slug);

  return (
    <Link
      className="group flex h-full flex-col overflow-hidden border border-border bg-surface-card shadow-card transition duration-200 hover:border-primary hover:shadow-hover"
      to={productRoute}
    >
      <div className="relative">
        <ImageWithFallback
          alt={product.title}
          aspectRatio="wide"
          className="rounded-none border-x-0 border-t-0"
          imageClassName="transition duration-300 group-hover:scale-[1.02]"
          src={product.images[0]?.src}
        />
        <div className="absolute left-3 top-3">
          <Badge tone={getAvailabilityTone(product.availability)}>
            {getProductAvailabilityLabel(product.availability)}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-label">{taxonomy.productTypeTitle}</p>
        <h3 className="mt-2 line-clamp-2 text-[1.08rem] text-navy">{product.title}</h3>
        <p className="mt-1 text-sm text-text-muted">
          {product.brand} / {product.model}
        </p>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-primary" />
            {t('common.status.year', { value: product.year })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            {product.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Timer className="h-3.5 w-3.5 text-primary" />
            {product.operatingHours !== undefined
              ? `${product.operatingHours} h`
              : product.mileageKm !== undefined
                ? `${product.mileageKm} km`
                : t('common.status.availableDuringInquiryReview')}
          </span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-border pt-4">
          <div>
            <p className="text-lg font-semibold text-navy">{formatProductPrice(product)}</p>
            <p className="text-xs text-text-muted">{taxonomy.categoryTitle}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-navy">
            {t('common.actions.viewDetails')}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
