import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  resources: {
    en: {
      translation: {
        // Optional: define dummy keys used in tests
        'main_layout.additionalFooterLinks.pagesSectionHeading': 'Pages',
        'main_layout.additionalFooterLinks.supportSectionHeading': 'Support',
        'main_layout.additionalFooterLinks.getUpdatedForm.heading': 'Stay Updated',
      },
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;