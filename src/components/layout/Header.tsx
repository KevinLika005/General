import { ChevronDown, ClipboardList, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import rafinLogo from '../../assets/rafin-logo.png';
import { companyProfile } from '../../data/catalog';
import { routes } from '../../utils/routes';
import { SearchBar } from '../common/SearchBar';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  inquiryCount: number;
  onOpenInquirySummary: () => void;
}

const navLinks = [
  { label: 'Equipment', to: routes.equipment, withMenu: true },
  { label: 'Brands', to: routes.brands },
  { label: 'Deals', to: routes.deals },
  { label: 'How It Works', to: routes.howItWorks },
  { label: 'Financing', to: routes.financingContracts },
  { label: 'Contact', to: routes.contact },
];

function navClass(isActive: boolean) {
  return [
    'text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition',
    isActive ? 'text-white' : 'text-white/70 hover:text-rafin-gold-soft',
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
    navigate(routes.equipmentSearch(search));
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-rafin-black/96 backdrop-blur-md">
        <div className="border-b border-white/8">
          <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-2 text-[0.68rem] uppercase tracking-[0.12em] text-white/58">
            <div className="flex flex-wrap items-center gap-4">
              <a className="transition hover:text-rafin-gold-soft" href={`tel:${companyProfile.phone}`}>
                {companyProfile.phone}
              </a>
              <a className="transition hover:text-rafin-gold-soft" href={`mailto:${companyProfile.email}`}>
                {companyProfile.email}
              </a>
              <span>{companyProfile.locationLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>{companyProfile.topUtilityNote}</span>
              <button className="border border-white/10 px-2 py-1 text-white/72" type="button">
                EN / SQ
              </button>
            </div>
          </div>
        </div>

        <div className="section-shell grid min-h-[4.75rem] grid-cols-[auto_1fr_auto] items-center gap-4 py-3">
          <Link className="flex items-center" to={routes.home}>
            <img
              alt="Rafin Company"
              className="h-11 w-auto object-contain sm:h-12"
              src={rafinLogo}
            />
          </Link>

          <div className="hidden px-4 lg:block xl:px-6">
            <SearchBar
              compact
              onChange={setSearch}
              onSubmit={submitSearch}
              placeholder="Search machine, brand, model or category"
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
                        className="p-1 text-white/68 transition hover:text-rafin-gold-soft"
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
              className="hidden border border-white/14 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white transition hover:border-rafin-gold hover:text-rafin-gold-soft md:inline-flex md:items-center md:gap-2"
              onClick={onOpenInquirySummary}
              type="button"
            >
              <ClipboardList className="h-4 w-4" />
              Inquiry List
              <span className="border border-rafin-gold bg-rafin-gold px-1.5 py-0.5 text-[0.58rem] text-rafin-ink">
                {inquiryCount}
              </span>
            </button>

            <button
              aria-expanded={mobileOpen}
              aria-label="Open mobile navigation"
              className="border border-white/14 p-2.5 text-white xl:hidden"
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
