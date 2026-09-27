import { useTranslation } from 'react-i18next';
import { getCompanyProfile, type ProductImage } from '../../../data/catalog';
import { getSrcSet } from '../../../utils/images';
import { SiteSearch } from '../../search/SiteSearch';

interface GeneralHomepageHeroProps {
  heroImage?: ProductImage;
  quickSearches: string[];
  search: string;
  onQuickSearch: (term: string) => void;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export function GeneralHomepageHero({
  heroImage,
  quickSearches,
  search,
  onQuickSearch,
  onSearchChange,
  onSearchSubmit,
}: GeneralHomepageHeroProps) {
  const { t } = useTranslation();
  const companyProfile = getCompanyProfile();

  return (
    <section className="bg-surface-dark text-text-on-dark">
      <div className="wide-shell grid gap-8 py-10 xl:grid-cols-[minmax(0,1fr)_26rem] 4xl:grid-cols-[minmax(0,1fr)_36rem] xl:items-center xl:py-14">
        <div className="max-w-[48rem]">
          <h1 className="text-[clamp(2rem,1.3rem+2.2vw,3rem)] leading-[1.05] text-text-on-dark">{t('pages.home.hero.title')}</h1>
          <p className="mt-3 max-w-[60ch] text-[0.9375rem] text-text-on-dark/75">{companyProfile.tagline}</p>
          <div className="mt-6">
            <SiteSearch
              buttonLabel={t('common.actions.search')}
              onChange={onSearchChange}
              onSubmitQuery={() => onSearchSubmit()}
              placeholder={t('pages.home.hero.searchPlaceholder')}
              value={search}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {quickSearches.slice(0, 4).map((term) => (
              <button
                className="inline-flex min-h-8 items-center rounded border border-text-on-dark/20 px-3 text-[0.8125rem] font-medium text-text-on-dark/85 transition-colors hover:border-accent hover:text-text-on-dark"
                key={term}
                onClick={() => onQuickSearch(term)}
                type="button"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
        {heroImage ? (
          // Only shown from xl up. The <source> keeps smaller screens from downloading it at all.
          <picture className="hidden xl:block">
            <source media="(min-width: 1280px)" sizes="26rem" srcSet={getSrcSet(heroImage.src) ?? heroImage.src} />
            <img
              alt={heroImage.alt}
              className="aspect-[4/3] w-full rounded-lg object-cover"
              src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
            />
          </picture>
        ) : null}
      </div>
    </section>
  );
}
