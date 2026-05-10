import { SectionHeader } from '../components/common/SectionHeader';
import { companyProfile, trustFeatures } from '../data/catalog';

export function AboutPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <SectionHeader
          description="Rafin Machinery is a commercial equipment catalog powered by Rafin Company. The focus is machinery knowledge, trustworthy listing detail, and a clear company-to-company sales process."
          eyebrow="About"
          title="Rafin Machinery, built for professional equipment buying"
        />
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <article className="border border-white/10 bg-rafin-panel p-7">
            <h2 className="text-3xl text-white">What this business does</h2>
            <p className="mt-4 text-rafin-muted-light">
              {companyProfile.parentName} uses this catalog to present machinery, transport assets, attachments, spare parts, and site-support equipment in a way that helps company buyers evaluate inventory before making direct contact.
            </p>
            <p className="mt-4 text-rafin-muted-light">
              It is intentionally not a corporate portfolio rebuild and not a consumer ecommerce purchase flow. The sales process remains offline, negotiated, and document-driven.
            </p>
          </article>
          <article className="border border-white/10 bg-rafin-panel p-7">
            <h2 className="text-3xl text-white">Why buyers use it</h2>
            <p className="mt-4 text-rafin-muted-light">
              Buyers can review specs, condition, availability, inspection notes, and pricing style, then collect multiple products into one inquiry list before requesting a quote or contract discussion.
            </p>
          </article>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {trustFeatures.map((feature) => (
            <article className="border border-white/10 bg-rafin-panel p-5" key={feature.title}>
              <h2 className="text-2xl text-white">{feature.title}</h2>
              <p className="mt-3 text-rafin-muted-light">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
