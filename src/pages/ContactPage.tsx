import { useTranslation } from 'react-i18next';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactForm } from '../components/forms/ContactForm';
import { getCompanyProfile, getSalesContacts } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function ContactPage() {
  const { t } = useTranslation();
  const companyProfile = getCompanyProfile();
  const salesContacts = getSalesContacts();
  usePageMetadata({
    title: t('metadata.contact.title'),
    description: t('metadata.contact.description'),
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description={t('pages.contact.description')}
          eyebrow={t('pages.contact.eyebrow')}
          title={t('pages.contact.title')}
          titleAs="h1"
        />
      </section>

      <section className="wide-shell pb-12">
        <div className="support-grid">
          <article className="toolbar-panel p-4 shadow-card">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">{t('common.labels.salesPhone')}</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.phone}</p>
            <p className="text-sm text-text-muted">{companyProfile.secondaryPhone}</p>
          </article>
          <article className="toolbar-panel p-4 shadow-card">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">{t('common.labels.email')}</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.email}</p>
          </article>
          <article className="toolbar-panel p-4 shadow-card">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">{t('common.labels.address')}</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.address}</p>
          </article>
          <article className="toolbar-panel p-4 shadow-card">
            <Clock3 className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">{t('common.labels.businessHours')}</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.hours}</p>
          </article>
        </div>
      </section>

      <section className="catalog-shell pb-24">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(19rem,0.82fr)]">
          <ContactForm />
          <div className="space-y-5">
            <div className="surface-panel p-5">
              <p className="kicker">{t('pages.contact.salesContacts.eyebrow')}</p>
              <h2 className="mt-2 text-[1.45rem] text-navy xl:text-[1.6rem]">{t('pages.contact.salesContacts.title')}</h2>
              <div className="mt-5 grid gap-4">
                {salesContacts.map((contact) => (
                  <article className="border border-border bg-surface-subtle p-4" key={contact.email}>
                    <h3 className="text-[1.05rem] text-navy">{contact.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-text-muted">{contact.title}</p>
                    <p className="mt-3 text-sm text-text-muted">{contact.note}</p>
                    <p className="mt-3 text-sm text-navy">{contact.phone}</p>
                    <p className="text-sm text-navy">{contact.email}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.08em] text-text-muted">
                      {t('common.labels.preferred')}: {t(`common.forms.${contact.preferredMethod === 'email' ? 'contactByEmail' : contact.preferredMethod === 'phone' ? 'contactByPhone' : 'whatsapp'}`)} | {contact.markets.join(', ')}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5">
              <p className="kicker">{t('pages.contact.visit.eyebrow')}</p>
              <h2 className="mt-2 text-[1.45rem] text-navy xl:text-[1.6rem]">{t('pages.contact.visit.title')}</h2>
              <p className="mt-3 text-sm text-text-muted">
                {t('pages.contact.visit.description')}
              </p>
              <div className="mt-5 border border-dashed border-border bg-surface-subtle p-6 text-center text-sm text-text-muted">
                {t('pages.contact.visit.placeholder')}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
