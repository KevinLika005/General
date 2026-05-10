import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Info,
  ListChecks,
  MapPin,
  Phone,
  Wrench,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { InquiryButton } from '../components/common/InquiryButton';
import { ProductCard } from '../components/common/ProductCard';
import {
  companyProfile,
  getAdjacentProductsInCategory,
  getProductBySlugs,
  getRelatedProducts,
} from '../data/catalog';
import { formatProductPrice } from '../utils/formatPrice';
import { routes } from '../utils/routes';
import { NotFoundPage } from './NotFoundPage';

type DetailTab = 'overview' | 'specs' | 'inspection' | 'documents' | 'delivery';

const tabLabels: Record<DetailTab, string> = {
  overview: 'Overview',
  specs: 'Technical Specifications',
  inspection: 'Inspection Notes',
  documents: 'Documents',
  delivery: 'Delivery & Contract',
};

export function ProductDetailPage() {
  const { categorySlug, productSlug } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  if (!categorySlug || !productSlug) {
    return <NotFoundPage />;
  }

  const product = getProductBySlugs(categorySlug, productSlug);

  if (!product) {
    return <NotFoundPage />;
  }

  const relatedProducts = useMemo(() => getRelatedProducts(product), [product]);
  const { next, previous } = getAdjacentProductsInCategory(categorySlug, product.id);
  const activeImage = product.images[activeImageIndex] ?? product.images[0];

  return (
    <>
      <section className="section-shell py-8">
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
          <Link className="transition hover:text-rafin-gold-soft" to={routes.home}>
            Home
          </Link>
          <span>/</span>
          <Link className="transition hover:text-rafin-gold-soft" to={routes.equipment}>
            Equipment
          </Link>
          <span>/</span>
          <Link className="transition hover:text-rafin-gold-soft" to={routes.category(categorySlug)}>
            {categorySlug.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </div>
      </section>

      <section className="section-shell pb-10">
        <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="overflow-hidden border border-white/10">
              <ImageWithFallback
                alt={activeImage?.alt ?? product.title}
                className="h-[420px] sm:h-[520px]"
                loading="eager"
                src={activeImage?.src}
              />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {product.images.map((image, index) => (
                <button
                  className={[
                    'overflow-hidden border transition',
                    index === activeImageIndex ? 'border-rafin-gold' : 'border-white/10',
                  ].join(' ')}
                  key={image.src}
                  onClick={() => setActiveImageIndex(index)}
                  type="button"
                >
                  <ImageWithFallback alt={image.alt} className="h-24" src={image.src} />
                </button>
              ))}
            </div>
          </div>

          <div className="border border-white/10 bg-rafin-panel p-6 sm:p-7">
            <div className="flex flex-wrap gap-2">
              <Badge
                tone={
                  product.availability === 'available'
                    ? 'green'
                    : product.availability === 'incoming'
                      ? 'gold'
                      : 'red'
                }
              >
                {product.availability}
              </Badge>
              <Badge>{product.condition}</Badge>
            </div>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-rafin-gold-soft">
              {product.brand} / {product.model} / {product.year}
            </p>
            <h1 className="mt-3 text-4xl text-white sm:text-5xl">{product.title}</h1>
            <p className="mt-4 text-2xl font-bold text-white">{formatProductPrice(product)}</p>
            <p className="mt-4 text-rafin-muted-light">{product.description}</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Year</p>
                <p className="mt-2 text-lg text-white">{product.year}</p>
              </div>
              <div className="border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Hours / Mileage</p>
                <p className="mt-2 text-lg text-white">
                  {product.operatingHours
                    ? `${product.operatingHours} h`
                    : product.mileageKm
                      ? `${product.mileageKm} km`
                      : 'On request'}
                </p>
              </div>
              <div className="border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Location</p>
                <p className="mt-2 text-lg text-white">{product.location}</p>
              </div>
              <div className="border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">Serial</p>
                <p className="mt-2 text-lg text-white">{product.serialNumber ?? 'Available on request'}</p>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <InquiryButton fullWidth productId={product.id} />
              <Button className="w-full" to={routes.requestQuote} variant="secondary">
                Request Info
              </Button>
              <Button className="w-full" to={routes.requestQuote} variant="secondary">
                Request Contract
              </Button>
              <a
                className="inline-flex w-full items-center justify-center gap-2 border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:border-rafin-gold hover:text-rafin-gold-soft"
                href={`tel:${companyProfile.phone}`}
              >
                <Phone className="h-4 w-4" />
                Call Sales
              </a>
            </div>

            <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 text-sm text-white/68 sm:grid-cols-2">
              <div className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-rafin-gold-soft" />
                <span>{product.location}</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Wrench className="h-4 w-4 text-rafin-gold-soft" />
                <span>{product.subcategory}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="flex flex-wrap gap-3">
          {(Object.keys(tabLabels) as DetailTab[]).map((tab) => (
            <button
              className={[
                'border px-4 py-2 text-sm transition',
                activeTab === tab
                  ? 'border-rafin-gold bg-rafin-gold/12 text-rafin-gold-soft'
                  : 'border-white/10 bg-white/5 text-white/72',
              ].join(' ')}
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
            >
              {tabLabels[tab]}
            </button>
          ))}
        </div>

        <div className="mt-6 border border-white/10 bg-rafin-panel p-6 sm:p-7">
          {activeTab === 'overview' ? (
            <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <div>
                <h2 className="text-2xl text-white">Machine overview</h2>
                <p className="mt-4 text-rafin-muted-light">{product.excerpt}</p>
                <div className="mt-5 grid gap-3">
                  {product.keyFeatures.map((feature) => (
                    <div className="inline-flex items-center gap-3 text-sm text-white/72" key={feature}>
                      <Info className="h-4 w-4 text-rafin-gold-soft" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">Condition</p>
                  <p className="mt-2 text-lg text-white">{product.condition}</p>
                </div>
                <div className="border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">Fuel</p>
                  <p className="mt-2 text-lg text-white">{product.fuelType ?? 'On request'}</p>
                </div>
                <div className="border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">Engine Power</p>
                  <p className="mt-2 text-lg text-white">{product.enginePower ?? 'On request'}</p>
                </div>
                <div className="border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-white/45">Weight / Capacity</p>
                  <p className="mt-2 text-lg text-white">{product.weight ?? product.capacity ?? 'On request'}</p>
                </div>
              </div>
            </div>
          ) : null}

          {activeTab === 'specs' ? (
            <div>
              <h2 className="text-2xl text-white">Technical specifications</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div className="border border-white/10 bg-black/20 p-4" key={spec.label}>
                    <p className="text-xs uppercase tracking-[0.16em] text-white/45">{spec.label}</p>
                    <p className="mt-2 text-lg text-white">{spec.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'inspection' ? (
            <div>
              <h2 className="text-2xl text-white">Inspection notes</h2>
              <div className="mt-5 grid gap-3">
                {(
                  product.inspectionNotes ?? [
                    'Detailed inspection notes can be provided during the inquiry process.',
                  ]
                ).map((note) => (
                  <div className="inline-flex items-start gap-3 border border-white/10 bg-black/20 p-4" key={note}>
                    <ListChecks className="mt-0.5 h-5 w-5 text-rafin-gold-soft" />
                    <p className="text-white/72">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'documents' ? (
            <div>
              <h2 className="text-2xl text-white">Documents</h2>
              <div className="mt-5 grid gap-3">
                {(
                  product.documents ?? [
                    'Commercial and machine documentation confirmed after inquiry.',
                  ]
                ).map((document) => (
                  <div className="inline-flex items-center gap-3 border border-white/10 bg-black/20 p-4" key={document}>
                    <FileText className="h-5 w-5 text-rafin-gold-soft" />
                    <span className="text-white/72">{document}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {activeTab === 'delivery' ? (
            <div>
              <h2 className="text-2xl text-white">Delivery & contract</h2>
              <p className="mt-4 text-rafin-muted-light">
                This listing is handled through direct company-to-company communication. Rafin can discuss inspection appointments, transport planning, invoice flow, and delivery terms after receiving your request.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="border border-white/10 bg-black/20 p-4 text-white/72">
                  Payment is not handled online. Terms are discussed directly with Rafin during contract review.
                </div>
                <div className="border border-white/10 bg-black/20 p-4 text-white/72">
                  Delivery, export, and inspection coordination can be included in the same inquiry process when required.
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {previous ? (
            <Button to={routes.product(previous.categorySlug, previous.slug)} variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              Previous Product
            </Button>
          ) : (
            <div />
          )}
          {next ? (
            <Button to={routes.product(next.categorySlug, next.slug)} variant="secondary">
              Next Product
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : null}
        </div>
      </section>

      <section className="section-shell pb-24">
        <h2 className="text-4xl text-white">Similar products</h2>
        <div className="mt-8 grid gap-5 xl:grid-cols-3">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </section>
    </>
  );
}
