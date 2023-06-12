import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import './styles/tailwind.min.css';
import Header from './components/header';
import Menu from './components/menu';
import Spinner from './components/spinner';
import { convertToUrl, readFromParams } from './helpers/urlParams';

function edit(items: IPlayer[], player: IPlayer) {
    const newItems = [...items];
    const index = items.findIndex(({id}) => id === player.id);
    if (index === -1) {
        newItems.push(player);
    } else {
        newItems[index] = player;
    }
    return newItems;
}

const initData = readFromParams();

export default function App() {

    const [spinnerRunning, setSpinnerRunning] = useState(false);
    const [defeatMode, setDefeatMode] = useState(initData.defeatMode);
    const [players, setPlayers] = useState(initData.players);
    const [defeatPlayers, setDefeatPlayers] = useState(initData.defeatPlayers);

    const onDefeatChange = useCallback((value: boolean) => setDefeatMode(value), []);
    const onPlayerChange = useCallback((player: IPlayer) => {
        setPlayers((items) => edit(items, player));
    }, []);

    const onRemovePlayer = useCallback((player: IPlayer) => {
        setPlayers((items) => items.filter(({id}) => id !== player.id));
    }, []);

    const onDefeatPlayerChange = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
    }, []);

    const onRemoveDefeatPlayer = useCallback((player: IPlayer) => {
        setDefeatPlayers((items) => items.filter(({id}) => id !== player.id));
        setPlayers((items) => [player, ...items]);
    }, []);

    const runSpinner = useCallback(() => setSpinnerRunning(true), [setSpinnerRunning]);
    const stopSpinner = useCallback(() => setSpinnerRunning(false), [setSpinnerRunning]);

    useEffect(() => {
        try {
            window.history.replaceState('', '', convertToUrl(players, defeatPlayers, defeatMode));
        } catch (error) {}
    }, [players, defeatPlayers, defeatMode])

    return (
        <>
            <Header />
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
