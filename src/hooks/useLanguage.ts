import { useTranslation } from 'react-i18next';
import { changeLanguage, type AppLanguage } from '../i18n/config';

export function useLanguage() {
  const { i18n, t } = useTranslation();
  const language: AppLanguage = i18n.resolvedLanguage === 'sq' ? 'sq' : 'en';

  return {
    language,
    isEnglish: language === 'en',
    isAlbanian: language === 'sq',
    setLanguage: (nextLanguage: AppLanguage) => changeLanguage(nextLanguage),
    toggleLanguage: () => changeLanguage(language === 'en' ? 'sq' : 'en'),
    t,
  };
}
