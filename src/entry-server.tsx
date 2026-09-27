// Build-time prerender entry (vite build --ssr). Renders the default Albanian page into static HTML;
// the browser replaces it with the live app (see main.tsx).
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App';
import { ThemeProvider } from './context/ThemeContext';
import i18n, { type AppLanguage } from './i18n/config';
import { getRouterBasename, localizePath } from './i18n/urls';
import { preloadRoute } from './pageRoutes';

export { getAllRoutes, getHeadTags, getPageSeo, siteUrl } from './seo/pageSeo';
export { renderHeadHtml, renderRobots, renderSitemap } from './seo/siteFiles';

export { englishUrlsEnabled, localizePath } from './i18n/urls';

/** Renders an app path (always unprefixed, e.g. "/faq") in one language. Also switches i18n to it. */
export async function renderPage(path: string, language: AppLanguage = 'sq') {
  await i18n.changeLanguage(language);
  await preloadRoute(path);

  return renderToString(
    <StrictMode>
      <ThemeProvider>
        <StaticRouter basename={getRouterBasename(language)} location={localizePath(path, language)}>
          <AppShell />
        </StaticRouter>
      </ThemeProvider>
    </StrictMode>,
  );
}
