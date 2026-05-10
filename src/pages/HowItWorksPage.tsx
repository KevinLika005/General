import { Button } from '../components/common/Button';
import { SectionHeader } from '../components/common/SectionHeader';
import { howItWorksSteps } from '../data/catalog';
import { routes } from '../utils/routes';

export function HowItWorksPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <SectionHeader
          description="This website is a catalog and inquiry tool. It is not an instant online purchase flow. Buyers browse products, request information, and continue the commercial process directly with Rafin."
          eyebrow="How It Works"
          title="A clear B2B machinery inquiry flow"
        />
      </section>

      <section className="section-shell pb-20">
        <div className="grid gap-5 lg:grid-cols-4">
          {howItWorksSteps.map((step) => (
            <article className="border border-white/10 bg-rafin-panel p-5" key={step.step}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rafin-gold-soft">
                {step.step}
              </p>
              <h2 className="mt-4 text-2xl text-white">{step.title}</h2>
              <p className="mt-3 text-rafin-muted-light">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="border border-white/10 bg-rafin-panel p-7">
          <h2 className="text-3xl text-white">What does not happen on this website</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="border border-white/10 bg-black/20 p-5 text-rafin-muted-light">
              There is no instant online purchase flow, no card payment form, and no direct one-click purchase path.
            </div>
            <div className="border border-white/10 bg-black/20 p-5 text-rafin-muted-light">
              Contract terms, inspection, negotiation, invoices, delivery terms, and payment arrangements are handled directly with Rafin.
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
