import { useState, type FormEvent } from 'react';
import { Button } from '../common/Button';

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="surface-panel p-5 sm:p-6" onSubmit={handleSubmit}>
      <div className="border-b border-border pb-5">
        <p className="kicker">Contact sales</p>
        <h2 className="mt-2 text-[1.75rem] text-navy xl:text-[1.9rem]">Start a direct equipment conversation</h2>
        <p className="mt-3 text-sm text-text-muted">
          Use this form for product details, quote requests, inspection planning, delivery coordination, or contract discussion.
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
          Email
          <input className="field" name="email" required type="email" />
        </label>
        <label className="block text-sm text-text-muted">
          Phone
          <input className="field" name="phone" required type="tel" />
        </label>
        <label className="block text-sm text-text-muted">
          City / country
          <input className="field" name="location" required type="text" />
        </label>
        <label className="block text-sm text-text-muted">
          Request type
          <select className="field" name="inquiryType" required>
            <option value="">Choose one</option>
            <option value="product-information">Request information</option>
            <option value="price-quotation">Request quote</option>
            <option value="contract-request">Request contract discussion</option>
            <option value="document-request">Request documents</option>
            <option value="delivery-inspection">Delivery or inspection</option>
          </select>
        </label>
        <label className="block text-sm text-text-muted">
          Preferred contact
          <select className="field" name="contactMethod" required>
            <option value="">Choose one</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
        </label>
        <label className="block text-sm text-text-muted">
          Timeline
          <select className="field" name="timeline" required>
            <option value="">Choose one</option>
            <option value="immediate">Immediate</option>
            <option value="this-week">This week</option>
            <option value="this-month">This month</option>
            <option value="flexible">Flexible</option>
          </select>
        </label>
        <label className="block text-sm text-text-muted sm:col-span-2">
          Message
          <textarea
            className="field min-h-[160px]"
            name="message"
            placeholder="Share the machines, parts, or support you need, along with inspection, delivery, or contract details."
            required
          />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 border border-border bg-surface-subtle p-4 text-sm text-text-muted">
        <input className="mt-1 h-4 w-4 accent-[rgb(var(--primary))]" name="consent" required type="checkbox" />
        <span>I understand this message starts a direct company-to-company inquiry. No online payment or automatic agreement happens on this website.</span>
      </label>

      <Button className="mt-6" type="submit">
        Send Request
      </Button>
      {submitted ? (
        <p aria-live="polite" className="mt-4 text-sm text-navy" role="status">
          Your inquiry has been recorded in this frontend build. Rafin will follow up directly to continue the commercial conversation.
        </p>
      ) : null}
    </form>
  );
}
