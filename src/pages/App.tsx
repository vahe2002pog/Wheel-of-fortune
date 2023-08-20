import React, { useState, useCallback, useContext } from 'react';
import '../styles/tailwind.min.css';
import Header from '../components/header';
import Menu from '../components/menu';
import Spinner from '../components/spinner';
import { replaceEdited, sortById } from '../helpers/player';
import { useKeyboardOpen } from '../hook/keyboard';
import { PlayersContext } from '../context/PlayersContext';

export default function App() {

    const [disabled, setDisabled] = useState(false);
    const {
        defeatMode, setDefeatMode,
        players, setPlayers,
        defeatPlayers, setDefeatPlayers
    } = useContext(PlayersContext);

    const isKeyboardOpen = useKeyboardOpen();

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
                <Menu
                    players={players}
                    defeatPlayers={defeatPlayers}
                    defeatMode={defeatMode}
                    disabled={disabled}
                    onDefeatChange={onDefeatChange}
                    onPlayerChange={onPlayerChange}
                    onDefeatPlayerChange={onDefeatPlayerChange}
                    onRemovePlayer={onRemovePlayer}
                    onClearPlayers={onClearPlayers}
                    onClearDefeatPlayers={onClearDefeatPlayers}
                    onRemoveDefeatPlayer={onRemoveDefeatPlayer}
                    onBackDefeatPlayer={onBackDefeatPlayer}
                    onBackDefeatPlayers={onBackDefeatPlayers}
                />

                <Spinner
                    items={players}
                    setDisabled={setDisabled}
                    stopSpinner={stopSpinner}
                />
            </main>
        </>
    );
}
