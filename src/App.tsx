import React, { useState, useCallback } from 'react';
import './App.css';
import './styles/tailwind.min.css';
import Header from './components/header';
import Menu from './components/menu';
import Spinner from './components/spinner';

export default function App() {

    const [spinnerRunning, setSpinnerRunning] = useState(false);
    const [defeatMode, setDefeatMode] = useState(false);

    const [players, setPlayers] = useState(() => {
        return [
            {id: '7', color: '#777', text: 'text-777 long line for overflow'},
            {id: '8', color: '#888', text: 'text-888 long line for overflow'},
            {id: '9', color: '#999', text: 'text-999 long line for overflow'},
            {id: 'a', color: '#aaa', text: 'text-aaa long line for overflow'},
            {id: 'b', color: '#bbb', text: 'text-bbb long line for overflow'},
            {id: 'c', color: '#ccc', text: 'text-ccc long line for overflow'},
            {id: 'd', color: '#ddd', text: 'text-ddd long line for overflow'},
            {id: 'e', color: '#eee', text: 'text-eee long line for overflow'},
            {id: 'f', color: '#fff', text: 'text-fff long line for overflow'}
        ]
    });

    const onDefeatChange = useCallback((value: boolean) => setDefeatMode(value), []);
    const onPlayerChange = useCallback((player: IPlayer) => {
        setPlayers((items) => {
            const newItems = [...items];
            const index = items.findIndex(({id}) => id === player.id);
            if (index === -1) {
                newItems.push(player);
            } else {
                newItems[index] = player;
            }
            return newItems;
        });
    }, []);

    const onDefeatPlayerChange = useCallback((player: IPlayer) => {
        
    }, []);


    const runSpinner = useCallback(() => setSpinnerRunning(true), [setSpinnerRunning]);
    const stopSpinner = useCallback(() => setSpinnerRunning(false), [setSpinnerRunning]);

    return (
        <>
            <Header />
            <main className='tw-flex tw-flex-1 tw-w-full tw-items-center'>
                <Menu
                    players={players}
                    defeatPlayers={[]}
                    defeatMode={defeatMode}
                    disabled={spinnerRunning}
                    onDefeatChange={onDefeatChange}
                    onPlayerChange={onPlayerChange}
                    onDefeatPlayerChange={onDefeatPlayerChange}
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
