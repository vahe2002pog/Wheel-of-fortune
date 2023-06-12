import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './styles/tailwind.min.css';
import Header from './components/header';
import Menu from './components/menu';
import Spinner from './components/spinner';
import { convertToUrl, readFromParams } from './helpers/urlParams';
import { createPlayer, replaceEdited } from './helpers/player';
import { copyLink, getPasteData } from './helpers/clipboard';

const initData = readFromParams();

export default function App() {

    const [spinnerRunning, setSpinnerRunning] = useState(false);
    const [defeatMode, setDefeatMode] = useState(initData.defeatMode);
    const [players, setPlayers] = useState(initData.players);
    const [defeatPlayers, setDefeatPlayers] = useState(initData.defeatPlayers);

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
        copyLink(players, defeatPlayers, defeatMode);
    }, [players, defeatPlayers, defeatMode]);

    const onPaste = useCallback(() => {
        getPasteData().then((items) => {
            if (items.length) {
                setPlayers(items.map((text) => createPlayer({text})));
            }
        });
    }, []);

    return (
        <>
            <Header onCopy={onCopy} onPaste={onPaste}/>
            <main className='tw-flex tw-flex-1 tw-w-full tw-items-center'>
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
        </>
    );
}
