import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactForm } from '../components/forms/ContactForm';
import { companyProfile, salesContacts } from '../data/catalog';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function ContactPage() {
  usePageMetadata({
    title: 'Contact | Rafin Machinery',
    description: 'Contact the Rafin Machinery sales team for product details, inspection scheduling, delivery planning, spare parts, and contract discussion.',
  });

  return (
    <>
      <section className="page-shell">
        <SectionHeader
          description="Talk directly to the sales side of Rafin Machinery for product information, inspection coordination, delivery discussion, or contract handling."
          eyebrow="Contact"
          title="Reach the machinery sales team"
          titleAs="h1"
        />
      </section>

      <section className="wide-shell pb-12">
        <div className="support-grid">
          <article className="toolbar-panel p-4 shadow-card">
            <Phone className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">Sales Phone</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.phone}</p>
            <p className="text-sm text-text-muted">{companyProfile.secondaryPhone}</p>
          </article>
          <article className="toolbar-panel p-4 shadow-card">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">Email</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.email}</p>
          </article>
          <article className="toolbar-panel p-4 shadow-card">
            <MapPin className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">Address</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.address}</p>
          </article>
          <article className="toolbar-panel p-4 shadow-card">
            <Clock3 className="h-5 w-5 text-primary" />
            <h2 className="mt-3 text-[1.1rem] text-navy">Business Hours</h2>
            <p className="mt-2 text-sm text-text-muted">{companyProfile.hours}</p>
          </article>
        </div>
      </section>

      <section className="catalog-shell pb-24">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(19rem,0.82fr)]">
          <ContactForm />
          <div className="space-y-5">
            <div className="surface-panel p-5">
              <p className="kicker">Sales contacts</p>
              <h2 className="mt-2 text-[1.45rem] text-navy xl:text-[1.6rem]">Commercial contacts by scope</h2>
              <div className="mt-5 grid gap-4">
                {salesContacts.map((contact) => (
                  <article className="border border-border bg-surface-subtle p-4" key={contact.email}>
                    <h3 className="text-[1.05rem] text-navy">{contact.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-text-muted">{contact.title}</p>
                    <p className="mt-3 text-sm text-text-muted">{contact.note}</p>
                    <p className="mt-3 text-sm text-navy">{contact.phone}</p>
                    <p className="text-sm text-navy">{contact.email}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.08em] text-text-muted">
                      Preferred: {contact.preferredMethod} | {contact.markets.join(', ')}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="surface-panel p-5">
              <p className="kicker">Visit and inspection</p>
              <h2 className="mt-2 text-[1.45rem] text-navy xl:text-[1.6rem]">Tirane sales and coordination point</h2>
              <p className="mt-3 text-sm text-text-muted">
                Use the address and sales contacts to arrange office meetings, yard visits, machine
                inspection, or delivery coordination after inquiry review.
              </p>
              <div className="mt-5 border border-dashed border-border bg-surface-subtle p-6 text-center text-sm text-text-muted">
                Coordination point for office meetings, inspection scheduling, and delivery handover planning
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
