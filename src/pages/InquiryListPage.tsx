import { Trash2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { getProductsByIds } from '../data/catalog';
import { useInquiryList } from '../hooks/useInquiryList';
import { formatProductPrice } from '../utils/formatPrice';
import { routes } from '../utils/routes';

export function InquiryListPage() {
  const { clearItems, items, removeItem, updateNotes, updateQuantity } = useInquiryList();
  const products = getProductsByIds(items.map((item) => item.productId));

  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <div className="border border-white/10 bg-rafin-panel px-6 py-8 sm:px-8 sm:py-9">
          <p className="eyebrow">Inquiry List</p>
          <h1 className="mt-4 text-4xl text-white sm:text-5xl">Build one request around the products you need</h1>
          <p className="mt-4 max-w-3xl text-base text-rafin-muted-light sm:text-lg">
            This is an inquiry workspace, not an instant online purchase flow. It helps buyers collect machines, parts, and notes before sending one consolidated inquiry to Rafin.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        {products.length === 0 ? (
          <EmptyState
            description="Add products from the catalog to start a company inquiry. You can still contact Rafin directly for a general request."
            title="Your inquiry list is empty"
          />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
            <div className="space-y-5">
              {products.map((product) => {
                const item = items.find((entry) => entry.productId === product.id);

                return (
                  <article
                    className="grid gap-5 border border-white/10 bg-rafin-panel p-5 sm:grid-cols-[220px_1fr]"
                    key={product.id}
                  >
                    <ImageWithFallback alt={product.title} className="h-full min-h-[180px]" src={product.images[0]?.src} />
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rafin-gold-soft">
                            {product.brand}
                          </p>
                          <h2 className="mt-2 text-2xl text-white">{product.title}</h2>
                          <p className="mt-3 text-sm text-rafin-muted-light">{product.excerpt}</p>
                        </div>
                        <button
                          aria-label={`Remove ${product.title}`}
                          className="inline-flex h-10 w-10 items-center justify-center border border-white/10 text-white/70 transition hover:text-rafin-gold-soft"
                          onClick={() => removeItem(product.id)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-5 grid gap-4 sm:grid-cols-3">
                        <div className="border border-white/10 bg-black/20 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Price</p>
                          <p className="mt-2 text-lg text-white">{formatProductPrice(product)}</p>
                        </div>
                        <label className="border border-white/10 bg-black/20 p-4 text-sm text-white/72">
                          Quantity
                          <input
                            className="field mt-3"
                            min="1"
                            onChange={(event) => updateQuantity(product.id, Number(event.target.value))}
                            type="number"
                            value={item?.quantity ?? 1}
                          />
                        </label>
                        <div className="border border-white/10 bg-black/20 p-4">
                          <p className="text-xs uppercase tracking-[0.16em] text-white/45">Location</p>
                          <p className="mt-2 text-lg text-white">{product.location}</p>
                        </div>
                      </div>

                      <label className="mt-4 block text-sm text-white/72">
                        Internal or buyer notes
                        <textarea
                          className="field mt-3 min-h-[120px]"
                          onChange={(event) => updateNotes(product.id, event.target.value)}
                          placeholder="Example: include delivery timing, serial confirmation, spare parts, or inspection requests."
                          value={item?.notes ?? ''}
                        />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="border border-white/10 bg-rafin-panel p-6">
              <p className="eyebrow">Request Summary</p>
              <h2 className="mt-3 text-3xl text-white">{items.length} product line(s)</h2>
              <p className="mt-3 text-rafin-muted-light">
                Continue to the request form when your list reflects the machines or parts your company wants to discuss.
              </p>
              <div className="mt-6 grid gap-3">
                <Button to={routes.requestQuote}>Continue to Request</Button>
                <Button onClick={clearItems} variant="dark">
                  Clear Inquiry List
                </Button>
                <Button to={routes.equipment} variant="secondary">
                  Continue Browsing
                </Button>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
