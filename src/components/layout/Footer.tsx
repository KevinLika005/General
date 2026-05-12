import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import rafinLogo from '../../assets/rafin-logo.png';
import { categories, companyProfile } from '../../data/catalog';
import { footerCompanyLinks } from '../../data/navigation';
import { routes } from '../../utils/routes';
import { NewsletterForm } from '../forms/NewsletterForm';

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram,
  Facebook,
};

function FooterGroup({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-white/10 pt-4 xl:border-0 xl:pt-0">
      <button
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white xl:pointer-events-none"
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        {title}
        <span className="xl:hidden">{open ? '-' : '+'}</span>
      </button>
      <div className={[open ? 'mt-4 grid gap-2 text-sm text-white/70' : 'hidden', 'xl:mt-4 xl:grid xl:gap-2 xl:text-sm xl:text-white/70'].join(' ')}>
        {children}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-surface-blue bg-surface-blue text-white">
      <div className="section-shell py-8 xl:py-12">
        <div className="mb-8 border border-white/10 bg-white/5 px-5 py-5 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="kicker text-white/80">Buyer support</p>
            <h2 className="mt-2 text-[1.5rem] leading-[1.08] text-white xl:text-[1.8rem]">Build an Inquiry List, then request a quote, document pack, or contract discussion</h2>
            <p className="mt-3 max-w-2xl text-sm text-white/70">
              This website is a procurement-oriented catalog. Final negotiation, inspection,
              documentation, delivery, and contract handling stay direct between companies.
            </p>
          </div>
          <div className="mt-4 lg:mt-0">
            <Link className="inline-flex min-h-12 items-center justify-center border border-brand-gold bg-brand-gold-soft px-6 text-[0.82rem] font-semibold text-navy transition hover:bg-brand-gold" to={routes.requestQuote}>
              Request Quote
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.85fr_0.8fr_1fr]">
          <div>
            <img alt="Rafin Company" className="h-14 w-auto object-contain" src={rafinLogo} />
            <p className="mt-4 max-w-md text-sm text-white/72">{companyProfile.shortDescription}</p>
            <div className="mt-5 space-y-2 text-sm text-white/72">
              <p className="inline-flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-primary" />
                <span>{companyProfile.address}</span>
              </p>
              <p className="inline-flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${companyProfile.phone}`}>{companyProfile.phone}</a>
              </p>
              <p className="inline-flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              {companyProfile.socialLinks.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];

                return (
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/10 text-white/72 transition hover:border-primary hover:text-white"
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

          <FooterGroup title="Products">
              {categories.map((category) => (
                <Link className="transition hover:text-white" key={category.slug} to={routes.category(category.slug)}>
                  {category.title}
                </Link>
              ))}
          </FooterGroup>

          <FooterGroup title="Services & Support">
              <Link to={routes.inquiryList}>Inquiry List</Link>
              <Link to={routes.requestQuote}>Request Quote</Link>
              <Link to={routes.howItWorks}>How It Works</Link>
              <Link to={routes.financingContracts}>Financing & Contracts</Link>
              <Link to={routes.deliveryInspection}>Delivery & Inspection</Link>
              <Link to={routes.technicalLibrary}>Technical Library</Link>
              <Link to={routes.faq}>FAQ</Link>
              <Link to={routes.contact}>Contact</Link>
          </FooterGroup>

          <div className="border-t border-white/10 pt-4 xl:border-0 xl:pt-0">
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
            {footerCompanyLinks.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
