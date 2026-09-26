import { ChevronDown, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink } from 'react-router-dom';
import companyLogo from '../../assets/general-logo.png';
import { getCategories } from '../../data/catalog';
import { getFooterCompanyLinks, getPrimaryNavigation, getSupportLinks } from '../../data/navigation';
import { useDialogSurface } from '../../hooks/useDialogSurface';
import { useTheme } from '../../hooks/useTheme';
import { routes } from '../../utils/routes';
import { Button } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';
import { SiteSearch } from '../search/SiteSearch';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (query: string) => void;
  inquiryCount: number;
  language: 'en' | 'sq';
  onToggleLanguage: () => void;
}

export function MobileMenu({
  inquiryCount,
  language,
  onClose,
  onSearchChange,
  onSearchSubmit,
  onToggleLanguage,
  open,
  search,
}: MobileMenuProps) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const categories = getCategories();
  const supportLinks = getSupportLinks();
  const footerCompanyLinks = getFooterCompanyLinks();
  const mainLinks = getPrimaryNavigation();
  const [expanded, setExpanded] = useState<string | null>(categories[0]?.slug ?? null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const headingId = 'mobile-navigation-title';

  useDialogSurface({
    onClose,
    open,
    panelRef,
  });

  if (!open) {
    return null;
  }

  return (
    <div aria-labelledby={headingId} aria-modal="true" className="fixed inset-0 z-50 xl:hidden" id="mobile-navigation" role="dialog">
      <button aria-hidden="true" className="absolute inset-0 bg-overlay/52" onClick={onClose} tabIndex={-1} type="button" />
      <div
        className="absolute right-0 top-0 flex h-full w-full max-w-[28rem] flex-col border-l border-border bg-surface-page shadow-dropdown"
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="sr-only" id={headingId}>
            {t('common.accessibility.mobileNavigation')}
          </h2>
          <img alt={t('layout.header.logoAlt')} className="h-12 w-auto object-contain" src={companyLogo} />
          <button
            aria-label={t('common.accessibility.closeMobileMenu')}
            className="inline-flex h-10 w-10 items-center justify-center border border-border bg-surface-card text-navy transition hover:border-primary"
            onClick={onClose}
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-5">
          <SiteSearch
            buttonLabel={t('common.actions.search')}
            compact
            maxSuggestions={6}
            onChange={onSearchChange}
            onNavigate={onClose}
            onSubmitQuery={onSearchSubmit}
            placeholder={t('layout.mobileMenu.searchPlaceholder')}
            value={search}
          />

          <div className="mt-4 flex items-center justify-between gap-3 border border-border bg-surface-card px-4 py-3 shadow-card">
            <div>
              <p className="line-label">{t('common.theme.label')}</p>
              <p className="mt-1 text-sm text-text-muted">
                {theme === 'dark' ? t('common.theme.dark') : t('common.theme.light')}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label={t('common.language.switcher')}
                className="inline-flex min-h-10 items-center justify-center border border-border bg-surface-subtle px-3 text-[0.76rem] font-semibold text-navy transition hover:border-primary"
                onClick={onToggleLanguage}
                title={t('common.language.toggle')}
                type="button"
              >
                {language === 'en' ? 'EN / SQ' : 'SQ / EN'}
              </button>
              <ThemeToggle />
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {mainLinks.map((link) => (
              <NavLink
                className="border border-border bg-surface-card px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-navy shadow-card"
                key={link.id}
                onClick={onClose}
                to={link.to}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-5 border border-border-blue bg-surface-dark p-4 text-text-on-dark shadow-card">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="kicker text-text-on-dark/80">{t('layout.header.inquiryList')}</p>
                <p className="mt-2 text-base text-text-on-dark">{t('common.status.itemCount', { count: inquiryCount })}</p>
                <p className="mt-2 text-sm text-text-on-dark/75">{t('layout.mobileMenu.inquiryListDescription')}</p>
              </div>
              <Button onClick={onClose} size="sm" to={routes.inquiryList}>
                {t('common.actions.openList')}
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <Button className="w-full" onClick={onClose} size="lg" to={routes.requestQuote}>
              {t('common.actions.requestQuote')}
            </Button>
          </div>

          <div className="mt-6 space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-navy">{t('common.labels.productGroups')}</h2>
            {categories.map((category) => {
              const isExpanded = expanded === category.slug;

              return (
                <div className="border border-border bg-surface-card shadow-card" key={category.slug}>
                  <button
                    aria-controls={`mobile-category-${category.slug}`}
                    aria-expanded={isExpanded}
                    className="flex min-h-11 w-full items-center justify-between gap-4 px-4 py-4 text-left"
                    onClick={() => setExpanded(isExpanded ? null : category.slug)}
                    type="button"
                  >
                    <div>
                      <p className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-navy">
                        {category.title}
                      </p>
                      <p className="mt-1 text-sm text-text-muted">{category.shortDescription}</p>
                    </div>
                    <ChevronDown
                      className={['h-5 w-5 text-primary transition', isExpanded ? 'rotate-180' : ''].join(' ')}
                    />
                  </button>
                  {isExpanded ? (
                    <div className="border-t border-border px-4 py-3" id={`mobile-category-${category.slug}`}>
                      <Link
                        className="mb-3 block border border-primary/30 bg-surface-subtle px-3 py-2 text-sm font-medium text-primary-dark"
                        onClick={onClose}
                        to={routes.category(category.slug)}
                      >
                        {t('layout.mobileMenu.viewAllCategory', { category: category.title })}
                      </Link>
                      <div className="grid gap-1">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            className="px-3 py-2 text-sm text-text-muted"
                            key={subcategory.slug}
                            onClick={onClose}
                            to={routes.categoryWithTaxonomy(category.slug, subcategory.slug)}
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

          <div className="mt-6 border border-border bg-surface-card p-4 shadow-card">
            <p className="line-label">{t('common.labels.supportLinks')}</p>
            <div className="mt-3 grid gap-1">
              {supportLinks.map((link) => (
                <NavLink
                  className="px-3 py-2 text-sm text-navy transition hover:bg-surface-subtle"
                  key={link.id}
                  onClick={onClose}
                  to={link.to}
                >
                  {link.title}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mt-6 border border-border bg-surface-card p-4 shadow-card">
            <p className="line-label">{t('common.labels.company')}</p>
            <div className="mt-3 grid gap-1">
              {footerCompanyLinks.map((link) => (
                <NavLink
                  className="px-3 py-2 text-sm text-navy transition hover:bg-surface-subtle"
                  key={link.id}
                  onClick={onClose}
                  to={link.to}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
