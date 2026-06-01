import { useTranslation } from 'react-i18next';
import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function FinancingContractsPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t('metadata.financingContracts.title'),
    description: t('metadata.financingContracts.description'),
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description={t('pages.financingContracts.description')}
          eyebrow={t('pages.financingContracts.eyebrow')}
          title={t('pages.financingContracts.title')}
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4 lg:grid-cols-3">
          {(t('pages.financingContracts.points', { returnObjects: true }) as string[]).map((item) => (
            <article className="toolbar-panel p-4 text-sm text-text-muted shadow-card" key={item}>
              {item}
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Button to={routes.requestQuote}>{t('common.actions.requestContractDiscussion')}</Button>
        </div>
      </section>
    </>
  );
}
