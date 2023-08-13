import React, { useMemo } from 'react';
import { useHistoryStateDefeatMode, useHistoryStatePlayer } from '../hook/historyState';

interface IContextValue {
    defeatMode: boolean,
    setDefeatMode: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayer[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>,
    defeatPlayers: IPlayer[],
    setDefeatPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
}

export const PlayersContext = React.createContext({} as IContextValue);

export const PlayersContextProvider = ({children}: { children: JSX.Element }) => {

    const [defeatMode, setDefeatMode] = useHistoryStateDefeatMode();
    const [players, setPlayers] = useHistoryStatePlayer('list');
    const [defeatPlayers, setDefeatPlayers] = useHistoryStatePlayer('des');

    const value = useMemo(() => {
        return {
            defeatMode, setDefeatMode, players, setPlayers, defeatPlayers, setDefeatPlayers
        };
    }, [ defeatMode, setDefeatMode, players, setPlayers, defeatPlayers, setDefeatPlayers ]);

    return (
        <PlayersContext.Provider value={value}>
            { children }
        </PlayersContext.Provider>
    );
}
