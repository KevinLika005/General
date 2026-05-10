import { SectionHeader } from '../components/common/SectionHeader';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function TermsPage() {
  usePageMetadata({
    title: 'Terms | Rafin Machinery',
    description: 'Terms guidance for catalog information, indicative pricing, availability, and offline company-to-company contract handling.',
  });

  return (
    <section className="page-shell">
      <SectionHeader
        eyebrow="Terms"
        title="Terms of use guidance"
        titleAs="h1"
        description="Product information in this frontend build is illustrative catalog content for an inquiry-based sales process. Final commercial terms are confirmed directly with Rafin."
      />
      <div className="mt-8 rounded-3xl border border-border bg-surface-card p-7 text-text-muted shadow-card">
        Final availability, pricing, specifications, documentation, delivery, inspection, and contract terms must be confirmed directly with Rafin during the offline company-to-company process.
      </div>
    </section>
  );
}
