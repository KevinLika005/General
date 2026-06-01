import { useTranslation } from 'react-i18next';
import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { getHowItWorksSteps } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function HowItWorksPage() {
  const { t } = useTranslation();
  const howItWorksSteps = getHowItWorksSteps();
  usePageMetadata({
    title: t('metadata.howItWorks.title'),
    description: t('metadata.howItWorks.description'),
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description={t('pages.howItWorks.description')}
          eyebrow={t('pages.howItWorks.eyebrow')}
          title={t('pages.howItWorks.title')}
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step) => (
            <article className="toolbar-panel p-4 shadow-card" key={step.step}>
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-brand-gold">
                {step.step}
              </p>
              <h2 className="mt-3 text-[1.15rem] text-navy">{step.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="hero-band border border-surface-dark p-6 text-white shadow-card">
          <h2 className="text-[1.7rem] text-white">{t('pages.howItWorks.afterInquiryTitle')}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {(t('pages.howItWorks.afterInquiryPoints', { returnObjects: true }) as string[]).map((point) => (
              <div className="border border-white/10 bg-white/5 p-5 text-sm text-white/75" key={point}>
                {point}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Button to={routes.requestQuote}>{t('common.actions.startB2BRequest')}</Button>
          </div>
        </div>
      </section>
    </>
  );
}
