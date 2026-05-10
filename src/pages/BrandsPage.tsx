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
        <div className="surface-panel p-6 sm:p-8">
          <p className="eyebrow">Brands</p>
          <h1 className="mt-3 text-[2.8rem] text-brand-navy sm:text-[4rem]">Browse the manufacturers represented in current stock</h1>
          <p className="mt-4 max-w-3xl text-base text-text-muted sm:text-lg">
            Each brand tile leads back into the catalog filtered by manufacturer so buyers can move quickly from brand preference to specific available listings.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <SectionHeader
          description="Machinery, roadwork, transport, support-equipment, and parts brands already present in the current static catalog."
          eyebrow="Manufacturers"
          title="Active brands in the Rafin catalog"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
