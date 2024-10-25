import { useState, useEffect } from 'react';
import { readDefeatModeFromParams, readLegendFromParams, readPlayerFromParams, updateUrlPartial } from '../helpers/urlParams';

export function useHistoryStatePlayer(paramName: string): [IPlayer[], React.Dispatch<React.SetStateAction<IPlayer[]>>] {
    const [players, setPlayer] = useState(readPlayerFromParams(paramName));

    useEffect(() => {
        updateUrlPartial({ [paramName]: players });
    }, [players, paramName])

    useEffect(() => {

        const onChange = (event: PopStateEvent) => {
            let newItems = window.history.state?.[paramName];

            if (newItems) {
                setPlayer(newItems);
            } else {
                newItems = readPlayerFromParams(paramName);
                setPlayer((items) => {
                    if (items.length !== newItems.length) {
                        return newItems;
                    }
                    const hasChange = items.some((item, index) => item.text !== newItems[index].text);
                    if (hasChange) {
                        return newItems;
                    }
                    return items;
                });
            }
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

export function useHistoryStateLegend(): [string, React.Dispatch<React.SetStateAction<string>>] {
    const [legend, setLegend] = useState(readLegendFromParams());

    useEffect(() => updateUrlPartial({ legend }), [legend]);

    useEffect(() => {
        const onChange = (event: PopStateEvent) => setLegend(readLegendFromParams());
        window.addEventListener('popstate', onChange);
        return () => window.removeEventListener('popstate', onChange);
    }, []);

    return [legend, setLegend];
}
