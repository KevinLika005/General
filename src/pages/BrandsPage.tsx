import { useTranslation } from 'react-i18next';
import { BrandCard } from '../components/common/BrandCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { getBrands } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function BrandsPage() {
  const { t } = useTranslation();
  const brands = getBrands();
  usePageMetadata({
    title: t('metadata.brands.title'),
    description: t('metadata.brands.description'),
  });

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <p className="kicker">{t('pages.brands.eyebrow')}</p>
          <h1 className="mt-2 max-w-[18ch] text-[clamp(1.85rem,1.25rem+1.5vw,3rem)] leading-[1.02] text-navy">{t('pages.brands.title')}</h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">
            {t('pages.brands.description')}
          </p>
        </div>
      </section>

      <section className="wide-shell pb-24">
        <SectionHeader
          description={t('pages.brands.section.description')}
          eyebrow={t('pages.brands.section.eyebrow')}
          title={t('pages.brands.section.title')}
        />
        <div className="brand-grid mt-6">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
