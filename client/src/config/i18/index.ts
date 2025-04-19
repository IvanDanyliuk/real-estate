import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './locales/en/translation.json';
import translationUa from './locales/ua/translation.json';


i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEn },
      ua: { translation: translationUa },
    },
    lng: 'ua',
    fallbackLng: 'ua',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;