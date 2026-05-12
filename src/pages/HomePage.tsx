import { ArrowRight, ClipboardList, FileText, PhoneCall, SearchCheck, ShieldCheck, Truck } from 'lucide-react';
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
  categories,
  companyProfile,
  featuredProducts,
  homeStats,
  howItWorksSteps,
  trustFeatures,
} from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

const trustStrip = [
  'Technical product detail',
  'Inspection before agreement',
  'Contract-based company sales',
  'Documentation support',
  'Delivery and logistics coordination',
  'No online payment risk',
];

const quickSearches = [
  'Excavators',
  'Generators',
  'Hydraulic Breakers',
  'Telehandlers',
  'Dump Trucks',
  'Surveying Equipment',
];

const buyerSupportTiles = [
  {
    icon: SearchCheck,
    title: 'Catalog-first discovery',
    description: 'Search by machine, brand, model, SKU, stock status, and technical keywords from the first screen.',
  },
  {
    icon: ClipboardList,
    title: 'Professional inquiry flow',
    description: 'Shortlist one or more products first, then send a useful request with quantities, notes, and timing.',
  },
  {
    icon: ShieldCheck,
    title: 'Lower-risk evaluation',
    description: 'Review condition notes, documentation status, availability, and inspection options before commercial agreement.',
  },
  {
    icon: Truck,
    title: 'Offline delivery coordination',
    description: 'Pickup, local delivery, export planning, and contract handling continue directly with Rafin.',
  },
  {
    icon: FileText,
    title: 'Technical library path',
    description: 'Product documents, inspection references, and specification sheets can be requested through the new support library structure.',
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
      <section className="border-b border-border bg-surface-card">
        <div className="section-shell py-8 sm:py-10 lg:py-12">
          <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="kicker">Rafin Machinery</p>
              <h1 className="mt-4 max-w-4xl text-[3rem] text-brand-navy sm:text-[4.1rem] lg:text-[4.8rem]">
                Product-focused machinery sourcing for serious construction buyers
              </h1>
              <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">
                Browse construction machinery, attachments, spare parts, trucks, tools, and heavy
                equipment. Build an Inquiry List, request technical information, and continue with
                pricing, inspection, and contract discussion directly with Rafin.
              </p>

              <div className="mt-6 max-w-3xl">
                <SearchBar
                  buttonLabel="Search Equipment"
                  onChange={setSearch}
                  onSubmit={() => navigate(search.trim() ? routes.equipmentSearch(search) : routes.equipment)}
                  placeholder="Search machinery, SKU, brand, model, part, or stock keyword"
                  value={search}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {quickSearches.map((term) => (
                  <button
                    className="rounded-[4px] border border-border bg-surface-subtle px-3 py-1.5 text-[0.76rem] font-medium text-brand-navy transition hover:border-brand-gold"
                    key={term}
                    onClick={() => navigate(routes.equipmentSearch(term))}
                    type="button"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <Button size="xl" to={routes.equipment}>
                  Browse Catalog
                </Button>
                <Button size="xl" to={routes.requestQuote} variant="secondary">
                  Request Quote
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {trustStrip.map((point) => (
                  <span
                    className="rounded-[4px] border border-border bg-surface-subtle px-3 py-2 text-xs font-medium text-text-muted"
                    key={point}
                  >
                    {point}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {homeStats.map((stat) => (
                  <div className="rounded-xl border border-border bg-surface-alt p-4" key={stat.label}>
                    <p className="text-2xl font-extrabold text-brand-navy">{stat.value}</p>
                    <p className="mt-2 text-sm text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="hero-band rounded-2xl border border-brand-navy p-6 text-white">
                <p className="kicker text-brand-gold-soft">How it works</p>
                <h2 className="mt-3 text-[2rem] text-white">Inquiry first. Agreement offline.</h2>
                <div className="mt-4 grid gap-3">
                  {howItWorksSteps.slice(0, 4).map((step) => (
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4" key={step.step}>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-brand-gold-soft">
                        Step {step.step}
                      </p>
                      <h3 className="mt-2 text-[1.4rem] text-white">{step.title}</h3>
                      <p className="mt-2 text-sm text-white/70">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="surface-panel p-6">
                <p className="kicker">Technical support</p>
                <h2 className="mt-3 text-[1.8rem] text-brand-navy">Need documents, inspection references, or a sourcing path?</h2>
                <p className="mt-3 text-sm text-text-muted">
                  Use the Technical Library and inquiry workflow to request specification sheets, inspection notes, delivery references, and product support without turning the site into an online order flow.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button size="sm" to={routes.technicalLibrary} variant="secondary">
                    Technical Library
                  </Button>
                  <Button size="sm" to={routes.contact} variant="dark">
                    Contact Support
                  </Button>
                </div>
              </div>

              <div className="surface-panel p-6">
                <p className="kicker">Commercial basis</p>
                <h2 className="mt-3 text-[1.8rem] text-brand-navy">No checkout, no online payment, no consumer purchase flow</h2>
                <p className="mt-3 text-sm text-text-muted">
                  Rafin uses the website to help buyers evaluate inventory before direct company-to-company follow-up on pricing, inspection, delivery, and contract terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {buyerSupportTiles.map((tile) => {
            const Icon = tile.icon;

            return (
              <article className="toolbar-panel p-5 shadow-card" key={tile.title}>
                <Icon className="h-6 w-6 text-brand-gold" />
                <h2 className="mt-4 text-[1.35rem] text-brand-navy">{tile.title}</h2>
                <p className="mt-2 text-sm text-text-muted">{tile.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-8">
        <SectionHeader
          description="Start with the main inventory groups, then narrow by brand, subcategory, condition, availability, and price mode."
          eyebrow="Browse categories"
          title="Equipment groups built for fast buyer orientation"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description="Priority listings with clear availability, price mode, and next steps for inquiry."
            eyebrow="Featured equipment"
            title="Listings ready for serious evaluation"
          />
          <Button to={routes.equipment} variant="secondary">
            Browse Equipment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            description="Rafin gives buyers a clear path from catalog review to direct company follow-up."
            eyebrow="Trust and process"
            title="Why this catalog supports lower-friction B2B buying"
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {trustFeatures.map((feature) => (
              <article className="toolbar-panel p-5 shadow-card" key={feature.title}>
                <h3 className="text-[1.35rem] text-brand-navy">{feature.title}</h3>
                <p className="mt-2 text-sm text-text-muted">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description="Available and incoming items suited to shorter decision cycles or active project demand."
            eyebrow="Available now"
            title="Current stock and inbound units"
          />
          <Button to={routes.deals} variant="secondary">
            View Available Now
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {availableNowProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell py-8">
        <SectionHeader
          eyebrow="Brands in stock"
          title="Browse current manufacturers in the Rafin catalog"
          description="Use brand preference as a shortcut, then move into filtered listings and direct inquiry."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell py-8 pb-16">
        <div className="hero-band rounded-2xl px-6 py-8 text-white shadow-card lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="kicker text-brand-gold-soft">Need a specific unit?</p>
            <h2 className="mt-2 text-[2.2rem] text-white">Request sourcing support if the exact machine is not listed</h2>
            <p className="mt-3 max-w-2xl text-base text-white/72">
              Share the equipment, attachment, or parts requirement and Rafin can continue with
              sourcing, technical review, pricing, inspection planning, and contract discussion
              offline.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0">
            <Button size="lg" to={routes.requestQuote}>
              Request Quote
            </Button>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[6px] border border-white/15 px-6 text-[0.8rem] font-semibold uppercase tracking-[0.08em] text-white transition hover:border-brand-gold hover:text-brand-gold-soft"
              href={`tel:${companyProfile.phone}`}
            >
              <PhoneCall className="h-4 w-4" />
              Call Sales
            </a>
            <Button size="lg" to={routes.equipment} variant="secondary">
              Browse Equipment
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
