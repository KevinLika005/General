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

      <section className="section-shell pb-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="toolbar-panel p-5 shadow-card">
            <Phone className="h-6 w-6 text-brand-gold" />
            <h2 className="mt-4 text-2xl text-brand-navy">Sales Phone</h2>
            <p className="mt-3 text-text-muted">{companyProfile.phone}</p>
            <p className="text-text-muted">{companyProfile.secondaryPhone}</p>
          </article>
          <article className="toolbar-panel p-5 shadow-card">
            <Mail className="h-6 w-6 text-brand-gold" />
            <h2 className="mt-4 text-2xl text-brand-navy">Email</h2>
            <p className="mt-3 text-text-muted">{companyProfile.email}</p>
          </article>
          <article className="toolbar-panel p-5 shadow-card">
            <MapPin className="h-6 w-6 text-brand-gold" />
            <h2 className="mt-4 text-2xl text-brand-navy">Address</h2>
            <p className="mt-3 text-text-muted">{companyProfile.address}</p>
          </article>
          <article className="toolbar-panel p-5 shadow-card">
            <Clock3 className="h-6 w-6 text-brand-gold" />
            <h2 className="mt-4 text-2xl text-brand-navy">Business Hours</h2>
            <p className="mt-3 text-text-muted">{companyProfile.hours}</p>
          </article>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <ContactForm />
          <div className="space-y-5">
            <div className="surface-panel p-7">
              <p className="kicker">Sales contacts</p>
              <h2 className="mt-3 text-3xl text-brand-navy">Commercial contacts by scope</h2>
              <div className="mt-6 grid gap-4">
                {salesContacts.map((contact) => (
                  <article className="rounded-xl border border-border bg-surface-subtle p-4" key={contact.email}>
                    <h3 className="text-xl text-brand-navy">{contact.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-text-muted">{contact.title}</p>
                    <p className="mt-3 text-sm text-text-muted">{contact.note}</p>
                    <p className="mt-3 text-sm text-brand-navy">{contact.phone}</p>
                    <p className="text-sm text-brand-navy">{contact.email}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.1em] text-text-muted">
                      Preferred: {contact.preferredMethod} | {contact.markets.join(', ')}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="surface-panel p-7">
              <p className="kicker">Visit and inspection</p>
              <h2 className="mt-3 text-3xl text-brand-navy">Tirane sales and coordination point</h2>
              <p className="mt-4 text-text-muted">
                Use the address and sales contacts to arrange office meetings, yard visits, machine
                inspection, or delivery coordination after inquiry review.
              </p>
              <div className="mt-6 rounded-xl border border-dashed border-border bg-surface-subtle p-8 text-center text-text-muted">
                Coordination point for office meetings, inspection scheduling, and delivery handover planning
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
