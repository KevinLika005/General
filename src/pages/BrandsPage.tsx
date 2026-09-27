import { useTranslation } from 'react-i18next';
import { BrandCard } from '../components/common/BrandCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { getBrands } from '../data/catalog';

export function BrandsPage() {
  const { t } = useTranslation();
  const brands = getBrands();
  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <h1 className="max-w-[18ch] text-[clamp(1.85rem,1.25rem+1.5vw,3rem)] leading-[1.02] text-navy">{t('pages.brands.title')}</h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">
            {t('pages.brands.description')}
          </p>
        </div>
      </section>

      <section className="wide-shell pb-24">
        <SectionHeader
          description={t('pages.brands.section.description')}
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
