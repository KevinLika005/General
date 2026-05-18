import { ArrowRight, ClipboardList, FileText, SearchCheck, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BrandCard } from '../components/common/BrandCard';
import { Button } from '../components/common/Button';
import { CategoryCard } from '../components/common/CategoryCard';
import { ProductCard } from '../components/common/ProductCard';
import { SearchBar } from '../components/common/SearchBar';
import { SectionHeader } from '../components/common/SectionHeader';
import {
  getAvailableNowProducts,
  getBrands,
  getCategories,
  getFeaturedProducts,
} from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { routes } from '../utils/routes';

export function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const quickSearches = t('pages.home.quickSearches', { returnObjects: true }) as string[];
  const quickLinks = [
    { label: t('pages.home.quickLinks.links.0'), to: routes.equipment },
    { label: t('pages.home.quickLinks.links.1'), to: routes.brands },
    { label: t('pages.home.quickLinks.links.2'), to: routes.deals },
    { label: t('pages.home.quickLinks.links.3'), to: routes.technicalLibrary },
  ] as const;
  const supportTiles = [
    {
      icon: SearchCheck,
      title: t('pages.home.support.tiles.0.title'),
      description: t('pages.home.support.tiles.0.description'),
    },
    {
      icon: ClipboardList,
      title: t('pages.home.support.tiles.1.title'),
      description: t('pages.home.support.tiles.1.description'),
    },
    {
      icon: ShieldCheck,
      title: t('pages.home.support.tiles.2.title'),
      description: t('pages.home.support.tiles.2.description'),
    },
    {
      icon: Truck,
      title: t('pages.home.support.tiles.3.title'),
      description: t('pages.home.support.tiles.3.description'),
    },
    {
      icon: FileText,
      title: t('pages.home.support.tiles.4.title'),
      description: t('pages.home.support.tiles.4.description'),
    },
  ] as const;
  const availableNowProducts = getAvailableNowProducts();
  const brands = getBrands();
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();

  usePageMetadata({
    title: t('metadata.home.title'),
    description: t('metadata.home.description'),
  });

  return (
    <>
      <section className="section-band border-b border-border bg-surface-card">
        <div className="band-shell py-[clamp(1.5rem,2vw,2.5rem)]">
          <div className="grid gap-5 3xl:grid-cols-[minmax(0,1.16fr)_minmax(20rem,0.84fr)]">
            <div className="space-y-4">
              <div>
                <p className="kicker">{t('pages.home.hero.eyebrow')}</p>
                <h1 className="mt-2 max-w-[18ch] text-[clamp(2.15rem,1.4rem+2.5vw,4.2rem)] leading-[0.98] text-navy">
                  {t('pages.home.hero.title')}
                </h1>
                <p className="text-measure mt-3 text-sm text-text-muted sm:text-[0.97rem]">
                  {t('pages.home.hero.description')}
                </p>
              </div>

              <SearchBar
                buttonLabel={t('common.actions.searchCatalog')}
                onChange={setSearch}
                onSubmit={() => navigate(search.trim() ? routes.equipmentSearch(search) : routes.equipment)}
                placeholder={t('pages.home.hero.searchPlaceholder')}
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
                  {t('common.actions.browseCatalog')}
                </Button>
                <Button size="lg" to={routes.inquiryList} variant="secondary">
                  {t('layout.header.inquiryList')}
                </Button>
                <Button size="lg" to={routes.requestQuote} variant="secondary">
                  {t('common.actions.requestQuote')}
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 3xl:grid-cols-1">
              <div className="surface-panel p-5">
                <p className="kicker">{t('pages.home.quickLinks.eyebrow')}</p>
                <h2 className="mt-2 max-w-[18ch] text-[clamp(1.25rem,1rem+0.7vw,1.55rem)] text-navy">{t('pages.home.quickLinks.title')}</h2>
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
                <p className="kicker">{t('pages.home.processNote.eyebrow')}</p>
                <p className="mt-2 text-sm text-text-muted">
                  {t('pages.home.processNote.body')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <SectionHeader
          description={t('pages.home.categories.description')}
          eyebrow={t('pages.home.categories.eyebrow')}
          title={t('pages.home.categories.title')}
        />
        <div className="category-grid mt-6">
          {categories.map((category) => (
            <CategoryCard category={category} key={category.slug} />
          ))}
        </div>
      </section>

      <section className="wide-shell py-[clamp(2rem,3vw,3rem)]">
        <SectionHeader
          description={t('pages.home.support.description')}
          eyebrow={t('pages.home.support.eyebrow')}
          title={t('pages.home.support.title')}
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
            description={t('pages.home.featured.description')}
            eyebrow={t('pages.home.featured.eyebrow')}
            title={t('pages.home.featured.title')}
          />
          <Button to={routes.equipment} variant="secondary">
            {t('common.actions.browseEquipment')}
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
            description={t('pages.home.availableNow.description')}
            eyebrow={t('pages.home.availableNow.eyebrow')}
            title={t('pages.home.availableNow.title')}
          />
          <Button to={routes.deals} variant="secondary">
            {t('common.actions.viewAvailableNow')}
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
          eyebrow={t('pages.home.brands.eyebrow')}
          title={t('pages.home.brands.title')}
          description={t('pages.home.brands.description')}
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
            <p className="kicker text-white/80">{t('pages.home.cta.eyebrow')}</p>
            <h2 className="mt-2 max-w-[20ch] text-[clamp(1.45rem,1.1rem+0.9vw,1.95rem)] text-white">{t('pages.home.cta.title')}</h2>
            <p className="text-measure mt-3 text-sm text-white/72">
              {t('pages.home.cta.description')}
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0">
            <Button size="lg" to={routes.technicalLibrary}>
              {t('common.labels.technicalLibrary')}
            </Button>
            <Button size="lg" to={routes.requestQuote} variant="secondary">
              {t('common.actions.requestQuote')}
            </Button>
          </div>
        </div>
        </div>
      </section>
    </>
  );
}
