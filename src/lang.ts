import i18n from 'i18next';
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        lng: document.documentElement.lang,
        fallbackLng: 'en',
        saveMissing: true,
        react: {
            useSuspense: false
        },
        resources: {
            en: {
                translation: {
                    'header.title': 'Wheel of Fortune online',
                    'header.copy': 'Copy link',
                    'header.paste': 'Paste text from clipboard',
                    'menu.checkbox-label': 'For knockout',
                    'menu.players': 'Players',
                    'menu.clear': 'Clear',
                    'menu.remove': 'Remove',
                    'menu.back': 'Raise',
                    'menu.backAll': 'Raise everything',
                    'menu.defeat-players': 'Knocked out',
                    'main.copy-success': 'Link copied',
                    'main.copy-error': 'Failed to copy link',
                    'main.paste-error': 'Failed to paste from clipboard',
                    'clipboard.paste-end-msg': 'Insert items?',
                    'clipboard.paste-replace-msg': 'Replace items?',
                    'clipboard.dialog-yes-btn': 'Yes',
                    'clipboard.dialog-no-btn': 'No'
                }
            },
            ru: {
                translation: {
                    'header.title': 'Колесо Фортуны онлайн',
                    'header.copy': 'Скопировать ссылку',
                    'header.paste': 'Вставить текст из буфера',
                    'menu.checkbox-label': 'На выбывание',
                    'menu.players': 'Игроки',
                    'menu.clear': 'Очистить',
                    'menu.remove': 'Удалить',
                    'menu.back': 'Вернуть',
                    'menu.backAll': 'Вернуть все',
                    'menu.defeat-players': 'Выбившие',
                    'main.copy-success': 'Ссылка скопирована',
                    'main.copy-error': 'Не удалось скопировать ссылку',
                    'main.paste-error': 'Не удалось вставить из буфера',
                    'clipboard.paste-end-msg': 'Вставить элементы?',
                    'clipboard.paste-replace-msg': 'Заменить элементы?',
                    'clipboard.dialog-yes-btn': 'Да',
                    'clipboard.dialog-no-btn': 'Нет'
                }
            }
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;