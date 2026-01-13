import 'i18next';
import type ru from './locales/ru/translation.json';

declare module 'i18next' {
    interface CustomTypeOptions {
        defaultNS: 'translation';
        resources: {
            ru: typeof ru;
        };
    }
}
