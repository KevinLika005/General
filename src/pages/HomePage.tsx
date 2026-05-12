import { ArrowRight, ClipboardList, FileText, SearchCheck, ShieldCheck, Truck } from 'lucide-react';
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
  featuredProducts,
} from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

const quickSearches = [
  'Excavators',
  'Generators',
  'Hydraulic Breakers',
  'Telehandlers',
  'Dump Trucks',
  'Surveying Equipment',
];

const quickLinks = [
  { label: 'All Equipment', to: routes.equipment },
  { label: 'Brands', to: routes.brands },
  { label: 'Available Now', to: routes.deals },
  { label: 'Technical Library', to: routes.technicalLibrary },
] as const;

const supportTiles = [
  {
    icon: SearchCheck,
    title: 'Stronger product search',
    description: 'Search by product, SKU, model, brand, or technical keyword from the first screen.',
  },
  {
    icon: ClipboardList,
    title: 'Inquiry-first workflow',
    description: 'Collect multiple products into one request before asking for quote, info, documents, or contract follow-up.',
  },
  {
    icon: ShieldCheck,
    title: 'Technical evaluation',
    description: 'Review specifications, condition notes, availability, and inspection references before commercial alignment.',
  },
  {
    icon: Truck,
    title: 'Support-driven process',
    description: 'Delivery, inspection, logistics, and documentation continue directly with the sales team after inquiry.',
  },
  {
    icon: FileText,
    title: 'Technical library path',
    description: 'Use the support structure for manuals, specification sheets, inspection documents, and request-document workflows.',
  },
] as const;

export function HomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  usePageMetadata({
    title: 'Rafin Machinery | Technical Equipment Catalog and B2B Inquiry Requests',
    description: 'Browse machinery, trucks, spare parts, attachments, and site support inventory in a technical B2B catalog built for inquiry, quote, inspection, and contract follow-up.',
  });

  return (
    <>
      <section className="section-band border-b border-border bg-surface-card">
        <div className="band-shell py-[clamp(1.5rem,2vw,2.5rem)]">
          <div className="grid gap-5 3xl:grid-cols-[minmax(0,1.16fr)_minmax(20rem,0.84fr)]">
            <div className="space-y-4">
              <div>
                <p className="kicker">Rafin Machinery</p>
                <h1 className="mt-2 max-w-[18ch] text-[clamp(2.15rem,1.4rem+2.5vw,4.2rem)] leading-[0.98] text-navy">
                  Technical product discovery for serious construction and equipment buyers
                </h1>
                <p className="text-measure mt-3 text-sm text-text-muted sm:text-[0.97rem]">
                  Browse construction machinery, attachments, spare parts, tools, trucks, and support equipment. Build an Inquiry List, request technical information, and continue with pricing, inspection, delivery, or contract discussion directly with Rafin.
                </p>
              </div>

              <SearchBar
                buttonLabel="Search Catalog"
                onChange={setSearch}
                onSubmit={() => navigate(search.trim() ? routes.equipmentSearch(search) : routes.equipment)}
                placeholder="Search by product, SKU, model, brand, or technical keyword"
                value={search}
              />

              <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
                {quickSearches.map((term) => (
                  <button
                    className="border border-border bg-surface-subtle px-3 py-1.5 text-[0.76rem] font-medium whitespace-nowrap text-navy transition hover:border-primary"
                    key={term}
                    onClick={() => navigate(routes.equipmentSearch(term))}
                    type="button"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="grid gap-3 sm:flex sm:flex-wrap">
                <Button size="lg" to={routes.equipment}>
                  Browse Catalog
                </Button>
                <Button size="lg" to={routes.inquiryList} variant="secondary">
                  Inquiry List
                </Button>
                <Button size="lg" to={routes.requestQuote} variant="secondary">
                  Request Quote
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 3xl:grid-cols-1">
              <div className="surface-panel p-5">
                <p className="kicker">Catalog structure</p>
                <h2 className="mt-2 max-w-[18ch] text-[clamp(1.25rem,1rem+0.7vw,1.55rem)] text-navy">Search first, then move into products, support, and document paths</h2>
                <div className="mt-4 grid gap-px border border-border bg-border">
                  {quickLinks.map((link) => (
                    <Button className="justify-between border-0 bg-surface-card hover:bg-surface-subtle" key={link.to} to={link.to} variant="ghost">
                      {link.label}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ))}
                </div>
              </div>

              <div className="surface-panel p-5">
                <p className="kicker">Process note</p>
                <p className="mt-2 text-sm text-text-muted">
                  Inquiry-commerce only. No checkout, no online payment, no cart wording, and no order placement. The website supports quote, inspection, documentation, and contract follow-up only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <SectionHeader
          description="Start with the main inventory groups, then move into compact product listings, sharper filters, and technical product pages."
          eyebrow="Browse categories"
          title="Product groups built for fast buyer orientation"
        />
        <div className="category-grid mt-6">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.slug} />
          ))}
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <SectionHeader
          description="Compact support blocks that stay close to product discovery instead of sitting behind a separate corporate layer."
          eyebrow="Support structure"
          title="A utilitarian B2B interface with stronger support paths"
        />
        <div className="support-grid mt-6">
          {supportTiles.map((tile) => {
            const Icon = tile.icon;

            return (
              <article className="toolbar-panel h-full p-4 shadow-card" key={tile.title}>
                <Icon className="h-5 w-5 text-primary" />
                <h2 className="mt-3 text-[1.1rem] text-navy">{tile.title}</h2>
                <p className="text-measure mt-2 text-sm text-text-muted">{tile.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description="Priority listings with clear availability, price mode, and direct next actions."
            eyebrow="Featured equipment"
            title="Listings ready for serious evaluation"
          />
          <Button to={routes.equipment} variant="secondary">
            Browse Equipment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="product-grid mt-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description="Current stock and inbound units for buyers who need shorter procurement cycles."
            eyebrow="Available now"
            title="Current stock and inbound units"
          />
          <Button to={routes.deals} variant="secondary">
            View Available Now
          </Button>
        </div>
        <div className="product-grid mt-6">
          {availableNowProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <SectionHeader
          eyebrow="Brands in stock"
          title="Browse current manufacturers in the catalog"
          description="Use brand preference as a direct path into filtered inventory."
        />
        <div className="brand-grid mt-6">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
      </section>

      <section className="section-band py-[clamp(2rem,3vw,3.5rem)]">
        <div className="band-shell">
          <div className="hero-band border border-surface-dark px-5 py-6 text-white lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="kicker text-white/80">Technical library and sourcing</p>
            <h2 className="mt-2 max-w-[20ch] text-[clamp(1.45rem,1.1rem+0.9vw,1.95rem)] text-white">Need a document pack or a specific unit that is not listed?</h2>
            <p className="text-measure mt-3 text-sm text-white/72">
              Use the Technical Library for support materials, or submit a request for quote, information, inspection, or contract discussion tied to a specific model or requirement.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0">
            <Button size="lg" to={routes.technicalLibrary}>
              Technical Library
            </Button>
            <Button size="lg" to={routes.requestQuote} variant="secondary">
              Request Quote
            </Button>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
