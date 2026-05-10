import { ArrowUpRight, MapPin, Tag, Timer, Truck } from 'lucide-react';
import type { Product } from '../../data/catalog';
import { getProductAvailabilityLabel } from '../../utils/catalog';
import { formatProductPrice } from '../../utils/formatPrice';
import { routes } from '../../utils/routes';
import { Badge } from './Badge';
import { Button } from './Button';
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

function getCardSpecs(product: Product) {
  return [
    String(product.year),
    product.operatingHours ? `${product.operatingHours} h` : product.mileageKm ? `${product.mileageKm} km` : undefined,
    product.enginePower ?? product.weight ?? product.capacity,
  ].filter(Boolean) as string[];
}

export function ProductCard({ product }: { product: Product }) {
  const specs = getCardSpecs(product);

  return (
    <article className={[
      'group overflow-hidden rounded-3xl border bg-surface-card shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-hover',
      product.availability === 'sold' ? 'border-status-sold/30' : 'border-border',
    ].join(' ')}>
      <div className="relative">
        <ImageWithFallback
          alt={product.title}
          aspectRatio="video"
          className="rounded-none"
          imageClassName="transition duration-300 hover:scale-[1.03]"
          src={product.images[0]?.src}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone={getAvailabilityTone(product.availability)}>
            {getProductAvailabilityLabel(product.availability)}
          </Badge>
          <Badge tone={product.condition === 'new' ? 'blue' : 'slate'}>{product.condition}</Badge>
          {product.deal ? <Badge tone="gold">Deal</Badge> : null}
        </div>
        {product.availability === 'sold' ? (
          <div className="absolute inset-x-0 bottom-0 bg-status-sold/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white">
            Sold reference. Request a similar unit.
          </div>
        ) : null}
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-gold">
              {product.subcategory}
            </p>
            <h3 className="mt-2 line-clamp-2 text-[1.2rem] leading-tight text-brand-navy">
              {product.title}
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              {product.brand} {product.model}
            </p>
          </div>
          <p className="max-w-[9rem] text-right text-sm font-bold text-brand-navy">
            {formatProductPrice(product)}
          </p>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Truck className="h-3.5 w-3.5 text-brand-gold" />
            <span>{specs[0] ?? 'On request'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <MapPin className="h-3.5 w-3.5 text-brand-gold" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Timer className="h-3.5 w-3.5 text-brand-gold" />
            <span>{specs[1] ?? 'Inspection on request'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Tag className="h-3.5 w-3.5 text-brand-gold" />
            <span>{specs[2] ?? 'Contract-ready listing'}</span>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.slice(0, 2).map((tag) => (
            <span className="rounded-full border border-border bg-surface-subtle px-2.5 py-1 text-[0.72rem] text-text-muted" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <InquiryButton disabled={product.availability === 'sold'} fullWidth productId={product.id} />
          <Button className="w-full" size="sm" to={routes.product(product.categorySlug, product.slug)} variant="secondary">
            Details
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
