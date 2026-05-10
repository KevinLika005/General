import { Building2, ClipboardList, FileText, ShieldCheck } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import type { InquiryItem } from '../../data/catalog';
import { getProductAvailabilityLabel, getProductsByIds } from '../../utils/catalog';
import { formatProductPrice } from '../../utils/formatPrice';
import { Button } from '../common/Button';

interface RequestQuoteFormProps {
  inquiryItems: InquiryItem[];
}

export function RequestQuoteForm({ inquiryItems }: RequestQuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const products = useMemo(
    () => getProductsByIds(inquiryItems.map((item) => item.productId)),
    [inquiryItems],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]" onSubmit={handleSubmit}>
      <div className="surface-panel p-6 sm:p-8">
        <div>
          <p className="eyebrow">Request quote or contract</p>
          <h2 className="mt-3 text-3xl text-brand-navy">Submit one B2B request for one or many products</h2>
          <p className="mt-3 text-text-muted">
            Rafin will review your request and continue the commercial discussion directly with your company.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm text-text-muted">
            Full name
            <input className="field" name="fullName" required type="text" />
          </label>
          <label className="block text-sm text-text-muted">
            Company name
            <input className="field" name="companyName" required type="text" />
          </label>
          <label className="block text-sm text-text-muted">
            NIPT / VAT number
            <input className="field" name="vatNumber" type="text" />
          </label>
          <label className="block text-sm text-text-muted">
            Email
            <input className="field" name="email" required type="email" />
          </label>
          <label className="block text-sm text-text-muted">
            Phone
            <input className="field" name="phone" required type="tel" />
          </label>
          <label className="block text-sm text-text-muted">
            Country / city
            <input className="field" name="location" required type="text" />
          </label>
          <label className="block text-sm text-text-muted">
            Preferred contact method
            <select className="field" name="contactMethod" required>
              <option value="">Choose one</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </label>
          <label className="block text-sm text-text-muted">
            Inquiry type
            <select className="field" name="inquiryType" required>
              <option value="">Choose one</option>
              <option value="product-information">Request information</option>
              <option value="price-quotation">Request quote</option>
              <option value="contract-request">Request contract discussion</option>
              <option value="inspection-appointment">Request inspection</option>
              <option value="delivery-information">Request delivery information</option>
            </select>
          </label>
          <label className="block text-sm text-text-muted">
            Timeline
            <select className="field" name="timeline" required>
              <option value="">Choose one</option>
              <option value="immediate">Immediate</option>
              <option value="1-2-weeks">1-2 weeks</option>
              <option value="this-month">This month</option>
              <option value="flexible">Flexible</option>
            </select>
          </label>
          <label className="block text-sm text-text-muted">
            Delivery preference
            <select className="field" name="deliveryPreference">
              <option value="">Choose one</option>
              <option value="pickup">Pickup</option>
              <option value="local-delivery">Local delivery</option>
              <option value="export-shipping">Export shipping</option>
              <option value="to-be-discussed">To be discussed</option>
            </select>
          </label>
          <label className="block text-sm text-text-muted sm:col-span-2">
            Message
            <textarea
              className="field min-h-[180px]"
              name="message"
              placeholder="Tell Rafin what you need, whether inspection is required, and any delivery, contract, or compatibility details that matter."
              required
            />
          </label>
        </div>

        <label className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-surface-subtle p-4 text-sm text-text-muted">
          <input className="mt-1 h-4 w-4 accent-[rgb(var(--brand-gold))]" name="consent" required type="checkbox" />
          <span>
            I understand this request starts a direct company-to-company discussion. Final price, inspection scope, and contract terms are handled directly with Rafin.
          </span>
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit">Submit B2B Request</Button>
          <Button to="/equipment" variant="secondary">Continue Browsing</Button>
        </div>
        {submitted ? (
          <p aria-live="polite" className="mt-4 text-sm text-brand-navy" role="status">
            Your request has been recorded in this frontend build. Rafin will contact your company to continue with product details, inspection planning, negotiation, and contract discussion. No online purchase has been placed.
          </p>
        ) : null}
      </div>

      <aside className="space-y-6">
        <div className="surface-panel p-6">
          <p className="eyebrow">Inquiry summary</p>
          <h3 className="mt-3 text-2xl text-brand-navy">Products in this request</h3>
          <div className="mt-4 space-y-3">
            {products.length === 0 ? (
              <p className="text-sm text-text-muted">
                No products are currently in the Inquiry List. You can still submit a general request.
              </p>
            ) : (
              products.map((product) => {
                const item = inquiryItems.find((entry) => entry.productId === product.id);

                return (
                  <div className="rounded-2xl border border-border bg-surface-subtle px-4 py-3" key={product.id}>
                    <p className="font-semibold text-brand-navy">{product.title}</p>
                    <p className="mt-1 text-sm text-text-muted">
                      Qty {item?.quantity ?? 1} | {formatProductPrice(product)}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{getProductAvailabilityLabel(product.availability)}</p>
                    {item?.notes ? (
                      <p className="mt-2 text-sm text-text-muted">Notes: {item.notes}</p>
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="surface-panel p-6">
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 h-5 w-5 text-brand-gold" />
            <div>
              <h3 className="text-xl text-brand-navy">Company-to-company process</h3>
              <p className="mt-2 text-sm text-text-muted">
                This catalog supports buyer research and initial inquiry only. Contract negotiation happens offline.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-subtle p-4">
              <ClipboardList className="mt-0.5 h-4 w-4 text-brand-gold" />
              <p className="text-sm text-text-muted">Submit one request for multiple machines, parts, or site equipment items.</p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-subtle p-4">
              <FileText className="mt-0.5 h-4 w-4 text-brand-gold" />
              <p className="text-sm text-text-muted">Inspection notes, documentation, delivery scope, and contract terms can be clarified after contact.</p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border bg-surface-subtle p-4">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-gold" />
              <p className="text-sm text-text-muted">This frontend build supports direct inquiry only, with no automatic transaction or instant order flow.</p>
            </div>
          </div>
        </div>
      </aside>
    </form>
  );
}
