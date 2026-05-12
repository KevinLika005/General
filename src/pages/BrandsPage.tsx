import { BrandCard } from '../components/common/BrandCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { brands } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function BrandsPage() {
  usePageMetadata({
    title: 'Brands | Rafin Machinery',
    description: 'Browse manufacturers represented in the current Rafin Machinery inventory and jump straight into brand-filtered catalog results.',
  });

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <p className="kicker">Brands</p>
          <h1 className="mt-2 max-w-[18ch] text-[clamp(1.85rem,1.25rem+1.5vw,3rem)] leading-[1.02] text-navy">Browse the manufacturers represented in current stock</h1>
          <p className="text-measure mt-3 text-sm text-text-muted sm:text-base">
            Each brand tile leads back into the catalog filtered by manufacturer so buyers can move quickly from brand preference to specific available listings.
          </p>
        </div>
      </section>

      <section className="wide-shell pb-24">
        <SectionHeader
          description="Machinery, roadwork, transport, support-equipment, and parts brands already present in the current static catalog."
          eyebrow="Manufacturers"
          title="Active brands in the catalog"
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
