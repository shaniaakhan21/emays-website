import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../../locales/en/translations.json';
import it from '../../locales/it/translations.json';
import { getWebLanguage } from './LocalStorageUtil';

const resources = {
    en: {
        translation: en
    },
    it: {
        translation: it
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: getWebLanguage() || 'it',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
