import type { AppLanguage } from './config';

// Language-prefixed URLs. Off by default: every URL is Albanian and English is a stored preference.
// When VITE_ENGLISH_URLS=true, the URL decides the language: "/faq" is Albanian, "/en/faq" English.
// Activation steps and risks: docs/seo-plan.md → "Activate English URLs".
export const EN_PREFIX = '/en';

export function englishUrlsEnabled() {
  return import.meta.env.VITE_ENGLISH_URLS === 'true';
}

function hasEnglishPrefix(pathname: string) {
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`);
}

/** Language dictated by the URL, or null while English URLs are off (stored preference applies). */
export function getLanguageFromPath(pathname: string): AppLanguage | null {
  if (!englishUrlsEnabled()) {
    return null;
  }

  return hasEnglishPrefix(pathname) ? 'en' : 'sq';
}

/** "/en/faq" → "/faq". App routes and SEO lookups always use the unprefixed path. */
export function stripLanguagePrefix(pathname: string) {
  if (!englishUrlsEnabled() || !hasEnglishPrefix(pathname)) {
    return pathname;
  }

  return pathname.slice(EN_PREFIX.length) || '/';
}

/** "/faq" → "/en/faq" for English. Unchanged for Albanian, or while English URLs are off. */
export function localizePath(path: string, language: AppLanguage) {
  if (!englishUrlsEnabled() || language === 'sq') {
    return path;
  }

  return path === '/' ? EN_PREFIX : `${EN_PREFIX}${path}`;
}

/** React Router basename: English pages live under /en, so every existing <Link to="/..."> gets the prefix. */
export function getRouterBasename(language: AppLanguage) {
  return localizePath('/', language) === '/' ? undefined : EN_PREFIX;
}
