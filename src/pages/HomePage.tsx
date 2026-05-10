import { ArrowRight, Building2, ClipboardList, PhoneCall, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrandCard } from '../components/common/BrandCard';
import { Button } from '../components/common/Button';
import { CategoryCard } from '../components/common/CategoryCard';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { SectionHeader } from '../components/common/SectionHeader';
import {
  availableNowProducts,
  brands,
  budgetBands,
  categories,
  companyProfile,
  featuredProducts,
  homeStats,
  howItWorksSteps,
  trustFeatures,
} from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

const supportTiles = [
  {
    icon: Building2,
    title: 'B2B catalog workflow',
    description: 'Built for contractors, procurement teams, fleet operators, and industrial buyers.',
  },
  {
    icon: ClipboardList,
    title: 'Inquiry List workflow',
    description: 'Collect multiple products first, then send one consolidated commercial request.',
  },
  {
    icon: Truck,
    title: 'Inspection and delivery support',
    description: 'Inspection scheduling, transport planning, and documentation can be discussed after inquiry.',
  },
  {
    icon: ShieldCheck,
    title: 'Offline contract discussion',
    description: 'Negotiation, contract handling, and commercial terms stay direct between companies.',
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  usePageMetadata({
    title: 'Rafin Machinery | B2B Machinery Catalog and Quote Requests',
    description: 'Browse machinery, trucks, spare parts, attachments, and site support inventory. Build an inquiry list and request quote, inspection, or contract discussion directly with Rafin.',
  });

  return (
    <>
      <section className="border-b border-border bg-brand-navy text-white">
        <div className="section-shell py-10 sm:py-12 lg:py-16">
          <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="eyebrow">Rafin Machinery</p>
              <h1 className="mt-4 max-w-4xl text-[3.2rem] leading-[0.9] text-white sm:text-[4.6rem] lg:text-[5.5rem]">
                Construction Machinery, Heavy Equipment, Trucks, Parts, and Site Tools
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/72 sm:text-lg">
                Browse a standalone B2B machinery catalog, shortlist products into your Inquiry List, and move into quote, inspection, or contract discussion with Rafin.
              </p>

              <div className="mt-6 max-w-3xl">
                <SearchBar
                  buttonLabel="Search Catalog"
                  onChange={setSearch}
                  onSubmit={() => navigate(routes.equipmentSearch(search))}
                  placeholder="Search by machine, category, SKU, model, or part number"
                  value={search}
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Button size="xl" to={routes.equipment}>
                  Browse Catalog
                </Button>
                <Button size="xl" to={routes.requestQuote} variant="secondary">
                  Request Quote
                </Button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {homeStats.map((stat) => (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={stat.label}>
                    <p className="text-2xl font-extrabold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="eyebrow">How commercial handling works</p>
                <h2 className="mt-3 text-[2rem] text-white">Shortlist first. Negotiate offline.</h2>
                <div className="mt-4 grid gap-3">
                  {howItWorksSteps.map((step) => (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4" key={step.step}>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-gold-soft">
                        Step {step.step}
                      </p>
                      <h3 className="mt-2 text-xl text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {supportTiles.map((tile) => {
            const Icon = tile.icon;

            return (
              <article className="rounded-3xl border border-border bg-surface-card p-5 shadow-card" key={tile.title}>
                <Icon className="h-6 w-6 text-brand-gold" />
                <h2 className="mt-4 text-[1.65rem] text-brand-navy">{tile.title}</h2>
                <p className="mt-2 text-sm text-text-muted">{tile.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-10">
        <SectionHeader
          description="Browse the main product groups first, then narrow down by category, brand, condition, availability, and budget."
          eyebrow="Catalog categories"
          title="Machinery and industrial stock organized for serious buyers"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <SectionHeader
          description="Featured listings mix heavy machinery, transport units, support equipment, and stock-backed parts."
          eyebrow="Featured stock"
          title="Priority inventory for active projects and procurement teams"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="surface-panel p-6 sm:p-8">
          <SectionHeader
            description="Use budget bands to move directly into the right price bracket before reviewing individual products."
            eyebrow="Price modes"
            title="Visible prices, starting-from pricing, and price-on-request listings"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {budgetBands.map((band) => (
              <button
                className="rounded-2xl border border-border bg-surface-subtle px-5 py-5 text-left transition hover:border-brand-gold hover:bg-white"
                key={band.slug}
                onClick={() => navigate(`${routes.equipment}?priceBand=${encodeURIComponent(band.slug)}`)}
                type="button"
              >
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand-gold">
                  Budget view
                </p>
                <h3 className="mt-2 text-[1.65rem] text-brand-navy">{band.label}</h3>
                <p className="mt-2 text-sm text-text-muted">
                  Filter the catalog and continue with inquiry-based commercial handling.
                </p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            description="The platform supports product discovery, inspection planning, and direct quote or contract requests without turning into a consumer storefront."
            eyebrow="Buyer trust"
            title="Commercial support around the product catalog"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {trustFeatures.slice(0, 4).map((feature) => (
              <article className="rounded-3xl border border-border bg-surface-card p-5 shadow-card" key={feature.title}>
                <h3 className="text-[1.5rem] text-brand-navy">{feature.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <SectionHeader eyebrow="Brands in stock" title="Browse current manufacturers in the Rafin catalog" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell py-10">
        <SectionHeader
          description="Available and incoming listings that teams can act on once internal approval is ready."
          eyebrow="Available now"
          title="Current stock and incoming inventory"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {availableNowProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell py-10 pb-16">
        <div className="rounded-3xl bg-brand-navy px-6 py-8 text-white shadow-card lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Need a specific machine?</p>
            <h2 className="mt-2 text-[2.2rem] text-white">Send an Inquiry List or call sales for sourcing support</h2>
            <p className="mt-3 max-w-2xl text-base text-white/72">
              If you do not see the exact unit, brand, or attachment you need, Rafin can still review a direct request and continue the commercial conversation offline.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0">
            <Button size="lg" to={routes.requestQuote}>
              Request Quote
            </Button>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 px-6 text-sm font-semibold text-white transition hover:border-brand-gold hover:text-brand-gold-soft"
              href={`tel:${companyProfile.phone}`}
            >
              <PhoneCall className="h-4 w-4" />
              Call Sales
            </a>
            <Button size="lg" to={routes.equipment} variant="secondary">
              Browse Catalog
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
