import { SectionHeader } from '../components/common/SectionHeader';
import { companyProfile, trustFeatures } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function AboutPage() {
  usePageMetadata({
    title: 'About | Rafin Machinery',
    description: 'Learn how Rafin Machinery presents construction equipment, attachments, and support inventory for professional company buyers.',
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description="Rafin Machinery is a commercial equipment catalog powered by Rafin Company. The focus is trustworthy listing detail, machinery knowledge, and a clear company-to-company sales process."
          eyebrow="About"
          title="Rafin Machinery, built for professional equipment buying"
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="toolbar-panel p-5 shadow-card">
            <h2 className="text-[1.4rem] text-navy">What this business does</h2>
            <p className="mt-3 text-sm text-text-muted">
              {companyProfile.parentName} uses this catalog to present machinery, transport assets,
              attachments, spare parts, and site-support equipment in a way that helps company buyers evaluate inventory before making direct contact.
            </p>
            <p className="mt-3 text-sm text-text-muted">
              It is intentionally not a corporate portfolio rebuild. The sales process remains
              offline, negotiated, inspection-aware, and document-driven.
            </p>
          </article>
          <article className="toolbar-panel p-5 shadow-card">
            <h2 className="text-[1.4rem] text-navy">Why buyers use it</h2>
            <p className="mt-3 text-sm text-text-muted">
              Buyers can review specs, condition, availability, inspection notes, and pricing
              style, then collect multiple products into one Inquiry List before requesting a quote
              or contract discussion.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trustFeatures.map((feature) => (
            <article className="toolbar-panel p-4 shadow-card" key={feature.title}>
              <h2 className="text-[1.1rem] text-navy">{feature.title}</h2>
              <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
