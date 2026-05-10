import { ArrowUpRight, MapPin, Timer, Truck } from 'lucide-react';
import type { Product } from '../../data/catalog';
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
      return 'gold';
    case 'reserved':
    case 'sold':
    default:
      return 'red';
  }
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden border border-white/10 bg-rafin-panel shadow-panel">
      <div className="relative">
        <ImageWithFallback
          alt={product.title}
          className="h-52"
          imageClassName="transition duration-300 hover:scale-[1.03]"
          src={product.images[0]?.src}
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge tone={getAvailabilityTone(product.availability)}>{product.availability}</Badge>
          <Badge>{product.condition}</Badge>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-rafin-gold-soft">
              {product.brand} / {product.model}
            </p>
            <h3 className="mt-2 text-[1.65rem] text-white">{product.title}</h3>
          </div>
          <p className="max-w-[10rem] text-right text-sm font-bold uppercase tracking-[0.08em] text-white">
            {formatProductPrice(product)}
          </p>
        </div>

        <p className="mt-2 text-sm text-rafin-muted-light">{product.excerpt}</p>

        <div className="mt-4 grid gap-x-4 gap-y-2 sm:grid-cols-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-white/66">
            <Truck className="h-3.5 w-3.5 text-rafin-gold-soft" />
            <span>{product.year}</span>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-white/66">
            <MapPin className="h-3.5 w-3.5 text-rafin-gold-soft" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-white/66">
            <Timer className="h-3.5 w-3.5 text-rafin-gold-soft" />
            <span>
              {product.operatingHours
                ? `${product.operatingHours} h`
                : product.mileageKm
                  ? `${product.mileageKm} km`
                  : 'Inspection on request'}
            </span>
          </div>
          <div className="text-xs uppercase tracking-[0.08em] text-white/66">{product.subcategory}</div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.tags.slice(0, 3).map((tag) => (
            <span className="border border-white/10 px-2 py-1 text-[0.62rem] uppercase tracking-[0.08em] text-white/56" key={tag}>
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <InquiryButton fullWidth productId={product.id} />
          <Button className="w-full" size="sm" to={routes.product(product.categorySlug, product.slug)} variant="secondary">
            View Details
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}
