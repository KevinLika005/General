import { ChevronDown, Search, X } from 'lucide-react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import rafinLogo from '../../assets/rafin-logo.png';
import { categories } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from '../common/Button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  inquiryCount: number;
}

const mainLinks = [
  { label: 'Catalog', to: routes.equipment },
  { label: 'Brands', to: routes.brands },
  { label: 'Available Now', to: routes.deals },
  { label: 'How It Works', to: routes.howItWorks },
  { label: 'Financing', to: routes.financingContracts },
  { label: 'Contact', to: routes.contact },
];

export function MobileMenu({
  inquiryCount,
  onClose,
  onSearchChange,
  onSearchSubmit,
  open,
  search,
}: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(categories[0]?.slug ?? null);

  if (!open) {
    return null;
  }

  return (
    <div aria-label="Mobile navigation" aria-modal="true" className="fixed inset-0 z-50 bg-surface-page xl:hidden" role="dialog">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <img alt="Rafin Company" className="h-10 w-auto object-contain" src={rafinLogo} />
        <button
          aria-label="Close mobile menu"
          className="rounded-xl border border-border p-2 text-brand-navy"
          onClick={onClose}
          type="button"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-y-auto px-5 py-5">
        <form
          className="relative"
          onSubmit={(event) => {
            event.preventDefault();
            onSearchSubmit();
            onClose();
          }}
        >
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted" />
          <input
            className="h-11 w-full rounded-xl border border-border bg-surface-card pl-11 pr-4 text-text placeholder:text-text-muted/70"
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search machinery, brand, model..."
            type="search"
            value={search}
          />
        </form>

        <div className="mt-5 grid gap-2">
          {mainLinks.map((link) => (
            <NavLink
              className="rounded-2xl border border-border bg-surface-card px-4 py-3 text-sm font-semibold text-brand-navy shadow-card"
              key={link.to}
              onClick={onClose}
              to={link.to}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="mt-5 rounded-3xl border border-border bg-brand-navy p-4 text-white shadow-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Inquiry List</p>
              <p className="mt-2 text-base text-white">{inquiryCount} item(s)</p>
            </div>
            <Button onClick={onClose} size="sm" to={routes.inquiryList}>
              Open List
            </Button>
          </div>
        </div>

        <div className="mt-4">
          <Button className="w-full" onClick={onClose} size="lg" to={routes.requestQuote}>
            Request Quote
          </Button>
        </div>

        <div className="mt-6 space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-navy">Equipment Groups</h2>
          {categories.map((category) => {
            const isExpanded = expanded === category.slug;

            return (
              <div className="rounded-2xl border border-border bg-surface-card shadow-card" key={category.slug}>
                <button
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                  onClick={() => setExpanded(isExpanded ? null : category.slug)}
                  type="button"
                >
                  <div>
                    <p className="text-[0.74rem] font-semibold uppercase tracking-[0.16em] text-brand-navy">
                      {category.title}
                    </p>
                    <p className="mt-1 text-sm text-text-muted">{category.shortDescription}</p>
                  </div>
                  <ChevronDown
                    className={['h-5 w-5 text-brand-gold transition', isExpanded ? 'rotate-180' : ''].join(' ')}
                  />
                </button>
                {isExpanded ? (
                  <div className="border-t border-border px-4 py-3">
                    <Link
                      className="mb-3 block rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-3 py-2 text-sm font-medium text-brand-navy"
                      onClick={onClose}
                      to={routes.category(category.slug)}
                    >
                      View all {category.title}
                    </Link>
                    <div className="grid gap-1">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          className="rounded-lg px-3 py-2 text-sm text-text-muted"
                          key={subcategory.slug}
                          onClick={onClose}
                          to={`${routes.category(category.slug)}?subcategory=${encodeURIComponent(subcategory.title)}`}
                        >
                          {subcategory.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
