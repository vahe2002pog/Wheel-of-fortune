import React, { useMemo } from 'react';
import { useHistoryStateDefeatMode, useHistoryStateLegend, useHistoryStatePlayer } from '../hook/historyState';

interface IContextValue {
    defeatMode: boolean,
    setDefeatMode: React.Dispatch<React.SetStateAction<boolean>>,
    players: IPlayer[],
    setPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>,
    outPlayers: IPlayer[],
    setOutPlayers: React.Dispatch<React.SetStateAction<IPlayer[]>>
    legend: string,
    setLegend: React.Dispatch<React.SetStateAction<string>>
}

export const PlayersContext = React.createContext({} as IContextValue);

export const PlayersContextProvider = ({children}: { children: JSX.Element }) => {

    const [defeatMode, setDefeatMode] = useHistoryStateDefeatMode();
    const [legend, setLegend] = useHistoryStateLegend();
    const [list] = useHistoryStatePlayer('list');
    const [players, setPlayers] = useHistoryStatePlayer('items');
    const [defeatPlayers] = useHistoryStatePlayer('des');
    const [outPlayers, setOutPlayers] = useHistoryStatePlayer('out');

    const value = useMemo(() => {
        return {
            defeatMode, setDefeatMode, players: list.length ? list : players, setPlayers, outPlayers: defeatPlayers?.length ? defeatPlayers : outPlayers, setOutPlayers, legend, setLegend
        };
    }, [ defeatMode, setDefeatMode, players, setPlayers, defeatPlayers, outPlayers, list, setOutPlayers, legend, setLegend ]);

    return (
        <PlayersContext.Provider value={value}>
            { children }
        </PlayersContext.Provider>
    );
}
