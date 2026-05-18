import { ClipboardList, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useInquiryList } from '../hooks/useInquiryList';
import { getProductAvailabilityLabel, getProductsByIds } from '../utils/catalog';
import { formatProductPrice } from '../utils/formatPrice';
import { routes } from '../utils/routes';

export function InquiryListPage() {
  const { t } = useTranslation();
  const { clearItems, items, removeItem, updateNotes, updateQuantity } = useInquiryList();
  const products = getProductsByIds(items.map((item) => item.productId));

  usePageMetadata({
    title: t('metadata.inquiryList.title'),
    description: t('metadata.inquiryList.description'),
  });

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <p className="kicker">{t('pages.inquiryList.eyebrow')}</p>
          <h1 className="mt-2 max-w-[20ch] text-[clamp(1.9rem,1.35rem+1.3vw,2.9rem)] leading-[1.02] text-navy">
            {t('pages.inquiryList.title')}
          </h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">
            {t('pages.inquiryList.description')}
          </p>
        </div>
      </section>

      <section className="catalog-shell pb-24">
        {products.length === 0 ? (
          <EmptyState
            actionLabel={t('common.actions.browseEquipment')}
            actionTo={routes.equipment}
            description={t('pages.inquiryList.empty.description')}
            secondaryActionLabel={t('common.actions.contactSales')}
            secondaryActionTo={routes.contact}
            title={t('pages.inquiryList.empty.title')}
          />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_clamp(19rem,22vw,22rem)]">
            <div className="space-y-4">
              {products.map((product) => {
                const item = items.find((entry) => entry.productId === product.id);

                return (
                  <article
                    className="grid gap-5 border border-border bg-surface-card p-4 shadow-card sm:grid-cols-[180px_minmax(0,1fr)]"
                    key={product.id}
                  >
                    <ImageWithFallback alt={product.title} aspectRatio="video" className="h-full" src={product.images[0]?.src} />
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="line-label">
                            {product.brand} / {product.model} / {product.sku}
                          </p>
                          <h2 className="mt-2 max-w-[24ch] text-[clamp(1.15rem,1rem+0.6vw,1.45rem)] text-navy">{product.title}</h2>
                          <p className="text-measure mt-2 text-sm text-text-muted">{product.excerpt}</p>
                        </div>
                        <button
                          aria-label={t('common.accessibility.removeProduct', { product: product.title })}
                          className="inline-flex h-10 w-10 items-center justify-center border border-border text-text-muted transition hover:border-primary hover:text-navy"
                          onClick={() => removeItem(product.id)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
                        <div className="bg-surface-subtle p-4">
                          <p className="line-label">{t('common.labels.priceMode')}</p>
                          <p className="mt-1 text-sm font-semibold text-navy">{formatProductPrice(product)}</p>
                          <p className="mt-1 text-xs text-text-muted">{getProductAvailabilityLabel(product.availability)}</p>
                        </div>
                        <label className="bg-surface-subtle p-4 text-sm text-text-muted">
                          {t('common.labels.quantity')}
                          <input
                            className="field mt-3"
                            min="1"
                            onChange={(event) => updateQuantity(product.id, Number(event.target.value))}
                            type="number"
                            value={item?.quantity ?? 1}
                          />
                        </label>
                        <div className="bg-surface-subtle p-4">
                          <p className="line-label">{t('common.labels.location')}</p>
                          <p className="mt-1 text-sm font-semibold text-navy">{product.location}</p>
                        </div>
                      </div>

                      <label className="mt-4 block text-sm text-text-muted">
                        {t('common.labels.productNotesForRafin')}
                        <textarea
                          className="field mt-3 min-h-[110px]"
                          onChange={(event) => updateNotes(product.id, event.target.value)}
                          placeholder={t('pages.inquiryList.notesPlaceholder')}
                          value={item?.notes ?? ''}
                        />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="space-y-5 xl:sticky xl:top-[8.65rem] xl:self-start">
              <div className="surface-panel p-5">
                <p className="kicker">{t('pages.inquiryList.summary.eyebrow')}</p>
                <h2 className="mt-2 text-[1.5rem] text-navy xl:text-[1.7rem]">{t('common.status.productLines', { count: items.length })}</h2>
                <p className="mt-3 text-sm text-text-muted">
                  {t('pages.inquiryList.summary.description')}
                </p>
                <div className="mt-5 grid gap-3">
                  <Button to={routes.requestQuote}>{t('common.actions.requestQuote')}</Button>
                  <Button onClick={clearItems} variant="secondary">
                    {t('common.actions.clearInquiryList')}
                  </Button>
                  <Button to={routes.equipment} variant="ghost">
                    {t('common.actions.continueBrowsing')}
                  </Button>
                </div>
              </div>

              <div className="surface-panel p-5">
                <div className="flex items-start gap-3">
                  <ClipboardList className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h2 className="text-xl text-navy">{t('pages.inquiryList.preparedTitle')}</h2>
                    <div className="mt-4 grid gap-3">
                      {(t('pages.inquiryList.preparedPoints', { returnObjects: true }) as string[]).map((point) => (
                        <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted" key={point}>
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
