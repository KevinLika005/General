import { SectionHeader } from '../components/common/SectionHeader';
import { faqItems } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function FAQPage() {
  const mainFaqs = faqItems.filter((item) => !item.categorySlug);

  usePageMetadata({
    title: 'FAQ | Rafin Machinery',
    description: 'Common questions about the Rafin Machinery inquiry workflow, pricing modes, inspections, documents, delivery support, and contract handling.',
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
            <article className="toolbar-panel p-5 shadow-card" key={faq.question}>
              <h2 className="text-2xl text-brand-navy">{faq.question}</h2>
              <p className="mt-3 text-text-muted">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
