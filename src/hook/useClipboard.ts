import { useCallback, useContext } from 'react';
import { PopupContext } from '../context/popupContext';
import { useTranslation } from 'react-i18next';
import { PlayersContext } from '../context/PlayersContext';
import { createPlayer, replaceEdited } from '../helpers/player';
import { normalizeStrToEditor } from '../helpers/utils';

export function useClipboard() {

    const { openPopup } = useContext(PopupContext);
    const { setPlayers } = useContext(PlayersContext);
    const { t } = useTranslation();

    const showMessage = useCallback((msg: string) => {
        openPopup({componentId: 'none', popupId: 'message', templateOptions: {message: msg}});
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

    const paste = useCallback((player?: IPlayer, str?: string) => {
        import('../helpers/clipboard').then(({ splitText, confirmDialog, pastFromBuffer }) => {

            const inputData = str ? splitText(str, false) : [];
            const dataResolver = str ? confirmDialog(inputData, true) : pastFromBuffer().then(splitText).then(confirmDialog);
            Promise.resolve(dataResolver).then((items) => {
                if (str) {
                    setPlayers((cur) => [...cur, ...items.map((text) => createPlayer({text}))]);
                } else {
                    setPlayers(items.map((text) => createPlayer({text})));
                }
            }).catch(() => {
                if (!str) {
                    showMessage(t('main.paste-error'));
                } else if (player) {
                    setPlayers((items) => replaceEdited(items, {...player, text: normalizeStrToEditor(player.text + str)}));
                }
            });
        });
        return true;
    }, [showMessage, setPlayers, t]);

    return {copy, paste};
}
