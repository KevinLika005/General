import { useTranslation } from 'react-i18next';
import { changeLanguage, type AppLanguage } from '../i18n/config';
import { englishUrlsEnabled, localizePath, stripLanguagePrefix } from '../i18n/urls';

function switchLanguage(nextLanguage: AppLanguage) {
  if (!englishUrlsEnabled()) {
    return changeLanguage(nextLanguage);
  }

  // The URL owns the language: go to the same page in the other language.
  const { hash, pathname, search } = window.location;
  window.location.assign(`${localizePath(stripLanguagePrefix(pathname), nextLanguage)}${search}${hash}`);
  return Promise.resolve();
}

export function useLanguage() {
  const { i18n, t } = useTranslation();
  const language: AppLanguage = i18n.resolvedLanguage === 'sq' ? 'sq' : 'en';

  return {
    language,
    isEnglish: language === 'en',
    isAlbanian: language === 'sq',
    setLanguage: (nextLanguage: AppLanguage) => switchLanguage(nextLanguage),
    toggleLanguage: () => switchLanguage(language === 'en' ? 'sq' : 'en'),
    t,
  };
}
