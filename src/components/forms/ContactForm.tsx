import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';

export function ContactForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="surface-panel p-5 sm:p-6" onSubmit={handleSubmit}>
      <div className="border-b border-border pb-5">
        <p className="kicker">{t('forms.contact.eyebrow')}</p>
        <h2 className="mt-2 max-w-[20ch] text-[clamp(1.55rem,1.2rem+0.8vw,1.95rem)] text-navy">{t('forms.contact.title')}</h2>
        <p className="text-measure mt-3 text-sm text-text-muted">
          {t('forms.contact.description')}
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-text-muted">
          {t('common.labels.fullName')}
          <input className="field" name="fullName" required type="text" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.companyName')}
          <input className="field" name="companyName" required type="text" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.email')}
          <input className="field" name="email" required type="email" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.phone')}
          <input className="field" name="phone" required type="tel" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.cityCountry')}
          <input className="field" name="location" required type="text" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.requestType')}
          <select className="field" name="inquiryType" required>
            <option value="">{t('common.forms.chooseOne')}</option>
            <option value="product-information">{t('common.forms.productInformation')}</option>
            <option value="price-quotation">{t('common.forms.priceQuotation')}</option>
            <option value="contract-request">{t('common.forms.contractRequest')}</option>
            <option value="document-request">{t('common.forms.documentRequest')}</option>
            <option value="delivery-inspection">{t('common.forms.deliveryInspection')}</option>
          </select>
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.preferredContact')}
          <select className="field" name="contactMethod" required>
            <option value="">{t('common.forms.chooseOne')}</option>
            <option value="email">{t('common.forms.contactByEmail')}</option>
            <option value="phone">{t('common.forms.contactByPhone')}</option>
            <option value="whatsapp">{t('common.forms.whatsapp')}</option>
          </select>
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.timeline')}
          <select className="field" name="timeline" required>
            <option value="">{t('common.forms.chooseOne')}</option>
            <option value="immediate">{t('common.forms.immediate')}</option>
            <option value="this-week">{t('common.forms.thisWeek')}</option>
            <option value="this-month">{t('common.forms.thisMonth')}</option>
            <option value="flexible">{t('common.forms.flexible')}</option>
          </select>
        </label>
        <label className="block text-sm text-text-muted sm:col-span-2">
          {t('common.labels.message')}
          <textarea
            className="field min-h-[160px]"
            name="message"
            placeholder={t('forms.contact.messagePlaceholder')}
            required
          />
        </label>
      </div>

      <label className="mt-6 flex items-start gap-3 border border-border bg-surface-subtle p-4 text-sm text-text-muted">
        <input className="mt-1 h-4 w-4 accent-primary" name="consent" required type="checkbox" />
        <span>{t('forms.contact.consent')}</span>
      </label>

      <Button className="mt-6" type="submit">
        {t('common.actions.sendRequest')}
      </Button>
      {submitted ? (
        <p aria-live="polite" className="mt-4 text-sm text-navy" role="status">
          {t('forms.contact.success')}
        </p>
      ) : null}
    </form>
  );
}
