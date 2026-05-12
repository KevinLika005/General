import { ChevronDown, ClipboardList, Menu, Phone } from 'lucide-react';
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
  { label: 'Products', to: routes.equipment, withMenu: true },
  { label: 'Solutions', to: routes.howItWorks },
  { label: 'Services & Support', to: routes.howItWorks, withSupportMenu: true },
  { label: 'Available Now', to: routes.deals },
  { label: 'Technical Library', to: routes.technicalLibrary },
  { label: 'Contact', to: routes.contact },
];

const supportLinks = [
  { label: 'How It Works', to: routes.howItWorks },
  { label: 'Financing & Contracts', to: routes.financingContracts },
  { label: 'Delivery & Inspection', to: routes.deliveryInspection },
  { label: 'FAQ', to: routes.faq },
  { label: 'Brands', to: routes.brands },
];

function navClass(isActive: boolean) {
  return [
    'text-[0.8rem] font-semibold uppercase tracking-[0.08em] transition',
    isActive ? 'text-brand-navy' : 'text-text-muted hover:text-brand-navy',
  ].join(' ');
}

export function Header({ inquiryCount, onOpenInquirySummary }: HeaderProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMegaMenuOpen(false);
    setSupportMenuOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaMenuOpen(false);
        setSupportMenuOpen(false);
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
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[6px] focus:bg-white focus:px-3 focus:py-2 focus:text-brand-navy" href="#main-content">
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-surface-card/95 backdrop-blur-md">
        <div className="border-b border-brand-navy/10 bg-brand-navy text-white">
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
              <button aria-label="Language selector" className="rounded-[4px] border border-white/15 px-2 py-1 text-white/80" type="button">
                EN / SQ
              </button>
            </div>
          </div>
        </div>

        <div className="section-shell grid min-h-[4.5rem] grid-cols-[auto_1fr_auto] items-center gap-4 py-3">
          <Link className="flex items-center gap-3" to={routes.home}>
            <img
              alt="Rafin Company"
              className="h-11 w-auto object-contain sm:h-12"
              src={rafinLogo}
            />
            <div className="hidden xl:block">
              <p className="kicker">
                Inquiry-commerce catalog
              </p>
              <p className="text-sm text-text-muted">Construction machinery, tools, parts, trucks, and heavy equipment</p>
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
                ) : link.withSupportMenu ? (
                  <div
                    className="relative"
                    key={link.to}
                    onBlurCapture={(event) => {
                      if (!supportRef.current?.contains(event.relatedTarget as Node | null)) {
                        setSupportMenuOpen(false);
                      }
                    }}
                    onMouseEnter={() => setSupportMenuOpen(true)}
                    onMouseLeave={() => setSupportMenuOpen(false)}
                    ref={supportRef}
                  >
                    <div className="flex items-center gap-1.5">
                      <NavLink className={({ isActive }) => navClass(isActive)} to={link.to}>
                        {link.label}
                      </NavLink>
                      <button
                        aria-expanded={supportMenuOpen}
                        aria-label="Open services and support menu"
                        className="p-1 text-text-muted transition hover:text-brand-navy"
                        onClick={() => setSupportMenuOpen((current) => !current)}
                        type="button"
                      >
                        <ChevronDown
                          className={['h-4 w-4 transition', supportMenuOpen ? 'rotate-180' : ''].join(' ')}
                        />
                      </button>
                    </div>
                    {supportMenuOpen ? (
                      <div className="absolute right-0 top-full z-40 mt-3 w-72 rounded-2xl border border-border bg-surface-card p-3 shadow-dropdown">
                        <div className="grid gap-1">
                          {supportLinks.map((supportLink) => (
                            <NavLink
                              className="rounded-[6px] px-3 py-3 text-sm font-medium text-brand-navy transition hover:bg-surface-subtle"
                              key={supportLink.to}
                              to={supportLink.to}
                            >
                              {supportLink.label}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    ) : null}
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
              className="hidden rounded-[6px] border border-border bg-surface-card px-3 py-2 text-[0.76rem] font-semibold uppercase tracking-[0.08em] text-brand-navy transition hover:border-brand-gold md:inline-flex md:items-center md:gap-2"
              onClick={onOpenInquirySummary}
              type="button"
            >
              <ClipboardList className="h-4 w-4" />
              Inquiry List
              <span className="rounded-[4px] border border-brand-gold bg-brand-gold px-2 py-0.5 text-[0.65rem] text-brand-navy">
                {inquiryCount}
              </span>
            </button>

            <Button className="hidden lg:inline-flex" size="sm" to={routes.requestQuote}>
              Request Quote
            </Button>

            <a
              aria-label="Call Rafin sales"
              className="hidden h-11 w-11 items-center justify-center rounded-[6px] border border-border bg-surface-card text-brand-navy transition hover:border-brand-gold lg:inline-flex xl:hidden"
              href={`tel:${companyProfile.phone}`}
            >
              <Phone className="h-4 w-4" />
            </a>

            <button
              aria-expanded={mobileOpen}
              aria-label="Open mobile navigation"
              className="rounded-[6px] border border-border bg-surface-card p-2.5 text-brand-navy xl:hidden"
              onClick={() => setMobileOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="section-shell pb-4 lg:hidden">
          <SearchBar
            buttonLabel="Search"
            compact
            onChange={setSearch}
            onSubmit={submitSearch}
            placeholder="Search by machine, SKU, model, or part"
            value={search}
          />
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
