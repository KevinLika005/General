import { ChevronDown, ClipboardList, Menu, Search } from 'lucide-react';
import { forwardRef, useEffect, useRef, useState, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import companyLogo from '../../assets/general-logo.png';
import { getCompanyProfile } from '../../data/catalog';
import { getPrimaryNavigation, getSolutionLinks, getSupportLinks } from '../../data/navigation';
import { useLanguage } from '../../hooks/useLanguage';
import { routes } from '../../utils/routes';
import { Button } from '../common/Button';
import { SearchBar } from '../common/SearchBar';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

interface HeaderProps {
  inquiryCount: number;
  onOpenInquirySummary: () => void;
}

type DesktopMenu = 'products' | 'solutions' | 'support';

type MenuPosition = 'center' | 'start';

const DESKTOP_MENU_CONFIG: Record<DesktopMenu, { position: MenuPosition }> = {
  products: { position: 'center' },
  solutions: { position: 'start' },
  support: { position: 'start' },
};

function navClass(isActive: boolean) {
  return [
    'text-[0.76rem] font-semibold uppercase tracking-[0.1em] transition',
    isActive ? 'text-primary-dark' : 'text-text-muted hover:text-navy',
  ].join(' ');
}

const DropdownPanel = forwardRef<
  HTMLDivElement,
  {
    items: ReadonlyArray<{ description: string; title: string; to: string }>;
    panelId: string;
    style?: CSSProperties;
  }
>(function DropdownPanel({
  items,
  panelId,
  style,
}, ref) {
  return (
    <div
      className="absolute top-full z-40 w-[min(28rem,calc(100vw-(var(--shell-gutter)*2)))] max-w-[calc(100vw-(var(--shell-gutter)*2))] overflow-y-auto border border-border bg-surface-card p-4 shadow-dropdown"
      id={panelId}
      ref={ref}
      style={style}
    >
      <div className="grid gap-2 wide:grid-cols-2">
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
});

export function Header({ inquiryCount, onOpenInquirySummary }: HeaderProps) {
  const { t } = useTranslation();
  const { language, toggleLanguage } = useLanguage();
  const [openDesktopMenu, setOpenDesktopMenu] = useState<DesktopMenu | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [desktopMenuStyles, setDesktopMenuStyles] = useState<Record<DesktopMenu, CSSProperties>>({
    products: { left: 0 },
    solutions: { left: 0 },
    support: { left: 0 },
  });
  const location = useLocation();
  const navigate = useNavigate();
  const closeTimerRef = useRef<number | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);
  const productsPanelRef = useRef<HTMLDivElement | null>(null);
  const solutionRef = useRef<HTMLDivElement | null>(null);
  const solutionPanelRef = useRef<HTMLDivElement | null>(null);
  const supportRef = useRef<HTMLDivElement | null>(null);
  const supportPanelRef = useRef<HTMLDivElement | null>(null);
  const companyProfile = getCompanyProfile();
  const primaryNavigation = getPrimaryNavigation();
  const solutionLinks = getSolutionLinks();
  const supportLinks = getSupportLinks();

  useEffect(() => {
    setOpenDesktopMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenDesktopMenu(null);
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(
    () => () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    },
    [],
  );

  useEffect(() => {
    if (!openDesktopMenu) {
      return;
    }

    const readShellGutter = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const gutterValue = Number.parseFloat(rootStyles.getPropertyValue('--shell-gutter'));

      return Number.isFinite(gutterValue) && gutterValue > 0 ? gutterValue : 16;
    };

    const getMenuElements = (menu: DesktopMenu) => {
      if (menu === 'products') {
        return { panel: productsPanelRef.current, trigger: productsRef.current };
      }

      if (menu === 'solutions') {
        return { panel: solutionPanelRef.current, trigger: solutionRef.current };
      }

      return { panel: supportPanelRef.current, trigger: supportRef.current };
    };

    const updateMenuPosition = () => {
      const { panel, trigger } = getMenuElements(openDesktopMenu);

      if (!trigger || !panel) {
        return;
      }

      const viewportPadding = readShellGutter();
      const triggerRect = trigger.getBoundingClientRect();
      const panelWidth = panel.offsetWidth;
      const preferredLeft =
        DESKTOP_MENU_CONFIG[openDesktopMenu].position === 'center'
          ? triggerRect.left + (triggerRect.width / 2) - (panelWidth / 2)
          : triggerRect.left;
      const clampedLeft = Math.min(
        Math.max(preferredLeft, viewportPadding),
        Math.max(viewportPadding, window.innerWidth - panelWidth - viewportPadding),
      );
      const availableHeight = Math.max(240, window.innerHeight - triggerRect.bottom - viewportPadding);

      setDesktopMenuStyles((current) => ({
        ...current,
        [openDesktopMenu]: {
          left: clampedLeft - triggerRect.left,
          maxHeight: availableHeight,
        },
      }));
    };

    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);

    return () => window.removeEventListener('resize', updateMenuPosition);
  }, [openDesktopMenu]);

  const submitSearch = () => {
    navigate(search.trim() ? routes.equipmentSearch(search) : routes.equipment);
  };

  const cancelScheduledClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openMenu = (menu: DesktopMenu) => {
    cancelScheduledClose();
    setOpenDesktopMenu(menu);
  };

  const closeMenu = (menu?: DesktopMenu) => {
    setOpenDesktopMenu((current) => {
      if (!menu || current === menu) {
        return null;
      }

      return current;
    });
  };

  const scheduleClose = (menu: DesktopMenu) => {
    cancelScheduledClose();
    closeTimerRef.current = window.setTimeout(() => {
      closeMenu(menu);
      closeTimerRef.current = null;
    }, 140);
  };

  return (
    <>
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-surface-card focus:px-3 focus:py-2 focus:text-navy" href="#main-content">
        {t('common.accessibility.skipToMain')}
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-surface-card/95 backdrop-blur-md">
        <div className="hidden border-b border-border-blue bg-surface-dark text-text-on-dark xl:block">
          <div className="wide-shell flex flex-wrap items-center justify-between gap-3 py-2 text-[0.72rem]">
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
              <span className="hidden lg:inline">{companyProfile.topUtilityNote}</span>
              <button
                aria-label={t('common.language.switcher')}
                className="border border-primary/25 bg-white/5 px-2 py-1 text-brand-gold-soft transition hover:border-primary/45 hover:text-text-on-dark"
                onClick={toggleLanguage}
                title={t('common.language.toggle')}
                type="button"
              >
                {language === 'en' ? 'EN / SQ' : 'SQ / EN'}
              </button>
            </div>
          </div>
        </div>

        <div className="wide-shell grid min-h-[4.15rem] grid-cols-[auto_1fr_auto] items-center gap-3 py-3 xl:min-h-[4.9rem] xl:gap-4">
          <Link className="flex min-w-0 items-center gap-3" to={routes.home}>
            <img alt={t('layout.header.logoAlt')} className="h-14 w-auto object-contain sm:h-16" src={companyLogo} />
            <div className="hidden min-w-0 wide:block">
              <p className="kicker">{t('layout.header.tagline')}</p>
              <p className="truncate text-sm text-text-muted">{t('layout.header.description')}</p>
            </div>
          </Link>

          <div className="hidden px-2 xl:block xl:max-w-[52rem] xl:flex-1 xl:px-4">
            <SearchBar
              buttonLabel={t('common.actions.search')}
              compact
              onChange={setSearch}
              onSubmit={submitSearch}
              placeholder={t('layout.header.desktopSearchPlaceholder')}
              value={search}
            />
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              aria-label={t('common.accessibility.openInquirySummary')}
              className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-card text-navy transition hover:border-primary md:hidden"
              onClick={onOpenInquirySummary}
              type="button"
            >
              <ClipboardList className="h-4 w-4" />
            </button>

            <button
              aria-label={t('common.accessibility.openInquirySummary')}
              className="hidden border border-border bg-surface-card px-3 py-2 text-[0.78rem] font-semibold text-navy transition hover:border-primary md:inline-flex md:items-center md:gap-2"
              onClick={onOpenInquirySummary}
              type="button"
            >
              <ClipboardList className="h-4 w-4" />
              {t('layout.header.inquiryList')}
              <span className="border border-primary/30 bg-surface-subtle px-2 py-0.5 text-[0.65rem] text-primary-dark">
                {inquiryCount}
              </span>
            </button>

            <Button className="hidden tablet:inline-flex" size="sm" to={routes.requestQuote}>
              {t('common.actions.requestQuote')}
            </Button>

            <button
              aria-label={t('common.accessibility.searchCatalog')}
              className="hidden h-10 w-10 items-center justify-center border border-border text-navy md:inline-flex xl:hidden"
              onClick={submitSearch}
              type="button"
            >
              <Search className="h-4 w-4" />
            </button>

            <button
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={t('common.accessibility.openMobileNavigation')}
              className="border border-border bg-surface-card p-2.5 text-navy xl:hidden"
              onClick={() => setMobileOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="wide-shell border-t border-border py-3 xl:hidden">
          <SearchBar
            buttonLabel={t('common.actions.search')}
            compact
            onChange={setSearch}
            onSubmit={submitSearch}
            placeholder={t('layout.header.mobileSearchPlaceholder')}
            value={search}
          />
        </div>

        <div className="hidden border-t border-border xl:block">
          <div className="wide-shell flex items-center justify-between gap-4 py-3">
            <nav aria-label={t('common.labels.primaryNavigation')} className="flex items-center gap-6">
              {primaryNavigation.map((link) => {
                if ('kind' in link && link.kind === 'products') {
                  const isOpen = openDesktopMenu === 'products';

                  return (
                    <div
                      className="relative -mb-3 pb-3"
                      key={link.to}
                      onFocusCapture={() => openMenu('products')}
                      onBlurCapture={(event) => {
                        if (!productsRef.current?.contains(event.relatedTarget as Node | null)) {
                          scheduleClose('products');
                        }
                      }}
                      onMouseEnter={() => openMenu('products')}
                      onMouseLeave={() => scheduleClose('products')}
                      ref={productsRef}
                    >
                      <div className="flex items-center gap-1.5">
                        <NavLink className={({ isActive }) => navClass(isActive)} to={link.to}>
                          {link.label}
                        </NavLink>
                        <button
                          aria-controls="desktop-products-menu"
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-label={t('common.accessibility.openProductsMenu')}
                          className="p-1 text-text-muted transition hover:text-navy"
                          onClick={() => {
                            if (isOpen) {
                              closeMenu('products');
                              return;
                            }

                            openMenu('products');
                          }}
                          type="button"
                        >
                          <ChevronDown className={['h-4 w-4 transition', isOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                      </div>
                      {isOpen ? (
                        <MegaMenu
                          panelId="desktop-products-menu"
                          ref={productsPanelRef}
                          style={desktopMenuStyles.products}
                        />
                      ) : null}
                    </div>
                  );
                }

                if ('kind' in link && link.kind === 'solutions') {
                  const isOpen = openDesktopMenu === 'solutions';

                  return (
                    <div
                      className="relative -mb-3 pb-3"
                      key={link.to}
                      onBlurCapture={(event) => {
                        if (!solutionRef.current?.contains(event.relatedTarget as Node | null)) {
                          scheduleClose('solutions');
                        }
                      }}
                      onFocusCapture={() => openMenu('solutions')}
                      onMouseEnter={() => openMenu('solutions')}
                      onMouseLeave={() => scheduleClose('solutions')}
                      ref={solutionRef}
                    >
                      <div className="flex items-center gap-1.5">
                        <NavLink className={({ isActive }) => navClass(isActive)} to={link.to}>
                          {link.label}
                        </NavLink>
                        <button
                          aria-controls="desktop-solutions-menu"
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-label={t('common.accessibility.openSolutionsMenu')}
                          className="p-1 text-text-muted transition hover:text-navy"
                          onClick={() => {
                            if (isOpen) {
                              closeMenu('solutions');
                              return;
                            }

                            openMenu('solutions');
                          }}
                          type="button"
                        >
                          <ChevronDown className={['h-4 w-4 transition', isOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                      </div>
                      {isOpen ? (
                        <DropdownPanel
                          items={solutionLinks}
                          panelId="desktop-solutions-menu"
                          ref={solutionPanelRef}
                          style={desktopMenuStyles.solutions}
                        />
                      ) : null}
                    </div>
                  );
                }

                if ('kind' in link && link.kind === 'support') {
                  const isOpen = openDesktopMenu === 'support';

                  return (
                    <div
                      className="relative -mb-3 pb-3"
                      key={link.to}
                      onBlurCapture={(event) => {
                        if (!supportRef.current?.contains(event.relatedTarget as Node | null)) {
                          scheduleClose('support');
                        }
                      }}
                      onFocusCapture={() => openMenu('support')}
                      onMouseEnter={() => openMenu('support')}
                      onMouseLeave={() => scheduleClose('support')}
                      ref={supportRef}
                    >
                      <div className="flex items-center gap-1.5">
                        <NavLink className={({ isActive }) => navClass(isActive)} to={link.to}>
                          {link.label}
                        </NavLink>
                        <button
                          aria-controls="desktop-support-menu"
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-label={t('common.accessibility.openSupportMenu')}
                          className="p-1 text-text-muted transition hover:text-navy"
                          onClick={() => {
                            if (isOpen) {
                              closeMenu('support');
                              return;
                            }

                            openMenu('support');
                          }}
                          type="button"
                        >
                          <ChevronDown className={['h-4 w-4 transition', isOpen ? 'rotate-180' : ''].join(' ')} />
                        </button>
                      </div>
                      {isOpen ? (
                        <DropdownPanel
                          items={supportLinks}
                          panelId="desktop-support-menu"
                          ref={supportPanelRef}
                          style={desktopMenuStyles.support}
                        />
                      ) : null}
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

            <div className="hidden max-w-[22rem] wide:block">
              <p className="text-[0.72rem] uppercase tracking-[0.12em] text-text-muted">
                {t('layout.header.utilitySearchDescription')}
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
