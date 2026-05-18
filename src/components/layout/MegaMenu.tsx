import { ChevronRight, FileText } from 'lucide-react';
import { forwardRef, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { getCategories, getProducts } from '../../data/catalog';
import { routes } from '../../utils/routes';

interface MegaMenuProps {
  panelId?: string;
  style?: CSSProperties;
}

export const MegaMenu = forwardRef<HTMLDivElement, MegaMenuProps>(function MegaMenu({ panelId, style }, ref) {
  const { t } = useTranslation();
  const categories = getCategories();
  const products = getProducts();

  return (
    <div
      className="absolute top-full z-40 w-[min(var(--shell-wide-max),calc(100vw-(var(--shell-gutter)*2)))] max-w-[calc(100vw-(var(--shell-gutter)*2))] overflow-y-auto border border-border bg-surface-card p-5 shadow-dropdown backdrop-blur"
      id={panelId}
      ref={ref}
      style={style}
    >
      <div className="grid gap-5 wide:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <div className="mb-5 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
            <div>
              <p className="kicker">{t('layout.footer.products')}</p>
              <h3 className="mt-2 max-w-3xl text-[clamp(1.35rem,1rem+0.8vw,1.75rem)] text-navy">{t('layout.megaMenu.productsTitle')}</h3>
            </div>
            <Link className="inline-flex min-h-11 items-center justify-center border border-border px-4 text-[0.82rem] font-semibold text-navy transition hover:border-primary" to={routes.requestQuote}>
              {t('common.actions.requestQuote')}
            </Link>
          </div>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(min(100%,16rem),1fr))]">
            {categories.map((category) => {
              const productCount = products.filter((product) => product.categorySlug === category.slug).length;

              return (
                <div className="border border-border bg-surface-card p-4" key={category.slug}>
                  <Link className="group block" to={routes.category(category.slug)}>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="line-label">{t('common.status.listings', { count: productCount })}</p>
                        <h3 className="mt-1 text-[1.1rem] text-navy transition group-hover:text-brand-ink">
                          {category.title}
                        </h3>
                      </div>
                      <ChevronRight className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-2 text-sm text-text-muted">
                      {category.shortDescription}
                    </p>
                  </Link>
                  <div className="mt-4 grid gap-1.5">
                    {category.subcategories.slice(0, 4).map((subcategory) => (
                      <Link
                        className="border border-transparent px-2.5 py-2 text-sm text-text-muted transition hover:border-border hover:bg-surface-subtle hover:text-navy"
                        key={subcategory.slug}
                        to={routes.categoryWithTaxonomy(category.slug, subcategory.slug)}
                      >
                        {subcategory.title}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="space-y-3 wide:max-w-[18rem]">
          <div className="border border-border-blue bg-surface-dark p-4 text-text-on-dark">
            <p className="kicker text-white/80">{t('layout.megaMenu.featuredEyebrow')}</p>
            <h3 className="mt-2 text-[1.4rem] text-white">{t('layout.megaMenu.featuredTitle')}</h3>
            <p className="mt-2 text-sm text-white/72">
              {t('layout.megaMenu.featuredDescription')}
            </p>
            <Link className="mt-4 inline-flex min-h-11 w-full items-center justify-center border border-primary/30 bg-brand-gold-soft px-4 text-[0.82rem] font-semibold text-primary-dark transition hover:border-primary/45 hover:bg-surface-card" to={routes.deals}>
              {t('common.actions.viewAvailableNow')}
            </Link>
          </div>

          <div className="border border-border bg-surface-subtle p-4">
            <p className="line-label">{t('layout.megaMenu.quickLinks')}</p>
            <div className="mt-3 grid gap-1">
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.equipment}>{t('pages.home.quickLinks.links.0')}</Link>
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.brands}>{t('pages.home.quickLinks.links.1')}</Link>
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.technicalLibrary}>{t('pages.home.quickLinks.links.3')}</Link>
              <Link className="px-2.5 py-2 text-sm text-navy transition hover:bg-surface-card" to={routes.requestQuote}>{t('common.actions.requestQuote')}</Link>
            </div>
          </div>

          <div className="border border-border bg-surface-card p-4">
            <div className="flex items-start gap-3">
              <FileText className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                <p className="line-label">{t('layout.megaMenu.supportEyebrow')}</p>
                <p className="mt-2 text-sm font-semibold text-navy">{t('layout.megaMenu.supportTitle')}</p>
                <p className="mt-1 text-xs text-text-muted">
                  {t('layout.megaMenu.supportDescription')}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
});
