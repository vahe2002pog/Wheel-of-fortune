import React, { useMemo } from 'react';
import { useHistoryStateDefeatMode, useHistoryStateLegend, useHistoryStatePlayer } from '../hook/historyState';

interface IContextValue {
    defeatMode: boolean,
    setDefeatMode: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayer[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>,
    defeatPlayers: IPlayer[],
    setDefeatPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
    legend: string,
    setLegend: React.Dispatch<React.SetStateAction<string>>
}

export const PlayersContext = React.createContext({} as IContextValue);

export const PlayersContextProvider = ({children}: { children: JSX.Element }) => {

    const [defeatMode, setDefeatMode] = useHistoryStateDefeatMode();
    const [legend, setLegend] = useHistoryStateLegend();
    const [players, setPlayers] = useHistoryStatePlayer('list');
    const [defeatPlayers, setDefeatPlayers] = useHistoryStatePlayer('des');

    const value = useMemo(() => {
        return {
            defeatMode, setDefeatMode, players, setPlayers, defeatPlayers, setDefeatPlayers, legend, setLegend
        };
    }, [ defeatMode, setDefeatMode, players, setPlayers, defeatPlayers, setDefeatPlayers, legend, setLegend ]);

    return (
        <PlayersContext.Provider value={value}>
            { children }
        </PlayersContext.Provider>
    );
}
