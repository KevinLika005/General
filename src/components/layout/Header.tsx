import { ChevronDown, ClipboardList, Menu, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import rafinLogo from '../../assets/rafin-logo.png';
import { companyProfile } from '../../data/catalog';
import { primaryNavigation, solutionLinks, supportLinks } from '../../data/navigation';
import { routes } from '../../utils/routes';
import { Button } from '../common/Button';
import { SearchBar } from '../common/SearchBar';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  inquiryCount: number;
  onOpenInquirySummary: () => void;
}

function navClass(isActive: boolean) {
  return [
    'text-[0.76rem] font-semibold uppercase tracking-[0.1em] transition',
    isActive ? 'text-primary-dark' : 'text-text-muted hover:text-navy',
  ].join(' ');
}

function DropdownPanel({
  items,
}: {
  items: ReadonlyArray<{ description: string; title: string; to: string }>;
}) {
  return (
    <div className="absolute left-0 top-full z-40 mt-3 w-[28rem] border border-border bg-surface-card p-4 shadow-dropdown">
      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <NavLink
            className="border border-border bg-surface-card px-3 py-3 transition hover:border-primary hover:bg-surface-subtle"
            key={item.to}
            to={item.to}
          >
            <p className="text-sm font-semibold text-navy">{item.title}</p>
            <p className="mt-1 text-xs text-text-muted">{item.description}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export function Header({ inquiryCount, onOpenInquirySummary }: HeaderProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [supportMenuOpen, setSupportMenuOpen] = useState(false);
  const [solutionMenuOpen, setSolutionMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);
  const solutionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMegaMenuOpen(false);
    setSupportMenuOpen(false);
    setSolutionMenuOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMegaMenuOpen(false);
        setSupportMenuOpen(false);
        setSolutionMenuOpen(false);
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
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-3 focus:py-2 focus:text-navy" href="#main-content">
        Skip to main content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-surface-card/95 backdrop-blur-md">
        <div className="hidden border-b border-surface-dark bg-surface-blue text-text-on-dark xl:block">
          <div className="section-shell flex flex-wrap items-center justify-between gap-3 py-2 text-[0.72rem]">
            <div className="flex flex-wrap items-center gap-4">
              <a className="transition hover:text-white" href={`tel:${companyProfile.phone}`}>
                {companyProfile.phone}
              </a>
              <a className="transition hover:text-white" href={`mailto:${companyProfile.email}`}>
                {companyProfile.email}
              </a>
              <span>{companyProfile.locationLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden lg:inline">{companyProfile.topUtilityNote}</span>
              <button aria-label="Language selector" className="border border-white/15 px-2 py-1 text-white/80" type="button">
                EN / SQ
              </button>
            </div>
          </div>
        </div>

        <div className="section-shell grid min-h-[4.15rem] grid-cols-[auto_1fr_auto] items-center gap-3 py-3 xl:min-h-[4.9rem] xl:gap-4">
          <Link className="flex min-w-0 items-center gap-3" to={routes.home}>
            <img alt="Rafin Company" className="h-11 w-auto object-contain sm:h-12" src={rafinLogo} />
            <div className="hidden min-w-0 wide:block">
              <p className="kicker">Technical equipment catalog</p>
              <p className="truncate text-sm text-text-muted">
                Construction machinery, parts, support equipment, and direct B2B inquiry
              </p>
            </div>
          </Link>

          <div className="hidden px-2 xl:block xl:px-4">
            <SearchBar
              buttonLabel="Search"
              compact
              onChange={setSearch}
              onSubmit={submitSearch}
              placeholder="Search by product, SKU, model, brand, or part"
              value={search}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              aria-label="Open inquiry list summary"
              className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-card text-navy transition hover:border-primary md:hidden"
              onClick={onOpenInquirySummary}
              type="button"
            >
              <ClipboardList className="h-4 w-4" />
            </button>

            <button
              aria-label="Open inquiry list summary"
              className="hidden border border-border bg-surface-card px-3 py-2 text-[0.78rem] font-semibold text-navy transition hover:border-primary md:inline-flex md:items-center md:gap-2"
              onClick={onOpenInquirySummary}
              type="button"
            >
              <ClipboardList className="h-4 w-4" />
              Inquiry List
              <span className="border border-primary/25 bg-surface-subtle px-2 py-0.5 text-[0.65rem] text-navy">
                {inquiryCount}
              </span>
            </button>

            <Button className="hidden tablet:inline-flex" size="sm" to={routes.requestQuote}>
              Request Quote
            </Button>

            <button
              aria-label="Search catalog"
              className="hidden h-10 w-10 items-center justify-center border border-border text-navy md:inline-flex xl:hidden"
              onClick={submitSearch}
              type="button"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label="Open mobile navigation"
              className="border border-border bg-surface-card p-2.5 text-navy xl:hidden"
              onClick={() => setMobileOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="section-shell border-t border-border py-3 xl:hidden">
          <SearchBar
            buttonLabel="Search"
            compact
            onChange={setSearch}
            onSubmit={submitSearch}
            placeholder="Search by product, SKU, model, or part"
            value={search}
          />
        </div>

        <div className="hidden border-t border-border xl:block">
          <div className="section-shell flex items-center justify-between gap-4 py-3">
            <nav aria-label="Primary" className="flex items-center gap-6">
              {primaryNavigation.map((link) => {
                if ('kind' in link && link.kind === 'products') {
                  return (
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
                          aria-label="Open products menu"
                          className="p-1 text-text-muted transition hover:text-navy"
                          onClick={() => setMegaMenuOpen((current) => !current)}
                          type="button"
                        >
                          <ChevronDown className={['h-4 w-4 transition', megaMenuOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                      </div>
                      {megaMenuOpen ? <MegaMenu /> : null}
                    </div>
                  );
                }

                if ('kind' in link && link.kind === 'solutions') {
                  return (
                    <div
                      className="relative"
                      key={link.to}
                      onBlurCapture={(event) => {
                        if (!solutionRef.current?.contains(event.relatedTarget as Node | null)) {
                          setSolutionMenuOpen(false);
                        }
                      }}
                      onMouseEnter={() => setSolutionMenuOpen(true)}
                      onMouseLeave={() => setSolutionMenuOpen(false)}
                      ref={solutionRef}
                    >
                      <div className="flex items-center gap-1.5">
                        <NavLink className={({ isActive }) => navClass(isActive)} to={link.to}>
                          {link.label}
                        </NavLink>
                        <button
                          aria-expanded={solutionMenuOpen}
                          aria-label="Open solutions menu"
                          className="p-1 text-text-muted transition hover:text-navy"
                          onClick={() => setSolutionMenuOpen((current) => !current)}
                          type="button"
                        >
                          <ChevronDown className={['h-4 w-4 transition', solutionMenuOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                      </div>
                      {solutionMenuOpen ? <DropdownPanel items={solutionLinks} /> : null}
                    </div>
                  );
                }

                if ('kind' in link && link.kind === 'support') {
                  return (
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
                          aria-label="Open support menu"
                          className="p-1 text-text-muted transition hover:text-navy"
                          onClick={() => setSupportMenuOpen((current) => !current)}
                          type="button"
                        >
                          <ChevronDown className={['h-4 w-4 transition', supportMenuOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                      </div>
                      {supportMenuOpen ? <DropdownPanel items={supportLinks} /> : null}
                    </div>
                  );
                }

                return (
                  <NavLink className={({ isActive }) => navClass(isActive)} key={link.to} to={link.to}>
                    {link.label}
                  </NavLink>
                );
              })}
            </nav>

            <div className="hidden wide:block">
              <p className="text-[0.72rem] uppercase tracking-[0.12em] text-text-muted">
                Product-first catalog. Search by product, SKU, model, brand, or technical keyword.
              </p>
            </div>
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
