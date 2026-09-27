import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeContext';
import { getCurrentLanguage } from './i18n/config';
import { getRouterBasename, stripLanguagePrefix } from './i18n/urls';
import './index.css';
import { preloadRoute } from './pageRoutes';

// #root may hold the build-time prerendered page (default Albanian, empty inquiry list). It is
// replaced rather than hydrated, so stored language, theme and inquiry state never mismatch.
// Loading the route first means the swap paints the full page, with no empty frame in between.
preloadRoute(stripLanguagePrefix(window.location.pathname))
  .catch(() => undefined)
  .finally(() => {
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <ThemeProvider>
          <App basename={getRouterBasename(getCurrentLanguage())} />
        </ThemeProvider>
      </StrictMode>,
    );
  });
