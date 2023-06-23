import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    'header.title': 'Fortune'
                }
            },
            ru: {
                translation: {
                    'header.title': 'Фортуна'
                }
            }
        },
        lng: document.documentElement.lang,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });