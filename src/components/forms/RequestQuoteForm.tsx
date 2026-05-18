import { Building2, ClipboardList, FileText, ShieldCheck } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { InquiryItem } from '../../data/catalog';
import { getProductAvailabilityLabel, getProductsByIds } from '../../utils/catalog';
import { formatProductPrice } from '../../utils/formatPrice';
import { Button } from '../common/Button';

interface RequestQuoteFormProps {
  inquiryItems: InquiryItem[];
}

function RequiredLabel({ children }: { children: string }) {
  return (
    <span>
      {children} <span aria-hidden="true" className="text-primary">*</span>
    </span>
  );
}

export function RequestQuoteForm({ inquiryItems }: RequestQuoteFormProps) {
  const { t } = useTranslation();
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
    <form className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_clamp(19rem,24vw,24rem)]" onSubmit={handleSubmit}>
      <div className="surface-panel p-5 sm:p-6">
        <div className="border-b border-border pb-5">
          <p className="kicker">{t('forms.quote.eyebrow')}</p>
          <h2 className="mt-2 max-w-[22ch] text-[clamp(1.55rem,1.2rem+0.8vw,1.95rem)] text-navy">{t('forms.quote.title')}</h2>
          <p className="text-measure mt-3 text-sm text-text-muted">
            {t('forms.quote.description')}
          </p>
        </div>

        <div className="mt-6 space-y-7">
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="mb-1 text-base font-semibold text-navy">{t('forms.quote.buyerDetails')}</legend>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.fullName')}</RequiredLabel>
              <input className="field" name="fullName" required type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.companyName')}</RequiredLabel>
              <input className="field" name="companyName" required type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              {t('common.labels.companyRole')}
              <input className="field" name="companyRole" type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              {t('common.labels.vatNumber')}
              <input className="field" name="vatNumber" type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.email')}</RequiredLabel>
              <input className="field" name="email" required type="email" />
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.phone')}</RequiredLabel>
              <input className="field" name="phone" required type="tel" />
            </label>
            <label className="block text-sm text-text-muted sm:col-span-2">
              <RequiredLabel>{t('common.labels.countryCity')}</RequiredLabel>
              <input className="field" name="location" required type="text" />
            </label>
          </fieldset>

          <fieldset className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <legend className="mb-1 text-base font-semibold text-navy">{t('forms.quote.requestIntent')}</legend>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.requestType')}</RequiredLabel>
              <select className="field" name="inquiryType" required>
                <option value="">{t('common.forms.chooseOne')}</option>
                <option value="request-info">{t('common.forms.productInformation')}</option>
                <option value="request-quote">{t('common.forms.priceQuotation')}</option>
                <option value="request-contract">{t('common.forms.contractRequest')}</option>
                <option value="request-documents">{t('common.forms.documentRequest')}</option>
                <option value="request-inspection">{t('common.forms.requestInspection')}</option>
              </select>
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.preferredContactMethod')}</RequiredLabel>
              <select className="field" name="contactMethod" required>
                <option value="">{t('common.forms.chooseOne')}</option>
                <option value="email">{t('common.forms.contactByEmail')}</option>
                <option value="phone">{t('common.forms.contactByPhone')}</option>
                <option value="whatsapp">{t('common.forms.whatsapp')}</option>
              </select>
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.timeline')}</RequiredLabel>
              <select className="field" name="timeline" required>
                <option value="">{t('common.forms.chooseOne')}</option>
                <option value="immediate">{t('common.forms.immediate')}</option>
                <option value="1-2-weeks">{t('common.forms.oneToTwoWeeks')}</option>
                <option value="this-month">{t('common.forms.thisMonth')}</option>
                <option value="flexible">{t('common.forms.flexible')}</option>
              </select>
            </label>
            <label className="block text-sm text-text-muted">
              {t('common.labels.deliveryPreference')}
              <select className="field" name="deliveryPreference">
                <option value="">{t('common.forms.chooseOne')}</option>
                <option value="pickup">{t('common.forms.pickup')}</option>
                <option value="local-delivery">{t('common.forms.localDelivery')}</option>
                <option value="export-shipping">{t('common.forms.exportShipping')}</option>
                <option value="to-be-discussed">{t('common.forms.toBeDiscussed')}</option>
              </select>
            </label>
          </fieldset>

          <fieldset className="border-t border-border pt-6">
            <legend className="mb-1 text-base font-semibold text-navy">{t('forms.quote.requestMessage')}</legend>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.message')}</RequiredLabel>
              <textarea
                className="field min-h-[180px]"
                name="message"
                placeholder={t('forms.quote.messagePlaceholder')}
                required
              />
            </label>
          </fieldset>
        </div>

        <label className="mt-6 flex items-start gap-3 border border-border bg-surface-subtle p-4 text-sm text-text-muted">
          <input className="mt-1 h-4 w-4 accent-primary" name="consent" required type="checkbox" />
          <span>
            {t('forms.quote.consent')}
          </span>
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="submit">{t('common.actions.submitRequest')}</Button>
          <Button to="/equipment" variant="secondary">{t('common.actions.continueBrowsing')}</Button>
        </div>
        {submitted ? (
          <p aria-live="polite" className="mt-4 text-sm text-navy" role="status">
            {t('forms.quote.success')}
          </p>
        ) : null}
      </div>

      <aside className="space-y-6 xl:sticky xl:top-[8.65rem] xl:self-start">
        <div className="surface-panel p-5">
          <p className="kicker">{t('common.labels.selectedProducts')}</p>
          <h3 className="mt-2 text-[clamp(1.3rem,1rem+0.7vw,1.6rem)] text-navy">{t('forms.quote.selectedProductsTitle')}</h3>
          <div className="mt-4 space-y-3">
            {products.length === 0 ? (
              <p className="text-sm text-text-muted">
                {t('forms.quote.noProducts')}
              </p>
            ) : (
              products.map((product) => {
                const item = inquiryItems.find((entry) => entry.productId === product.id);

                return (
                  <div className="border border-border bg-surface-subtle px-4 py-3" key={product.id}>
                    <p className="line-label">{product.brand} / {product.model}</p>
                    <p className="mt-1 font-semibold text-navy">{product.title}</p>
                    <p className="mt-1 text-sm text-text-muted">
                      {t('common.status.qtyPrice', { quantity: item?.quantity ?? 1, price: formatProductPrice(product) })}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">{getProductAvailabilityLabel(product.availability)}</p>
                    {item?.notes ? <p className="mt-2 text-sm text-text-muted">{t('common.status.notesPrefix', { notes: item.notes })}</p> : null}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="surface-panel p-5">
          <div className="flex items-start gap-3">
            <Building2 className="mt-1 h-5 w-5 text-primary" />
            <div>
              <h3 className="text-xl text-navy">{t('forms.quote.whatNextTitle')}</h3>
              <p className="mt-2 text-sm text-text-muted">
                {t('forms.quote.whatNextDescription')}
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {(
              t('forms.quote.whatNextPoints', { returnObjects: true }) as string[]
            ).map((point, index) => (
            <div className="flex items-start gap-3 border border-border bg-surface-subtle p-4" key={point}>
              {index === 0 ? <ClipboardList className="mt-0.5 h-4 w-4 text-primary" /> : index === 1 ? <FileText className="mt-0.5 h-4 w-4 text-primary" /> : <ShieldCheck className="mt-0.5 h-4 w-4 text-primary" />}
              <p className="text-sm text-text-muted">{point}</p>
            </div>
            ))}
          </div>
        </div>
      </aside>
    </form>
  );
}
