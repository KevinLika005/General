import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { InquiryProvider } from './context/InquiryContext';
import { Layout } from './components/layout/Layout';
import { pageRoutes } from './pageRoutes';

/** The app without a router, so the browser (BrowserRouter) and the prerender (StaticRouter) share it. */
export function AppShell() {
  return (
    <InquiryProvider>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            {pageRoutes.map(({ path, Page }) => (
              <Route element={<Page />} key={path} path={path} />
            ))}
          </Routes>
        </Suspense>
      </Layout>
    </InquiryProvider>
  );
}

function App({ basename }: { basename?: string }) {
  return (
    <BrowserRouter basename={basename}>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
