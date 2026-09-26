import { ClipboardList, FileText, Truck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Product } from '../../../data/catalog';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { Button } from '../../common/Button';
import { SectionHeader } from '../../common/SectionHeader';
import { HomepageCategoryPreviewCard } from './HomepageCategoryPreviewCard';
import { GeneralHomepageHero } from './GeneralHomepageHero';
import { HomepageSection } from './HomepageSection';
import { HomepageStockPreviewCard } from './HomepageStockPreviewCard';
import { HomepageSupportLinkCard } from './HomepageSupportLinkCard';

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
  const supportLinks = [
    {
      description: t('pages.home.support.links.howItWorks.description'),
      icon: ClipboardList,
      title: t('pages.home.support.links.howItWorks.title'),
      to: routes.howItWorks,
    },
    {
      description: t('pages.home.support.links.deliveryInspection.description'),
      icon: Truck,
      title: t('pages.home.support.links.deliveryInspection.title'),
      to: routes.deliveryInspection,
    },
    {
      description: t('pages.home.support.links.technicalLibrary.description'),
      icon: FileText,
      title: t('pages.home.support.links.technicalLibrary.title'),
      to: routes.technicalLibrary,
    },
  ] as const;

  return (
    <>
      <HomepageSection
        className="section-band surface-band border-b border-border"
        shellClassName="py-[clamp(2.75rem,5vw,5.5rem)]"
        shellVariant="band"
      >
        <GeneralHomepageHero
          categoryPreviews={categoryPreviews}
          onQuickSearch={onQuickSearch}
          onSearchChange={onSearchChange}
          onSearchSubmit={onSearchSubmit}
          quickSearches={quickSearches}
          search={search}
        />
      </HomepageSection>

      <HomepageSection id="homepage-categories">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description={t('pages.home.categories.description')}
            eyebrow={t('pages.home.categories.eyebrow')}
            title={t('pages.home.categories.title')}
          />
          <Button to={routes.equipment} variant="secondary">
            {t('common.actions.browseCatalog')}
          </Button>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {categoryPreviews.map((preview) => (
            <HomepageCategoryPreviewCard key={preview.category.slug} preview={preview} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection className="section-band border-y border-border bg-surface-subtle/45" shellVariant="band">
        <SectionHeader
          description={t('pages.home.support.description')}
          eyebrow={t('pages.home.support.eyebrow')}
          title={t('pages.home.support.title')}
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {supportLinks.map((link) => (
            <HomepageSupportLinkCard
              description={link.description}
              icon={link.icon}
              key={link.to}
              title={link.title}
              to={link.to}
            />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            description={t('pages.home.inventory.description')}
            eyebrow={t('pages.home.inventory.eyebrow')}
            title={t('pages.home.inventory.title')}
          />
          <Button to={routes.deals} variant="secondary">
            {t('common.actions.viewAvailableNow')}
          </Button>
        </div>

        <div className="mt-8 grid gap-5 xl:grid-cols-3">
          {previewProducts.map((product) => (
            <HomepageStockPreviewCard key={product.id} product={product} />
          ))}
        </div>
      </HomepageSection>

      <HomepageSection className="section-band" shellVariant="band">
        <div className="hero-band border border-surface-dark px-5 py-6 text-text-on-dark shadow-card sm:px-6 sm:py-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <p className="kicker text-text-on-dark/75">{t('pages.home.cta.eyebrow')}</p>
            <h2 className="mt-3 max-w-[18ch] text-[clamp(1.6rem,1.15rem+1vw,2.2rem)] text-text-on-dark">
              {t('pages.home.cta.title')}
            </h2>
            <p className="text-measure mt-3 text-sm text-text-on-dark/72">
              {t('pages.home.cta.description')}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:mt-0">
            <Button size="lg" to={routes.requestQuote}>
              {t('common.actions.requestQuote')}
            </Button>
            <Button size="lg" to={routes.contact} variant="secondary">
              {t('common.actions.contactSales')}
            </Button>
          </div>
        </div>
      </HomepageSection>
    </>
  );
}
