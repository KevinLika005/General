import { SectionHeader } from '../components/common/SectionHeader';

export function TermsPage() {
  return (
    <section className="section-shell py-16 sm:py-20">
      <SectionHeader
        eyebrow="Terms"
        title="Preview terms of use"
        description="Product information in this frontend build is illustrative catalog content for an inquiry-based sales process. It does not create an instant online purchase contract."
      />
      <div className="mt-8 border border-white/10 bg-rafin-panel p-7 text-rafin-muted-light">
        Final availability, pricing, specifications, documentation, delivery, inspection, and payment terms must be confirmed directly with Rafin during the offline company-to-company process.
      </div>
    </section>
  );
}
