import { ArrowLeft, ArrowRight, FileText, MapPin, Phone, ShieldCheck, Wrench } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { InquiryButton } from '../components/common/InquiryButton';
import { ProductCard } from '../components/common/ProductCard';
import { companyProfile } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import {
  getAdjacentProductsInCategory,
  getProductAvailabilityLabel,
  getProductBySlugs,
  getSimilarProducts,
} from '../utils/catalog';
import { formatProductPrice } from '../utils/formatPrice';
import { routes } from '../utils/routes';
import { NotFoundPage } from './NotFoundPage';

function availabilityTone(value: string) {
  if (value === 'available') return 'green';
  if (value === 'incoming') return 'amber';
  if (value === 'reserved') return 'slate';
  return 'red';
}

function conditionTone(value: string) {
  return value === 'new' ? 'blue' : 'slate';
}

export function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const product = categorySlug && productSlug ? getProductBySlugs(categorySlug, productSlug) : undefined;
  const relatedProducts = useMemo(() => (product ? getSimilarProducts(product) : []), [product]);
  const { next, previous } = categorySlug && product
    ? getAdjacentProductsInCategory(categorySlug, product.id)
    : { next: undefined, previous: undefined };

  usePageMetadata({
    title: product ? `${product.title} | Rafin Machinery` : 'Product Detail | Rafin Machinery',
    description:
      product?.excerpt ??
      'Review product specifications, availability, documents, and inquiry options in the Rafin Machinery catalog.',
    ogType: 'product',
  });

  if (!categorySlug || !productSlug || !product) {
    return <NotFoundPage />;
  }

  const activeImage = product.images[activeImageIndex] ?? product.images[0];

  const keyFacts = [
    { label: 'Brand / Model', value: `${product.brand} ${product.model}` },
    { label: 'Year', value: String(product.year) },
    { label: 'Condition', value: product.condition },
    { label: 'Availability', value: product.availability },
    {
      label: 'Hours / Mileage',
      value: product.operatingHours ? `${product.operatingHours} h` : product.mileageKm ? `${product.mileageKm} km` : 'On request',
    },
    { label: 'Location', value: product.location },
    { label: 'Serial / Stock', value: product.serialNumber ?? 'Available on request' },
    { label: 'Category', value: product.subcategory },
  ];

  const technicalSpecs = [
    ...(product.enginePower ? [{ label: 'Engine Power', value: product.enginePower }] : []),
    ...(product.weight ? [{ label: 'Operating Weight', value: product.weight }] : []),
    ...(product.capacity ? [{ label: 'Capacity', value: product.capacity }] : []),
    ...(product.fuelType ? [{ label: 'Fuel Type', value: product.fuelType }] : []),
    ...(product.transmission ? [{ label: 'Transmission', value: product.transmission }] : []),
    ...product.specs,
  ];

  return (
    <>
      <section className="page-shell">
        <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <Link to={routes.home}>Home</Link>
          <span>/</span>
          <Link to={routes.equipment}>Catalog</Link>
          <span>/</span>
          <Link to={routes.category(categorySlug)}>{categorySlug.replace(/-/g, ' ')}</Link>
          <span>/</span>
          <span className="text-brand-navy">{product.title}</span>
        </div>
      </section>

      <section className="section-shell pb-10">
        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.8fr_0.65fr]">
          <div>
            <ImageWithFallback
              alt={activeImage?.alt ?? product.title}
              aspectRatio="video"
              className="min-h-[360px] rounded-3xl"
              loading="eager"
              src={activeImage?.src}
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {product.images.map((image, index) => (
                <button
                  aria-label={`View product image ${index + 1} of ${product.images.length}`}
                  className={[
                    'overflow-hidden rounded-2xl border transition',
                    index === activeImageIndex ? 'border-brand-gold shadow-card' : 'border-border',
                  ].join(' ')}
                  key={image.src}
                  onClick={() => setActiveImageIndex(index)}
                  type="button"
                >
                  <ImageWithFallback alt={image.alt} aspectRatio="video" className="rounded-none" src={image.src} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-panel p-6 sm:p-7">
              <div className="flex flex-wrap gap-2">
                <Badge tone={availabilityTone(product.availability)}>
                  {getProductAvailabilityLabel(product.availability)}
                </Badge>
                <Badge tone={conditionTone(product.condition)}>{product.condition}</Badge>
              </div>
              <p className="mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                {product.brand} / {product.model} / {product.year}
              </p>
              <h1 className="mt-3 text-[2.8rem] text-brand-navy sm:text-[3.5rem]">{product.title}</h1>
              <p className="mt-4 text-base text-text-muted">{product.description}</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {keyFacts.map((fact) => (
                  <div className="rounded-2xl border border-border bg-surface-subtle p-4" key={fact.label}>
                    <p className="text-xs uppercase tracking-[0.14em] text-text-muted">{fact.label}</p>
                    <p className="mt-2 text-base font-semibold text-brand-navy">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-panel p-6">
              <h2 className="text-2xl text-brand-navy">Overview</h2>
              <p className="mt-3 text-text-muted">{product.excerpt}</p>
              <div className="mt-5 grid gap-3">
                {product.keyFeatures.map((feature) => (
                  <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-subtle p-4" key={feature}>
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-gold" />
                    <p className="text-sm text-text-muted">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="xl:sticky xl:top-28 xl:self-start">
            <div className="surface-panel p-6">
              <p className="eyebrow">Inquiry panel</p>
              <p className="mt-3 text-3xl font-bold text-brand-navy">{formatProductPrice(product)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={availabilityTone(product.availability)}>
                  {getProductAvailabilityLabel(product.availability)}
                </Badge>
                <Badge>{product.subcategory}</Badge>
              </div>

              <div className="mt-6 grid gap-3">
                <InquiryButton disabled={product.availability === 'sold'} fullWidth productId={product.id} />
                <Button className="w-full" to={routes.requestQuote} variant="secondary">
                  Request Quote
                </Button>
                <Button className="w-full" to={routes.requestQuote} variant="secondary">
                  Request Contract
                </Button>
                <a
                  className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-surface-subtle px-5 py-3 text-sm font-semibold text-brand-navy transition hover:border-brand-gold"
                  href={`tel:${companyProfile.phone}`}
                >
                  <Phone className="h-4 w-4" />
                  Call Sales
                </a>
              </div>

              <div className="mt-6 space-y-3 border-t border-border pt-6">
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 text-brand-gold" />
                  <span>Inspection and pickup/delivery arrangements can be discussed for {product.location}.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <Wrench className="mt-0.5 h-4 w-4 text-brand-gold" />
                  <span>Add this item to the Inquiry List first if you need multiple machines or bundled parts in one request.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <FileText className="mt-0.5 h-4 w-4 text-brand-gold" />
                  <span>Documentation, invoice flow, and contract terms are handled directly with Rafin after inquiry.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell pb-10">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
          <div className="surface-panel overflow-hidden">
            <div className="border-b border-border px-6 py-5">
              <h2 className="text-2xl text-brand-navy">Technical specifications</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <tbody className="divide-y divide-border">
                  {technicalSpecs.map((spec) => (
                    <tr key={`${spec.label}-${spec.value}`}>
                      <th className="bg-surface-subtle px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                        {spec.label}
                      </th>
                      <td className="px-6 py-4 text-sm text-text-muted">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="surface-panel p-6">
              <h2 className="text-2xl text-brand-navy">Inspection notes</h2>
              <div className="mt-4 grid gap-3">
                {(product.inspectionNotes ?? ['Detailed inspection notes can be provided during the inquiry process.']).map((note) => (
                  <div className="rounded-2xl border border-border bg-surface-subtle p-4 text-sm text-text-muted" key={note}>
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-panel p-6">
              <h2 className="text-2xl text-brand-navy">Documents</h2>
              <div className="mt-4 grid gap-3">
                {(product.documents ?? []).length > 0 ? (
                  (product.documents ?? []).map((document) => (
                    <div className="rounded-2xl border border-border bg-surface-subtle p-4 text-sm text-text-muted" key={document.title}>
                      <p className="font-semibold text-brand-navy">{document.title}</p>
                      <p className="mt-1 text-text-muted">{document.kind ? document.kind.replace(/-/g, ' ') : 'Document'}</p>
                      <p className="mt-1 text-xs text-text-muted">{document.href}</p>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                    Commercial and machine documentation is confirmed during the inquiry review.
                  </div>
                )}
              </div>
            </div>

            <div className="surface-panel p-6">
              <h2 className="text-2xl text-brand-navy">Delivery, inspection, and contract information</h2>
              <div className="mt-4 grid gap-3">
                <div className="rounded-2xl border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                  Delivery scope, transport planning, and export handling can be discussed directly after inquiry.
                </div>
                <div className="rounded-2xl border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                  Final price, contract terms, and commercial documents are confirmed directly with Rafin during the company-to-company process.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {previous ? (
            <Button to={routes.product(previous.categorySlug, previous.slug)} variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Previous Product
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button to={routes.product(next.categorySlug, next.slug)} variant="secondary">
              Next Product
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </section>

      <section className="section-shell pb-24">
        <h2 className="text-[2.3rem] text-brand-navy">Similar products</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>

      <div className="h-24 xl:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface-page/95 px-4 py-3 backdrop-blur xl:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.14em] text-text-muted">Inquiry action</p>
            <p className="truncate text-base font-semibold text-brand-navy">{formatProductPrice(product)}</p>
          </div>
          <InquiryButton compact disabled={product.availability === 'sold'} productId={product.id} />
          <Button size="sm" to={routes.requestQuote}>
            Request Quote
          </Button>
        </div>
      </div>
    </>
  );
}
