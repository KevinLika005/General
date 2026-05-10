import { SectionHeader } from '../components/common/SectionHeader';
import { faqItems } from '../data/catalog';

export function FAQPage() {
  const mainFaqs = faqItems.filter((item) => !item.categorySlug);

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <SectionHeader
          description="Answers for buyers, contractors, and procurement teams using the inquiry-commerce catalog."
          eyebrow="FAQ"
          title="Common questions about buying through Rafin Machinery"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4">
          {mainFaqs.map((faq) => (
            <article className="border border-white/10 bg-rafin-panel p-5" key={faq.question}>
              <h2 className="text-2xl text-white">{faq.question}</h2>
              <p className="mt-3 text-rafin-muted-light">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
