import { useMemo, useRef, useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  createFormStartedAt,
  submitForm,
  type FormSubmissionFailure,
} from '../../services/formSubmission';
import { Button } from '../common/Button';

const FIELD_LABEL_KEYS = {
  companyName: 'common.labels.companyName',
  contactMethod: 'common.labels.preferredContact',
  consent: 'forms.contact.consent',
  email: 'common.labels.email',
  form_started_at: 'forms.shared.startedAt',
  fullName: 'common.labels.fullName',
  inquiryType: 'common.labels.requestType',
  location: 'common.labels.cityCountry',
  message: 'common.labels.message',
  phone: 'common.labels.phone',
  source_path: 'forms.shared.sourcePath',
  source_url: 'forms.shared.sourceUrl',
} as const;

function getFieldClass(hasError: boolean) {
  return ['field', hasError ? 'border-primary ring-1 ring-primary' : ''].filter(Boolean).join(' ');
}

export function ContactForm() {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [fieldErrors, setFieldErrors] = useState<string[]>([]);
  const [formStartedAt, setFormStartedAt] = useState(() => createFormStartedAt());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormSubmissionFailure | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const invalidFieldSummary = useMemo(
    () =>
      fieldErrors
        .map((field) => FIELD_LABEL_KEYS[field as keyof typeof FIELD_LABEL_KEYS])
        .filter(Boolean)
        .map((labelKey) => t(labelKey))
        .join(', '),
    [fieldErrors, t],
  );

  const hasFieldError = (fieldName: string) => fieldErrors.includes(fieldName);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setFieldErrors([]);
    setStatus(null);
    setSuccessMessage('');

    const result = await submitForm({
      form: event.currentTarget,
      formType: 'contact',
    });

    setIsSubmitting(false);

    if (result.ok) {
      formRef.current?.reset();
      setFormStartedAt(createFormStartedAt());
      setSuccessMessage(result.message);
      return;
    }

    setFieldErrors(result.fields);
    setStatus(result);
  };

  return (
    <form className="surface-panel p-5 sm:p-6" onSubmit={handleSubmit} ref={formRef}>
      <input name="formType" type="hidden" value="contact" />
      <input name="form_started_at" type="hidden" value={formStartedAt} />
      <input name="source_path" type="hidden" value="" />
      <input name="source_url" type="hidden" value="" />
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="contact-company-website">{t('forms.shared.leaveBlank')}</label>
        <input autoComplete="off" id="contact-company-website" name="company_website" tabIndex={-1} type="text" />
      </div>
      <div className="border-b border-border pb-5">
        <p className="kicker">{t('forms.contact.eyebrow')}</p>
        <h2 className="mt-2 max-w-[20ch] text-[clamp(1.55rem,1.2rem+0.8vw,1.95rem)] text-navy">{t('forms.contact.title')}</h2>
        <p className="text-measure mt-3 text-sm text-text-muted">
          {t('forms.contact.description')}
        </p>
      </div>

      <fieldset className="mt-6 grid gap-4 sm:grid-cols-2" disabled={isSubmitting}>
        <label className="block text-sm text-text-muted">
          {t('common.labels.fullName')}
          <input aria-invalid={hasFieldError('fullName')} className={getFieldClass(hasFieldError('fullName'))} name="fullName" required type="text" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.companyName')}
          <input aria-invalid={hasFieldError('companyName')} className={getFieldClass(hasFieldError('companyName'))} name="companyName" required type="text" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.email')}
          <input aria-invalid={hasFieldError('email')} className={getFieldClass(hasFieldError('email'))} name="email" required type="email" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.phone')}
          <input aria-invalid={hasFieldError('phone')} className={getFieldClass(hasFieldError('phone'))} name="phone" required type="tel" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.cityCountry')}
          <input aria-invalid={hasFieldError('location')} className={getFieldClass(hasFieldError('location'))} name="location" required type="text" />
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.requestType')}
          <select aria-invalid={hasFieldError('inquiryType')} className={getFieldClass(hasFieldError('inquiryType'))} name="inquiryType" required>
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
          <select aria-invalid={hasFieldError('contactMethod')} className={getFieldClass(hasFieldError('contactMethod'))} name="contactMethod" required>
            <option value="">{t('common.forms.chooseOne')}</option>
            <option value="email">{t('common.forms.contactByEmail')}</option>
            <option value="phone">{t('common.forms.contactByPhone')}</option>
            <option value="whatsapp">{t('common.forms.whatsapp')}</option>
          </select>
        </label>
        <label className="block text-sm text-text-muted">
          {t('common.labels.timeline')}
          <select aria-invalid={hasFieldError('timeline')} className={getFieldClass(hasFieldError('timeline'))} name="timeline" required>
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
            aria-invalid={hasFieldError('message')}
            className={[getFieldClass(hasFieldError('message')), 'min-h-[160px]'].join(' ')}
            name="message"
            placeholder={t('forms.contact.messagePlaceholder')}
            required
          />
        </label>
      </fieldset>

      <label className="mt-6 flex items-start gap-3 border border-border bg-surface-subtle p-4 text-sm text-text-muted">
        <input aria-invalid={hasFieldError('consent')} className="mt-1 h-4 w-4 accent-primary" disabled={isSubmitting} name="consent" required type="checkbox" />
        <span>{t('forms.contact.consent')}</span>
      </label>

      <Button className="mt-6" disabled={isSubmitting} type="submit">
        {isSubmitting ? t('common.actions.sending') : t('common.actions.sendRequest')}
      </Button>
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
    </form>
  );
}
