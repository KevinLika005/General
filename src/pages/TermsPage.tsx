import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function TermsPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t('metadata.terms.title'),
    description: t('metadata.terms.description'),
  });

  return (
    <section className="page-shell">
      <SectionHeader
        eyebrow={t('pages.terms.eyebrow')}
        title={t('pages.terms.title')}
        titleAs="h1"
        description={t('pages.terms.description')}
      />
      <div className="mt-8 border border-border bg-surface-card p-6 text-sm text-text-muted shadow-card">
        {t('pages.terms.body')}
      </div>
    </section>
  );
}
