import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { howItWorksSteps } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function HowItWorksPage() {
  usePageMetadata({
    title: 'How It Works | Rafin Machinery',
    description: 'Understand how Rafin Machinery handles inquiry, quote follow-up, inspection, negotiation, and offline company-to-company agreement.',
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description="This website is a catalog and inquiry tool. Buyers browse products, build an Inquiry List, and continue the commercial process directly with Rafin."
          eyebrow="How it works"
          title="A clear B2B machinery inquiry process"
          titleAs="h1"
        />
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5 lg:grid-cols-4">
          {howItWorksSteps.map((step) => (
            <article className="rounded-3xl border border-border bg-surface-card p-5 shadow-card" key={step.step}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-gold">
                {step.step}
              </p>
              <h2 className="mt-4 text-2xl text-brand-navy">{step.title}</h2>
              <p className="mt-3 text-text-muted">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="rounded-3xl bg-brand-navy p-7 text-white shadow-card">
          <h2 className="text-3xl text-white">What happens after you send an inquiry</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/75">
              Rafin reviews the products in your Inquiry List and replies with technical details, availability context, and the next commercial step.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/75">
              Contract terms, inspection planning, documentation, delivery scope, and commercial discussion are handled directly with Rafin.
            </div>
          </div>
          <div className="mt-6">
            <Button to={routes.requestQuote}>Start a B2B Request</Button>
          </div>
        </div>
      </section>
    </>
  );
}
