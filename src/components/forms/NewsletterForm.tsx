import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';

export function NewsletterForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    event.currentTarget.reset();
  };

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="sr-only">{t('common.accessibility.emailAddress')}</span>
        <input
          className="h-11 w-full rounded-none border border-white/15 bg-white/10 px-4 py-3 text-white placeholder:text-white/45 focus:border-primary"
          placeholder="name@company.com"
          required
          type="email"
        />
      </label>
      <Button className="w-full" type="submit">
        {t('common.actions.getAlerts')}
      </Button>
      {submitted ? (
        <p aria-live="polite" className="text-sm text-white/80" role="status">
          {t('forms.newsletter.success')}
        </p>
      ) : null}
    </form>
  );
}
