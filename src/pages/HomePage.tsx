import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileBadge2,
  PackageSearch,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { routes } from '../utils/routes';
import { BrandCard } from '../components/common/BrandCard';
import { Button } from '../components/common/Button';
import { CategoryCard } from '../components/common/CategoryCard';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { SectionHeader } from '../components/common/SectionHeader';
import { StatCard } from '../components/common/StatCard';

const trustIcons = {
  shield: ShieldCheck,
  file: FileBadge2,
  truck: Truck,
  search: PackageSearch,
  building: Building2,
  wrench: BadgeCheck,
};

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(227,198,99,0.08),transparent_22%),linear-gradient(180deg,rgba(17,29,74,0.84),rgba(20,33,61,1))]" />
        <div className="section-shell relative py-12 sm:py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="eyebrow">Rafin Machinery</p>
              <h1 className="mt-3 max-w-4xl text-[3.15rem] text-white sm:text-[4.35rem] lg:text-[5.2rem]">
                Construction Machinery, Equipment & Parts for Serious Work
              </h1>
              <p className="mt-4 max-w-2xl text-sm text-rafin-muted-light sm:text-base">
                {companyProfile.heroSubheadline}
              </p>

              <div className="mt-6 max-w-2xl">
                <SearchBar
                  onChange={setSearch}
                  onSubmit={() => navigate(routes.equipmentSearch(search))}
                  placeholder="Search by machine, brand, model or category"
                  value={search}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button size="lg" to={routes.equipment}>
                  Browse Equipment
                </Button>
                <Button size="lg" to={routes.requestQuote} variant="secondary">
                  Request a Contract
                </Button>
              </div>
            </div>

            <div className="grid gap-3 border border-white/10 bg-white/[0.03] p-5">
              <div className="border-b border-white/10 pb-4">
                <p className="eyebrow">Commercial Process</p>
                <h2 className="mt-2 text-[2rem] text-white">Built for procurement teams and contractors</h2>
                <p className="mt-3 text-sm text-rafin-muted-light">
                  A catalog and inquiry system for heavy machinery, attachments, parts, trucks, and site support. No consumer checkout flow.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {homeStats.map((stat) => (
                  <StatCard key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <div className="grid gap-[1px] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {[
            'Structured inventory categories',
            'Quote and contract requests only',
            'Inspection and logistics support',
            'Company-to-company sales handling',
          ].map((item) => (
            <div className="bg-rafin-ink px-4 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/82" key={item}>
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <SectionHeader
          description="Seven equipment groups organize the catalog around how professional buyers source machinery, transport, parts, and support assets."
          eyebrow="Categories"
          title="Browse the core machinery groups"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <SectionHeader
          description="Featured inventory mixes heavy machinery, transport assets, attachments, and support equipment with different commercial entry points."
          eyebrow="Featured Equipment"
          title="Priority inventory for active buyers"
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <SectionHeader
          description="Use budget bands to narrow the field before moving into detailed quote, inspection, or contract discussion."
          eyebrow="Shop By Budget"
          title="Budget filters for faster scanning"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {budgetBands.map((band) => (
            <button
              className="border border-white/10 bg-rafin-panel px-5 py-5 text-left transition hover:border-rafin-gold/50"
              key={band.slug}
              onClick={() => navigate(`${routes.equipment}?priceBand=${encodeURIComponent(band.slug)}`)}
              type="button"
            >
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-rafin-gold-soft">
                Budget Filter
              </p>
              <h3 className="mt-2 text-[1.65rem] text-white">{band.label}</h3>
              <p className="mt-2 text-sm text-rafin-muted-light">
                View matching products and continue with direct inquiry.
              </p>
            </button>
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
          <SectionHeader
            description="A direct machinery procurement workflow with no online payment and no consumer retail mechanics."
            eyebrow="How It Works"
            title="A tighter B2B machinery process"
          />
          <div className="grid gap-[1px] border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
            {howItWorksSteps.map((step) => (
              <article className="bg-rafin-panel px-4 py-5" key={step.step}>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-rafin-gold-soft">
                  {step.step}
                </p>
                <h3 className="mt-3 text-[1.45rem] text-white">{step.title}</h3>
                <p className="mt-2 text-sm text-rafin-muted-light">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-12">
        <SectionHeader eyebrow="Why Buy Through Rafin" title="A more disciplined commercial structure" />
        <div className="mt-6 grid gap-[1px] border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-3">
          {trustFeatures.map((feature) => {
            const Icon = trustIcons[feature.icon];

            return (
              <article className="bg-rafin-panel px-5 py-5" key={feature.title}>
                <Icon className="h-6 w-6 text-rafin-gold-soft" />
                <h3 className="mt-4 text-[1.55rem] text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-rafin-muted-light">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-shell py-12">
        <SectionHeader eyebrow="Popular Brands" title="Brands already present in current stock" />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
      </section>

      <section className="section-shell py-12">
        <SectionHeader
          description="Available stock and incoming listings that buyers can move on quickly once internal approval is ready."
          eyebrow="Available Now"
          title="Current stock and arrivals"
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
          {availableNowProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="section-shell py-12 pb-16">
        <div className="border border-white/10 bg-[linear-gradient(90deg,rgba(227,198,99,0.12),transparent_18%),linear-gradient(180deg,rgba(14,25,56,1),rgba(20,33,61,1))] px-6 py-6 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow">Final CTA</p>
            <h2 className="mt-2 text-[2.25rem] text-white sm:text-[3rem]">Need machinery for your next job site?</h2>
            <p className="mt-3 max-w-2xl text-sm text-rafin-muted-light sm:text-base">
              Browse equipment, shortlist products into your inquiry list, and let Rafin handle the next commercial step directly.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5 lg:mt-0">
            <Button size="lg" to={routes.equipment}>
              Browse Equipment
            </Button>
            <Button size="lg" to={routes.contact} variant="secondary">
              Contact Sales
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
