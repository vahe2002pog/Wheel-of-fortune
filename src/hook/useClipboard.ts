import { useCallback, useContext } from 'react';
import { PopupContext } from '../context/popupContext';
import { useTranslation } from 'react-i18next';

export function useClipboard() {

    const { openPopup } = useContext(PopupContext);
    const { t } = useTranslation();

    const showMessage = useCallback((msg: string) => {
        openPopup({componentId: 'none', popupId: 'message', templateOptions: {message: msg}})
    }, [openPopup]);

    const copy = useCallback(() => {
        import('../helpers/clipboard').then(({ copyLink }) => {
            copyLink().then(() => {
                showMessage(t('main.copy-success'));
            }).catch(() => {
                showMessage(t('main.copy-error'));
            });
        });
    }, [showMessage, t]);

    return {copy};
}
