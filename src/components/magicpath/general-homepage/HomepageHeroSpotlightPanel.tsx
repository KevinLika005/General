import { ArrowRight, ClipboardList } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { ImageWithFallback } from '../../common/ImageWithFallback';

interface HomepageHeroSpotlightPanelProps {
  categoryPreviews: HomepageCategoryPreview[];
  heroImageAlt: string;
  heroImageSrc?: string;
}

export function HomepageHeroSpotlightPanel({
  categoryPreviews,
  heroImageAlt,
  heroImageSrc,
}: HomepageHeroSpotlightPanelProps) {
  const { t } = useTranslation();

  return (
    <aside className="hero-band flex h-full flex-col overflow-hidden border border-surface-dark text-text-on-dark shadow-dropdown">
      <div className="relative">
        <ImageWithFallback
          alt={heroImageAlt}
          aspectRatio="wide"
          className="inverse-divider rounded-none border-x-0 border-t-0"
          imageClassName="transition duration-300"
          loading="eager"
          src={heroImageSrc}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-surface-dark via-surface-dark/55 to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="kicker text-text-on-dark/72">{t('pages.home.hero.panelEyebrow')}</p>
        <h2 className="mt-3 max-w-[16ch] text-[clamp(1.55rem,1.15rem+1vw,2.1rem)] text-text-on-dark">
          {t('pages.home.hero.panelTitle')}
        </h2>
        <p className="mt-3 text-sm text-text-on-dark/72">{t('pages.home.hero.panelDescription')}</p>

        <div className="mt-6 grid gap-2.5">
          {categoryPreviews.map((preview) => (
            <Link
              className="inverse-soft-border inverse-soft-surface group flex items-center justify-between border px-4 py-3 text-left transition hover:border-primary/60 hover:bg-[rgb(var(--inverse-fill-strong))]"
              key={preview.category.slug}
              to={routes.category(preview.category.slug)}
            >
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-text-on-dark/55">
                  {t('common.status.listings', { count: preview.productCount })}
                </p>
                <p className="mt-1 text-sm font-semibold text-text-on-dark">{preview.category.title}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-primary transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>

        <div className="inverse-divider mt-6 flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <ClipboardList className="mt-0.5 h-4 w-4 text-primary" />
            <div>
              <p className="line-label text-text-on-dark/55">{t('pages.home.hero.supportEyebrow')}</p>
              <p className="mt-2 max-w-[28ch] text-sm text-text-on-dark/72">
                {t('pages.home.hero.supportNote')}
              </p>
            </div>
          </div>

          <Link
            className="inline-flex items-center gap-2 text-[0.82rem] font-semibold text-text-on-dark transition hover:text-primary"
            to={routes.deals}
          >
            {t('common.actions.viewAvailableNow')}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
