import React, { useState, useCallback } from 'react';
import './App.css';
import './styles/tailwind.min.css';
import Header from './components/header';
import Menu from './components/menu';
import Spinner from './components/spinner';
import { createPlayer, replaceEdited } from './helpers/player';
import { copyLink, confirmDialog, pastFromBuffer, splitText } from './helpers/clipboard';
import Message from './components/message';
import { useKeyboardOpen } from './hook/keyboard';
import { useHistoryStateDefeatMode, useHistoryStatePlayer } from './hook/historyState';

export default function App() {

    const [spinnerRunning, setSpinnerRunning] = useState(false);
    const [message, setMessage] = useState('');
    const [defeatMode, setDefeatMode] = useHistoryStateDefeatMode();
    const [players, setPlayers] = useHistoryStatePlayer('list');
    const [defeatPlayers, setDefeatPlayers] = useHistoryStatePlayer('des');
    const isKeyboardOpen = useKeyboardOpen();

    const showMessage = useCallback((msg: string) => {
        setMessage(msg);
        setTimeout(setMessage, 3000, '');
    }, [setMessage]);

    const onDefeatChange = useCallback((value: boolean) => setDefeatMode(value), [setDefeatMode]);
    const onPlayerChange = useCallback((player: IPlayer) => {
        setPlayers((items) => replaceEdited(items, player));
    }, [setPlayers]);

    const onRemovePlayer = useCallback((player: IPlayer) => {
        setPlayers((items) => items.filter(({id}) => id !== player.id));
    }, [setPlayers]);

    const onDefeatPlayerChange = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => replaceEdited(items, player));
    }, [setDefeatPlayers]);

    const onRemoveDefeatPlayer = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
        setPlayers((items) => [player, ...items]);
    }, [setPlayers, setDefeatPlayers]);

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

    const onCopy = useCallback(() => {
        copyLink(players, defeatPlayers, defeatMode).then(() => {
            showMessage('Ссылка скопирована');
        }).catch(() => {
            showMessage('Не удалось скопировать ссылку');
        });
    }, [players, defeatPlayers, defeatMode, showMessage]);

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
                showMessage('Не удалось вставить из буфера');
            } else if (player) {
                setPlayers((items) => replaceEdited(items, {...player, text: player.text + str}));
            }
        });
        return inputData.length > 1;
    }, [showMessage, setPlayers]);

    return (
        <>
            <Header onCopy={onCopy} onPaste={onPaste}/>
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
                    onRemoveDefeatPlayer={onRemoveDefeatPlayer}
                    onPaste={onPaste}
                />

                <Spinner
                    spinnerRunning={spinnerRunning}
                    items={players}
                    runSpinner={runSpinner}
                    stopSpinner={stopSpinner}
                />
            </main>
            { message ? <Message text={message} /> : null}
        </>
    );
}
