import { useMemo, useState, type FormEvent } from 'react';
import type { InquiryItem } from '../../data/catalog';
import { getProductsByIds } from '../../data/catalog';
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
    <form className="border border-white/10 bg-rafin-panel p-6 sm:p-8" onSubmit={handleSubmit}>
      <div>
        <p className="eyebrow">Request Quote or Contract</p>
        <h2 className="mt-3 text-3xl text-white">Submit one B2B request for one or many products</h2>
        <p className="mt-3 text-rafin-muted-light">
          This is not an online purchase. Rafin will contact you to continue the commercial process offline.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-white/72">
          Full name
          <input className="field" name="fullName" required type="text" />
        </label>
        <label className="block text-sm text-white/72">
          Company name
          <input className="field" name="companyName" required type="text" />
        </label>
        <label className="block text-sm text-white/72">
          NIPT / VAT number
          <input className="field" name="vatNumber" type="text" />
        </label>
        <label className="block text-sm text-white/72">
          Email
          <input className="field" name="email" required type="email" />
        </label>
        <label className="block text-sm text-white/72">
          Phone
          <input className="field" name="phone" required type="tel" />
        </label>
        <label className="block text-sm text-white/72">
          Country / city
          <input className="field" name="location" required type="text" />
        </label>
        <label className="block text-sm text-white/72">
          Preferred contact method
          <select className="field" name="contactMethod" required>
            <option value="">Choose one</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label className="block text-sm text-white/72">
          Inquiry type
          <select className="field" name="inquiryType" required>
            <option value="">Choose one</option>
            <option value="product-information">Product information</option>
            <option value="price-quotation">Price quotation</option>
            <option value="contract-request">Contract request</option>
            <option value="inspection-appointment">Inspection appointment</option>
            <option value="delivery-information">Delivery information</option>
          </select>
        </label>
        <label className="block text-sm text-white/72">
          Timeline
          <select className="field" name="timeline" required>
            <option value="">Choose one</option>
            <option value="immediate">Immediate</option>
            <option value="1-2-weeks">1-2 weeks</option>
            <option value="this-month">This month</option>
            <option value="flexible">Flexible</option>
          </select>
        </label>
        <label className="block text-sm text-white/72 sm:col-span-2">
          Message
          <textarea
            className="field min-h-[160px]"
            name="message"
            placeholder="Tell Rafin what you need, whether inspection is required, and any contract or delivery detail that matters."
            required
          />
        </label>
      </div>

      <div className="mt-6 border border-white/10 bg-white/5 p-5">
        <h3 className="text-lg text-white">Products in this request</h3>
        <div className="mt-4 space-y-3">
          {products.length === 0 ? (
            <p className="text-sm text-rafin-muted-light">
              No products are currently in the inquiry list. You can still submit a general commercial request.
            </p>
          ) : (
            products.map((product) => {
              const item = inquiryItems.find((entry) => entry.productId === product.id);

              return (
                <div
                  className="border border-white/10 bg-black/20 px-4 py-3"
                  key={product.id}
                >
                  <p className="font-semibold text-white">{product.title}</p>
                  <p className="mt-1 text-sm text-rafin-muted-light">
                    Qty {item?.quantity ?? 1} | {formatProductPrice(product)}
                  </p>
                  {item?.notes ? (
                    <p className="mt-2 text-sm text-white/65">Notes: {item.notes}</p>
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      <label className="mt-6 flex items-start gap-3 text-sm text-white/72">
        <input className="mt-1 h-4 w-4 border border-white/20 bg-white/5 accent-[rgb(var(--rafin-gold))]" name="consent" type="checkbox" />
        <span>
          I understand this is not an online purchase. Rafin will contact me to continue the contract process.
        </span>
      </label>

      <Button className="mt-6" type="submit">
        Submit B2B Request
      </Button>
      {submitted ? (
        <p className="mt-4 text-sm text-rafin-gold-soft">
          Request submitted for this preview. No online purchase or payment flow has been created.
        </p>
      ) : null}
    </form>
  );
}
