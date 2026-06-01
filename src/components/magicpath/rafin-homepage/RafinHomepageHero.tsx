import { useTranslation } from 'react-i18next';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { Button } from '../../common/Button';
import { SiteSearch } from '../../search/SiteSearch';
import { HomepageHeroSpotlightPanel } from './HomepageHeroSpotlightPanel';
import { HomepageTrustStrip } from './HomepageTrustStrip';

interface RafinHomepageHeroProps {
  categoryPreviews: HomepageCategoryPreview[];
  quickSearches: string[];
  search: string;
  onQuickSearch: (term: string) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export function RafinHomepageHero({
  categoryPreviews,
  quickSearches,
  search,
  onQuickSearch,
  onSearchChange,
  onSearchSubmit,
}: RafinHomepageHeroProps) {
  const { t } = useTranslation();
  const heroVisual = categoryPreviews[0]?.category;
  const trustPoints = t('pages.home.hero.trustPoints', { returnObjects: true }) as string[];

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.92fr)] xl:items-center">
      <div className="max-w-[42rem]">
        <p className="kicker">{t('pages.home.hero.eyebrow')}</p>
        <h1 className="mt-3 max-w-[11ch] font-display text-[clamp(2.65rem,1.65rem+3vw,5.1rem)] leading-[0.93] text-navy">
          {t('pages.home.hero.title')}
        </h1>
        <p className="text-measure mt-4 text-base text-text-muted">
          {t('pages.home.hero.description')}
        </p>

        <div className="mt-7 surface-panel p-4 sm:p-6">
          <p className="line-label">{t('pages.home.hero.searchLabel')}</p>
          <div className="mt-3">
            <SiteSearch
              buttonLabel={t('common.actions.search')}
              onChange={onSearchChange}
              onSubmitQuery={() => onSearchSubmit()}
              placeholder={t('pages.home.hero.searchPlaceholder')}
              value={search}
            />
          </div>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap">
            {quickSearches.map((term) => (
              <button
                className="chip min-h-0 whitespace-nowrap px-3 py-2 text-[0.74rem]"
                key={term}
                onClick={() => onQuickSearch(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-text-muted">{t('pages.home.hero.searchNote')}</p>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button size="lg" to={routes.equipment}>
            {t('common.actions.browseCatalog')}
          </Button>
          <Button size="lg" to={routes.requestQuote} variant="secondary">
            {t('common.actions.requestQuote')}
          </Button>
        </div>

        <div className="mt-6">
          <HomepageTrustStrip items={trustPoints} />
        </div>
      </div>

      <HomepageHeroSpotlightPanel
        categoryPreviews={categoryPreviews.slice(0, 3)}
        heroImageAlt={heroVisual?.title ?? t('pages.home.hero.panelTitle')}
        heroImageSrc={heroVisual?.heroImage}
      />
    </div>
  );
}
