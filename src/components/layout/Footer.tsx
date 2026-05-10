import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import rafinLogo from '../../assets/rafin-logo.png';
import { companyProfile, categories } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { NewsletterForm } from '../forms/NewsletterForm';

const socialIcons = {
  LinkedIn: Linkedin,
  Instagram,
  Facebook,
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-rafin-ink">
      <div className="section-shell py-12">
        <div className="grid gap-10 xl:grid-cols-[1.1fr_0.85fr_0.8fr_1fr]">
          <div>
            <img alt="Rafin Company" className="h-14 w-auto object-contain" src={rafinLogo} />
            <p className="mt-4 max-w-md text-sm text-rafin-muted-light">{companyProfile.shortDescription}</p>
            <div className="mt-5 space-y-2 text-sm text-white/72">
              <p className="inline-flex items-start gap-3">
                <MapPin className="mt-1 h-4 w-4 text-rafin-gold-soft" />
                <span>{companyProfile.address}</span>
              </p>
              <p className="inline-flex items-center gap-3">
                <Phone className="h-4 w-4 text-rafin-gold-soft" />
                <a href={`tel:${companyProfile.phone}`}>{companyProfile.phone}</a>
              </p>
              <p className="inline-flex items-center gap-3">
                <Mail className="h-4 w-4 text-rafin-gold-soft" />
                <a href={`mailto:${companyProfile.email}`}>{companyProfile.email}</a>
              </p>
            </div>
            <div className="mt-5 flex gap-2">
              {companyProfile.socialLinks.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];

                return (
                  <a
                    className="inline-flex h-9 w-9 items-center justify-center border border-white/10 text-white/72 transition hover:border-rafin-gold hover:text-rafin-gold-soft"
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
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white">Product Categories</h3>
            <div className="mt-4 grid gap-2 text-sm text-rafin-muted-light">
              {categories.map((category) => (
                <Link className="transition hover:text-rafin-gold-soft" key={category.slug} to={routes.category(category.slug)}>
                  {category.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white">Buyer Support</h3>
            <div className="mt-4 grid gap-2 text-sm text-rafin-muted-light">
              <Link to={routes.howItWorks}>How It Works</Link>
              <Link to={routes.financingContracts}>Financing & Contracts</Link>
              <Link to={routes.deliveryInspection}>Delivery & Inspection</Link>
              <Link to={routes.faq}>FAQ</Link>
              <Link to={routes.contact}>Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.2em] text-white">Get new machinery alerts</h3>
            <p className="mt-3 text-sm text-rafin-muted-light">
              Join the preview newsletter for available-now machinery, parts, and fleet arrivals.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
