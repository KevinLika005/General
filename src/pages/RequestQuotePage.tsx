import { RequestQuoteForm } from '../components/forms/RequestQuoteForm';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useInquiryList } from '../hooks/useInquiryList';

export function RequestQuotePage() {
  const { items } = useInquiryList();

  usePageMetadata({
    title: 'Request Quote | Rafin Machinery',
    description: 'Send a B2B request for machinery, parts, inspection, delivery planning, documents, or contract discussion. The website supports inquiry and offline agreement only.',
  });

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <p className="kicker">Request quote</p>
          <h1 className="mt-2 text-[1.9rem] text-navy sm:text-[2.3rem] xl:text-[2.7rem]">Send a commercial request to Rafin Machinery</h1>
          <p className="mt-3 max-w-3xl text-sm text-text-muted sm:text-base">
            Use one form for product information, quotations, inspection appointments, delivery discussion, document requests, or contract follow-up. This is an inquiry-only process, not a checkout.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <RequestQuoteForm inquiryItems={items} />
      </section>
    </>
  );
}
