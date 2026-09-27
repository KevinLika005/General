import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en } from './locales/en';
import { sq } from './locales/sq';
import { getLanguageFromPath } from './urls';

export const LANGUAGE_STORAGE_KEY = 'general-trading-language';
export const DEFAULT_LANGUAGE = 'sq';
export const SUPPORTED_LANGUAGES = ['en', 'sq'] as const;

export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

function getInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE;
  }

  const fromUrl = getLanguageFromPath(window.location.pathname);

  if (fromUrl) {
    return fromUrl;
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === 'en' ? 'en' : 'sq';
}

function persistLanguage(language: string) {
  if (typeof window !== 'undefined' && (language === 'en' || language === 'sq')) {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }

  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      sq: { translation: sq },
    },
    lng: getInitialLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  persistLanguage(i18n.resolvedLanguage ?? DEFAULT_LANGUAGE);
  i18n.on('languageChanged', persistLanguage);
}

export function changeLanguage(language: AppLanguage) {
  return i18n.changeLanguage(language);
}

export function getCurrentLanguage(): AppLanguage {
  return i18n.resolvedLanguage === 'en' ? 'en' : 'sq';
}

export default i18n;
