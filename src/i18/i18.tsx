import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import tanslationEn from './translation/en.json';
import tanslationThai from './translation/thai.json';

const resources = {
  en: {
    translation: tanslationEn
  },
  thai: {
    translation: tanslationThai
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;