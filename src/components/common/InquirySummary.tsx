import { ArrowRight, ClipboardList, Trash2, X } from 'lucide-react';
import { useInquiryList } from '../../hooks/useInquiryList';
import { getProductAvailabilityLabel, getProductsByIds } from '../../utils/catalog';
import { formatProductPrice } from '../../utils/formatPrice';
import { routes } from '../../utils/routes';
import { Button } from './Button';
import { ImageWithFallback } from './ImageWithFallback';

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
            <p className="kicker">Inquiry List</p>
            <h2 className="mt-2 text-[2rem] text-brand-navy">{itemCount} requested item(s)</h2>
            <p className="mt-2 text-sm text-text-muted">
              This is not a checkout. Rafin uses this list to prepare pricing, product details,
              inspection options, and contract next steps.
            </p>
          </div>
          <button
            aria-label="Close inquiry summary"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-border text-text"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface-card p-6 text-sm text-text-muted">
              No products in the Inquiry List yet. Add equipment, parts, or tools before requesting
              information, pricing, or contract follow-up.
            </div>
          ) : (
            products.map((product) => {
              const item = items.find((entry) => entry.productId === product.id);

              return (
                <article
                  className="rounded-xl border border-border bg-surface-card p-4 shadow-card"
                  key={product.id}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 shrink-0">
                      <ImageWithFallback
                        alt={product.images[0]?.alt ?? product.title}
                        aspectRatio="video"
                        src={product.images[0]?.src}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-label">
                        {product.brand} / {product.model}
                      </p>
                      <h3 className="mt-2 text-base text-brand-navy">{product.title}</h3>
                      <p className="mt-2 text-sm text-text-muted">
                        Qty {item?.quantity ?? 1} | {formatProductPrice(product)}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">
                        {getProductAvailabilityLabel(product.availability)} | {product.location}
                      </p>
                    </div>
                    <button
                      aria-label={`Remove ${product.title}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[6px] border border-border text-text-muted transition hover:border-brand-gold hover:text-brand-navy"
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
          <div className="rounded-xl border border-border bg-surface-card p-4">
            <div className="flex items-start gap-3">
              <ClipboardList className="mt-0.5 h-4 w-4 text-brand-gold" />
              <p className="text-sm text-text-muted">
                Continue when your team is ready for pricing, technical clarification, inspection,
                or contract discussion.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <Button to={routes.inquiryList} variant="secondary">
              Review Inquiry List
            </Button>
            <Button to={routes.requestQuote}>
              Request Quote
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button onClick={clearItems} variant="ghost">
              Clear Inquiry List
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
