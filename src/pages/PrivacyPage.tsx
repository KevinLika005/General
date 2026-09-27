import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../components/common/SectionHeader';

export function PrivacyPage() {
  const { t } = useTranslation();
  return (
    <section className="page-shell">
      <SectionHeader
        title={t('pages.privacy.title')}
        titleAs="h1"
        description={t('pages.privacy.description')}
      />
      <div className="mt-8 rounded-lg border border-border bg-surface-card p-6 text-sm text-text-muted">
        {t('pages.privacy.body')}
      </div>
    </section>
  );
}
