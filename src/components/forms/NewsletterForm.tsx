import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';

export function NewsletterForm() {
  const { t } = useTranslation();
  const [noticeVisible, setNoticeVisible] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNoticeVisible(true);
  };

  return (
    <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
      <label className="block">
        <span className="sr-only">{t('common.accessibility.emailAddress')}</span>
        <input
          className="inverse-field h-11 w-full rounded-none px-4 py-3 text-text-on-dark focus:border-primary"
          placeholder={t('forms.newsletter.emailPlaceholder')}
          required
          type="email"
        />
      </label>
      <Button className="w-full" type="submit">
        {t('common.actions.getAlerts')}
      </Button>
      {noticeVisible ? (
        <p aria-live="polite" className="text-sm text-text-on-dark/80" role="status">
          {t('forms.newsletter.notice')}
        </p>
      ) : null}
    </form>
  );
}
