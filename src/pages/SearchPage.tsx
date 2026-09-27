import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { SectionHeader } from '../components/common/SectionHeader';
import { SiteSearch } from '../components/search/SiteSearch';
import { SearchResultsList } from '../components/search/SearchResultsList';
import { getSearchTypeCounts, searchSite } from '../utils/siteSearch';
import { normalizeText } from '../utils/filters';
import { routes } from '../utils/routes';

export function SearchPage() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') ?? searchParams.get('query') ?? '';
  const [searchValue, setSearchValue] = useState(queryFromUrl);

  useEffect(() => {
    setSearchValue(queryFromUrl);
  }, [queryFromUrl]);

  const normalizedQuery = useMemo(() => normalizeText(queryFromUrl), [queryFromUrl]);
  const results = normalizedQuery ? searchSite(queryFromUrl) : [];
  const typeCounts = getSearchTypeCounts(results);

  const submitQuery = (query: string) => {
    const nextQuery = query.trim();

    if (!nextQuery) {
      setSearchParams({}, { replace: false });
      return;
    }

    setSearchParams({ q: nextQuery }, { replace: false });
  };

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description={t('pages.search.description')}
          title={t('pages.search.title')}
          titleAs="h1"
        />

        <div className="mt-6 surface-panel p-4 sm:p-5">
          <SiteSearch
            buttonLabel={t('common.actions.search')}
            maxSuggestions={6}
            onChange={setSearchValue}
            onSubmitQuery={submitQuery}
            placeholder={t('pages.search.searchPlaceholder')}
            value={searchValue}
          />
        </div>
      </section>

      <section className="section-shell pb-24">
        {normalizedQuery ? (
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-surface-card px-4 py-4 md:px-5">
            <div>
              <p className="line-label">{t('pages.search.queryLabel')}</p>
              <h2 className="mt-2 text-xl text-navy sm:text-2xl">{t('pages.search.queryValue', { query: queryFromUrl })}</h2>
              <p className="mt-2 text-sm text-text-muted">
                {t('pages.search.resultCount', { count: results.length })}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {typeCounts.product > 0 ? <Badge tone="primary">{t('pages.search.countByType.product', { count: typeCounts.product })}</Badge> : null}
              {typeCounts.category > 0 ? <Badge tone="blue">{t('pages.search.countByType.category', { count: typeCounts.category })}</Badge> : null}
              {typeCounts.service > 0 ? <Badge tone="green">{t('pages.search.countByType.service', { count: typeCounts.service })}</Badge> : null}
              {typeCounts.solution > 0 ? <Badge tone="amber">{t('pages.search.countByType.solution', { count: typeCounts.solution })}</Badge> : null}
              {typeCounts.page > 0 ? <Badge tone="slate">{t('pages.search.countByType.page', { count: typeCounts.page })}</Badge> : null}
            </div>
          </div>
        ) : null}

        {!normalizedQuery ? (
          <EmptyState
            actionLabel={t('common.actions.browseCatalog')}
            actionTo={routes.equipment}
            description={t('pages.search.emptyDescription')}
            title={t('pages.search.emptyTitle')}
          />
        ) : results.length === 0 ? (
          <EmptyState
            actionLabel={t('common.actions.browseCatalog')}
            actionTo={routes.equipment}
            description={t('pages.search.noResultsDescription', { query: queryFromUrl })}
            secondaryActionLabel={t('common.actions.contactSales')}
            secondaryActionTo={routes.contact}
            title={t('pages.search.noResultsTitle')}
          />
        ) : (
          <SearchResultsList results={results} />
        )}
      </section>
    </>
  );
}
