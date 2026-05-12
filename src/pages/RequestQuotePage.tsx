import { RequestQuoteForm } from '../components/forms/RequestQuoteForm';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useInquiryList } from '../hooks/useInquiryList';

export function RequestQuotePage() {
  const { items } = useInquiryList();

  usePageMetadata({
    title: 'Request Quote | Rafin Machinery',
    description: 'Send a B2B request for machinery, parts, inspection, delivery planning, or contract discussion. The website supports inquiry and offline agreement only.',
  });

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-6 sm:p-8">
          <p className="kicker">Request quote</p>
          <h1 className="mt-3 text-[2.45rem] text-brand-navy sm:text-[3.2rem]">Send a commercial request to Rafin Machinery</h1>
          <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">
            Use one form for product information, quotations, inspection appointments, delivery
            discussion, or contract follow-up. This is an inquiry-only process, not a checkout.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <RequestQuoteForm inquiryItems={items} />
      </section>
    </>
  );
}
