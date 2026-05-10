import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { routes } from '../utils/routes';

export function FinancingContractsPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <SectionHeader
          description="Rafin does not present an online finance or payment flow here. Instead, the website supports contract-based sales and direct company-to-company negotiation."
          eyebrow="Financing & Contracts"
          title="Commercial terms are discussed directly with Rafin"
        />
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            'Contract-based sales only',
            'Company-to-company negotiation',
            'Payment terms discussed directly with Rafin',
            'Invoices, documentation, and delivery terms handled after inquiry',
            'Inspection and logistics support can be part of the same discussion',
            'No financing promise is made unless confirmed directly by Rafin',
          ].map((item) => (
            <article className="border border-white/10 bg-rafin-panel p-5 text-rafin-muted-light" key={item}>
              {item}
            </article>
          ))}
        </div>

        <div className="mt-10">
          <Button to={routes.requestQuote}>Request Contract</Button>
        </div>
      </section>
    </>
  );
}
