import { useTranslation } from 'react-i18next';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { CatalogResults } from '../components/common/CatalogResults';
import { SearchBar } from '../components/common/SearchBar';
import { getProducts } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useCatalogFilters } from '../hooks/useCatalogFilters';
import { routes } from '../utils/routes';

export function DealsPage() {
  const { t } = useTranslation();
  const products = getProducts();
  usePageMetadata({
    title: t('metadata.deals.title'),
    description: t('metadata.deals.description'),
  });

  const availableOrDealProducts = products.filter(
    (product) =>
      product.availability !== 'sold' &&
      (product.deal || product.availability === 'available' || product.availability === 'incoming'),
  );
  const catalog = useCatalogFilters(availableOrDealProducts);
  const { clearAllFilters, filteredProducts, filters, setFilters } = catalog;

  return (
    <>
      <section className="wide-shell pb-4 pt-5">
        <Breadcrumbs items={[{ label: t('common.labels.home'), to: routes.home }, { label: t('pages.deals.eyebrow') }]} />
        <div className="mt-3 flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <h1 className="text-[clamp(1.875rem,1.4rem+1.3vw,2.75rem)]">{t('pages.deals.eyebrow')}</h1>
          <div className="w-full xl:max-w-md">
            <SearchBar
              buttonLabel={t('common.actions.searchAvailableStock')}
              compact
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              onSubmit={() => undefined}
              placeholder={t('pages.deals.searchPlaceholder')}
              value={filters.search}
            />
          </div>
        </div>
      </section>

      <section className="wide-shell pb-20">
        <CatalogResults
          catalog={catalog}
          clearLabel={t('common.actions.clearFilters')}
          emptyState={
            <EmptyState
              actionLabel={t('common.actions.clearFilters')}
              description={t('pages.deals.noResults.description')}
              onAction={clearAllFilters}
              secondaryActionLabel={t('common.actions.browseEquipment')}
              secondaryActionTo={routes.equipment}
              title={t('pages.deals.noResults.title')}
            />
          }
          footer={
            <div className="mt-10 rounded-lg bg-surface-dark p-6 text-text-on-dark md:p-8">
              <h2 className="max-w-[26ch] text-[clamp(1.375rem,1rem+0.8vw,1.75rem)] text-text-on-dark">{t('pages.deals.cta.title')}</h2>
              <p className="text-measure mt-3 text-[0.9375rem] text-text-on-dark/75">{t('pages.deals.cta.description')}</p>
            </div>
          }
          mobileFiltersLabel={t('pages.deals.mobileFiltersLabel')}
          resultLabel={t('common.status.matchingItems', { count: filteredProducts.length })}
        />
      </section>
    </>
  );
}
