import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { HomepageCategoryPreview } from '../../../data/homepage';
import { routes } from '../../../utils/routes';
import { ImageWithFallback } from '../../common/ImageWithFallback';

export function HomepageCategoryPreviewCard({ preview }: { preview: HomepageCategoryPreview }) {
  const { t } = useTranslation();

  return (
    <Link className="group relative block overflow-hidden rounded-md bg-surface-dark" to={routes.category(preview.category.slug)}>
      <ImageWithFallback alt="" aspectRatio="video" className="border-0" src={preview.category.heroImage} />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-3 pb-3 pt-8">
        <p className="font-display text-[1rem] font-semibold leading-tight text-white group-hover:underline">{preview.category.title}</p>
        <p className="mt-0.5 text-[0.8125rem] text-white/80">{t('common.status.listings', { count: preview.productCount })}</p>
      </div>
    </Link>
  );
}
