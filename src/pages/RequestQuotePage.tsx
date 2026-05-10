import { RequestQuoteForm } from '../components/forms/RequestQuoteForm';
import { useInquiryList } from '../hooks/useInquiryList';

export function RequestQuotePage() {
  const { items } = useInquiryList();

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <div className="border border-white/10 bg-rafin-panel px-6 py-8 sm:px-8 sm:py-9">
          <p className="eyebrow">Request Quote</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Send a commercial request to Rafin Machinery</h1>
          <p className="mt-4 max-w-3xl text-base text-rafin-muted-light sm:text-lg">
            Use one form for product information, price quotations, inspection appointments, delivery discussion, or a formal contract request.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <RequestQuoteForm inquiryItems={items} />
      </section>
    </>
  );
}
