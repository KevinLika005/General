import { useTranslation } from 'react-i18next';
import { RequestQuoteForm } from '../components/forms/RequestQuoteForm';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useInquiryList } from '../hooks/useInquiryList';

export function RequestQuotePage() {
  const { t } = useTranslation();
  const { items } = useInquiryList();

  usePageMetadata({
    title: t('metadata.requestQuote.title'),
    description: t('metadata.requestQuote.description'),
  });

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <p className="kicker">{t('pages.requestQuote.eyebrow')}</p>
          <h1 className="mt-2 max-w-[20ch] text-[clamp(1.9rem,1.35rem+1.3vw,2.9rem)] leading-[1.02] text-navy">{t('pages.requestQuote.title')}</h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">
            {t('pages.requestQuote.description')}
          </p>
        </div>
      </section>

      <section className="catalog-shell pb-24">
        <RequestQuoteForm inquiryItems={items} />
      </section>
    </>
  );
}
