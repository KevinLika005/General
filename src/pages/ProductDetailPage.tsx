import { ArrowLeft, ArrowRight, FileText, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { InquiryButton } from '../components/common/InquiryButton';
import { ProductCard } from '../components/common/ProductCard';
import { ProductGallery } from '../components/common/ProductGallery';
import { ProductSpecs } from '../components/common/ProductSpecs';
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
  const product = categorySlug && productSlug ? getProductBySlugs(categorySlug, productSlug) : undefined;
  const relatedProducts = useMemo(() => (product ? getSimilarProducts(product) : []), [product]);
  const { next, previous } =
    categorySlug && product
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

  const keyFacts = [
    { label: 'Brand / Model', value: `${product.brand} ${product.model}` },
    { label: 'Year', value: String(product.year) },
    { label: 'Condition', value: product.condition },
    { label: 'Availability', value: getProductAvailabilityLabel(product.availability) },
    {
      label: 'Hours / Mileage',
      value: product.operatingHours
        ? `${product.operatingHours} h`
        : product.mileageKm
          ? `${product.mileageKm} km`
          : 'Available during inquiry review',
    },
    { label: 'Location', value: product.location },
    { label: 'Serial / Stock', value: product.serialNumber ?? 'Confirmed during inquiry' },
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

  const inspectionNotes =
    product.inspectionNotes ?? ['Inspection notes can be shared directly during the inquiry review.'];
  const documents = product.documents ?? [];

  return (
    <>
      <section className="page-shell">
        <Breadcrumbs
          items={[
            { label: 'Home', to: routes.home },
            { label: 'Equipment', to: routes.equipment },
            { label: categorySlug.replace(/-/g, ' '), to: routes.category(categorySlug) },
            { label: product.title },
          ]}
        />
      </section>

      <section className="section-shell pb-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] 2xl:grid-cols-[1.02fr_0.92fr_0.62fr]">
          <div>
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <div className="space-y-5">
            <div className="surface-panel p-5">
              <div className="flex flex-wrap gap-2">
                <Badge tone={availabilityTone(product.availability)}>
                  {getProductAvailabilityLabel(product.availability)}
                </Badge>
                <Badge tone={conditionTone(product.condition)}>{product.condition}</Badge>
              </div>
              <p className="mt-4 line-label">
                {product.brand} / {product.model} / {product.year} / {product.sku}
              </p>
              <h1 className="mt-2 text-[1.8rem] leading-[1.08] text-navy sm:text-[2.15rem] xl:text-[2.45rem]">{product.title}</h1>
              <p className="mt-3 text-sm text-text-muted">{product.excerpt}</p>
              <p className="mt-3 text-sm text-text-muted">{product.description}</p>

              <div className="mt-5 grid gap-px border border-border bg-border md:grid-cols-2">
                {keyFacts.map((fact) => (
                  <div className="bg-surface-card px-4 py-3" key={fact.label}>
                    <p className="line-label">{fact.label}</p>
                    <p className="mt-1 text-sm font-semibold text-navy">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5">
              <p className="kicker">Inspection highlights</p>
              <h2 className="mt-2 text-[1.35rem] text-navy">Why buyers ask about this listing</h2>
              <div className="mt-4 grid gap-3">
                {product.keyFeatures.map((feature) => (
                  <div className="flex items-start gap-3 border border-border bg-surface-subtle p-4" key={feature}>
                    <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />
                    <p className="text-sm text-text-muted">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="xl:order-last xl:col-span-2 xl:sticky xl:top-[8.65rem] xl:self-start 2xl:col-span-1 2xl:order-none">
            <div className="surface-panel p-5">
              <p className="kicker">Inquiry actions</p>
              <p className="mt-2 text-2xl font-bold text-navy">{formatProductPrice(product)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={availabilityTone(product.availability)}>
                  {getProductAvailabilityLabel(product.availability)}
                </Badge>
                <Badge>{product.subcategory}</Badge>
              </div>

              <div className="mt-5 border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                Evaluate the unit here first. Final pricing, inspection scope, documentation, negotiation, and contract terms are handled directly after inquiry.
              </div>

              <div className="mt-5 grid gap-3">
                <InquiryButton disabled={product.availability === 'sold'} fullWidth productId={product.id} />
                <Button className="w-full" to={routes.requestQuote} variant="secondary">
                  Request Quote
                </Button>
              </div>

              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Inspection and pickup or delivery arrangements can be discussed for {product.location}.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <Wrench className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Add this item to the Inquiry List if you want one request covering several machines, parts, or attachments.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <FileText className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Need manuals or reference documents? Use the Technical Library or request them through the quote form.</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell pb-10">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.82fr]">
          <ProductSpecs specs={technicalSpecs} />

          <div className="space-y-6">
            <div className="surface-panel p-5">
              <h2 className="text-[1.3rem] text-navy">Inspection notes</h2>
              <div className="mt-4 grid gap-3">
                {inspectionNotes.map((note) => (
                  <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted" key={note}>
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5">
              <h2 className="text-[1.3rem] text-navy">Documents and support references</h2>
              <div className="mt-4 grid gap-3">
                {documents.length > 0 ? (
                  documents.map((document) => (
                    <a
                      className="border border-border bg-surface-subtle p-4 text-sm text-text-muted transition hover:border-primary"
                      href={document.href}
                      key={document.title}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <p className="font-semibold text-navy">{document.title}</p>
                      <p className="mt-1 text-text-muted">{document.kind ? document.kind.replace(/-/g, ' ') : 'Document'}</p>
                      <p className="mt-1 text-xs text-text-muted">Open document reference</p>
                    </a>
                  ))
                ) : (
                  <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                    Specific documents can be confirmed during the inquiry review, together with serial verification, service references, and commercial paperwork.
                  </div>
                )}
              </div>
            </div>

            <div className="surface-panel p-5">
              <h2 className="text-[1.3rem] text-navy">Delivery and contract path</h2>
              <div className="mt-4 grid gap-3">
                <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                  Ask about inspection appointments, operating video, or site review before agreement.
                </div>
                <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                  Final price, contract terms, bundled accessories, and delivery planning are handled company-to-company after inquiry.
                </div>
                <Button className="justify-center" to={routes.technicalLibrary} variant="secondary">
                  Request Documents
                </Button>
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
            <Button to={routes.category(categorySlug)} variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Back to Category
            </Button>
          )}
          {next ? (
            <Button to={routes.product(next.categorySlug, next.slug)} variant="secondary">
              Next Product
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button to={routes.equipment} variant="secondary">
              Continue Browsing
            </Button>
          )}
        </div>
      </section>

      <section className="section-shell pb-24">
        <h2 className="text-[1.8rem] text-navy">Similar products</h2>
        {relatedProducts.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              actionLabel="Browse Equipment"
              actionTo={routes.equipment}
              description="No similar products are currently listed for this unit. Continue browsing the full catalog or request sourcing support."
              secondaryActionLabel="Request Quote"
              secondaryActionTo={routes.requestQuote}
              title="No similar products available right now"
            />
          </div>
        )}
      </section>

      <div className="h-24 xl:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface-page/95 px-4 py-3 backdrop-blur xl:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">Inquiry action</p>
            <p className="truncate text-base font-semibold text-navy">{formatProductPrice(product)}</p>
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
