import { ArrowLeft, ArrowRight, Phone, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/common/Button';
import { DataPlate } from '../components/common/DataPlate';
import { EmptyState } from '../components/common/EmptyState';
import { InquiryButton } from '../components/common/InquiryButton';
import { ProductCard } from '../components/common/ProductCard';
import { ProductGallery } from '../components/common/ProductGallery';
import { ProductSpecs } from '../components/common/ProductSpecs';
import { getCompanyProfile } from '../data/catalog';
import { useLanguage } from '../hooks/useLanguage';
import { usePageMetadata } from '../hooks/usePageMetadata';
import {
  getAdjacentProductsInCategory,
  getProductAvailabilityLabel,
  getProductBySlugs,
  getSimilarProducts,
  getTaxonomyLabelsForProduct,
} from '../utils/catalog';
import { getDataPlateCells } from '../utils/dataPlate';
import { formatProductPrice } from '../utils/formatPrice';
import { routes } from '../utils/routes';
import { NotFoundPage } from './NotFoundPage';

function availabilityTone(value: string) {
  if (value === 'available') return 'green';
  if (value === 'incoming') return 'amber';
  if (value === 'reserved') return 'slate';
  return 'red';
}

export function ProductDetailPage() {
  const { t } = useTranslation();
  const { categorySlug, productSlug } = useParams();
  const { language } = useLanguage();
  const companyProfile = getCompanyProfile();
  const product = categorySlug && productSlug ? getProductBySlugs(categorySlug, productSlug) : undefined;
  const relatedProducts = useMemo(() => (product ? getSimilarProducts(product) : []), [product]);
  const taxonomy = product ? getTaxonomyLabelsForProduct(product) : undefined;
  const { next, previous } =
    categorySlug && product
      ? getAdjacentProductsInCategory(categorySlug, product.id)
      : { next: undefined, previous: undefined };

  usePageMetadata({
    title: product ? `${product.title} | GENERAL TRADING` : t('metadata.productDetail.fallbackTitle'),
    description:
      product?.excerpt ??
      t('metadata.productDetail.fallbackDescription'),
    ogType: 'product',
  });

  if (!categorySlug || !productSlug || !product || !taxonomy) {
    return <NotFoundPage />;
  }

  const plateCells = getDataPlateCells(product, 'detail', language);
  const isSold = product.availability === 'sold';

  const technicalSpecs = [
    ...(product.enginePower ? [{ label: t('pages.productDetail.specs.enginePower'), value: product.enginePower }] : []),
    ...(product.weight ? [{ label: t('pages.productDetail.specs.operatingWeight'), value: product.weight }] : []),
    ...(product.capacity ? [{ label: t('pages.productDetail.specs.capacity'), value: product.capacity }] : []),
    ...(product.fuelType ? [{ label: t('pages.productDetail.specs.fuelType'), value: product.fuelType }] : []),
    ...(product.transmission ? [{ label: t('pages.productDetail.specs.transmission'), value: product.transmission }] : []),
    ...(product.unitOfMeasure ? [{ label: t('pages.productDetail.specs.unitOfMeasure'), value: product.unitOfMeasure }] : []),
    ...product.specs,
  ];

  const specRows = [
    { label: t('pages.productDetail.keyFacts.condition'), value: t(`common.status.${product.condition}`) },
    { label: t('common.labels.category'), value: `${taxonomy.subcategoryTitle} / ${taxonomy.productTypeTitle}` },
    { label: t('pages.productDetail.keyFacts.serialStock'), value: product.serialNumber ?? t('common.status.confirmedDuringInquiry') },
    ...technicalSpecs,
  ];

  const inspectionNotes =
    product.inspectionNotes ?? [t('pages.productDetail.inspectionNotesFallback')];
  const documents = product.documents ?? [];
  const isRequestOnlyDocument = (href: string) => href === routes.technicalLibrary;

  return (
    <>
      <section className="catalog-shell pt-5">
        <Breadcrumbs
          items={[
            { label: t('common.labels.home'), to: routes.home },
            { label: t('common.labels.equipment'), to: routes.equipment },
            { label: taxonomy.categoryTitle, to: routes.category(taxonomy.categorySlug) },
            { label: product.title },
          ]}
        />
      </section>

      <section className="catalog-shell pb-10 pt-4">
        <div className="grid gap-8 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <ProductGallery images={product.images} title={product.title} />
          </div>

          <aside className="xl:sticky xl:top-[calc(var(--header-offset)+1rem)] xl:col-span-5 xl:self-start">
            <p className="text-[0.875rem] text-text-muted">
              {product.brand} {product.model}
            </p>
            <h1 className="mt-1 text-[clamp(1.875rem,1.4rem+1.3vw,2.75rem)]">{product.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge tone={availabilityTone(product.availability)}>{getProductAvailabilityLabel(product.availability)}</Badge>
              {product.deal && !isSold ? <Badge tone="primary">{t('common.status.deal')}</Badge> : null}
              <span className="text-[0.8125rem] text-text-muted">SKU {product.sku}</span>
            </div>
            <p className="mt-4 font-display text-[1.75rem] font-semibold tabular-nums text-navy">{formatProductPrice(product)}</p>
            <div className="mt-4">
              <DataPlate cells={plateCells} variant="detail" />
            </div>
            <p className="text-measure mt-4 text-[0.9375rem] text-text-muted">{product.excerpt}</p>
            <div className="mt-5 grid gap-2 md:grid-cols-2">
              <InquiryButton disabled={isSold} fullWidth productId={product.id} />
              <Button className="w-full" to={routes.requestQuote} variant="secondary">
                {t('common.actions.requestQuote')}
              </Button>
            </div>
            {companyProfile.phone ? (
              <a
                className="mt-4 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-navy underline-offset-4 hover:underline"
                href={`tel:${companyProfile.phone.replace(/\s+/g, '')}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {companyProfile.phone}
              </a>
            ) : null}
            <p className="mt-3 text-[0.8125rem] text-text-muted">{t('pages.productDetail.inquiryActionsNote')}</p>
          </aside>
        </div>
      </section>

      <section className="catalog-shell pb-10">
        <div className="grid gap-8 xl:grid-cols-12">
          <div className="space-y-8 xl:col-span-7">
            <div>
              <h2 className="text-[1.25rem]">{t('pages.productDetail.inspectionHighlightsTitle')}</h2>
              <p className="text-measure mt-3 text-[0.9375rem] text-text-muted">{product.description}</p>
              <ul className="mt-4 grid gap-2">
                {product.keyFeatures.map((feature) => (
                  <li className="flex items-start gap-3 text-[0.9375rem] text-text" key={feature}>
                    <ShieldCheck aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <ProductSpecs specs={specRows} />
          </div>
          <div className="space-y-6 xl:col-span-5">
            <div className="surface-panel p-5">
              <h2 className="text-[1.125rem]">{t('pages.productDetail.inspectionNotesTitle')}</h2>
              <div className="mt-4 grid gap-3">
                {inspectionNotes.map((note) => (
                  <div className="rounded-md bg-surface-subtle p-3 text-sm text-text-muted" key={note}>
                    {note}
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5">
              <h2 className="text-[1.125rem]">{t('pages.productDetail.documentsTitle')}</h2>
              <div className="mt-4 grid gap-3">
                {documents.length > 0 ? (
                  documents.map((document) =>
                    isRequestOnlyDocument(document.href) ? (
                      <div className="rounded-md bg-surface-subtle p-3 text-sm text-text-muted" key={document.title}>
                        <p className="font-semibold text-navy">{document.title}</p>
                        <p className="mt-1 text-text-muted">
                          {document.kind ? t(`pages.productDetail.documentKinds.${document.kind}`) : t('common.status.document')}
                        </p>
                        <p className="mt-2 text-xs text-text-muted">{t('pages.productDetail.requestOnlyDocumentNote')}</p>
                        <Button className="mt-3 justify-center" to={routes.requestQuote} variant="secondary">
                          {t('common.actions.requestDocuments')}
                        </Button>
                      </div>
                    ) : (
                      <a
                        className="rounded-md bg-surface-subtle p-3 text-sm text-text-muted transition-colors hover:bg-surface-card"
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
                    ),
                  )
                ) : (
                  <div className="rounded-md bg-surface-subtle p-3 text-sm text-text-muted">
                    {t('pages.productDetail.documentsFallback')}
                  </div>
                )}
              </div>
            </div>

            <div className="surface-panel p-5">
              <h2 className="text-[1.125rem]">{t('pages.productDetail.deliveryContractTitle')}</h2>
              <div className="mt-4 grid gap-3">
                <div className="rounded-md bg-surface-subtle p-3 text-sm text-text-muted">
                  {t('pages.productDetail.deliveryContractPoints.0')}
                </div>
                <div className="rounded-md bg-surface-subtle p-3 text-sm text-text-muted">
                  {t('pages.productDetail.deliveryContractPoints.1')}
                </div>
                <Button className="justify-center" to={routes.requestQuote} variant="secondary">
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
        <h2 className="text-[clamp(1.5rem,1.1rem+1.1vw,2rem)]">{t('pages.productDetail.similarProductsTitle')}</h2>
        {relatedProducts.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
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
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface-card/95 px-4 py-3 backdrop-blur xl:hidden">
        <div className="wide-shell flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-semibold tabular-nums text-navy">{formatProductPrice(product)}</p>
          </div>
          {isSold ? (
            <span className="text-sm font-medium text-status-sold">{t('common.status.sold')}</span>
          ) : (
            <InquiryButton compact productId={product.id} />
          )}
          <Button size="sm" to={routes.requestQuote}>
            {t('common.actions.requestQuote')}
          </Button>
        </div>
      </div>
    </>
  );
}
