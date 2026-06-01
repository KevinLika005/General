import { useTranslation } from 'react-i18next';
import { SectionHeader } from '../components/common/SectionHeader';
import { getFaqItems } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function FAQPage() {
  const { t } = useTranslation();
  const faqItems = getFaqItems();
  const mainFaqs = faqItems.filter((item) => !item.categorySlug);

  usePageMetadata({
    title: t('metadata.faq.title'),
    description: t('metadata.faq.description'),
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description="Answers for buyers, contractors, and procurement teams using the inquiry-commerce machinery catalog."
          eyebrow="FAQ"
          title="Common questions about the Rafin buyer process"
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4 lg:grid-cols-2">
          {mainFaqs.map((faq) => (
            <article className="toolbar-panel p-4 shadow-card" key={faq.question}>
              <h2 className="text-[1.1rem] text-navy">{faq.question}</h2>
              <p className="mt-2 text-sm text-text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
