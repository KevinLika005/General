import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getBrands, getCompanyProfile, getHowItWorksSteps, type Product } from '../../../data/catalog';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { Button } from '../../common/Button';
import { ProductCard } from '../../common/ProductCard';
import { SectionHeader } from '../../common/SectionHeader';
import { GeneralHomepageHero } from './GeneralHomepageHero';
import { HomepageCategoryPreviewCard } from './HomepageCategoryPreviewCard';
import { HomepageSection } from './HomepageSection';

interface GeneralHomepageLandingProps {
  categoryPreviews: HomepageCategoryPreview[];
  previewProducts: Product[];
  quickSearches: string[];
  search: string;
  onQuickSearch: (term: string) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export function GeneralHomepageLanding({
  categoryPreviews,
  previewProducts,
  quickSearches,
  search,
  onQuickSearch,
  onSearchChange,
  onSearchSubmit,
}: GeneralHomepageLandingProps) {
  const { t } = useTranslation();
  const steps = getHowItWorksSteps().slice(0, 3);
  const brands = getBrands().filter((brand) => brand.productCount > 0);
  const companyProfile = getCompanyProfile();

  return (
    <>
      <GeneralHomepageHero
        heroImage={previewProducts[0]?.images[0]}
        onQuickSearch={onQuickSearch}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        quickSearches={quickSearches}
        search={search}
      />

      <HomepageSection id="homepage-categories">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader title={t('pages.home.categories.title')} />
          <Button size="sm" to={routes.equipment} variant="secondary">
            {t('common.actions.browseCatalog')}
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-5">
          {categoryPreviews.map((preview) => (
            <HomepageCategoryPreviewCard key={preview.category.slug} preview={preview} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection className="border-y border-border bg-surface-card">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader title={t('pages.home.inventory.title')} />
          <Button size="sm" to={routes.deals} variant="secondary">
            {t('common.actions.viewAvailableNow')}
          </Button>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {previewProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection>
        <SectionHeader title={t('pages.howItWorks.eyebrow')} />
        <ol className="mt-6 grid gap-6 lg:grid-cols-3">
          {steps.map((step, index) => (
            <li className="border-t-2 border-primary pt-4" key={step.step}>
              <p className="font-display text-[1.75rem] font-semibold tabular-nums text-primary-dark">{index + 1}</p>
              <h3 className="mt-1 text-[1.125rem]">{step.title}</h3>
              <p className="mt-2 text-[0.9375rem] text-text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </HomepageSection>

      {brands.length > 0 ? (
        <HomepageSection className="border-t border-border" shellClassName="py-8">
          <h2 className="text-[1.125rem]">{t('layout.megaMenu.links.brands')}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link className="chip" to={routes.equipmentWithBrand(brand.name)}>
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </HomepageSection>
      ) : null}

      <section className="bg-surface-dark text-text-on-dark">
        <div className="wide-shell flex flex-col gap-6 py-10 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="max-w-[28ch] text-[clamp(1.5rem,1.1rem+1.1vw,2rem)] text-text-on-dark">{t('pages.home.cta.title')}</h2>
            <p className="text-measure mt-2 text-[0.9375rem] text-text-on-dark/75">{t('pages.home.cta.description')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" to={routes.requestQuote}>
              {t('common.actions.requestQuote')}
            </Button>
            {companyProfile.phone ? (
              <a
                className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-text-on-dark hover:underline"
                href={`tel:${companyProfile.phone.replace(/\s+/g, '')}`}
              >
                <Phone aria-hidden="true" className="h-4 w-4" />
                {companyProfile.phone}
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}
