import { ArrowRight, Trash2, X } from 'lucide-react';
import { useInquiryList } from '../../hooks/useInquiryList';
import { getProductAvailabilityLabel, getProductsByIds } from '../../utils/catalog';
import { formatProductPrice } from '../../utils/formatPrice';
import { routes } from '../../utils/routes';
import { Button } from './Button';

interface InquirySummaryProps {
  open: boolean;
  onClose: () => void;
}

export function InquirySummary({ onClose, open }: InquirySummaryProps) {
  const { clearItems, itemCount, items, removeItem } = useInquiryList();
  const products = getProductsByIds(items.map((item) => item.productId));

  if (!open) {
    return null;
  }

  return (
    <>
      <button
        aria-label="Close inquiry summary"
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
        type="button"
      />
      <aside aria-label="Inquiry summary" aria-modal="true" className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-surface-page shadow-dropdown" role="dialog">
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <p className="eyebrow">Inquiry List</p>
            <h2 className="mt-2 text-2xl text-brand-navy">{itemCount} requested item(s)</h2>
          </div>
          <button
            aria-label="Close inquiry summary"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {products.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface-card p-6 text-sm text-text-muted">
              No products in the inquiry list yet. Add equipment, parts, or tools before requesting a quote or contract.
            </div>
          ) : (
            products.map((product) => {
              const item = items.find((entry) => entry.productId === product.id);

              return (
                <article
                  className="rounded-2xl border border-border bg-surface-card p-4 shadow-card"
                  key={product.id}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold">
                        {product.brand}
                      </p>
                      <h3 className="mt-2 text-lg text-brand-navy">{product.title}</h3>
                      <p className="mt-2 text-sm text-text-muted">
                        Qty {item?.quantity ?? 1} | {formatProductPrice(product)}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        {getProductAvailabilityLabel(product.availability)}
                      </p>
                    </div>
                    <button
                      aria-label={`Remove ${product.title}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-muted transition hover:border-brand-gold hover:text-brand-navy"
                      onClick={() => removeItem(product.id)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </div>

        <div className="border-t border-border px-6 py-5">
          <div className="grid gap-3">
            <Button onClick={clearItems} variant="dark">
              Clear List
            </Button>
            <Button to={routes.inquiryList} variant="secondary">
              Review Inquiry List
            </Button>
            <Button to={routes.requestQuote}>
              Continue to Request
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
