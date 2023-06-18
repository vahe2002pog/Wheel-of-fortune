import { useState, useEffect } from 'react';
import { readDefeatModeFromParams, readPlayerFromParams, updateUrlPartial } from '../helpers/urlParams';

export function useHistoryStatePlayer(paramName: string): [IPlayer[], React.Dispatch<React.SetStateAction<IPlayer[]>>] {
    const [players, setPlayer] = useState(readPlayerFromParams(paramName));

    useEffect(() => {
        updateUrlPartial({ [paramName]: players });
    }, [players, paramName])

    useEffect(() => {

        const onChange = (event: PopStateEvent) => {
            const newItems = window.history.state?.[paramName] || readPlayerFromParams(paramName);
            setPlayer(newItems);
        };

        window.addEventListener('popstate', onChange);
        return () => {
            window.removeEventListener('popstate', onChange);
        };
    }, []);

    return [players, setPlayer];
}

export function useHistoryStateDefeatMode(): [boolean, React.Dispatch<React.SetStateAction<boolean>>] {
    const [checked, setChecked] = useState(readDefeatModeFromParams());

    useEffect(() => updateUrlPartial({ checked }), [checked]);

    useEffect(() => {
        const onChange = (event: PopStateEvent) => setChecked(readDefeatModeFromParams());
        window.addEventListener('popstate', onChange);
        return () => window.removeEventListener('popstate', onChange);
    }, []);

    return [checked, setChecked];
}
