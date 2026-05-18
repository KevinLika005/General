import { useTranslation } from 'react-i18next';
import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function DeliveryInspectionPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t('metadata.deliveryInspection.title'),
    description: t('metadata.deliveryInspection.description'),
  });

  const points = t('pages.deliveryInspection.points', { returnObjects: true }) as string[];

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description={t('pages.deliveryInspection.description')}
          eyebrow={t('pages.deliveryInspection.eyebrow')}
          title={t('pages.deliveryInspection.title')}
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4 lg:grid-cols-2">
          {points.map((point) => (
            <article className="toolbar-panel p-4 text-sm text-text-muted shadow-card" key={point}>
              {point}
            </article>
          ))}
        </div>

        <div className="mt-8 surface-panel p-5 shadow-card">
          <h2 className="text-[1.3rem] text-navy">{t('pages.deliveryInspection.promiseTitle')}</h2>
          <p className="mt-3 text-sm text-text-muted">
            {t('pages.deliveryInspection.promiseDescription')}
          </p>
        </div>

        <div className="mt-8">
          <Button to={routes.contact}>{t('common.actions.contactSales')}</Button>
        </div>
      </section>
    </>
  );
}
