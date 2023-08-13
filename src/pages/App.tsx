import React, { useState, useCallback, useContext } from 'react';
import '../styles/tailwind.min.css';
import Header from '../components/header';
import Menu from '../components/menu';
import Spinner from '../components/spinner';
import { createPlayer, replaceEdited, sortById } from '../helpers/player';
import { confirmDialog, pastFromBuffer, splitText } from '../helpers/clipboard';
import { useKeyboardOpen } from '../hook/keyboard';
import { useHistoryStateDefeatMode, useHistoryStatePlayer } from '../hook/historyState';
import { useTranslation } from 'react-i18next';
import { PopupContext } from '../context/popupContext';

export default function App() {

    const [spinnerRunning, setSpinnerRunning] = useState(false);
    const [defeatMode, setDefeatMode] = useHistoryStateDefeatMode();
    const [players, setPlayers] = useHistoryStatePlayer('list');
    const [defeatPlayers, setDefeatPlayers] = useHistoryStatePlayer('des');
    const isKeyboardOpen = useKeyboardOpen();
    const { t } = useTranslation();
    const { openPopup } = useContext(PopupContext);

    const showMessage = useCallback((msg: string) => {
        openPopup({componentId: 'none', popupId: 'message', templateOptions: {message: msg}});
    }, [openPopup]);

    const onDefeatChange = useCallback((value: boolean) => setDefeatMode(value), [setDefeatMode]);
    const onPlayerChange = useCallback((player: IPlayer) => {
        setPlayers((items) => replaceEdited(items, player));
    }, [setPlayers]);

    const onRemovePlayer = useCallback((player: IPlayer) => {
        setPlayers((items) => items.filter(({id}) => id !== player.id));
    }, [setPlayers]);

    const onClearPlayers = useCallback(() => setPlayers([]), [setPlayers]);

    const onDefeatPlayerChange = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => replaceEdited(items, player));
    }, [setDefeatPlayers]);

    const onBackDefeatPlayer = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
        setPlayers((items) => [player, ...items].sort(sortById));
    }, [setPlayers, setDefeatPlayers]);

    const onRemoveDefeatPlayer = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
    }, [setDefeatPlayers]);

    const onClearDefeatPlayers = useCallback(() => setDefeatPlayers([]), [setDefeatPlayers]);
    const onBackDefeatPlayers = useCallback(() => {
        setDefeatPlayers((defeatPlayers) => {
            setPlayers((players) => {
                return [...defeatPlayers, ...players].sort(sortById);
            });
            return [];
        });
    }, [setDefeatPlayers, setPlayers]);

    const runSpinner = useCallback(() => setSpinnerRunning(true), [setSpinnerRunning]);
    const stopSpinner = useCallback((winner: IPlayer) => {
        setSpinnerRunning((val) => {
            if (!val) {
                console.error('Double stop spinner');
            }
            return false;
        });
        if (defeatMode) {
            setPlayers((items) => items.filter(({id}) => id !== winner.id));
            setDefeatPlayers((items) => [winner, ...items]);
        }
    }, [setSpinnerRunning, defeatMode, setPlayers, setDefeatPlayers]);

    const onPaste = useCallback((player?: IPlayer, str?: string) => {
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
                setPlayers((items) => replaceEdited(items, {...player, text: player.text + str}));
            }
        });
        return inputData.length > 1;
    }, [showMessage, setPlayers, t]);

    return (
        <>
            <Header onPaste={onPaste} />
            <main className={`tw-flex tw-flex-1 tw-w-full tw-items-center tw-relative ${isKeyboardOpen ? 'keyboard-opened' : ''}`}>
                <Menu
                    players={players}
                    defeatPlayers={defeatPlayers}
                    defeatMode={defeatMode}
                    disabled={spinnerRunning}
                    onDefeatChange={onDefeatChange}
                    onPlayerChange={onPlayerChange}
                    onDefeatPlayerChange={onDefeatPlayerChange}
                    onRemovePlayer={onRemovePlayer}
                    onClearPlayers={onClearPlayers}
                    onClearDefeatPlayers={onClearDefeatPlayers}
                    onRemoveDefeatPlayer={onRemoveDefeatPlayer}
                    onBackDefeatPlayer={onBackDefeatPlayer}
                    onBackDefeatPlayers={onBackDefeatPlayers}
                    onPaste={onPaste}
                />

                <Spinner
                    spinnerRunning={spinnerRunning}
                    items={players}
                    runSpinner={runSpinner}
                    stopSpinner={stopSpinner}
                />
            </main>
        </>
    );
}
