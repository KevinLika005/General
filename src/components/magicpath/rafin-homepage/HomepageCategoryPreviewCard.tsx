import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { ImageWithFallback } from '../../common/ImageWithFallback';

export function HomepageCategoryPreviewCard({
  preview,
}: {
  preview: HomepageCategoryPreview;
}) {
  const { t } = useTranslation();

  return (
    <Link
      className="group flex h-full flex-col overflow-hidden border border-border bg-surface-card shadow-card transition duration-200 hover:border-primary hover:shadow-hover"
      to={routes.category(preview.category.slug)}
    >
      <ImageWithFallback
        alt={preview.category.title}
        aspectRatio="wide"
        className="rounded-none border-x-0 border-t-0"
        imageClassName="transition duration-300 group-hover:scale-[1.02]"
        src={preview.category.heroImage}
      />
      <div className="flex flex-1 flex-col p-5">
        <div>
          <p className="line-label">
            {t('common.status.listings', { count: preview.productCount })}
          </p>
          <h3 className="mt-2 text-[1.15rem] text-navy">{preview.category.title}</h3>
        </div>

        <p className="mt-3 line-clamp-3 text-sm text-text-muted">{preview.category.shortDescription}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {preview.productTypeTitles.map((productTypeTitle) => (
            <span
              className="border border-border bg-surface-subtle px-2.5 py-1 text-[0.72rem] text-text-muted"
              key={productTypeTitle}
            >
              {productTypeTitle}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-5">
          <span className="text-[0.82rem] font-semibold text-navy">
            {t('common.actions.browseCategory')}
          </span>
          <ArrowUpRight className="h-4 w-4 text-primary transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}
