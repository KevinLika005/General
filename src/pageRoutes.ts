import { createElement, lazy, useState, type ComponentType } from 'react';
import { matchRoutes } from 'react-router-dom';

// Pages are code-split, but each can be preloaded so the first render (browser or build-time
// prerender) paints the page synchronously instead of an empty Suspense fallback.
function lazyPage<TModule extends Record<string, ComponentType>, TExport extends keyof TModule>(
  load: () => Promise<TModule>,
  exportName: TExport,
) {
  let Loaded: ComponentType | undefined;
  const preload = () =>
    load().then((module) => {
      Loaded = module[exportName] as ComponentType;
    });
  const Lazy = lazy(() => preload().then(() => ({ default: Loaded as ComponentType })));

  function PreloadablePage() {
    // Pick once per mount: switching Lazy -> Loaded later would change the element type and
    // remount the page (losing filters, focus and form input) on its next re-render.
    const [Component] = useState(() => Loaded ?? Lazy);
    return createElement(Component);
  }

  return Object.assign(PreloadablePage, { preload });
}

const AboutPage = lazyPage(() => import('./pages/AboutPage'), 'AboutPage');
const BrandsPage = lazyPage(() => import('./pages/BrandsPage'), 'BrandsPage');
const CatalogPage = lazyPage(() => import('./pages/CatalogPage'), 'CatalogPage');
const CategoryPage = lazyPage(() => import('./pages/CategoryPage'), 'CategoryPage');
const ContactPage = lazyPage(() => import('./pages/ContactPage'), 'ContactPage');
const DealsPage = lazyPage(() => import('./pages/DealsPage'), 'DealsPage');
const DeliveryInspectionPage = lazyPage(
  () => import('./pages/DeliveryInspectionPage'),
  'DeliveryInspectionPage',
);
const FAQPage = lazyPage(() => import('./pages/FAQPage'), 'FAQPage');
const FinancingContractsPage = lazyPage(
  () => import('./pages/FinancingContractsPage'),
  'FinancingContractsPage',
);
const HomePage = lazyPage(() => import('./pages/HomePage'), 'HomePage');
const HowItWorksPage = lazyPage(() => import('./pages/HowItWorksPage'), 'HowItWorksPage');
const InstitutionsCleaningPage = lazyPage(
  () => import('./pages/InstitutionsCleaningPage'),
  'InstitutionsCleaningPage',
);
const InquiryListPage = lazyPage(() => import('./pages/InquiryListPage'), 'InquiryListPage');
const NotFoundPage = lazyPage(() => import('./pages/NotFoundPage'), 'NotFoundPage');
const PrivacyPage = lazyPage(() => import('./pages/PrivacyPage'), 'PrivacyPage');
const ProductDetailPage = lazyPage(
  () => import('./pages/ProductDetailPage'),
  'ProductDetailPage',
);
const RequestQuotePage = lazyPage(() => import('./pages/RequestQuotePage'), 'RequestQuotePage');
const SearchPage = lazyPage(() => import('./pages/SearchPage'), 'SearchPage');
const TechnicalLibraryPage = lazyPage(
  () => import('./pages/TechnicalLibraryPage'),
  'TechnicalLibraryPage',
);
const TermsPage = lazyPage(() => import('./pages/TermsPage'), 'TermsPage');

export const pageRoutes = [
  { path: '/', Page: HomePage },
  { path: '/search', Page: SearchPage },
  { path: '/equipment', Page: CatalogPage },
  { path: '/equipment/:categorySlug', Page: CategoryPage },
  { path: '/equipment/:categorySlug/:productSlug', Page: ProductDetailPage },
  { path: '/brands', Page: BrandsPage },
  { path: '/deals', Page: DealsPage },
  { path: '/technical-library', Page: TechnicalLibraryPage },
  { path: '/inquiry-list', Page: InquiryListPage },
  { path: '/request-quote', Page: RequestQuotePage },
  { path: '/how-it-works', Page: HowItWorksPage },
  { path: '/financing-contracts', Page: FinancingContractsPage },
  { path: '/delivery-inspection', Page: DeliveryInspectionPage },
  { path: '/services/institutions-cleaning', Page: InstitutionsCleaningPage },
  { path: '/about', Page: AboutPage },
  { path: '/faq', Page: FAQPage },
  { path: '/contact', Page: ContactPage },
  { path: '/privacy', Page: PrivacyPage },
  { path: '/terms', Page: TermsPage },
  { path: '*', Page: NotFoundPage },
];

export async function preloadRoute(pathname: string) {
  const match = matchRoutes(pageRoutes.map(({ path }) => ({ path })), pathname)?.[0];
  const route = pageRoutes.find(({ path }) => path === match?.route.path);
  await route?.Page.preload();
}
