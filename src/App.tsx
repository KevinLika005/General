import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import { Layout } from './components/layout/Layout';
import { AboutPage } from './pages/AboutPage';
import { BrandsPage } from './pages/BrandsPage';
import { CatalogPage } from './pages/CatalogPage';
import { CategoryPage } from './pages/CategoryPage';
import { ContactPage } from './pages/ContactPage';
import { DealsPage } from './pages/DealsPage';
import { DeliveryInspectionPage } from './pages/DeliveryInspectionPage';
import { FAQPage } from './pages/FAQPage';
import { FinancingContractsPage } from './pages/FinancingContractsPage';
import { HomePage } from './pages/HomePage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { InquiryListPage } from './pages/InquiryListPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RequestQuotePage } from './pages/RequestQuotePage';
import { TechnicalLibraryPage } from './pages/TechnicalLibraryPage';
import { TermsPage } from './pages/TermsPage';

function App() {
  return (
    <InquiryProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </InquiryProvider>
  );
}

export default App;
