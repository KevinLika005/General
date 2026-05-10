import { ChevronDown, ClipboardList, Menu, Phone, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import rafinLogo from '../../assets/rafin-logo.png';
import { companyProfile } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { Button } from '../common/Button';
import { SearchBar } from '../common/SearchBar';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  inquiryCount: number;
  onOpenInquirySummary: () => void;
}

const navLinks = [
  { label: 'Catalog', to: routes.equipment, withMenu: true },
  { label: 'Brands', to: routes.brands },
  { label: 'Available Now', to: routes.deals },
  { label: 'How It Works', to: routes.howItWorks },
  { label: 'Contact', to: routes.contact },
];

function navClass(isActive: boolean) {
  return [
    'text-sm font-semibold transition',
    isActive ? 'text-brand-navy' : 'text-text-muted hover:text-brand-navy',
  ].join(' ');
}

export function Header({ inquiryCount, onOpenInquirySummary }: HeaderProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaMenuOpen(false);
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const submitSearch = () => {
    navigate(search.trim() ? routes.equipmentSearch(search) : routes.equipment);
  };

  return (
    <>
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-brand-navy" href="#main-content">
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-surface-page/95 backdrop-blur-md">
        <div className="border-b border-border bg-brand-navy text-white">
          <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-2 text-[0.72rem]">
            <div className="flex flex-wrap items-center gap-4">
              <a className="transition hover:text-brand-gold-soft" href={`tel:${companyProfile.phone}`}>
                {companyProfile.phone}
              </a>
              <a className="transition hover:text-brand-gold-soft" href={`mailto:${companyProfile.email}`}>
                {companyProfile.email}
              </a>
              <span>{companyProfile.locationLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{companyProfile.topUtilityNote}</span>
              <button aria-label="Language selector" className="rounded-md border border-white/15 px-2 py-1 text-white/80" type="button">
                EN / SQ
              </button>
            </div>
          </div>
        </div>

        <div className="section-shell grid min-h-[4.75rem] grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
          <Link className="flex items-center gap-3" to={routes.home}>
            <img
              alt="Rafin Company"
              className="h-11 w-auto object-contain sm:h-12"
              src={rafinLogo}
            />
            <div className="hidden xl:block">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-brand-gold">
                Inquiry-commerce catalog
              </p>
              <p className="text-sm text-text-muted">Machinery, equipment, trucks, parts, and tools</p>
            </div>
          </Link>

          <div className="hidden px-4 lg:block xl:px-6">
            <SearchBar
              buttonLabel="Search"
              compact
              onChange={setSearch}
              onSubmit={submitSearch}
              placeholder="Search by machine, SKU, model, brand, or part"
              value={search}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
              {navLinks.map((link) =>
                link.withMenu ? (
                  <div
                    className="relative"
                    key={link.to}
                    onBlurCapture={(event) => {
                      if (!menuRef.current?.contains(event.relatedTarget as Node | null)) {
                        setMegaMenuOpen(false);
                      }
                    }}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                    ref={menuRef}
                  >
                    <div className="flex items-center gap-1.5">
                      <NavLink className={({ isActive }) => navClass(isActive)} to={link.to}>
                        {link.label}
                      </NavLink>
                      <button
                        aria-expanded={megaMenuOpen}
                        aria-label="Open equipment categories"
                        className="p-1 text-text-muted transition hover:text-brand-navy"
                        onClick={() => setMegaMenuOpen((current) => !current)}
                        type="button"
                      >
                        <ChevronDown
                          className={['h-4 w-4 transition', megaMenuOpen ? 'rotate-180' : ''].join(' ')}
                        />
                      </button>
                    </div>
                    {megaMenuOpen ? <MegaMenu /> : null}
                  </div>
                ) : (
                  <NavLink className={({ isActive }) => navClass(isActive)} key={link.to} to={link.to}>
                    {link.label}
                  </NavLink>
                ),
              )}
            </nav>

            <button
              aria-label="Open inquiry list summary"
              className="hidden rounded-xl border border-border bg-surface-card px-3 py-2 text-sm font-semibold text-brand-navy transition hover:border-brand-gold md:inline-flex md:items-center md:gap-2"
              onClick={onOpenInquirySummary}
              type="button"
            >
              <ClipboardList className="h-4 w-4" />
              Inquiry List
              <span className="rounded-full border border-brand-gold bg-brand-gold px-2 py-0.5 text-[0.65rem] text-brand-navy">
                {inquiryCount}
              </span>
            </button>

            <Button className="hidden lg:inline-flex" size="sm" to={routes.requestQuote}>
              Request Quote
            </Button>

            <a
              aria-label="Call Rafin sales"
              className="hidden h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-card text-brand-navy transition hover:border-brand-gold lg:inline-flex xl:hidden"
              href={`tel:${companyProfile.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>

            <button
              aria-label="Search catalog"
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-card text-brand-navy transition hover:border-brand-gold lg:hidden"
              onClick={submitSearch}
              type="button"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              aria-expanded={mobileOpen}
              aria-label="Open mobile navigation"
              className="rounded-xl border border-border bg-surface-card p-2.5 text-brand-navy xl:hidden"
              onClick={() => setMobileOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        inquiryCount={inquiryCount}
        onClose={() => setMobileOpen(false)}
        onSearchChange={setSearch}
        onSearchSubmit={submitSearch}
        open={mobileOpen}
        search={search}
      />
    </>
  );
}
