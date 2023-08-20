import React, { useState, useCallback, useContext } from 'react';
import '../styles/tailwind.min.css';
import Header from '../components/header';
import Menu from '../components/menu';
import Spinner from '../components/spinner';
import { useKeyboardOpen } from '../hook/useKeyboardOpen';
import { PlayersContext } from '../context/PlayersContext';

export default function App() {

    const [disabled, setDisabled] = useState(false);
    const {
        defeatMode,
        players, setPlayers,
        setDefeatPlayers
    } = useContext(PlayersContext);

    const isKeyboardOpen = useKeyboardOpen();

    const stopSpinner = useCallback((winner: IPlayer) => {
        if (defeatMode) {
            setPlayers((items) => items.filter(({id}) => id !== winner.id));
            setDefeatPlayers((items) => [winner, ...items]);
        }
    }, [defeatMode, setPlayers, setDefeatPlayers]);

    return (
        <>
            <Header disabled={disabled}/>
            <main className={`tw-flex tw-flex-1 tw-w-full tw-items-center tw-relative ${isKeyboardOpen ? 'keyboard-opened' : ''}`}>
                <Menu disabled={disabled} />

                <Spinner
                    items={players}
                    setDisabled={setDisabled}
                    stopSpinner={stopSpinner}
                />
            </main>
        </>
    );
}
