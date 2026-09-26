import { lazy, Suspense, type ComponentType } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import { Layout } from './components/layout/Layout';

function lazyPage<TModule extends Record<string, ComponentType>, TExport extends keyof TModule>(
  load: () => Promise<TModule>,
  exportName: TExport,
) {
  return lazy(async () => {
    const module = await load();

    return {
      default: module[exportName] as ComponentType,
    };
  });
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

function App() {
  return (
    <InquiryProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/equipment" element={<CatalogPage />} />
              <Route path="/equipment/:categorySlug" element={<CategoryPage />} />
              <Route path="/equipment/:categorySlug/:productSlug" element={<ProductDetailPage />} />
              <Route path="/brands" element={<BrandsPage />} />
              <Route path="/deals" element={<DealsPage />} />
              <Route path="/technical-library" element={<TechnicalLibraryPage />} />
              <Route path="/inquiry-list" element={<InquiryListPage />} />
              <Route path="/request-quote" element={<RequestQuotePage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/financing-contracts" element={<FinancingContractsPage />} />
              <Route path="/delivery-inspection" element={<DeliveryInspectionPage />} />
              <Route path="/services/institutions-cleaning" element={<InstitutionsCleaningPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </InquiryProvider>
  );
}

export default App;
