import { ArrowLeft, ArrowRight, FileText, MapPin, ShieldCheck, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
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
  getTaxonomyLabelsForProduct,
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
  const { t } = useTranslation();
  const { categorySlug, productSlug } = useParams();
  const product = categorySlug && productSlug ? getProductBySlugs(categorySlug, productSlug) : undefined;
  const relatedProducts = useMemo(() => (product ? getSimilarProducts(product) : []), [product]);
  const taxonomy = product ? getTaxonomyLabelsForProduct(product) : undefined;
  const { next, previous } =
    categorySlug && product
      ? getAdjacentProductsInCategory(categorySlug, product.id)
      : { next: undefined, previous: undefined };

  usePageMetadata({
    title: product ? `${product.title} | Rafin Machinery` : t('metadata.productDetail.fallbackTitle'),
    description:
      product?.excerpt ??
      t('metadata.productDetail.fallbackDescription'),
    ogType: 'product',
  });

  if (!categorySlug || !productSlug || !product || !taxonomy) {
    return <NotFoundPage />;
  }

  const usageFact =
    product.operatingHours !== undefined
      ? `${product.operatingHours} h`
      : product.mileageKm !== undefined
        ? `${product.mileageKm} km`
        : product.unitOfMeasure
          ? product.unitOfMeasure
          : t('common.status.availableDuringInquiryReview');

  const keyFacts = [
    { label: t('pages.productDetail.keyFacts.brandModel'), value: `${product.brand} ${product.model}` },
    { label: t('common.labels.year'), value: String(product.year) },
    { label: t('pages.productDetail.keyFacts.condition'), value: t(`common.status.${product.condition}`) },
    { label: t('pages.productDetail.keyFacts.availability'), value: getProductAvailabilityLabel(product.availability) },
    {
      label:
        product.operatingHours !== undefined
          ? t('pages.productDetail.keyFacts.operatingHours')
          : product.mileageKm !== undefined
            ? t('pages.productDetail.keyFacts.mileage')
            : product.unitOfMeasure
              ? t('pages.productDetail.keyFacts.unitOfMeasure')
              : t('pages.productDetail.keyFacts.usageUnit'),
      value: usageFact,
    },
    { label: t('common.labels.location'), value: product.location },
    { label: t('pages.productDetail.keyFacts.serialStock'), value: product.serialNumber ?? t('common.status.confirmedDuringInquiry') },
    { label: t('common.labels.category'), value: `${taxonomy.subcategoryTitle} / ${taxonomy.productTypeTitle}` },
  ];

  const technicalSpecs = [
    ...(product.enginePower ? [{ label: t('pages.productDetail.specs.enginePower'), value: product.enginePower }] : []),
    ...(product.weight ? [{ label: t('pages.productDetail.specs.operatingWeight'), value: product.weight }] : []),
    ...(product.capacity ? [{ label: t('pages.productDetail.specs.capacity'), value: product.capacity }] : []),
    ...(product.fuelType ? [{ label: t('pages.productDetail.specs.fuelType'), value: product.fuelType }] : []),
    ...(product.transmission ? [{ label: t('pages.productDetail.specs.transmission'), value: product.transmission }] : []),
    ...(product.unitOfMeasure ? [{ label: t('pages.productDetail.specs.unitOfMeasure'), value: product.unitOfMeasure }] : []),
    ...product.specs,
  ];

  const inspectionNotes =
    product.inspectionNotes ?? [t('pages.productDetail.inspectionNotesFallback')];
  const documents = product.documents ?? [];

  return (
    <>
      <section className="page-shell">
        <Breadcrumbs
          items={[
            { label: t('common.labels.home'), to: routes.home },
            { label: t('common.labels.equipment'), to: routes.equipment },
            { label: taxonomy.categoryTitle, to: routes.category(taxonomy.categorySlug) },
            { label: product.title },
          ]}
        />
      </section>

      <section className="catalog-shell pb-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] 3xl:grid-cols-[minmax(0,0.98fr)_minmax(0,0.76fr)_clamp(19rem,20vw,23rem)]">
          <div>
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <div className="space-y-5">
            <div className="surface-panel p-5">
              <div className="flex flex-wrap gap-2">
                <Badge tone={availabilityTone(product.availability)}>
                  {getProductAvailabilityLabel(product.availability)}
                </Badge>
                <Badge tone={conditionTone(product.condition)}>{t(`common.status.${product.condition}`)}</Badge>
                <Badge>{taxonomy.productTypeTitle}</Badge>
              </div>
              <p className="mt-4 line-label">
                {product.brand} / {product.model} / {product.year} / {product.sku}
              </p>
              <h1 className="mt-2 max-w-[18ch] text-[clamp(1.85rem,1.35rem+1.3vw,2.85rem)] leading-[1.02] text-navy">
                {product.title}
              </h1>
              <p className="text-measure mt-3 text-sm text-text-muted">{product.excerpt}</p>
              <p className="text-measure mt-3 text-sm text-text-muted">{product.description}</p>

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
              <p className="kicker">{t('pages.productDetail.inspectionHighlightsEyebrow')}</p>
              <h2 className="mt-2 text-[clamp(1.3rem,1rem+0.7vw,1.6rem)] text-navy">
                {t('pages.productDetail.inspectionHighlightsTitle')}
              </h2>
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

          <aside className="xl:order-last xl:col-span-2 xl:sticky xl:top-[8.65rem] xl:self-start 3xl:col-span-1 3xl:order-none">
            <div className="surface-panel p-5">
              <p className="kicker">{t('pages.productDetail.inquiryActionsEyebrow')}</p>
              <p className="mt-2 text-2xl font-bold text-navy">{formatProductPrice(product)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge tone={availabilityTone(product.availability)}>
                  {getProductAvailabilityLabel(product.availability)}
                </Badge>
                <Badge>{taxonomy.productTypeTitle}</Badge>
              </div>

              <div className="mt-5 border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                {t('pages.productDetail.inquiryActionsNote')}
              </div>

              <div className="mt-5 grid gap-3">
                <InquiryButton disabled={product.availability === 'sold'} fullWidth productId={product.id} />
                <Button className="w-full" to={routes.requestQuote} variant="secondary">
                  {t('common.actions.requestQuote')}
                </Button>
              </div>

              <div className="mt-5 space-y-3 border-t border-border pt-5">
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{t('pages.productDetail.sideNotes.location', { location: product.location })}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <Wrench className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{t('pages.productDetail.sideNotes.inquiryList')}</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-text-muted">
                  <FileText className="mt-0.5 h-4 w-4 text-primary" />
                  <span>{t('pages.productDetail.sideNotes.documents')}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="catalog-shell pb-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(19rem,0.82fr)]">
          <ProductSpecs specs={technicalSpecs} />

          <div className="space-y-6">
            <div className="surface-panel p-5">
              <h2 className="text-[1.3rem] text-navy">{t('pages.productDetail.inspectionNotesTitle')}</h2>
              <div className="mt-4 grid gap-3">
                {inspectionNotes.map((note) => (
                  <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted" key={note}>
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5">
              <h2 className="text-[1.3rem] text-navy">{t('pages.productDetail.documentsTitle')}</h2>
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
                      <p className="mt-1 text-text-muted">
                        {document.kind ? t(`pages.productDetail.documentKinds.${document.kind}`) : t('common.status.document')}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">{t('common.status.openDocumentReference')}</p>
                    </a>
                  ))
                ) : (
                  <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                    {t('pages.productDetail.documentsFallback')}
                  </div>
                )}
              </div>
            </div>

            <div className="surface-panel p-5">
              <h2 className="text-[1.3rem] text-navy">{t('pages.productDetail.deliveryContractTitle')}</h2>
              <div className="mt-4 grid gap-3">
                <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                  {t('pages.productDetail.deliveryContractPoints.0')}
                </div>
                <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted">
                  {t('pages.productDetail.deliveryContractPoints.1')}
                </div>
                <Button className="justify-center" to={routes.technicalLibrary} variant="secondary">
                  {t('common.actions.requestDocuments')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="catalog-shell pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {previous ? (
            <Button to={routes.product(previous.categorySlug, previous.slug)} variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              {t('pages.productDetail.previousProduct')}
            </Button>
          ) : (
            <Button to={routes.category(taxonomy.categorySlug)} variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              {t('pages.productDetail.backToCategory')}
            </Button>
          )}
          {next ? (
            <Button to={routes.product(next.categorySlug, next.slug)} variant="secondary">
              {t('pages.productDetail.nextProduct')}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button to={routes.equipment} variant="secondary">
              {t('common.actions.continueBrowsing')}
            </Button>
          )}
        </div>
      </section>

      <section className="catalog-shell pb-24">
        <h2 className="text-[clamp(1.6rem,1.2rem+0.9vw,2rem)] text-navy">{t('pages.productDetail.similarProductsTitle')}</h2>
        {relatedProducts.length > 0 ? (
          <div className="product-grid mt-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              actionLabel={t('common.actions.browseEquipment')}
              actionTo={routes.equipment}
              description={t('pages.productDetail.noSimilarProducts.description')}
              secondaryActionLabel={t('common.actions.requestQuote')}
              secondaryActionTo={routes.requestQuote}
              title={t('pages.productDetail.noSimilarProducts.title')}
            />
          </div>
        )}
      </section>

      <div className="h-24 xl:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface-page/95 px-4 py-3 backdrop-blur xl:hidden">
        <div className="wide-shell flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.12em] text-text-muted">{t('common.labels.inquiryAction')}</p>
            <p className="truncate text-base font-semibold text-navy">{formatProductPrice(product)}</p>
          </div>
          <InquiryButton compact disabled={product.availability === 'sold'} productId={product.id} />
          <Button size="sm" to={routes.requestQuote}>
            {t('common.actions.requestQuote')}
          </Button>
        </div>
      </div>
    </>
  );
}
