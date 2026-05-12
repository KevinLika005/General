import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function FinancingContractsPage() {
  usePageMetadata({
    title: 'Financing and Contracts | Rafin Machinery',
    description: 'Review how commercial terms, contracts, invoices, and buyer-side approvals are handled directly with Rafin after inquiry.',
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description="The catalog supports contract-based sales and direct company-to-company negotiation rather than online transaction handling."
          eyebrow="Financing & contracts"
          title="Commercial terms are discussed directly with Rafin"
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            'Contract-based sales only',
            'Company-to-company negotiation',
            'Commercial terms discussed directly with Rafin',
            'Invoices, documentation, and delivery terms handled after inquiry',
            'Inspection and logistics support can be part of the same discussion',
            'Payment terms and financing are discussed directly only when available',
          ].map((item) => (
            <article className="toolbar-panel p-5 text-text-muted shadow-card" key={item}>
              {item}
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Button to={routes.requestQuote}>Request Contract Discussion</Button>
        </div>
      </section>
    </>
  );
}
