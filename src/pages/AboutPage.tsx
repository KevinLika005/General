import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../components/common/SectionHeader';
import { getCompanyProfile, getTrustFeatures } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function AboutPage() {
  const { t } = useTranslation();
  const companyProfile = getCompanyProfile();
  const trustFeatures = getTrustFeatures();
  usePageMetadata({
    title: t('metadata.about.title'),
    description: t('metadata.about.description'),
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description={t('pages.about.description')}
          eyebrow={t('pages.about.eyebrow')}
          title={t('pages.about.title')}
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="toolbar-panel p-5 shadow-card">
            <h2 className="text-[1.4rem] text-navy">{t('pages.about.business.title')}</h2>
            <p className="mt-3 text-sm text-text-muted">
              {t('pages.about.business.paragraphs.0').replace('Rafin Company', companyProfile.parentName)}
            </p>
            <p className="mt-3 text-sm text-text-muted">
              {t('pages.about.business.paragraphs.1')}
            </p>
          </article>
          <article className="toolbar-panel p-5 shadow-card">
            <h2 className="text-[1.4rem] text-navy">{t('pages.about.why.title')}</h2>
            <p className="mt-3 text-sm text-text-muted">
              {t('pages.about.why.description')}
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trustFeatures.map((feature) => (
            <article className="toolbar-panel p-4 shadow-card" key={feature.title}>
              <h2 className="text-[1.1rem] text-navy">{feature.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
