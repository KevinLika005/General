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
          <h1 className="mt-2 text-[2rem] text-navy sm:text-[2.5rem]">Browse the manufacturers represented in current stock</h1>
          <p className="mt-3 max-w-3xl text-sm text-text-muted sm:text-base">
            Each brand tile leads back into the catalog filtered by manufacturer so buyers can move quickly from brand preference to specific available listings.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <SectionHeader
          description="Machinery, roadwork, transport, support-equipment, and parts brands already present in the current static catalog."
          eyebrow="Manufacturers"
          title="Active brands in the catalog"
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {brands.map((brand) => (
            <BrandCard brand={brand} key={brand.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
