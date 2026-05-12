import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import rafinLogo from '../../assets/rafin-logo.png';
import { categories, companyProfile } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { NewsletterForm } from '../forms/NewsletterForm';

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram,
  Facebook,
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-navy/10 bg-brand-navy text-white">
      <div className="section-shell py-12">
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 px-6 py-6 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="kicker text-brand-gold-soft">Buyer support</p>
            <h2 className="mt-2 text-[2rem] text-white">Build an Inquiry List, then request a quote, document pack, or contract discussion</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              This website is a procurement-oriented catalog. Final negotiation, inspection,
              documentation, delivery, and contract handling stay direct between companies.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Link className="inline-flex min-h-12 items-center justify-center rounded-[6px] border border-brand-gold bg-brand-gold px-6 text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-brand-navy transition hover:bg-brand-gold-soft" to={routes.requestQuote}>
              Request Quote
            </Link>
          </div>
        </div>

        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.85fr_0.8fr_1fr]">
          <div>
            <img alt="Rafin Company" className="h-14 w-auto object-contain" src={rafinLogo} />
            <p className="mt-4 max-w-md text-sm text-white/72">{companyProfile.shortDescription}</p>
            <div className="mt-5 space-y-2 text-sm text-white/72">
              <p className="inline-flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-brand-gold-soft" />
                <span>{companyProfile.address}</span>
              </p>
              <p className="inline-flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-gold-soft" />
                <a href={`tel:${companyProfile.phone}`}>{companyProfile.phone}</a>
              </p>
              <p className="inline-flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-gold-soft" />
                <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              {companyProfile.socialLinks.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];

                return (
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/72 transition hover:border-brand-gold hover:text-brand-gold-soft"
                    href={social.href}
                    key={social.label}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">{social.label}</span>
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">Products</h3>
            <div className="mt-4 grid gap-2 text-sm text-white/70">
              {categories.map((category) => (
                <Link className="transition hover:text-brand-gold-soft" key={category.slug} to={routes.category(category.slug)}>
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">Services & Support</h3>
            <div className="mt-4 grid gap-2 text-sm text-white/70">
              <Link to={routes.inquiryList}>Inquiry List</Link>
              <Link to={routes.requestQuote}>Request Quote</Link>
              <Link to={routes.howItWorks}>How It Works</Link>
              <Link to={routes.financingContracts}>Financing & Contracts</Link>
              <Link to={routes.deliveryInspection}>Delivery & Inspection</Link>
              <Link to={routes.technicalLibrary}>Technical Library</Link>
              <Link to={routes.faq}>FAQ</Link>
              <Link to={routes.contact}>Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white">Technical and stock updates</h3>
            <p className="mt-3 text-sm text-white/70">
              Request stock alerts for available-now machinery, parts, and technical-document support updates.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/55">
          <p>Inquiry-first catalog. Quotes, contracts, inspection, and commercial terms are handled directly with Rafin.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to={routes.about}>About</Link>
            <Link to={routes.privacy}>Privacy</Link>
            <Link to={routes.terms}>Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
