import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function PrivacyPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t('metadata.privacy.title'),
    description: t('metadata.privacy.description'),
  });

  return (
    <section className="page-shell">
      <SectionHeader
        eyebrow={t('pages.privacy.eyebrow')}
        title={t('pages.privacy.title')}
        titleAs="h1"
        description={t('pages.privacy.description')}
      />
      <div className="mt-8 border border-border bg-surface-card p-6 text-sm text-text-muted shadow-card">
        {t('pages.privacy.body')}
      </div>
    </section>
  );
}
