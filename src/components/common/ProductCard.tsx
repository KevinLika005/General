import { ArrowUpRight, Gauge, MapPin, Tag, Timer, Truck } from 'lucide-react';
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
  return {
    year: String(product.year),
    usage: product.operatingHours
      ? `${product.operatingHours} h`
      : product.mileageKm
        ? `${product.mileageKm} km`
        : 'Inspection on request',
    keySpec: product.capacity ?? product.weight ?? product.enginePower ?? 'Commercial details on request',
  };
}

export function ProductCard({ product }: { product: Product }) {
  const specs = getCardSpecs(product);

  return (
    <article className={[
      'group overflow-hidden border bg-surface-card shadow-card transition duration-150 hover:border-primary hover:shadow-hover',
      product.availability === 'sold'
        ? 'border-status-sold/30'
        : product.availability === 'reserved'
          ? 'border-primary/35'
          : 'border-border',
    ].join(' ')}>
      <div className="relative">
        <ImageWithFallback
          alt={product.title}
          aspectRatio="wide"
          className="rounded-none border-x-0 border-t-0"
          imageClassName="transition duration-300 group-hover:scale-[1.02]"
          src={product.images[0]?.src}
        />
        <div className="absolute left-2 top-2 flex flex-wrap gap-1.5">
          <Badge tone={getAvailabilityTone(product.availability)}>
            {getProductAvailabilityLabel(product.availability)}
          </Badge>
          <Badge tone={product.condition === 'new' ? 'blue' : 'slate'}>{product.condition}</Badge>
          {product.deal ? <Badge tone="primary">Deal</Badge> : null}
        </div>
        {product.availability === 'sold' ? (
          <div className="absolute inset-x-0 bottom-0 bg-status-sold/95 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-white">
            Sold reference. Request a similar unit.
          </div>
        ) : product.availability === 'reserved' ? (
          <div className="absolute inset-x-0 bottom-0 bg-surface-blue/94 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.06em] text-white">
            Reserved while the current inquiry is under review.
          </div>
        ) : null}
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="line-label">
              {product.subcategory} | {product.sku}
            </p>
            <h3 className="mt-1.5 line-clamp-2 text-[1rem] leading-tight text-brand-navy md:text-[1.08rem]">
              {product.title}
            </h3>
            <p className="mt-1 text-[0.78rem] text-text-muted md:text-sm">
              {product.brand} / {product.model} / {product.year}
            </p>
          </div>
          <p className="max-w-[8rem] text-right text-[0.82rem] font-bold text-navy md:text-sm">
            {formatProductPrice(product)}
          </p>
        </div>

        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Truck className="h-3.5 w-3.5 text-primary" />
            <span>Year {specs.year}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Timer className="h-3.5 w-3.5 text-primary" />
            <span>{specs.usage}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <Gauge className="h-3.5 w-3.5 text-primary" />
            <span>{specs.keySpec}</span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {product.tags.slice(0, 2).map((tag) => (
            <span className="inline-flex items-center gap-1 border border-border bg-surface-subtle px-2 py-1 text-[0.7rem] text-text-muted" key={tag}>
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 grid gap-2 md:grid-cols-2">
          <InquiryButton disabled={product.availability === 'sold'} fullWidth productId={product.id} />
          <Button className="w-full" size="xs" to={routes.product(product.categorySlug, product.slug)} variant="secondary">
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
