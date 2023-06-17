import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './styles/tailwind.min.css';
import Header from './components/header';
import Menu from './components/menu';
import Spinner from './components/spinner';
import { convertToUrl, readFromParams } from './helpers/urlParams';
import { createPlayer, replaceEdited } from './helpers/player';
import { copyLink, getPasteData } from './helpers/clipboard';
import Message from './components/message';
import { useKeyboardOpen } from './hook/keyboard';

const initData = readFromParams();

export default function App() {

    const [spinnerRunning, setSpinnerRunning] = useState(false);
    const [message, setMessage] = useState('');
    const [defeatMode, setDefeatMode] = useState(initData.defeatMode);
    const [players, setPlayers] = useState(initData.players);
    const [defeatPlayers, setDefeatPlayers] = useState(initData.defeatPlayers);
    const isKeyboardOpen = useKeyboardOpen();

    const showMessage = useCallback((msg: string) => {
        setMessage(msg);
        setTimeout(setMessage, 3000, '');
    }, [setMessage]);

    const onDefeatChange = useCallback((value: boolean) => setDefeatMode(value), []);
    const onPlayerChange = useCallback((player: IPlayer) => {
        setPlayers((items) => replaceEdited(items, player));
    }, []);

    const onRemovePlayer = useCallback((player: IPlayer) => {
        setPlayers((items) => items.filter(({id}) => id !== player.id));
    }, []);

    const onDefeatPlayerChange = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => replaceEdited(items, player));
    }, []);

    const onRemoveDefeatPlayer = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
        setPlayers((items) => [player, ...items]);
    }, []);

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
    }, [setSpinnerRunning, defeatMode]);

    useEffect(() => {
        try {
            window.history.replaceState('', '', convertToUrl(players, defeatPlayers, defeatMode));
        } catch (error) {}
    }, [players, defeatPlayers, defeatMode]);

    const onCopy = useCallback(() => {
        copyLink(players, defeatPlayers, defeatMode).then(() => {
            showMessage('Ссылка скопирована');
        }).catch(() => {
            showMessage('Не удалось скопировать ссылку');
        });
    }, [players, defeatPlayers, defeatMode, showMessage]);

    const onPaste = useCallback(() => {
        getPasteData().then((items) => {
            setPlayers(items.map((text) => createPlayer({text})));
        }).catch(() => {
            showMessage('Не удалось вставить из буфера');
        });
    }, [showMessage]);

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
