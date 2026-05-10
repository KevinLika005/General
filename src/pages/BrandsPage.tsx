import { BrandCard } from '../components/common/BrandCard';
import { SectionHeader } from '../components/common/SectionHeader';
import { brands } from '../data/catalog';

export function BrandsPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <div className="border border-white/10 bg-rafin-panel px-6 py-8 sm:px-8 sm:py-9">
          <p className="eyebrow">Brands</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Browse the machinery brands in current stock</h1>
          <p className="mt-4 max-w-3xl text-base text-rafin-muted-light sm:text-lg">
            Each brand card opens the catalog filtered by brand so buyers can move quickly from manufacturer preference to specific available listings.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        <SectionHeader
          description="Real-world heavy equipment and support brands across construction, logistics, roadwork, and fleet maintenance."
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
