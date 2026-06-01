import { Building2, ClipboardList, FileText, ShieldCheck } from 'lucide-react';
import { useMemo, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import type { InquiryItem } from '../../data/catalog';
import { useInquiryList } from '../../hooks/useInquiryList';
import {
  createFormStartedAt,
  submitForm,
  type FormSubmissionFailure,
} from '../../services/formSubmission';
import { getProductAvailabilityLabel, getProductsByIds } from '../../utils/catalog';
import { formatProductPrice } from '../../utils/formatPrice';
import { buildQuoteProductsPayload } from '../../utils/quoteProducts';
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
  const { clearItems } = useInquiryList();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [formStartedAt, setFormStartedAt] = useState(() => createFormStartedAt());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormSubmissionFailure | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const products = useMemo(
    () => getProductsByIds(inquiryItems.map((item) => item.productId)),
    [inquiryItems],
  );
  const serializedProducts = useMemo(
    () => JSON.stringify(buildQuoteProductsPayload(inquiryItems)),
    [inquiryItems],
  );

  const fieldLabelMap: Record<string, string> = {
    companyName: t('common.labels.companyName'),
    companyRole: t('common.labels.companyRole'),
    consent: t('forms.quote.consent'),
    contactMethod: t('common.labels.preferredContactMethod'),
    deliveryPreference: t('common.labels.deliveryPreference'),
    email: t('common.labels.email'),
    form_started_at: t('forms.shared.startedAt'),
    fullName: t('common.labels.fullName'),
    inquiryType: t('common.labels.requestType'),
    location: t('common.labels.countryCity'),
    message: t('common.labels.message'),
    phone: t('common.labels.phone'),
    products_json: t('forms.shared.selectedProductsPayload'),
    source_path: t('forms.shared.sourcePath'),
    source_url: t('forms.shared.sourceUrl'),
    timeline: t('common.labels.timeline'),
    vatNumber: t('common.labels.vatNumber'),
  };

  const invalidFieldSummary = fieldErrors
    .map((field) => fieldLabelMap[field])
    .filter(Boolean)
    .join(', ');

  const hasFieldError = (fieldName: string) => fieldErrors.includes(fieldName);
  const getFieldClass = (hasError: boolean) =>
    ['field', hasError ? 'border-primary ring-1 ring-primary' : ''].filter(Boolean).join(' ');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFieldErrors([]);
    setStatus(null);
    setSuccessMessage('');
    setIsSubmitting(true);

    const result = await submitForm({
      extraFields: {
        products_json: serializedProducts,
      },
      form: event.currentTarget,
      formType: 'request_quote',
    });

    setIsSubmitting(false);

    if (result.ok) {
      formRef.current?.reset();
      clearItems();
      setFormStartedAt(createFormStartedAt());
      setSuccessMessage(result.message);
      return;
    }

    setFieldErrors(result.fields);
    setStatus(result);
  };

  return (
    <form className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_clamp(19rem,24vw,24rem)]" onSubmit={handleSubmit} ref={formRef}>
      <input name="formType" type="hidden" value="request_quote" />
      <input name="form_started_at" type="hidden" value={formStartedAt} />
      <input name="products_json" type="hidden" value={serializedProducts} />
      <input name="source_path" type="hidden" value="" />
      <input name="source_url" type="hidden" value="" />
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="quote-company-website">{t('forms.shared.leaveBlank')}</label>
        <input autoComplete="off" id="quote-company-website" name="company_website" tabIndex={-1} type="text" />
      </div>
      <div className="surface-panel p-5 sm:p-6">
        <div className="border-b border-border pb-5">
          <p className="kicker">{t('forms.quote.eyebrow')}</p>
          <h2 className="mt-2 max-w-[22ch] text-[clamp(1.55rem,1.2rem+0.8vw,1.95rem)] text-navy">{t('forms.quote.title')}</h2>
          <p className="text-measure mt-3 text-sm text-text-muted">
            {t('forms.quote.description')}
          </p>
        </div>

        <fieldset className="mt-6 space-y-7" disabled={isSubmitting}>
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="mb-1 text-base font-semibold text-navy">{t('forms.quote.buyerDetails')}</legend>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.fullName')}</RequiredLabel>
              <input aria-invalid={hasFieldError('fullName')} className={getFieldClass(hasFieldError('fullName'))} name="fullName" required type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.companyName')}</RequiredLabel>
              <input aria-invalid={hasFieldError('companyName')} className={getFieldClass(hasFieldError('companyName'))} name="companyName" required type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              {t('common.labels.companyRole')}
              <input aria-invalid={hasFieldError('companyRole')} className={getFieldClass(hasFieldError('companyRole'))} name="companyRole" type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              {t('common.labels.vatNumber')}
              <input aria-invalid={hasFieldError('vatNumber')} className={getFieldClass(hasFieldError('vatNumber'))} name="vatNumber" type="text" />
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.email')}</RequiredLabel>
              <input aria-invalid={hasFieldError('email')} className={getFieldClass(hasFieldError('email'))} name="email" required type="email" />
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.phone')}</RequiredLabel>
              <input aria-invalid={hasFieldError('phone')} className={getFieldClass(hasFieldError('phone'))} name="phone" required type="tel" />
            </label>
            <label className="block text-sm text-text-muted sm:col-span-2">
              <RequiredLabel>{t('common.labels.countryCity')}</RequiredLabel>
              <input aria-invalid={hasFieldError('location')} className={getFieldClass(hasFieldError('location'))} name="location" required type="text" />
            </label>
          </fieldset>

          <fieldset className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
            <legend className="mb-1 text-base font-semibold text-navy">{t('forms.quote.requestIntent')}</legend>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.requestType')}</RequiredLabel>
              <select aria-invalid={hasFieldError('inquiryType')} className={getFieldClass(hasFieldError('inquiryType'))} name="inquiryType" required>
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
              <select aria-invalid={hasFieldError('contactMethod')} className={getFieldClass(hasFieldError('contactMethod'))} name="contactMethod" required>
                <option value="">{t('common.forms.chooseOne')}</option>
                <option value="email">{t('common.forms.contactByEmail')}</option>
                <option value="phone">{t('common.forms.contactByPhone')}</option>
                <option value="whatsapp">{t('common.forms.whatsapp')}</option>
              </select>
            </label>
            <label className="block text-sm text-text-muted">
              <RequiredLabel>{t('common.labels.timeline')}</RequiredLabel>
              <select aria-invalid={hasFieldError('timeline')} className={getFieldClass(hasFieldError('timeline'))} name="timeline" required>
                <option value="">{t('common.forms.chooseOne')}</option>
                <option value="immediate">{t('common.forms.immediate')}</option>
                <option value="1-2-weeks">{t('common.forms.oneToTwoWeeks')}</option>
                <option value="this-month">{t('common.forms.thisMonth')}</option>
                <option value="flexible">{t('common.forms.flexible')}</option>
              </select>
            </label>
            <label className="block text-sm text-text-muted">
              {t('common.labels.deliveryPreference')}
              <select aria-invalid={hasFieldError('deliveryPreference')} className={getFieldClass(hasFieldError('deliveryPreference'))} name="deliveryPreference">
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
                aria-invalid={hasFieldError('message')}
                className={[getFieldClass(hasFieldError('message')), 'min-h-[180px]'].join(' ')}
                name="message"
                placeholder={t('forms.quote.messagePlaceholder')}
                required
              />
            </label>
          </fieldset>
        </fieldset>

        <label className="mt-6 flex items-start gap-3 border border-border bg-surface-subtle p-4 text-sm text-text-muted">
          <input aria-invalid={hasFieldError('consent')} className="mt-1 h-4 w-4 accent-primary" disabled={isSubmitting} name="consent" required type="checkbox" />
          <span>
            {t('forms.quote.consent')}
          </span>
        </label>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button disabled={isSubmitting} type="submit">{isSubmitting ? t('common.actions.sending') : t('common.actions.submitRequest')}</Button>
          <Button to="/equipment" variant="secondary">{t('common.actions.continueBrowsing')}</Button>
        </div>
        {status ? (
          <div aria-live="polite" className="mt-4 border border-primary/30 bg-surface-subtle p-4 text-sm text-navy" role="alert">
            <p>{status.message}</p>
            {invalidFieldSummary ? <p className="mt-2">{t('forms.shared.reviewFields', { fields: invalidFieldSummary })}</p> : null}
          </div>
        ) : null}
        {successMessage ? (
          <p aria-live="polite" className="mt-4 text-sm text-navy" role="status">
            {successMessage}
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
