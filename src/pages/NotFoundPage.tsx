import { useTranslation } from 'react-i18next';
import { Button } from '../components/common/Button';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function NotFoundPage() {
  const { t } = useTranslation();
  usePageMetadata({
    title: t('metadata.notFound.title'),
    description: t('metadata.notFound.description'),
  });

  return (
    <section className="page-shell text-center">
      <div className="border border-border bg-surface-card px-6 py-12 shadow-card">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-4xl text-navy sm:text-5xl">{t('pages.notFound.title')}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-text-muted">
          {t('pages.notFound.description')}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button to={routes.home}>{t('common.actions.goHome')}</Button>
          <Button to={routes.equipment} variant="secondary">
            {t('common.actions.browseCatalog')}
          </Button>
        </div>
      </div>
    </section>
  );
}
