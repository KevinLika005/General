import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../components/common/SectionHeader';

export function TermsPage() {
  const { t } = useTranslation();
  return (
    <section className="page-shell">
      <SectionHeader
        title={t('pages.terms.title')}
        titleAs="h1"
        description={t('pages.terms.description')}
      />
      <div className="mt-8 rounded-lg border border-border bg-surface-card p-6 text-sm text-text-muted">
        {t('pages.terms.body')}
      </div>
    </section>
  );
}
