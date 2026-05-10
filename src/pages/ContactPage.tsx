import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ContactForm } from '../components/forms/ContactForm';
import { companyProfile } from '../data/catalog';

export function ContactPage() {
  return (
    <>
      <section className="section-shell py-16 sm:py-20">
        <SectionHeader
          description="Talk directly to the sales side of Rafin Machinery for product information, inspection coordination, delivery discussion, or contract handling."
          eyebrow="Contact"
          title="Reach the machinery sales team"
        />
      </section>

      <section className="section-shell pb-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="border border-white/10 bg-rafin-panel p-5">
            <Phone className="h-6 w-6 text-rafin-gold-soft" />
            <h2 className="mt-4 text-2xl text-white">Sales Phone</h2>
            <p className="mt-3 text-rafin-muted-light">{companyProfile.phone}</p>
            <p className="text-rafin-muted-light">{companyProfile.secondaryPhone}</p>
          </article>
          <article className="border border-white/10 bg-rafin-panel p-5">
            <Mail className="h-6 w-6 text-rafin-gold-soft" />
            <h2 className="mt-4 text-2xl text-white">Email</h2>
            <p className="mt-3 text-rafin-muted-light">{companyProfile.email}</p>
          </article>
          <article className="border border-white/10 bg-rafin-panel p-5">
            <MapPin className="h-6 w-6 text-rafin-gold-soft" />
            <h2 className="mt-4 text-2xl text-white">Address</h2>
            <p className="mt-3 text-rafin-muted-light">{companyProfile.address}</p>
          </article>
          <article className="border border-white/10 bg-rafin-panel p-5">
            <Clock3 className="h-6 w-6 text-rafin-gold-soft" />
            <h2 className="mt-4 text-2xl text-white">Business Hours</h2>
            <p className="mt-3 text-rafin-muted-light">{companyProfile.hours}</p>
          </article>
        </div>
      </section>

      <section className="section-shell pb-24">
        <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <ContactForm />
          <div className="border border-white/10 bg-rafin-panel p-7">
            <p className="eyebrow">Map Placeholder</p>
            <h2 className="mt-3 text-3xl text-white">Tirane sales and coordination point</h2>
            <p className="mt-4 text-rafin-muted-light">
              No external map dependency is added in this frontend build. This placeholder keeps the page complete without shipping a broken integration.
            </p>
            <div className="mt-6 border border-dashed border-white/10 bg-black/20 p-8 text-center text-rafin-muted-light">
              Map placeholder for Rafin office and machinery sales contact point
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
