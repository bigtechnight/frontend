import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import ru from './locales/ru/translation.json';

i18n.use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ru: { translation: ru },
        },
        lng: 'ru',
        fallbackLng: 'ru',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        defaultNS: 'translation',
    });

export default i18n;
