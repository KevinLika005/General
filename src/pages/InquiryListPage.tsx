import { ClipboardList, Trash2 } from 'lucide-react';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { useInquiryList } from '../hooks/useInquiryList';
import { getProductAvailabilityLabel, getProductsByIds } from '../utils/catalog';
import { formatProductPrice } from '../utils/formatPrice';
import { routes } from '../utils/routes';

export function InquiryListPage() {
  const { clearItems, items, removeItem, updateNotes, updateQuantity } = useInquiryList();
  const products = getProductsByIds(items.map((item) => item.productId));

  usePageMetadata({
    title: 'Inquiry List | Rafin Machinery',
    description: 'Review selected machinery, parts, and tools before sending one consolidated B2B quote or contract request to Rafin.',
  });

  return (
    <>
      <section className="page-shell">
        <div className="surface-panel p-5 sm:p-6">
          <p className="kicker">Inquiry List</p>
          <h1 className="mt-2 text-[1.9rem] text-navy sm:text-[2.3rem] xl:text-[2.7rem]">
            Build one useful request around the products your team needs
          </h1>
          <p className="mt-3 max-w-3xl text-sm text-text-muted sm:text-base">
            This is not a checkout. Your Inquiry List helps Rafin prepare product details, pricing, inspection options, document support, delivery discussion, and contract next steps.
          </p>
        </div>
      </section>

      <section className="section-shell pb-24">
        {products.length === 0 ? (
          <EmptyState
            actionLabel="Browse Equipment"
            actionTo={routes.equipment}
            description="Add products from the catalog to start a company inquiry, or contact the sales team directly for a general machinery request."
            secondaryActionLabel="Contact Sales"
            secondaryActionTo={routes.contact}
            title="Your Inquiry List is empty"
          />
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
            <div className="space-y-4">
              {products.map((product) => {
                const item = items.find((entry) => entry.productId === product.id);

                return (
                  <article
                    className="grid gap-5 border border-border bg-surface-card p-4 shadow-card sm:grid-cols-[180px_1fr]"
                    key={product.id}
                  >
                    <ImageWithFallback alt={product.title} aspectRatio="video" className="h-full" src={product.images[0]?.src} />
                    <div>
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="line-label">
                            {product.brand} / {product.model} / {product.sku}
                          </p>
                          <h2 className="mt-2 text-[1.35rem] text-navy">{product.title}</h2>
                          <p className="mt-2 text-sm text-text-muted">{product.excerpt}</p>
                        </div>
                        <button
                          aria-label={`Remove ${product.title}`}
                          className="inline-flex h-10 w-10 items-center justify-center border border-border text-text-muted transition hover:border-primary hover:text-navy"
                          onClick={() => removeItem(product.id)}
                          type="button"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
                        <div className="bg-surface-subtle p-4">
                          <p className="line-label">Price mode</p>
                          <p className="mt-1 text-sm font-semibold text-navy">{formatProductPrice(product)}</p>
                          <p className="mt-1 text-xs text-text-muted">{getProductAvailabilityLabel(product.availability)}</p>
                        </div>
                        <label className="bg-surface-subtle p-4 text-sm text-text-muted">
                          Quantity
                          <input
                            className="field mt-3"
                            min="1"
                            onChange={(event) => updateQuantity(product.id, Number(event.target.value))}
                            type="number"
                            value={item?.quantity ?? 1}
                          />
                        </label>
                        <div className="bg-surface-subtle p-4">
                          <p className="line-label">Location</p>
                          <p className="mt-1 text-sm font-semibold text-navy">{product.location}</p>
                        </div>
                      </div>

                      <label className="mt-4 block text-sm text-text-muted">
                        Product notes for Rafin
                        <textarea
                          className="field mt-3 min-h-[110px]"
                          onChange={(event) => updateNotes(product.id, event.target.value)}
                          placeholder="Example: request inspection timing, serial confirmation, compatibility checks, spare parts, or delivery discussion."
                          value={item?.notes ?? ''}
                        />
                      </label>
                    </div>
                  </article>
                );
              })}
            </div>

            <aside className="space-y-5 xl:sticky xl:top-[8.65rem] xl:self-start">
              <div className="surface-panel p-5">
                <p className="kicker">Request summary</p>
                <h2 className="mt-2 text-[1.5rem] text-navy xl:text-[1.7rem]">{items.length} product line(s)</h2>
                <p className="mt-3 text-sm text-text-muted">
                  Continue to the request form when your list reflects the machines, tools, or parts your company wants to discuss.
                </p>
                <div className="mt-5 grid gap-3">
                  <Button to={routes.requestQuote}>Request Quote</Button>
                  <Button onClick={clearItems} variant="secondary">
                    Clear Inquiry List
                  </Button>
                  <Button to={routes.equipment} variant="ghost">
                    Continue Browsing
                  </Button>
                </div>
              </div>

              <div className="surface-panel p-5">
                <div className="flex items-start gap-3">
                  <ClipboardList className="mt-0.5 h-5 w-5 text-primary" />
                  <div>
                    <h2 className="text-xl text-navy">What Rafin prepares from this list</h2>
                    <div className="mt-4 grid gap-3">
                      {[
                        'Pricing mode and commercial clarification for each selected product',
                        'Inspection options, condition review, and documentation follow-up',
                        'Bundled parts or accessory discussion where relevant',
                        'Contract, delivery, and next-step coordination after buyer contact',
                      ].map((point) => (
                        <div className="border border-border bg-surface-subtle p-4 text-sm text-text-muted" key={point}>
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
